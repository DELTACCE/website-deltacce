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
      className="fixed left-0 top-0 z-[9999] pointer-events-none select-none"
      style={{
        transform: `translate3d(${cursor.x}px, ${cursor.y}px, 0) translate(-50%, -50%) rotate(${cursor.rotate ? 180 : 0}deg) scale(${cursor.visible ? 1 : 0.65})`,
        opacity: cursor.visible ? 1 : 0,
        transition: 'opacity 120ms ease, transform 120ms ease-out',
        willChange: 'transform, opacity',
        color: 'var(--color-signal)',
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
