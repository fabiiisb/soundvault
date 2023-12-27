'use client'
import { SongUl } from '@/components/Song/SongList'
import SongView from '@/components/Song/Cards/SongView'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'

const SongPage = () => {
  const songId = useParams().songId
  const [notFound, setNotFound] = useState(false)
  const [songData, setSongData] = useState()

  const similarSongs = [
    {
      songName: 'Rap God',
      user: 'Eminem',
      duration: '6:03',
      id: 'similarsong1'
    },
    {
      songName: 'Lose Yourself',
      user: 'Eminem',
      duration: '5:26',
      id: 'similarsong2'
    },
    {
      songName: 'Juicy',
      user: 'The Notorious B.I.G.',
      duration: '5:02',
      id: 'similarsong3'
    },
    {
      songName: 'Nuthin\' But a \'G\' Thang asd asdasd asd asdasd as dasda sdasd xd',
      user: 'Dr. Dre',
      duration: '3:58',
      id: 'similarsong4'
    },
    {
      songName: 'Gin and Juice',
      user: 'Snoop Dogg',
      duration: '3:31',
      id: 'similarsong5'
    }
  ]

  useEffect(() => {
    fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/song/${songId}`,
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
          const data = res.data.recordset[0]
          setNotFound(false)
          setSongData(data)

          console.log(data)
        } else {
          setNotFound(true)
          console.log(res)
          console.log('no encontrado')
        }
      })
      .catch(err => {
        console.error(err)
      })
  }, [songId])

  if (notFound) {
    return (
      <div>Not Found...</div>
    )
  }

  if (!songData) {
    return (
      <div>Loading...</div>
    )
  }

  return (
    <>
      <section>
        <SongView
          songName={songData.name}
          src={songData.image_url}
          user={songData.username}
          duration={songData.duration}
          date={new Date(songData.creation_date).getFullYear()}
          reproductions={songData.total_play_cont}
        />
      </section>
      <section className='mt-10'>
        <h1 className='text-2xl pb-2 font-bold underline underline-offset-[3px] decoration-niceOrange-400 decoration-2'>Similar songs</h1>
        <SongUl
          title={'Similar Songs'}
          songList={similarSongs}
          gradientColor={'from-bgBlur-950'}
        />
      </section>
    </>
  )
}

export default SongPage
