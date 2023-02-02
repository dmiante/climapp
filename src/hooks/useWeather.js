import { useEffect, useState } from 'react'
import getWeather from '../services/getWeather'

export function useWeather ({ cityName } = { cityName: null }) {
  const [weather, setWeather] = useState([])
  const [loading, setLoading] = useState(false)

  const loadWeather = async (cityName) => {
    setLoading(true)
    const data = await getWeather(cityName)
    if (!data) return null
    setWeather(data)
    setLoading(false)
  }

  useEffect(() => {
    loadWeather()
  }, [cityName])

  return {
    weather,
    loading,
    loadWeather
  }
}
