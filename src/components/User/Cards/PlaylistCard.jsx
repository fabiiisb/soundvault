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
      <Card className='w-full h-full p-3 bg-content1/70'>
        <Image
          isBlurred
          width={300}
          height={300}
          alt='Song of the mounth'
          className="object-cover h-full w-full"
          src={src || 'https://media.discordapp.net/attachments/990816877691437086/1172158885696647280/mayaadis82_2_guys__Theyre_pop_rock_music_artist_.this_is_cover__ae89f55d-a618-4af0-b129-5a7cb0b7996f.png?ex=655f4d08&is=654cd808&hm=e3779779426e32691473050194bbda58d4f16cef9d6bc4fc2e1364ac6c68d4b5&=&width=671&height=671'}
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
