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
  const currentPosition = useRef({ x: 0, y: 0 });
  const footstepId = useRef(0);
  const isInitialized = useRef(false);

  const handleMouseMove = useCallback((e) => {
    if (!containerRef.current) return;

    // Get the section container dimensions relative to the viewport
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Update current position
    currentPosition.current = { x, y };

    // Initialize position if first time
    if (!isInitialized.current) {
      lastPosition.current = { x, y };
      lastSpawnTime.current = Date.now();
      isInitialized.current = true;
      return;
    }

    const now = Date.now();

    // Only spawn footstep after 500ms delay
    if (now - lastSpawnTime.current < 500) return;

    // Calculate movement direction from last spawn point
    const deltaX = x - lastPosition.current.x;
    const deltaY = y - lastPosition.current.y;

    // Only spawn if there's significant movement
    if (Math.abs(deltaX) < 5 && Math.abs(deltaY) < 5) return;

    // Calculate rotation based on movement direction
    let rotation = 0;
    if (Math.abs(deltaX) > 2 || Math.abs(deltaY) > 2) {
      rotation = Math.atan2(deltaY, deltaX) * (180 / Math.PI);
      // Adjust rotation so footprints point in direction of movement
      rotation += 90; // Footprints icon points up by default, so add 90 degrees
    }

    // Add footstep at current position
    const newFootstep = {
      id: footstepId.current++,
      x,
      y,
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
        prev.filter((footstep) => now - footstep.timestamp < 3000)
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
      className="absolute inset-0 z-0"
      style={{ pointerEvents: "auto" }}
    >
      {/* Footsteps layer */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {footsteps.map((footstep) => (
          <motion.div
            key={footstep.id}
            className="absolute text-black"
            style={{
              left: footstep.x - 12,
              top: footstep.y - 12,
              transform: `rotate(${footstep.rotation}deg)`,
            }}
            initial={{ opacity: 0.8, scale: 0.6 }}
            animate={{
              opacity: 0,
              scale: 1.2,
              y: -6,
              transition: { duration: 3, ease: "easeOut" },
            }}
          >
            <Footprints size={24} />
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
          className="max-w-4xl mx-auto relative z-20 pointer-events-none"
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
