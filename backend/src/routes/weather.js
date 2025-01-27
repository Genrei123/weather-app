const express = require("express");
const { getWeatherForecast } = require("../controllers/weatherController");
const router = express.Router();

router.get("/", getWeatherForecast);

module.exports = router;
