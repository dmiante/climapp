import { useCallback, useEffect, useRef, useState } from 'react'
import { getSearch } from '../../services/getWeather'
import styles from './SearchBar.module.css'
import debounce from 'just-debounce-it'

// import { useWeather } from '../../hooks/useWeather'

export default function SearchBar ({ onSubmit }) {
  const [options, setOptions] = useState([])
  const [display, setDisplay] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const [error, setError] = useState(null)
  const isFirstInput = useRef(true)

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

  function handleSubmit (e) {
    e.preventDefault()
    onSubmit({ inputValue })
    // setInputValue('')
  }

  function handleChange (e) {
    const value = e.target.value
    setInputValue(value)
    if (value.length > 3) {
      debouncedGetSuggestion(value)
      setOptions([])
      setDisplay(true)
    } else {
      setDisplay(false)
    }
  }

  function handleClick (e) {
    const text = e.target.innerText
    // console.log(text)
    setOptions([])
    setInputValue(text) // solo para dejar lo seleccionado en el input
    setDisplay(false)
  }

  useEffect(() => {
    console.log(inputValue)

    if (isFirstInput.current) {
      isFirstInput.current = inputValue === ''
      return
    }

    if (inputValue === '') {
      setError('No se puede dejar este campo vacio')
      return
    }

    setError(null)
  }, [inputValue])

  return (
    <form onSubmit={handleSubmit}>
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
                      onClick={handleClick}
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
