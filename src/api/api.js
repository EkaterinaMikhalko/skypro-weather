import { useWeather } from "../hooks/useWeather";

const apiKey = "2995f4e2e3972985059e1afabfea9ad0";

export function useGetWeather() {
  const { city } = useWeather();

  async function getWeather() {
    try {
      // const url = `https://api.openweathermap.org/data/3.0/weather?q=${city}&appid=${apiKey}&units=metric`;
      const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&lang=ru&units=metric&cnt=15&appid=${apiKey}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
      }
      const data = await response.json();
      return data.list.map((item) => ({
        date: item.dt_txt,
        temp: item.main.temp,
        wind: item.wind.speed,
        humidity: item.main.humidity,
        weatherIcon: item.weather[0].icon,
      }));
    } catch (error) {
      console.error("Error:", error);
    }
  }

  return getWeather;
}
