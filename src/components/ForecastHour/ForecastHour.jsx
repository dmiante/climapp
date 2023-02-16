import { useWeather } from '../../hooks/useWeather'
import ForecastCard from './ForecastCard'
import styles from './ForecastHour.module.css'

function ForecastHour () {
  const { weather } = useWeather()
  const { hour } = weather
  return (
    <div className={styles.fhourly}>
      {hour?.map((hourly) => {
        return (
          <ForecastCard
            key={hourly.time_epoch}
            condition={hourly.condition}
            isDay={hourly.is_day}
            tempHour={hourly.temp_c}
            time={hourly.time}
          />
        )
      })}
    </div>
  )
}

export default ForecastHour
