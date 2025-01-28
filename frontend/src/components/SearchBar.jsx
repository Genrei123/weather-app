import { useState } from "react";
import cities from "../utils/city.list.json"; // Assuming city.list.json is in utils folder

const SearchBar = ({ onSearch }) => {
    const [query, setQuery] = useState("");
    const [suggestions, setSuggestions] = useState([]);

    const handleInputChange = (e) => {
        setQuery(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (query) {
            // Filter cities only when Search button is clicked
            const filteredCities = cities
                .filter((city) =>
                    city.name.toLowerCase().startsWith(query.toLowerCase())
                )
                .slice(0, 10); // Limit suggestions to 10
            setSuggestions(filteredCities);
        } else {
            setSuggestions([]); // Clear suggestions if query is empty
        }
    };

    const handleSuggestionClick = (cityName) => {
        setQuery(cityName);
        setSuggestions([]);
        onSearch(cityName); // Trigger search with the selected city
    };

    return (
        <div>
            <form onSubmit={handleSubmit} className="flex gap-2">
                <div className="relative">
                    <input
                        type="text"
                        value={query}
                        onChange={handleInputChange}
                        placeholder="Enter city name"
                        className="p-2 border rounded w-full"
                    />
                    {/* Suggestions as Buttons */}
                    {suggestions.length > 0 && (
                        <div className="absolute bg-white border rounded w-full mt-1 max-h-40 overflow-y-auto p-2 space-y-2">
                            {suggestions.map((city, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleSuggestionClick(city.name)}
                                    className="block w-full text-left p-2 bg-gray-100 hover:bg-blue-500 hover:text-white rounded"
                                >
                                    {city.name}, {city.country}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
                <button type="submit" className="p-2 bg-blue-500 text-white rounded">
                    Search
                </button>
            </form>
        </div>
    );
};

export default SearchBar;