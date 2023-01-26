import { useEffect, useState } from 'react'

export default function useImage (fileName) {
  const [loadingImage, setLoadingImage] = useState(false)
  const [error, setError] = useState(null) // Handles the undefined filename when starts the app
  const [image, setImage] = useState(null)
  const [bgImage, setBgImage] = useState(null)

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const responseImage = await import(`../assets/${fileName}.png`)
        const responseBg = await import(`../assets/bg${fileName}.png`)
        setImage(responseImage.default)
        setBgImage(responseBg.default)
      } catch (err) {
        setError(err)
      } finally {
        setLoadingImage(true)
      }
    }
    fetchImage()
  }, [fileName])

  return {
    image,
    bgImage,
    loadingImage,
    error
  }
}
