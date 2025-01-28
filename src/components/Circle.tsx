// import audiofile from '../audio/zvuk11.wav';
// import { useEffect, useRef, useState } from 'react';
// import s from './circle.module.scss';
// import { db } from '../db/db';
// import { gsap } from 'gsap';
// import { TextPlugin } from 'gsap/TextPlugin';
// import { useSwiper } from 'swiper/react';

// gsap.registerPlugin(TextPlugin);

// interface CircleProps {
//   numDots: number;
//   activeDot: number;
//   setActiveDot: (id: number) => void;
// }

// const Circle: React.FC<CircleProps> = ({ numDots, activeDot, setActiveDot }) => {
//   const swiper = useSwiper();

//   const sound = new Audio(audiofile);

//   const [rotation, setRotation] = useState(0);
//   const radius: number = 265;
//   const dotRadius: number = 4;
//   const categoryRef = useRef<HTMLDivElement>(null);

//   const dots: JSX.Element[] = [];

//   const animateText = (newText: string) => {
//     if (categoryRef.current) {
//       const splitText = newText
//         .split('')
//         .map((char) => `<span>${char}</span>`)
//         .join('');
//       categoryRef.current.innerHTML = splitText;

//       gsap.fromTo(
//         categoryRef.current.children,
//         { y: -50, opacity: 0 },
//         { y: 0, opacity: 1, stagger: 0.05, duration: 0.5, ease: 'power2.out' },
//       );
//     }
//   };

//   const handleDotClick = (index: number) => {
//     sound.play();

//     setActiveDot(index);

//     const newCategory = db.categories[index].category;
//     animateText(newCategory);

//     const angle = (index / numDots) * 360;
//     console.log(angle);

//     setRotation(-angle);
//   };

//   for (let i = 0; i < numDots; i++) {
//     const angle: number = (i / numDots) * (2 * Math.PI); // angle in Rads
//     const x: number = radius + radius * Math.cos(angle);
//     const y: number = radius + radius * Math.sin(angle);

//     dots.push(
//       <div
//         key={i}
//         className={`${s.dot} ${activeDot === i ? s.active : ''}`}
//         onClick={() => handleDotClick(i)}
//         style={{
//           width: dotRadius * 2,
//           height: dotRadius * 2,
//           left: `${x - dotRadius}px`,
//           top: `${y - dotRadius}px`,
//         }}>
//         {i + 1}
//       </div>,
//     );
//   }

//   useEffect(() => {
//     if (db.categories[activeDot]) {
//       animateText(db.categories[activeDot].category);
//     }
//   }, [activeDot]);

//   return (
//     <>
//       <div className={s.circle} style={{ transform: `rotate(${rotation}deg)` }}>
//         {dots}
//       </div>
//       <div ref={categoryRef} className={s.category}></div>
//     </>
//   );
// };

// export default Circle;

import audiofile from '../audio/zvuk11.wav';
import { useEffect, useRef, useState } from 'react';
import s from './circle.module.scss';
import { db } from '../db/db';
import { gsap } from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin';
import { useSwiper } from 'swiper/react';

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

    const currentAngle = activeDot * anglePerDot; // Угол текущей активной точки
    const targetRotation = index * anglePerDot; // Угол выбранной точки
    const rotationDelta =
      targetRotation >= currentAngle
        ? targetRotation - currentAngle // Поворот по часовой стрелке
        : 360 - currentAngle + targetRotation; // Поворот через 0°

    // Устанавливаем новую ротацию
    const newRotation = rotation - rotationDelta;

    setActiveDot(index); // Меняем активную точку
    setRotation(newRotation); // Обновляем ротацию

    // Анимация вращения круга
    gsap.to(`.${s.circle}`, {
      rotation: newRotation - targetAngle, // Выравниваем активную точку на 135°
      duration: 0.1,
      ease: 'power2.out',
    });

    // Обновляем текст категории
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
        }}>
        {i + 1}
      </div>,
    );
  }

  useEffect(() => {
    // При первой загрузке устанавливаем текст категории для активной точки
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
