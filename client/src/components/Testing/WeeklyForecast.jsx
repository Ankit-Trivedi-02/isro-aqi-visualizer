import React from "react";
import "./WeeklyForecast.css";

const WeeklyForecast = () => {
  return (
    <div className="weekly-forecast">
      <div className="hourly">
        {["1PM", "2PM", "3PM", "4PM", "5PM", "6PM", "7PM"].map((time, i) => (
          <div key={i} className="hour-slot">
            <div>{time}</div>
            <img src="#" alt="cloudy icon" />
            <div>{20 - i}°</div>
          </div>
        ))}
      </div>
      <div className="tomorrow">Tomorrow: 14° <img src="#" alt="thunderstorm icon" /></div>
      <div className="sun-data">
        <div>Sunrise: 6:45 AM</div>
        <div>Sunset: 5:30 PM</div>
        <div>Length of Day: 10h 23m</div>
      </div>
    </div>
  );
};

export default WeeklyForecast;