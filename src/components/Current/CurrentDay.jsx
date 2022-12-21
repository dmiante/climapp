
export default function CurrentDay ({ weather }) {
  return (
    <>
      <h2>{`${weather.name}, ${weather.region}, ${weather.country}`}</h2>
      <h1>{`${weather.tempNow} ℃`} </h1>
    </>
  )
}
