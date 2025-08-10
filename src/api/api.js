import { useCallback } from "react";
import { useWeather } from "../hooks/useWeather";

const apiKey = "2995f4e2e3972985059e1afabfea9ad0";

export const useGetWeather = () => {
  const { city } = useWeather();

  return useCallback(async (signal) => {
    if (!city) return [];

    try {
      const response = await fetch(
       `https://api.openweathermap.org/data/2.5/forecast?q=${city}&lang=ru&units=metric&cnt=40&appid=${apiKey}`,
        { signal }
      );

      if (!response.ok) {
        throw new Error(response.status === 404 
          ? `Город "${city}" не найден`
          : `Ошибка сервера: ${response.status}`);
      }

      const data = await response.json();
      
      return data.list.map((item) => ({
        date: item.dt_txt,
        temp: item.main.temp,
        wind: item.wind.speed,
        humidity: item.main.humidity,
        weatherIcon: item.weather[0].icon,
        weatherDescription: item.weather[0].description,
      }));
    } catch (error) {
      if (error.name !== 'AbortError') {
        throw error;
      }
      return [];
    }
  }, [city]);
};


