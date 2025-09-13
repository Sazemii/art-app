"use client";

import { motion } from "framer-motion";

// Shared Section Wrapper Component
export function SectionWrapper({ children, bgColor = "bg-white" }) {
  return (
    <motion.section
      className={`min-h-screen flex items-center justify-center px-6 py-20 ${bgColor} relative overflow-hidden`}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true, margin: "-10%" }}
    >
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
        viewport={{ once: true, margin: "-10%" }}
        className="w-full"
      >
        {children}
      </motion.div>
    </motion.section>
  );
}

// Simple Linear Congruential Generator for consistent SSR/client rendering
export function seededRandom(seed) {
  // LCG parameters (from Numerical Recipes)
  const a = 1664525;
  const c = 1013904223;
  const m = Math.pow(2, 32);

  const value = (a * seed + c) % m;
  return value / m;
}

// Generate consistent "random" values based on index with fixed precision
export function getSeededValue(index, min, max, precision = 4) {
  const value = min + seededRandom(index + 1) * (max - min);
  return Math.round(value * Math.pow(10, precision)) / Math.pow(10, precision);
}
