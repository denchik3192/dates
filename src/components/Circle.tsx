import { useEffect, useState } from 'react';
import s from './circle.module.scss';
import { db } from '../db/db';
import { useSwiper } from 'swiper/react';
interface CircleProps {
  numDots: number;
  activeDot: number;
  setActiveDot: (id: number) => void;
}

const Circle: React.FC<CircleProps> = ({ numDots, activeDot, setActiveDot }) => {
  // const swiper = useSwiper();
  const [activeDotName, setActiveDotName] = useState('Технологии');

  const dots: JSX.Element[] = [];
  const [rotation, setRotation] = useState(0);
  const radius: number = 265;
  const dotRadius: number = 4;
  console.log(activeDot);
  // useEffect(() => {}, [activeDot]);

  for (let i = 0; i < numDots; i++) {
    const angle: number = (i / numDots) * (2 * Math.PI); // angle in Rads
    const x: number = radius + radius * Math.cos(angle);
    const y: number = radius + radius * Math.sin(angle);

    const handleDotClick = (index: number) => {
      setActiveDot(index);
      setActiveDotName(db.categories[index].category);

      const angle = (index / numDots) * 360;
      console.log(angle);

      setRotation(-angle);
    };

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

  return (
    <>
      <div className={s.circle} style={{ transform: `rotate(${rotation}deg)` }}>
        {dots}
      </div>
      <div className={s.category}>{activeDotName}</div>
    </>
  );
};

export default Circle;
