export const formatToMinutes = (duration) => {
  const minutes = Math.floor(duration / 60)
  const seconds = Math.round(duration % 60)

  const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`
  const formattedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`

  return `${formattedMinutes}:${formattedSeconds}`
}
