'use client'
import { BtnLikeSong, BtnPlaySong } from '@/components/Player/miniComp/PlayerBtns'
import { Image, Button, Tooltip } from '@nextui-org/react'
import { ArchiveAdd, Timer1, Calendar, Play } from 'iconsax-react'
import Link from 'next/link'

export default function SongView ({ songName, user, src, duration, date, reproductions }) {
  return (
    <div className="border-none rounded-lg">
      <div className="grid grid-cols-6 minixl:grid-cols-12 gap-2 minixl:gap-6 items-center">
        <div className="col-span-6 sm:col-span-4 sm870:col-span-3">
          <Image
            isBlurred
            alt="Song image"
            className="object-cover sm:max-h-[250px] "
            src={src}
          />
        </div>

        <div className="flex flex-col col-span-6 sm:col-span-8 sm870:col-span-9 bg-content1/70 rounded-large shadow-medium p-2 px-3 h-full">

          <h1 className="text-2xl minixl:text-3xl font-medium text-white truncate mb-1"
            title={songName}
          >
            {songName}
          </h1>

          <Link className="text-white/70 no-underline hover:underline mb-4" href={`/user/${user}`}>
            {user}
          </Link>

          <div className="flex flex-col  gap-4 ">
            <div className='flex flex-wrap gap-2 text-foreground-50'>
              <div className='h-12 w-12 '>
                <BtnPlaySong className={'h-full w-full text-foreground/80 hover:text-white'} />
              </div>
              <div className='flex items-center'>
                <BtnLikeSong />
              </div>
              <div className='flex items-center'>
                <Tooltip
                  content={'Add to playlist'}
                  closeDelay={100}
                >
                  <Button
                    isIconOnly
                    className={'text-default-900/60 data-[hover]:bg-foreground/10 '}
                    radius="full"
                    variant="light"
                  >
                    <ArchiveAdd />
                  </Button>
                </Tooltip>
              </div>

            </div>
            <div className='flex gap-2 flex-wrap text-white/70'>
              <p className='flex items-center'>
                <Timer1 className='h-4 text-white/90' />
                {': ' + duration}
              </p>
              <p className='flex items-center'>
                <Calendar className='h-4 text-white/90' />
                {': ' + date}
              </p>
              <p className='flex items-center'>
                <Play className='h-4 text-white/90' />
                {': ' + reproductions}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
