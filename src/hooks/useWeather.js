import { useContext } from "react";
import { WeatherContext } from "../contexts/WeatherContext";

export function useWeather() {
  return useContext(WeatherContext);
}
