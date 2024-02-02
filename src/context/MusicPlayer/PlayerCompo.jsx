'use client'
import { useState, useRef, useEffect } from 'react'
import playerContext from './playerContext'

const PlayerCompo = ({ children }) => {
  const [isReproducing, setIsReproducing] = useState(false)
  const [activeSong, setActiveSong] = useState(undefined)
  const [urlSong, setUrlSong] = useState('')
  const [songDuration, setSongDuration] = useState('')
  const [progressBarValue, setProgressBarValue] = useState(0)
  const [replay, setReplay] = useState(false)
  const [random, setRandom] = useState(false)
  const [liked, setLiked] = useState(false)
  const [isMute, setMute] = useState(false)

  const audioRef = useRef()

  useEffect(() => {
    audioRef.current = new Audio(urlSong)
  }, [urlSong])

  useEffect(() => {
    audioRef.current.addEventListener('ended', stopCurrentSong)

    return () => {
      audioRef.current.removeEventListener('ended', stopCurrentSong)
    }
  })

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.addEventListener('timeupdate', updateProgressBar)

      return () => {
        audioRef.current.removeEventListener('timeupdate', updateProgressBar)
      }
    }
  })

  const Play = async (songUrl) => {
    await setUrlSong(songUrl)
    await audioRef.current.play()
  }

  const Pause = () => {
    audioRef.current.pause()
  }

  const handlePlaySong = async (songUrl, songId) => {
    Play(songUrl)
    stopCurrentSong(activeSong)
    setActiveSong(songId)
    setIsReproducing(true)

    if (activeSong !== songId) getTotalDuration(songUrl)
  }

  const handlePauseSong = async (songId) => {
    Pause()
    setActiveSong(songId)
    setIsReproducing(false)
  }

  const stopCurrentSong = (songId) => {
    if (songId === activeSong) {
      handlePauseSong()
    } else {
      handlePauseSong()
      audioRef.current.currentTime = 0
    }
  }

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
    if (audioRef.current) {
      setProgressBarValue(audioRef.current.currentTime)
    }
  }

  const handleSliderChange = (value) => {
    setProgressBarValue(value)

    if (audioRef.current) {
      audioRef.current.currentTime = value
    }
  }

  const handleRandom = () => {
    if (replay) setReplay((v) => !v)
    setRandom((v) => !v)
  }

  const handleReplay = () => {
    if (random) setRandom((v) => !v)
    setReplay((v) => !v)
  }

  const handleLike = () => {
    setLiked((v) => !v)
  }

  const handleMute = () => {
    setMute((v) => !v)
  }

  return (
    <playerContext.Provider
      value={{
        handlePlaySong,
        handlePauseSong,
        stopCurrentSong,
        activeSong,
        urlSong,
        setActiveSong,
        isReproducing,
        songDuration,
        progressBarValue,
        setProgressBarValue,
        handleSliderChange,
        replay,
        handleReplay,
        random,
        handleRandom,
        liked,
        handleLike,
        isMute,
        handleMute
      }}
    >
      {children}
    </playerContext.Provider>
  )
}

export default PlayerCompo
