import React, { useContext } from "react";
import "./WeeklyForecast.css";
import { WeatherContext } from "../../context/WeatherContext";
import IMAGES from "../../assets/Weather-icons/asset";

const WeeklyForecast = () => {
  const { data } = useContext(WeatherContext);

  if (!data) {
    return <div>Loading.......</div>
  }

  const { temperatures, times } = data.temperature.temperatureWindow;
  const { sunrise, sunset, lengthOfDay } = data.sun;
  const { tomorrowTemperatureMean } = data.temperature;
  console.log(temperatures, times)
  return (
    <div className="weekly-forecast">
      <div className="hourly">
        {times.map((time, i) => (
          <div key={i} className="hour-slot">
            <div className="hourly-container">
              <div className="time">{time}</div>
              <img src={IMAGES.temp20} alt="cloudy icon" />
              <div>{temperatures[i]}°</div>
            </div>
          </div>
        ))}
      </div>

      <div className="tomorrow">
        Tomorrow: {tomorrowTemperatureMean}° <img src={IMAGES.cold} alt="thunderstorm icon" />
      </div>

      <div className="sun-data-box">
        <div className="sun-data">
          <div>Sunrise: {sunrise} AM</div>
          <div>Sunset: {sunset} PM</div>
          <div>Length of Day: {lengthOfDay}</div>
        </div>
      </div>
    </div>
  );
};

export default WeeklyForecast;
