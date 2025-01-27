import { useState } from "react";
import SearchBar from "../components/SearchBar";
import WeatherCard from "../components/WeatherCard";
import { fetchWeather } from "../utils/api";

const Home = () => {
    const [weather, setWeather] = useState(null);

    const handleSearch = async (query) => {
        try {
            const { data } = await fetchWeather(query);
            setWeather(data);
        } catch (error) {
            console.error("Error fetching weather data:", error);
        }
    };

    return (
        <div className="p-4">
            <SearchBar onSearch={handleSearch} />
            {weather && <WeatherCard weather={weather} />}
        </div>
    );
};

export default Home;