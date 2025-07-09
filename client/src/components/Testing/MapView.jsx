import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, GeoJSON } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './MapView.css';

import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';

// Fix Leaflet marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({ iconRetinaUrl, iconUrl, shadowUrl });

// AQI GeoJSON (mock sample, replace with real data)
const aqiGeoJSON = {
    type: 'FeatureCollection',
    features: [
        {
            type: 'Feature',
            properties: { aqi: 50 },
            geometry: { type: 'Polygon', coordinates: [[[-74.01, 40.71], [-74.00, 40.71], [-74.00, 40.72], [-74.01, 40.72]]] },
        },
        {
            type: 'Feature',
            properties: { aqi: 120 },
            geometry: { type: 'Polygon', coordinates: [[[-74.00, 40.70], [-73.99, 40.70], [-73.99, 40.71], [-74.00, 40.71]]] },
        },
    ],
};

// Get color based on AQI value
function getAqiColor(aqi) {
    if (aqi <= 50) return '#009966';
    if (aqi <= 100) return '#ffde33';
    if (aqi <= 150) return '#ff9933';
    if (aqi <= 200) return '#cc0033';
    return '#660099';
}

// Shared component to handle clicks and markers
const ClickableMapEvents = ({ setPosition }) => {
    useMapEvents({
        click(e) {
            setPosition([e.latlng.lat, e.latlng.lng]);
        },
    });
    return null;
};

const MapView = () => {
    // Shared position state
    const [position, setPosition] = useState([26.4, 80.3]);

    return (
        <div className="map-wrapper-container"> {/* Outer container with background */}
            <h2 className="map-title">Location-Based Air Quality Maps</h2>

            <div className="dual-map-container">
                {/* Heatmap Section */}
                <div className="map-section">
                    <h3>Heatmap</h3>
                    <MapContainer center={position} zoom={13} className="mini-map">
                        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                        <Marker position={position}>
                            <Popup>Heatpoint<br />Lat: {position[0].toFixed(4)}, Lng: {position[1].toFixed(4)}</Popup>
                        </Marker>
                        <ClickableMapEvents setPosition={setPosition} />
                    </MapContainer>
                </div>

                {/* AQI Map Section */}
                <div className="map-section">
                    <h3>AQI Map</h3>
                    <MapContainer center={position} zoom={13} className="mini-map">
                        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                        <GeoJSON
                            data={aqiGeoJSON}
                            style={({ properties }) => ({
                                fillColor: getAqiColor(properties.aqi),
                                fillOpacity: 0.6,
                                weight: 1,
                                color: '#333',
                            })}
                        />
                        <Marker position={position}>
                            <Popup>AQI Point<br />Lat: {position[0].toFixed(4)}, Lng: {position[1].toFixed(4)}</Popup>
                        </Marker>
                        <ClickableMapEvents setPosition={setPosition} />
                    </MapContainer>

                    <div className="legend">
                        <legend>AQI Ranges & Colors</legend>
                        <div><span style={{ background: '#009966' }}></span> 0–50 Good</div>
                        <div><span style={{ background: '#ffde33' }}></span> 51–100 Moderate</div>
                        <div><span style={{ background: '#ff9933' }}></span> 101–150 Unhealthy for Sensitive</div>
                        <div><span style={{ background: '#cc0033' }}></span> 151–200 Unhealthy</div>
                        <div><span style={{ background: '#660099' }}></span> 201+ Very Unhealthy</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MapView;
