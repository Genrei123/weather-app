import React, { useState } from 'react';
import { fetchWeather } from "../utils/api";
import SearchBar from '../components/SearchBar';
import WeatherCard from '../components/WeatherCard';
import { Cloud, CloudRain } from 'lucide-react';

const Home = () => {
    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSearch = async (searchQuery) => {
        setLoading(true);
        setError(null);
        try {
            const { data } = await fetchWeather(searchQuery);
            setWeatherData(data);
        } catch (err) {
            console.error('Error fetching weather:', err);
            setError('Failed to fetch weather data');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="text-white min-h-screen bg-gradient-to-b from-blue-100 to-blue-200 dark:from-gray-800 dark:to-gray-900 flex flex-col items-center justify-center p-4">
            <header className="mb-8 text-center">
                <h1 className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2 flex items-center justify-center">
                    <Cloud className="mr-2" size={36} />
                    Weather Forecast
                </h1>
                <p className="text-gray-600 dark:text-gray-300">Get the latest weather information for any city</p>
            </header>

            <main className="w-full max-w-4xl">
                <SearchBar onSearch={handleSearch} />
                
                {loading && (
                    <div className="text-center mt-8">
                        <CloudRain className="animate-bounce mx-auto text-blue-500" size={48} />
                        <p className="mt-4 text-gray-600 dark:text-gray-300">Fetching weather data...</p>
                    </div>
                )}
                
                {error && (
                    <div className="text-center mt-8 text-red-500 dark:text-red-400">
                        <p>{error}</p>
                    </div>
                )}
                
                {weatherData && !loading && !error && (
                    <div className="mt-8">
                        <WeatherCard weather={weatherData} />
                    </div>
                )}
            </main>

            <footer className="mt-12 text-center text-gray-500 dark:text-gray-400">
                <p>&copy; 2025 Weather Forecast App. For Technical Assessment</p>
            </footer>
        </div>
    );
};

export default Home;
