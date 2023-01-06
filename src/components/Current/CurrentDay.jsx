import { useState, useEffect } from 'react'
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
export const WEATHER_CODES = {
  1000: ['Sunny', 'Moon'],
  1003: ['PartlyCloudy'],
  1006: ['Cloudy'],
  1009: ['Cloudy'],
  1030: ['Haze', 'Fog'],
  1063: ['RainCloud'],
  1066: ['Snow'],
  1069: ['Sleet'],
  1072: ['IceSnow'],
  1087: ['CloudThunder'],
  1114: ['Snow'],
  1117: ['Blizzard'],
  1135: ['Haze', 'Fog'],
  1147: ['Haze', 'Fog'],
  1150: ['LightRain'],
  1153: ['LightRain'],
  1168: ['IceSnow'],
  1171: ['IceSnow'],
  1180: ['LightRain'],
  1183: ['LightRain'],
  1186: ['Rain'],
  1189: ['Rain'],
  1192: ['HeavyRain'],
  1195: ['HeavyRain'],
  1198: ['Hail'],
  1201: ['Hail'],
  1204: ['Sleet'],
  1207: ['Sleet'],
  1210: ['Snow'],
  1213: ['Snow'],
  1216: ['Snow'],
  1219: ['Snow'],
  1222: ['Blizzard'],
  1225: ['Blizzard'],
  1237: ['Hail'],
  1240: ['LightRain'],
  1243: ['HeavyRain'],
  1246: ['HeavyRain'],
  1249: ['Sleet'],
  1252: ['Sleet'],
  1255: ['Snow'],
  1258: ['Blizzard'],
  1261: ['Hail'],
  1264: ['Hail'],
  1273: ['RainCloud'],
  1276: ['ThunderStorm'],
  1279: ['Snow'],
  1282: ['Blizzard']
}
export default function CurrentDay ({ weather }) {
  const localtime = weather.localtime
  const time = localtime?.slice(-5)
  const year = localtime?.slice(0, 4)
  const month = localtime?.slice(5, 7)
  const day = localtime?.slice(8, 10)
  const date = ` ${day} ${MONTHS[month]} ${year}`

  const fileName = WEATHER_CODES[weather?.code]?.[
    ((weather?.code === 1000 || weather?.code === 1030) && weather?.isDay) === 0 ? 1 : 0
  ]
  const [icon, setIcon] = useState('')

  useEffect(() => {
    const fetchImage = async () => {
      const response = await import('../../assets/ConditionIcons/' + fileName + '.png')
      setIcon(response.default)
    }
    fetchImage()
  }, [fileName])

  return (
    <div className={styles.currentDay}>
      <section>
        <div className={styles.location}>
          <img src={Location} alt='location' className={styles.iconLocation} />
          <h3 className={styles.city}>{`${weather.name}, ${weather.country}`}</h3>
        </div>
        <h3 className={styles.localtime}>{`${time} - ${date}`}</h3>
        <img className={styles.icon} src={icon} />
        <h1 className={styles.temperature}>{`${weather.tempNow}°`}</h1>
        <h2 className={styles.condition}>{weather.conditionText}</h2>
      </section>
      <section className={styles.detailDay}>
        <div className={styles.thermometer}>
          <img src={Thermometer} alt='location' className={styles.iconDetail} />
          <h4>Feels Like</h4>
          <h2>{`${weather.feelsLike}°`}</h2>
        </div>
        <div>
          <img src={Humidity} alt='location' className={styles.iconDetail} />
          <h4>Humidity</h4>
          <h2>{`${weather.humidity} %`}</h2>
        </div>
        <div>
          <img src={Wind} alt='location' className={styles.iconDetail} />
          <h4>Wind Speed & Direction</h4>
          <h2>{`${weather.windKph} km/h - ${weather.windDir}`}</h2>
        </div>
      </section>
    </div>
  )
}
