'use client'
import { Image } from '@nextui-org/react'

const UserView = ({ className }) => {
  return (
    <>
      <Image
        isBlurred
        alt="Song image"
        className={'object-cover ' + className}
        src='https://media.discordapp.net/attachments/1072899954525356072/1169088295255412827/aiquise_rap_artist_album_cover_for_a_song_called_amethyst_4b931ec0-1268-4520-8d93-dc9f48cfca7c.png?ex=655d5bd2&is=654ae6d2&hm=11917ee5299aed8be77b348f9146b7a0ee45c18d41941716f084d98e992353aa&=&width=671&height=671'
      />
    </>
  )
}

export default UserView
