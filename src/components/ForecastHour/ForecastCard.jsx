import useImage from '../../hooks/useImage'
import { WEATHER_CODES } from '../Const'
import styles from './ForecastCard.module.css'

function ForecastCard ({ condition, tempHour, time, isDay }) {
  const fileName = WEATHER_CODES[condition?.code]?.[
    ((
      condition?.code === 1000 ||
          condition?.code === 1030 ||
          condition?.code === 1135 ||
          condition?.code === 1147
    ) && isDay) === 0
      ? 1
      : 0
  ]
  const { image } = useImage(fileName)
  return (
    <div className={styles.abox}>
      <div className={styles.imgcontainer}>
        <img src={image} alt={condition.text} />
      </div>
      <div className={styles.textcontainer}>
        <h2>{`${tempHour}°C`}</h2>
        <p>{time?.slice(-5)}</p>
      </div>
    </div>
  )
}

export default ForecastCard
