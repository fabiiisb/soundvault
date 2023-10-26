'use client'
import React, { useState } from 'react'
import { BtnPrevSong, BtnNextSong, BtnPlaySong, BtnReplaySong, BtnRandomSong, BtnLikeSong } from '@/components/MusicPlayer/miniComponents/PlayerButtons.jsx'
const MusicPlayer = () => {
  const [play, setPlay] = useState(false)
  const [replay, setReplay] = useState(false)
  const [random, setRandom] = useState(false)
  const [liked, setLiked] = useState(false)

  return (
    <nav className='bg-content1 text-white w-full fixed bottom-0 left-0 z-10 shadow-medium'>
      <div className='max-w-[1024px] mx-auto py-2 px-[24px]'>
        <div className='flex justify-center items-center'>
          <BtnRandomSong
            random={random}
            setRandom={setRandom}
            replay={replay}
            setReplay={setReplay}
          />
          <BtnPrevSong />
          <BtnPlaySong play={play} setPlay={setPlay} />
          <BtnNextSong />
          <BtnReplaySong
            replay={replay}
            setReplay={setReplay}
            random={random}
            setRandom={setRandom}
          />
          <BtnLikeSong liked={liked} setLiked={setLiked}/>
        </div>

      </div>
    </nav>
  )
}

export default MusicPlayer
