"use client";

import * as React from "react";

interface TypingEffectProps {
  words: readonly string[];
  className?: string;
  typingSpeedMs?: number;
  deletingSpeedMs?: number;
  pauseMs?: number;
}

export function TypingEffect({
  words,
  className,
  typingSpeedMs = 80,
  deletingSpeedMs = 40,
  pauseMs = 1600,
}: TypingEffectProps) {
  const [wordIndex, setWordIndex] = React.useState(0);
  const [text, setText] = React.useState("");
  const [phase, setPhase] = React.useState<"typing" | "pausing" | "deleting">("typing");
  const prefersReducedMotion = usePrefersReducedMotion();

  React.useEffect(() => {
    if (prefersReducedMotion) return;

    const currentWord = words[wordIndex % words.length];
    let timeout: ReturnType<typeof setTimeout>;

    if (phase === "typing") {
      if (text.length < currentWord.length) {
        timeout = setTimeout(
          () => setText(currentWord.slice(0, text.length + 1)),
          typingSpeedMs
        );
      } else {
        timeout = setTimeout(() => setPhase("pausing"), pauseMs);
      }
    } else if (phase === "pausing") {
      timeout = setTimeout(() => setPhase("deleting"), pauseMs / 3);
    } else {
      if (text.length > 0) {
        timeout = setTimeout(
          () => setText(currentWord.slice(0, text.length - 1)),
          deletingSpeedMs
        );
      } else {
        timeout = setTimeout(() => {
          setPhase("typing");
          setWordIndex((i) => (i + 1) % words.length);
        }, 0);
      }
    }

    return () => clearTimeout(timeout);
  }, [
    text,
    phase,
    wordIndex,
    words,
    typingSpeedMs,
    deletingSpeedMs,
    pauseMs,
    prefersReducedMotion,
  ]);

  const displayText = prefersReducedMotion ? (words[0] ?? "") : text;

  return (
    <span className={className}>
      {displayText}
      <span
        className="ml-0.5 inline-block w-[2px] animate-pulse bg-current align-middle"
        aria-hidden="true"
      >
        &nbsp;
      </span>
    </span>
  );
}

function subscribeToReducedMotion(callback: () => void) {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
}

function usePrefersReducedMotion() {
  return React.useSyncExternalStore(
    subscribeToReducedMotion,
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false
  );
}
