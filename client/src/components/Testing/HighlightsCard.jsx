import React, { useContext } from "react";
import "./HighlightsCard.css";
import { WeatherContext } from "../../context/WeatherContext";
import IMAGES from "../../assets/Weather-icons/asset";

const HighlightsCard = () => {
  const { data } = useContext(WeatherContext);
  if (!data) {
    return <div>Loading...</div>;
  }
  const { chanceOfRain, humidity, pressure, uv } = data.weatherMetrics;
  return (
    <div className="highlights-card">
      <div className="highlight-box">
        <span>Chance of Rain</span>
        <img src={IMAGES.rain} alt="A LOGO" />
        <span>{chanceOfRain}%</span>
      </div>
      <div className="highlight-box">
        <span>UV Index</span>
        <img src={IMAGES.uv} alt="UV Icon" />
        <span>{uv}</span>
      </div>
      <div className="highlight-box">
        <span>Pressure</span>
        <img src={IMAGES.pressure} alt="Wind Icon" />
        <span>{pressure} mb</span>
      </div>
      <div className="highlight-box">
        <span>Humidity</span>
        <img src={IMAGES.humidity} alt="Humidity Icon" />
        <span>{humidity}</span>
      </div>
    </div>
  );
};

export default HighlightsCard;