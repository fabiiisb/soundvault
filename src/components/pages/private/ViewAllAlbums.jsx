'use client'
import { useEffect, useState } from 'react'
import AlbumCard from '@/components/Cards/AlbumCard'
import { Skeleton, Button } from '@nextui-org/react'
import Link from 'next/link'

const ViewAllAlbums = () => {
  const [albumData, setAlbumData] = useState()

  useEffect(() => {
    fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/private/album`,
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
          setAlbumData(data)
        }
      })
      .catch(err => {
        console.error(err)
      })
  }, [])

  if (!albumData) {
    return (
      <>
        <h1 className='text-2xl pb-2 font-bold underline underline-offset-[3px] decoration-niceOrange-400 decoration-2'>My albums</h1>

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

  if (albumData.length === 0) {
    return (
      <>

        <h1 className='text-2xl pb-2 font-bold underline underline-offset-[3px] decoration-niceOrange-400 decoration-2'>My albums</h1>
        <section className='flex flex-col gap-5 '>
          <div className='mx-auto mt-2'>
            <p className='text-xl font-semibold'>
              You don&apos;t have any album
            </p>
          </div>
          <div className='mx-auto'>
            <Button
              as={Link}
              href={'/'}
              className='bg-content2 hover:text-niceOrange-400'
            >
              Create a new album
            </Button>
          </div>
        </section>

      </>
    )
  }

  return (
    <>
      <h1 className='text-2xl pb-2 font-bold underline underline-offset-[3px] decoration-niceOrange-400 decoration-2'>My albums</h1>
      <ul className='grid grid-cols-[repeat(_auto-fill,minmax(150px,1fr)_)] grid-flow-dense mini:gap-[15px] gap-[10px] w-full'>
        {albumData.map((album) => (
          <li key={album.album_id}>
            <AlbumCard
              name={album.name}
              year={new Date(album.creation_date).getFullYear()}
              id={album.album_id}
              src={album.image_url}
              visible={album.visible}
            />
          </li>
        ))}
      </ul>
    </>
  )
}

export default ViewAllAlbums
