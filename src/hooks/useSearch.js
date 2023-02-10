import { useState } from 'react'
import { getSearch } from '../services/getWeather'

export function useSearch ({ cityName }) {
  const [options, setOptions] = useState([])
  const [loading, setLoading] = useState(false)

  const listSuggestion = async () => {
    setLoading(true)
    const suggestions = await getSearch({ cityName })
    if (!suggestions) return null
    console.log(suggestions)
    setOptions(suggestions.data)
    setLoading(false)
  }

  // useEffect(() => {
  //   loadSearch()
  // }, [suggestion])

  return {
    options,
    loading,
    listSuggestion
  }
}
