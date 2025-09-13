"use client";

import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useVelocity,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Simple Linear Congruential Generator for consistent SSR/client rendering
function seededRandom(seed) {
  // LCG parameters (from Numerical Recipes)
  const a = 1664525;
  const c = 1013904223;
  const m = Math.pow(2, 32);

  const value = (a * seed + c) % m;
  return value / m;
}

// Generate consistent "random" values based on index with fixed precision
function getSeededValue(index, min, max, precision = 4) {
  const value = min + seededRandom(index + 1) * (max - min);
  return Math.round(value * Math.pow(10, precision)) / Math.pow(10, precision);
}

export default function Home() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ container: containerRef });

  // Smooth spring animation for scroll
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
  });

  // Scroll velocity for advanced effects
  const scrollVelocity = useVelocity(scrollYProgress);
  const velocityFactor = useTransform(scrollVelocity, [-0.5, 0.5], [0.2, 1.5]);

  // Smooth scroll setup
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Add smooth scroll CSS
      document.documentElement.style.scrollBehavior = "smooth";

      // Custom scroll snap
      gsap.set("section", { scrollSnapAlign: "start" });

      return () => {
        document.documentElement.style.scrollBehavior = "auto";
      };
    }
  }, []);

  return (
    <div ref={containerRef} className="relative scroll-smooth">
      {/* Enhanced progress indicator */}
      <motion.div
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 z-50 shadow-lg shadow-purple-500/20"
        style={{
          width: useTransform(smoothProgress, [0, 1], ["0%", "100%"]),
          opacity: useTransform(scrollVelocity, [-0.5, 0, 0.5], [0.3, 1, 0.3]),
        }}
      />

      {/* Scroll velocity indicator */}
      <motion.div
        className="fixed top-4 right-4 w-2 h-2 bg-white/30 rounded-full z-40"
        style={{
          scale: velocityFactor,
          opacity: useTransform(scrollVelocity, [-0.5, 0, 0.5], [1, 0.3, 1]),
        }}
      />

      {/* Hero Section */}
      <HeroSection />

      {/* Enhanced Essay Sections */}
      <EnhancedThreadSection />
      <EnhancedScreenSection />
      <EnhancedMotionSection />
      <EnhancedTrainingSection />
      <EnhancedInspirationSection />
      <EnhancedPhilosophySection />
      <EnhancedConclusionSection />
    </div>
  );
}

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

// Enhanced Threading Section with advanced scroll animations
function EnhancedThreadSection() {
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
          <div ref={textRef} className="relative z-20">
            <ScrollTriggeredText
              text="Art threads through my life like a quiet melody — sometimes front and center, often just humming under everything I do."
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

// Simplified text component (much lighter)
function ScrollTriggeredText({ text, delay = 0 }) {
  return (
    <motion.p
      className="text-2xl md:text-3xl leading-relaxed text-black font-light mb-6"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay }}
      viewport={{ once: true, margin: "-20%" }}
    >
      {text}
    </motion.p>
  );
}

// Simplified musical elements
function MorphingMusicalElements({ scrollProgress }) {
  const notes = ["♪", "♫", "♬", "♩"];

  return (
    <div className="absolute inset-0 pointer-events-none z-5 opacity-30">
      {Array.from({ length: 4 }, (_, i) => (
        <motion.div
          key={i}
          className="absolute text-lg text-purple-500"
          style={{
            left: `${20 + i * 20}%`,
            top: `${30 + i * 15}%`,
          }}
          animate={{
            y: [-10, 10, -10],
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: i * 0.5,
          }}
        >
          {notes[i]}
        </motion.div>
      ))}
    </div>
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
          animate={{
            y: [-10, 10, -10],
            rotate: [-5, 5, -5],
          }}
          transition={{
            duration: 2 + getSeededValue(i + 100, 0, 1),
            repeat: Infinity,
            delay: i * 0.3,
            ease: "easeInOut",
          }}
        >
          {notes[i % notes.length]}
        </motion.div>
      ))}
    </div>
  );
}

