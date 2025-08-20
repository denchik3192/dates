// import s from './container.module.scss';
import styles from "./container.module.scss";
interface IProps {
  children: React.ReactNode;
}

function Container({ children }: IProps) {
  console.log("render Container");
  return (
    <div className={styles.centralContainer}>
      {children}
      <div className={styles.verticalLine}></div>
      <div className={styles.horizontalLine}></div>
    </div>
  );
}

export default Container;
