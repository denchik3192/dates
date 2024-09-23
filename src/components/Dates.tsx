import s from './dates.module.scss';
function Dates() {
  return (
    <>
      <div className={s.dates}>
        <div style={{ fontSize: '200px', color: '#5D5FEF', fontWeight: '800' }}>2015</div>
        <div style={{ fontSize: '200px', color: '#EF5DA8', fontWeight: '800' }}>2022</div>
      </div>
    </>
  );
}

export default Dates;
