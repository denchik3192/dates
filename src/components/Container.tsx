import s from './container.module.scss';
interface IProps {
  children: React.ReactNode;
}

function Container({ children }: IProps) {
  return (
    <div className={s.wrapper}>
      <div style={{ padding: '100px' }}>{children}</div>
    </div>
  );
}

export default Container;
