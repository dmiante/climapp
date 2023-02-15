import { useEffect, useRef, useState } from 'react'
import { getWeather } from '../services/getWeather'

export function useWeather ({ cityName } = { cityName: null }) {
  const [weather, setWeather] = useState([])
  const [loading, setLoading] = useState(false)
  const previousCityName = useRef(cityName)

  const loadWeather = async (cityName) => {
    if (cityName === previousCityName.current) return
    setLoading(true)
    previousCityName.current = cityName
    const data = await getWeather(cityName)
    if (!data) return null
    // console.log(data)
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
