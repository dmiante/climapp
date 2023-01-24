import SearchBar from './SearchBar/SearchBar'
import CurrentDay from './Current/CurrentDay'
import Loading from './Loading/Loading'

import useWeather from '../hooks/useWeather'
import useImage from '../hooks/useImage'
import getWeather from '../services/getWeather'
import styles from './Home.module.css'
import { WEATHER_CODES } from './Const'

export default function Home () {
  const { weather, loading, setWeather, setLoading } = useWeather()
  const fileName = WEATHER_CODES[weather?.code]?.[
    ((
      weather?.code === 1000 ||
      weather?.code === 1030 ||
      weather?.code === 1135 ||
      weather?.code === 1147
    ) && weather?.isDay) === 0
      ? 1
      : 0
  ]

  function SearchNewCity (cityName) {
    setLoading(true)
    getWeather(cityName)
      .then((data) => {
        setWeather(data)
        setLoading(false)
      })
  }

  const { bgImage } = useImage(fileName)

  const backgroundStyle = {
    backgroundImage: `url(${bgImage})`
  }

  return (
    <div className={styles.App} style={backgroundStyle}>
      <div className={styles.overlay}>
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
    </div>
  )
}
