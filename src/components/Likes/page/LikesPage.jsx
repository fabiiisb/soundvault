'use client'
import { SongUl } from '@/components/Song/SongList'
import { useState, useEffect } from 'react'
import { Skeleton } from '@nextui-org/react'

const LikesPage = () => {
  const [songData, setSongData] = useState()

  useEffect(() => {
    fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/likes`,
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
          console.log(data)
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

  return (
    <div>
      <SongUl
        songList={songData}
        gradientColor={'from-bgBlur-700'}
      />
    </div>
  )
}

export default LikesPage
