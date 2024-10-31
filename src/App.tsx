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
  const [activeDot, setActiveDot] = useState(0);
  const dots = db.categories.length;
  return (
    <>
      <Container>
        <Title />
        <Dates />
        <div style={{ marginBottom: '15px', color: '#42567A' }}>
          0{activeDot + 1}/0{dots}
        </div>
        <Circle numDots={dots} activeDot={activeDot} setActiveDot={setActiveDot} />
        <div style={{ display: 'flex' }}>
          <div className="custom-prev-main"></div>
          <div className="custom-next-main"></div>
        </div>

        <Swiper
          modules={[Navigation, Pagination, EffectFade]}
          pagination={{ type: 'fraction' }}
          spaceBetween={50}
          slidesPerView={1}
          effect={'fade'}
          speed={800}
          navigation={{
            nextEl: '.custom-next-main',
            prevEl: '.custom-prev-main',
          }}
          scrollbar={{ draggable: true }}
          onSwiper={(swiper: any) => console.log(swiper)}
          onSlideChange={() => setActiveDot(activeDot + 1)}>
          {db.categories.map((el) => (
            <SwiperSlide>
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
                  scrollbar={{ draggable: true }}
                  onSwiper={(swiper: any) => console.log(swiper)}
                  onSlideChange={() => setActiveDot(activeDot + 1)}>
                  {el.events.map((event) => (
                    <SwiperSlide>
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
