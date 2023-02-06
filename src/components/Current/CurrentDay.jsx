import { MONTHS, WEATHER_CODES } from '../Const.js'
import useImage from '../../hooks/useImage.js'

import styles from './CurrentDay.module.css'

import Location from '../../assets/location.svg'
import Humidity from '../../assets/Humidity.png'
import Thermometer from '../../assets/thermometer.png'
import Wind from '../../assets/wind.png'

export default function CurrentDay ({ weather }) {
  const localtime = weather?.localtime
  const time = localtime?.slice(-5)
  const year = localtime?.slice(0, 4)
  const month = localtime?.slice(5, 7)
  const day = localtime?.slice(8, 10)
  const date = ` ${day} ${MONTHS[month]} ${year}`

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
  const { image } = useImage(fileName)

  return (
    <div className={styles.currentDay}>
      <section>
        <div className={styles.location}>
          <img src={Location} alt='location' className={styles.iconLocation} />
          <h3 className={styles.city}>{`${weather?.name}, ${weather?.country}`}</h3>
        </div>
        <h3 className={styles.localtime}>{`${time} - ${date}`}</h3>
        <div className={styles.mainInfoTemp}>
          <img className={styles.icon} src={image} />
          <h2 className={styles.temperature}>{`${weather?.tempNow}°C`}</h2>
          <h2 className={styles.condition}>{weather?.conditionText}</h2>
        </div>
      </section>
      <section className={styles.detailDay}>
        <div>
          <img src={Thermometer} alt='location' className={styles.iconDetail} />
          <h4>Feels Like</h4>
          <h2>{`${weather?.feelsLike}°C`}</h2>
        </div>
        <div>
          <img src={Humidity} alt='location' className={styles.iconDetail} />
          <h4>Humidity</h4>
          <h2>{`${weather?.humidity} %`}</h2>
        </div>
        <div>
          <img src={Wind} alt='location' className={styles.iconDetail} />
          <h4>Wind Speed & Direction</h4>
          <h2>{`${weather?.windKph} km/h - ${weather?.windDir}`}</h2>
        </div>
      </section>
    </div>
  )
}
