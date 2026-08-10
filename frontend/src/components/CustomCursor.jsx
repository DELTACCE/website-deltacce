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

function isOrangeColor(colorStr) {
  if (!colorStr || colorStr === 'transparent' || colorStr === 'rgba(0, 0, 0, 0)') {
    return false;
  }
  const match = colorStr.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
  if (match) {
    const r = parseInt(match[1], 10);
    const g = parseInt(match[2], 10);
    const b = parseInt(match[3], 10);
    const a = match[4] !== undefined ? parseFloat(match[4]) : 1;

    if (a < 0.1) return false;

    // Detect signal orange hues (#fe572a is rgb(254, 87, 42))
    if (r > 200 && g >= 20 && g <= 140 && b < 100 && (r - g > 70)) {
      return true;
    }
  }
  return false;
}

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

  try {
    const style = window.getComputedStyle(node);
    if (isOrangeColor(style.backgroundColor)) {
      return true;
    }
  } catch (e) {
    // Ignore detached elements
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

  while (node) {
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

function getNextCursorState(event) {
  return {
    x: event.clientX,
    y: event.clientY,
    visible: true,
    color: resolveCursorColor(event.target, event.clientX, event.clientY),
    ...resolveCursorMode(event.target),
  };
}

export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [cursor, setCursor] = useState({
    x: 0,
    y: 0,
    visible: false,
    rotate: false,
    color: 'var(--color-signal)',
  });
  const latestStateRef = useRef(cursor);
  const frameRef = useRef(null);

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

    const scheduleUpdate = (nextState) => {
      latestStateRef.current = nextState;

      if (frameRef.current !== null) return;

      frameRef.current = window.requestAnimationFrame(() => {
        frameRef.current = null;
        setCursor(latestStateRef.current);
      });
    };

    const handlePointerMove = (event) => {
      scheduleUpdate(getNextCursorState(event));
    };

    const hideCursor = () => {
      scheduleUpdate({
        ...latestStateRef.current,
        visible: false,
      });
    };

    const handleMouseOut = (event) => {
      if (!event.relatedTarget) hideCursor();
    };

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerdown', handlePointerMove);
    document.addEventListener('mouseout', handleMouseOut);
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
      aria-hidden="true"
      className="fixed left-0 top-0 z-[999999] pointer-events-none select-none"
      style={{
        transform: `translate3d(${cursor.x}px, ${cursor.y}px, 0) translate(-50%, -50%) rotate(${cursor.rotate ? 180 : 0}deg) scale(${cursor.visible ? 1 : 0.65})`,
        opacity: cursor.visible ? 1 : 0,
        transition: 'opacity 120ms ease, transform 120ms ease-out, color 150ms ease',
        willChange: 'transform, opacity',
        color: cursor.color || 'var(--color-signal)',
        fontFamily: 'inherit',
        fontSize: '1.15rem',
        fontWeight: 700,
        lineHeight: 1,
      }}
    >
      {'\u03B4'}
    </div>
  );
}
