'use client'
import { Image, Link as LinkUi } from '@nextui-org/react'
import Link from 'next/link'

const UserCard = ({ username, name, src }) => {
  return (
    <LinkUi
      href={`/user/${username}`}
      as={Link}
      className='w-full h-full'
    >
      <div
        className={'w-full h-full p-3 rounded-lg bg-gradient-to-t from-content1 to-transparent to-70%'}
      >
        <Image
          isBlurred
          width={300}
          height={300}
          alt='User image'
          className={'object-cover h-full w-full rounded-full'}
          src={src}
        />
        <div className='pt-2'>
          <p
            className="text-small text-white/80 truncate text-center "
            title={name}
          >
            {name}
          </p>
        </div>
      </div>
    </LinkUi>
  )
}

export default UserCard
