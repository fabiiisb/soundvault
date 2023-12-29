import { Card, Image, Link as LinkUi } from '@nextui-org/react'
import Link from 'next/link'
import { Calendar } from 'iconsax-react'

const AlbumCard = ({ id, name, year, src }) => {
  return (
    <LinkUi
      href={`/album/${id}`}
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
          src={src}
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
