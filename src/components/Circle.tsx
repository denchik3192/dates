import { useState } from 'react';
import s from './circle.module.scss';
interface CircleProps {
  numDots: number;
}

const Circle: React.FC<CircleProps> = ({ numDots }) => {
  const [activeDot, setActiveDot] = useState(0);
  const [activeDotName, setActiveDotName] = useState('наука');

  const dots: JSX.Element[] = [];
  const [rotation, setRotation] = useState(0);
  const radius: number = 265;
  const dotRadius: number = 4;
  console.log();

  for (let i = 0; i < numDots; i++) {
    const angle: number = (i / numDots) * (2 * Math.PI); // angle in Rads
    const x: number = radius + radius * Math.cos(angle);
    const y: number = radius + radius * Math.sin(angle);

    const handleDotClick = (index: number) => {
      setActiveDot(index);
      const angle = (index / numDots) * 360 + 60;
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
      <div>{activeDotName}</div>
    </>
  );
};

export default Circle;
