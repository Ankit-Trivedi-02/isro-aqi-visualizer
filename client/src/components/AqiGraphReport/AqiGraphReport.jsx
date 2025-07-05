import React, { useEffect, useState, useContext } from "react";
import { WeatherContext } from "../../context/WeatherContext.jsx";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import "./AqiGraphReport.css";

// Register necessary components for Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const AqiGraphReport = () => {
    const { aqiGraphData } = useContext(WeatherContext);
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [],
    });

    useEffect(() => {
        if (aqiGraphData) {
            const data = {
                labels: aqiGraphData.month,
                datasets: [
                    {
                        label: "Predicted AQI",
                        data: aqiGraphData.predicted_aqi,
                        fill: false,
                        borderColor: "rgb(153, 75, 192)",
                        tension: 0.1,
                    },
                    {
                        label: "Improved AQI",
                        data: aqiGraphData.improved_aqi,
                        fill: false,
                        borderColor: "rgb(0, 239, 64)",
                        tension: 0.1,
                    },
                ],
            };
            setChartData(data);
        }
    }, [aqiGraphData]);

    if (!aqiGraphData) {
        return <div>Loading...</div>;
    }

    return (
        <div className="aqi-graph-container">
            <h2>AQI Prediction for year 2026</h2>
            <div className="chart-container">
                <Line data={chartData} />
            </div>
        </div>
    );
};

export default AqiGraphReport;
