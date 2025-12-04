import React, { useRef, useEffect } from 'react';

const RippleBackground = () => {
    const canvasRef = useRef(null);
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let animationFrameId;
        const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
        window.addEventListener('resize', resize);
        resize();
        let time = 0;
        const draw = () => {
            time += 0.005;
            // Deepest Teal for main background
            ctx.fillStyle = '#051C1B';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.lineWidth = 2;
            for (let i = 0; i < 5; i++) {
                ctx.beginPath();
                const yOffset = canvas.height / 2 + (i * 50);
                ctx.moveTo(0, yOffset);
                for (let x = 0; x < canvas.width; x += 10) {
                    const y = yOffset + Math.sin(x * 0.003 + time + i) * 50 + Math.sin(x * 0.01 - time) * 20;
                    ctx.lineTo(x, y);
                }
                // Gradient using Accent Teal
                const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
                gradient.addColorStop(0, 'rgba(5, 28, 27, 0)');
                gradient.addColorStop(0.5, 'rgba(58, 117, 115, 0.3)'); // Accent Teal #3A7573
                gradient.addColorStop(1, 'rgba(5, 28, 27, 0)');
                ctx.strokeStyle = gradient;
                ctx.stroke();
            }
            animationFrameId = requestAnimationFrame(draw);
        };
        draw();
        return () => { window.removeEventListener('resize', resize); cancelAnimationFrame(animationFrameId); };
    }, []);
    return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none opacity-60" />;
};

const FloatingParticles = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
            <div key={i} className="absolute rounded-full bg-[#3A7573]/20 blur-sm animate-float"
                style={{
                    width: Math.random() * 60 + 20 + 'px',
                    height: Math.random() * 60 + 20 + 'px',
                    left: Math.random() * 100 + '%',
                    top: Math.random() * 100 + '%',
                    animationDuration: Math.random() * 10 + 10 + 's',
                    animationDelay: Math.random() * 5 + 's',
                }}
            />
        ))}
    </div>
);

const WorkspaceBackground = ({ children }) => (
    // Deepest Teal Background
    <div className="relative min-h-screen w-full bg-[#051C1B] text-white overflow-hidden flex flex-col selection:bg-[#3A7573] selection:text-white">
        <RippleBackground />
        <FloatingParticles />
        <div className="relative z-20 w-full h-full flex flex-col flex-1">{children}</div>
        <style>{`@keyframes float { 0% { transform: translate(0, 0); } 50% { transform: translate(10px, -20px); } 100% { transform: translate(0, 0); } } .animate-float { animation: float infinite ease-in-out; }`}</style>
    </div>
);

export default WorkspaceBackground;
