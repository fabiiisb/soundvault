'use client'
import { useState, useRef, useEffect } from 'react'
import playerContext from './playerContext'

const PlayerCompo = ({ children }) => {
  const [songArray, setSongArray] = useState([])
  const [actualSongIndex, setActualSongIndex] = useState(-1)
  const [activeSong, setActiveSong] = useState(undefined)
  const [isReproducing, setIsReproducing] = useState(false)
  const [urlSong, setUrlSong] = useState('')
  const [songName, setSongName] = useState('')
  const [songDuration, setSongDuration] = useState('')
  const [progressBarValue, setProgressBarValue] = useState(0)
  const [isMute, setMute] = useState(false)
  const [volume, setVolume] = useState(1)
  const [oldVolume, setOldVolume] = useState()
  const [replay, setReplay] = useState(false)
  const [random, setRandom] = useState(false)
  const [liked, setLiked] = useState(false)

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

  const handlePlaySong = (songUrl, songId, songName, songList) => {
    handlePauseSong()
    play(songUrl)

    if (activeSong !== songId) audioRef.current = new Audio(songUrl)

    setActiveSong(songId)
    setIsReproducing(true)
    setSongName(songName)

    if (activeSong !== songId) getTotalDuration(songUrl)

    if (songList !== undefined) {
      const result = findActualSongIndex(songList, songId)
      setActualSongIndex(result)
      setSongArray(songList)
    }
  }

  const handlePauseSong = () => {
    pause()
  }

  const handleResetSong = () => {
    audioRef.current.currentTime = 0
  }

  const stopCurrentSong = () => {
    pause()
    audioRef.current.currentTime = 0
    handleNextSong()
  }

  // next song
  const handleNextSong = () => {
    nextSong()
  }

  const findActualSongIndex = (array, id) => {
    const result = array.findIndex(song => song.songId === id)
    return result
  }

  const nextSong = () => {
    if (actualSongIndex + 1 < songArray.length) {
      const nextSongIndex = actualSongIndex + 1
      const nextSong = songArray[nextSongIndex]

      setActualSongIndex(nextSongIndex)

      handlePlaySong(nextSong.songUrl, nextSong.songId, nextSong.songName, songArray)
    }
  }

  // prev song
  const handlePrevSong = () => {
    prevSong()
  }

  const prevSong = () => {
    if (actualSongIndex > 0) {
      const nextSongIndex = actualSongIndex - 1
      const nextSong = songArray[nextSongIndex]

      console.log()

      handlePlaySong(nextSong.songUrl, nextSong.songId, nextSong.songName, songArray)
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
        liked,
        handleLike
      }}
    >
      {children}
    </playerContext.Provider>
  )
}

export default PlayerCompo
