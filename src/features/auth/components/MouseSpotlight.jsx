import React, { useEffect } from 'react';
import { motion, useMotionTemplate, useMotionValue, animate } from 'framer-motion';

const MouseSpotlight = () => {
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

  const background = useMotionTemplate`radial-gradient(600px circle at ${mouseX}px ${mouseY}px, rgba(58, 117, 115, 0.15), transparent 80%)`;

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-10 opacity-100 duration-300"
      style={{ background }}
    />
  );
};

export default MouseSpotlight;
