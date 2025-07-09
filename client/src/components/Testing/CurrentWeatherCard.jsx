import React,{useContext} from "react";
import "./CurrentWeatherCard.css";
import weatherIcon from "../../assets//WeatherIcon - 2-39.png";
import { WeatherContext } from '../../context/WeatherContext';

const CurrentWeatherCard = () => {

  const { data } = useContext(WeatherContext);

  if (!data) {
    return <div>Loading...</div>;
  }
  const {city} = data.location;
  const {temperature,todayHighTemp,todayLowTemp}=data.temperature;
  

  return (
    <div className="current-weather-card">
      <div className="wearher-city-details">
        <div className="location">{city}</div>
        <div className="date"><h3>Monday</h3><p>07 july, 2025</p></div>
        <div className="temp"><h3>{temperature}°C</h3> <p>High: {todayHighTemp} Low: {todayLowTemp}</p> </div>
      </div>
      <div className="weather-condition-svg">
        <div className="weather-icon">
          <img src={weatherIcon} alt="cloud with sun icon" />
        </div>
        <div className="condition">Cloudy<br />Feels Like 26</div>
      </div>
    </div>
  );
};

export default CurrentWeatherCard;