import "./App.css";
import Header from "./components/Header/Header";
import Search from "./components/Search/Search";
import { WeatherProvider } from "./contexts/WeatherContext";

function App() {
  return (
    <WeatherProvider>
      <Header />
      <Search />
    </WeatherProvider>
  );
}

export default App;
