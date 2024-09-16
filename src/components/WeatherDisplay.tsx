import React from 'react';
import { WeatherData } from '../types/Weather';

const WeatherDisplay: React.FC<{ weather: WeatherData }> = ({ weather }) => {
  return (
    <div>
      <h2>{weather.city}</h2>
      <p>Temperature: {weather.temperature}°C</p>
      <p>Humidity: {weather.humidity}%</p>
      <p>Wind Speed: {weather.windSpeed} km/h</p>
    </div>
  );
};

export default WeatherDisplay;