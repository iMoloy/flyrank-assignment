import { useState, useEffect, useCallback } from 'react';
import type { City, WeatherInfo } from '../types';
import { weatherService } from '../services/weatherService';

export const useWeatherViewModel = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<City[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);

  const [currentWeather, setCurrentWeather] = useState<WeatherInfo | null>(null);
  const [isLoadingWeather, setIsLoadingWeather] = useState(false);
  const [weatherError, setWeatherError] = useState<string | null>(null);

  const [favorites, setFavorites] = useState<City[]>([]);

  // Load favorites from local storage
  useEffect(() => {
    const saved = localStorage.getItem('weather_favorites');
    if (saved) {
      try {
        setFavorites(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse favorites');
      }
    }
  }, []);

  // Save favorites to local storage
  useEffect(() => {
    localStorage.setItem('weather_favorites', JSON.stringify(favorites));
  }, [favorites]);

  const search = useCallback(async (query: string) => {
    setSearchQuery(query);
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    setSearchError(null);
    try {
      const results = await weatherService.searchCities(query);
      setSearchResults(results);
    } catch (err) {
      setSearchError('Failed to search cities. Please try again.');
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  }, []);

  const selectCity = useCallback(async (city: City) => {
    setIsLoadingWeather(true);
    setWeatherError(null);
    setSearchQuery('');
    setSearchResults([]);

    try {
      const weather = await weatherService.getWeather(city.latitude, city.longitude);
      setCurrentWeather({
        city,
        current: weather,
      });
    } catch (err) {
      setWeatherError(`Failed to get weather for ${city.name}.`);
    } finally {
      setIsLoadingWeather(false);
    }
  }, []);

  const toggleFavorite = useCallback((city: City) => {
    setFavorites(prev => {
      const isFavorite = prev.some(f => f.id === city.id);
      if (isFavorite) {
        return prev.filter(f => f.id !== city.id);
      }
      return [...prev, city];
    });
  }, []);

  const isFavorite = useCallback((cityId: number) => {
    return favorites.some(f => f.id === cityId);
  }, [favorites]);

  return {
    searchQuery,
    searchResults,
    isSearching,
    searchError,
    search,
    currentWeather,
    isLoadingWeather,
    weatherError,
    selectCity,
    favorites,
    toggleFavorite,
    isFavorite,
  };
};
