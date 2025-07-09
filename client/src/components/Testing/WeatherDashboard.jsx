import React from "react";
import SearchBar from "./SearchBar";
import Navbar from "./Navbar";
import TopBar from "./SearchBar";
import CurrentWeatherCard from "./CurrentWeatherCard";
import HighlightsCard from "./HighlightsCard";
import WeeklyForecast from "./WeeklyForecast";
import SuggestionsCard from "./SuggestionsCard";
import AQIReport from "./AQIReport";
import MapView from "./MapView";
import WeatherCharts from "./WeatherCharts";
import AnalysisChart from "./AnalysisChart";
import Footer from "./Footer";
import "./WeatherDashboard.css";

const WeatherDashboard = () => {
  return (
    <div className="dashboard-container">
      
      < SearchBar />
      <div className="main-content">
        <div className="left-panel">
          <CurrentWeatherCard />
          <WeeklyForecast />
          <MapView />
        </div>
        <div className="right-panel">
          <HighlightsCard />
          <SuggestionsCard />
          <AQIReport />
        </div>
      </div>
      <WeatherCharts />
      <AnalysisChart />
      <Footer />

    </div>
  );
};

export default WeatherDashboard;
