'use client'
import SongView from '@/components/Song/Cards/SongView'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { SongUl } from '@/components/Song/SongList'
import { Skeleton, Button } from '@nextui-org/react'
import { MusicSquareSearch, ArrowLeft } from 'iconsax-react'
import Link from 'next/link'
import Alert from '@/components/Alerts/Alert'

const PlaylistPage = () => {
  const playlistId = useParams().playlistId
  const [notFound, setNotFound] = useState(false)
  const [playlistData, setPlaylistData] = useState()
  const [songData, setSongData] = useState()
  const [error, setError] = useState(false)

  useEffect(() => {
    fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/playlist/${playlistId}`,
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
          const dataPlaylist = res.data.recordset[0]
          const dataSongs = res.data.recordsets[1]

          setPlaylistData(dataPlaylist)
          setSongData(dataSongs)

          setNotFound(false)
          setError(false)
        } else {
          setNotFound(true)
        }
      })
      .catch(err => {
        console.log(err)
        setError(true)
      })
  }, [playlistId])

  if (notFound) {
    return (
      <section className='flex'>
        <div className='mx-auto'>
          <MusicSquareSearch className='mx-auto text-niceOrange-400' size={70} />
          <h2 className='text-2xl my-4 text-white/70'>
            Song not found
          </h2>
          <div>
            <Link
              href='/'
              className='flex justify-center items-center text-blue-500 hover:text-blue-400 text-[17px] font-semibold border border-blue-400 p-1 rounded-large'
            >
              <ArrowLeft
                variant='Bold'
                className='mr-2'
              />
              Go back
            </Link>
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <Alert
        message={'Unexpected error :('}
        type={'error'}
      />
    )
  }

  if (!playlistData) {
    return (
      <>
        <section>
          <div className="grid grid-cols-6 minixl:grid-cols-12 gap-2 minixl:gap-6 items-center">
            <Skeleton className='rounded-large col-span-6 sm:col-span-4 sm870:col-span-3'>
              <div className="w-full h-[314px]  minixl:h-[300px] sm:h-[226px] sm:w-[226px]" />
            </Skeleton>

            <Skeleton className='flex flex-col col-span-6 sm:col-span-8 sm870:col-span-9  rounded-large h-full'>
              <div className="h-[180px] " />
            </Skeleton>
          </div>

        </section>
        <section className='mt-10'>
          <Skeleton className='rounded-large h-[400px]'>
          </Skeleton>
        </section>
      </>
    )
  }

  return (
    <>
      <section>
        <SongView
          user={playlistData.user_username}
          songName={playlistData.playlist_name}
          img={playlistData.playlist_image_url}
          date={new Date(playlistData.playlist_creation_date).getFullYear()}
          songCount={songData.length}
          isAvaible={songData.length === 0}
        />
      </section>
      <section className='mt-10'>
        {songData.length === 0
          ? <section className='flex flex-col gap-5 '>
            <div className='mx-auto mt-2'>
              <p className='text-xl font-semibold'>
                This playlist does not contain any songs
              </p>
            </div>
            <div className='mx-auto'>
              <Button
                as={Link}
                href={'/'}
                className='bg-content2 hover:text-niceOrange-400'
              >
                Go home!
              </Button>
            </div>
          </section>
          : <SongUl
            songList={songData}
            gradientColor={'from-niceOrange-600'}
          />

        }

      </section>
    </>
  )
}

export default PlaylistPage
