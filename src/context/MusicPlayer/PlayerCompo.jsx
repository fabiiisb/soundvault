'use client'
import { useState } from 'react'
import playerContext from './playerContext'

const PlayerCompo = ({ children }) => {
  const [play, setPlay] = useState(false)
  const [replay, setReplay] = useState(false)
  const [random, setRandom] = useState(false)
  const [liked, setLiked] = useState(false)
  const [isMute, setMute] = useState(false)

  const handlePlay = () => {
    setPlay((v) => !v)
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
        play,
        handlePlay,
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
