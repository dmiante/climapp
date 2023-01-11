import SearchBar from './SearchBar/SearchBar'
import CurrentDay from './Current/CurrentDay'
import useWeather from '../hooks/useWeather'

import styles from './Home.module.css'
import Loading from './Loading/Loading'
import getWeather from '../services/getWeather'

export default function Home () {
  const { weather, loading, setWeather, setLoading } = useWeather()

  function SearchNewCity (cityName) {
    setLoading(true)
    getWeather(cityName)
      .then((data) => {
        // console.log(data)
        setWeather(data)
        setLoading(false)
      })
  }

  return (
    <div className='App'>
      <header>
        <h1 className={styles.title}>ClimApp</h1>
        <SearchBar onNewCity={SearchNewCity} />
      </header>
      {
        loading
          ? <Loading />
          : <div className={styles.container}> <CurrentDay weather={weather} /> </div>
      }
      <footer className={styles.footer}>
        <p>Made by dmi4n</p>
      </footer>
    </div>
  )
}
