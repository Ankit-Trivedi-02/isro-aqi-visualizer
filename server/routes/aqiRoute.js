// routes/aqi.js
const express = require("express");
const router = express.Router();
const { getAQIData, temperatureData } = require("../controllers/aqiController");
const { spawn } = require('child_process');


router.get("/:city", getAQIData);
router.get("/temperatureData/:city", temperatureData);


router.get('/predict/:city', (req, res) => {

    const inputData = require('../../Mock_Data/aqi_data.json');  // Data from React frontend
    const pythonScriptPath = '../python-models/predict_aqi.py';
    // Call Python script to get prediction data
    const python = spawn('python', [pythonScriptPath]);

    // Pass data to Python script via stdin
    python.stdin.write(JSON.stringify(inputData));
    python.stdin.end();

    // Capture Python script output (prediction results)
    python.stdout.on('data', (data) => {
        const result = JSON.parse(data.toString());


        const aqiGraphData = {
            city: result.city,
            year: result.year,
            month: result.predicted_monthly_data.map(item => item.month),
            predicted_aqi: result.predicted_monthly_data.map(item => Math.round(item.predicted_aqi)),
            improved_aqi: result.predicted_monthly_data.map(item => Math.round(item.improved_aqi))
        };
        // Send result back to frontend (React)
        res.json(aqiGraphData);
    });
    // Handle any errors from Python process
    python.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
    });
    python.on('close', (code) => {
        if (code !== 0) {
            console.error(`Python process exited with code ${code}`);
        }
    });
});


module.exports = router;
