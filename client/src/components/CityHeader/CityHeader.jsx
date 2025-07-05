import React, { useState, useContext } from "react";
import { WeatherContext } from "../../context/WeatherContext"; // Import WeatherContext
import "./CityHeader.css";

// Function to fetch city suggestions from Nominatim API
const getSuggestions = async (query) => {
  const NOMINATIM_URL = `https://nominatim.openstreetmap.org/search?format=json&q=${query}&addressdetails=1&limit=5`;

  try {
    const response = await fetch(NOMINATIM_URL);
    const data = await response.json();
    return data; // Return the suggestions
  } catch (error) {
    console.error("Error fetching suggestions:", error);
    return [];
  }
};

// Function to extract coordinates and city name
const extractCoords = (place) => {
  return {
    name: place.display_name, // City name
    lat: place.lat, // Latitude
    lon: place.lon, // Longitude
  };
};

const CityHeader = () => {
  const { setCity, setLat, setLang } = useContext(WeatherContext);  // Get context functions
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedCityName, setSelectedCityName] = useState("Delhi");

  // Handle search input
  const handleSearch = async (e) => {
    const query = e.target.value;
    setSearchTerm(query);

    if (query.length < 3) {
      setSuggestions([]); // Clear suggestions if query is too short
      return;
    }

    try {
      const results = await getSuggestions(query); // Fetch city suggestions from Nominatim
      setSuggestions(results);
    } catch (err) {
      console.error("Nominatim search failed", err);
    }
  };

  // Handle city selection
  const handleCitySelect = (place) => {
    const coords = extractCoords(place); // Extract coordinates and name from the selected place
    setSelectedCityName(coords.name); // Update the city name in the header
    setSearchTerm(""); // Clear the search term
    setSuggestions([]); // Clear suggestions

    // Update context values
    setCity(coords.name);  // Set selected city name
    setLat(coords.lat);  // Set latitude
    setLang(coords.lon); // Set longitude
  };

  return (
    <div className="header-box">
      <div className="city-header">

        <div className="city-info">
          <h1>{selectedCityName}</h1> {/* Display the selected city */}
          <h5>
            {(() => {
              const date = new Date();
              const weekday = date.toLocaleDateString("en-US", { weekday: "long" });
              const day = date.getDate();
              const month = date.toLocaleDateString("en-US", { month: "long" });
              const year = date.getFullYear();
              return `${weekday} ${day}, ${month} ${year}`;
            })()}
          </h5>
        </div>
        <div className="city-search">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Search for a city..."
            className="city-search-input"
          />
          {/* Display suggestions if available */}
          {suggestions.length > 0 && (
            <ul className="city-suggestions">
              {suggestions.map((place) => (
                <li key={place.place_id} onClick={() => handleCitySelect(place)}>
                  {place.display_name} {/* Show place name */}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default CityHeader;
