import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { WeatherProvider } from "./contexts/WeatherContext.jsx";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <WeatherProvider>
      <ErrorBoundary>
      <App />
      </ErrorBoundary>
    </WeatherProvider>
  </StrictMode>
);
