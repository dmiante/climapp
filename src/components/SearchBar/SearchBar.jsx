import { useCallback, useEffect, useRef, useState } from 'react'
import { getSearch } from '../../services/getWeather'
import styles from './SearchBar.module.css'
import debounce from 'just-debounce-it'

export default function SearchBar ({ onSubmit }) {
  const [options, setOptions] = useState([])
  const [display, setDisplay] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const [error, setError] = useState(null)
  const isFirstInput = useRef(true)

  useEffect(() => {
    if (isFirstInput.current) {
      isFirstInput.current = inputValue === ''
      return
    }

    if (inputValue === '') {
      setError('Cannot leave this field empty')
      return
    }

    if (inputValue.match(/^\d+$/)) {
      setError('Can\'t search for a city with numbers')
      return
    }

    if (inputValue.length < 3) {
      setError('Search must have at least 3 characters')
      return
    }

    setError(null)
  }, [inputValue])

  const listSuggestion = async (cityName) => {
    const data = await getSearch(cityName)
    if (!data) return null
    setOptions(data.data)
  }

  const debouncedGetSuggestion = useCallback(
    debounce(inputValue => {
      listSuggestion(inputValue)
    }, 300)
    , []
  )

  function handleChange (event) {
    const value = event.target.value
    if (value.startsWith(' ') || value.match(/^\d+$/)) return
    setInputValue(value)
    if (inputValue.length > 3) {
      debouncedGetSuggestion(inputValue) // Se ejecuta cuando escribo 3 o mas palabras
      setDisplay(true)
    } else {
      setOptions([])
      setDisplay(false)
    }
  }

  function handleClick (cities) {
    const city = cities.name
    // console.log(city)
    setInputValue(city)
    onSubmit(city)
    setOptions([])
    setDisplay(false)
  }

  return (
    <form>
      <input
        id='ct'
        type='text'
        value={inputValue}
        onChange={handleChange}
        className={styles.inputCity}
        required
        autoComplete='off'
      />
      <label htmlFor='ct'><span>Search a city</span></label>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div className={styles.resultBox}>
        <ul>
          {display
            ? (
              <>
                {options.map(option => {
                  return (
                    <li
                      key={option.id}
                      className={styles.autocomplete}
                      onClick={() => handleClick(option)}
                    >
                      {option.name}
                    </li>
                  )
                })}
              </>
              )
            : null}
        </ul>
      </div>
    </form>
  )
}
