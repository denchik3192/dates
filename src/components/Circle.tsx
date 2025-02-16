import audiofile from '../audio/zvuk11.wav';
import { useEffect, useRef, useState } from 'react';
import s from './circle.module.scss';
import { db } from '../db/db';
import { gsap } from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin';
import { useSwiper } from 'swiper/react';
import React from 'react';

gsap.registerPlugin(TextPlugin);

interface CircleProps {
  numDots: number;
  activeDot: number;
  setActiveDot: (id: number) => void;
}

const Circle: React.FC<CircleProps> = ({ numDots, activeDot, setActiveDot }) => {
  const swiper = useSwiper();
  const sound = new Audio(audiofile);

  const [rotation, setRotation] = useState(0); // Текущая ротация круга
  const radius: number = 265; // Радиус круга
  const dotRadius: number = 4; // Радиус точки
  const categoryRef = useRef<HTMLDivElement>(null);

  const dots: JSX.Element[] = [];

  const anglePerDot = 360 / numDots; // Угол между соседними точками
  const targetAngle = 120; // Угол, где должна быть активная точка

  const animateText = (newText: string) => {
    if (categoryRef.current) {
      const splitText = newText
        .split('')
        .map((char) => `<span>${char}</span>`)
        .join('');
      categoryRef.current.innerHTML = splitText;

      gsap.fromTo(
        categoryRef.current.children,
        { y: -50, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.05, duration: 0.5, ease: 'power2.out' },
      );
    }
  };

  const handleDotClick = (index: number) => {
    sound.play();

    const currentAngle = activeDot * anglePerDot;
    const targetRotation = index * anglePerDot;
    const rotationDelta =
      targetRotation >= currentAngle
        ? targetRotation - currentAngle
        : 360 - currentAngle + targetRotation;

    const newRotation = rotation - rotationDelta;

    setActiveDot(index);
    setRotation(newRotation);

    gsap.to(`.${s.circle}`, {
      rotation: newRotation - targetAngle,
      duration: 0.1,
      ease: 'power2.out',
    });

    const newCategory = db.categories[index].category;
    animateText(newCategory);
  };

  for (let i = 0; i < numDots; i++) {
    const angle: number = (i / numDots) * (2 * Math.PI); // Угол в радианах
    const x: number = radius + radius * Math.cos(angle);
    const y: number = radius + radius * Math.sin(angle);

    dots.push(
      <div
        key={i}
        className={`${s.dot} ${activeDot === i ? s.active : ''}`}
        onClick={() => handleDotClick(i)}
        style={{
          width: dotRadius * 2,
          height: dotRadius * 2,
          left: `${x - dotRadius}px`,
          top: `${y - dotRadius}px`,
        }}></div>,
    );
  }

  useEffect(() => {
    if (db.categories[activeDot]) {
      animateText(db.categories[activeDot].category);
    }
  }, [activeDot]);

  return (
    <>
      <div className={s.circle} style={{ transform: `rotate(${rotation - targetAngle}deg)` }}>
        {dots}
      </div>
      <div ref={categoryRef} className={s.category}></div>
    </>
  );
};

export default Circle;
