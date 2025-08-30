import s from "./container.module.scss";
interface IProps {
  children: React.ReactNode;
}

function Container({ children }: IProps) {
  return (
    <div className={s.centralContainer}>
      {children}
      <div className={s.verticalLine}></div>
      <div className={s.horizontalLine}></div>
    </div>
  );
}

export default Container;
