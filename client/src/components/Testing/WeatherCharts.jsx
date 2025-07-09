import React from "react";
import ReactECharts from "echarts-for-react";
import "./WeatherCharts.css";

const hourlyTempOptions = {
  title: {
    text: "Hourly Temperature Trends (°C)",
    left: "center",
    textStyle: { color: "#a3d2ca", fontWeight: "bold", fontSize: 18 },
  },
  backgroundColor: "#15274c",
  tooltip: { trigger: "axis" },
  xAxis: {
    type: "category",
    data: ["1 PM", "2 PM", "3 PM", "4 PM", "5 PM", "6 PM", "7 PM"],
    axisLine: { lineStyle: { color: "#bbb" } },
    axisLabel: { color: "#ccc" },
  },
  yAxis: {
    type: "value",
    axisLine: { lineStyle: { color: "#bbb" } },
    axisLabel: { color: "#ccc" },
    splitLine: { lineStyle: { color: "#2a3a5c" } },
  },
  series: [
    {
      data: [25, 26, 27, 26, 24, 22, 20],
      type: "line",
      smooth: true,
      lineStyle: { color: "#82ca9d", width: 3 },
      areaStyle: { color: "rgba(130,202,157,0.2)" },
      name: "Temperature",
    },
  ],
  grid: { left: "10%", right: "10%", bottom: "15%" },
};

const aqiComponentsOptions = {
  title: {
    text: "AQI Components Breakdown",
    left: "center",
    textStyle: { color: "#a3d2ca", fontWeight: "bold", fontSize: 18 },
  },
  backgroundColor: "#15274c",
  tooltip: {
    trigger: "item",
    formatter: "{b}: {c} µg/m³ ({d}%)",
  },
  legend: {
    orient: "vertical",
    left: 10,
    textStyle: { color: "#ccc" },
  },
  series: [
    {
      name: "Pollutants",
      type: "pie",
      radius: "60%",
      center: ["50%", "60%"],
      data: [
        { value: 8, name: "PM2.5" },
        { value: 30, name: "PM10" },
        { value: 20, name: "SO2" },
        { value: 20, name: "NO2" },
        { value: 33, name: "CO" },
        { value: 74, name: "O2" },
      ],
      emphasis: {
        itemStyle: {
          shadowBlur: 15,
          shadowOffsetX: 0,
          shadowColor: "rgba(0, 0, 0, 0.5)",
        },
      },
      label: { color: "#eee" },
      labelLine: { lineStyle: { color: "#ccc" } },
    },
  ],
};

const weeklyForecastOptions = {
  title: {
    text: "Weekly Temperature Forecast (High / Low °C)",
    left: "center",
    textStyle: { color: "#a3d2ca", fontWeight: "bold", fontSize: 18 },
  },
  backgroundColor: "#15274c",
  tooltip: { trigger: "axis" },
  legend: {
    data: ["High", "Low"],
    textStyle: { color: "#ccc" },
    top: 30,
  },
  xAxis: {
    type: "category",
    data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    axisLine: { lineStyle: { color: "#bbb" } },
    axisLabel: { color: "#ccc" },
  },
  yAxis: {
    type: "value",
    axisLine: { lineStyle: { color: "#bbb" } },
    axisLabel: { color: "#ccc" },
    splitLine: { lineStyle: { color: "#2a3a5c" } },
  },
  series: [
    {
      name: "High",
      data: [30, 28, 25, 26, 27, 29, 30],
      type: "line",
      smooth: true,
      lineStyle: { color: "#ff6b6b", width: 3 },
      areaStyle: { color: "rgba(255,107,107,0.2)" },
    },
    {
      name: "Low",
      data: [20, 18, 17, 19, 20, 21, 22],
      type: "line",
      smooth: true,
      lineStyle: { color: "#1e90ff", width: 3 },
      areaStyle: { color: "rgba(30,144,255,0.2)" },
    },
  ],
  grid: { left: "10%", right: "10%", bottom: "15%" },
};

const pollutantLevelsOptions = {
  title: {
    text: "Pollutant Levels Over Time",
    left: "center",
    textStyle: { color: "#a3d2ca", fontWeight: "bold", fontSize: 18 },
  },
  backgroundColor: "#15274c",
  tooltip: { trigger: "axis", axisPointer: { type: "shadow" } },
  legend: {
    data: ["PM2.5", "PM10", "SO2", "NO2", "CO", "O2"],
    textStyle: { color: "#ccc" },
    top: 30,
  },
  xAxis: {
    type: "category",
    data: ["1 PM", "2 PM", "3 PM", "4 PM", "5 PM"],
    axisLine: { lineStyle: { color: "#bbb" } },
    axisLabel: { color: "#ccc" },
  },
  yAxis: {
    type: "value",
    axisLine: { lineStyle: { color: "#bbb" } },
    axisLabel: { color: "#ccc" },
    splitLine: { lineStyle: { color: "#2a3a5c" } },
  },
  series: [
    { name: "PM2.5", type: "bar", stack: "pollutants", data: [8, 9, 7, 6, 8], itemStyle: { color: "#8884d8" } },
    { name: "PM10", type: "bar", stack: "pollutants", data: [20, 22, 19, 18, 21], itemStyle: { color: "#82ca9d" } },
    { name: "SO2", type: "bar", stack: "pollutants", data: [10, 12, 9, 8, 11], itemStyle: { color: "#ffc658" } },
    { name: "NO2", type: "bar", stack: "pollutants", data: [12, 14, 11, 10, 13], itemStyle: { color: "#ff8042" } },
    { name: "CO", type: "bar", stack: "pollutants", data: [18, 20, 17, 15, 19], itemStyle: { color: "#8dd1e1" } },
    { name: "O2", type: "bar", stack: "pollutants", data: [65, 70, 68, 66, 69], itemStyle: { color: "#a4de6c" } },
  ],
  grid: { left: "10%", right: "10%", bottom: "15%" },
};

const WeatherCharts = () => {
  return (
    <div className="weather-charts-echarts-container">
      <h2 className="main-title">Weather & AQI Data Visualization</h2>
      <div className="charts-grid">
        <div className="chart-card left">
          <ReactECharts option={hourlyTempOptions} style={{ height: 300, width: "100%" }} />
        </div>
        <div className="chart-card right">
          <ReactECharts option={aqiComponentsOptions} style={{ height: 300, width: "100%" }} />
        </div>

        <div className="chart-card left">
          <ReactECharts option={weeklyForecastOptions} style={{ height: 350, width: "100%" }} />
        </div>
        <div className="chart-card right">
          <ReactECharts option={pollutantLevelsOptions} style={{ height: 350, width: "100%" }} />
        </div>
      </div>
    </div>
  );
};

export default WeatherCharts;
