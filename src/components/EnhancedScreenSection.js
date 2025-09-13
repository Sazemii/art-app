"use client";

import { motion, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { SectionWrapper } from "./shared";

// Enhanced Screen Section with Light Interaction
function EnhancedScreenSection({ setIsHovering }) {
  const [lightMode, setLightMode] = useState(false);
  const [showPrompt, setShowPrompt] = useState(true);
  const [showSecondText, setShowSecondText] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const sectionRef = useRef(null);
  const [isInView, setIsInView] = useState(false);

  // Sequential text display effect
  useEffect(() => {
    if (!isInView) return;

    const timer = setTimeout(() => {
      setShowSecondText(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, [isInView]);

  // Track mouse position for light effect
  useEffect(() => {
    if (!lightMode || !sectionRef.current) return;

    const handleMouseMove = (e) => {
      const rect = sectionRef.current.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    };

    const section = sectionRef.current;
    section.addEventListener("mousemove", handleMouseMove);
    return () => section.removeEventListener("mousemove", handleMouseMove);
  }, [lightMode]);

  // Handle activation of light mode
  const activateLight = () => {
    setShowPrompt(false);
    setTimeout(() => {
      setLightMode(true);
    }, 800);
  };

  return (
    <SectionWrapper bgColor="bg-black">
      <motion.div
        ref={sectionRef}
        className="max-w-4xl mx-auto relative min-h-screen flex items-center justify-center"
        initial={{ opacity: 0 }}
        whileInView={{
          opacity: 1,
          transition: {
            duration: 1,
            onComplete: () => setIsInView(true),
          },
        }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        onClick={showPrompt ? activateLight : undefined}
        style={{
          cursor: showPrompt ? "pointer" : lightMode ? "none" : "default",
        }}
      >
        {/* Section Star Field Background */}
        <div className="absolute inset-0 z-0">
          <StarFieldBackground mousePosition={mousePosition} />
        </div>

        {/* Light Prompt Overlay */}
        {showPrompt && isInView && (
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center z-50 bg-black"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          >
            <motion.h2
              className="text-6xl md:text-8xl font-light text-white mb-8"
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              Light?
            </motion.h2>

            {/* Second text appears after 2.5 seconds */}
            <motion.p
              className="text-xl md:text-2xl text-white/80 font-light text-center max-w-2xl"
              initial={{ opacity: 0, y: 30 }}
              animate={{
                opacity: showSecondText ? 1 : 0,
                y: showSecondText ? 0 : 30,
              }}
              transition={{ duration: 1, delay: showSecondText ? 0.5 : 0 }}
            >
              We always need light. Press the screen for some light.
            </motion.p>

            <motion.div
              className="mt-8 w-2 h-2 bg-white/30 rounded-full"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                repeat: Infinity,
                duration: 2,
                delay: showSecondText ? 1 : 0,
              }}
              style={{
                opacity: showSecondText ? 1 : 0,
              }}
            />
          </motion.div>
        )}

        {/* Content with Light Masking Effect - Full Section Coverage */}
        <motion.div
          className="absolute inset-0 z-10"
          animate={{ opacity: lightMode ? 1 : 0 }}
          transition={{ duration: 1, delay: lightMode ? 0.3 : 0 }}
          style={{
            maskImage: lightMode
              ? `radial-gradient(circle 600px at ${mousePosition.x}px ${mousePosition.y}px, black 0%, black 40%, rgba(0,0,0,0.6) 60%, rgba(0,0,0,0.2) 80%, transparent 100%)`
              : "none",
            WebkitMaskImage: lightMode
              ? `radial-gradient(circle 600px at ${mousePosition.x}px ${mousePosition.y}px, black 0%, black 40%, rgba(0,0,0,0.6) 60%, rgba(0,0,0,0.2) 80%, transparent 100%)`
              : "none",
          }}
        >
          {/* Text content centered in the section */}
          <div className="flex items-center justify-center h-full">
            <motion.p
              className="text-2xl md:text-3xl leading-relaxed text-white font-light relative z-10 max-w-4xl mx-auto px-8"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: lightMode ? 1 : 0, x: lightMode ? 0 : -30 }}
              transition={{ duration: 0.6, delay: lightMode ? 0.5 : 0 }}
            >
              On the screen, art shows up as composition and timing. A web page
              is a blank stage where text, image, and motion must share the
              spotlight without stepping on each other. I think about balance
              the same way a painter thinks about negative space: what to leave
              empty so the important parts can breathe. Small choices, the size
              of a headline, the space between lines, the way a button eases
              into view, shape how someone experiences a moment online.
            </motion.p>
          </div>
        </motion.div>

        {/* Simple Light Cursor Effect */}
        {lightMode && (
          <motion.div
            className="absolute pointer-events-none z-20"
            style={{
              left: mousePosition.x,
              top: mousePosition.y,
              transform: "translate(-50%, -50%)",
            }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Single clean light effect */}
            <div
              className="absolute"
              style={{
                width: "600px",
                height: "600px",
                transform: "translate(-50%, -50%)",
                background:
                  "radial-gradient(circle, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.08) 30%, rgba(255, 255, 255, 0.04) 50%, rgba(255, 255, 255, 0.01) 70%, transparent 90%)",
                filter: "blur(3px)",
              }}
            />
          </motion.div>
        )}
      </motion.div>
    </SectionWrapper>
  );
}

// Star Field Background Component with cursor responsiveness
function StarFieldBackground({ mousePosition = { x: 0, y: 0 } }) {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const starsRef = useRef([]);
  const velocityRef = useRef({ x: 0, y: 0 });
  const lastMouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    let width, height;

    const config = {
      STAR_COLOR: "#fff",
      STAR_SIZE: 1,
      STAR_MIN_SCALE: 0.3,
      STAR_COUNT: 100,
      VELOCITY_MULTIPLIER: 0.3,
      DAMPING: 0.85,
    };

    const generate = () => {
      starsRef.current = [];
      for (let i = 0; i < config.STAR_COUNT; i++) {
        starsRef.current.push({
          x: Math.random() * width,
          y: Math.random() * height,
          z:
            config.STAR_MIN_SCALE + Math.random() * (1 - config.STAR_MIN_SCALE),
          opacity: 0.1 + Math.random() * 0.3,
          baseOpacity: 0.1 + Math.random() * 0.3,
        });
      }
    };

    const resize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      canvas.style.width = width + "px";
      canvas.style.height = height + "px";

      if (starsRef.current.length > 0) {
        starsRef.current.forEach((star) => {
          star.x = Math.random() * width;
          star.y = Math.random() * height;
        });
      }
    };

    const render = () => {
      context.clearRect(0, 0, width, height);

      starsRef.current.forEach((star) => {
        context.beginPath();
        context.arc(star.x, star.y, config.STAR_SIZE * star.z, 0, Math.PI * 2);
        context.fillStyle = config.STAR_COLOR;
        context.globalAlpha = star.opacity;
        context.fill();
      });
    };

    const animate = () => {
      // Calculate mouse velocity
      const mouseVelocityX =
        (mousePosition.x - lastMouseRef.current.x) * config.VELOCITY_MULTIPLIER;
      const mouseVelocityY =
        (mousePosition.y - lastMouseRef.current.y) * config.VELOCITY_MULTIPLIER;

      // Update velocity with damping
      velocityRef.current.x =
        velocityRef.current.x * config.DAMPING + mouseVelocityX;
      velocityRef.current.y =
        velocityRef.current.y * config.DAMPING + mouseVelocityY;

      // Update stars based on velocity
      starsRef.current.forEach((star) => {
        // Move stars in opposite direction of cursor movement
        star.x -= velocityRef.current.x * star.z;
        star.y -= velocityRef.current.y * star.z;

        // Wrap around screen
        if (star.x < -50) star.x = width + 50;
        if (star.x > width + 50) star.x = -50;
        if (star.y < -50) star.y = height + 50;
        if (star.y > height + 50) star.y = -50;

        // Gentle twinkling effect
        star.opacity += (Math.random() - 0.5) * 0.02;
        star.opacity = Math.max(0.05, Math.min(0.4, star.opacity));

        // Brighten stars near cursor
        const distToCursor = Math.sqrt(
          Math.pow(star.x - mousePosition.x, 2) +
            Math.pow(star.y - mousePosition.y, 2)
        );
        const proximityBoost = Math.max(0, 1 - distToCursor / 200) * 0.3;
        star.opacity = Math.min(0.7, star.baseOpacity + proximityBoost);
      });

      lastMouseRef.current = { x: mousePosition.x, y: mousePosition.y };
      render();
      animationRef.current = requestAnimationFrame(animate);
    };

    resize();
    generate();
    animate();

    window.addEventListener("resize", resize);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener("resize", resize);
    };
  }, [mousePosition]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{
        zIndex: 1,
      }}
    />
  );
}

export default EnhancedScreenSection;
