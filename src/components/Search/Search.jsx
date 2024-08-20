import styles from "./Search.module.css";
import { useGetWeather } from "../../api/api";
import { useWeather } from "../../hooks/useWeather";
import { useState } from "react";
import Forecast from "../Forecast/Forecast";

export default function Search() {
  const { city, setCity } = useWeather();
  const getWeather = useGetWeather();
  const [showForecast, setShowForecast] = useState(false);

  const handleClick = () => {
    getWeather();
    setShowForecast(true);
  };

  const handleInputChange = (e) => {
    setCity(e.target.value);
  };

  return (
    <>
      <div className={styles.searchContainer}>
        <input
          type="text"
          id="cityInput"
          className={styles.searchInput}
          placeholder="Введите запрос"
          value={city}
          onChange={handleInputChange}
        />
        <button className={styles.searchButton} onClick={handleClick}>
          Поиск
        </button>
      </div>
      {showForecast && <Forecast />}
    </>
  );
}