'use client'
import { Card, Image, Link as LinkUi } from '@nextui-org/react'
import Link from 'next/link'

export default function SmallArtistCard ({ name, id }) {
  return (
    <LinkUi
      href={`/song/${id}`}
      as={Link}
      className='w-full h-full min-h-[150px]'
    >
      <Card className='w-full h-full'>
        <Image
          alt='Song of the mounth'
          className="object-cover h-full w-full"
          src='https://media.discordapp.net/attachments/1072899954525356072/1106638969908772984/kingdomcreation_cd_cover_high-resolution_drawing_modern_art_and_5ed8af70-edc7-4fef-94d9-130527a95b3b.png?ex=6532bd5a&is=6520485a&hm=7a2a2af806305066cf45f01b64f60ee3078d3eaeca14edf7b505fd5a8749aa37'
          height="100%"
        />
        <div className="backdrop-blur-sm px-2 before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-lg bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
          <p className=" mx-auto text-tiny text-white/80">{name}</p>
        </div>
      </Card>
    </LinkUi>

  )
}
