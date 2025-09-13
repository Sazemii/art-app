"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { SectionWrapper } from "./shared";
import WindAnimation from "./WindAnimation";

// Enhanced scroll-triggered text component with staggered animations
function ScrollTriggeredText({ text, delay = 0, className = "" }) {
  return (
    <motion.p
      className={`text-2xl md:text-3xl leading-relaxed text-black font-light mb-6 ${className}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        duration: 1,
        delay,
        ease: "easeOut",
      }}
      viewport={{ once: true, margin: "-10%" }}
    >
      {text}
    </motion.p>
  );
}

function PhilosophyOrbs({ scrollProgress }) {
  // Render a handful of softly animated orbs in the background
  const orbs = [
    { size: 40, top: "15%", left: "20%" },
    { size: 24, top: "60%", left: "30%" },
    { size: 32, top: "35%", left: "70%" },
    { size: 20, top: "75%", left: "80%" },
  ];

  return (
    <div className="absolute inset-0 pointer-events-none">
      {orbs.map((orb, idx) => (
        <motion.div
          key={idx}
          className="absolute rounded-full bg-purple-400/20"
          style={{
            width: orb.size,
            height: orb.size,
            top: orb.top,
            left: orb.left,
            opacity: useTransform(scrollProgress ?? 0, [0, 1], [0.3, 0.8]),
            scale: useTransform(scrollProgress ?? 0, [0, 1], [1, 1.3]),
          }}
        />
      ))}
    </div>
  );
}

// Enhanced Philosophy Section with minimalist elegance
function EnhancedPhilosophySection({ setIsHovering }) {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  return (
    <SectionWrapper bgColor="bg-gradient-to-br from-white to-gray-50">
      {/* Wind animation background covering the full section */}
      <WindAnimation />

      <div ref={sectionRef} className="relative w-full max-w-6xl mx-auto">
        <motion.div className="max-w-4xl mx-auto relative z-10">
          <PhilosophyOrbs scrollProgress={scrollYProgress} />

          <div>
            <ScrollTriggeredText
              text="What I build aims to feel human rather than flashy. I prefer work that rewards curiosity: interfaces that respond with thoughtful micro-moments, visuals that respect a viewer's attention."
              delay={0}
            />

            <ScrollTriggeredText
              text="Interactions that feel like gentle invitations. For me, art is not just decoration; it's how meaning is made. It guides decisions about clarity, tone, and kindness toward the person using whatever I create."
              delay={0.5}
            />
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}

export default EnhancedPhilosophySection;
