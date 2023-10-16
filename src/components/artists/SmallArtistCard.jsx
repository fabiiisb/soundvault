'use client'
import { Card, Image, CardFooter } from '@nextui-org/react'

export default function SmallArtistCard ({ name }) {
  return (
    <Card
      isFooterBlurred
      radius="lg"
      className="border-none max-w-full max-h-full "
    >
      <Image
        wrapper
        alt="Woman listing to music"
        className="object-cover w-full h-full"
        src='https://media.discordapp.net/attachments/1072899954525356072/1106638969908772984/kingdomcreation_cd_cover_high-resolution_drawing_modern_art_and_5ed8af70-edc7-4fef-94d9-130527a95b3b.png?ex=6532bd5a&is=6520485a&hm=7a2a2af806305066cf45f01b64f60ee3078d3eaeca14edf7b505fd5a8749aa37&=&width=671&height=671'

      />
      <CardFooter className=" before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
        <p className=" mx-auto text-tiny text-white/80">{name}</p>
      </CardFooter>
    </Card>
  )
}
