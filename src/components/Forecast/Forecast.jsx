import { useGetWeather } from "../../api/api";
import { useWeather } from "../../hooks/useWeather";
import styles from "./Forecast.module.css";
import { useState, useEffect } from "react";
export default function Forecast() {
  const { city } = useWeather();
  const [weatherData, setWeatherData] = useState([]);

  const getWeather = useGetWeather();

  useEffect(() => {
    let timeoutId;
    const fetchWeatherData = async () => {
      try {
        const data = await getWeather();
        setWeatherData(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };
    fetchWeatherData();
    timeoutId = setTimeout(fetchWeatherData, 60000);

    return () => clearTimeout(timeoutId);
  }, [getWeather]);

  if (!weatherData) {
    return <div>Loading...</div>;
  }

 // const { date, temp, wind, humidity, weatherIcon } = weatherData;
  console.log(weatherData);
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
