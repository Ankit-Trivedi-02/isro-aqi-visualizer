import React, { useContext } from 'react';
import './AQIReport.css';
import { WeatherContext } from '../../context/WeatherContext';

const AQIReport = () => {
    const { data } = useContext(WeatherContext);

    if (!data) {
        return <div>Loading...</div>;
    }
    const {
        pm2_5,
        pm10,
        no2,
        co,
        o3,
        aqi,   // Make sure `aqi` exists in your data, or remove if not present
        status // Similarly, ensure `status` is part of the data
    } = data.aqi;
    return (
        <div className="aqi-report-container">
            <div className="aqi-header">
                <h2>Air Quality Index (AQI) Report</h2>
            </div>

            <div className="aqi-boxes">
                {/* PM2.5 Box */}
                <div className="aqi-box">
                    <h3>PM2.5</h3>
                    <p>{pm2_5} µg/m³</p>
                    <p className="suggestions">Control: Avoid outdoor activities during high pollution periods. Use air purifiers indoors.</p>
                </div>

                {/* PM10 Box */}
                <div className="aqi-box">
                    <h3>PM10</h3>
                    <p>{pm10} µg/m³</p>
                    <p className="suggestions">Control: Stay indoors when dust levels are high. Use masks in polluted areas.</p>
                </div>

                {/* SO2 Box */}
                <div className="aqi-box">
                    <h3>SO2 (Sulfur Dioxide)</h3>
                    <p>20 µg/m³</p>
                    <p className="suggestions">Control: Limit exposure to industrial areas. Use air purifiers with a sulfur dioxide filter.</p>
                </div>

                {/* NO2 Box */}
                <div className="aqi-box">
                    <h3>NO2 (Nitrogen Dioxide)</h3>
                    <p>{no2} µg/m³</p>
                    <p className="suggestions">Control: Reduce car use and industrial emissions. Improve ventilation in your home.</p>
                </div>

                {/* CO Box */}
                <div className="aqi-box">
                    <h3>CO (Carbon Monoxide)</h3>
                    <p>{co} µg/m³</p>
                    <p className="suggestions">Control: Ensure proper ventilation when using gas-powered appliances. Avoid idle car engines.</p>
                </div>

                {/* O2 Box */}
                <div className="aqi-box">
                    <h3>O3 (Oxygen)</h3>
                    <p>{o3} %</p>
                    <p className="suggestions">Control: Increase outdoor activities and fresh air intake. Avoid high altitudes for better O2 levels.</p>
                </div>
            </div>

            {/* AQI Status Box */}
            <div className="aqi-status">
                <h3>AQI: {aqi}</h3>
                <p>Status: {status}</p>
                <p className="status-description">People with respiratory conditions, children, and the elderly should avoid prolonged outdoor activities.</p>
            </div>
        </div>
    );
};

export default AQIReport;
