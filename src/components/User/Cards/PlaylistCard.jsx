'use client'
import { Card, Image, Link as LinkUi } from '@nextui-org/react'
import Link from 'next/link'

const PlaylistCard = ({ id, name, src }) => {
  return (
    <LinkUi
      href={`/song/${id}`}
      as={Link}
      className='w-full h-full'
    >
      <Card className='w-full h-full p-3 '>
        <Image
          isBlurred
          alt='Song of the mounth'
          className="object-cover h-full w-full"
          src={src || 'https://media.discordapp.net/attachments/1072899954525356072/1106638969908772984/kingdomcreation_cd_cover_high-resolution_drawing_modern_art_and_5ed8af70-edc7-4fef-94d9-130527a95b3b.png?ex=6532bd5a&is=6520485a&hm=7a2a2af806305066cf45f01b64f60ee3078d3eaeca14edf7b505fd5a8749aa37'}
        />
        <div className='py-2 '>
          <p
            className="text-small text-white/80 truncate"
            title={name}
          >
            {name}
          </p>
        </div>
      </Card>
    </LinkUi>
  )
}

export default PlaylistCard
