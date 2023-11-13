'use client'
import { Image } from '@nextui-org/react'
import { BtnLikeSong, BtnPlaySong } from '@/components/Player/miniComp/PlayerBtns'
import Link from 'next/link'

export default function SongView ({ songName, user }) {
  return (
    <div className="border-none rounded-lg">
      <div className="grid grid-cols-6 minixl:grid-cols-12 gap-2 minixl:gap-6 items-center justify-center">

        <div className="relative col-span-6 sm:col-span-4 ">
          <Image
            alt="Song image"
            className="object-cover sm:max-h-[250px] "
            src='https://media.discordapp.net/attachments/990816877691437086/1156393398505328692/abel_town_Depicting_two_musician_in_a_getho_and_minecraft_style_c222eba1-5022-43df-a4ed-4b202874a78b.png?ex=655d5146&is=654adc46&hm=e88d191fab2b56192685d8379275d2893261b59f47ab094bc5f9f92b6aa589d8&=&width=671&height=671'
            width="100%"
          />
          <div className='rounded-[14px] border- absolute top-0 z-10 h-full w-full bg-gradient-to-t from-blackPurple-950 to-20%'></div>
        </div>

        <div className="flex flex-col col-span-6 sm:col-span-8">
          <div className="flex justify-between items-start">
            <div className="flex flex-col gap-2">
              <h1 className="text-2xl minixl:text-3xl sm:text-4xl font-medium text-niceOrange-400 ">{songName}</h1>
              <div>
                <Link className="text-small hover:text-foreground/80 no-underline hover:underline" href='/user/1'>
                  {user}
                </Link>
              </div>
              <div className={'flex gap-2'}>
                <div className='h-12 w-12'>
                  <BtnPlaySong className={'h-full w-full'} />
                </div>
                <div className='h-12 w-12'>
                  <BtnLikeSong className={'h-full w-full'} size={40} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
