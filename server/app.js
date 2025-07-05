const express = require("express");
const cors = require("cors");
const aqiRoutes = require("./routes/aqiRoute");
const bodyParser = require('body-parser');
const app = express();
app.use(cors());

app.use(bodyParser.json());
app.use(express.json());

app.get("/", (req, res) => res.send("AQI API is running"));
app.use("/api/aqi", aqiRoutes);


app.listen(5000, () => console.log("Server running on port 5000"));
