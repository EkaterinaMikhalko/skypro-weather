import { useWeather } from "../hooks/useWeather";

const apiKey = "2995f4e2e3972985059e1afabfea9ad0";

export function useGetWeather() {
  const { city } = useWeather();

  async function getWeather() {
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
      }
      const data = await response.json();
      console.log(`Current temperature in ${city}: ${data.main.temp}°C`);
    } catch (error) {
      console.error("Error:", error);
    }
  }

  return getWeather;
}
