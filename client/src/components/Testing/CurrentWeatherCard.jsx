import React from "react";
import "./CurrentWeatherCard.css";

const CurrentWeatherCard = () => {
  return (
    <div className="current-weather-card">
      <div className="location">📍 India</div>
      <div className="date">Monday<br />24 Dec, 2023</div>
      <div className="temp">26°C<br /><span>High: 27 Low: 10</span></div>
      <div className="weather-icon">
        <img src="#" alt="cloud with sun icon" />
      </div>
      <div className="condition">Cloudy<br />Feels Like 26</div>
    </div>
  );
};

export default CurrentWeatherCard;