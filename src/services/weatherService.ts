import { City, WeatherData } from '../types';

export const weatherService = {
  async searchCities(query: string): Promise<City[]> {
    if (!query) return [];
    
    try {
      const response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=5&language=en&format=json`);
      if (!response.ok) throw new Error('Failed to fetch cities');
      const data = await response.json();
      return data.results || [];
    } catch (error) {
      console.error('Error searching cities:', error);
      throw error;
    }
  },

  async getWeather(lat: number, lon: number): Promise<WeatherData> {
    try {
      const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,wind_speed_10m,weather_code`);
      if (!response.ok) throw new Error('Failed to fetch weather');
      const data = await response.json();
      
      return {
        temperature: data.current.temperature_2m,
        windspeed: data.current.wind_speed_10m,
        weathercode: data.current.weather_code,
        time: data.current.time,
      };
    } catch (error) {
      console.error('Error fetching weather:', error);
      throw error;
    }
  }
};
