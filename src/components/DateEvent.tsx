import s from "./date-event.module.scss";

function DateEvent({ event }: any) {
  return (
    <>
      <div className={s.event}>
        <h4 className={s.year}>{event.date}</h4>
        <p className={s.descr}>{event.description}</p>
      </div>
    </>
  );
}

export default DateEvent;
