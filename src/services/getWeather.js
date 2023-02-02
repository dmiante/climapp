/* eslint-disable camelcase */
const API_KEY = import.meta.env.VITE_WEATHER_API_KEY

const API_URL_FORECAST = 'https://weatherapi-com.p.rapidapi.com/forecast.json'
// const API_URL_SEARCH = 'https://weatherapi-com.p.rapidapi.com/search.json'
const API_HOST = 'weatherapi-com.p.rapidapi.com'

const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': `${API_KEY}`,
    'X-RapidAPI-Host': `${API_HOST}`
  }
}
async function getWeather (cityName = 'Santiago') {
  const url = `${API_URL_FORECAST}?q=${cityName}`
  const defaultUrl = `${API_URL_FORECAST}?q=Santiago`
  // console.log(url)

  const response = await fetch(cityName === null ? defaultUrl : url, options)
  const data = await response.json()

  if (!response.ok) {
    const error = new Error('An error occurred while fetching the data.')
    throw error
  }

  const { location, current, forecast } = data
  const { name, region, country, localtime } = location
  const {
    temp_c,
    is_day,
    condition,
    feelslike_c,
    wind_kph,
    wind_dir,
    humidity,
    precip_mm,
    uv
  } = current
  const { text, code } = condition

  const { forecastday } = forecast
  const [
    {
      day: { maxtemp_c: maxtemp, mintemp_c: mintemp },
      hour
    }
  ] = forecastday
  // console.log({ dateNow, day: { maxtemp, mintemp } })
  // console.log(forecastday[0].hour.map(el => { return el.time }))
  // console.log(forecastday)

  return {
    name,
    region,
    country,
    localtime,
    tempNow: temp_c,
    isDay: is_day,
    feelsLike: feelslike_c,
    windKph: wind_kph,
    windDir: wind_dir,
    humidity,
    precipMM: precip_mm,
    conditionText: text,
    uv,
    code,
    maxtemp,
    mintemp,
    hour
  }
}
export default getWeather
