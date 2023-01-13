import { useEffect, useState } from 'react'

export function useImage (fileName) {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null) // Handles the undefined filename when starts the app
  const [image, setImage] = useState(null)

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await import(`../assets/${fileName}.png`)
        // console.log(fileName)
        setImage(response.default)
      } catch (err) {
        setError(err)
      } finally {
        setLoading(false)
      }
    }
    fetchImage()
  }, [fileName])

  return {
    image,
    loading,
    error
  }
}