// Clean Screen Section (reverted to simpler version)
function EnhancedScreenSection() {
  return (
    <SectionWrapper bgColor="bg-gradient-to-br from-slate-900 to-gray-900">
      <motion.div
        className="max-w-4xl mx-auto"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <GridBackground />
        <FloatingElement emoji="💻" delay={0} />
        <FloatingElement emoji="🎨" delay={0.3} />

        <motion.p
          className="text-2xl md:text-3xl leading-relaxed text-white font-light relative z-10"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2 }}
          viewport={{ once: true }}
        >
          On the screen, art shows up as composition and timing. A web page is a
          blank stage where text, image, and motion must share the spotlight
          without stepping on each other. I think about balance the same way a
          painter thinks about negative space: what to leave empty so the
          important parts can breathe. Small choices — the size of a headline,
          the space between lines, the way a button eases into view — shape how
          someone experiences a moment online.
        </motion.p>
      </motion.div>
    </SectionWrapper>
  );
}

// Dynamic Dancing Elements that respond to scroll
function DynamicDancingElements({ scrollProgress }) {
  const elements = Array.from({ length: 6 }, (_, i) => i);

  return (
    <div className="absolute inset-0 opacity-20">
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
            animate={{
              y: [-30, 30, -30],
              x: [-15, 15, -15],
            }}
            transition={{
              repeat: Infinity,
              duration: 3 + el * 0.5,
              ease: "easeInOut",
            }}
          />
        );
      })}
    </div>
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
function EnhancedMotionSection() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  return (
    <SectionWrapper bgColor="bg-gradient-to-br from-pink-50 to-orange-50">
      <div ref={sectionRef} className="relative w-full max-w-6xl mx-auto">
        <motion.div className="max-w-4xl mx-auto">
          <DynamicDancingElements scrollProgress={scrollYProgress} />
          <FlowingElements scrollProgress={scrollYProgress} />

          <div>
            <ScrollTriggeredText
              text="Motion, to me, is the softest form of storytelling. A hover that brightens slightly, a panel that slides in with a gentle pause — these are tiny performances."
              delay={0}
            />

            <ScrollTriggeredText
              text="They don't shout; they suggest. Like a dancer whose movement communicates feeling without words, an interaction on a site can express warmth, urgency, or calm."
              delay={0.5}
            />
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}

// Training Section with better text contrast
function EnhancedTrainingSection() {
  return (
    <SectionWrapper bgColor="bg-gradient-to-br from-red-900 to-orange-900">
      <motion.div
        className="max-w-4xl mx-auto"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <RhythmicShapes />
        <FloatingElement emoji="💪" delay={0} />
        <FloatingElement emoji="🎯" delay={0.2} />

        <motion.p
          className="text-2xl md:text-3xl leading-relaxed text-white font-light"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
          viewport={{ once: true }}
        >
          Off-screen, working out trains that same sensibility. Lifting slowly,
          focusing on form, noticing the subtle shifts in tension — it's
          practice in precision. There's beauty in repetition when it's
          attentive. Doing a set with care teaches me to notice nuance: where a
          line sits in a layout, how a color reads at different sizes, whether
          an animation is too fast or just right.
        </motion.p>
      </motion.div>
    </SectionWrapper>
  );
}

// Clean Inspiration Section
function EnhancedInspirationSection() {
  return (
    <SectionWrapper bgColor="bg-gradient-to-br from-emerald-50 to-teal-50">
      <motion.div
        className="max-w-4xl mx-auto"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <CollageElements />
        <FloatingElement emoji="🎬" delay={0} />
        <FloatingElement emoji="📸" delay={0.3} />
        <FloatingElement emoji="🎨" delay={0.6} />

        <motion.p
          className="text-2xl md:text-3xl leading-relaxed text-slate-800 font-light"
          initial={{ opacity: 0, rotateX: -10 }}
          whileInView={{ opacity: 1, rotateX: 0 }}
          transition={{ duration: 1.2 }}
          viewport={{ once: true }}
        >
          Appreciating other art keeps my visual language fresh. I borrow habits
          from everywhere I look: the hush of a film score helps me choose
          pacing; the composition of a photograph teaches me about framing; a
          poster's unexpected color pair pushes me to be bolder. Art trains the
          eye to see relationships — contrast, rhythm, hierarchy — and those
          relationships are the backbone of good design.
        </motion.p>
      </motion.div>
    </SectionWrapper>
  );
}

