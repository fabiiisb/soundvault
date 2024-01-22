'use client'
import { SongUl } from '@/components/Song/SongList'
import { useState, useEffect } from 'react'
import { Skeleton, Button } from '@nextui-org/react'
import Link from 'next/link'

const LikesPage = () => {
  const [songData, setSongData] = useState()

  useEffect(() => {
    fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/private/likes`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
      .then(res => res.json())
      .then(res => {
        if (!res.error) {
          const data = res.data.recordset
          setSongData(data)
        }
      })
      .catch(err => {
        console.error(err)
      })
  }, [])

  if (!songData) {
    return (
      <Skeleton className='rounded-large h-96' />
    )
  }

  if (songData.length === 0) {
    return (
      <div className='flex flex-col mt-5 font-semibold text-xl gap-5'>
        <div className='flex flex-col'>
          <span className='mx-auto'>
            You don&apos;t have any songs added to your likes yet.
          </span>
          <span className='mx-auto text-niceOrange-400'>
            Go explore and discover new songs!
          </span>
        </div>
        <Button
          as={Link}
          href={'/'}
          className='bg-content2 hover:text-niceOrange-400 mx-auto'
        >
          Go home
        </Button>
      </div>
    )
  }

  return (
    <div>
      {console.log(songData)}
      <SongUl
        songList={songData}
        gradientColor={'from-bgBlur-700'}
      />
    </div>
  )
}

export default LikesPage
