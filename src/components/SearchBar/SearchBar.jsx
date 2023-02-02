import { useState } from 'react'
import styles from './SearchBar.module.css'

export default function SearchBar ({ onSubmit }) {
  const [inputValue, setInputValue] = useState('')

  function handleSubmit (e) {
    e.preventDefault()
    onSubmit({ inputValue })
    // console.log(inputValue)
    setInputValue('')
  }

  function handleChange (e) {
    setInputValue(e.target.value)
  }

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
    </form>
  )
}
