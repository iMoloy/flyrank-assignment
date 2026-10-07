export interface City {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  country: string;
  admin1?: string;
}

export interface WeatherData {
  temperature: number;
  windspeed: number;
  weathercode: number;
  time: string;
}

export interface WeatherInfo {
  city: City;
  current: WeatherData;
}
