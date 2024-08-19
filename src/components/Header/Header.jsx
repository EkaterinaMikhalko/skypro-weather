import styles from "./Header.module.css";
export default function Header() {
  return (
    <div className={styles.weatherHeader}>
      <div className={styles.weatherText}>Прогноз погоды</div>
      <a href="/" />
    </div>
  );
}
