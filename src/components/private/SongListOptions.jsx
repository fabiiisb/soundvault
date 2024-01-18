'use client'
import { Card, CardBody, Button } from '@nextui-org/react'
import { BtnPlaySong } from '@/components/Player/miniComp/PlayerBtns'
import { Edit } from 'iconsax-react'
import Link from 'next/link'

const SongListOptions = ({ songList }) => {
  return (
    <div>
      <Card
        className={'flex relative gap-3 backdrop-blur-lg bg-transparent border-medium border-default-200'}
      >
        {songList.map((song) => (
          <SongLi key={song.songId} song={song} />
        ))}
      </Card>
    </div>
  )
}

const SongLi = ({ song }) => {
  return (
    <CardBody
      className='group px-3 py-1 first:mt-2 last:mb-2 hover:bg-default-500/20 z-10'
    >
      <div className='flex justify-between '>
        <div className='flex items-center gap-2 justify-start'>
          <BtnPlaySong
            className={'text-foreground/80 hover:text-white'}
          />
          <div className='flex flex-col max-w-[120px] overflow-hidden'>
            <Link
              className='marquee text-small hover:text-foreground/80 text-white flex gap-4'
              href={`/song/${song.songId}`}
            >
              <p className='marquee__content min-w-full flex flex-shrink-0 '>{song.songName}</p>
              <p aria-hidden='true' className='marquee__content min-w-full flex flex-shrink-0'>{song.songName}</p>
            </Link>
            <Link
              className='text-tiny hover:text-foreground/80 no-underline hover:underline text-white/70 truncate'
              href={`/user/${song.ownerUsername}`}
            >
              {song.ownerUsername}
            </Link>
          </div>
        </div>
        <div className='flex items-center justify-end gap-1 ml-5'>
          <Button
            className={'text-foreground/80 data-[hover]:bg-foreground/10 hover:text-white'}
            isIconOnly
            radius="full"
            variant="light"
          >
            <Edit />
          </Button>
          <p className='text-small text-foreground/80'>
            {song.songDuration}
          </p>
        </div>
      </div>
    </CardBody>
  )
}

export default SongListOptions
