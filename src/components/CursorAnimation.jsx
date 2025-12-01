import { useEffect, useRef } from "react";
import Matter from "matter-js";

export default function CursorAnimation() {
  const sceneRef = useRef(null);
  const engineRef = useRef(null);

  useEffect(() => {
    const { Engine, Render, Runner, Bodies, Composite, Mouse, MouseConstraint, Events } = Matter;

    // Create engine
    const engine = Engine.create({
      gravity: { x: 0, y: -0.3 }, // Negative gravity for antigravity effect
    });
    engineRef.current = engine;

    // Create renderer
    const render = Render.create({
      element: sceneRef.current,
      engine: engine,
      options: {
        width: window.innerWidth,
        height: window.innerHeight,
        wireframes: false,
        background: "transparent",
      },
    });

    // Create boundaries (invisible walls)
    const wallThickness = 50;
    const walls = [
      // Top
      Bodies.rectangle(window.innerWidth / 2, -wallThickness / 2, window.innerWidth, wallThickness, {
        isStatic: true,
        render: { visible: false },
      }),
      // Bottom
      Bodies.rectangle(window.innerWidth / 2, window.innerHeight + wallThickness / 2, window.innerWidth, wallThickness, {
        isStatic: true,
        render: { visible: false },
      }),
      // Left
      Bodies.rectangle(-wallThickness / 2, window.innerHeight / 2, wallThickness, window.innerHeight, {
        isStatic: true,
        render: { visible: false },
      }),
      // Right
      Bodies.rectangle(window.innerWidth + wallThickness / 2, window.innerHeight / 2, wallThickness, window.innerHeight, {
        isStatic: true,
        render: { visible: false },
      }),
    ];

    // Create floating shapes
    const shapes = [];
    const colors = ["#6366f1", "#8b5cf6", "#a855f7", "#ec4899", "#06b6d4"];
    
    for (let i = 0; i < 15; i++) {
      const x = Math.random() * window.innerWidth;
      const y = Math.random() * window.innerHeight;
      const size = Math.random() * 30 + 20;
      const color = colors[Math.floor(Math.random() * colors.length)];
      
      let shape;
      if (Math.random() > 0.5) {
        // Circle
        shape = Bodies.circle(x, y, size / 2, {
          restitution: 0.8,
          friction: 0.001,
          density: 0.001,
          render: {
            fillStyle: color,
            opacity: 0.6,
          },
        });
      } else {
        // Rectangle
        shape = Bodies.rectangle(x, y, size, size, {
          restitution: 0.8,
          friction: 0.001,
          density: 0.001,
          render: {
            fillStyle: color,
            opacity: 0.6,
          },
        });
      }
      shapes.push(shape);
    }

    // Add all bodies to the world
    Composite.add(engine.world, [...walls, ...shapes]);

    // Create mouse control
    const mouse = Mouse.create(render.canvas);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
        render: { visible: false },
      },
    });

    Composite.add(engine.world, mouseConstraint);

    // Add mouse repulsion effect
    let mousePosition = { x: 0, y: 0 };
    
    Events.on(mouseConstraint, "mousemove", (event) => {
      mousePosition = event.mouse.position;
    });

    Events.on(engine, "beforeUpdate", () => {
      shapes.forEach((shape) => {
        const dx = shape.position.x - mousePosition.x;
        const dy = shape.position.y - mousePosition.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        // Repel shapes when mouse is near
        if (distance < 150) {
          const force = 0.0008 * (150 - distance) / distance;
          Matter.Body.applyForce(shape, shape.position, {
            x: dx * force,
            y: dy * force,
          });
        }
      });
    });

    // Run the engine and renderer
    const runner = Runner.create();
    Runner.run(runner, engine);
    Render.run(render);

    // Handle window resize
    const handleResize = () => {
      render.canvas.width = window.innerWidth;
      render.canvas.height = window.innerHeight;
      render.options.width = window.innerWidth;
      render.options.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      Render.stop(render);
      Runner.stop(runner);
      Engine.clear(engine);
      render.canvas.remove();
    };
  }, []);

  return (
    <div
      ref={sceneRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.4 }}
    />
  );
}
