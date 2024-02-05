'use client'
import { useState, useRef, useEffect } from 'react'
import playerContext from './playerContext'

const PlayerCompo = ({ children }) => {
  const [isReproducing, setIsReproducing] = useState(false)
  const [activeSong, setActiveSong] = useState(undefined)
  const [urlSong, setUrlSong] = useState('')
  const [songDuration, setSongDuration] = useState('')
  const [progressBarValue, setProgressBarValue] = useState(0)
  const [isMute, setMute] = useState(false)
  const [volume, setVolume] = useState(1)
  const [oldVolume, setOldVolume] = useState()
  const [replay, setReplay] = useState(false)
  const [random, setRandom] = useState(false)
  const [liked, setLiked] = useState(false)

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
    audioRef.current.addEventListener('timeupdate', updateProgressBar)

    return () => {
      audioRef.current.removeEventListener('timeupdate', updateProgressBar)
    }
  })

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
    await audioRef.current.play()
  }

  const pause = () => {
    audioRef.current.pause()
  }

  const handlePlaySong = async (songUrl, songId) => {
    play(songUrl)
    stopCurrentSong(activeSong)
    setActiveSong(songId)
    setIsReproducing(true)

    if (activeSong !== songId) getTotalDuration(songUrl)
  }

  const handlePauseSong = async (songId) => {
    pause()
    setActiveSong(songId)
    setIsReproducing(false)
  }

  const handleResetSong = async () => {
    pause()
    setIsReproducing(false)
    audioRef.current.currentTime = 0
  }

  const stopCurrentSong = (songId) => {
    if (songId === activeSong) {
      handlePauseSong()
    } else {
      handleResetSong()
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

  // progress bar

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
      // Si estaba silenciado
      setVolume(oldVolume)
    } else {
      // Si no estaba silenciado
      setOldVolume(volume)
      setVolume(0)
    }

    setMute((prevMute) => !prevMute)
  }

  const handleSetVolume = (value) => {
    setVolume(value)
  }

  //

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
        isMute,
        handleMute,
        volume,
        setVolume,
        handleSetVolume,
        replay,
        handleReplay,
        random,
        handleRandom,
        liked,
        handleLike
      }}
    >
      {children}
    </playerContext.Provider>
  )
}

export default PlayerCompo
