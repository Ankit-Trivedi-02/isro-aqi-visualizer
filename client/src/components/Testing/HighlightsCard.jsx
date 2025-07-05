import React from "react";
import "./HighlightsCard.css";

const HighlightsCard = () => {
  return (
    <div className="highlights-card">
      <div className="highlight-box">
        <span>Chance of Rain</span>
        <span>40%</span>
      </div>
      <div className="highlight-box">
        <span>UV Index</span>
        <img src="#" alt="UV Icon" />
      </div>
      <div className="highlight-box">
        <span>Wind Status</span>
        <img src="#" alt="Wind Icon" />
      </div>
      <div className="highlight-box">
        <span>Humidity</span>
        <img src="#" alt="Humidity Icon" />
      </div>
    </div>
  );
};

export default HighlightsCard;