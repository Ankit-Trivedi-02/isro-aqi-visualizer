import React, { useState, useContext } from "react";
import { WeatherContext } from "../../context/WeatherContext";
// import "./SearchBar.css";

const getSuggestions = async (query) => {
  const NOMINATIM_URL = `https://nominatim.openstreetmap.org/search?format=json&q=${query}&addressdetails=1&limit=5`;

  try {
    const response = await fetch(NOMINATIM_URL);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching suggestions:", error);
    return [];
  }
};

const extractCoords = (place) => ({
  name: place.display_name,
  lat: place.lat,
  lon: place.lon,
});

const SearchBar = () => {
  const { setCity, setLat, setLang } = useContext(WeatherContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const handleSearch = async (e) => {
    const query = e.target.value;
    setSearchTerm(query);

    if (query.length < 3) {
      setSuggestions([]);
      return;
    }

    try {
      const results = await getSuggestions(query);
      setSuggestions(results);
    } catch (err) {
      console.error("Nominatim search failed", err);
    }
  };

  const handleCitySelect = (place) => {
    const coords = extractCoords(place);
    setSearchTerm("");
    setSuggestions([]);
    setCity(coords.name);
    setLat(coords.lat);
    setLang(coords.lon);
  };

  return (
    <div className="search-bar-container">
      <div className="search-bar-left">ISRO WEATHER APP</div>
      <div className="search-bar-right">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search for a city..."
          className="search-input"
        />
        {suggestions.length > 0 && (
          <ul className="suggestions-dropdown">
            {suggestions.map((place) => (
              <li key={place.place_id} onClick={() => handleCitySelect(place)}>
                {place.display_name}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
