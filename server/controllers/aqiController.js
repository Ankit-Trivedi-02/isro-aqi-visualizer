// controllers/aqiController.js
const axios = require("axios");

const getAQIData = async (req, res) => {
  const { city } = req.params;
  const { lat, lang, requestTime } = req.query;

  if (!lat || !lang) {
    return res.status(400).json({ error: "Latitude and longitude are required." });
  }

  try {
    // 🌍 Try to fetch location using reverse geocoding
    let location = {
      city: city,
      state: null,
      country: null
    };

    try {
      const locationURL = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lang}`;
      const locationRes = await axios.get(locationURL, {
        headers: { 'User-Agent': 'AQI-App/1.0' }
      });

      const { address } = locationRes.data;
      location.city = address.city || address.town || address.village || city;
      location.state = address.state || null;
      location.country = address.country || null;
    } catch (err) {
      console.warn("⚠️ Failed to fetch location info:", err.message);
      // fallback: location = { city: city, state: null, country: null }
    }

    // 🔗 API URLs
    const airQualityURL = `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${lat}&longitude=${lang}&hourly=pm2_5,pm10,carbon_monoxide,nitrogen_dioxide,ozone,uv_index,european_aqi`;
    const weatherURL = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lang}&hourly=temperature_2m,relative_humidity_2m,surface_pressure,precipitation_probability,cloudcover&daily=sunrise,sunset&timezone=auto`;

    const [airRes, weatherRes] = await Promise.all([
      axios.get(airQualityURL),
      axios.get(weatherURL)
    ]);

    const airData = airRes.data;
    const weatherData = weatherRes.data;

    const times = weatherData?.hourly?.time;
    const temps = weatherData?.hourly?.temperature_2m;

    if (!times || !temps) {
      return res.status(500).json({ error: "Missing temperature or time data" });
    }

    let targetTimeISO = requestTime || new Date().toISOString().slice(0, 13) + ":00";
    let hourIndex = times.indexOf(targetTimeISO);

    if (hourIndex === -1) {
      hourIndex = 0;
      for (let i = 0; i < times.length; i++) {
        if (times[i].startsWith(targetTimeISO.slice(0, 10))) {
          hourIndex = i;
          break;
        }
      }
    }

    const startIdx = Math.max(0, hourIndex - 3);
    const endIdx = Math.min(times.length - 1, hourIndex + 3);
    const timeWindow = times.slice(startIdx, endIdx + 1).map(t => t.slice(11, 16));
    const tempWindow = temps.slice(startIdx, endIdx + 1);

    const todayDate = targetTimeISO.slice(0, 10);
    const tomorrowDate = new Date(new Date(todayDate).getTime() + 24 * 60 * 60 * 1000)
      .toISOString().slice(0, 10);

    const todayTemps = [];
    const tomorrowTemps = [];

    for (let i = 0; i < times.length; i++) {
      const datePart = times[i].slice(0, 10);
      if (datePart === todayDate) {
        todayTemps.push(temps[i]);
      } else if (datePart === tomorrowDate) {
        tomorrowTemps.push(temps[i]);
      }
    }

    const mean = arr => arr.length ? arr.reduce((a, b) => a + b, 0) / arr.length : null;
    const todayMeanTemp = Math.round(mean(todayTemps));
    const tomorrowMeanTemp = Math.round(mean(tomorrowTemps));
    const todayHighTemp = todayTemps.length ? Math.max(...todayTemps) : null;
    const todayLowTemp = todayTemps.length ? Math.min(...todayTemps) : null;

    const toAmPm = (isoTime) => {
      if (!isoTime) return null;
      const date = new Date(isoTime);
      let hours = date.getHours();
      const minutes = date.getMinutes();
      const ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12 || 12;
      const minStr = minutes < 10 ? '0' + minutes : minutes;
      return `${hours}:${minStr} ${ampm}`;
    };

    const aqiValue = airData?.hourly?.european_aqi?.[hourIndex] ?? null;

    const getAQIStatus = (aqi) => {
      switch (true) {
        case aqi >= 0 && aqi <= 50:
          return "Good AQI";
        case aqi > 50 && aqi <= 100:
          return "Moderate AQI";
        case aqi > 100 && aqi <= 150:
          return "Unhealthy for Sensitive Groups";
        case aqi > 150 && aqi <= 200:
          return "Unhealthy AQI";
        case aqi > 200 && aqi <= 300:
          return "Very Unhealthy AQI";
        case aqi > 300:
          return "Hazardous AQI";
        default:
          return "Unknown AQI";
      }
    };

    const x = toAmPm(weatherData?.daily?.sunrise?.[0]).slice(0, 4); // Sunrise
    const y = toAmPm(weatherData?.daily?.sunset?.[0]).slice(0, 4); // Sunset

    // Function to convert "HH:MM" to minutes
    function timeToMinutes(timeStr) {
      const [hours, minutes] = timeStr.split(":").map(Number);
      return hours * 60 + minutes;
    }

    // Function to convert minutes back to "HH:MM"
    function minutesToTime(minutes) {
      const hrs = Math.floor(minutes / 60);
      const mins = minutes % 60;
      return `${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}`;
    }

    // Calculate length of the day
    const lengthInMinutes = timeToMinutes(y) - timeToMinutes(x);
    const lengthOfDay = minutesToTime(lengthInMinutes);


    // ✅ Final response
    const clientData = {
      location,
      temperature: {
        temperature: temps[hourIndex] ?? null,
        todayTemperatureMean: todayMeanTemp,
        tomorrowTemperatureMean: tomorrowMeanTemp,
        todayHighTemp,
        todayLowTemp,
        temperatureWindow: {
          times: timeWindow,
          temperatures: tempWindow,
        }
      },
      weatherMetrics: {
        humidity: weatherData?.hourly?.relative_humidity_2m?.[hourIndex] ?? null,
        uv: airData?.hourly?.uv_index?.[hourIndex] ?? null,
        pressure: weatherData?.hourly?.surface_pressure?.[hourIndex] ?? null,
        chanceOfRain: weatherData?.hourly?.precipitation_probability?.[hourIndex] ?? null
      },
      aqi: {
        pm2_5: airData?.hourly?.pm2_5?.[hourIndex] ?? null,
        pm10: airData?.hourly?.pm10?.[hourIndex] ?? null,
        co: airData?.hourly?.carbon_monoxide?.[hourIndex] ?? null,
        no2: airData?.hourly?.nitrogen_dioxide?.[hourIndex] ?? null,
        o3: airData?.hourly?.ozone?.[hourIndex] ?? null,
        aqi: aqiValue,
        status: getAQIStatus(aqiValue)
      },
      sun: {
        sunrise: toAmPm(weatherData?.daily?.sunrise?.[0]),
        sunset: toAmPm(weatherData?.daily?.sunset?.[0]),
        lengthOfDay: lengthOfDay
      }
    };

    res.json(clientData);

  } catch (error) {
    console.error("❌ Failed to fetch data:", error.message);
    res.status(500).json({ error: "Failed to fetch air quality or weather data." });
  }
};


const temperatureData = async (req, res) => {
  const { city } = req.params;
  let { lat, lang } = req.query;

  if (!lat || !lang) {
    lat = lat || 22;
    lang = lang || 45;
  }

  // ✅ Fetch from Open-Meteo Weather API
  try {
    const weatherURL = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lang}&hourly=temperature_2m,relative_humidity_2m,surface_pressure,precipitation_probability,cloudcover&daily=sunrise,sunset&timezone=auto`;
    const response = await axios.get(weatherURL);
    console.log("📈 Temperature Forecast Data:", response.data);
  } catch (error) {
    console.error("Error fetching temperature data:", error.message);
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
