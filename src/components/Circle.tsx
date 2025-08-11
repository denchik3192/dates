// import audiofile from "../audio/zvuk11.wav";
// import { useEffect, useRef, useState } from "react";
// import s from "./circle.module.scss";
// import { db } from "../db/db";
// import { gsap } from "gsap";
// import { TextPlugin } from "gsap/TextPlugin";
// import { useSwiper } from "swiper/react";
// import React from "react";

// gsap.registerPlugin(TextPlugin);

// interface CircleProps {
//   numDots: number;
//   activeDot: number;
//   setActiveDot: (id: number) => void;
// }

// const Circle: React.FC<CircleProps> = ({
//   numDots,
//   activeDot,
//   setActiveDot,
// }) => {
//   const swiper = useSwiper();
//   const sound = new Audio(audiofile);

//   const [rotation, setRotation] = useState(0); // Текущая ротация круга
//   const radius: number = 265; // Радиус круга
//   const dotRadius: number = 4; // Радиус точки
//   const categoryRef = useRef<HTMLDivElement>(null);

//   const dots: JSX.Element[] = [];

//   const anglePerDot = 360 / numDots; // Угол между соседними точками
//   const targetAngle = 120; // Угол, где должна быть активная точка

//   const animateText = (newText: string) => {
//     if (categoryRef.current) {
//       const splitText = newText
//         .split("")
//         .map((char) => `<span>${char}</span>`)
//         .join("");
//       categoryRef.current.innerHTML = splitText;

//       gsap.fromTo(
//         categoryRef.current.children,
//         { y: -50, opacity: 0 },
//         { y: 0, opacity: 1, stagger: 0.05, duration: 0.5, ease: "power2.out" }
//       );
//     }
//   };

//   const handleDotClick = (index: number) => {
//     sound.play();

//     const currentAngle = activeDot * anglePerDot;
//     const targetRotation = index * anglePerDot;
//     const rotationDelta =
//       targetRotation >= currentAngle
//         ? targetRotation - currentAngle
//         : 360 - currentAngle + targetRotation;

//     const newRotation = rotation - rotationDelta;

//     setActiveDot(index);
//     setRotation(newRotation);

//     gsap.to(`.${s.circle}`, {
//       rotation: newRotation - targetAngle,
//       duration: 0.1,
//       ease: "power2.out",
//     });

//     const newCategory = db.categories[index].category;
//     animateText(newCategory);
//   };

//   for (let i = 0; i < numDots; i++) {
//     const angle: number = (i / numDots) * (2 * Math.PI); // Угол в радианах
//     const x: number = radius + radius * Math.cos(angle);
//     const y: number = radius + radius * Math.sin(angle);

//     dots.push(
//       <div
//         key={i}
//         className={`${s.dot} ${activeDot === i ? s.active : ""}`}
//         onClick={() => handleDotClick(i)}
//         style={{
//           width: dotRadius * 2,
//           height: dotRadius * 2,
//           left: `${x - dotRadius}px`,
//           top: `${y - dotRadius}px`,
//         }}
//       >
//         {i}
//       </div>
//     );
//   }

//   useEffect(() => {
//     if (db.categories[activeDot]) {
//       animateText(db.categories[activeDot].category);
//     }
//   }, [activeDot]);

//   return (
//     <>
//       <div
//         className={s.circle}
//         style={{ transform: `rotate(${rotation - targetAngle}deg)` }}
//       >
//         {dots}
//       </div>
//       <div ref={categoryRef} className={s.category}></div>
//     </>
//   );
// };

// export default Circle;
("use client");
import React, { useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import s from "./circle.module.scss";

interface CircleProps {
  dotCount?: number;
  radius?: number;
  dotSize?: number;
  fixedAngle?: number; // degrees where chosen dot should land (0 = right, 90 = down). 45 = top-right
  activeScale?: number;
  hoverScale?: number;
  activeColor?: string;
  idleColor?: string;
}

const Circle: React.FC<CircleProps> = ({
  dotCount = 6,
  radius = 265,
  dotSize = 8,
  fixedAngle = 45,
  activeScale = 5.8,
  hoverScale = 5.35,
  activeColor = "#ccc",
  idleColor = "#42567A",
}) => {
  const circleRef = useRef<HTMLDivElement | null>(null);
  const dotRefs = useRef<Array<HTMLDivElement | null>>([]);
  const labelInnerRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const labelRotorRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const rotation = useRef({ angle: 0 });

  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  useEffect(() => {
    if (circleRef.current) {
      gsap.set(circleRef.current, { transformOrigin: "50% 50%" });
    }
  }, []);

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
    gsap.to(lab, { opacity: 1, scale: 1, duration: 0.16, ease: "power1.out" });
  };
  const hideLabel = (i: number) => {
    const lab = labelInnerRefs.current[i];
    if (!lab) return;
    gsap.killTweensOf(lab);
    gsap.to(lab, { opacity: 0, scale: 0.6, duration: 0.12, ease: "power1.in" });
  };

  const handleHoverIn = (i: number) => {
    setHoverIndex(i);
    if (activeIndex === i) return;
    setDotVisual(i, hoverScale, activeColor, 0.2);
    showLabel(i);
  };

  const handleHoverOut = (i: number) => {
    setHoverIndex(null);
    if (activeIndex === i) return;
    setDotVisual(i, 1, idleColor, 0.2);
    hideLabel(i);
  };

  const rotateToIndex = (i: number) => {
    const angleStep = 360 / dotCount;
    const target = -(i * angleStep);
    gsap.killTweensOf(rotation.current);
    gsap.to(rotation.current, {
      angle: target,
      duration: 0.9,
      ease: "power3.inOut",
      onUpdate: () => {
        const a = rotation.current.angle;
        if (circleRef.current)
          circleRef.current.style.transform = `rotate(${a}deg)`;
        // counter-rotate label rotators so numbers stay upright
        labelRotorRefs.current.forEach((r) => {
          if (r) r.style.transform = `rotate(${-a}deg)`;
        });
      },
    });
  };

  const handleClick = (i: number) => {
    if (activeIndex !== null && activeIndex !== i) {
      // уменьшить предыдущую
      setDotVisual(activeIndex, 1, idleColor, 0.2);
      hideLabel(activeIndex);
    }

    // активировать новую
    setActiveIndex(i);
    setDotVisual(i, activeScale, activeColor, 0.28);
    showLabel(i);

    rotateToIndex(i);
  };

  return (
    // <div
    //   style={{
    //     width: "100%",
    //     height: "100vh",
    //     display: "flex",
    //     alignItems: "center",
    //     justifyContent: "center",
    //     background: "#222",
    //   }}
    // >
    <div
      ref={circleRef}
      style={{
        position: "absolute",
        top: "145px",
        left: "calc(50% - 264px)",
        width: radius * 2,
        height: radius * 2,
        borderRadius: "50%",
        border: "1px solid #42567a2d",
        transformOrigin: "50% 50%",
        zIndex: "150",
      }}
    >
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
            onClick={() => handleClick(i)}
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
            {/* rotor — принимает counter-rotation so number stays upright */}
            <span
              ref={(el) => (labelRotorRefs.current[i] = el)}
              style={{
                display: "inline-block",
                transformOrigin: "50% 50%",
                pointerEvents: "none",
              }}
            >
              {/* inner label — GSAP animates scale/opacity */}
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
                  // transform: "scale(0.6)",
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
    // </div>
  );
};

export default Circle;
