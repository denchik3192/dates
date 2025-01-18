import s from './title.module.scss';

function Title() {
  console.log('render Title');
  return (
    <h1 className={s.title}>
      Исторические<br></br>даты
    </h1>
  );
}

export default Title;
