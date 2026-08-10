import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function IntroScreen({ onComplete }) {
  const [stage, setStage] = useState('spin'); // 'spin' -> 'text' -> 'done'
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Stage 1: Spin logo, then reveal custom '▶ELT▲' logo with a smooth delay (~1.3s)
    const textTimer = setTimeout(() => {
      setStage('text');
    }, 1300);

    // Stage 2: Hold full logo reveal for ~1.8s, then trigger exit transition (~3.1s)
    const exitTimer = setTimeout(() => {
      setIsVisible(false);
    }, 3100);

    // Stage 3: After exit animation completes (~0.5s fade out), call onComplete (~3.6s)
    const completeTimer = setTimeout(() => {
      if (onComplete) onComplete();
    }, 3600);

    return () => {
      clearTimeout(textTimer);
      clearTimeout(exitTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="intro-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.03, filter: 'blur(6px)' }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-paper selection:bg-signal selection:text-white overflow-hidden pointer-events-auto"
        >
          {/* Blueprint Grid Lines & Corner Indicators */}
          <div className="absolute inset-0 pointer-events-none select-none opacity-20">
            <div className="absolute left-[15%] top-0 bottom-0 w-[1px] bg-indigo/20 hidden md:block" />
            <div className="absolute right-[25%] top-0 bottom-0 w-[1px] bg-indigo/20 hidden md:block" />
            <div className="absolute left-0 right-0 top-[30%] h-[1px] bg-indigo/20" />
            <div className="absolute left-0 right-0 bottom-[30%] h-[1px] bg-indigo/20" />
            <div className="absolute left-[15%] top-[30%] text-indigo/40 text-xs font-heading translate-x-3 translate-y-3 hidden md:block">
              LAT_00.26_N
            </div>
            <div className="absolute right-[25%] top-[30%] text-indigo/40 text-xs font-heading translate-x-3 -translate-y-5 hidden md:block">
              + CORNER_GRID_REF
            </div>
            <div className="absolute left-[15%] bottom-[30%] text-indigo/40 text-xs font-heading translate-x-3 -translate-y-5 hidden md:block">
              INIT_SEQ // DELTA_SYS
            </div>
          </div>

          {/* Main Animated Branding */}
          <div className="relative z-10 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 md:gap-8 select-none px-4">
            {/* Rotating 'δ' Logo */}
            <motion.span
              initial={{ scale: 0.2, opacity: 0, rotate: -180 }}
              animate={{
                scale: 1,
                opacity: 1,
                rotate: 360,
              }}
              transition={{
                duration: 0.9,
                delay: 0.2,
                ease: [0.34, 1.56, 0.64, 1], // Spring bounce effect
              }}
              className="inline-flex origin-center text-6xl sm:text-7xl md:text-8xl font-extrabold leading-none text-signal shrink-0"
              style={{ color: '#fe572a' }}
            >
              {"\u03B4"}
            </motion.span>

            {/* Custom DELTA Logo (▶ELT▲) with Delayed Fade-In Animation */}
            <AnimatePresence>
              {(stage === 'text' || stage === 'done') && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: 12, filter: 'blur(8px)' }}
                  animate={{ opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  className="flex items-center justify-center gap-[0.05em] text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-indigo leading-none tracking-tight"
                  style={{ color: '#0e3061' }}
                >
                  <svg viewBox="0 0 100 100" className="h-[0.82em] w-auto text-indigo shrink-0" fill="currentColor">
                    <path fillRule="evenodd" d="M 20 10 L 80 45 C 85 48, 85 52, 80 55 L 20 90 C 15 93, 10 90, 10 83 L 10 17 C 10 10, 15 7, 20 10 Z M 32 37 L 58 50 L 32 63 Z" />
                  </svg>
                  <span className="font-heading">E</span>
                  <span className="font-heading">L</span>
                  <span className="font-heading">T</span>
                  <svg viewBox="0 0 100 100" className="h-[0.82em] w-auto text-indigo shrink-0" fill="currentColor">
                    <path fillRule="evenodd" d="M 50 12 C 54 12, 57 16, 59 20 L 92 78 C 95 83, 93 90, 87 90 L 13 90 C 7 90, 5 83, 8 78 L 41 20 C 43 16, 46 12, 50 12 Z M 50 45 L 65 72 L 35 72 Z" />
                  </svg>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Subtitle / System Status indicator */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: stage === 'text' ? 0.7 : 0, y: stage === 'text' ? 0 : 10 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="absolute bottom-12 font-heading text-xs uppercase tracking-[0.25em] text-teal font-bold"
          >
            DATA ORIENTED THINKERS' ASSOCIATION
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
