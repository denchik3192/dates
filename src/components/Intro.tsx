import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import s from "./intro.module.scss";

interface IntroProps {
  onFinish: () => void;
}

export default function Intro({ onFinish }: IntroProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLHeadingElement | null>(null);

  useEffect(() => {
    if (!containerRef.current || !textRef.current) return;

    const tl = gsap.timeline({
      onComplete: onFinish,
    });

    tl.fromTo(
      textRef.current,
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 2, duration: 1.5, ease: "power2.out" }
    ).to(containerRef.current, {
      opacity: 0,
      duration: 1,
      delay: 0.2,
      ease: "power2.in",
    });
  }, []);

  return (
    <div ref={containerRef} className={s.introContainer}>
      <h1 ref={textRef} className={s.introText}>
        Dates
      </h1>
    </div>
  );
}
