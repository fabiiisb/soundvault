'use client'
import { RepeateOne, Previous, PauseCircle, PlayCircle, Next, Shuffle, Heart, VolumeHigh, VolumeCross, ArchiveAdd } from 'iconsax-react'
import { Button } from '@nextui-org/react'
import { useContext, useState, useEffect } from 'react'
import playerContext from '@/context/MusicPlayer/playerContext'
import VolumeBar from './miniComp/VolumeBar'

export const BtnPlaySong = ({ className, songId, songUrl, songName, songList }) => {
  const { handlePlaySong, handlePauseSong, activeSong, isReproducing, randomizeSongArray, random, setActualSongIndex } = useContext(playerContext)

  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    setIsPlaying(activeSong === songId && isReproducing === true)
  }, [activeSong, isReproducing, songId])

  const handlePlayButton = () => {
    if (activeSong === songId && isPlaying) {
      setIsPlaying(false)
      handlePauseSong()
    } else {
      setIsPlaying(true)
      handlePlaySong(songUrl, songId, songName, songList)

      if (random === true) {
        if (songList !== undefined) {
          setActualSongIndex(0)
          randomizeSongArray(songList, songId)
        }
      }
    }
  }

  return (
    <Button
      isIconOnly
      className={className}
      radius="full"
      variant="light"
      onClick={handlePlayButton}
    >
      {
        isPlaying
          ? <PauseCircle variant="Bold" size={100} />
          : <PlayCircle variant="Bold" size={100} />
      }
    </Button>
  )
}

export const BtnNextSong = () => {
  const { handleNextSong } = useContext(playerContext)
  return (
    <Button
      isIconOnly
      className="data-[hover]:bg-foreground/10 text-white/95"
      radius="full"
      variant="light"
      onClick={handleNextSong}
    >
      <Next
        variant="Bold"
      />
    </Button>
  )
}

export const BtnPrevSong = () => {
  const { handlePrevSong, handleResetSong, progressBarValue } = useContext(playerContext)

  const handleResetOrPrev = () => {
    if (progressBarValue < 2.5) {
      handlePrevSong()
    } else {
      handleResetSong()
    }
  }

  return (
    <Button
      isIconOnly
      className="data-[hover]:bg-foreground/10 text-white/95"
      radius="full"
      variant="light"
      onClick={handleResetOrPrev}
    >
      <Previous
        variant="Bold"
      />
    </Button>
  )
}

export const BtnRandomSong = ({ className }) => {
  const { random, handleRandom } = useContext(playerContext)

  return (
    <Button
      isIconOnly
      className={'data-[hover]:bg-foreground/10 ' + className}
      radius="full"
      variant="light"
      onClick={handleRandom}>
      <Shuffle
        className={random ? 'text-niceOrange-400' : 'text-foreground/80'}
      />
    </Button>
  )
}

export const BtnReplaySong = ({ className }) => {
  const { replay, handleReplay } = useContext(playerContext)

  return (
    <Button
      isIconOnly
      className={'data-[hover]:bg-foreground/10 ' + className}
      radius="full"
      variant="light"
      onClick={handleReplay}>
      <RepeateOne
        className={replay ? 'text-niceOrange-400' : 'text-foreground/80'}
      />
    </Button>
  )
}

export const BtnLikeSong = ({ className, size }) => {
  const { liked, handleLike } = useContext(playerContext)

  return (
    <Button
      isIconOnly
      className={'text-default-900/60 data-[hover]:bg-foreground/10 ' + className}
      radius="full"
      variant="light"
      onClick={handleLike}
    >
      <Heart
        variant={liked ? 'Bold' : 'Linear'}
        className={liked ? 'text-niceOrange-400' : 'text-inherit'}
        size={size}
      />
    </Button>
  )
}

export const VolumeControl = ({ className }) => {
  const { isMute, handleMute } = useContext(playerContext)

  return (
    <div className={'flex justify-center items-center w-[97%]' + className}>
      <Button
        isIconOnly
        className={'text-default-900/60 data-[hover]:bg-foreground/10 '}
        radius="full"
        variant="light"
        onClick={handleMute}>
        {isMute
          ? <VolumeCross className='text-niceOrange-400' />
          : <VolumeHigh />
        }
      </Button>

      <VolumeBar />
    </div>

  )
}

export const BtnAddToPlaylist = ({ className }) => {
  return (
    <Button
    isIconOnly
    className={'text-default-900/60 data-[hover]:bg-foreground/10 ' + className}
    radius="full"
    variant="light"
  >
    <ArchiveAdd />
  </Button>
  )
}
