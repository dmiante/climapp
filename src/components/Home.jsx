import SearchBar from './SearchBar/SearchBar'
import CurrentDay from './Current/CurrentDay'
import Loading from './Loading/Loading'
import ForecastHour from './ForecastHour/ForecastHour'

import { useWeather } from '../hooks/useWeather'
import useImage from '../hooks/useImage'
import styles from './Home.module.css'
import { WEATHER_CODES } from './Const'

export default function Home () {
  const { weather, loading, loadWeather } = useWeather()
  const { hour } = weather
  console.log(weather)
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

  function SearchNewCity ({ inputValue }) {
    loadWeather(inputValue)
  }

  const { bgImage } = useImage(fileName)
  // console.log(bgImage)

  const backgroundStyle = {
    backgroundImage: `url(${bgImage})`
  }

  return (
    <div className={styles.App} style={backgroundStyle}>
      <div className={styles.overlay}>
        <header>
          <h1 className={styles.title}>ClimApp</h1>
          <SearchBar onSubmit={SearchNewCity} />
        </header>
        {
          weather && loading
            ? <Loading />
            : (
              <div className={styles.container}>
                <CurrentDay weather={weather} />
                <ForecastHour hoursForecast={hour} />
              </div>
              )
        }
        <footer className={styles.footer}>
          <p>Made by dmi4n</p>
        </footer>
      </div>
    </div>
  )
}
