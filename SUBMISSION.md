# AI-Assisted Development Assignment Submission

## 1. Completed Application
- **App Type:** Weather Forecasting Application
- **Stack:** React (Vite), TypeScript, Tailwind CSS, Lucide Icons
- **Architecture:** MVVM (Model-View-ViewModel) utilizing custom hooks
- **Data Source:** Open-Meteo API (Geocoding & Weather Forecast, completely open and free)
- **Data Persistence:** Local Storage (for user's favorite cities)
- **Source Code:** [Source Code Available Here](src/)

## 2. Prompts Used
Please see the [`PROMPTS.md`](PROMPTS.md) file in the root directory for a sequential log of the prompts used to generate the components and logic.

## 3. Explanation of AI Assistance
AI was highly instrumental throughout the implementation process:
- **Architecture & Boilerplate:** The AI efficiently structured the project according to MVVM principles. Instead of writing boilerplate types and fetch logic from scratch, the AI provided perfectly typed interfaces (`City`, `WeatherData`) and an encapsulated API service layer.
- **State Management (ViewModel):** The AI generated a robust custom hook (`useWeatherViewModel`) that gracefully handled loading states, search results, potential API errors, and caching favorite cities via `localStorage`. This isolated the state logic completely from the React UI.
- **UI & Styling:** Generating a visually appealing layout with Tailwind CSS is often time-consuming. The AI handled the design of responsive grids, empty states, input fields, and icons instantly.

## 4. Manual Corrections & Improvements (Refactoring)
While the AI successfully generated the base architecture, the following manual improvements and logic fixes were applied:

1. **Debouncing Search Input:** 
   *Issue:* The AI initially bound the search fetch directly to the `onChange` event, which caused a flood of API requests on every keystroke, resulting in API rate limits and UI lag.
   *Fix:* I manually wrapped the `search` invocation in a `setTimeout` inside `handleSearchChange` to debounce the requests, giving users time to finish typing.

2. **Error State Handling on Geocoding:**
   *Issue:* The AI did not properly catch situations where the Geocoding API returned an empty results array when an obscure/invalid city was typed.
   *Fix:* Added logic to verify if the search query returns actual results, and updated the UI to display "No cities found" rather than a blank dropdown list.

3. **Weather Code Interpretation:**
   *Issue:* The Open-Meteo API returns numeric `weathercode` values (e.g., `45`, `80`). The AI just printed the numbers to the screen.
   *Fix:* I manually implemented `getWeatherIcon(code)` and `getWeatherDescription(code)` utility functions to map WMO weather codes to human-readable strings and corresponding emojis, greatly improving the User Experience.

4. **Dropdown Z-Index & Layout Bugs:**
   *Issue:* The absolute positioned search results dropdown was appearing behind the weather display card in certain viewport sizes because no z-index was specified.
   *Fix:* I added `z-10` and proper background styling to the search results dropdown in Tailwind to ensure it overlaps the main content properly.
