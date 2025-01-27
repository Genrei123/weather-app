import axios from "axios";

const API = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL + "/api/weather",
});

export const fetchWeather = (query) => API.get("/", { params: { query } });