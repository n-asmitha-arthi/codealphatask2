import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './WeatherComponent.css';

const WeatherComponent = () => {
  const [weatherData, setWeatherData] = useState(null);
  const API_KEY = 'f6a3f1bdadf42a073db0f7a6dc6dfd58';
  const city = 'COIMBATORE';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
        );
        setWeatherData(response.data);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    fetchData();
  }, [city]);

  const getWeatherIconUrl = (iconCode) => {
    return `https://openweathermap.org/img/w/${iconCode}.png`;
  };

  const convertKelvinToCelsius = (kelvin) => {
    return (kelvin - 273.15).toFixed(1);
  };

  return (
    <div className="weather-container">
      {weatherData ? (
        <div className="weather-details">
          <h2>{weatherData.name}, {weatherData.sys.country}</h2>
          <img
            src={getWeatherIconUrl(weatherData.weather[0].icon)}
            alt={weatherData.weather[0].description}
          />
          <p>Temperature: {convertKelvinToCelsius(weatherData.main.temp)}°C</p>
          <p>Weather: {weatherData.weather[0].description}</p>
          {/* Add more details as needed */}
        </div>
      ) : (
        <p>Loading weather data...</p>
      )}
    </div>
  );
};

export default WeatherComponent;
