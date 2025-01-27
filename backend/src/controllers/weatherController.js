const { fetchWeatherData } = require("../services/openWeatherService");

const getWeatherForecast = async (req, res) => {
    const { query } = req.query;

    if (!query) {
        return res.status(400).json({ error: "Query parameter is required" });
    }

    try {
        const data = await fetchWeatherData(query);
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch weather data" });
    }
};

module.exports = { getWeatherForecast };
