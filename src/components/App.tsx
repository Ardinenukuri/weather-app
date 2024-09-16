import React, { useState, Suspense, lazy } from 'react';
import SearchBar from './SearchBar';
import axios from 'axios';
import WeatherService from '../services/WeatherService';
import { WeatherData } from '../types/Weather';

// Lazy load WeatherDisplay and WeatherGraph
const WeatherDisplay = lazy(() => import('./WeatherDisplay'));
const WeatherGraph = lazy(() => import('./WeatherGraph'));

const App: React.FC = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchWeather = async (city: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await WeatherService.getWeather(city);
      setWeather(data);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.response?.status === 404) {
          setError('City not found. Please try again.');
        } else {
          setError('An unexpected error occurred. Please try again later.');
        }
      } else {
        setError('An unexpected error occurred. Please try again later.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <h1>Weather Dashboard</h1>
      <SearchBar onSearch={fetchWeather} />
      {loading && <p className="loading">Loading...</p>}
      {error && <p className="error">{error}</p>}
      {weather && (
        <>
          <Suspense fallback={<p>Loading weather display...</p>}>
            <WeatherDisplay weather={weather} />
          </Suspense>
          <Suspense fallback={<p>Loading weather graph...</p>}>
            <WeatherGraph data={weather.forecast || []} />
          </Suspense>
        </>
      )}
    </div>
  );
};

export default App;
