import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function ScrollReveal({ 
  children, 
  delay = 0, 
  duration = 0.6, 
  direction = 'up', 
  distance = 30,
  className = ''
}) {
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduceMotion(mediaQuery.matches);

    const listener = (e) => setReduceMotion(e.matches);
    mediaQuery.addEventListener('change', listener);
    return () => mediaQuery.removeEventListener('change', listener);
  }, []);

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  const directions = {
    up: { y: distance },
    down: { y: -distance },
    left: { x: distance },
    right: { x: -distance },
    none: {}
  };

  return (
    <motion.div
      className={className}
      initial={{ 
        opacity: 0, 
        ...directions[direction] 
      }}
      whileInView={{ 
        opacity: 1, 
        x: 0, 
        y: 0 
      }}
      viewport={{ once: true, margin: "-8%" }}
      transition={{ 
        duration: duration, 
        delay: delay, 
        ease: [0.215, 0.61, 0.355, 1] 
      }}
    >
      {children}
    </motion.div>
  );
}
