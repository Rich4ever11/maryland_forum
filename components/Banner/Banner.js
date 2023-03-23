import styles from "./Banner.module.css";

export default function Banner(props) {
  return (
    <div className={styles.container}>
      <h1 className="font-extrabold leading-tight text-8xl mt-0 mb-2 text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-red-400 text-center">
        Maryland Forum
      </h1>
      <div className={styles.buttonWrapper}>
        <p className={styles.subTitle}>Discover Localized Coffee Shops!</p>
        <button className={styles.button} onClick={props.handleOnClick}>
          <span>{props.buttonText}</span>
        </button>
      </div>
    </div>
  );
}
