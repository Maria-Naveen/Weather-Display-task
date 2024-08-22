import { useState, useEffect } from "react";

const WeatherDisplay = () => {
  const [weatherDetails, setWeatherDetails] = useState(null);
  const [city, setCity] = useState("");
  const [searchTrigger, setSearchTrigger] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchWeather = async () => {
      if (city.trim()) {
        const URL = `http://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}&appid=${
          import.meta.env.VITE_API_KEY
        }`;
        try {
          const response = await fetch(URL);
          if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
          }
          const data = await response.json();
          setWeatherDetails(data);
          setError("");
        } catch (error) {
          console.error("Failed to fetch weather data:", error);
          setError("Failed to fetch weather data");
        }
      }
    };

    if (searchTrigger) {
      fetchWeather();
      setSearchTrigger(false); // Reset the trigger after fetching
    }
  }, [searchTrigger, city]);

  const handleClick = () => {
    if (city === "") {
      setError("Please enter a valid city name");
    }
    if (city.trim()) {
      setSearchTrigger(true);
    }
  };

  return (
    <div className="mw-1/4 flex flex-col gap-2 mw-1/4 justify-between mx-auto border border-blue-700 p-4">
      <div className="flex gap-3">
        <input
          value={city}
          type="text"
          onChange={(e) => setCity(e.target.value)}
          className="w-4/5 border-b-2 border-blue-600 focus:outline-none"
          placeholder="Enter city name"
        />
        <button
          onClick={handleClick}
          className="border border-gray-500 bg-yellow-400 p-2 rounded-lg"
        >
          Search
        </button>
      </div>
      {error && <p className="text-red-500">{error}</p>}
      {weatherDetails && (
        <div className="weather-info">
          <p>{weatherDetails.name}</p>
          <p>{weatherDetails.main.temp}°C</p>
          <p>{weatherDetails.weather[0].description}</p>
        </div>
      )}
    </div>
  );
};

export default WeatherDisplay;
