const axios = require("axios");

const fetchWeatherData = async (query) => {
    const apiKey = process.env.OPENWEATHER_API_KEY;
    const baseUrl = "https://api.openweathermap.org/data/2.5/forecast";
    const url = `${baseUrl}?q=${query}&units=metric&appid=${apiKey}`;

    const response = await axios.get(url);
    return response.data;
};

module.exports = { fetchWeatherData };