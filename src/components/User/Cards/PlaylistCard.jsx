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
          src={src}
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
