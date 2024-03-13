'use client'
import { useState, useRef, useEffect } from 'react'
import playerContext from './playerContext'

const PlayerCompo = ({ children }) => {
  const [songArray, setSongArray] = useState([])
  const [randomSongArray, setRandomSongArray] = useState([])
  const [actualSongIndex, setActualSongIndex] = useState(-1)
  const [activeSong, setActiveSong] = useState(undefined)
  const [isReproducing, setIsReproducing] = useState(false)
  const [urlSong, setUrlSong] = useState('')
  const [songName, setSongName] = useState('')
  const [songDuration, setSongDuration] = useState('')
  const [progressBarValue, setProgressBarValue] = useState(0)
  const [isMute, setMute] = useState(false)
  const [volume, setVolume] = useState(0.02)
  const [oldVolume, setOldVolume] = useState(1)
  const [replay, setReplay] = useState(false)
  const [random, setRandom] = useState(false)

  const audioRef = useRef()

  // useffect play
  useEffect(() => {
    audioRef.current = new Audio()
  }, [])

  useEffect(() => {
    audioRef.current.addEventListener('ended', stopCurrentSong)

    return () => {
      audioRef.current.removeEventListener('ended', stopCurrentSong)
    }
  })

  // useEffect(() => {
  //   console.log(songArray)
  // }, [songArray])

  // useffect progress bar
  useEffect(() => {
    audioRef.current.addEventListener('timeupdate', updateProgressBar)

    return () => {
      audioRef.current.removeEventListener('timeupdate', updateProgressBar)
    }
  })

  // useffect volume
  useEffect(() => {
    audioRef.current.volume = volume
  }, [volume, urlSong])

  useEffect(() => {
    if (volume === 0) {
      setMute(true)
    } else {
      setMute(false)
    }
  }, [volume])

  // play button
  const play = async (songUrl) => {
    await setUrlSong(songUrl)
    audioRef.current.play()
  }

  const pause = () => {
    audioRef.current.pause()
    setIsReproducing(false)
  }

  const handlePlaySong = async (songUrl, songId, songName, songList) => {
    handlePauseSong()
    play(songUrl)

    if (activeSong !== songId) {
      audioRef.current = new Audio(songUrl)
      getTotalDuration(songUrl)
    }

    setActiveSong(songId)
    setIsReproducing(true)
    setSongName(songName)

    if (songList !== undefined) {
      const result = findActualSongIndex(songList, songId)
      setActualSongIndex(result)

      if (!random || !songArray.length) setSongArray(songList)

      if (random === false || !randomSongArray.length) randomizeSongArray(songList, songId)
    }
  }

  const handlePauseSong = () => {
    pause()
  }

  const handleResetSong = () => {
    audioRef.current.currentTime = 0
  }

  const stopCurrentSong = () => {
    if (replay === true) {
      audioRef.current.currentTime = 0
      audioRef.current.play()
    } else {
      pause()
      audioRef.current.currentTime = 0
      handleNextSong()
    }
  }

  const findActualSongIndex = (array, id) => {
    const result = array.findIndex(song => song.songId === id)
    return result
  }

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]]
    }
    return array
  }

  const randomizeSongArray = async (array, id) => {
    const newArray = [...array]
    const randomArray = await shuffleArray(newArray)

    const initialSong = newArray.find(song => song.songId === id)
    const filterRandomArray = randomArray.filter(song => song.songId !== id)
    filterRandomArray.unshift(initialSong)

    setRandomSongArray(filterRandomArray)
  }

  // next song
  const handleNextSong = () => {
    if (random === true) {
      nextRandomSong()
    } else {
      nextSong()
    }
  }

  const nextSong = () => {
    if (actualSongIndex + 1 < songArray.length) {
      const nextSongIndex = actualSongIndex + 1
      const nextSong = songArray[nextSongIndex]

      setActualSongIndex(nextSongIndex)

      handlePlaySong(nextSong.songUrl, nextSong.songId, nextSong.songName, songArray)
    }
  }

  const nextRandomSong = () => {
    if (actualSongIndex + 1 < randomSongArray.length) {
      const nextSongIndex = actualSongIndex + 1
      const nextSong = randomSongArray[nextSongIndex]

      handlePlaySong(nextSong.songUrl, nextSong.songId, nextSong.songName, randomSongArray)
    }
  }

  const handleRandom = () => {
    if (replay) setReplay((v) => !v)

    setRandom((v) => !v)

    if (random === false) {
      const result = findActualSongIndex(randomSongArray, activeSong)
      setActualSongIndex(result)
    } else {
      const result = findActualSongIndex(songArray, activeSong)
      setActualSongIndex(result)
    }
  }

  // prev song
  const handlePrevSong = () => {
    if (random === true) {
      prevRandomSong()
    } else {
      prevSong()
    }
  }

  const prevSong = () => {
    if (actualSongIndex > 0) {
      const nextSongIndex = actualSongIndex - 1
      const nextSong = songArray[nextSongIndex]

      handlePlaySong(nextSong.songUrl, nextSong.songId, nextSong.songName, songArray)
    }
  }

  const prevRandomSong = () => {
    if (actualSongIndex > 0) {
      const nextSongIndex = actualSongIndex - 1
      const nextSong = randomSongArray[nextSongIndex]

      handlePlaySong(nextSong.songUrl, nextSong.songId, nextSong.songName, randomSongArray)
    }
  }

  // progress bar
  const getTotalDuration = async (songUrl) => {
    const audioElement = new Audio(songUrl)

    await new Promise((resolve) => {
      audioElement.addEventListener('loadedmetadata', () => {
        resolve()
      })
      audioElement.load()
    })

    const durationInSeconds = audioElement.duration

    setSongDuration(durationInSeconds)
  }

  const updateProgressBar = () => {
    setProgressBarValue(audioRef.current.currentTime)
  }

  const handleSliderChange = (value) => {
    setProgressBarValue(value)

    audioRef.current.currentTime = value
  }

  // volume
  const handleMute = () => {
    if (isMute) {
      setVolume(oldVolume)
    } else {
      setOldVolume(volume)
      setVolume(0)
    }

    setMute((prevMute) => !prevMute)
  }

  const handleSetVolume = (value) => {
    setVolume(value)
  }

  const handleReplay = () => {
    if (random) setRandom((v) => !v)

    if (random === false) {
      const result = findActualSongIndex(randomSongArray, activeSong)
      setActualSongIndex(result)
    } else {
      const result = findActualSongIndex(songArray, activeSong)
      setActualSongIndex(result)
    }

    setReplay((v) => !v)
  }

  return (
    <playerContext.Provider
      value={{
        handlePlaySong,
        handlePauseSong,
        isReproducing,
        activeSong,
        urlSong,
        songName,
        songDuration,
        handleNextSong,
        handlePrevSong,
        handleResetSong,
        progressBarValue,
        setProgressBarValue,
        handleSliderChange,
        isMute,
        handleMute,
        volume,
        setVolume,
        handleSetVolume,
        replay,
        handleReplay,
        random,
        handleRandom,
        randomizeSongArray,
        setActualSongIndex

      }}
    >
      {children}
    </playerContext.Provider>
  )
}

export default PlayerCompo
