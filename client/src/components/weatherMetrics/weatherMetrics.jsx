import React, { useEffect, useState, useContext } from "react";
import "./weatherMetrics.css";
import { WeatherContext } from "../../context/WeatherContext.jsx";

const WeatherMetrics  = () => {
  const { data } = useContext(WeatherContext);

  if (!data) {
    return <div>Loading...</div>;
  }

  // Destructure the required data
  const {
    humidity,
    reelFeel,
    uv,
    pressure,
    chanceOfRain
  } = data.weatherMetrics;

  // Conditionally add rain effect if chance of rain > 90%
  const cardClass = chanceOfRain > 90 ? "extra-data-card rain" : "extra-data-card";

  return (
    <div className={cardClass}>
      <div className="extra-data-card-content">
        <h2>Extra Data Report</h2>
        <div className="extra-data-details">
          <div className="extra-data-item">
            <span>Humidity:</span>
            <span>{humidity} %</span>
          </div>
          <div className="extra-data-item">
            <span>Real Feel:</span>
            <span>{reelFeel} °C</span>
          </div>
          <div className="extra-data-item">
            <span>UV Index:</span>
            <span>{uv}</span>
          </div>
          <div className="extra-data-item">
            <span>Pressure:</span>
            <span>{pressure} hPa</span>
          </div>
          <div className="extra-data-item">
            <span>Chance of Rain:</span>
            <span>{chanceOfRain} %</span>
          </div>
        </div>
      </div>
      {chanceOfRain > 90 && <div className="rain-effect">🌧️</div>}
    </div>
  );
};

export default WeatherMetrics ;
