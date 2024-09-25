import './App.css';
import Title from './components/Title';
import Dates from './components/Dates';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';
import 'swiper/scss/effect-fade';
import 'swiper/css/effect-flip';

import DateEvent from './components/DateEvent';
import { Navigation, Pagination, EffectFade, EffectFlip } from 'swiper/modules';
import Container from './components/Container';
import Circle from './components/Circle';
import { db } from './db/db';

function App() {
  return (
    <>
      <Container>
        <Title />
        <Dates />
        <Circle numDots={6} />
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
          navigation={{
            nextEl: '.custom-next-main',
            prevEl: '.custom-prev-main',
          }}
          scrollbar={{ draggable: true }}
          onSwiper={(swiper: any) => console.log(swiper)}
          onSlideChange={() => console.log('slide change')}>
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
                <SwiperSlide>
                  <DateEvent />
                </SwiperSlide>
                <SwiperSlide>
                  <DateEvent />
                </SwiperSlide>
                <SwiperSlide>
                  <DateEvent />
                </SwiperSlide>
                <SwiperSlide>
                  <DateEvent />
                </SwiperSlide>
              </Swiper>
              <div className="custom-next"></div>
            </div>
          </SwiperSlide>

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
                <SwiperSlide>
                  <DateEvent />
                </SwiperSlide>
                <SwiperSlide>
                  <DateEvent />
                </SwiperSlide>
                <SwiperSlide>
                  <DateEvent />
                </SwiperSlide>
                <SwiperSlide>
                  <DateEvent />
                </SwiperSlide>
              </Swiper>
              <div className="custom-next"></div>
            </div>
          </SwiperSlide>
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
                <SwiperSlide>
                  <DateEvent />
                </SwiperSlide>
                <SwiperSlide>
                  <DateEvent />
                </SwiperSlide>
                <SwiperSlide>
                  <DateEvent />
                </SwiperSlide>
                <SwiperSlide>
                  <DateEvent />
                </SwiperSlide>
              </Swiper>
              <div className="custom-next"></div>
            </div>
          </SwiperSlide>
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
                <SwiperSlide>
                  <DateEvent />
                </SwiperSlide>
                <SwiperSlide>
                  <DateEvent />
                </SwiperSlide>
                <SwiperSlide>
                  <DateEvent />
                </SwiperSlide>
                <SwiperSlide>
                  <DateEvent />
                </SwiperSlide>
              </Swiper>
              <div className="custom-next"></div>
            </div>
          </SwiperSlide>
        </Swiper>
        {/* <div
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
            <SwiperSlide>
              <DateEvent />
            </SwiperSlide>
            <SwiperSlide>
              <DateEvent />
            </SwiperSlide>
            <SwiperSlide>
              <DateEvent />
            </SwiperSlide>
            <SwiperSlide>
              <DateEvent />
            </SwiperSlide>
          </Swiper>
          <div className="custom-next"></div>
        </div> */}
      </Container>
    </>
  );
}

export default App;
