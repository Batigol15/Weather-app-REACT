import React, { useState } from "react";
import axios from "axios";

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");
  const [error, setError] = useState(null);

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=65123355882e03efe77a5c7f32106ae2&units=metric`;

  const searchLocation = (event) => {
    if (event.key === "Enter") {
      axios
        .get(url)
        .then((response) => {
          setData(response.data);
          console.log(response.data);
        })
        .catch((error) => {
          setError(error);
        });
      // setLocation("");
    }
  };

  if (error) {
    if (error.response) {
      if (error.response.status === 400) {
        return window.location.reload();
      } else if (error.response.status === 404) {
        return window.location.reload();
      }
    }
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="app">
      <div className="container">
        <div className="search">
          <input
            value={location}
            onChange={(event) => setLocation(event.target.value)}
            onKeyPress={searchLocation}
            placeholder="Unesite ime grada"
            type="text"
          />
        </div>
        <div className="top">
          <div className="location">
            <p className="city">{data.name}</p>
          </div>
          <div className="temperature">
            {data.main ? <h1>{Math.round(data.main.temp)}°C</h1> : null}
          </div>
          <div className="description">
            {data.weather ? (
              <img src={`icons/${data.weather[0].icon}.png`} alt="weather" />
            ) : null}
            {/* {  <img src={`icons/${data.weather[0].icon}.png`} alt="weather" /> }  */}
            {data.weather ? (
              <p className="bold">{data.weather[0].description}</p>
            ) : null}
          </div>
        </div>
        <div className="bottom">
          <div className="pressure">
            <p>tlak zraka</p>
            {data.main ? (
              <p className="bold">{data.main.pressure} hPa</p>
            ) : null}
          </div>
          <div className="humidity">
            <p>vlaga</p>
            {data.main ? <p className="bold">{data.main.humidity} %</p> : null}
          </div>
          <div className="wind">
            <p>vjetar</p>
            {data.wind ? <p className="bold">{data.wind.speed} km/h</p> : null}
          </div>
        </div>
        <div className="footer">
          <p className="foot">Toni Amižić ////// Skriptni programski jezici</p>
        </div>
      </div>
    </div>
  );
}

export default App;
