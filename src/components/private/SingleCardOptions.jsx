'use client'
import { Card, Image, Link as LinkUi } from '@nextui-org/react'
import Link from 'next/link'
import { Calendar, Edit, Eye, EyeSlash } from 'iconsax-react'

const SingleCardOptions = ({ id, name, year, src, visible }) => {
  return (
    <div className={'relative'}>
      <LinkUi
        href={`singles/edit/${id}`}
        as={Link}
        className='w-full h-full'
      >
        <Card className={`w-full h-full p-3 bg-content1/70 relative ${visible === true ? '' : 'bg-danger/25'}`}>
          <Image
            width={300}
            height={300}
            isBlurred
            alt='Song of the mounth'
            className={`object-cover h-full w-full ${visible === true ? '' : 'brightness-75'}`}
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
              <Calendar size={15} />
              <p className='text-tiny'>{year}</p>
            </div>

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
          </div>
          <div className='absolute top-0 left-0 w-full h-full z-20 group hover:bg-black/60'>
            <div className='h-full w-full'>
              <Edit
                variant='Bold'
                className='text-white drop-shadow-md group-hover:visible invisible absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[45%] h-[45%]'
              />
            </div>
          </div>
        </Card>
      </LinkUi>

    </div>

  )
}

export default SingleCardOptions
