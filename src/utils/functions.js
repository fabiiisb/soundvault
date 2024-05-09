export const formatToMinutes = (duration) => {
  const minutes = Math.floor(duration / 60)
  const seconds = Math.round(duration % 60)

  const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`
  const formattedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`

  return `${formattedMinutes}:${formattedSeconds}`
}

export const getDuration = async (src) => {
  const audio = new Audio(src)
  return new Promise((resolve) => {
    audio.addEventListener('loadedmetadata', () => {
      resolve(formatToMinutes(audio.duration))
    })
  })
}

export const urlToFile = async (url) => {
  const response = await fetch(url)
  const blob = await response.blob()
  const file = new File([blob], 'file', { type: blob.type })

  return file
}

export const fileToBuffer = async (file) => {
  const bytes = await file.arrayBuffer()
  const bufferFile = Buffer.from(bytes)

  return bufferFile
}
