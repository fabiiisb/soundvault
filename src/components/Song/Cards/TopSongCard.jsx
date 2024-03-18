'use client'
import { Card, Image, Link as LinkUi } from '@nextui-org/react'
import Link from 'next/link'

export default function TopArtistCard () {
  return (
    <LinkUi
      as={Link}
      href='/'
      className='w-full h-full '
    >
      <Card className='h-full w-full'>
        <Image
          alt='Top 1 song of the mounth'
          className='object-fit-cover h-full'
          src='https://placehold.co/500x500' // cambiar por url real
          height="100%"
        />
        <div className='backdrop-blur-sm justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden  absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10 px-2 py-2'>
          <p className="text-tiny text-white/80">Available soon.</p>
        </div>
      </Card>
    </LinkUi>
  )
}
