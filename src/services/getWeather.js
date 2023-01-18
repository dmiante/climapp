/* eslint-disable camelcase */
const API_URL = import.meta.env.VITE_WEATHER_API_URL
const API_KEY = import.meta.env.VITE_WEATHER_API_KEY
const API_HOST = import.meta.env.VITE_WEATHER_API_HOST

const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': `${API_KEY}`,
    'X-RapidAPI-Host': `${API_HOST}`
  }
}
async function getWeather (cityName = 'Santiago') {
  const url = `${API_URL}?q=${cityName}`
  const defaultUrl = `${API_URL}?q=Santiago`
  console.log(url)

  const response = await fetch(cityName === null ? defaultUrl : url, options)
  const data = await response.json()

  const { location, current } = data
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

  // const { forecastday } = forecast
  // const [
  //   { date: date1, day: { maxtemp_c: maxtemp1, mintemp_c: mintemp1 } },
  //   { date: date2, day: { maxtemp_c: maxtemp2, mintemp_c: mintemp2 } },
  //   { date: date3, day: { maxtemp_c: maxtemp3, mintemp_c: mintemp3 } }
  // ] = forecastday

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
    code
  }
}
export default getWeather
