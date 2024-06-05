'use client'
import { useContext } from 'react'
import { BtnPrevSong, BtnNextSong, BtnPlaySong, BtnReplaySong, BtnRandomSong, BtnLikeSong, VolumeControl, BtnAddToPlaylist } from '@/components/Player/PlayerBtns'
import ProgressBar from './miniComp/ProgressBar'
import playerContext from '@/context/MusicPlayer/playerContext'
import Link from 'next/link'

const MusicNav = () => {
  const { urlSong, activeSong, songName } = useContext(playerContext)

  if (activeSong === undefined) {
    return null
  }

  return (
    <nav className='bg-content1 text-white w-full fixed bottom-0 left-0 z-10 shadow-medium'>
      <div className='block sm:flex justify-center max-w-[1024px] mx-auto py-2 px-[24px]'>
        <Link
          className='block text-tiny text-foreground/80 tracking-wider hover:text-foreground text-center line-clamp-1 sm:hidden pb-1'
          href={`/song/${activeSong}`}
          title={songName}
        >
          {songName || 'Undefined'}
        </Link>
        <div className='flex justify-center items-center sm:justify-start'>

          <BtnLikeSong songId={activeSong} />

          <BtnRandomSong />

          <BtnPrevSong />

          <BtnPlaySong
            songId={activeSong}
            songUrl={urlSong}
            songName={songName}
          />

          <BtnNextSong />

          <BtnReplaySong />

          <BtnAddToPlaylist songId={activeSong} />
        </div>
        <div className='w-full sm:pl-8 sm:pr-8'>
          <ProgressBar />
        </div>

        <div className='w-[30%] hidden sm:flex'>
          <VolumeControl />
        </div>
      </div>
    </nav>
  )
}

export default MusicNav
