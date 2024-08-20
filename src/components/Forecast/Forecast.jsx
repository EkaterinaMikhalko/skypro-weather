import { useGetWeather } from "../../api/api";
import { useWeather } from "../../hooks/useWeather";
import styles from "./Forecast.module.css";
import { useState, useEffect } from 'react';
export default function Forecast() {
  const { city } = useWeather();
  const [weatherData, setWeatherData] = useState(null);

  const getWeather = useGetWeather();

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const data = await getWeather();
        setWeatherData(data);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    fetchWeatherData();
  }, [getWeather]);

  if (!weatherData) {
    return <div>Loading...</div>;
  }

  const { temp, wind, humidity, weatherIcon } = weatherData;

  return (
    <div className={styles.forecastContainer}>
      <h1 className={styles.forecastTitle}>{city}</h1>
      <div className={styles.dayForecast}>
        <p className={styles.date}>дата</p>
        <div className={styles.temp}>Температура: {temp}°C</div>
        <div className={styles.wind}>Скорость ветра: {wind} м/с</div>
        <div className={styles.humidity}>Влажность: {humidity}%</div>
        <div className={styles.weatherIcon}>
          <img src={`http://openweathermap.org/img/w/${weatherIcon}.png`} alt="Weather icon" />
        </div>
      </div>
    </div>
  );
}