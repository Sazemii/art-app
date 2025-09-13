"use client";

import { motion } from "framer-motion";

// Hero Section
function HeroSection() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Animated background threads */}
      <ThreadBackground />

      <motion.div
        className="text-center z-20 max-w-4xl mx-auto px-6"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        <motion.h1
          className="text-6xl md:text-8xl font-light text-white mb-8 leading-tight"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          Art in{" "}
          <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Motion
          </span>
        </motion.h1>

        <motion.p
          className="text-xl md:text-2xl text-white/80 font-light"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
        >
          An Interactive Essay
        </motion.p>

        <motion.div
          className="mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
        >
          <span className="text-white/60 text-sm">
            Scroll to begin the journey
          </span>
          <motion.div
            className="mx-auto mt-4 w-px h-16 bg-white/30"
            animate={{ scaleY: [1, 1.5, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}

// Thread background for hero
function ThreadBackground() {
  const threads = Array.from({ length: 8 }, (_, i) => i);

  return (
    <div className="absolute inset-0">
      {threads.map((thread) => (
        <motion.div
          key={thread}
          className="absolute inset-0"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 3, delay: thread * 0.3 }}
        >
          <svg className="w-full h-full" viewBox="0 0 100 100">
            <motion.path
              d={`M${10 + thread * 10},0 Q50,${30 + thread * 10} ${
                90 - thread * 10
              },100`}
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="0.5"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 4, delay: thread * 0.2 }}
            />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}

export default HeroSection;
