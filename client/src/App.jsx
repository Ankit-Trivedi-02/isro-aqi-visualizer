import "./App.css";
import Navbar from "./components/Testing/Navbar";
// import Navbar from "./components/navbar/Navbar";
import CityHeader from "./components/CityHeader/CityHeader";
import TemperatureCard from "./components/TemperatureCard/Temperaturecard";
import WeatherMetrics from "./components/weatherMetrics/weatherMetrics";
import AQIDataCard from "./components/AQIDataCard/AQIDataCard";
import AqiGraphReport from "./components/AqiGraphReport/AqiGraphReport";
import WeatherDashboard from "./components/Testing/WeatherDashboard";
import Footer from "./components/Footer/Footer";
import { WeatherProvider } from "./context/WeatherContext";
import { useState } from "react";

function App() {
  const [selectedCity, setSelectedCity] = useState({
    name: "Delhi",
    lat: 28.6139,
    lng: 77.209,
  });

  return (
    <>
      <WeatherProvider>
        < Navbar />
        <WeatherDashboard />
      </WeatherProvider>
    </>
  );
}


export default App;
