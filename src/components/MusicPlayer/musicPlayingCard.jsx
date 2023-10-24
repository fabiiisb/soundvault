'use client'
import { useState } from 'react'
import { Image, Button } from '@nextui-org/react'
import { Heart } from 'iconsax-react'
import PlayButtons from './miniComponents/PlayButtons.jsx'
import ProgressBar from './miniComponents/ProgressBar.jsx'

export default function MusicPlayer () {
  const [liked, setLiked] = useState(false)

  return (
    <div
      className="p-4 border-none rounded-lg bg-background/60 dark:bg-default-100/50 max-w-[600px] h-[calc(100vh-96px)] sm:h-[inherit]"
    >
        <div className="grid grid-cols-6 sm:grid-cols-12 gap-6 sm:gap-4 items-center justify-center ">
          <div className="relative col-span-6 sm:col-span-4">
            <Image
              alt="Album cover"
              className="object-cover max-h-[350px] "
              isBlurred
              src='https://media.discordapp.net/attachments/1072899954525356072/1106638969908772984/kingdomcreation_cd_cover_high-resolution_drawing_modern_art_and_5ed8af70-edc7-4fef-94d9-130527a95b3b.png?ex=6532bd5a&is=6520485a&hm=7a2a2af806305066cf45f01b64f60ee3078d3eaeca14edf7b505fd5a8749aa37&=&width=671&height=671'
              width="100%"
            />
          </div>

          <div className="flex flex-col col-span-6 sm:col-span-8">
            <div className="flex justify-between items-start">
              <div className="flex flex-col gap-0">
                <h3 className="font-semibold text-foreground/90">Daily Mix</h3>
                <p className="text-small text-foreground/80">12 Tracks</p>
                <h1 className="text-large font-medium mt-2">Frontend Radio</h1>
              </div>
              <Button
                isIconOnly
                className="text-default-900/60 data-[hover]:bg-foreground/10 -translate-y-2 translate-x-2"
                radius="full"
                variant="light"
                onPress={() => setLiked((v) => !v)}
              >
                <Heart
                  variant={liked ? 'Bold' : 'Linear'}
                  className={liked ? 'text-niceOrange-400' : 'text-inherit'}
                />
              </Button>
            </div>

            <ProgressBar />

            <PlayButtons />

          </div>
        </div>
    </div>
  )
}
