import React, { useState } from 'react'
import { RepeateOne, Previous, PauseCircle, PlayCircle, Next, Shuffle, Heart } from 'iconsax-react'
import { Button } from '@nextui-org/react'

const PlayButtons = () => {
  const [replay, setReplay] = useState(false)
  const [random, setRandom] = useState(false)
  const [play, setPlay] = useState(false)

  return (
    <div className="flex w-full items-center justify-center">
      <BtnReplaySong replay={replay} setReplay={setReplay} random={random} setRandom={setRandom} />
      <BtnPrevSong />
      <BtnPlaySong play={play} setPlay={setPlay} />
      <BtnNextSong />
      <BtnRandomSong random={random} setRandom={setRandom} replay={replay} setReplay={setReplay} />
    </div>
  )
}

export const BtnNextSong = () => {
  return (
    <Button isIconOnly className="data-[hover]:bg-foreground/10" radius="full" variant="light">
      <Next variant="Bold" />
    </Button>
  )
}

export const BtnPrevSong = () => {
  return (
    <Button isIconOnly className="data-[hover]:bg-foreground/10" radius="full" variant="light">
      <Previous variant="Bold" />
    </Button>
  )
}

export const BtnPlaySong = ({ play, setPlay }) => {
  const handlePlay = () => {
    setPlay((v) => !v)
  }

  return (
    <Button
      isIconOnly
      className="w-auto h-auto data-[hover]:bg-foreground/10"
      radius="full"
      variant="light"
      onClick={handlePlay}
    >
      {play ? <PauseCircle variant="Bold" size={54} /> : <PlayCircle variant="Bold" size={54} />}
    </Button>
  )
}

export const BtnRandomSong = ({ random, setRandom, replay, setReplay }) => {
  const handleRandom = () => {
    if (replay) setReplay((v) => !v)
    setRandom((v) => !v)
  }

  return (
    <Button isIconOnly className="data-[hover]:bg-foreground/10" radius="full" variant="light" onClick={handleRandom}>
      <Shuffle className={random ? 'text-niceOrange-400' : 'text-foreground/80'} />
    </Button>
  )
}

export const BtnReplaySong = ({ replay, setReplay, random, setRandom }) => {
  const handleReplay = () => {
    if (random) setRandom((v) => !v)
    setReplay((v) => !v)
  }

  return (
    <Button isIconOnly className="data-[hover]:bg-foreground/10" radius="full" variant="light" onClick={handleReplay}>
      <RepeateOne className={replay ? 'text-niceOrange-400' : 'text-foreground/80'} />
    </Button>
  )
}

export const BtnLikeSong = ({ liked, setLiked }) => {
  <Button
    isIconOnly
    className="text-default-900/60 data-[hover]:bg-foreground/10 -translate-y-2 translate-x-2"
    radius="full"
    variant="light"
    onPress={() => setLiked((v) => !v)}
  >
    <Heart
      variant={liked ? 'Bold' : 'Linear'}
      className={liked ? 'text-niceOrange-400' : 'text-inherit'}
    />
  </Button>
}

export default PlayButtons
