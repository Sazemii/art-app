"use client";

import { motion } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { SectionWrapper } from "./shared";
import Image from "next/image";

// Photo Gallery Component
function PhotoGallery() {
  const [currentPhoto, setCurrentPhoto] = useState(0);
  const photos = [
    { src: "/img/1.jpg", alt: "Art piece 1" },
    { src: "/img/2.jpg", alt: "Art piece 2" },
    { src: "/img/3.jpg", alt: "Art piece 3" },
    { src: "/img/4.jpg", alt: "Art piece 4" },
  ];

  const nextPhoto = () => {
    setCurrentPhoto((prev) => (prev + 1) % photos.length);
  };

  const prevPhoto = () => {
    setCurrentPhoto((prev) => (prev - 1 + photos.length) % photos.length);
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <div className="relative h-96 rounded-2xl overflow-hidden bg-gray-900/20 backdrop-blur-sm">
        <motion.div
          key={currentPhoto}
          className="absolute inset-0"
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.5 }}
        >
          <Image
            src={photos[currentPhoto].src}
            alt={photos[currentPhoto].alt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </motion.div>
        
        {/* Navigation Arrows */}
        <button
          onClick={prevPhoto}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-all duration-200"
        >
          ←
        </button>
        <button
          onClick={nextPhoto}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-all duration-200"
        >
          →
        </button>
      </div>
      
      {/* Photo Indicators */}
      <div className="flex justify-center mt-4 space-x-2">
        {photos.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPhoto(index)}
            className={`w-2 h-2 rounded-full transition-all duration-200 ${
              index === currentPhoto ? "bg-white" : "bg-white/30"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

// Seeded random function for consistent positioning
function seededRandom(seed) {
  const a = 1664525;
  const c = 1013904223;
  const m = Math.pow(2, 32);
  const value = (a * seed + c) % m;
  return value / m;
}

// Floating Background Elements
function FloatingBackground() {
  const elements = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    x: seededRandom(i * 123) * 100,
    y: seededRandom(i * 456) * 100,
    size: 20 + seededRandom(i * 789) * 60,
    duration: 10 + seededRandom(i * 321) * 20,
    delay: seededRandom(i * 654) * 5,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden">
      {elements.map((element) => (
        <motion.div
          key={element.id}
          className="absolute rounded-full bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm"
          style={{
            left: `${element.x}%`,
            top: `${element.y}%`,
            width: element.size,
            height: element.size,
          }}
          animate={{
            y: [-20, 20, -20],
            x: [-10, 10, -10],
            opacity: [0.3, 0.7, 0.3],
            scale: [1, 1.2, 1],
          }}
          transition={{
            repeat: Infinity,
            duration: element.duration,
            delay: element.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

// Scrolling Text Effects
function ScrollingTextEffect({ scrollProgress }) {
  const textInstances = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    opacity: Math.max(0, Math.min(1, scrollProgress * 2 - i * 0.15)),
    scale: 1 + (scrollProgress * 0.3) * (1 - i * 0.1),
    y: -i * 40,
  }));

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      {textInstances.map((instance, index) => (
        <motion.div
          key={instance.id}
          className="absolute text-4xl md:text-6xl font-light text-white/20"
          style={{
            opacity: instance.opacity,
            transform: `scale(${instance.scale}) translateY(${instance.y}px)`,
            zIndex: 10 - index,
          }}
        >
          Art is practice. Practice is art.
        </motion.div>
      ))}
    </div>
  );
}

// Enhanced Conclusion Section with Cinematic Introduction
function EnhancedConclusionSection({ setIsHovering }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [showPrompt, setShowPrompt] = useState(true);
  const [showEssay, setShowEssay] = useState(false);
  const [showGallery, setShowGallery] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const sectionRef = useRef(null);
  const scrollTextRef = useRef(null);
  
  // Ensure client-side only rendering
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  // Custom scroll effect for text multiplication
  useEffect(() => {
    if (!isMounted) return;
    
    let cleanup = null;
    
    const setupScrollListener = () => {
      if (!scrollTextRef.current) return;
      
      const handleScroll = () => {
        const element = scrollTextRef.current;
        if (!element) return;
        
        const rect = element.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        let progress = 0;
        if (rect.top < windowHeight && rect.bottom > 0) {
          progress = Math.max(0, Math.min(1, (windowHeight - rect.top) / (windowHeight + rect.height)));
        }
        
        setScrollProgress(progress);
        
        // Show gallery when scroll progress is high
        if (progress > 0.8 && !showGallery) {
          setShowGallery(true);
        }
      };
      
      window.addEventListener('scroll', handleScroll);
      handleScroll();
      
      cleanup = () => window.removeEventListener('scroll', handleScroll);
    };
    
    const timer = setTimeout(setupScrollListener, 100);
    
    return () => {
      clearTimeout(timer);
      if (cleanup) cleanup();
    };
  }, [isMounted, showEssay, showGallery]);

  // Sequential text steps
  const textSteps = [
    {
      text: "So, what really is art for me?",
      className: "text-4xl md:text-6xl font-light text-white",
      delay: 0.5
    },
    {
      text: "Well to be honest, art is really hard to define.",
      className: "text-2xl md:text-3xl font-light text-white/80",
      delay: 1.5
    },
    {
      text: "Defining and determining the meaning of art is art itself.",
      className: "text-xl md:text-2xl font-light text-white/70",
      delay: 2.5
    },
    {
      text: "But personally? For me...",
      className: "text-3xl md:text-4xl font-light text-white",
      delay: 3.5
    },
    {
      text: "Mostly, art is practice.",
      className: "text-4xl md:text-5xl font-light text-white",
      delay: 4.5
    }
  ];

  // Auto-progress through steps
  useEffect(() => {
    if (!isInView || !showPrompt) return;

    const timers = textSteps.map((step, index) => {
      return setTimeout(() => {
        setCurrentStep(index + 1);
      }, step.delay * 1000);
    });

    // Transition to essay after all steps
    const finalTimer = setTimeout(() => {
      setShowPrompt(false);
      setTimeout(() => {
        setShowEssay(true);
      }, 800);
    }, 6500);

    return () => {
      timers.forEach(clearTimeout);
      clearTimeout(finalTimer);
    };
  }, [isInView, showPrompt]);

  // Handle manual progression
  const handleInteraction = () => {
    if (currentStep < textSteps.length) {
      setCurrentStep(prev => prev + 1);
    } else {
      setShowPrompt(false);
      setTimeout(() => {
        setShowEssay(true);
      }, 800);
    }
  };

  return (
    <SectionWrapper bgColor="bg-black">
      <motion.div
        ref={sectionRef}
        className="relative"
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
        onClick={showPrompt ? handleInteraction : undefined}
        style={{
          cursor: showPrompt ? "pointer" : "default",
        }}
      >
        {/* Floating Background */}
        <FloatingBackground />

        {/* Cinematic Introduction */}
        {showPrompt && isInView && (
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center z-50 bg-black min-h-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          >
            <div className="text-center space-y-8 max-w-4xl px-8">
              {textSteps.map((step, index) => (
                <motion.div
                  key={index}
                  className={step.className}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{
                    opacity: currentStep > index ? 1 : 0,
                    y: currentStep > index ? 0 : 30,
                  }}
                  transition={{ 
                    duration: 0.8, 
                    ease: "easeOut",
                    delay: currentStep === index + 1 ? 0.2 : 0
                  }}
                >
                  {step.text}
                </motion.div>
              ))}
            </div>

            {/* Interaction hint */}
            <motion.div
              className="absolute bottom-20 left-1/2 transform -translate-x-1/2"
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: currentStep >= textSteps.length ? 1 : 0,
                y: currentStep >= textSteps.length ? 0 : 20
              }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <motion.p
                className="text-white/60 text-sm tracking-wider uppercase mb-4"
                animate={{ opacity: [0.6, 1, 0.6] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                Tap to continue
              </motion.p>
              <motion.div
                className="w-2 h-2 bg-white/30 rounded-full mx-auto"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.3, 0.8, 0.3],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 2,
                }}
              />
            </motion.div>
          </motion.div>
        )}

        {/* Essay Content */}
        {showEssay && (
          <motion.div
            className="py-20 min-h-screen flex flex-col justify-center max-w-4xl mx-auto relative z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <motion.p
              className="text-2xl md:text-3xl leading-relaxed text-white font-light mb-20 px-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              Mostly, art is practice. It's the steady repetition of small,
              thoughtful choices, the same patience I bring to a controlled set in
              the gym. Each humble prototype, edit, and revision sharpens my sense
              of what feels right. I'm still learning, but I keep showing up.
              Because in the end, making art, whether with code, breath, or muscle,
              is a habit that teaches me how to make things better for other people,
              and that's the part I care about most.
            </motion.p>

            {/* Scrolling Text Effects Section */}
            <motion.div
              ref={scrollTextRef}
              className="relative min-h-screen flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1 }}
            >
              <ScrollingTextEffect scrollProgress={scrollProgress} />
              
              {/* Main prominent text */}
              <motion.div
                className="relative z-20 text-center"
                style={{
                  transform: `scale(${1 + scrollProgress * 0.2})`,
                }}
              >
                <motion.div
                  className="text-4xl md:text-6xl font-light text-white tracking-wider"
                  animate={{
                    textShadow: [
                      "0 0 20px rgba(255,255,255,0.5)",
                      "0 0 40px rgba(255,255,255,0.8)",
                      "0 0 20px rgba(255,255,255,0.5)"
                    ]
                  }}
                  transition={{
                    textShadow: {
                      repeat: Infinity,
                      duration: 3,
                      ease: "easeInOut"
                    }
                  }}
                >
                  Art is practice. Practice is art.
                </motion.div>
                
                {/* Signature */}
                <motion.div
                  className="mt-8 text-xl text-white/60 font-light italic"
                  initial={{ opacity: 0 }}
                  animate={{ 
                    opacity: scrollProgress > 0.7 ? 1 : 0,
                    y: scrollProgress > 0.7 ? 0 : 20
                  }}
                  transition={{ duration: 0.8 }}
                >
                  ~ Carl
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Photo Gallery Section */}
            {showGallery && (
              <motion.div
                className="py-20 px-8"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.5 }}
              >
                <motion.h3
                  className="text-3xl md:text-4xl font-light text-white text-center mb-12"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1 }}
                >
                  Visual Expressions
                </motion.h3>
                <PhotoGallery />
              </motion.div>
            )}

            {/* Portfolio Link Section */}
            {showGallery && (
              <motion.div
                className="py-20 px-8 text-center"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 1 }}
              >
                <motion.p
                  className="text-xl text-white/80 mb-8 font-light"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1 }}
                >
                  More of my Works:
                </motion.p>
                <motion.a
                  href="https://cosmic-portfolio-xi.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 rounded-full text-white font-light text-lg transition-all duration-300 hover:scale-105"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Explore Portfolio →
                </motion.a>
              </motion.div>
            )}
          </motion.div>
        )}
      </motion.div>
    </SectionWrapper>
  );
}

export default EnhancedConclusionSection;
  