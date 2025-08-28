import "./App.scss";
import s from "./navButtons.module.scss";
import Title from "./components/Title";
import Dates from "./components/Dates";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/scss";
import "swiper/scss/navigation";
import "swiper/scss/pagination";
import "swiper/scss/effect-fade";
import DateEvent from "./components/DateEvent";
import { Navigation, Pagination, EffectFade } from "swiper/modules";
import Container from "./components/Container";
import Circle from "./components/Circle";
import { db } from "./db/db";
import { useState, useRef } from "react";
import type { Swiper as SwiperClass } from "swiper";
import Intro from "./components/Intro";

function App() {
  const [activeDot, setActiveDot] = useState<number>(0);
  const [showIntro, setShowIntro] = useState(true);
  const swiperRef = useRef<SwiperClass | null>(null);

  // обработчик переключения точки + синхронизация слайдера
  const handleSetActiveDot = (index: number) => {
    setActiveDot(index);
    swiperRef.current?.slideTo(index);
  };

  const renderCustom = (_: SwiperClass, current: number, total: number) => {
    return `0${current}/0${total}`;
  };

  return (
    <>
      {showIntro && <Intro onFinish={() => setShowIntro(false)} />}
      {!showIntro && (
        <Container>
          <Title />
          <Dates activeDot={activeDot} />

          {/* кастомная пагинация */}
          <div className="swiper-pagination"></div>

          {/* круг с точками */}
          <Circle activeDot={activeDot} setActiveDot={handleSetActiveDot} />

          {/* кастомные кнопки prev/next */}
          {/* <div style={{ display: "flex" }}>
            <div className="custom-prev-main"></div>
            <div className="custom-next-main"></div>
          </div> */}
          <div className={s.navButtons} style={{ display: "flex" }}>
            <div className="custom-prev-main"></div>
            <div className="custom-next-main"></div>
          </div>

          <Swiper
            modules={[Navigation, Pagination, EffectFade]}
            style={{ marginLeft: "50px", marginRight: "40px" }}
            pagination={{
              el: ".swiper-pagination",
              type: "custom",
              renderCustom: renderCustom,
            }}
            spaceBetween={50}
            slidesPerView={1}
            effect={"fade"}
            speed={800}
            navigation={{
              nextEl: ".custom-next-main",
              prevEl: ".custom-prev-main",
            }}
            scrollbar={{ draggable: true }}
            onSwiper={(swiper: SwiperClass) => (swiperRef.current = swiper)}
            onSlideChange={(swiper: SwiperClass) =>
              handleSetActiveDot(swiper.activeIndex)
            }
          >
            {db.categories.map((el, index) => (
              <SwiperSlide key={index}>
                <div
                  // className={s.slideBox}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginTop: "20px",
                  }}
                >
                  <div className="custom-prev"></div>
                  <Swiper
                    modules={[Navigation, Pagination]}
                    spaceBetween={50}
                    slidesPerView={3}
                    breakpoints={{
                      0: {
                        slidesPerView: 2,
                        spaceBetween: 10,
                      },
                      480: {
                        slidesPerView: 2,
                      },
                      780: {
                        slidesPerView: 2,
                      },
                      781: {
                        slidesPerView: 3,
                      },
                    }}
                    pagination={{
                      el: ".swiper-pagination-small",
                      clickable: true,
                    }}
                    navigation={{
                      nextEl: ".custom-next",
                      prevEl: ".custom-prev",
                    }}
                    scrollbar={{ draggable: true }}
                  >
                    {el.events.map((event, idx) => (
                      <SwiperSlide key={idx}>
                        <DateEvent event={event} />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                  <div className="custom-next"></div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="swiper-pagination-small"></div>
        </Container>
      )}
    </>
  );
}

export default App;
