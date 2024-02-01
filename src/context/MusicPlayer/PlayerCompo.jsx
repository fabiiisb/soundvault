'use client'
import { useState, useRef, useEffect } from 'react'
import playerContext from './playerContext'

const PlayerCompo = ({ children }) => {
  const [activeSong, setActiveSong] = useState(undefined)
  const [urlSong, setUrlSong] = useState('')
  const [isReproducing, setIsReproducing] = useState(false)
  const [replay, setReplay] = useState(false)
  const [random, setRandom] = useState(false)
  const [liked, setLiked] = useState(false)
  const [isMute, setMute] = useState(false)

  const audioRef = useRef()

  useEffect(() => {
    audioRef.current = new Audio(urlSong)
  }, [urlSong])

  useEffect(() => {
    manageAudio()
  })

  const manageAudio = () => {
    audioRef.current.addEventListener('ended', stopCurrentSong)

    return () => {
      audioRef.current.removeEventListener('ended', stopCurrentSong)
    }
  }

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
