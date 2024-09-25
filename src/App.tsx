import './App.css';
import Title from './components/Title';
import Dates from './components/Dates';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';
import 'swiper/scss/effect-fade';

import DateEvent from './components/DateEvent';
import { Navigation, Pagination, EffectFade, EffectFlip } from 'swiper/modules';
import Container from './components/Container';
import Circle from './components/Circle';
import { db } from './db/db';

function App() {
  const dots = db.categories.length;
  return (
    <>
      <Container>
        <Title />
        <Dates />
        <Circle numDots={dots} />
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
          onSlideChange={() => console.log('slide change')}>
          {db.categories.map((el) => (
            <SwiperSlide>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginTop: '100px',
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
                  onSlideChange={() => console.log('slide change')}>
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
