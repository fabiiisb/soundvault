'use client'
import { Card, CardBody } from '@nextui-org/react'
import { MusicLibrary2, MusicSquare } from 'iconsax-react'
import Link from 'next/link'

const UploadCard = () => {
  return (
    <div className="flex flex-col sm:flex sm:flex-row gap-3 mt-2">
      <Card
        className="w-full sm:w-[50%] text-niceOrange-400 hover:text-niceOrange-500"
        shadow="sm"
        isPressable
        as={Link}
        href={'/private/upload/single'}
      >
        <CardBody className="overflow-visible p-0 h-[200px] flex items-center justify-center">
          <MusicSquare className='mb-3' size={70} />
          <p className='font-semibold tracking-wider text-lg text-white/80'>
            Single
          </p>
        </CardBody>
      </Card>
      <Card
        className="w-full sm:w-[50%] text-niceOrange-400 hover:text-niceOrange-500"
        shadow="sm"
        isPressable
        as={Link}
        href={'/private/upload/album'}
      >
        <CardBody className="overflow-visible p-0 h-[200px] flex items-center justify-center">
          <MusicLibrary2 className='mb-3 ' size={70} />
          <p className='font-semibold tracking-wider text-lg text-white/80'>
            Album
          </p>
        </CardBody>
      </Card>
    </div>
  )
}

export default UploadCard
