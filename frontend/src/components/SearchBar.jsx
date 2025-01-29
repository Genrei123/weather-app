import { useState } from "react"
import { Search } from "lucide-react"
import { fetchWeather } from "../utils/api"
import { countryToName } from "../utils/countryToFlag"
import cities from "../utils/city.list.json"

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("")
  const [selectedCountry, setSelectedCountry] = useState("")
  const [searchResults, setSearchResults] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const countryList = [...new Set(cities.map((city) => city.country))]

  const handleInputChange = (e) => {
    setQuery(e.target.value)
  }

  const handleCountryChange = (e) => {
    setSelectedCountry(e.target.value)
    setSearchResults([])
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!query.trim()) return

    setIsLoading(true)
    try {
      const searchQuery = selectedCountry ? `${query},${selectedCountry}` : query

      const { data } = await fetchWeather(searchQuery)
      setSearchResults(Array.isArray(data) ? data : [data])
    } catch (error) {
      console.error("Error fetching weather data:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleResultClick = (location) => {
    const searchQuery = location.city
      ? `${location.city.name},${location.city.country}`
      : `${location.name},${location.sys.country}`

    onSearch(searchQuery)
    setSearchResults([])
    setQuery("")
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-4 rounded-md">
        <div className="flex gap-2">
          <select
            value={selectedCountry}
            onChange={handleCountryChange}
            className="p-2 border rounded-md flex-grow bg-white dark:bg-gray-800 dark:text-white transition-colors w-32"
          >
            <option value="">Select Country</option>
            {countryList.map((countryCode) => (
              <option key={countryCode} value={countryCode}>
                {countryToName(countryCode)} || {countryCode}
              </option>
            ))}
          </select>

          <div className="relative flex-grow flex items-center">
            <input
              type="text"
              value={query}
              onChange={handleInputChange}
              placeholder="Enter city name, zip code, landmark, and etc."
              className="p-2 pl-10 border rounded-md w-full bg-white dark:bg-gray-800 dark:text-white"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          </div>
        </div>

        <button
          type="submit"
          className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors disabled:bg-blue-300 disabled:cursor-not-allowed"
          disabled={isLoading}
        >
          {isLoading ? "Searching..." : "Search"}
        </button>
      </form>

      {searchResults.length > 0 && (
        <div className="mt-4 p-2 border rounded-md bg-white dark:bg-gray-800 max-h-60 overflow-y-auto shadow-lg">
          {searchResults.map((location, index) => (
            <button
              key={index}
              onClick={() => handleResultClick(location)}
              className="block w-full text-left p-2 hover:bg-blue-100 dark:hover:bg-blue-700 rounded-md transition-colors"
            >
              {countryToFlag(location.city ? location.city.country : location.sys.country)}{" "}
              {location.city
                ? `${location.city.name}, ${location.city.country}`
                : `${location.name}, ${location.sys.country}`}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default SearchBar;