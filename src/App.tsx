import './App.css';
import Title from './components/Title';
import Dates from './components/Dates';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';
import DateEvent from './components/DateEvent';
import { Navigation, Pagination } from 'swiper/modules';
import Container from './components/Container';
import Circle from './components/Circle';

function App() {
  return (
    <>
      <Container>
        <Title />
        <Dates />
        <Circle numDots={6} />
        <Swiper
          style={{ marginTop: '100px' }}
          modules={[Navigation, Pagination]}
          spaceBetween={50}
          slidesPerView={3}
          navigation
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
      </Container>
    </>
  );
}

export default App;
