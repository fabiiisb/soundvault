import { Card, Image, Link as LinkUi } from '@nextui-org/react'
import Link from 'next/link'
import { Calendar } from 'iconsax-react'

const AlbumCard = ({ id, name, year, src }) => {
  return (
    <LinkUi
      href={`/song/${id}`}
      as={Link}
      className='w-full h-full'
    >
      <Card className='w-full h-full p-3 bg-content1/70'>
        <Image
          width={300}
          height={300}
          isBlurred
          alt='Song of the mounth'
          className="object-cover h-full w-full"
          src={src || 'https://media.discordapp.net/attachments/945077390839787570/1121637709765681213/reinboughshawty_AlaSka_Ska_Covers_Unleashed_Visualize_the_vibra_20ba48f3-0cda-41c3-9360-acfa4b06e8f1.png?ex=6556d905&is=65446405&hm=845b3ceb01e66054b973bf696819f830eab5b24a20b3bdefc54572c36edfbdb6&=&width=671&height=671'}
        />
        <div className='flex flex-col gap-1 py-2 '>
          <p
            className="text-small text-white/80 truncate"
            title={name}
          >
            {name}
          </p>
          <div
            className="flex gap-1 items-center text-white/60"
          >
            <Calendar size={15}/>
            <p className='text-tiny  '>{year}</p>
          </div>
        </div>
      </Card>
    </LinkUi>
  )
}

export default AlbumCard
