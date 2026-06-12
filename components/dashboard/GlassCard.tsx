"use client";
import React, { ReactNode, MouseEvent } from "react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  animate?: boolean;
}

export default function GlassCard({
  children,
  className = "",
  delay = 0,
  animate = false,
}: GlassCardProps) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div
      initial={animate ? { opacity: 0, y: 20 } : undefined}
      animate={animate ? { opacity: 1, y: 0 } : undefined}
      transition={animate ? { duration: 0.5, delay } : undefined}
      onMouseMove={handleMouseMove}
      className={`group relative bg-white/70 dark:bg-[#111118]/70 backdrop-blur-md border border-slate-200 dark:border-white/[0.06] rounded-3xl overflow-hidden shadow-premium dark:shadow-premium-dark ${className}`}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-500 group-hover:opacity-100 z-[-1]"
        style={{
          background: useMotionTemplate`radial-gradient(400px circle at ${mouseX}px ${mouseY}px, rgba(139, 92, 246, 0.08), transparent 80%)`,
        }}
      />
      <div className="absolute inset-0 bg-white/80 dark:bg-[#0A0A0F]/80 -z-10" />
      <div className="relative z-10 w-full h-full p-6">
        {children}
      </div>
    </motion.div>
  );
}
