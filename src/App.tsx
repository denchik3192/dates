// import './App.css';
// import Title from './components/Title';
// import Dates from './components/Dates';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import 'swiper/scss';
// import 'swiper/scss/navigation';
// import 'swiper/scss/pagination';
// import 'swiper/scss/effect-fade';

// import DateEvent from './components/DateEvent';
// import { Navigation, Pagination, EffectFade } from 'swiper/modules';
// import Container from './components/Container';
// import Circle from './components/Circle';
// import { db } from './db/db';
// import { useState } from 'react';

// function App() {
//   const [activeDot, setActiveDot] = useState(1);
//   console.log(activeDot);
//   // const handleActiveDot = (e: any) => {
//   //   console.log(e.currentTarget);
//   // };
//   const renderCustom = {
//     el: '.swiper-pagination',
//     type: 'custom',
//     renderCustom: (swiper: any, current: number, total: number) => {
//       return `${current}/${total}`;
//     },
//   };
//   const dots = db.categories.length;
//   return (
//     <>
//       <Container>
//         <Title />
//         <Dates />
//         <div className="swiper-pagination"></div>
//         {/* <div style={{ marginBottom: '15px', marginLeft: '50px', color: '#42567A' }}>
//           0{activeDot}/0{dots}
//         </div> */}
//         <Circle numDots={dots} activeDot={activeDot} setActiveDot={setActiveDot} />
//         <div style={{ display: 'flex' }}>
//           <div className="custom-prev-main"></div>
//           <div className="custom-next-main"></div>
//         </div>

//         <Swiper
//           modules={[Navigation, Pagination, EffectFade]}
//           style={{ marginLeft: '50px', marginRight: '40px' }}
//           pagination={}
//           spaceBetween={50}
//           slidesPerView={1}
//           effect={'fade'}
//           speed={800}
//           navigation={{
//             nextEl: '.custom-next-main',
//             prevEl: '.custom-prev-main',
//           }}
//           scrollbar={{ draggable: true }}
//           onSwiper={(swiper: any) => console.log(swiper)}
//           // onSlideChange={() => setActiveDot(activeDot)}
//         >
//           {db.categories.map((el) => (
//             <SwiperSlide>
//               <div
//                 style={{
//                   display: 'flex',
//                   alignItems: 'center',
//                   justifyContent: 'space-between',
//                   marginTop: '20px',
//                 }}>
//                 <div className="custom-prev"></div>
//                 <Swiper
//                   modules={[Navigation, Pagination]}
//                   spaceBetween={50}
//                   slidesPerView={3}
//                   navigation={{
//                     nextEl: '.custom-next',
//                     prevEl: '.custom-prev',
//                   }}
//                   scrollbar={{ draggable: true }}
//                   onSwiper={(swiper: any) => console.log(swiper)}>
//                   {el.events.map((event) => (
//                     <SwiperSlide>
//                       <DateEvent event={event} />
//                     </SwiperSlide>
//                   ))}
//                 </Swiper>
//                 <div className="custom-next"></div>
//               </div>
//             </SwiperSlide>
//           ))}
//         </Swiper>
//       </Container>
//     </>
//   );
// }

// export default App;
import './App.css';
import Title from './components/Title';
import Dates from './components/Dates';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';
import 'swiper/scss/effect-fade';

import DateEvent from './components/DateEvent';
import { Navigation, Pagination, EffectFade } from 'swiper/modules';
import Container from './components/Container';
import Circle from './components/Circle';
import { db } from './db/db';
import { useState } from 'react';

function App() {
  const [activeDot, setActiveDot] = useState(1);

  const renderCustom = (swiper: any, current: number, total: number) => {
    return `0${current}/0${total}`;
  };

  const dots = db.categories.length;
  return (
    <>
      <Container>
        <Title />
        <Dates activeDot={activeDot} />
        <div className="swiper-pagination"></div>
        <Circle numDots={dots} activeDot={activeDot} setActiveDot={setActiveDot} />
        <div style={{ display: 'flex' }}>
          <div className="custom-prev-main"></div>
          <div className="custom-next-main"></div>
        </div>

        <Swiper
          modules={[Navigation, Pagination, EffectFade]}
          style={{ marginLeft: '50px', marginRight: '40px' }}
          pagination={{
            el: '.swiper-pagination',
            type: 'custom',
            renderCustom: renderCustom,
          }}
          spaceBetween={50}
          slidesPerView={1}
          effect={'fade'}
          speed={800}
          navigation={{
            nextEl: '.custom-next-main',
            prevEl: '.custom-prev-main',
          }}
          scrollbar={{ draggable: true }}>
          {db.categories.map((el, index) => (
            <SwiperSlide key={index}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginTop: '20px',
                }}>
                <div className="custom-prev"></div>
                <Swiper
                  modules={[Navigation, Pagination]}
                  spaceBetween={50}
                  slidesPerView={3}
                  navigation={{
                    nextEl: '.custom-next',
                    prevEl: '.custom-prev',
                  }}
                  scrollbar={{ draggable: true }}>
                  {el.events.map((event, index) => (
                    <SwiperSlide key={index}>
                      <DateEvent event={event} />
                    </SwiperSlide>
                  ))}
                </Swiper>
                <div className="custom-next"></div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </Container>
    </>
  );
}

export default App;