// Enhanced Philosophy Section with minimalist elegance
function EnhancedPhilosophySection() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  return (
    <SectionWrapper bgColor="bg-gradient-to-br from-white to-gray-50">
      <div ref={sectionRef} className="relative w-full max-w-6xl mx-auto">
        <motion.div className="max-w-4xl mx-auto">
          <ElegantMinimalShapes scrollProgress={scrollYProgress} />
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

// Clean Conclusion Section
function EnhancedConclusionSection() {
  return (
    <SectionWrapper bgColor="bg-gradient-to-br from-violet-900 via-purple-900 to-indigo-900">
      <motion.div
        className="max-w-4xl mx-auto"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <UnifyingElements />
        <FloatingElement emoji="🌟" delay={0} />
        <FloatingElement emoji="🔄" delay={0.3} />
        <FloatingElement emoji="💫" delay={0.6} />

        <motion.p
          className="text-2xl md:text-3xl leading-relaxed text-white font-light mb-12"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2 }}
          viewport={{ once: true }}
        >
          Mostly, art is practice. It's the steady repetition of small,
          thoughtful choices — the same patience I bring to a controlled set in
          the gym. Each humble prototype, edit, and revision sharpens my sense
          of what feels right. I'm still learning, but I keep showing up.
          Because in the end, making art — whether with code, breath, or muscle
          — is a habit that teaches me how to make things better for other
          people, and that's the part I care about most.
        </motion.p>

        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="inline-block text-white/60 text-lg"
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ repeat: Infinity, duration: 3 }}
          >
            Art is practice. Practice is art.
          </motion.div>
        </motion.div>
      </motion.div>
    </SectionWrapper>
  );
}

// Original Screen Section for reference
function ScreenSection() {
  return (
    <SectionWrapper bgColor="bg-gradient-to-br from-slate-900 to-gray-900">
      <motion.div
        className="max-w-4xl mx-auto"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <GridBackground />
        <FloatingElement emoji="💻" delay={0} />
        <FloatingElement emoji="🎨" delay={0.3} />

        <motion.p
          className="text-2xl md:text-3xl leading-relaxed text-white font-light relative z-10"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2 }}
          viewport={{ once: true }}
        >
          On the screen, art shows up as composition and timing. A web page is a
          blank stage where text, image, and motion must share the spotlight
          without stepping on each other. I think about balance the same way a
          painter thinks about negative space: what to leave empty so the
          important parts can breathe. Small choices — the size of a headline,
          the space between lines, the way a button eases into view — shape how
          someone experiences a moment online.
        </motion.p>
      </motion.div>
    </SectionWrapper>
  );
}

// Section 3: Motion storytelling
function MotionSection() {
  return (
    <SectionWrapper bgColor="bg-gradient-to-br from-pink-50 to-orange-50">
      <motion.div
        className="max-w-4xl mx-auto"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <DancingElements />
        <FloatingElement emoji="💃" delay={0} />
        <FloatingElement emoji="✨" delay={0.4} />

        <motion.p
          className="text-2xl md:text-3xl leading-relaxed text-slate-800 font-light"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2 }}
          viewport={{ once: true }}
        >
          Motion, to me, is the softest form of storytelling. A hover that
          brightens slightly, a panel that slides in with a gentle pause — these
          are tiny performances. They don't shout; they suggest. Like a dancer
          whose movement communicates feeling without words, an interaction on a
          site can express warmth, urgency, or calm.
        </motion.p>
      </motion.div>
    </SectionWrapper>
  );
}

// Section 4: Physical training
function TrainingSection() {
  return (
    <SectionWrapper bgColor="bg-gradient-to-br from-red-900 to-orange-900">
      <motion.div
        className="max-w-4xl mx-auto"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <RhythmicShapes />
        <FloatingElement emoji="💪" delay={0} />
        <FloatingElement emoji="🎯" delay={0.2} />

        <motion.p
          className="text-2xl md:text-3xl leading-relaxed text-white font-light"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
          viewport={{ once: true }}
        >
          Off-screen, working out trains that same sensibility. Lifting slowly,
          focusing on form, noticing the subtle shifts in tension — it's
          practice in precision. There's beauty in repetition when it's
          attentive. Doing a set with care teaches me to notice nuance: where a
          line sits in a layout, how a color reads at different sizes, whether
          an animation is too fast or just right.
        </motion.p>
      </motion.div>
    </SectionWrapper>
  );
}

