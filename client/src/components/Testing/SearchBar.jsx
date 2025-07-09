import React, { useState } from "react";
import "./SearchBar.css";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);

  const getSuggestions = async (query) => {
    if (!query) {
      setSuggestions([]);
      return;
    }
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${query}&addressdetails=1&limit=5`;
    try {
      const res = await fetch(url);
      const data = await res.json();
      setSuggestions(data);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
      setSuggestions([]);
    }
  };

  const handleChange = (e) => {
    const val = e.target.value;
    setSearchTerm(val);
    if (val.length >= 3) {
      getSuggestions(val);
    } else {
      setSuggestions([]);
    }
  };

  const handleSelect = (place) => {
    setSelectedCity({
      name: place.display_name,
      lat: place.lat,
      lon: place.lon,
    });
    setSearchTerm(place.display_name);
    setSuggestions([]);
  };

  return (
    <div className="searchbar-container">
      <div className="app-title">ISRO WEATHER APP</div>
      <div className="search-input-wrapper">
        <input
          type="text"
          placeholder="Search for city or area..."
          value={searchTerm}
          onChange={handleChange}
          className="search-input"
        />
        {suggestions.length > 0 && (
          <ul className="suggestions-list">
            {suggestions.map((place) => (
              <li
                key={place.place_id}
                onClick={() => handleSelect(place)}
                className="suggestion-item"
              >
                {place.display_name}
              </li>
            ))}
          </ul>
        )}
      </div>

      {selectedCity && (
        <div className="selected-info">
          <p><b>Selected:</b> {selectedCity.name}</p>
          <p><b>Latitude:</b> {selectedCity.lat}</p>
          <p><b>Longitude:</b> {selectedCity.lon}</p>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
