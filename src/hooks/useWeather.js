import { useEffect, useState } from 'react'
import getWeather from '../services/getWeather'

export default function useWeather (cityName) {
  const [weather, setWeather] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    getWeather(cityName)
      .then((data) => {
        setWeather(data)
        setLoading(false)
      })
  }, [cityName])

  return {
    weather,
    setWeather,
    loading,
    setLoading
  }
}
