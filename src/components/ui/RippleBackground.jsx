import React, { useEffect, useRef } from 'react';

const RippleBackground = () => {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    const gl = canvas.getContext('webgl');

    if (!gl) {
      console.error('WebGL not supported');
      return;
    }

    // --- Configuration ---
    const SIM_RESOLUTION = 128; // Resolution of the ripple simulation grid
    const DAMPING = 0.96;
    const RIPPLE_RADIUS = 3;
    const PERTURBANCE = 500; // Intensity of the ripple

    // --- State ---
    let width = window.innerWidth;
    let height = window.innerHeight;
    let buffer1 = new Float32Array(SIM_RESOLUTION * SIM_RESOLUTION);
    let buffer2 = new Float32Array(SIM_RESOLUTION * SIM_RESOLUTION);
    let currentBuffer = buffer1;
    let previousBuffer = buffer2;

    // --- Shaders ---
    const vertexShaderSource = `
      attribute vec2 position;
      varying vec2 vUv;
      void main() {
        vUv = position * 0.5 + 0.5;
        // Flip Y for texture coordinates to match canvas
        vUv.y = 1.0 - vUv.y; 
        gl_Position = vec4(position, 0.0, 1.0);
      }
    `;

    const fragmentShaderSource = `
      precision mediump float;
      uniform sampler2D uTexture;
      uniform sampler2D uDisplacement;
      varying vec2 vUv;
      
      void main() {
        // Sample displacement map
        float displacement = texture2D(uDisplacement, vUv).r;
        
        // Distort UVs based on displacement
        // 0.05 is the strength of the refraction
        vec2 distortedUv = vUv + vec2(displacement - 0.5) * 0.05; 
        
        // Sample background texture with distorted UVs
        gl_FragColor = texture2D(uTexture, distortedUv);
      }
    `;

    // --- Helper Functions ---
    const createShader = (gl, type, source) => {
      const shader = gl.createShader(type);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error(gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const createProgram = (gl, vertexShader, fragmentShader) => {
      const program = gl.createProgram();
      gl.attachShader(program, vertexShader);
      gl.attachShader(program, fragmentShader);
      gl.linkProgram(program);
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.error(gl.getProgramInfoLog(program));
        return null;
      }
      return program;
    };

    const createTexture = (gl, width, height, data = null) => {
      const texture = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      if (data && data instanceof HTMLCanvasElement) {
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, data);
      } else if (data) {
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, width, height, 0, gl.RGBA, gl.UNSIGNED_BYTE, data);
      }
      return texture;
    };

    // --- Initialization ---
    const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
    const program = createProgram(gl, vertexShader, fragmentShader);

    const positionAttributeLocation = gl.getAttribLocation(program, 'position');
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
      -1, -1,
      1, -1,
      -1, 1,
      -1, 1,
      1, -1,
      1, 1,
    ]), gl.STATIC_DRAW);

    // --- Background Generation ---
    // Draw the gradient + noise to an offscreen canvas to use as a texture
    const bgCanvas = document.createElement('canvas');
    bgCanvas.width = width;
    bgCanvas.height = height;
    const ctx = bgCanvas.getContext('2d');
    
    // Gradient
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, '#1C4645');
    gradient.addColorStop(0.5, '#153433');
    gradient.addColorStop(1, '#0f2524');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    // Grid Pattern (Approximation)
    ctx.strokeStyle = 'rgba(58, 117, 115, 0.1)';
    ctx.lineWidth = 1;
    const gridSize = 40;
    for (let x = 0; x < width; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    for (let y = 0; y < height; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    // Create textures
    const bgTexture = createTexture(gl, width, height, bgCanvas);
    const displacementTexture = createTexture(gl, SIM_RESOLUTION, SIM_RESOLUTION);

    // --- Simulation Loop ---
    const updateSimulation = () => {
      // Swap buffers
      const temp = currentBuffer;
      currentBuffer = previousBuffer;
      previousBuffer = temp;

      // Add ripple at mouse position
      if (mouseRef.current.active) {
        const x = Math.floor((mouseRef.current.x / width) * SIM_RESOLUTION);
        const y = Math.floor((mouseRef.current.y / height) * SIM_RESOLUTION);
        
        for (let j = y - RIPPLE_RADIUS; j < y + RIPPLE_RADIUS; j++) {
          for (let i = x - RIPPLE_RADIUS; i < x + RIPPLE_RADIUS; i++) {
            if (i >= 0 && i < SIM_RESOLUTION && j >= 0 && j < SIM_RESOLUTION) {
              currentBuffer[j * SIM_RESOLUTION + i] = PERTURBANCE;
            }
          }
        }
      }

      // Wave propagation
      for (let i = 1; i < SIM_RESOLUTION - 1; i++) {
        for (let j = 1; j < SIM_RESOLUTION - 1; j++) {
          const index = j * SIM_RESOLUTION + i;
          currentBuffer[index] = (
            previousBuffer[index - 1] +
            previousBuffer[index + 1] +
            previousBuffer[index - SIM_RESOLUTION] +
            previousBuffer[index + SIM_RESOLUTION]
          ) / 2 - currentBuffer[index];
          
          currentBuffer[index] *= DAMPING;
        }
      }

      // Update displacement texture
      // Convert float buffer to Uint8Array for texture (0-255)
      // We map the wave height to grayscale values. 128 is neutral.
      const textureData = new Uint8Array(SIM_RESOLUTION * SIM_RESOLUTION * 4);
      for (let i = 0; i < SIM_RESOLUTION * SIM_RESOLUTION; i++) {
        const val = Math.min(255, Math.max(0, currentBuffer[i] + 128));
        textureData[i * 4 + 0] = val; // R
        textureData[i * 4 + 1] = val; // G
        textureData[i * 4 + 2] = val; // B
        textureData[i * 4 + 3] = 255; // A
      }

      gl.activeTexture(gl.TEXTURE1);
      gl.bindTexture(gl.TEXTURE_2D, displacementTexture);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, SIM_RESOLUTION, SIM_RESOLUTION, 0, gl.RGBA, gl.UNSIGNED_BYTE, textureData);
    };

    const render = () => {
      updateSimulation();

      gl.viewport(0, 0, width, height);
      gl.clear(gl.COLOR_BUFFER_BIT);

      gl.useProgram(program);

      // Bind Background Texture
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, bgTexture);
      gl.uniform1i(gl.getUniformLocation(program, 'uTexture'), 0);

      // Bind Displacement Texture
      gl.activeTexture(gl.TEXTURE1);
      gl.bindTexture(gl.TEXTURE_2D, displacementTexture);
      gl.uniform1i(gl.getUniformLocation(program, 'uDisplacement'), 1);

      gl.enableVertexAttribArray(positionAttributeLocation);
      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
      gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 0, 0);

      gl.drawArrays(gl.TRIANGLES, 0, 6);

      requestAnimationFrame(render);
    };

    render();

    // --- Event Listeners ---
    const handleMouseMove = (e) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      mouseRef.current.active = true;
      
      // Reset active after a short delay to stop continuous rippling if mouse stops
      clearTimeout(mouseRef.current.timeout);
      mouseRef.current.timeout = setTimeout(() => {
        mouseRef.current.active = false;
      }, 100);
    };

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      
      // Re-generate background texture
      bgCanvas.width = width;
      bgCanvas.height = height;
      const ctx = bgCanvas.getContext('2d');
      const gradient = ctx.createLinearGradient(0, 0, width, height);
      gradient.addColorStop(0, '#1C4645');
      gradient.addColorStop(0.5, '#153433');
      gradient.addColorStop(1, '#0f2524');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);
      
      ctx.strokeStyle = 'rgba(58, 117, 115, 0.1)';
      ctx.lineWidth = 1;
      for (let x = 0; x < width; x += 40) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, height); ctx.stroke();
      }
      for (let y = 0; y < height; y += 40) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(width, y); ctx.stroke();
      }
      
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, bgTexture);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, bgCanvas);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);

    // Initial resize to set correct size
    handleResize();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 z-0 pointer-events-none"
    />
  );
};

export default RippleBackground;
