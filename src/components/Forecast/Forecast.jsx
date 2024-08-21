import { useGetWeather } from "../../api/api";
import { useWeather } from "../../hooks/useWeather";
import styles from "./Forecast.module.css";
import { useState, useEffect } from "react";
export default function Forecast() {
  const { city } = useWeather();
  const [weatherData, setWeatherData] = useState([]);
  const [lastFetchTime, setLastFetchTime] = useState(null);

  const getWeather = useGetWeather();

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const data = await getWeather();
        setWeatherData(data);
        console.log(data);
        setLastFetchTime(Date.now());
      } catch (error) {
        alert(error);
      }
    };

    const shouldFetchData = () => {
      if (!lastFetchTime || Date.now() - lastFetchTime >= 60000) {
        fetchWeatherData();
      }
    };

    shouldFetchData();
    const intervalId = setInterval(shouldFetchData, 10000);

    return () => clearInterval(intervalId);
  }, [getWeather]);

  if (!weatherData.length) {
    return <div>Идёт загрузка...</div>;
  }
  return (
    <div className={styles.forecastContainer}>
      <h1 className={styles.forecastTitle}>{city}</h1>
      {weatherData.map((day, index) => (
        <div key={index} className={styles.dayForecast}>
          <p className={styles.date}>{day.date}</p>
          <div className={styles.temp}>Температура: {day.temp}°C</div>
          <div className={styles.wind}>Скорость ветра: {day.wind} м/с</div>
          <div className={styles.humidity}>Влажность: {day.humidity}%</div>
          <div className={styles.weatherIcon}>
            <img
              src={`https://openweathermap.org/img/w/${day.weatherIcon}.png`}
              alt="Weather icon"
            />
          </div>
        </div>
      ))}
    </div>
  );
}

