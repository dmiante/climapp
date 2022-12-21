import { useEffect, useState } from 'react'
import SearchBar from './components/SearchBar/SearchBar'
import CurrentDay from './components/Current/CurrentDay'
import './App.css'
import getWeather from './services/getWeather'
// import getWeather from './services/getWeather'

function App () {
  const [weather, setWeather] = useState([])

  useEffect(() => {
    getWeather()
      .then((data) => {
        setWeather(data)
      })
  }, [])

  function SearchNewCity (cityName) {
    getWeather(cityName)
      .then((data) => {
        console.log(data)
        setWeather(data)
      })
  }

  return (
    <div className='App'>
      <div className='header'>
        <h1>ClimApp | Simple Weather App</h1>
        <SearchBar onNewCity={SearchNewCity} />
      </div>
      <div className='container'>
        <CurrentDay weather={weather} />
      </div>
      <div className='footer'>
        <p>Made by dmi4n</p>
      </div>
    </div>
  )
}

export default App
