import React, { useState, useRef } from 'react';
import 'regenerator-runtime/runtime';
import './App.css';

function App() {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const queryInputRef = useRef(null);

  const API_KEY = process.env.REACT_APP_API_KEY;

  const getWeather = async () => {
    const query = queryInputRef.current.value;
    if (!query) return;

    setLoading(true);
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
      queryInputRef.current.value = '';
    } catch (err) {
      setWeather(null);
      setError('City not found. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
  {/* Do not remove the main div */}
      <h1>City Weather App</h1>
      <input
        ref={queryInputRef}
        className="search"
        type="text"
        placeholder="Enter city name"
      />
      <button onClick={getWeather}>Search</button>

      {loading && <p>Loading...</p>}
      
      <div className="weather" style={{ height: weather ? 'auto' : '0' }}>
        {weather && (
          <>
            <h2>{weather.temperature} °C</h2>
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


