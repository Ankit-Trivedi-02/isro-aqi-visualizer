import React, { createContext, useState, useEffect } from "react";
import { getLiveAQI, getAqiGraphData } from "../services/api.js";

// Create the Context
export const WeatherContext = createContext();

// Create a provider component
export const WeatherProvider = ({ children }) => {
  const [data, setData] = useState(null);
  const [aqiGraphData, setAqiGraphData] = useState(null);
  const [city, setCity] = useState("New York");
  const [lat, setLat] = useState("40.7128");
  const [lang, setLang] = useState("-74.0060");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getLiveAQI(city, lat, lang);
        console.log(data)  // Fetch both weather and AQI data
        if (data) {
          setData(data);  // Store the data
        }
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    fetchData();
  }, [city, lat, lang]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAqiGraphData(city, lat, lang);
        console.log(data)  // Fetch both weather and AQI data
        if (data) {
          setAqiGraphData(data);  // Store the data
        }
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    fetchData();
  }, [city, lat, lang]);

  return (
    <WeatherContext.Provider value={{ data, aqiGraphData, setCity, setLat, setLang }}>
      {children}
    </WeatherContext.Provider>
  );
};
