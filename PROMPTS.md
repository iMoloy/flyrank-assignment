# AI Prompts Log

Here is a sequential list of prompts used during the AI-assisted development of the Weather App:

1. **Initialization and Architecture:**
   > "I need to build a Weather App in React using Vite, TypeScript, and Tailwind CSS. The app should follow the MVVM (Model, View, ViewModel) architecture. Please set up the types and models first. I'll use the free Open-Meteo API. Create the `src/types/index.ts` file with `City`, `WeatherData`, and `WeatherInfo` interfaces."

2. **API Service:**
   > "Next, create an API service layer that separates the fetching logic. Build a `weatherService.ts` in the `src/services` folder. It should have two methods: one for searching cities using `https://geocoding-api.open-meteo.com/v1/search` and another for getting the current weather at specific latitude and longitude coordinates using `https://api.open-meteo.com/v1/forecast`. Use fetch and handle potential errors."

3. **ViewModel (Custom Hook):**
   > "Now, create a custom hook `useWeatherViewModel.ts` that will act as our ViewModel. It should manage states for `searchQuery`, `searchResults`, `isSearching`, `searchError`, `currentWeather`, `isLoadingWeather`, and `weatherError`. Also, include logic for saving and loading favorite cities using `localStorage`."

4. **UI View (Main Component):**
   > "Create the `WeatherApp.tsx` component. It should use `useWeatherViewModel`. Build a beautiful, responsive UI using Tailwind CSS with a search bar at the top, a dropdown for search results, a main weather display card in the center, and a sidebar for favorite cities. Use `lucide-react` for icons like Search, MapPin, and Star. Ensure empty states and loading states are handled gracefully."

5. **Refactoring & Polish:**
   > "The weather code from Open-Meteo needs to be mapped to readable descriptions and emojis (like ☀️ for clear, 🌧️ for rain). Please add helper functions `getWeatherIcon(code)` and `getWeatherDescription(code)` inside the component. Also, hook up the main `App.tsx` to render the `WeatherApp`."
