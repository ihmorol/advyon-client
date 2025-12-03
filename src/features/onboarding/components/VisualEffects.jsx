import React, { useEffect } from 'react';
import { motion, useMotionTemplate, useMotionValue, animate } from 'framer-motion';

// --- Theme Constants (Brand Colors) ---
export const BRAND = {
    deep: '#1C4645',    // Main Brand Color
    surface: '#1D4746', // Dark Surface
    accent: '#3A7573',  // Highlight
    accentLight: '#3C726F',
    textMain: '#FFFFFF',
    textLight: '#B0C4C3',
};

export const FloatingParticles = () => {
    return (
        <div className="absolute inset-0 overflow-hidden z-0 pointer-events-none">
            {[...Array(15)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute rounded-full opacity-20"
                    style={{
                        backgroundColor: BRAND.accent,
                        width: Math.random() * 80 + 20,
                        height: Math.random() * 80 + 20,
                        filter: 'blur(20px)',
                    }}
                    initial={{
                        x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
                        y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000),
                        scale: Math.random() * 0.5 + 0.5,
                    }}
                    animate={{
                        y: [null, Math.random() * -100],
                        x: [null, (Math.random() - 0.5) * 50],
                    }}
                    transition={{
                        duration: Math.random() * 20 + 15,
                        repeat: Infinity,
                        ease: "linear",
                        repeatType: "mirror"
                    }}
                />
            ))}
        </div>
    );
};

export const MouseSpotlight = () => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    useEffect(() => {
        const handleMouseMove = ({ clientX, clientY }) => {
            animate(mouseX, clientX, { duration: 0.2, ease: "linear" });
            animate(mouseY, clientY, { duration: 0.2, ease: "linear" });
        };
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [mouseX, mouseY]);

    const background = useMotionTemplate`radial-gradient(500px circle at ${mouseX}px ${mouseY}px, rgba(58, 117, 115, 0.15), transparent 80%)`;

    return (
        <motion.div
            className="pointer-events-none fixed inset-0 z-10 duration-300"
            style={{ background }}
        />
    );
};
