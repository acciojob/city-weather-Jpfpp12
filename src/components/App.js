// src/App.js
import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');

  const API_KEY = 'e6ee182dff98e269b0201414a17e7d4c';

  const getWeather = async () => {
    if (!query) return;

    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${API_KEY}&units=metric`
      );
      const data = response.data;
      setWeather({
        temperature: data.main.temp,
        description: data.weather[0].description,
        icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
      });
      setError('');
    } catch (err) {
      setWeather(null);
      setError('City not found. Please try again.');
    }
  };

  return (
    <div className="App">
        {/* Do not remove the main div */}
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
