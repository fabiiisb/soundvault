'use client'
import { Card, CardBody } from '@nextui-org/react'
import { BtnLikeSong, BtnPlaySong } from '@/components/Player/miniComp/PlayerBtns'
import Link from 'next/link'

export const SongUl = ({ title, songList, gradientColor }) => {
  return (
    <div>
      <div>
        <h2 className='text-xl pb-2 font-bold text-niceOrange-400'>
          {title}
        </h2>
      </div>
      <Card
        className={`flex relative gap-3 backdrop-blur-lg bg-content1/50  bg-gradient-to-r ${gradientColor} to-70% sm:to-40%`}
      >
        {songList.map((song) => (
          <SongLi key={song.id} song={song} />
        ))}
      </Card>
    </div>
  )
}

export const SongLi = ({ song }) => {
  return (
    <CardBody
      className='group px-3 py-1 first:mt-2 last:mb-2 hover:bg-default-500/20 z-10'
    >
      <div className='flex justify-between '>
        <div className='flex items-center gap-2 justify-start'>
          <BtnPlaySong
            className={'text-foreground/80 hover:text-inherit'}
          />
          <div className='flex flex-col max-w-[120px] overflow-hidden'>
            <Link
              className='marquee text-small hover:text-foreground/80 text-white flex gap-4'
              href={'/song/1'}
            >
              <p className='marquee__content min-w-full flex flex-shrink-0 '>{song.songName}</p>
              <p aria-hidden='true' className='marquee__content min-w-full flex flex-shrink-0'>{song.songName}</p>
            </Link>
            <Link
              className='text-tiny hover:text-foreground/80 no-underline hover:underline text-white/70 truncate'
              href='/user/1'
            >
              {song.user}
            </Link>
          </div>
        </div>
        <div className='flex items-center justify-end gap-2 ml-5'>
          <BtnLikeSong className={'invisible group-hover:visible'} />
          <p className='text-small text-foreground/80'>
            {song.duration}
          </p>
        </div>
      </div>
    </CardBody>
  )
}
