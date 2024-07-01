'use client'
import HomeSongCard from '@/components/Song/Cards/homeSongCard'
import { useEffect, useState } from 'react'
import { Skeleton, Card } from '@nextui-org/react'

export default function HomePage () {
  const [homeData, setHomeData] = useState()
  const [topSongMostListened, setTopSongMostListened] = useState()
  const [topSongMostLiked, setTopSongMostLiked] = useState()
  const [topDiscoverSong, setTopDiscoverSong] = useState()

  const [mostListened, setMostListened] = useState()
  const [mostLiked, setMostLiked] = useState()
  const [discoverSongs, setDiscoverSongs] = useState()

  useEffect(() => {
    fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/home`,
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
          const data = res.data.recordsets
          setTopSongMostListened(data[0][0])
          setTopSongMostLiked(data[1][0])
          setTopDiscoverSong(data[2][0])

          setMostListened(data[0].slice(1))
          setMostLiked(data[1].slice(1))
          setDiscoverSongs(data[2].slice(1))

          setHomeData(data)
        } else {
          throw new Error(res)
        }
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  if (!homeData) {
    return (
      <div className='flex flex-col gap-8'>
        <section>
          <Skeleton className='mb-2 w-48 rounded-large'>
            <p>loading</p>
          </Skeleton>
          <ul
            className='grid mini:grid-cols-[repeat(_auto-fill,minmax(150px,1fr)_)] grid-flow-dense mini:gap-[15px] gap-[10px] w-full'
          >

            <li
              className='mini:col-[1_/_3] mini:row-[1_/_3] row-span-1 col-span-1'
            >
              <Skeleton className='w-full h-full rounded-large'>
                <div className='w-full h-[367px] '></div>
              </Skeleton>
            </li>

            {Array.from({ length: 8 }, (_, index) => (
              <li key={index}>
                <Skeleton className='rounded-large'>
                  <Card
                    className='w-full h-44'
                  />
                </Skeleton>
              </li>
            ))}
          </ul>
        </section>
      </div >
    )
  }

  return (
    <div className='flex flex-col gap-8'>
      <section>
        <h1 className='text-2xl pb-2 font-bold underline underline-offset-[3px] decoration-niceOrange-400 decoration-2'>
          Most listened songs
        </h1>
        <ul
          className='grid mini:grid-cols-[repeat(_auto-fill,minmax(150px,1fr)_)] grid-flow-dense mini:gap-[15px] gap-[10px] w-full'
        >
          <li
            className='mini:col-[1_/_3] mini:row-[1_/_3] row-span-1 col-span-1'
          >
            <HomeSongCard
              href={`/song/${topSongMostListened?.song_id}`}
              src={topSongMostListened?.image_url}
              name={topSongMostListened?.name}
            />
          </li>
          {mostListened.map((item, index) => (
            <li key={index}>
              <HomeSongCard
                href={`/song/${item?.song_id}`}
                src={item?.image_url}
                name={item?.name}
              />
            </li>
          ))}
        </ul>
      </section>
      <section>
        <h1 className='text-2xl pb-2 font-bold underline underline-offset-[3px] decoration-niceOrange-400 decoration-2'>
          Most liked songs
        </h1>
        <ul
          className='grid mini:grid-cols-[repeat(_auto-fill,minmax(150px,1fr)_)] grid-flow-dense mini:gap-[15px] gap-[10px] w-full'
        >
          <li
            className='mini:col-[1_/_3] mini:row-[1_/_3] row-span-1 col-span-1'
          >
            <HomeSongCard
              href={`/song/${topSongMostLiked?.song_id}`}
              src={topSongMostLiked?.image_url}
              name={topSongMostLiked?.name}
            />
          </li>
          {mostLiked.map((item, index) => (
            <li key={index}>
              <HomeSongCard
                href={`/song/${item?.song_id}`}
                src={item?.image_url}
                name={item?.name}
              />
            </li>
          ))}
        </ul>
      </section>
      <section>
        <h1 className='text-2xl pb-2 font-bold underline underline-offset-[3px] decoration-niceOrange-400 decoration-2'>
          Discover new songs
        </h1>
        <ul
          className='grid mini:grid-cols-[repeat(_auto-fill,minmax(150px,1fr)_)] grid-flow-dense mini:gap-[15px] gap-[10px] w-full'
        >
          <li
            className='mini:col-[1_/_3] mini:row-[1_/_3] row-span-1 col-span-1'
          >
            <HomeSongCard
              href={`/song/${topDiscoverSong?.song_id}`}
              src={topDiscoverSong?.image_url}
              name={topDiscoverSong?.name}
            />
          </li>
          {discoverSongs.map((item, index) => (
            <li key={index}>
              <HomeSongCard
                href={`/song/${item?.song_id}`}
                src={item?.image_url}
                name={item?.name}
              />
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
