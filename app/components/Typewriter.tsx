"use client";

import { useState, useEffect } from "react";

interface TypewriterProps {
  words: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseTime?: number;
  className?: string;
}

export default function Typewriter({
  words,
  typingSpeed = 80,
  deletingSpeed = 40,
  pauseTime = 2500,
  className = "",
}: TypewriterProps) {
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingDelay, setTypingDelay] = useState(typingSpeed);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    const handleType = () => {
      const currentWord = words[loopNum % words.length];
      const isFull = text === currentWord;
      const isEmpty = text === "";

      if (isDeleting) {
        setText((prev) => currentWord.substring(0, prev.length - 1));
        setTypingDelay(deletingSpeed);
      } else {
        setText((prev) => currentWord.substring(0, prev.length + 1));
        setTypingDelay(typingSpeed);
      }

      if (!isDeleting && isFull) {
        setTypingDelay(pauseTime);
        setIsDeleting(true);
      } else if (isDeleting && isEmpty) {
        setIsDeleting(false);
        setLoopNum((prev) => prev + 1);
        setTypingDelay(typingSpeed);
      }
    };

    timer = setTimeout(handleType, typingDelay);

    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum, typingDelay, words, typingSpeed, deletingSpeed, pauseTime]);

  return (
    <span className={className}>
      {text}
      <span className="animate-pulse border-r-[3px] border-primary ml-1 h-[0.9em] inline-block align-middle -mt-1"></span>
    </span>
  );
}