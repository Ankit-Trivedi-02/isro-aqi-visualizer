import axios from "axios";

const BASE_URL = "http://localhost:5000/api/aqi"; // Your backend URL

/**
 * Fetch live AQI and weather data for a city with lat/lng.
 * @param {string} city - city name (required)
 * @param {string|number} lat - latitude (required)
 * @param {string|number} lang - longitude (required)
 * @returns {object|null} - response data or null if error
 */
export const getLiveAQI = async (city, lat, lang) => {
  if (!city || !lat || !lang) {
    console.error("City, latitude, and longitude are required parameters.");
    return null;
  }

  try {
    const url = `${BASE_URL}/${encodeURIComponent(city)}?lat=${lat}&lang=${lang}`;
    const res = await axios.get(url);
    console.log("Request URL:", url);
    console.log("Response data:", res.data);
    return res.data;
  } catch (error) {
    console.error("Failed to fetch AQI:", error);
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
    console.log("Request URL:", url);
    console.log("Response data:", res.data);
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
    console.log("Request URL:", url);
    console.log("Response data:", res.data);
    return res.data;
  } catch (error) {
    console.error("Failed to fetch AQI:", error);
    return null;
  }
};
