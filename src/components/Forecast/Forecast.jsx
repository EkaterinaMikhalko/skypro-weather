import { useGetWeather } from "../../api/api";
import { useWeather } from "../../hooks/useWeather";
import styles from "./Forecast.module.css";
import { useState, useEffect, useCallback, useRef } from "react";

export default function Forecast() {
  const { city } = useWeather();
  const [weatherData, setWeatherData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const abortControllerRef = useRef(new AbortController());

  const getWeather = useGetWeather();

  const fetchWeatherData = useCallback(async () => {
    if (!city) {
      setWeatherData([]);
      return;
    }

    abortControllerRef.current.abort();
    abortControllerRef.current = new AbortController();
    
    setIsLoading(true);
    try {
      const data = await getWeather(abortControllerRef.current.signal);
      setWeatherData(data);
      setError(null);
    } catch (err) {
      if (err.name !== 'AbortError') {
        setError(err.message);
        setWeatherData([]);
      }
    } finally {
      setIsLoading(false);
    }
  }, [getWeather, city]);

  useEffect(() => {
    fetchWeatherData();

    const intervalId = setInterval(fetchWeatherData, 300000);
    return () => {
      clearInterval(intervalId);
      abortControllerRef.current.abort();
    };
  }, [fetchWeatherData]);

  if (isLoading) {
    return <div className={styles.loading}>Загрузка данных о погоде...</div>;
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  if (!weatherData.length) {
    return <div className={styles.noData}>Нет данных для отображения</div>;
  }

  return (
    <div className={styles.forecastContainer}>
      <h1 className={styles.forecastTitle}>{city}</h1>
      <div className={styles.forecastList}>
        {weatherData.map((day, index) => (
          <div key={`${day.date}-${index}`} className={styles.dayForecast}>
            <p className={styles.date}>{day.date}</p>
            <div className={styles.weatherMain}>
              <span className={styles.temp}>Температура: {Math.round(day.temp)}°C</span>
            </div>
            <div className={styles.weatherDetails}>
              <p>Ветер: {day.wind} м/с</p>
              <p>Влажность: {day.humidity}%</p>
            </div>
                          <img
                src={`https://openweathermap.org/img/w/${day.weatherIcon}.png`}
                alt={day.weatherDescription}
                className={styles.weatherIcon}
              />
          </div>
        ))}
      </div>
    </div>
  );
}