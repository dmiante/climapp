import { useState } from 'react'

export default function SearchBar ({ onNewCity }) {
  const [inputValue, setInputValue] = useState('')

  function handleSubmit (e) {
    e.preventDefault()
    onNewCity(inputValue)
    // console.log(inputValue)
  }

  function handleChange (e) {
    setInputValue(e.target.value)
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type='text'
        placeholder='Enter a city 🏙️'
        value={inputValue}
        onChange={handleChange}
      />
      <button>Search</button>
    </form>
  )
}
