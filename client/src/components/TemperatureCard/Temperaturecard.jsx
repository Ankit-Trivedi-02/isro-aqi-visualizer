import React, { useEffect, useState, useContext } from 'react';
import './TemperatureCard.css';
import { WeatherContext } from "../../context/WeatherContext";
const TemperatureCard = () => {
  // Use the context to access the weather data
  const { data } = useContext(WeatherContext);

  if (!data) {
    return <div>Loading...</div>;
  }
  // Destructure the required data
  const { temperature, todayTemperature, YesterdayTemperature, tomorrowTemperatue } = data.temperature;

  // Determine the glass tint color based on the temperature
  let glassTint = 'rgba(255, 255, 255, 0.1)'; // Default: normal glass
  if (temperature < 25) {
    glassTint = 'rgba(0, 162, 255, 0.2)'; // Light bluish tint for cooler temperatures
  } else if (temperature > 30) {
    glassTint = 'rgba(255, 94, 77, 0.2)'; // Light orange tint for warmer temperatures
  }

  return (
    <div className="card" style={{ backgroundColor: glassTint }}>
      <div className="card-content">
        <h2>Temperature</h2>
        <p className="temp">{temperature}</p>
        <div className="temperature-details">
          <div className="temp-item">
            <span>Yesterday:</span>
            <span>{YesterdayTemperature}°C</span>
          </div>
          <div className="temp-item">
            <span>Today:</span>
            <span>{todayTemperature}°C</span>
          </div>
          <div className="temp-item">
            <span>Tomorrow:</span>
            <span>{tomorrowTemperatue}°C</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemperatureCard;
