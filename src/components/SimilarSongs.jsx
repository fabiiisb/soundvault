'use client'
import { Card, CardBody } from '@nextui-org/react'
import { BtnLikeSong, BtnPlaySong } from '@/components/Player/miniComp/PlayerBtns'
import Link from 'next/link'

const LIST = [
  {
    songName: 'Song Name',
    artist: 'User',
    duration: '2:30'
  },
  {
    songName: 'Song Name',
    artist: 'User',
    duration: '2:30'
  },
  {
    songName: 'Song Name',
    artist: 'User',
    duration: '2:30'
  },
  {
    songName: 'Song Name',
    artist: 'User',
    duration: '2:30'
  },
  {
    songName: 'Song Name',
    artist: 'User',
    duration: '2:30'
  },
  {
    songName: 'Song Name',
    artist: 'User',
    duration: '2:30'
  },
  {
    songName: 'Song Name',
    artist: 'User',
    duration: '2:30'
  },
  {
    songName: 'Song Name',
    artist: 'User',
    duration: '2:30'
  },
  {
    songName: 'Song Name',
    artist: 'User',
    duration: '2:30'
  },
  {
    songName: 'Song Name',
    artist: 'User',
    duration: '2:30'
  }

]

const SimilarSongs = () => {
  return (
    <div>
      <div>
        <h2
          className='text-xl pb-2 font-bold text-niceOrange-400'
        >
          Similar Songs
        </h2>
      </div>
      <Card
        className='flex relative gap-3 backdrop-blur-lg bg-content1/50  bg-gradient-to-r from-bgBlur-950 to-70% sm:to-40%'
      >
        {LIST.map((item) => (
          <CardBody
            key={item.songName}
            className='group px-3 py-1 first:mt-2 last:mb-2 hover:bg-default-500/20 z-10'
          >
            <div className='flex justify-between'>
              <div className='flex items-center gap-2 justify-start'>
                <BtnPlaySong
                  className={'text-foreground/80 hover:text-inherit'}
                />
                <div className='flex-row'>
                  <Link
                    className='text-small hover:text-foreground/80'
                    href={'#'}
                  >
                    {item.songName}
                  </Link>
                  <Link
                    className='text-tiny block hover:text-foreground/80'
                    href={'#'}
                  >
                    {item.artist}
                  </Link>
                </div>
              </div>
              <div className='flex items-center justify-end gap-2'>
                <BtnLikeSong className={'invisible group-hover:visible'} />
                <p className='text-small text-foreground/80'>
                  {item.duration}
                </p>
              </div>
            </div>
          </CardBody>
        ))}
      </Card>
    </div>
  )
}

export default SimilarSongs
