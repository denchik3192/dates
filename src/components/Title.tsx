import { useEffect, useRef } from "react";
import gsap from "gsap";
import s from "./title.module.scss";

function Title() {
  const titleRef = useRef<HTMLHeadingElement | null>(null);

  useEffect(() => {
    if (titleRef.current) {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 30 }, // начальное состояние: прозрачный и чуть ниже
        { opacity: 1, y: 0, duration: 1.5, ease: "power2.out" } // финальное состояние
      );
    }
  }, []);

  return (
    <h1 ref={titleRef} className={s.title}>
      Исторические
      <br />
      даты
    </h1>
  );
}

export default Title;
