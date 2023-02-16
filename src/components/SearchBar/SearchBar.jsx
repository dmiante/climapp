import { useCallback, useEffect, useRef, useState } from 'react'
import styles from './SearchBar.module.css'
import debounce from 'just-debounce-it'
import { useSearch } from '../../hooks/useSearch'

export default function SearchBar ({ onSubmit }) {
  const [display, setDisplay] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const [error, setError] = useState(null)
  const isFirstInput = useRef(true)
  const { options, listSuggestion } = useSearch()

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
      setDisplay(false)
    }
  }

  function handleClick (cities) {
    const city = cities.name
    const cityToString = `${cities.lat},${cities.lon}`
    setInputValue(city)
    onSubmit(cityToString)
    setDisplay(false)
  }

  return (
    <form onSubmit={event => event.preventDefault()}>
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
                      {`${option.name}, ${option.region}, ${option.country}`}
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
