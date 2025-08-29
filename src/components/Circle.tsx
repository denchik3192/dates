import React, { useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import { db } from "../db/db";
import s from "./circle.module.scss";

interface CircleProps {
  dotCount?: number;
  radius?: number;
  dotSize?: number;
  fixedAngle?: number;
  activeScale?: number;
  hoverScale?: number;
  activeColor?: string;
  idleColor?: string;
  activeDot: number;
  setActiveDot: (i: number) => void;
}

const Circle: React.FC<CircleProps> = ({
  setActiveDot,
  activeDot,
  dotCount = 6,
  radius = 265,
  dotSize = 8,
  fixedAngle = 90,
  activeScale = 5.8,
  hoverScale = 5.35,
  activeColor = "#c3c3c5ff",
  idleColor = "#42567A",
}) => {
  const circleRef = useRef<HTMLDivElement | null>(null);
  const dotRefs = useRef<Array<HTMLDivElement | null>>([]);
  const labelInnerRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const labelRotorRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const rotation = useRef({ angle: 0 });
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const category = db.categories[activeDot as number].category;
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const playAudio = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current
        .play()
        .catch((e) => console.warn("Audio playback failed:", e));
    }
  };

  useEffect(() => {
    if (circleRef.current) {
      gsap.set(circleRef.current, { transformOrigin: "50% 50%" });
    }
    audioRef.current = new Audio("/click.wav");
  }, []);

  /** Следим за activeDot и крутим круг */
  useEffect(() => {
    if (activeDot !== null) {
      // сбрасываем прошлый активный
      dotRefs.current.forEach((dot, i) => {
        if (i !== activeDot && dot) {
          gsap.to(dot, {
            scale: 1,
            backgroundColor: idleColor,
            duration: 0.2,
            ease: "power2.out",
          });
          hideLabel(i);
        }
      });

      setDotVisual(activeDot, activeScale, activeColor, 0.28);
      showLabel(activeDot);

      // вращаем к нему
      rotateToIndex(activeDot);
    }
  }, [activeDot]);

  const setDotVisual = (i: number, scale: number, color: string, dur = 0.2) => {
    const el = dotRefs.current[i];
    if (!el) return;
    gsap.killTweensOf(el);
    gsap.to(el, {
      scale,
      backgroundColor: color,
      duration: dur,
      ease: "power2.out",
    });
  };

  const showLabel = (i: number) => {
    const lab = labelInnerRefs.current[i];
    if (!lab) return;
    gsap.killTweensOf(lab);
    gsap.to(lab, { opacity: 1, scale: 1, duration: 0.2, ease: "bounce.out" });
  };

  const hideLabel = (i: number) => {
    const lab = labelInnerRefs.current[i];
    if (!lab) return;
    gsap.killTweensOf(lab);
    gsap.to(lab, { opacity: 0, scale: 0.6, duration: 0.12, ease: "power1.in" });
  };

  const handleHoverIn = (i: number) => {
    setHoverIndex(i);
    if (activeDot === i) return;
    setDotVisual(i, hoverScale, activeColor, 0.2);
    showLabel(i);
  };

  const handleHoverOut = (i: number) => {
    setHoverIndex(null);
    if (activeDot === i) return;
    setDotVisual(i, 1, idleColor, 0.2);
    hideLabel(i);
  };

  /** Вращение круга */
  const rotateToIndex = (i: number, instant = false) => {
    const angleStep = 360 / dotCount;
    const target = -(i * angleStep) - 60;

    gsap.killTweensOf(rotation.current);
    gsap.to(rotation.current, {
      angle: target,
      duration: instant ? 0 : 1.2,
      ease: instant ? "none" : "power4.out",
      onUpdate: () => {
        const a = rotation.current.angle;
        if (circleRef.current)
          circleRef.current.style.transform = `rotate(${a}deg)`;
        labelRotorRefs.current.forEach((r) => {
          if (r) r.style.transform = `rotate(${-a}deg)`;
        });
      },
    });
    playAudio();
  };

  return (
    <>
      <div
        className={s.categoryBox}
        // style={{
        //   position: "absolute",
        //   width: radius * 2,
        //   height: radius * 2 + 50, // немного больше, чтобы влезла категория
        //   left: "calc(50% - 264px)",
        //   top: "90px",
        // }}
      >
        {/* Категория над кругом */}
        <div className={s.category}>
          <div>{category}</div>
        </div>

        <div ref={circleRef} className={s.circle}>
          {/* dots */}
          {Array.from({ length: dotCount }).map((_, i) => {
            const angle = (i * 2 * Math.PI) / dotCount;
            const left = radius + radius * Math.cos(angle) - dotSize / 2;
            const top = radius + radius * Math.sin(angle) - dotSize / 2;

            return (
              <div
                key={i}
                ref={(el) => (dotRefs.current[i] = el)}
                onMouseEnter={() => handleHoverIn(i)}
                onMouseLeave={() => handleHoverOut(i)}
                onClick={() => setActiveDot(i)}
                style={{
                  position: "absolute",
                  left: `${left}px`,
                  top: `${top}px`,
                  width: `${dotSize}px`,
                  height: `${dotSize}px`,
                  borderRadius: "50%",
                  background: idleColor,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  transform: "scale(1)",
                  userSelect: "none",
                }}
              >
                <span
                  ref={(el) => (labelRotorRefs.current[i] = el)}
                  style={{
                    display: "inline-block",
                    transformOrigin: "50% 50%",
                    pointerEvents: "none",
                  }}
                >
                  <span
                    ref={(el) => (labelInnerRefs.current[i] = el)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: Math.round(dotSize * 0.55),
                      fontWeight: 700,
                      lineHeight: 1,
                      opacity: 0,
                      pointerEvents: "none",
                      color: "#000",
                    }}
                  >
                    {i + 1}
                  </span>
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Circle;
