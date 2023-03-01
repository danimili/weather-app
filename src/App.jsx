import { useState } from 'react';
import './App.css';
import axios from 'axios'

function App() {
  const [data, setData] = useState({})
  const [location, setLocation] = useState()

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=5726493dd12f9aa8b6d82dbf8c2be158`

  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      axios.get(url).then((response) => {
        setData(response.data)
        console.log(response.data)
      })
      setLocation('')
    }
  }
  return (
    <div className="App">
      <div className="search">
        <input
          value={location}
          onChange={event => setLocation(event.target.value)}
          onKeyPress={searchLocation}
          placeholder='Enter Location'
          type="text"></input>
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
            <h1>{data.name}</h1>
          </div>
        </div>
        <div className="description">
          {data.weather ? <h2>{data.weather[0].main}</h2> : null}
        </div>
        <div className="temp">
        {data.main ? <h1>{(data.main.temp -273.15) .toFixed(2)} C°</h1> : null}
        </div>

        {data.name !== undefined && 
        <div className="bottom">
          <div className="feels">
            {data.main ? <p className='bold'>{(data.main.feels_like -273.15) .toFixed(2)} C°</p> : null}
            <p>Feels Like</p>
          </div>
          <div className="humidity">
            {data.main ? <p className='bold'>{data.main.humidity} %</p> : null}
            <p>Humidity</p>
          </div>
          <div className="wind">
            {data.wind ? <p className='bold'>{data.wind.speed.toFixed(2)} MPH</p> : null}
            <p>Wind Speed</p>
          </div>
        </div>
      }
      </div>
    </div>
  );
}

export default App;
