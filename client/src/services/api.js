import axios from "axios";
import { WeatherContext } from "../context/WeatherContext";

const BASE_URL = "http://localhost:5000/api/aqi";

/**
 * Fetch live AQI and weather data for a specific location.
 * @param {Object} params - Parameters for the API request.
 * @param {string} params.city - City name (required).
 * @param {string|number} params.lat - Latitude (required).
 * @param {string|number} params.lang - Longitude (required).
 * @returns {Promise<Object|null>} - Weather/AQI data or null on error.
 */
export const getLiveAQI = async ({ city, lat, lang }) => {
  console.log(city,lat,lang);
  if (!city || !lat || !lang) {
    console.error("Missing required parameters: city, lat, and lang must be provided.");
    return null;
  }

  const url = `${BASE_URL}/${encodeURIComponent(city)}`;
  const queryParams = {
    params: { lat, lang },
  };

  try {
    const response = await axios.get(url, queryParams);
    console.debug("Request URL:", response.config.url);
    console.debug("Response Data:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching AQI and weather data:", error.message || error);
    return null;
  }
};

export const getTemperatureData = async (city, lat, lang) => {
  if (!city || !lat || !lang) {
    console.error("City, latitude, and longitude are required parameters.");
    return null;
  }

  try {
    const url = `${BASE_URL}/temperatureData/${encodeURIComponent(city)}?lat=${lat}&lang=${lang}`;
    const res = await axios.get(url);
   // console.log("Request URL:", url);
   // console.log("Response data:", res.data);
    return res.data;
  } catch (error) {
    console.error("Failed to fetch AQI:", error);
    return null;
  }
};

export const getAqiGraphData = async (city, lat, lang) => {
  if (!city || !lat || !lang) {
    console.error("City, latitude, and longitude are required parameters.");
    return null;
  }

  try {
    const url = `${BASE_URL}/predict/${encodeURIComponent(city)}?lat=${lat}&lang=${lang}`;
    const res = await axios.get(url);
    //console.log("Request URL:", url);
    //console.log("Response data:", res.data);
    return res.data;
  } catch (error) {
    console.error("Failed to fetch AQI:", error);
    return null;
  }
};
