import { useState } from 'react'
import { getSearch } from '../services/getWeather'

export function useSearch () {
  const [options, setOptions] = useState([])
  // const [loading, setLoading] = useState(false)

  const listSuggestion = async (cityName) => {
    // setLoading(true)
    const suggestion = await getSearch(cityName)
    if (!suggestion) return null
    const { data } = suggestion
    const dataLimit = data.slice(0, 5) // show only 5 results
    setOptions(dataLimit)
    // setLoading(false)
  }

  return {
    options,
    listSuggestion
  }
}
