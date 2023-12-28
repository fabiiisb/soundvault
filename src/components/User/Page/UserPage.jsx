'use client'
import AlbumCard from '@/components/User/Cards/AlbumCard'
import PlaylistCard from '@/components/User/Cards/PlaylistCard'
import { ArrowLeft, TagUser } from 'iconsax-react'
import { SongUl } from '@/components/Song/SongList'
import { Skeleton, Image, Card, Chip } from '@nextui-org/react'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import Link from 'next/link'

const UserPage = () => {
  const username = useParams().username
  const [userData, setUserData] = useState()
  const [notFound, setNotFound] = useState(false)
  const [nuOfElementAlbum, setNuOfElementAlbum] = useState(6)
  const [nuOfElementPlaylist, setNuOfElementPlaylist] = useState(6)

  const popularData = [
    {
      songName: 'The Less I Know The Better',
      duration: '3:36',
      id: 'top1'
    },
    {
      songName: 'Let It Happen',
      duration: '7:47',
      id: 'top2'
    },
    {
      songName: 'Feels Like We Only Go Backwards',
      duration: '3:12',
      id: 'top3'
    },
    {
      songName: 'Elephant',
      duration: '3:31',
      id: 'top4'
    },
    {
      songName: 'Eventually',
      duration: '5:19',
      id: 'top5'
    }
  ]

  useEffect(() => {
    fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/${username}`,
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
          setNotFound(false)
          setUserData(data)
        } else {
          setNotFound(true)
        }
      })
      .catch(err => {
        console.error(err)
      })
  }, [username])

  const loadMoreAlbums = () => {
    setNuOfElementAlbum(nuOfElementAlbum + nuOfElementAlbum)
  }

  const loadMorePlaylists = () => {
    setNuOfElementPlaylist(nuOfElementPlaylist + nuOfElementPlaylist)
  }

  if (notFound) {
    return (
      <section className='flex'>
        <div className='mx-auto'>
          <TagUser className='mx-auto text-niceOrange-400' size={70} />
          <h2 className='text-2xl my-4 text-white/70'>
            User not found
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

  if (!userData) {
    return (
      <>
        <section className='flex flex-col gap-5 sm:flex-row'>
          <div>
            <h2 className='text-xl pb-2 font-bold text-niceOrange-400'>
              <Skeleton className='w-28 rounded-lg'>
                <p>Username</p>
              </Skeleton>
            </h2>
            <Skeleton className='rounded-large'>
              <div className='h-[300px] mini:h-[304px] mini:w-[190px]'>
                asd
              </div>
            </Skeleton>
          </div>
          <div className='w-full'>
            <h2 className='text-xl pb-2 font-bold text-niceOrange-400'>
              <Skeleton className='w-40 rounded-lg'>
                Loading
              </Skeleton>
            </h2>
            <Skeleton className='rounded-large'>
              <SongUl
                title={'Popular'}
                songList={popularData}
                gradientColor={'from-blackPurple-900'}
              />
            </Skeleton>
          </div>
        </section>
        <section className='mt-10'>
          <h2 className='text-xl pb-2 font-bold text-niceOrange-400'>
            Albums
          </h2>
          <ul className='grid grid-cols-[repeat(_auto-fill,minmax(150px,1fr)_)] grid-flow-dense mini:gap-[15px] gap-[10px] w-full'>
            {Array.from({ length: 6 }, (_, index) => (
              <li key={index}>
                <Card className='w-full h-full p-3 bg-content1/70'>
                  <Skeleton className='rounded-large'>
                    <div
                      className='h-[125px]'
                    >
                    </div>
                  </Skeleton>
                  <div className='flex flex-col gap-1 py-2 '>
                    <Skeleton className='rounded-large'>
                      <p className='text-small text-white/80 truncate'>Loading</p>
                    </Skeleton>
                    <div className='flex gap-1 items-center text-white/60'>
                      <Skeleton className='rounded-large'>
                        <p className='text-tiny'>Loading</p>
                      </Skeleton>
                    </div>
                  </div>
                </Card>
              </li>
            ))
            }
          </ul>
          <Chip
            className='mt-[10px]  bg-content1/70 rounded-lg'
            variant='flat'
            onClick={loadMoreAlbums}
          >
            <Skeleton className='rounded-large'>
              View more...
            </Skeleton>
          </Chip>

        </section>
        <section className='mt-10'>
          <h2 className='text-xl pb-2 font-bold text-niceOrange-400'>
            Playlists
          </h2>
          <ul className='grid grid-cols-[repeat(_auto-fill,minmax(150px,1fr)_)] grid-flow-dense mini:gap-[15px] gap-[10px] w-full'>
            {
              Array.from({ length: 6 }, (_, index) => (
                <li key={index}>
                  <Card className='w-full h-full p-3 bg-content1/70'>
                    <Skeleton className='rounded-large'>
                      <div
                        className='h-[125px] '
                      >
                      </div>
                    </Skeleton>
                    <div className='flex flex-col gap-1 py-2 '>
                      <Skeleton className='rounded-large'>
                        <p className='text-small text-white/80 truncate'>Loading</p>
                      </Skeleton>
                    </div>
                  </Card>
                </li>
              ))
            }
          </ul>
          <Chip
            className='mt-[10px]  bg-content1/70 rounded-lg'
            variant='flat'
            onClick={loadMoreAlbums}
          >
            <Skeleton className='rounded-large'>
              View more...
            </Skeleton>
          </Chip>
        </section>
      </>
    )
  }

  return (
    <>
      <section className='flex flex-col gap-5 sm:flex-row'>
        <div>
          <h2 className='text-xl pb-2 font-bold text-niceOrange-400'>
            {userData[0][0].username}
          </h2>
          <Image
            width={250}
            height={300}
            isBlurred
            alt="Song image"
            className='object-cover mini:h-[304px] '
            src={userData[0][0].image_url}
          />
        </div>
        <div className='w-full'>
          <h2 className='text-xl pb-2 font-bold text-niceOrange-400'>
            Popular songs
          </h2>
          <SongUl
            title={'Popular'}
            songList={popularData}
            gradientColor={'from-blackPurple-900'}
          />
        </div>
      </section>
      <section className='mt-10'>
        <h2 className='text-xl pb-2 font-bold text-niceOrange-400'>
          Albums
        </h2>
        <ul className='grid grid-cols-[repeat(_auto-fill,minmax(150px,1fr)_)] grid-flow-dense mini:gap-[15px] gap-[10px] w-full'>

          {userData[1].length > 0
            ? (
                userData[1].slice(0, nuOfElementAlbum).map((item) => (
                  <li key={item.album_id}>
                    <AlbumCard
                      name={item.name}
                      year={new Date(item.creation_date).getFullYear()}
                      id={item.album_id}
                      src={item.image_url}
                    />
                  </li>
                ))
              )
            : (
               <p>This user has no created albums.</p>
              )}

        </ul>

        {
          userData[1].length > nuOfElementAlbum && (
            <Chip
              className='mt-[10px] text-niceOrange-400 bg-content1/70 hover:cursor-pointer rounded-lg'
              variant='flat'
              onClick={loadMoreAlbums}
            >
              View more...
            </Chip>
          )
        }

      </section>
      <section className='mt-10'>
        <h2 className='text-xl pb-2 font-bold text-niceOrange-400'>
          Playlists
        </h2>
        <ul className='grid grid-cols-[repeat(_auto-fill,minmax(150px,1fr)_)] grid-flow-dense mini:gap-[15px] gap-[10px] w-full'>

          {userData[2].length > 0
            ? (
                userData[2].slice(0, nuOfElementPlaylist).map((item) => (
                  <li key={item.playlist_id}>
                    <PlaylistCard
                      name={item.name}
                      id={item.playlist_id}
                      src={item.image_url}
                    />
                  </li>
                ))
              )
            : (
               <p>This user has no created playlists.</p>
              )}

        </ul>

        {userData[1].length > nuOfElementPlaylist && (
          <Chip
            className='mt-[10px] text-niceOrange-400 bg-content1/70 hover:cursor-pointer rounded-lg'
            variant='flat'
            onClick={loadMorePlaylists}
          >
            View more...
          </Chip>
        )}

      </section>
    </>
  )
}

export default UserPage
