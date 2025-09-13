"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import { SectionWrapper, seededRandom, getSeededValue } from "./shared";

// Enhanced Threading Section with advanced scroll animations
function EnhancedThreadSection({ setIsHovering }) {
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Advanced parallax transforms
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["-50%", "50%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <SectionWrapper bgColor="bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <div
        ref={sectionRef}
        className="relative w-full max-w-6xl mx-auto overflow-hidden"
      >
        {/* Animated background layers */}
        <motion.div
          className="absolute inset-0 opacity-30"
          style={{ y: backgroundY }}
        >
          <EnhancedThreadingBackground />
        </motion.div>

        {/* Morphing musical elements */}
        <MorphingMusicalElements scrollProgress={scrollYProgress} />

        <motion.div
          className="max-w-4xl mx-auto relative z-10"
          style={{ opacity, y: textY }}
        >
          {/* Dynamic text with word-by-word reveal */}
          <div
            ref={textRef}
            className="relative z-20"
            onMouseEnter={() => setIsHovering && setIsHovering(true)}
            onMouseLeave={() => setIsHovering && setIsHovering(false)}
          >
            <ScrollTriggeredText
              text="Art threads through my life like a quiet melody, sometimes front and center, often just humming under everything I do."
              delay={0}
            />

            <ScrollTriggeredText
              text="I'm a student who spends free afternoons making websites and evenings lifting weights at home."
              delay={0.3}
            />

            <ScrollTriggeredText
              text="Even at this age, my main hobbies are simple: building interactive pages and training my body. But neither feels like two separate worlds; both are ways of making something live and feel true."
              delay={0.6}
            />
          </div>

          {/* Interactive thread paths */}
          <InteractiveThreadPaths />
        </motion.div>
      </div>
    </SectionWrapper>
  );
}

// Original ThreadSection for reference (keeping for fallback)
function ThreadSection() {
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const threadRef = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!inView) return;

    // GSAP Timeline for complex animations
    const tl = gsap.timeline();

    // Animate the threading paths using proper SVG animation
    const paths = document.querySelectorAll(".thread-path");
    paths.forEach((path) => {
      const pathLength = path.getTotalLength();
      path.style.strokeDasharray = pathLength;
      path.style.strokeDashoffset = pathLength;
    });

    tl.fromTo(
      ".thread-path",
      { strokeDashoffset: (i, target) => target.getTotalLength(), opacity: 0 },
      {
        strokeDashoffset: 0,
        opacity: 0.6,
        duration: 3,
        stagger: 0.5,
        ease: "power2.inOut",
      }
    );

    // Animate musical notes with rhythm
    tl.fromTo(
      ".musical-note",
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 0.7,
        duration: 0.8,
        stagger: 0.2,
        ease: "back.out(1.7)",
      },
      "-=2"
    );

    // Rhythmic pulsing for musical elements - removed scaling
    gsap.to(".rhythm-pulse", {
      opacity: 0.8,
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      stagger: {
        amount: 1,
        from: "random",
      },
    });
  }, [inView]);

  return (
    <SectionWrapper bgColor="bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <div ref={sectionRef} className="relative w-full max-w-6xl mx-auto">
        {/* Enhanced Threading Background */}
        <ThreadingBackground />

        {/* Musical Rhythm Elements */}
        <MusicalElements />

        <motion.div
          className="max-w-4xl mx-auto relative z-10"
          initial={{ opacity: 0 }}
          whileInView={{
            opacity: 1,
            transition: { duration: 1, onComplete: () => setInView(true) },
          }}
          viewport={{ once: true }}
        >
          {/* Weaving Thread SVG */}
          <div ref={threadRef} className="absolute inset-0 pointer-events-none">
            <svg
              className="w-full h-full"
              viewBox="0 0 800 400"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Thread paths that weave through the text */}
              <path
                className="thread-path"
                d="M 50,200 Q 200,50 400,200 T 750,200"
                fill="none"
                stroke="url(#threadGradient)"
                strokeWidth="2"
                pathLength="0"
              />
              <path
                className="thread-path"
                d="M 0,300 Q 250,150 500,300 T 800,250"
                fill="none"
                stroke="url(#threadGradient2)"
                strokeWidth="1.5"
                pathLength="0"
              />
              <path
                className="thread-path"
                d="M 100,100 Q 300,250 600,100 T 700,300"
                fill="none"
                stroke="url(#threadGradient3)"
                strokeWidth="1"
                pathLength="0"
              />

              {/* Gradient definitions */}
              <defs>
                <linearGradient
                  id="threadGradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="0%"
                >
                  <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.6" />
                  <stop offset="50%" stopColor="#a855f7" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#c084fc" stopOpacity="0.4" />
                </linearGradient>
                <linearGradient
                  id="threadGradient2"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="0%"
                >
                  <stop offset="0%" stopColor="#ec4899" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="#f472b6" stopOpacity="0.3" />
                </linearGradient>
                <linearGradient
                  id="threadGradient3"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="0%"
                >
                  <stop offset="0%" stopColor="#6366f1" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.6" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* Clean Text Area */}
          <div ref={textRef} className="relative z-20">
            <motion.div
              className="text-2xl md:text-3xl leading-relaxed text-black font-light relative"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, stagger: 0.1 }}
              viewport={{ once: true }}
            >
              <span className="inline-block">
                <span>Art threads through my life</span>
                <span> like a </span>
                <span>quiet melody</span>
                <span>
                  {" "}
                  — sometimes front and center, often just humming under
                  everything I do.{" "}
                </span>
              </span>

              <span className="inline-block mt-4">
                <span>I'm a student who spends free afternoons </span>
                <span>making websites</span>
                <span> and evenings </span>
                <span>lifting weights</span>
                <span> at home. </span>
              </span>

              <span className="inline-block mt-4">
                <span>Even at this age, my main hobbies are simple: </span>
                <span>building interactive pages</span>
                <span> and </span>
                <span>training my body</span>
                <span>
                  . But neither feels like two separate worlds; both are ways of{" "}
                </span>
                <span>making something live and feel true</span>
                <span>.</span>
              </span>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}

