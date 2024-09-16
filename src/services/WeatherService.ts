import axios from 'axios';
import { WeatherData } from '../types/Weather';


const API_URL = 'https://api.openweathermap.org/data/2.5/weather';
const API_KEY = '15f88e50bd7919f812970b811c08a233';

const getWeather = async (city: string): Promise<WeatherData> => {
  try {
    const response = await axios.get(`${API_URL}?q=${city}&appid=${API_KEY}&units=metric`);

    if (response.data.cod === '404') {
      throw new Error('City not found');
    }

    // Make sure forecast is always defined
    const forecast = response.data.forecast ? response.data.forecast.map((hourlyData: any) => ({
      hour: hourlyData.dt_txt,
      temperature: hourlyData.main.temp,
    })) : [];

    return {
      city: response.data.name,
      temperature: response.data.main.temp,
      humidity: response.data.main.humidity,
      windSpeed: response.data.wind.speed,
      forecast, // Use the defined forecast
    };
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

export default { getWeather };