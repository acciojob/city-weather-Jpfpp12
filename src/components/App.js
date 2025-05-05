import React, { useState, useEffect } from 'react';
import 'regenerator-runtime/runtime';
import './App.css';

function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');

  const API_KEY = process.env.REACT_APP_API_KEY;

  const getWeather = async () => {
    if (!query) return;

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${API_KEY}&units=metric`
      );

      if (!response.ok) {
        throw new Error('City not found');
      }

      const data = await response.json();

      setWeather({
        temperature: data.main.temp,
        description: data.weather[0].description,
        icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
      });
      setError('');
      
      // Clear the input after a valid city is entered
      setQuery('');
    } catch (err) {
      setWeather(null);
      setError('City not found. Please try again.');
    }
  };

  useEffect(() => {
    if (query) {
      getWeather();
    }
  }, [query]);

  return (
    <div className="App">
      <h1>City Weather App</h1>
      <input
        className="search"
        type="text"
        placeholder="Enter city name"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={getWeather}>Search</button>

      <div className="weather">
        {weather && (
          <>
            <h2>{query.toUpperCase()}</h2>
            <p>{weather.temperature} °C</p>
            <p>{weather.description}</p>
            <img src={weather.icon} alt="weather icon" />
          </>
        )}
        {error && <p>{error}</p>}
      </div>
    </div>
  );
}

export default App;