// Simplified Threading Background (performance optimized)
function EnhancedThreadingBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden opacity-20">
      {/* Simple thread patterns */}
      {Array.from({ length: 8 }, (_, i) => (
        <motion.div
          key={i}
          className="absolute bg-gradient-to-r from-purple-400 to-pink-400"
          style={{
            width: `${200 + i * 50}px`,
            height: "2px",
            left: `${i * 12}%`,
            top: `${20 + i * 10}%`,
            transform: `rotate(${i * 25}deg)`,
          }}
          animate={{
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            delay: i * 0.3,
          }}
        />
      ))}
    </div>
  );
}

// Original Threading Background Component
function ThreadingBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden opacity-20">
      {/* Animated thread patterns */}
      {Array.from({ length: 15 }, (_, i) => (
        <motion.div
          key={i}
          className="absolute bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 rhythm-pulse"
          style={{
            width: `${getSeededValue(i * 4, 100, 400)}px`,
            height: "1px",
            left: `${getSeededValue(i * 4 + 1, 0, 80)}%`,
            top: `${getSeededValue(i * 4 + 2, 0, 100)}%`,
            transform: `rotate(${getSeededValue(i * 4 + 3, 0, 180)}deg)`,
          }}
          animate={{
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{
            duration: 3 + getSeededValue(i * 2, 0, 2),
            repeat: Infinity,
            delay: getSeededValue(i * 2 + 1, 0, 2),
          }}
        />
      ))}
    </div>
  );
}

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

