export interface WeatherData {
  city: string;
  temperature: number;
  humidity: number;
  windSpeed: number;
  forecast?: ForecastData[]; 
}

export interface ForecastData {
  hour: string;
  temperature: number;
}
