'use client'
import { Card, CardBody } from '@nextui-org/react'
import { BtnLikeSong, BtnPlaySong } from '@/components/Player/PlayerBtns'
import Link from 'next/link'
import { useState } from 'react'

export const SongUl = ({ songList, gradientColor, deleteOnDislike, styles }) => {
  const [updatedSongList, setUpdatedSongList] = useState(songList)

  const removeSongFromList = (songId) => {
    if (deleteOnDislike) {
      const filteredList = updatedSongList.filter((song) => song.songId !== songId)

      setUpdatedSongList(filteredList)
    }
  }

  return (
    <div>
      <Card
        className={`flex relative gap-3 backdrop-blur-lg bg-content1/70  bg-gradient-to-r ${gradientColor} to-70% sm:to-40% ${styles} `}
      >
        {updatedSongList.map((song) => (
          <SongLi
            key={song.songId}
            song={song}
            songList={songList}
            removeSongFromList={removeSongFromList} />
        ))}
      </Card>
    </div>
  )
}

export const SongLi = ({ song, songList, removeSongFromList }) => {
  return (
    <CardBody
      className='group px-3 py-1 first:mt-2 last:mb-2 hover:bg-default-500/20 z-10'
    >
      <div className='flex justify-between '>
        <div className='flex items-center gap-2 justify-start'>
          <BtnPlaySong
            className={'text-foreground/80 hover:text-white'}
            songList={songList}
            songId={song.songId}
            songUrl={song.songUrl}
            songName={song.songName}
          />
          <div className='flex flex-col max-w-[120px] overflow-hidden'>
            <Link
              className='marquee text-small hover:text-foreground/80 text-white flex gap-4'
              href={`/song/${song.songId}`}
            >
              <p className='marquee__content min-w-full flex flex-shrink-0 font-semibold select-none'>
                {song.songName}
              </p>
              <p aria-hidden='true' className='marquee__content min-w-full flex flex-shrink-0 font-semibold'>
                {song.songName}
              </p>
            </Link>
            <Link
              className='text-tiny hover:text-foreground/80 no-underline hover:underline text-white/70 truncate select-none'
              href={`/user/${song.ownerUsername}`}
            >
              {song.ownerUsername}
            </Link>
          </div>
        </div>
        <div className='hidden items-center justify-end gap-2 ml-5 mini350:flex'>
          <BtnLikeSong
            songId={song.songId}
            className={'invisible group-hover:visible'}
            removeSongFromList={removeSongFromList}
          />
          <p className='text-small text-foreground/80 select-none'>
            {song.songDuration}
          </p>
        </div>
      </div>
    </CardBody>
  )
}
