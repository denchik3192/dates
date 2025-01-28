import { useRef, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { db } from '../db/db';
import s from './dates.module.scss';

interface IProps {
  activeDot: number;
}

const Dates = ({ activeDot }: IProps) => {
  const [prevFirstDate, setPrevFirstDate] = useState<string>('');
  const [prevLastDate, setPrevLastDate] = useState<string>('');

  const currentDates = [
    ...db.categories[activeDot].events.sort((a, b) => Number(a.date) - Number(b.date)),
  ];
  const firstDate = currentDates[0].date.toString();
  const lastDate = currentDates.slice(-1)[0].date.toString();

  const firstDateRefs = useRef<HTMLDivElement[]>([]);
  const lastDateRefs = useRef<HTMLDivElement[]>([]);

  const createRefs = (array: HTMLDivElement[]) => (el: HTMLDivElement) => {
    if (el && !array.includes(el)) array.push(el);
  };

  const generateIntermediateValues = (start: number, end: number) => {
    const values = [];
    let current = start;
    while (current !== end) {
      values.push(current);
      current += start < end ? 1 : -1;
    }
    values.push(end);
    return values;
  };

  const animateDigitScroll = (ref: HTMLDivElement, oldDigit: number, newDigit: number) => {
    if (oldDigit === newDigit) return;

    const timeline = gsap.timeline();
    const intermediateValues = generateIntermediateValues(oldDigit, newDigit);

    intermediateValues.forEach((value, index) => {
      timeline.to(ref, {
        y: 30,
        opacity: 0.4,
        duration: 0.15,
        onComplete: () => {
          ref.textContent = value.toString();
          ref.style.transform = `translateY(${index * 30}px)`;
        },
      });
    });

    timeline.to(ref, {
      y: 0,
      opacity: 1,
      duration: 0.1,
    });
  };

  const animateDigits = (refs: HTMLDivElement[], oldValue: string, newValue: string) => {
    const oldDigits = oldValue.padStart(newValue.length, '0').split('');
    const newDigits = newValue.padStart(newValue.length, '0').split('');

    refs.forEach((ref, index) => {
      const oldDigit = parseInt(oldDigits[index], 10);
      const newDigit = parseInt(newDigits[index], 10);
      animateDigitScroll(ref, oldDigit, newDigit);
    });
  };

  useEffect(() => {
    if (prevFirstDate !== firstDate) {
      animateDigits(firstDateRefs.current, prevFirstDate, firstDate);
      setPrevFirstDate(firstDate);
    }

    if (prevLastDate !== lastDate) {
      animateDigits(lastDateRefs.current, prevLastDate, lastDate);
      setPrevLastDate(lastDate);
    }
  }, [firstDate, lastDate, prevFirstDate, prevLastDate]);

  return (
    <div className={s.dates}>
      {/* Первая дата */}
      <div style={{ display: 'flex', fontSize: '200px', color: '#5D5FEF', fontWeight: '800' }}>
        {firstDate.split('').map((digit, index) => (
          <div
            key={`first-${index}`}
            ref={createRefs(firstDateRefs.current)}
            style={{
              display: 'inline-block',
              width: '1ch',
              textAlign: 'center',
              position: 'relative',
            }}>
            {digit}
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', fontSize: '200px', color: '#EF5DA8', fontWeight: '800' }}>
        {lastDate.split('').map((digit, index) => (
          <div
            key={`last-${index}`}
            ref={createRefs(lastDateRefs.current)}
            style={{
              display: 'inline-block',
              width: '1ch',
              textAlign: 'center',
              position: 'relative',
            }}>
            {digit}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dates;
