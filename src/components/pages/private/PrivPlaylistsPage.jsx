'use client'
import { useEffect, useState } from 'react'
import PlaylistCardOptions from '../../private/PlaylistCardOptions'
import { Skeleton, Button } from '@nextui-org/react'
import Link from 'next/link'

const PrivPlaylists = () => {
  const [playlistData, setPlaylistData] = useState()

  useEffect(() => {
    fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/private/playlist`,
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
          setPlaylistData(data)
        }
      })
      .catch(err => {
        console.error(err)
      })
  }, [])

  if (!playlistData) {
    return (
      <>
        <h1 className='text-2xl pb-2 font-bold underline underline-offset-[3px] decoration-niceOrange-400 decoration-2'>My playlists</h1>

        <ul className='grid grid-cols-[repeat(_auto-fill,minmax(150px,1fr)_)] grid-flow-dense mini:gap-[15px] gap-[10px] w-full'>
          {Array.from({ length: 10 }, (_, index) => (
            <li key={index}>
              <div className='w-full h-full p-3 bg-content1/70 rounded-large'>
                <Skeleton className='rounded-large'>
                  <div
                    className='h-[125px]'
                  >
                  </div>
                </Skeleton>
                <div className='flex flex-col gap-1 py-2 '>
                  <Skeleton className='rounded-large'>
                    <p className='truncate text-small text-white/80'>Loading</p>
                  </Skeleton>
                  <div className='flex items-center gap-1 text-white/60'>
                    <Skeleton className='rounded-large'>
                      <p className='text-tiny'>Loading</p>
                    </Skeleton>
                  </div>
                  <div className='flex items-center gap-1 text-white/60'>
                    <Skeleton className='rounded-large'>
                      <p className='text-tiny'>Loading...</p>
                    </Skeleton>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </>
    )
  }

  if (playlistData.length === 0) {
    return (
      <>

        <h1 className='text-2xl pb-2 font-bold underline underline-offset-[3px] decoration-niceOrange-400 decoration-2'>My playlists</h1>
        <section className='flex flex-col gap-5 '>
          <div className='mx-auto mt-2'>
            <p className='text-xl font-semibold'>
              You don&apos;t have any playlist
            </p>
          </div>
          <div className='mx-auto'>
            <Button
              as={Link}
              href={'/'}
              className='bg-content1 hover:text-niceOrange-400'
            >
              Create a new playlist
            </Button>
          </div>
        </section>

      </>
    )
  }

  return (
    <>
      <h1 className='text-2xl pb-2 font-bold underline underline-offset-[3px] decoration-niceOrange-400 decoration-2'>My playlists</h1>

      <ul className='grid grid-cols-[repeat(_auto-fill,minmax(150px,1fr)_)] grid-flow-dense mini:gap-[15px] gap-[10px] w-full'>
        {playlistData.map((playlist) => (
          <li key={playlist.playlist_id}>
            <PlaylistCardOptions
              name={playlist.name}
              year={new Date(playlist.creation_date).getFullYear()}
              id={playlist.playlist_id}
              src={playlist.image_url}
              visible={playlist.visible}
            />
          </li>
        ))}

      </ul>
    </>
  )
}

export default PrivPlaylists
