"use client";

import { motion } from "framer-motion";
import { useRef, useState, useEffect, useCallback } from "react";
import { SectionWrapper } from "./shared";
import Image from "next/image";

// Photo Gallery Component
function PhotoGallery() {
  const [currentPhoto, setCurrentPhoto] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  const photos = [
    { src: "/img/1.jpg", alt: "Art piece 1" },
    { src: "/img/2.jpg", alt: "Art piece 2" },
    { src: "/img/3.jpg", alt: "Art piece 3" },
    { src: "/img/4.jpg", alt: "Art piece 4" },
  ];

  const nextPhoto = useCallback((e) => {
    e?.stopPropagation();
    setCurrentPhoto((prev) => (prev + 1) % photos.length);
    setImageError(false);
  }, [photos.length]);

  const prevPhoto = useCallback((e) => {
    e?.stopPropagation();
    setCurrentPhoto((prev) => (prev - 1 + photos.length) % photos.length);
    setImageError(false);
  }, [photos.length]);

  const openFullscreen = useCallback(() => {
    setIsFullscreen(true);
    // Prevent background scrolling
    document.body.style.overflow = 'hidden';
  }, []);

  const closeFullscreen = useCallback(() => {
    setIsFullscreen(false);
    // Restore background scrolling
    document.body.style.overflow = 'unset';
  }, []);

  // Keyboard navigation for fullscreen
  useEffect(() => {
    if (!isFullscreen) return;

    const handleKeyPress = (e) => {
      switch (e.key) {
        case 'Escape':
          closeFullscreen();
          break;
        case 'ArrowLeft':
          prevPhoto();
          break;
        case 'ArrowRight':
          nextPhoto();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isFullscreen, prevPhoto, nextPhoto, closeFullscreen]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <>
      <div className="relative w-full max-w-2xl mx-auto">
        <div 
          className="relative h-96 rounded-2xl overflow-hidden bg-gray-900/50 backdrop-blur-sm border border-white/10 cursor-pointer"
          onClick={openFullscreen}
        >
          {!imageError ? (
            <Image
              key={currentPhoto}
              src={photos[currentPhoto].src}
              alt={photos[currentPhoto].alt}
              fill
              className="object-cover transition-opacity duration-500"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              onError={() => setImageError(true)}
              priority={currentPhoto === 0}
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-white/60">
              <div className="text-center">
                <div className="text-4xl mb-2">🖼️</div>
                <p className="text-sm">Image loading...</p>
              </div>
            </div>
          )}
          
          {/* Navigation Arrows */}
          <button
            onClick={prevPhoto}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/70 transition-all duration-200 z-10"
          >
            ←
          </button>
          <button
            onClick={nextPhoto}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/70 transition-all duration-200 z-10"
          >
            →
          </button>

          {/* Click to expand hint */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full text-white/80 text-xs">
            Click to expand
          </div>
        </div>
        
        {/* Photo Indicators */}
        <div className="flex justify-center mt-4 space-x-2">
          {photos.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentPhoto(index);
                setImageError(false);
              }}
              className={`w-2 h-2 rounded-full transition-all duration-200 ${
                index === currentPhoto ? "bg-white" : "bg-white/30"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Fullscreen Modal */}
      {isFullscreen && (
        <div className="fixed inset-0 z-[9999] bg-black/98 backdrop-blur-md flex items-center justify-center">
          <div className="relative w-full h-full flex items-center justify-center p-4">
            {/* Close button */}
            <button
              onClick={closeFullscreen}
              className="absolute top-6 right-6 w-12 h-12 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/80 transition-all duration-200 z-[10000] border border-white/20"
            >
              ✕
            </button>
            
            {/* Full image */}
            <div className="relative max-w-7xl max-h-full w-full h-full flex items-center justify-center z-[9999]">
              <Image
                key={currentPhoto}
                src={photos[currentPhoto].src}
                alt={photos[currentPhoto].alt}
                fill
                className="object-contain"
                sizes="100vw"
                priority
              />
            </div>
            
            {/* Navigation in fullscreen */}
            <button
              onClick={prevPhoto}
              className="absolute left-6 top-1/2 transform -translate-y-1/2 w-14 h-14 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/80 transition-all duration-200 z-[10000] border border-white/20 text-xl"
            >
              ←
            </button>
            <button
              onClick={nextPhoto}
              className="absolute right-6 top-1/2 transform -translate-y-1/2 w-14 h-14 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/80 transition-all duration-200 z-[10000] border border-white/20 text-xl"
            >
              →
            </button>

            {/* Photo indicators in fullscreen */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-[10000]">
              {photos.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPhoto(index)}
                  className={`w-4 h-4 rounded-full transition-all duration-200 border border-white/30 ${
                    index === currentPhoto ? "bg-white" : "bg-white/20 hover:bg-white/40"
                  }`}
                />
              ))}
            </div>

            {/* Current photo indicator */}
            <div className="absolute top-6 left-6 bg-black/60 backdrop-blur-sm px-4 py-2 rounded-full text-white/80 text-sm z-[10000] border border-white/20">
              {currentPhoto + 1} / {photos.length}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// Scrolling Text Effects for "Art is practice"
function ScrollingTextEffect({ scrollProgress }) {
  const textInstances = Array.from({ length: 6 }, (_, i) => ({
    id: i,
    opacity: Math.max(0, Math.min(0.4, scrollProgress * 1.5 - i * 0.2)),
    scale: 1 + (scrollProgress * 0.3) * (1 - i * 0.1),
    y: -i * 50,
  }));

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      {textInstances.map((instance, index) => (
        <motion.div
          key={instance.id}
          className="absolute text-3xl md:text-5xl font-light text-white/20"
          style={{
            opacity: instance.opacity,
            transform: `scale(${instance.scale}) translateY(${instance.y}px)`,
            zIndex: 5 - index,
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
    if (!isMounted || !showEssay) return;
    
    let cleanup = null;
    
    const setupScrollListener = () => {
      const handleScroll = () => {
        if (!scrollTextRef.current) return;
        
        const element = scrollTextRef.current;
        const rect = element.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        let progress = 0;
        if (rect.top < windowHeight && rect.bottom > 0) {
          progress = Math.max(0, Math.min(1, (windowHeight - rect.top) / (windowHeight + rect.height)));
        }
        
        setScrollProgress(progress);
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
  }, [isMounted, showEssay]);

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
        className="max-w-4xl mx-auto relative min-h-screen"
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
        {/* Background gradients */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-gray-900/30 to-transparent" />
          <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-gray-800/20 to-transparent" />
          <div className="absolute top-1/2 left-0 w-full h-1/4 bg-gradient-to-r from-transparent via-white/5 to-transparent" />
        </div>

        {/* Cinematic Introduction */}
        {showPrompt && isInView && (
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center z-50 bg-black"
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
          <>
            <motion.div
              className="py-20 min-h-screen flex flex-col justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
            >
        <motion.p
                className="text-2xl md:text-3xl leading-relaxed text-white font-light mb-20"
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
                {/* Radial gradient background for text section */}
                <div className="absolute inset-0 bg-gradient-radial from-white/5 via-transparent to-transparent" />
                
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
                      opacity: scrollProgress > 0.5 ? 1 : 0,
                      y: scrollProgress > 0.5 ? 0 : 20
                    }}
                    transition={{ duration: 0.8 }}
                  >
                    ~ Carl
                  </motion.div>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Photo Gallery Section */}
            <motion.div
              className="py-20 px-8 relative"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              viewport={{ once: true }}
            >
              {/* Subtle gradient background for gallery */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-900/10 to-transparent rounded-3xl" />
              
              <motion.h3
                className="text-3xl md:text-4xl font-light text-white text-center mb-12 relative z-10"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1 }}
                viewport={{ once: true }}
              >
                Visual Expressions
              </motion.h3>
              <div className="relative z-10">
                <PhotoGallery />
              </div>
            </motion.div>

            {/* Portfolio Link Section */}
            <motion.div
              className="py-20 px-8 text-center relative"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              viewport={{ once: true }}
            >
              {/* Subtle gradient background */}
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/20 via-transparent to-transparent rounded-3xl" />
              
              <motion.p
                className="text-xl text-white/80 mb-8 font-light relative z-10"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1 }}
                viewport={{ once: true }}
              >
                More of my Works:
              </motion.p>
              <motion.button
                onClick={() => window.open("https://cosmic-portfolio-xi.vercel.app/", "_blank", "noopener,noreferrer")}
                className="inline-flex items-center justify-center px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 rounded-full text-white font-light text-lg transition-all duration-300 hover:scale-105 relative z-10 cursor-pointer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Explore Other Works →
              </motion.button>
        </motion.div>
          </>
        )}

        {/* Simple background texture */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[length:100px_100px]" />
        </div>
      </motion.div>
    </SectionWrapper>
  );
}

export default EnhancedConclusionSection;
