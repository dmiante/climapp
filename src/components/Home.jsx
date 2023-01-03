import { useEffect, useState } from 'react'
import SearchBar from './SearchBar/SearchBar'
import CurrentDay from './Current/CurrentDay'
import getWeather from '../services/getWeather'
import styles from './Home.module.css'

export default function Home () {
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
      <header>
        <h1 className={styles.title}>ClimApp</h1>
        <SearchBar onNewCity={SearchNewCity} />
      </header>
      <div className={styles.container}>
        <CurrentDay weather={weather} />
      </div>
      <footer className={styles.footer}>
        <p>Made by dmi4n</p>
      </footer>
    </div>
  )
}
