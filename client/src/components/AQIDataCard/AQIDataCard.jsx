import React, { useEffect, useState, useContext } from "react";
import "./AQIDataCard.css";
import { WeatherContext } from "../../context/WeatherContext.jsx";// Reusing the API service

const AQIDataCard = () => {
  const { data } = useContext(WeatherContext);

  if (!data) {
    return <div>Loading...</div>;
  }

  // Destructure the required data
const {
  pm2_5,
  pm10,
  so2,
  no2,
  co,
  o2,
  aqi,   // Make sure `aqi` exists in your data, or remove if not present
  status // Similarly, ensure `status` is part of the data
} = data.aqi;
console.log(data.airQuality)


  // Conditional background color based on the "status"
  const cardStyle = status === "Very Poor" ? { backgroundColor: "purple" } : {};

  return (
    <div className="aqi-card" style={cardStyle}>
      <div className="aqi-card-content">
        <h2>AQI Report</h2>
        <div className="aqi-details">
          <div className="aqi-item">
            <span>PM2.5:</span>
            <span>{pm2_5} µg/m³</span>
          </div>
          <div className="aqi-item">
            <span>PM10:</span>
            <span>{pm10} µg/m³</span>
          </div>
          <div className="aqi-item">
            <span>SO2:</span>
            <span>{so2} µg/m³</span>
          </div>
          <div className="aqi-item">
            <span>NO2:</span>
            <span>{no2} µg/m³</span>
          </div>
          <div className="aqi-item">
            <span>CO:</span>
            <span>{co} µg/m³</span>
          </div>
          <div className="aqi-item">
            <span>O2:</span>
            <span>{o2} %</span>
          </div>
        </div>
        <div className="aqi-summary">
          <div className="aqi-item">
            <span>AQI:</span>
            <span>{aqi}</span>
          </div>
          <div className="aqi-item">
            <span>Status:</span>
            <span>{status}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AQIDataCard;
