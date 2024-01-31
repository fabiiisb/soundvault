'use client'
import React, { useState, useContext } from 'react'
import { BtnPrevSong, BtnNextSong, BtnPlaySong, BtnReplaySong, BtnRandomSong, BtnLikeSong, BtnVolume } from '@/components/Player/miniComp/PlayerBtns'
import ProgressBar from './miniComp/ProgressBar'
import playerContext from '@/context/MusicPlayer/playerContext'

const MusicNav = () => {
  const [replay, setReplay] = useState(false)
  const [random, setRandom] = useState(false)
  const [liked, setLiked] = useState(false)
  const [isMute, setMute] = useState(false)

  const { urlSong, activeSong } = useContext(playerContext)

  return (
    <nav className='bg-content1 text-white w-full fixed bottom-0 left-0 z-10 shadow-medium'>
      <div className='block sm:flex justify-center max-w-[1024px] mx-auto py-2 px-[24px]'>
        <div className='flex justify-center sm:justify-start'>
          <BtnLikeSong liked={liked} setLiked={setLiked} />
          <BtnRandomSong
            random={random}
            setRandom={setRandom}
            replay={replay}
            setReplay={setReplay}
          />
          <BtnPrevSong />
          <BtnPlaySong
            songId={activeSong}
            songUrl={urlSong}
          />
          <BtnNextSong />
          <BtnReplaySong
            replay={replay}
            setReplay={setReplay}
            random={random}
            setRandom={setRandom}
          />
          <BtnVolume isMute={isMute} setMute={setMute} />
        </div>
        <div className='w-full sm:pl-10'>
          <ProgressBar />
        </div>
      </div>
    </nav>
  )
}

export default MusicNav
