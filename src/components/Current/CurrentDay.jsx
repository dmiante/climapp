import styles from './CurrentDay.module.css'
import Location from '../../assets/location.svg'
import Humidity from '../../assets/Humidity.png'
import Thermometer from '../../assets/thermometer.png'
import Wind from '../../assets/wind.png'

const MONTHS = {
  '01': 'January',
  '02': 'February',
  '03': 'March',
  '04': 'April',
  '05': 'May',
  '06': 'June',
  '07': 'July',
  '08': 'August',
  '09': 'September',
  10: 'October',
  11: 'November',
  12: 'December'
}
export default function CurrentDay ({ weather }) {
  const localtime = weather.localtime
  const time = localtime?.slice(-5)
  const year = localtime?.slice(0, 4)
  const month = localtime?.slice(5, 7)
  const day = localtime?.slice(8, 10)
  const date = ` ${day} ${MONTHS[month]} ${year}`

  return (
    <div className={styles.currentDay}>
      <section>
        <div className={styles.location}>
          <img src={Location} alt='location' className={styles.iconLocation} />
          <h3 className={styles.city}>{`${weather.name}, ${weather.country}`}</h3>
        </div>
        <h3 className={styles.localtime}>{`${time} - ${date}`}</h3>
        <img className={styles.icon} src={weather.icon} />
        <h1 className={styles.temperature}>{`${weather.tempNow}°`}</h1>
        <h2 className={styles.condition}>{weather.conditionText}</h2>
      </section>
      <section>
        <img src={Thermometer} alt='location' className={styles.iconThermometer} />
        <h4>Feels Like</h4>
        <h2>{`${weather.feelsLike}°`}</h2>
        <img src={Humidity} alt='location' className={styles.iconHumidity} />
        <h4>Humidity</h4>
        <h2>{`${weather.humidity} %`}</h2>
        <img src={Wind} alt='location' className={styles.iconWind} />
        <h4>Wind Speed & Direction</h4>
        <h2>{`${weather.windKph} km/h - ${weather.windDir}`}</h2>
        {/* <h4>Precipitation</h4>
        <h2>{`${weather.precipMM} mm`}</h2>
        <h4>UV Index</h4>
        <h2>{weather.uv}</h2> */}
      </section>
    </div>
  )
}
