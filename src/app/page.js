"use client";

import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useVelocity,
  useMotionValue,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import LanguageLoader from "../components/LanguageLoader";

// Import section components
import HeroSection from "../components/HeroSection";
import EnhancedThreadSection from "../components/EnhancedThreadSection";
import EnhancedScreenSection from "../components/EnhancedScreenSection";
import EnhancedMotionSection from "../components/EnhancedMotionSection";
import EnhancedTrainingSection from "../components/EnhancedTrainingSection";
import EnhancedInspirationSection from "../components/EnhancedInspirationSection";
import EnhancedPhilosophySection from "../components/EnhancedPhilosophySection";
import EnhancedConclusionSection from "../components/EnhancedConclusionSection";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Home() {
  const containerRef = useRef(null);

  // Loading state management
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);

  // Handle loading completion
  const handleLoadingComplete = () => {
    setIsLoading(false);
    setTimeout(() => {
      setShowContent(true);
    }, 100);
  };

  // Show loading screen first
  if (isLoading) {
    return <LanguageLoader onComplete={handleLoadingComplete} />;
  }

  return <MainContent containerRef={containerRef} showContent={showContent} />;
}

// Separate component for main content to handle scroll after loading
function MainContent({ containerRef, showContent }) {
  // Setup scroll only in main content component
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Cursor tracking with motion values for optimal performance
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [isHovering, setIsHovering] = useState(false);

  // Smooth spring animation for scroll
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
  });

  // Scroll velocity for advanced effects
  const scrollVelocity = useVelocity(scrollYProgress);
  const velocityFactor = useTransform(scrollVelocity, [-0.5, 0.5], [0.2, 1.5]);

  // High-performance mouse tracking
  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

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
    <>
      {/* Main Content with entrance animation */}
      <motion.div
        ref={containerRef}
        className="relative scroll-smooth cursor-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: showContent ? 1 : 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* High-Performance Blended Cursor */}
        <BlendedCursor
          mouseX={mouseX}
          mouseY={mouseY}
          isHovering={isHovering}
        />

        {/* Enhanced progress indicator */}
        <motion.div
          className="fixed top-0 left-0 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 z-50 shadow-lg shadow-purple-500/20"
          style={{
            width: useTransform(smoothProgress, [0, 1], ["0%", "100%"]),
            opacity: useTransform(
              scrollVelocity,
              [-0.5, 0, 0.5],
              [0.3, 1, 0.3]
            ),
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
        <EnhancedThreadSection setIsHovering={setIsHovering} />
        <EnhancedScreenSection setIsHovering={setIsHovering} />
        <EnhancedMotionSection setIsHovering={setIsHovering} />
        <EnhancedTrainingSection setIsHovering={setIsHovering} />
        <EnhancedInspirationSection setIsHovering={setIsHovering} />
        <EnhancedPhilosophySection setIsHovering={setIsHovering} />
        <EnhancedConclusionSection setIsHovering={setIsHovering} />
      </motion.div>
    </>
  );
}

// High-Performance Blended Cursor with Mask Effect
function BlendedCursor({ mouseX, mouseY, isHovering }) {
  const cursorSize = useSpring(isHovering ? 100 : 50, {
    stiffness: 500,
    damping: 30,
  });

  return (
    <>
      {/* Main cursor circle with blend mode */}
      <motion.div
        className="fixed pointer-events-none z-50 hidden md:block"
        style={{
          left: mouseX,
          top: mouseY,
          width: cursorSize,
          height: cursorSize,
          x: "-50%",
          y: "-50%",
          backgroundColor: "#ffffff",
          borderRadius: "50%",
          mixBlendMode: "difference",
          willChange: "transform",
        }}
        transition={{
          type: "spring",
          stiffness: 1000,
          damping: 35,
          mass: 0.5,
        }}
      />

      {/* Outer ring for enhanced effect */}
      <motion.div
        className="fixed pointer-events-none z-40 hidden md:block border-3 border-white/30"
        style={{
          left: mouseX,
          top: mouseY,
          width: useSpring(isHovering ? 120 : 60, {
            stiffness: 400,
            damping: 30,
          }),
          height: useSpring(isHovering ? 120 : 60, {
            stiffness: 400,
            damping: 30,
          }),
          x: "-50%",
          y: "-50%",
          borderRadius: "50%",
          opacity: 0.6,
        }}
        transition={{
          type: "spring",
          stiffness: 800,
          damping: 30,
          mass: 0.3,
        }}
      />
    </>
  );
}
