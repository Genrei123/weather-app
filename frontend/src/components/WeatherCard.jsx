import React, { useState } from "react"
import { Cloud, Droplets, Eye, Sunrise, Sunset, Thermometer, Wind } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"
import { ScrollArea } from "../ui/scroll-area"

const WeatherCard = ({ weather }) => {
  const [selectedDate, setSelectedDate] = useState(null)

  if (!weather || !weather.list?.length) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardContent className="p-6 text-center">
          <p>Loading weather data...</p>
        </CardContent>
      </Card>
    )
  }

  const kelvinToCelsius = (kelvin) => (kelvin - 273.15).toFixed(1)
  const formatTime = (timestamp) =>
    new Date(timestamp * 1000).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    })

  const getWeatherIcon = (iconCode) => `https://openweathermap.org/img/wn/${iconCode}@2x.png`

  // Group weather data by date
  const groupedForecast = weather.list.reduce((acc, forecast) => {
    const date = forecast.dt_txt.split(" ")[0] // Extract date (YYYY-MM-DD)
    if (!acc[date]) {
      acc[date] = []
    }
    acc[date].push(forecast)
    return acc
  }, {})

  // Set the initial selected date to the first date in the forecast
  if (!selectedDate && Object.keys(groupedForecast).length > 0) {
    setSelectedDate(Object.keys(groupedForecast)[0])
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-3xl font-bold text-center">5-Day Weather Forecast</CardTitle>
        <CardDescription className="text-center">
          {weather.city.name}, {weather.city.country}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={selectedDate || undefined} onValueChange={setSelectedDate}>
          <TabsList className="grid w-full grid-cols-5 gap-2" >
            {Object.keys(groupedForecast).map((date) => (
              <TabsTrigger key={date} value={date} className="text-xs sm:text-sm relative border border-transparent hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300 rounded-md px-2 py-1">
                {new Date(date).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })}
              </TabsTrigger>
            ))}
          </TabsList>
          {Object.entries(groupedForecast).map(([date, forecasts]) => (
            <TabsContent key={date} value={date}>
              <ScrollArea className="h-[400px] w-full rounded-md border p-4">
                {forecasts.map((forecast) => (
                  <ForecastItem key={forecast.dt} forecast={forecast} />
                ))}
              </ScrollArea>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  )
}

const ForecastItem = ({ forecast }) => {
  const kelvinToCelsius = (kelvin) => (kelvin - 273.15).toFixed(1)
  const formatTime = (timestamp) =>
    new Date(timestamp * 1000).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    })
  const getWeatherIcon = (iconCode) => `https://openweathermap.org/img/wn/${iconCode}@2x.png`

  return (
    <div className="flex items-center justify-between py-4 border-b last:border-0">
      <div className="flex items-center gap-4">
        <img
          src={getWeatherIcon(forecast.weather[0].icon) || "/placeholder.svg"}
          alt={forecast.weather[0].description}
          className="w-16 h-16"
        />
        <div>
          <p className="text-lg font-semibold capitalize">{forecast.weather[0].description}</p>
          <p className="text-sm text-gray-500">{formatTime(forecast.dt)}</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div className="flex items-center gap-2">
          <Thermometer className="w-4 h-4" />
          <span>{forecast.main.temp}°C</span>
        </div>
        <div className="flex items-center gap-2">
          <Droplets className="w-4 h-4" />
          <span>{forecast.main.humidity}%</span>
        </div>
        <div className="flex items-center gap-2">
          <Wind className="w-4 h-4" />
          <span>{forecast.wind.speed} m/s</span>
        </div>
        <div className="flex items-center gap-2">
          <Eye className="w-4 h-4" />
          <span>{forecast.visibility ? forecast.visibility 
          / 1000 + 'km' : 'No Data'}</span>
        </div>
      </div>
    </div>
  )
}

export default WeatherCard