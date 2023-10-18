'use client'
import { Card, CardFooter, Image, Button, Link as LinkUi } from '@nextui-org/react'
import Link from 'next/link'

export default function TopArtistCard () {
  return (
    <LinkUi
      as={Link}
      href='/'
      className='w-full h-full'
    >
      <Card
        isFooterBlurred
        radius="lg"
        className="border-none w-full h-full"
      >
        <Image
          alt="Woman listing to music"
          className="object-fit-cover w-full h-full"
          src='https://media.discordapp.net/attachments/990816877691437086/1148976934957633637/bella78787878_80s_Studio_Ghibli-style_illustration_lofi_stream__d81010b6-b9ab-4fd8-a1b2-d3b8feb1e04c.png?ex=65391ba8&is=6526a6a8&hm=5ceabf373975255f84f8ea9ebe3301caad5e2ed42f464c009fcf462a113164a4&=&width=671&height=671'
        />
        <CardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
          <p className="text-tiny text-white/80">Available soon.</p>
          <Button className="text-tiny text-white bg-black/20" variant="flat" color="default" radius="lg" size="sm">
            Notify me
          </Button>
        </CardFooter>
      </Card>
    </LinkUi>
  )
}
