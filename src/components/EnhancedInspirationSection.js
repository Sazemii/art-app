"use client";

import { motion } from "framer-motion";
import { SectionWrapper, getSeededValue } from "./shared";

// CSS Animation Loader Component
function LoaderAnimation() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <style jsx>{`
        .loader {
          position: absolute;
          top: 88%;
          left: 90%;
          margin-top: -5.4em;
          margin-left: -5.4em;
          width: 10.8em;
          height: 10.8em;
        }

        .hill {
          position: absolute;
          width: 14.2em;
          height: 14.2em;
          top: 3.4em;
          left: 3.4em;
          border-left: 0.5em solid currentColor;
          transform: rotate(45deg);
        }

        .hill:after {
          display: none;
        }

        .box {
          position: absolute;
          left: 0;
          bottom: -0.2em;
          width: 2em;
          height: 2em;
          border: 0.5em solid currentColor;
          border-radius: 15%;
          transform: translate(0, -2em) rotate(-45deg);
          animation: push 2.5s cubic-bezier(0.79, 0, 0.47, 0.97) infinite;
        }

        @keyframes push {
          0% {
            transform: translate(0, -2em) rotate(-45deg);
          }
          5% {
            transform: translate(0, -2em) rotate(-50deg);
          }
          20% {
            transform: translate(2em, -4em) rotate(47deg);
          }
          25% {
            transform: translate(2em, -4em) rotate(45deg);
          }
          30% {
            transform: translate(2em, -4em) rotate(40deg);
          }
          45% {
            transform: translate(4em, -6em) rotate(137deg);
          }
          50% {
            transform: translate(4em, -6em) rotate(135deg);
          }
          55% {
            transform: translate(4em, -6em) rotate(130deg);
          }
          70% {
            transform: translate(6em, -8em) rotate(217deg);
          }
          75% {
            transform: translate(6em, -8em) rotate(220deg);
          }
          100% {
            transform: translate(0, -2em) rotate(-225deg);
          }
        }
      `}</style>
      <div className="loader text-[#333232]">
        <div className="box"></div>
        <div className="hill"></div>
      </div>
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
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{
            opacity: 1,
            scale: 1,
          }}
          viewport={{ once: true, margin: "-10%" }}
          animate={{
            rotate: [0, 360],
            scale: [1, 1.1, 1],
          }}
          transition={{
            opacity: { duration: 1, delay: el * 0.1, ease: "easeOut" },
            scale: {
              initial: { duration: 1, delay: el * 0.1, ease: "easeOut" },
              animate: {
                repeat: Infinity,
                duration: 8 + getSeededValue(el + 200, 0, 4),
              },
            },
            rotate: {
              repeat: Infinity,
              duration: 8 + getSeededValue(el + 200, 0, 4),
            },
          }}
        />
      ))}
    </div>
  );
}

// Clean Inspiration Section
function EnhancedInspirationSection({ setIsHovering }) {
  return (
    <SectionWrapper bgColor="bg-gradient-to-br from-emerald-50 to-teal-50">
      <motion.div
        className="max-w-4xl mx-auto"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <LoaderAnimation />
        <CollageElements />

        <motion.p
          className="text-2xl md:text-3xl leading-relaxed text-slate-800 font-light relative z-10"
          initial={{ opacity: 0, rotateX: -10 }}
          whileInView={{ opacity: 1, rotateX: 0 }}
          transition={{ duration: 1.2 }}
          viewport={{ once: true }}
        >
          Appreciating other art keeps my visual language fresh. I borrow habits
          from everywhere I look: the hush of a film score helps me choose
          pacing; the composition of a photograph teaches me about framing; a
          poster's unexpected color pair pushes me to be bolder. Art trains the
          eye to see relationships, contrast, rhythm, hierarchy, and those
          relationships are the backbone of good design.
        </motion.p>
      </motion.div>
    </SectionWrapper>
  );
}

export default EnhancedInspirationSection;
