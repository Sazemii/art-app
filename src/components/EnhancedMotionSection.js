"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { SectionWrapper } from "./shared";

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

// Enhanced Dynamic Dancing Elements with scroll-triggered entry animations
function DynamicDancingElements({ scrollProgress }) {
  const elements = Array.from({ length: 6 }, (_, i) => i);

  return (
    <motion.div
      className="absolute inset-0 opacity-20"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 0.2 }}
      transition={{ duration: 1.5, ease: "easeOut" }}
      viewport={{ once: true, margin: "-20%" }}
    >
      {elements.map((el) => {
        const scrollY = useTransform(scrollProgress, [0, 1], [0, -100]);
        const rotation = useTransform(
          scrollProgress,
          [0, 1],
          [0, 360 + el * 45]
        );
        const scale = useTransform(scrollProgress, [0, 0.5, 1], [1, 1.3, 0.8]);

        return (
          <motion.div
            key={el}
            className="absolute w-8 h-8 bg-pink-300 rounded-full"
            style={{
              left: `${20 + el * 12}%`,
              top: `${30 + (el % 2) * 40}%`,
              y: scrollY,
              rotate: rotation,
              scale: scale,
            }}
            initial={{ opacity: 0, scale: 0, rotate: -180 }}
            whileInView={{
              opacity: 1,
              scale: 1,
              rotate: 0,
            }}
            viewport={{ once: true, margin: "-10%" }}
            animate={{
              y: [-30, 30, -30],
              x: [-15, 15, -15],
            }}
            transition={{
              opacity: { duration: 1.2, delay: el * 0.1, ease: "easeOut" },
              scale: { duration: 1.2, delay: el * 0.1, ease: "easeOut" },
              rotate: { duration: 1.2, delay: el * 0.1, ease: "easeOut" },
              y: {
                repeat: Infinity,
                duration: 3 + el * 0.5,
                ease: "easeInOut",
              },
              x: {
                repeat: Infinity,
                duration: 3 + el * 0.5,
                ease: "easeInOut",
              },
            }}
          />
        );
      })}
    </motion.div>
  );
}

// Flowing Elements that create liquid-like motion
function FlowingElements({ scrollProgress }) {
  const elements = Array.from({ length: 8 }, (_, i) => i);

  return (
    <div className="absolute inset-0 opacity-15">
      {elements.map((el) => {
        const flowY = useTransform(scrollProgress, [0, 1], [50, -150]);
        const flowX = useTransform(scrollProgress, [0, 1], [-20, 20]);
        const opacity = useTransform(
          scrollProgress,
          [0, 0.3, 0.7, 1],
          [0.2, 0.8, 0.8, 0.2]
        );

        return (
          <motion.div
            key={el}
            className="absolute bg-gradient-to-r from-orange-300 to-pink-300 rounded-full"
            style={{
              width: `${15 + el * 3}px`,
              height: `${8 + el * 2}px`,
              left: `${5 + el * 11}%`,
              top: `${40 + (el % 3) * 20}%`,
              y: flowY,
              x: flowX,
              opacity: opacity,
            }}
            animate={{
              scaleX: [1, 1.5, 1],
              scaleY: [1, 0.8, 1],
            }}
            transition={{
              repeat: Infinity,
              duration: 4 + el * 0.3,
              ease: "easeInOut",
              delay: el * 0.2,
            }}
          />
        );
      })}
    </div>
  );
}

// Enhanced Motion Section with dynamic particles
function EnhancedMotionSection({ setIsHovering }) {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  return (
    <SectionWrapper bgColor="bg-gradient-to-br from-pink-50 to-orange-50">
      <div ref={sectionRef} className="relative w-full max-w-6xl mx-auto">
        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true, margin: "-10%" }}
        >
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.3 }}
            viewport={{ once: true, margin: "-10%" }}
          >
            <DynamicDancingElements scrollProgress={scrollYProgress} />
            <FlowingElements scrollProgress={scrollYProgress} />
          </motion.div>

          <motion.div
            onMouseEnter={() => setIsHovering && setIsHovering(true)}
            onMouseLeave={() => setIsHovering && setIsHovering(false)}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
            viewport={{ once: true, margin: "-10%" }}
          >
            <ScrollTriggeredText
              text="Motion, to me, is the softest form of storytelling. A hover that brightens slightly, a panel that slides in with a gentle pause, these are tiny performances."
              delay={0}
            />

            <ScrollTriggeredText
              text="They don't shout; they suggest. Like a dancer whose movement communicates feeling without words, an interaction on a site can express warmth, urgency, or calm."
              delay={0.5}
            />
          </motion.div>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}

export default EnhancedMotionSection;
