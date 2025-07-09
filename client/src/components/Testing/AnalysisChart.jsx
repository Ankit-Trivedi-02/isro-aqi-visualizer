import React, { useState } from "react";
import "./AnalysisChart.css";
import { Line, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend,
  Tooltip,
} from "chart.js";

ChartJS.register(LineElement, BarElement, CategoryScale, LinearScale, PointElement, Legend, Tooltip);

const AnalysisChart = () => {
  const [inputs, setInputs] = useState({
    vehicle_shift: 5,
    tree_planting: 3,
    renewable_energy: 2,
    year: 2026,
  });

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const predictedAQI = [160, 162, 158, 155, 150, 145, 140, 142, 148, 153, 157, 160];

  const improvementFactor =
    1 -
    (parseFloat(inputs.vehicle_shift) + parseFloat(inputs.tree_planting) + parseFloat(inputs.renewable_energy)) /
      100;

  const improvedAQI = predictedAQI.map((val) => Math.round(val * improvementFactor));

  const averageDrop = (
    predictedAQI.reduce((a, b) => a + b, 0) / predictedAQI.length -
    improvedAQI.reduce((a, b) => a + b, 0) / improvedAQI.length
  ).toFixed(2);

  const lineData = {
    labels: months,
    datasets: [
      {
        label: "Predicted AQI",
        data: predictedAQI,
        fill: false,
        borderColor: "rgb(255, 99, 132)",
        tension: 0.3,
      },
      {
        label: "Improved AQI",
        data: improvedAQI,
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.3,
      },
    ],
  };

  const barData = {
    labels: months,
    datasets: [
      {
        label: "AQI Drop",
        data: predictedAQI.map((v, i) => v - improvedAQI[i]),
        backgroundColor: "rgba(54, 162, 235, 0.6)",
      },
    ],
  };

  return (
    <div className="analysis-container">
      <h2 className="analysis-title">AQI Prediction & Improvement Analysis</h2>

      <div className="input-boxes">
        <div>
          <label>Vehicle Shift (%):</label>
          <input
            type="number"
            value={inputs.vehicle_shift}
            onChange={(e) => setInputs({ ...inputs, vehicle_shift: e.target.value })}
          />
        </div>
        <div>
          <label>Tree Planting (%):</label>
          <input
            type="number"
            value={inputs.tree_planting}
            onChange={(e) => setInputs({ ...inputs, tree_planting: e.target.value })}
          />
        </div>
        <div>
          <label>Renewable Energy (%):</label>
          <input
            type="number"
            value={inputs.renewable_energy}
            onChange={(e) => setInputs({ ...inputs, renewable_energy: e.target.value })}
          />
        </div>
        <div>
          <label>Prediction Year:</label>
          <input
            type="number"
            value={inputs.year}
            onChange={(e) => setInputs({ ...inputs, year: e.target.value })}
          />
        </div>
      </div>

      <div className="charts-grid">
        <div className="chart-box">
          <h3>Yearly AQI Trend ({inputs.year})</h3>
          <Line data={lineData} />
        </div>

        <div className="chart-box">
          <h3>Monthly AQI Improvement</h3>
          <Bar data={barData} />
        </div>
      </div>

      <div className="improvement-summary">
        Based on the measures taken, the AQI improved by <strong>{averageDrop}</strong> points on average.
      </div>
    </div>
  );
};

export default AnalysisChart;
