import { createContext, useState } from "react";

export const WeatherContext = createContext();

export const WeatherProvider = ({ children, initialCity = "" }) => {
  const [city, setCity] = useState(initialCity);

  return (
    <WeatherContext.Provider value={{ city, setCity }}>
      {children}
    </WeatherContext.Provider>
  );
};
