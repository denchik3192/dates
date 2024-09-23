import s from './date-event.module.scss';

function DateEvent() {
  return (
    <>
      <div style={{ maxWidth: '400px' }}>
        <h4 className={s.year}>2012</h4>
        <p className={s.descr}>
          13 сентября — частное солнечное затмение, видимое в Южной Африке и части Антарктиды
        </p>
      </div>
    </>
  );
}

export default DateEvent;
