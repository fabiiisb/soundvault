'use client'
import { Image } from '@nextui-org/react'
import { BtnLikeSong, BtnPlaySong } from '@/components/Player/miniComp/PlayerBtns'

export default function MusicCard () {
  return (
    <div className="border-none rounded-lg">
      <div className="grid grid-cols-6 sm:grid-cols-12 gap-2 sm:gap-6 items-center justify-center">

        <div className="relative col-span-6 sm:col-span-4">
          <Image
            alt="Album cover"
            className="object-cover sm:max-h-[250px] "
            isBlurred
            src='https://media.discordapp.net/attachments/1072899954525356072/1106638969908772984/kingdomcreation_cd_cover_high-resolution_drawing_modern_art_and_5ed8af70-edc7-4fef-94d9-130527a95b3b.png?ex=6532bd5a&is=6520485a&hm=7a2a2af806305066cf45f01b64f60ee3078d3eaeca14edf7b505fd5a8749aa37&=&width=671&height=671'
            width="100%"
          />
        </div>

        <div className="flex flex-col col-span-6 sm:col-span-8">
          <div className="flex justify-between items-start">
            <div className="flex flex-col gap-2">
              <h1 className="text-2xl sm:text-4xl font-medium text-niceOrange-400 ">Song name</h1>
              <a className="text-small text-foreground/80 " href='#'>
                Artist/User
              </a>
              <div className={'h-16 w-16'}>
                <BtnPlaySong className={'h-full w-full'}/>
              </div>
            </div>
            <BtnLikeSong />
          </div>
        </div>
      </div>
    </div>
  )
}
