"use client";

import { motion } from "framer-motion";
import { SectionWrapper } from "./shared";
import { Footprints } from "lucide-react";
import { useState, useEffect, useRef, useCallback } from "react";

function FootstepTrail() {
  const [footsteps, setFootsteps] = useState([]);
  const containerRef = useRef(null);
  const lastSpawnTime = useRef(0);
  const lastPosition = useRef({ x: 0, y: 0 });
  const footstepId = useRef(0);
  const isInitialized = useRef(false);

  const handleMouseMove = useCallback((e) => {
    if (!containerRef.current) return;

    // Get the section container dimensions relative to the viewport
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Initialize position if first time
    if (!isInitialized.current) {
      lastPosition.current = { x, y };
      lastSpawnTime.current = Date.now();
      isInitialized.current = true;
      return;
    }

    const now = Date.now();

    // Only spawn footstep after 120ms delay
    if (now - lastSpawnTime.current < 120) return;

    // Calculate movement direction from last spawn point to current position
    const deltaX = x - lastPosition.current.x;
    const deltaY = y - lastPosition.current.y;

    // Only spawn if there's significant movement
    if (Math.abs(deltaX) < 10 && Math.abs(deltaY) < 10) return;

    // Calculate rotation based on movement direction
    // atan2 gives us the angle in radians, convert to degrees
    // We add 90 degrees because the footprint icon points up by default
    // and we want it to point in the direction of movement
    const rotation = Math.atan2(deltaY, deltaX) * (180 / Math.PI) + 90;

    // Add footstep at the last spawn position (where the foot was placed)
    const newFootstep = {
      id: footstepId.current++,
      x: lastPosition.current.x,
      y: lastPosition.current.y,
      timestamp: now,
      rotation: rotation,
    };

    setFootsteps((prev) => [...prev, newFootstep]);

    // Update last spawn position and time
    lastPosition.current = { x, y };
    lastSpawnTime.current = now;
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Attach mouse move listener to the container
    container.addEventListener("mousemove", handleMouseMove);

    // Clean up old footsteps every 100ms
    const cleanup = setInterval(() => {
      const now = Date.now();
      setFootsteps((prev) =>
        prev.filter((footstep) => now - footstep.timestamp < 4000)
      );
    }, 100);

    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      clearInterval(cleanup);
    };
  }, [handleMouseMove]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 z-10"
      style={{ pointerEvents: "auto" }}
    >
      {/* Footsteps layer */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {footsteps.map((footstep, index) => (
          <motion.div
            key={footstep.id}
            className="absolute"
            style={{
              left: footstep.x - 12,
              top: footstep.y - 12,
            }}
            initial={{ 
              opacity: 0, 
              scale: 0.3, 
              rotate: footstep.rotation 
            }}
            animate={{
              opacity: [0, 0.8, 0.6, 0],
              scale: [0.3, 1, 1.1, 1.2],
              y: [0, -2, -4, -8],
              rotate: footstep.rotation,
            }}
            transition={{ 
              duration: 4, 
              ease: "easeOut",
              times: [0, 0.1, 0.5, 1]
            }}
          >
            <Footprints 
              size={24} 
              className="text-orange-200 drop-shadow-lg" 
              style={{
                filter: `hue-rotate(${index * 10}deg) brightness(0.9)`
              }}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// Training Section with footstep cursor trail
function EnhancedTrainingSection({ setIsHovering }) {
  return (
    <SectionWrapper bgColor="bg-gradient-to-br from-red-900 to-orange-900">
      <div className="relative w-full h-full">
        {/* Footstep trail covers the entire section */}
        <FootstepTrail />

        {/* Content container */}
        <motion.div
          className="max-w-4xl mx-auto relative z-30 pointer-events-none"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <motion.p
            className="text-2xl md:text-3xl leading-relaxed text-white font-light"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
            viewport={{ once: true }}
          >
            Off-screen, working out trains that same sensibility. Lifting
            slowly, focusing on form, noticing the subtle shifts in tension,
            it's practice in precision. There's beauty in repetition when it's
            attentive. Doing a set with care teaches me to notice nuance: where
            a line sits in a layout, how a color reads at different sizes,
            whether an animation is too fast or just right.
          </motion.p>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}

export default EnhancedTrainingSection;