// Section 5: Inspiration
function InspirationSection() {
  return (
    <SectionWrapper bgColor="bg-gradient-to-br from-emerald-50 to-teal-50">
      <motion.div
        className="max-w-4xl mx-auto"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <CollageElements />
        <FloatingElement emoji="🎬" delay={0} />
        <FloatingElement emoji="📸" delay={0.3} />
        <FloatingElement emoji="🎨" delay={0.6} />

        <motion.p
          className="text-2xl md:text-3xl leading-relaxed text-slate-800 font-light"
          initial={{ opacity: 0, rotateX: -10 }}
          whileInView={{ opacity: 1, rotateX: 0 }}
          transition={{ duration: 1.2 }}
          viewport={{ once: true }}
        >
          Appreciating other art keeps my visual language fresh. I borrow habits
          from everywhere I look: the hush of a film score helps me choose
          pacing; the composition of a photograph teaches me about framing; a
          poster's unexpected color pair pushes me to be bolder. Art trains the
          eye to see relationships — contrast, rhythm, hierarchy — and those
          relationships are the backbone of good design.
        </motion.p>
      </motion.div>
    </SectionWrapper>
  );
}

// Section 6: Philosophy
function PhilosophySection() {
  return (
    <SectionWrapper bgColor="bg-gradient-to-br from-white to-gray-50">
      <motion.div
        className="max-w-4xl mx-auto"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <MinimalShapes />
        <FloatingElement emoji="❤️" delay={0} />
        <FloatingElement emoji="🤝" delay={0.4} />

        <motion.p
          className="text-2xl md:text-3xl leading-relaxed text-slate-800 font-light"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
          viewport={{ once: true }}
        >
          What I build aims to feel human rather than flashy. I prefer work that
          rewards curiosity: interfaces that respond with thoughtful
          micro-moments, visuals that respect a viewer's attention, interactions
          that feel like gentle invitations. For me, art is not just decoration;
          it's how meaning is made. It guides decisions about clarity, tone, and
          kindness toward the person using whatever I create.
        </motion.p>
      </motion.div>
    </SectionWrapper>
  );
}

// Section 7: Conclusion
function ConclusionSection() {
  return (
    <SectionWrapper bgColor="bg-gradient-to-br from-violet-900 via-purple-900 to-indigo-900">
      <motion.div
        className="max-w-4xl mx-auto"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <UnifyingElements />
        <FloatingElement emoji="🌟" delay={0} />
        <FloatingElement emoji="🔄" delay={0.3} />
        <FloatingElement emoji="💫" delay={0.6} />

        <motion.p
          className="text-2xl md:text-3xl leading-relaxed text-white font-light mb-12"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2 }}
          viewport={{ once: true }}
        >
          Mostly, art is practice. It's the steady repetition of small,
          thoughtful choices — the same patience I bring to a controlled set in
          the gym. Each humble prototype, edit, and revision sharpens my sense
          of what feels right. I'm still learning, but I keep showing up.
          Because in the end, making art — whether with code, breath, or muscle
          — is a habit that teaches me how to make things better for other
          people, and that's the part I care about most.
        </motion.p>

        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="inline-block text-white/60 text-lg"
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ repeat: Infinity, duration: 3 }}
          >
            Art is practice. Practice is art.
          </motion.div>
        </motion.div>
      </motion.div>
    </SectionWrapper>
  );
}

// Enhanced Background Components

// Removed heavy grid background - using simpler version

// Removed heavy floating code elements

// Removed heavy dancing and flowing elements for performance

// Removed heavy pulsing and strength visualization for performance

// Removed heavy layered and inspiration elements for performance

// Removed all heavy scroll-responsive background elements for better performance

// Reusable Components

function SectionWrapper({ children, bgColor }) {
  return (
    <section
      className={`min-h-screen flex items-center justify-center px-6 py-20 ${bgColor} relative overflow-hidden`}
    >
      {children}
    </section>
  );
}

function FloatingElement({ emoji, delay }) {
  // Create a simple hash from emoji for consistent positioning
  const emojiHash = emoji.split("").reduce((hash, char) => {
    return ((hash << 5) - hash + char.charCodeAt(0)) & 0xffffffff;
  }, 0);

  return (
    <motion.div
      className="absolute text-4xl opacity-20"
      style={{
        left: `${getSeededValue(Math.abs(emojiHash), 10, 90)}%`,
        top: `${getSeededValue(Math.abs(emojiHash) + 1000, 10, 90)}%`,
      }}
      animate={{
        y: [-20, 20, -20],
        rotate: [-5, 5, -5],
      }}
      transition={{
        repeat: Infinity,
        duration: 4 + getSeededValue(Math.abs(emojiHash) + 2000, 0, 2),
        delay: delay,
      }}
    >
      {emoji}
    </motion.div>
  );
}

