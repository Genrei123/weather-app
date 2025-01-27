const WeatherCard = ({ weather }) => {
    return (
        <div className="p-4 border rounded">
            <h2>{weather.city.name}</h2>
            <div>
                {weather.list.slice(0, 5).map((forecast, idx) => (
                    <div key={idx} className="flex justify-between">
                        <span>{new Date(forecast.dt * 1000).toDateString()}</span>
                        <span>{forecast.main.temp}°C</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default WeatherCard;