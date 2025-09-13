"use client";

import { motion } from "framer-motion";
import { SectionWrapper, getSeededValue } from "./shared";

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
      initial={{ opacity: 0, scale: 0, rotate: -180 }}
      whileInView={{
        opacity: 0.2,
        scale: 1,
        rotate: 0,
      }}
      transition={{
        duration: 1.2,
        delay: delay,
        ease: "easeOut",
      }}
      viewport={{ once: true, margin: "-10%" }}
      animate={{
        y: [-20, 20, -20],
        rotate: [-5, 5, -5],
        transition: {
          repeat: Infinity,
          duration: 4 + getSeededValue(Math.abs(emojiHash) + 2000, 0, 2),
        },
      }}
    >
      {emoji}
    </motion.div>
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
          initial={{ opacity: 0, scaleY: 0 }}
          whileInView={{
            opacity: 0.3,
            scaleY: 0.5,
          }}
          viewport={{ once: true, margin: "-10%" }}
          animate={{
            scaleY: [0.5, 1.5, 0.5],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            opacity: {
              initial: { duration: 0.8, delay: el * 0.05, ease: "easeOut" },
              animate: { repeat: Infinity, duration: 3, delay: el * 0.2 },
            },
            scaleY: {
              initial: { duration: 0.8, delay: el * 0.05, ease: "easeOut" },
              animate: { repeat: Infinity, duration: 3, delay: el * 0.2 },
            },
          }}
        />
      ))}
    </div>
  );
}

// Clean Conclusion Section
function EnhancedConclusionSection({ setIsHovering }) {
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
          thoughtful choices, the same patience I bring to a controlled set in
          the gym. Each humble prototype, edit, and revision sharpens my sense
          of what feels right. I'm still learning, but I keep showing up.
          Because in the end, making art, whether with code, breath, or muscle ,
          is a habit that teaches me how to make things better for other people,
          and that's the part I care about most.
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

export default EnhancedConclusionSection;
