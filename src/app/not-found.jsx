import Link from 'next/link'
import { Button } from '@nextui-org/react'
import { Back } from 'iconsax-react'

const NotFound = () => {
  return (
    <div className='text-center mt-5'>
      <h1 className='text-8xl font-bold text-niceOrange-400'>404</h1>
      <p className=''>Page not found :(</p>

      <Button
        className='text-niceOrange-400 mt-6 bg-content2'
        href="/"
        as={Link}
        startContent={<Back/>}
      >
        Return to home
      </Button>
    </div>
  )
}

export default NotFound
