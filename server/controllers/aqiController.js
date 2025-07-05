// controllers/aqiController.js
const axios = require("axios");

const getAQIData = async (req, res) => {
  const { city } = req.params;
  const { lat, lang } = req.query;

  if (!lat || !lang) {
    return res.status(400).json({ error: "Latitude and longitude are required." });
  }
  const data = require('../../Mock_Data/aqi.json')
  const aqi = data.aqi.aqi;

  const getAQIStatus = (aqi) => {
    switch (true) {
      case (aqi >= 0 && aqi <= 50):
        return "Good AQI";
      case (aqi > 50 && aqi <= 100):
        return "Moderate AQI";
      case (aqi > 100 && aqi <= 150):
        return "Unhealthy for Sensitive Groups";
      case (aqi > 150 && aqi <= 200):
        return "Unhealthy AQI";
      case (aqi > 200 && aqi <= 300):
        return "Very Unhealthy AQI";
      case (aqi > 300):
        return "Hazardous AQI";
      default:
        return "Invalid AQI data";
    }
  };


  const aqiStatus = getAQIStatus(aqi);
  const result = {
    city: city,
    temperature: {
      temperature: data.temperature.temperature,
      todayTemperature: data.temperature.todayTemperature,
      YesterdayTemperature: data.temperature.YesterdayTemperature,
      tomorrowTemperatue: data.temperature.tomorrowTemperatue
    },
    weatherMetrics: {
      humidity: data.weatherMetrics.humidity,
      reelFeel: data.weatherMetrics.reelFeel,
      uv: data.weatherMetrics.uv,
      pressure: data.weatherMetrics.pressure,
      chanceOfRain: data.weatherMetrics.chanceOfRain
    },
    aqi: {
      pm2_5: data.aqi.pm2_5,
      pm10: data.aqi.pm10,
      so2: data.aqi.so2,
      no2: data.aqi.no2,
      co: data.aqi.co,
      o2: data.aqi.o2,
      aqi: data.aqi.aqi,
      status: aqiStatus,
    }
  }
  res.json(result);
}



const temperatureData = async (req, res) => {
  const { city } = req.params;
  let { lat, lang } = req.query;

  if (!lat || !lang) {
    lat = lat || 22;
    lang = lang || 45;
  }


  const data = require('../../Mock_Data/temperature.json');
  const result = {
    city: data.city,
    Geolocation: {
      latitude: lat,
      longitude: lang
    },
    data: Date.now(),
    time: data.time,
    temperature: data.temperature
  }
  res.json(result);
}

module.exports = { getAQIData, temperatureData };
