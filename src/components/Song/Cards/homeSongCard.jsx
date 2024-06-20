'use client'
import { Link as LinkUi } from '@nextui-org/react'
import Link from 'next/link'

export default function HomeSongCard ({ href, src, name }) {
  return (
    <LinkUi
      as={Link}
      href={href}
      className='w-full h-full'
      title={name}
    >
      <div className='relative overflow-hidden rounded-large w-full h-full group'>
        <img
          alt='Song image'
          className='w-full h-full object-cover rounded-large transform transition-transform duration-300 ease-in-out group-hover:scale-110'
          src={src}
        />
        <div
          className='absolute bottom-0 left-0 w-full backdrop-blur-[1px] bg-gradient-to-t from-[#000000]  to-transparent '
        >
          <p className='p-2 text-sm text-white/90 truncate'>
            {name}
          </p>
        </div>
      </div>
    </LinkUi>
  )
}