// Enhanced musical elements with smooth scroll-triggered animations
function MorphingMusicalElements({ scrollProgress }) {
  const notes = ["♪", "♫", "♬", "♩"];

  return (
    <motion.div
      className="absolute inset-0 pointer-events-none z-5 opacity-30"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 0.3 }}
      transition={{ duration: 1.5, ease: "easeOut" }}
      viewport={{ once: true, margin: "-20%" }}
    >
      {Array.from({ length: 4 }, (_, i) => (
        <motion.div
          key={i}
          className="absolute text-lg text-purple-500"
          style={{
            left: `${20 + i * 20}%`,
            top: `${30 + i * 15}%`,
          }}
          initial={{ opacity: 0, scale: 0, rotate: -180 }}
          whileInView={{
            opacity: 1,
            scale: 1,
            rotate: 0,
          }}
          viewport={{ once: true, margin: "-10%" }}
          animate={{
            y: [-10, 10, -10],
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{
            opacity: { duration: 1.2, delay: i * 0.2, ease: "easeOut" },
            scale: { duration: 1.2, delay: i * 0.2, ease: "easeOut" },
            rotate: { duration: 1.2, delay: i * 0.2, ease: "easeOut" },
            y: { duration: 3, repeat: Infinity, delay: i * 0.5 },
          }}
        >
          {notes[i]}
        </motion.div>
      ))}
    </motion.div>
  );
}

// Interactive thread paths that respond to scroll
function InteractiveThreadPaths() {
  const pathRef = useRef(null);

  return (
    <div className="absolute inset-0 pointer-events-none">
      <svg
        ref={pathRef}
        className="w-full h-full"
        viewBox="0 0 800 600"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Multiple flowing paths */}
        {Array.from({ length: 5 }, (_, i) => (
          <motion.path
            key={i}
            d={`M ${50 + i * 150},50 Q ${200 + i * 100},${150 + i * 80} ${
              400 + i * 80
            },${300 + i * 60} T ${700 + i * 20},${450 + i * 30}`}
            fill="none"
            stroke={`url(#enhancedGradient${i})`}
            strokeWidth={2 - i * 0.2}
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{
              pathLength: 1,
              opacity: 0.7,
              transition: {
                duration: 3,
                delay: i * 0.5,
                ease: "easeInOut",
              },
            }}
            viewport={{ once: true }}
          />
        ))}

        {/* Enhanced gradient definitions */}
        <defs>
          {Array.from({ length: 5 }, (_, i) => (
            <linearGradient
              key={i}
              id={`enhancedGradient${i}`}
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop
                offset="0%"
                stopColor="#8b5cf6"
                stopOpacity={0.8 - i * 0.1}
              />
              <stop
                offset="50%"
                stopColor="#ec4899"
                stopOpacity={0.6 - i * 0.1}
              />
              <stop
                offset="100%"
                stopColor="#3b82f6"
                stopOpacity={0.4 - i * 0.05}
              />
            </linearGradient>
          ))}
        </defs>
      </svg>
    </div>
  );
}

// Musical Elements Component
function MusicalElements() {
  const notes = ["♪", "♫", "♬", "♩", "♯"];

  return (
    <div className="absolute inset-0 pointer-events-none z-5">
      {Array.from({ length: 8 }, (_, i) => (
        <motion.div
          key={i}
          className="absolute text-2xl text-purple-400 musical-note rhythm-pulse"
          style={{
            left: `${10 + i * 12}%`,
            top: `${20 + (i % 3) * 25}%`,
          }}
          initial={{ opacity: 0, scale: 0, rotate: -90 }}
          whileInView={{
            opacity: 1,
            scale: 1,
            rotate: 0,
          }}
          viewport={{ once: true, margin: "-10%" }}
          animate={{
            y: [-10, 10, -10],
            rotate: [-5, 5, -5],
          }}
          transition={{
            opacity: { duration: 0.8, delay: i * 0.1, ease: "easeOut" },
            scale: { duration: 0.8, delay: i * 0.1, ease: "easeOut" },
            rotate: {
              initial: { duration: 0.8, delay: i * 0.1, ease: "easeOut" },
              animate: {
                duration: 2 + getSeededValue(i + 100, 0, 1),
                repeat: Infinity,
                delay: i * 0.3,
                ease: "easeInOut",
              },
            },
            y: {
              duration: 2 + getSeededValue(i + 100, 0, 1),
              repeat: Infinity,
              delay: i * 0.3,
              ease: "easeInOut",
            },
          }}
        >
          {notes[i % notes.length]}
        </motion.div>
      ))}
    </div>
  );
}

export default EnhancedThreadSection;
