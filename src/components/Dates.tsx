// import { useEffect, useRef } from 'react';
// import { db } from '../db/db';
// import s from './dates.module.scss';
// import gsap from 'gsap';
// interface IProps {
//   activeDot: number;
// }
// const Dates = ({ activeDot }: IProps) => {
//   const currentDates = [
//     ...db.categories[activeDot].events.sort((a, b) => Number(a.date) - Number(b.date)),
//   ];
//   const firstDate = currentDates[0].date;
//   const lastDate = currentDates.slice(-1)[0].date;

//   const firstDateRef = useRef<HTMLDivElement>(null);
//   const lastDateRef = useRef<HTMLDivElement>(null);
//   useEffect(() => {
//     // Анимация при смене `firstDate`
//     gsap.fromTo(firstDateRef.current, { y: -30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 });

//     // Анимация при смене `lastDate`
//     gsap.fromTo(lastDateRef.current, { y: -30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 });
//   }, [firstDate, lastDate]);

//   console.log('render Dates');

//   return (
//     <>
//       <div className={s.dates}>
//         <div ref={firstDateRef} style={{ fontSize: '200px', color: '#5D5FEF', fontWeight: '800' }}>
//           {firstDate}
//         </div>
//         <div ref={lastDateRef} style={{ fontSize: '200px', color: '#EF5DA8', fontWeight: '800' }}>
//           {lastDate}
//         </div>
//       </div>
//     </>
//   );
// };

// export default Dates;

// import { useRef, useEffect } from 'react';
// import { gsap } from 'gsap';
// import { db } from '../db/db';
// import s from './dates.module.scss';

// interface IProps {
//   activeDot: number;
// }

// const Dates = ({ activeDot }: IProps) => {
//   const currentDates = [
//     ...db.categories[activeDot].events.sort((a, b) => Number(a.date) - Number(b.date)),
//   ];
//   const firstDate = currentDates[0].date.toString();
//   const lastDate = currentDates.slice(-1)[0].date.toString();

//   // Ссылки для анимации цифр
//   const firstDateRefs = useRef<HTMLDivElement[]>([]);
//   const lastDateRefs = useRef<HTMLDivElement[]>([]);

//   const createRefs = (array: HTMLDivElement[]) => (el: HTMLDivElement) => {
//     if (el && !array.includes(el)) array.push(el);
//   };

//   // Анимация прокрутки цифры сверху вниз
//   const animateDigitScroll = (ref: HTMLDivElement, oldDigit: number, newDigit: number) => {
//     if (oldDigit === newDigit) return;

//     // Прокручивание цифры сверху вниз
//     const timeline = gsap.timeline();
//     const countUp = (start: number, end: number) => {
//       // Прокрутка каждой цифры от старой до новой
//       const direction = start < end ? 1 : -1;
//       let current = start;

//       while (current !== end) {
//         timeline.to(ref, {
//           y: direction * 30, // Прокручиваем вверх или вниз
//           opacity: 0.4,
//           duration: 0.1,
//           onComplete: () => {
//             ref.textContent = current.toString(); // Обновляем цифру
//             ref.style.transform = `translateY(${direction * 30}px)`;
//           },
//         });
//         current += direction;
//       }

//       timeline.to(ref, {
//         y: 0, // Возвращаем в исходное положение
//         opacity: 1,
//         duration: 0.1,
//       });
//     };

//     countUp(oldDigit, newDigit);
//   };

//   // Анимация обновления всех цифр
//   const animateDigits = (refs: HTMLDivElement[], oldValue: string, newValue: string) => {
//     const oldDigits = oldValue.padStart(newValue.length, '0').split('');
//     const newDigits = newValue.padStart(newValue.length, '0').split('');

//     refs.forEach((ref, index) => {
//       const oldDigit = parseInt(oldDigits[index], 10);
//       const newDigit = parseInt(newDigits[index], 10);
//       animateDigitScroll(ref, oldDigit, newDigit);
//     });
//   };

//   useEffect(() => {
//     // Анимация для первой даты
//     animateDigits(firstDateRefs.current, '', firstDate);

