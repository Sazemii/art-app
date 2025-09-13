"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

// Seeded random function for consistent positioning
function seededRandom(seed) {
  const a = 1664525;
  const c = 1013904223;
  const m = Math.pow(2, 32);
  const value = (a * seed + c) % m;
  return value / m;
}

const LanguageLoader = ({ onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  const [showZoomEffect, setShowZoomEffect] = useState(false);

  // Array of art in different languages - diverse words
  const artTranslations = [
    { text: "art?", lang: "English" },
    { text: "arte?", lang: "Spanish" },
    { text: "arte?", lang: "Italian" },
    { text: "arte?", lang: "Portuguese" },
    { text: "kunst?", lang: "German" },
    { text: "kunst?", lang: "Dutch" },
    { text: "konst?", lang: "Swedish" },
    { text: "taide?", lang: "Finnish" },
    { text: "sztuka?", lang: "Polish" },
    { text: "umeni?", lang: "Czech" },
    { text: "muveszet?", lang: "Hungarian" },
    { text: "arta?", lang: "Romanian" },
    { text: "sanat?", lang: "Turkish" },
    { text: "belles?", lang: "French" },
    { text: "bella?", lang: "Latin" },
    { text: "schone?", lang: "Austrian" },
    { text: "guzel?", lang: "Azerbaijani" },
    { text: "mys?", lang: "Welsh" },
    { text: "ealaín?", lang: "Irish" },
    { text: "ealain?", lang: "Scottish" },
    { text: "seni?", lang: "Indonesian" },
    { text: "kala?", lang: "Sanskrit" },
    { text: "geijutsu?", lang: "Japanese" },
    { text: "yishu?", lang: "Chinese" },
    { text: "takat?", lang: "Hindi" },
    { text: "kala?", lang: "Nepali" },
    { text: "nghệ?", lang: "Vietnamese" },
    { text: "예술?", lang: "Korean" },
    { text: "예?", lang: "Korean Short" },
    { text: "sining?", lang: "Filipino", isSpecial: true },
  ];

  // Generate deterministic particle positions
  const particlePositions = Array.from({ length: 30 }, (_, i) => ({
    left: seededRandom(i * 123) * 100,
    top: seededRandom(i * 456) * 100,
    duration: 2 + seededRandom(i * 789) * 3,
    delay: seededRandom(i * 321) * 2,
  }));

  // Ensure client-side only rendering to prevent hydration issues
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (currentIndex >= artTranslations.length) {
      // Animation complete, start fast exit
      setTimeout(() => {
        setIsVisible(false);
        setTimeout(() => {
          onComplete();
        }, 400); // Faster exit timing
      }, 100); // Reduced delay before exit
      return;
    }

    // Calculate delay with acceleration curve
    let currentDelay;

    if (currentIndex < 29) {
      // Accelerating progression - starts slow, gets faster
      const totalItems = 29;
      const progress = currentIndex / totalItems;

      // Exponential acceleration curve
      const accelerationFactor = Math.pow(1 - progress, 2);
      const baseDelay = 300; // Start slower
      const minDelay = 80; // End much faster
      const exitTime = 120;

      currentDelay = baseDelay * accelerationFactor + minDelay + exitTime;
    } else {
      // "sining" - shortened display time and trigger zoom effect
      currentDelay = 2000; // Reduced from 3500 to 2000

      // Start zoom effect after sining appears
      setTimeout(() => {
        setShowZoomEffect(true);
      }, 800); // Start zoom 800ms after sining appears
    }

    const timer = setTimeout(() => {
      setCurrentIndex((prev) => prev + 1);
    }, currentDelay);

    return () => clearTimeout(timer);
  }, [currentIndex, artTranslations.length, onComplete]);

  if (!isVisible) {
    return (
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50"
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
      />
    );
  }

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50"
      animate={
        showZoomEffect
          ? {
              scale: [1, 2, 4, 8],
              opacity: [1, 0.8, 0.4, 0],
            }
          : {}
      }
      transition={
        showZoomEffect
          ? {
              duration: 1.2,
              times: [0, 0.3, 0.7, 1],
              ease: "easeInOut",
            }
          : {}
      }
    >
      {/* Enhanced Background Pattern with Better Visibility */}
      <div className="absolute inset-0 opacity-60">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.3)_1px,transparent_1px)] bg-[length:40px_40px]" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(99,102,241,0.2)_1px,transparent_1px)] bg-[length:60px_60px]" />
        <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(147,197,253,0.2)_1px,transparent_1px)] bg-[length:60px_60px]" />
      </div>

      {/* Enhanced Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-100/50 via-transparent to-purple-100/50"></div>

      {/* Animated Background Elements - Only render after mounting */}
      {isMounted && (
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
        >
          {particlePositions.map((particle, i) => (
            <motion.div
              key={i}
              className="absolute w-3 h-3 bg-[#0x875cff] rounded-full"
              style={{
                left: `${particle.left}%`,
                top: `${particle.top}%`,
              }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: particle.duration,
                repeat: Infinity,
                delay: particle.delay,
              }}
            />
          ))}
        </motion.div>
      )}

      {/* Main Content Container */}
      <div className="relative z-10 text-center">
        {/* Language Text Display */}
        <div className="relative h-32 flex items-center justify-center">
          <AnimatePresence mode="wait">
            {currentIndex < artTranslations.length && (
              <motion.div
                key={currentIndex}
                className="absolute"
                initial={{
                  opacity: 0,
                  scale: artTranslations[currentIndex].isSpecial ? 0.8 : 1,
                  y: artTranslations[currentIndex].isSpecial ? 20 : 0,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  scale: artTranslations[currentIndex].isSpecial ? 1.1 : 1,
                }}
                transition={{
                  duration: artTranslations[currentIndex].isSpecial
                    ? 1 // Much slower, more dramatic entrance for "sining"
                    : 0.08, // Faster for other words to match acceleration
                  ease: artTranslations[currentIndex].isSpecial
                    ? "easeOut"
                    : "easeInOut",
                }}
              >
                {/* Enhanced font stack for special characters */}
                <h1
                  className={`text-6xl md:text-8xl font-light tracking-wider drop-shadow-sm font-inter ${
                    artTranslations[currentIndex].isSpecial
                      ? "text-gray-900" // Special color for "sining"
                      : "text-gray-900"
                  }`}
                >
                  {artTranslations[currentIndex].text}
                </h1>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Language Label */}
        <motion.div
          className="mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <AnimatePresence mode="wait">
            {currentIndex < artTranslations.length && (
              <motion.p
                key={`lang-${currentIndex}`}
                className="text-sm text-gray-700 tracking-widest uppercase font-semibold font-inter"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              >
                {artTranslations[currentIndex].lang}
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Decorative Elements */}
        <motion.div
          className="absolute -bottom-20 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          <div className="flex space-x-2">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="w-2 h-2 bg-gray-800 rounded-full"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.6, 1, 0.6],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              />
            ))}
          </div>
        </motion.div>
      </div>

      {/* Vignette Effect */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-blue-50/30 pointer-events-none" />
    </motion.div>
  );
};

export default LanguageLoader;
