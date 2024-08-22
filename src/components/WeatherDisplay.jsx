import { useState, useEffect } from "react";
const WeatherDisplay = () => {
  const [weatherDetails, setWeatherDetails] = useState({});
  const [city, setCity] = useState("");

  const handleClick = () => {
    console.log(city);
  };

  return (
    <div className="flex gap-2 mw-1/4 justify-between mx-auto border border-blue-700 p-4">
      <input
        value={city}
        type="text"
        onChange={(e) => setCity(e.target.value)}
        className="w-4/5 border-b-2 border-blue-600 focus:outline-none"
      />
      <button
        onClick={handleClick}
        className="border border-gray-500 bg-yellow-400 p-2 rounded-lg"
      >
        Search
      </button>
    </div>
  );
};

export default WeatherDisplay;