//     // Анимация для последней даты
//     animateDigits(lastDateRefs.current, '', lastDate);
//   }, [firstDate, lastDate]);

//   return (
//     <div className={s.dates}>
//       {/* Первая дата */}
//       <div style={{ display: 'flex', fontSize: '200px', color: '#5D5FEF', fontWeight: '800' }}>
//         {firstDate.split('').map((digit, index) => (
//           <div
//             key={`first-${index}`}
//             ref={createRefs(firstDateRefs.current)}
//             style={{ display: 'inline-block', width: '1ch', textAlign: 'center' }}>
//             {digit}
//           </div>
//         ))}
//       </div>
//       {/* Последняя дата */}
//       <div style={{ display: 'flex', fontSize: '200px', color: '#EF5DA8', fontWeight: '800' }}>
//         {lastDate.split('').map((digit, index) => (
//           <div
//             key={`last-${index}`}
//             ref={createRefs(lastDateRefs.current)}
//             style={{ display: 'inline-block', width: '1ch', textAlign: 'center' }}>
//             {digit}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Dates;
import { useRef, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { db } from '../db/db';
import s from './dates.module.scss';

interface IProps {
  activeDot: number;
}

const Dates = ({ activeDot }: IProps) => {
  // Храним текущее и предыдущее значения дат
  const [prevFirstDate, setPrevFirstDate] = useState<string>('');
  const [prevLastDate, setPrevLastDate] = useState<string>('');

  // Получаем новые значения
  const currentDates = [
    ...db.categories[activeDot].events.sort((a, b) => Number(a.date) - Number(b.date)),
  ];
  const firstDate = currentDates[0].date.toString();
  const lastDate = currentDates.slice(-1)[0].date.toString();

  // Ссылки для анимации цифр
  const firstDateRefs = useRef<HTMLDivElement[]>([]);
  const lastDateRefs = useRef<HTMLDivElement[]>([]);

  const createRefs = (array: HTMLDivElement[]) => (el: HTMLDivElement) => {
    if (el && !array.includes(el)) array.push(el);
  };

  // Генерация промежуточных значений для каждой цифры
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

  // Анимация прокрутки цифры сверху вниз для всех промежуточных значений
  const animateDigitScroll = (ref: HTMLDivElement, oldDigit: number, newDigit: number) => {
    if (oldDigit === newDigit) return;

    const timeline = gsap.timeline();
    const intermediateValues = generateIntermediateValues(oldDigit, newDigit);

    intermediateValues.forEach((value, index) => {
      timeline.to(ref, {
        y: 30, // Прокручиваем вниз
        opacity: 0.4,
        duration: 0.15,
        onComplete: () => {
          ref.textContent = value.toString(); // Обновляем цифру
          ref.style.transform = `translateY(${index * 30}px)`; // Сдвиг по оси Y
        },
      });
    });

    timeline.to(ref, {
      y: 0, // Возвращаем в исходное положение
      opacity: 1,
      duration: 0.1,
    });
  };

  // Анимация обновления всех цифр
  const animateDigits = (refs: HTMLDivElement[], oldValue: string, newValue: string) => {
    const oldDigits = oldValue.padStart(newValue.length, '0').split('');
    const newDigits = newValue.padStart(newValue.length, '0').split('');

    refs.forEach((ref, index) => {
      const oldDigit = parseInt(oldDigits[index], 10);
      const newDigit = parseInt(newDigits[index], 10);
      animateDigitScroll(ref, oldDigit, newDigit);
    });
  };

  // Запускаем анимацию при изменении activeDot
  useEffect(() => {
    // Только если дата изменилась
    if (prevFirstDate !== firstDate) {
      animateDigits(firstDateRefs.current, prevFirstDate, firstDate);
      setPrevFirstDate(firstDate); // Сохраняем предыдущее значение
    }

    if (prevLastDate !== lastDate) {
      animateDigits(lastDateRefs.current, prevLastDate, lastDate);
      setPrevLastDate(lastDate); // Сохраняем предыдущее значение
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
      {/* Последняя дата */}
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
