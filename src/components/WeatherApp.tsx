import React, { useState } from 'react';
import { Search, MapPin, Wind, ThermometerSun, Star, AlertCircle, Loader2 } from 'lucide-react';
import { useWeatherViewModel } from '../hooks/useWeatherViewModel';

const getWeatherIcon = (code: number) => {
  if (code <= 3) return '☀️'; // clear / partly cloudy
  if (code <= 48) return '🌫️'; // fog
  if (code <= 67) return '🌧️'; // rain
  if (code <= 77) return '❄️'; // snow
  if (code <= 82) return '🌦️'; // showers
  if (code <= 99) return '⛈️'; // thunderstorm
  return '☁️';
};

const getWeatherDescription = (code: number) => {
  if (code === 0) return 'Clear sky';
  if (code === 1 || code === 2 || code === 3) return 'Partly cloudy';
  if (code >= 45 && code <= 48) return 'Fog';
  if (code >= 51 && code <= 67) return 'Rain';
  if (code >= 71 && code <= 77) return 'Snow';
  if (code >= 80 && code <= 82) return 'Rain showers';
  if (code >= 95) return 'Thunderstorm';
  return 'Unknown';
};

export const WeatherApp: React.FC = () => {
  const {
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
  } = useWeatherViewModel();

  const [inputVal, setInputVal] = useState('');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputVal(e.target.value);
    // basic debounce
    setTimeout(() => {
      search(e.target.value);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Header */}
        <header className="text-center space-y-2">
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">Weather Forecast</h1>
          <p className="text-slate-500">Search for a city to get the current weather.</p>
        </header>

        {/* Search Section */}
        <div className="relative max-w-xl mx-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 h-5 w-5" />
            <input 
              type="text" 
              placeholder="Search city..." 
              className="w-full pl-10 pr-4 py-3 rounded-2xl border border-slate-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-lg"
              value={inputVal}
              onChange={handleSearchChange}
            />
            {isSearching && (
              <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 h-5 w-5 animate-spin" />
            )}
          </div>

          {/* Search Results Dropdown */}
          {searchResults.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-lg border border-slate-100 overflow-hidden z-10">
              {searchResults.map((city) => (
                <button
                  key={city.id}
                  onClick={() => {
                    selectCity(city);
                    setInputVal('');
                  }}
                  className="w-full text-left px-4 py-3 hover:bg-slate-50 flex items-center gap-3 transition-colors border-b border-slate-50 last:border-0"
                >
                  <MapPin className="h-4 w-4 text-slate-400" />
                  <div>
                    <span className="font-medium">{city.name}</span>
                    <span className="text-slate-500 text-sm ml-2">
                      {city.admin1 ? `${city.admin1}, ` : ''}{city.country}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          )}
          
          {searchError && (
            <div className="mt-2 text-red-500 text-sm flex items-center gap-1">
              <AlertCircle className="h-4 w-4" />
              {searchError}
            </div>
          )}
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Main Weather Display */}
          <div className="md:col-span-2 space-y-4">
            {isLoadingWeather ? (
              <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 flex flex-col items-center justify-center min-h-[300px]">
                <Loader2 className="h-8 w-8 text-blue-500 animate-spin mb-4" />
                <p className="text-slate-500">Fetching weather data...</p>
              </div>
            ) : weatherError ? (
              <div className="bg-red-50 text-red-700 rounded-3xl p-8 border border-red-100 flex flex-col items-center justify-center min-h-[300px]">
                <AlertCircle className="h-8 w-8 mb-4" />
                <p>{weatherError}</p>
              </div>
            ) : currentWeather ? (
              <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-6">
                  <button 
                    onClick={() => toggleFavorite(currentWeather.city)}
                    className="p-2 rounded-full hover:bg-slate-100 transition-colors"
                  >
                    <Star className={`h-6 w-6 ${isFavorite(currentWeather.city.id) ? 'fill-yellow-400 text-yellow-400' : 'text-slate-300'}`} />
                  </button>
                </div>
                
                <div className="flex items-center gap-2 text-slate-500 mb-6">
                  <MapPin className="h-5 w-5" />
                  <span className="text-lg font-medium">{currentWeather.city.name}, {currentWeather.city.country}</span>
                </div>
                
                <div className="flex items-end gap-6 mb-8">
                  <div className="text-8xl">
                    {getWeatherIcon(currentWeather.current.weathercode)}
                  </div>
                  <div>
                    <div className="text-6xl font-bold tracking-tighter">
                      {Math.round(currentWeather.current.temperature)}°
                    </div>
                    <div className="text-xl text-slate-500 font-medium">
                      {getWeatherDescription(currentWeather.current.weathercode)}
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-50 rounded-2xl p-4 flex items-center gap-3">
                    <ThermometerSun className="h-6 w-6 text-orange-500" />
                    <div>
                      <div className="text-sm text-slate-500">Temperature</div>
                      <div className="font-medium">{currentWeather.current.temperature} °C</div>
                    </div>
                  </div>
                  <div className="bg-slate-50 rounded-2xl p-4 flex items-center gap-3">
                    <Wind className="h-6 w-6 text-blue-500" />
                    <div>
                      <div className="text-sm text-slate-500">Wind Speed</div>
                      <div className="font-medium">{currentWeather.current.windspeed} km/h</div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-slate-50 rounded-3xl p-8 border-2 border-dashed border-slate-200 flex flex-col items-center justify-center min-h-[300px] text-slate-400">
                <Search className="h-12 w-12 mb-4 opacity-50" />
                <p>Search and select a city to see the weather</p>
              </div>
            )}
          </div>

          {/* Favorites Sidebar */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
              Favorites
            </h2>
            
            {favorites.length === 0 ? (
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 text-center text-slate-500 text-sm">
                No favorite cities yet. Click the star icon to save a city.
              </div>
            ) : (
              <div className="space-y-3">
                {favorites.map(city => (
                  <div 
                    key={city.id}
                    className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 flex items-center justify-between group"
                  >
                    <button 
                      onClick={() => selectCity(city)}
                      className="text-left font-medium hover:text-blue-600 transition-colors"
                    >
                      {city.name}
                      <span className="text-xs text-slate-400 block font-normal">{city.country}</span>
                    </button>
                    <button 
                      onClick={() => toggleFavorite(city)}
                      className="p-2 text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
                      title="Remove favorite"
                    >
                      <Star className="h-4 w-4 fill-current" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