function GridBackground() {
  return (
    <div className="absolute inset-0 opacity-10">
      <div className="grid grid-cols-12 gap-1 h-full">
        {Array.from({ length: 144 }, (_, i) => (
          <motion.div
            key={i}
            className="bg-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.5, 0] }}
            transition={{
              repeat: Infinity,
              duration: 2,
              delay: i * 0.05,
            }}
          />
        ))}
      </div>
    </div>
  );
}

function DancingElements() {
  const elements = Array.from({ length: 6 }, (_, i) => i);

  return (
    <div className="absolute inset-0 opacity-20">
      {elements.map((el) => (
        <motion.div
          key={el}
          className="absolute w-8 h-8 bg-pink-300 rounded-full"
          style={{
            left: `${20 + el * 12}%`,
            top: `${30 + (el % 2) * 40}%`,
          }}
          animate={{
            y: [-30, 30, -30],
            x: [-15, 15, -15],
            scale: [1, 1.2, 1],
          }}
          transition={{
            repeat: Infinity,
            duration: 3 + el * 0.5,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

function RhythmicShapes() {
  const shapes = Array.from({ length: 8 }, (_, i) => i);

  return (
    <div className="absolute inset-0 opacity-20">
      {shapes.map((shape) => (
        <motion.div
          key={shape}
          className="absolute bg-orange-400"
          style={{
            width: `${20 + shape * 5}px`,
            height: `${20 + shape * 5}px`,
            left: `${10 + shape * 10}%`,
            top: `${50}%`,
          }}
          animate={{
            scaleY: [1, 2, 1],
            rotateZ: [0, 180, 360],
          }}
          transition={{
            repeat: Infinity,
            duration: 1.5,
            delay: shape * 0.1,
          }}
        />
      ))}
    </div>
  );
}

function CollageElements() {
  const elements = Array.from({ length: 10 }, (_, i) => i);

  return (
    <div className="absolute inset-0 opacity-15">
      {elements.map((el) => (
        <motion.div
          key={el}
          className={`absolute rounded ${
            el % 3 === 0
              ? "bg-emerald-400"
              : el % 3 === 1
              ? "bg-teal-400"
              : "bg-cyan-400"
          }`}
          style={{
            width: `${30 + getSeededValue(el * 5, 0, 40)}px`,
            height: `${20 + getSeededValue(el * 5 + 1, 0, 30)}px`,
            left: `${getSeededValue(el * 5 + 2, 0, 90)}%`,
            top: `${getSeededValue(el * 5 + 3, 0, 90)}%`,
            transform: `rotate(${getSeededValue(el * 5 + 4, 0, 45)}deg)`,
          }}
          animate={{
            rotate: [0, 360],
            scale: [1, 1.1, 1],
          }}
          transition={{
            repeat: Infinity,
            duration: 8 + getSeededValue(el + 200, 0, 4),
          }}
        />
      ))}
    </div>
  );
}

function MinimalShapes() {
  return (
    <div className="absolute inset-0 opacity-10">
      <motion.div
        className="absolute top-1/4 left-1/4 w-32 h-32 border border-gray-300 rounded-full"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-gray-200"
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ repeat: Infinity, duration: 4 }}
      />
    </div>
  );
}

function UnifyingElements() {
  const elements = Array.from({ length: 12 }, (_, i) => i);

  return (
    <div className="absolute inset-0 opacity-20">
      {elements.map((el) => (
        <motion.div
          key={el}
          className="absolute w-1 bg-gradient-to-b from-purple-400 to-pink-400"
          style={{
            height: `${100 + getSeededValue(el + 300, 0, 200)}px`,
            left: `${el * 8}%`,
            top: `${getSeededValue(el + 400, 0, 50)}%`,
          }}
          animate={{
            scaleY: [0.5, 1.5, 0.5],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            repeat: Infinity,
            duration: 3,
            delay: el * 0.2,
          }}
        />
      ))}
    </div>
  );
}

//---------------------------------------------
// Lightweight visual components for Philosophy section
//---------------------------------------------
function ElegantMinimalShapes({ scrollProgress }) {
  // A simple centered square that subtly scales with scroll
  const scale = useTransform(scrollProgress ?? 0, [0, 1], [1, 1.05]);

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center pointer-events-none"
      style={{ scale }}
    >
      <div className="w-1/2 h-1/2 border border-gray-300 rounded-xl" />
    </motion.div>
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

//---------------------------------------------
// Main page component
//---------------------------------------------
