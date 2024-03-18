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
          src='https://placehold.co/250x250' // cambiar
          height="100%"
        />
        <div className="backdrop-blur-sm px-2 before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-lg bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
          <p className=" mx-auto text-tiny text-white/80">{name}</p>
        </div>
      </Card>
    </LinkUi>

  )
}
