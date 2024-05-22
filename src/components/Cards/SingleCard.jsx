'use client'
import { Card, Image, Link as LinkUi } from '@nextui-org/react'
import Link from 'next/link'
import { Calendar, Eye, EyeSlash } from 'iconsax-react'

const SingleCard = ({ id, name, src, visible, year }) => {
  return (
    <LinkUi
      href={`/song/${id}`}
      as={Link}
      className='w-full h-full'
    >
      <Card className={`w-full h-full p-3 bg-content1/70 ${visible !== undefined ? (visible ? '' : 'bg-danger/25') : ''}`}>
        <Image
          isBlurred
          width={300}
          height={300}
          alt='Song of the mounth'
          className={`object-cover h-full w-full ${visible !== undefined ? (visible ? '' : 'brightness-75') : ''}`}
          src={src}
        />
        <div className='flex flex-col gap-1 py-2 '>
          <p
            className="text-small text-white/80 truncate"
            title={name}
          >
            {name}
          </p>
          {year !== undefined
            ? <div className="flex gap-1 items-center text-white/60">
                <Calendar size={15} />
                <p className='text-tiny '>{year}</p>
              </div>
            : ''}
          {visible !== undefined && (
            <div
              className="text-small text-white/80 truncate"
            >
              {visible === true
                ? (
                  <p className='flex gap-1 items-center text-white/60'>
                    <Eye size={15} />
                    <span>Visible</span>
                  </p>
                  )
                : (
                  <p className='flex gap-1 items-center text-danger/80'>
                    <EyeSlash size={15} />
                    <span>Invisible</span>
                  </p>
                  )
              }
            </div>
          )}
        </div>
      </Card>
    </LinkUi>
  )
}

export default SingleCard
