import React from "react";
import "./SuggestionsCard.css";

const SuggestionsCard = () => {
  return (
    <div className="suggestions-card">
      <h3>Today’s Suggestion</h3>
      <ul>
        <li>Wear a mask if sensitive to air</li>
        <li>Avoid outdoor activities after 5 PM</li>
        <li>Stay hydrated</li>
      </ul>
    </div>
  );
};

export default SuggestionsCard;