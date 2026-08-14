import React, { useEffect, useRef, useState } from 'react';

const INTERACTIVE_SELECTOR = [
  'a',
  'button',
  'input',
  'textarea',
  'select',
  'summary',
  'label',
  '[role="button"]',
  '[role="link"]',
  '[role="menuitem"]',
  '[role="option"]',
  '[contenteditable="true"]',
].join(', ');

function hasOrangeBgClass(node) {
  if (!node || !(node instanceof Element)) return false;

  let classString = '';
  if (typeof node.className === 'string') {
    classString = node.className;
  } else if (node.className && typeof node.className.baseVal === 'string') {
    classString = node.className.baseVal;
  }

  if (!classString) return false;

  const classes = classString.split(/\s+/);
  return classes.some((cls) => {
    // Ignore selection:, hover:, focus:, active:, group-hover:, etc.
    if (cls.includes(':') && !cls.startsWith('sm:') && !cls.startsWith('md:') && !cls.startsWith('lg:')) {
      return false;
    }
    if (cls === 'bg-signal' || cls.endsWith(':bg-signal') || cls === 'bg-[#fe572a]' || cls === 'bg-[#FE572A]') {
      return true;
    }
    return false;
  });
}

function isNodeOrange(node) {
  if (!node || !(node instanceof Element)) return false;

  if (hasOrangeBgClass(node) || node.getAttribute('data-cursor-color') === 'blue') {
    return true;
  }

  if (node.style && node.style.backgroundColor) {
    const bg = node.style.backgroundColor;
    if (bg.includes('fe572a') || bg.includes('254, 87, 42') || bg.includes('var(--color-signal)')) {
      return true;
    }
  }

  return false;
}

function resolveCursorColor(eventTarget, x, y) {
  let node = eventTarget instanceof Element ? eventTarget : null;

  if (!node && typeof document.elementFromPoint === 'function' && x !== undefined && y !== undefined) {
    node = document.elementFromPoint(x, y);
  }

  while (node && node !== document.body && node !== document.documentElement) {
    if (isNodeOrange(node)) {
      return 'var(--color-indigo)'; // Switch to Blue when over orange section/element
    }
    node = node.parentElement;
  }

  return 'var(--color-signal)'; // Default to Orange
}

function resolveCursorMode(eventTarget) {
  let node = eventTarget instanceof Element ? eventTarget : null;

  while (node && node !== document.body && node !== document.documentElement) {
    if (node.matches('input, textarea, [contenteditable="true"]') || node.isContentEditable) {
      return { rotate: true };
    }

    if (node.matches(INTERACTIVE_SELECTOR)) {
      return { rotate: true };
    }

    node = node.parentElement;
  }

  return { rotate: false };
}

export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const cursorRef = useRef(null);
  const innerRef = useRef(null);
  const posRef = useRef({ x: -100, y: -100 });
  const targetPosRef = useRef({ x: -100, y: -100 });
  const frameRef = useRef(null);

  const visualStateRef = useRef({
    visible: false,
    rotate: false,
    color: 'var(--color-signal)',
  });

  useEffect(() => {
    const media = window.matchMedia('(hover: hover) and (pointer: fine)');
    const updateEnabled = () => setEnabled(media.matches);

    updateEnabled();
    media.addEventListener('change', updateEnabled);

    return () => {
      media.removeEventListener('change', updateEnabled);
    };
  }, []);

  useEffect(() => {
    if (!enabled) {
      document.body.classList.remove('has-custom-cursor');
      return undefined;
    }

    document.body.classList.add('has-custom-cursor');

    const updateDOM = () => {
      const x = targetPosRef.current.x;
      const y = targetPosRef.current.y;
      posRef.current.x = x;
      posRef.current.y = y;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      }

      if (innerRef.current) {
        const { visible, rotate, color } = visualStateRef.current;
        innerRef.current.style.transform = `translate(-50%, -50%) rotate(${rotate ? 180 : 0}deg) scale(${visible ? 1 : 0.65})`;
        innerRef.current.style.opacity = visible ? '1' : '0';
        innerRef.current.style.color = color || 'var(--color-signal)';
      }

      frameRef.current = null;
    };

    const scheduleUpdate = () => {
      if (frameRef.current === null) {
        frameRef.current = window.requestAnimationFrame(updateDOM);
      }
    };

    const handlePointerMove = (event) => {
      targetPosRef.current = { x: event.clientX, y: event.clientY };
      visualStateRef.current = {
        visible: true,
        rotate: resolveCursorMode(event.target).rotate,
        color: resolveCursorColor(event.target, event.clientX, event.clientY),
      };
      scheduleUpdate();
    };

    const hideCursor = () => {
      visualStateRef.current.visible = false;
      scheduleUpdate();
    };

    const handleMouseOut = (event) => {
      if (!event.relatedTarget) hideCursor();
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('pointerdown', handlePointerMove, { passive: true });
    document.addEventListener('mouseout', handleMouseOut, { passive: true });
    window.addEventListener('blur', hideCursor);

    return () => {
      document.body.classList.remove('has-custom-cursor');
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerdown', handlePointerMove);
      document.removeEventListener('mouseout', handleMouseOut);
      window.removeEventListener('blur', hideCursor);

      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
        frameRef.current = null;
      }
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      ref={cursorRef}
      aria-hidden="true"
      className="fixed left-0 top-0 z-[999999] pointer-events-none select-none will-change-transform"
      style={{
        transform: `translate3d(${posRef.current.x}px, ${posRef.current.y}px, 0)`,
      }}
    >
      <div
        ref={innerRef}
        style={{
          transform: `translate(-50%, -50%) rotate(${visualStateRef.current.rotate ? 180 : 0}deg) scale(${visualStateRef.current.visible ? 1 : 0.65})`,
          opacity: visualStateRef.current.visible ? 1 : 0,
          transition: 'opacity 120ms ease, transform 150ms ease-out, color 150ms ease',
          color: visualStateRef.current.color || 'var(--color-signal)',
          fontFamily: 'inherit',
          fontSize: '1.15rem',
          fontWeight: 700,
          lineHeight: 1,
        }}
      >
        {'\u03B4'}
      </div>
    </div>
  );
}
