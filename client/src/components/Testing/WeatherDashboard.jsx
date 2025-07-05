import React from "react";
import TopBar from "./TopBar";
import CurrentWeatherCard from "./CurrentWeatherCard";
import HighlightsCard from "./HighlightsCard";
import WeeklyForecast from "./WeeklyForecast";
import SuggestionsCard from "./SuggestionsCard";
import OtherCitiesCard from "./OtherCitiesCard";
import "./WeatherDashboard.css";

const WeatherDashboard = () => {
  return (
    <div className="dashboard-container">
      <TopBar />

      <div className="main-content">
        <div className="left-panel">
          <CurrentWeatherCard />
          <WeeklyForecast />
        </div>

        <div className="right-panel">
          <HighlightsCard />
          <SuggestionsCard />
          <OtherCitiesCard />
        </div>
      </div>
    </div>
  );
};

export default WeatherDashboard;
