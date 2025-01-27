import { useState } from "react";

const SearchBar = ({ onSearch }) => {
    const [query, setQuery] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (query) {
            onSearch(query);
            setQuery("");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex gap-2">
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Enter city name"
                className="p-2 border rounded"
            />
            <button type="submit" className="p-2 bg-blue-500 text-white rounded">
                Search
            </button>
        </form>
    );
};

export default SearchBar;