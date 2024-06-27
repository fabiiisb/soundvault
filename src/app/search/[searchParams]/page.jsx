'use client'
import { useEffect, useState } from 'react'
import { Divider, Spinner } from '@nextui-org/react'
import { User, Music, MusicFilter, MusicPlaylist, EmojiSad } from 'iconsax-react'
import { useParams } from 'next/navigation'
import SingleCard from '@/components/Cards/SingleCard'
import AlbumCard from '@/components/Cards/AlbumCard'
import PlaylistCard from '@/components/Cards/PlaylistCard'
import UserCard from '@/components/Cards/UserCard'

const Search = () => {
  const searchParams = useParams().searchParams
  const [selected, setSelected] = useState('songs')
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [isDataLoaded, setIsDataLoaded] = useState(false)

  const cleanInput = (input) => {
    return input.replace(/[^\w\s]/gi, '')
  }

  const cleanSearchParams = cleanInput(decodeURIComponent(searchParams))

  useEffect(() => {
    setLoading(true)
    setIsDataLoaded(false)

    const searchParams = {
      searchParams: cleanSearchParams,
      scope: selected
    }

    fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/home/search`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(searchParams)
      }
    )
      .then(res => res.json())
      .then(res => {
        if (!res.error) {
          setData(res.data)
        }
        setLoading(false)
        setIsDataLoaded(true)
      })
      .catch(err => {
        console.error(err)
        setLoading(false)
        setIsDataLoaded(true)
      })
  }, [selected])

  return (
    <>
      <section>
        <h1 className="text-2xl mb-2 font-bold underline underline-offset-[3px] decoration-niceOrange-400 decoration-2">Search by...</h1>

        <ul className='flex gap-3'>
          <li
            className={'pt-1 w-full max-w-[80px] text-center group cursor-pointer '}
            onClick={() => setSelected('songs')}
          >
            <Music
              className={`h-auto w-full max-w-8 mx-auto ${selected === 'songs' ? 'text-niceOrange-400' : 'text-white/70 group-hover:text-niceOrange-400'}`}
            />
            <p
              className={`text-sm font-semibold ${selected === 'songs' ? 'text-white' : 'text-white/90 group-hover:text-white'}`}
            >
              Songs
            </p>
          </li>
          <li
            className={'pt-1 w-full max-w-[80px] text-center group cursor-pointer '}
            onClick={() => setSelected('albums')}
          >
            <MusicPlaylist
              className={`h-auto w-full max-w-8 mx-auto ${selected === 'albums' ? 'text-niceOrange-400' : 'text-white/70 group-hover:text-niceOrange-400'}`}
            />
            <p
              className={`text-sm font-semibold ${selected === 'albums' ? 'text-white' : 'text-white/90 group-hover:text-white'}`}
            >
              Albums
            </p>
          </li>
          <li
            className={'pt-1 w-full max-w-[80px] text-center group cursor-pointer '}
            onClick={() => setSelected('playlists')}
          >
            <MusicFilter
              className={`h-auto w-full max-w-8 mx-auto ${selected === 'playlists' ? 'text-niceOrange-400' : 'text-white/70 group-hover:text-niceOrange-400'}`}
            />
            <p
              className={`text-sm font-semibold ${selected === 'playlists' ? 'text-white' : 'text-white/90 group-hover:text-white'}`}
            >
              Playlists
            </p>
          </li>
          <li
            className={'pt-1 w-full max-w-[80px] text-center group cursor-pointer '}
            onClick={() => setSelected('users')}
          >
            <User
              className={`h-auto w-full max-w-8 mx-auto ${selected === 'users' ? 'text-niceOrange-400' : 'text-white/70 group-hover:text-niceOrange-400'}`}
            />
            <p
              className={`text-sm font-semibold ${selected === 'users' ? 'text-white' : 'text-white/90 group-hover:text-white'}`}
            >
              Users
            </p>
          </li>
        </ul>
      </section>
      <Divider className=' mt-2' />
      <section className='mt-2'>
        <p className='text-sm font-semibold text-white/70 mb-3'>
          {'Searching: ' + cleanSearchParams}
        </p>

        {selected === 'songs' && (
          loading
            ? (
              <Spinner
                className="flex mx-auto"
                classNames={{
                  circle1: 'border-b-niceOrange-400',
                  circle2: 'border-b-niceOrange-400'
                }}
                size="lg"
              />
              )
            : (
                isDataLoaded && (
                  data.length !== 0
                    ? (
                    <ul className='grid grid-cols-[repeat(_auto-fill,minmax(150px,1fr)_)] grid-flow-dense mini:gap-[15px] gap-[10px] w-full'>
                      {data.map((data) => (
                        <li key={data.song_id}>
                          <SingleCard
                            name={data.name}
                            id={data.song_id}
                            src={data.image_url}
                          />
                        </li>
                      ))}
                    </ul>
                      )
                    : (
                    <div>
                      <p className='text-center text-white text-2xl'>
                        0 results for this search
                      </p>
                      <EmojiSad className='flex mx-auto mt-3 text-niceOrange-400' size={60} />
                    </div>
                      )
                )
              )
        )}

        {selected === 'albums' && (
          loading
            ? (
              <Spinner
                className="flex mx-auto"
                classNames={{
                  circle1: 'border-b-niceOrange-400',
                  circle2: 'border-b-niceOrange-400'
                }}
                size="lg"
              />
              )
            : (
                isDataLoaded && (
                  data.length !== 0
                    ? (
                    <ul className='grid grid-cols-[repeat(_auto-fill,minmax(150px,1fr)_)] grid-flow-dense mini:gap-[15px] gap-[10px] w-full'>
                      {data.map((data) => (
                        <li key={data.album_id}>
                          <AlbumCard
                            name={data.name}
                            id={data.album_id}
                            src={data.image_url}
                          />
                        </li>
                      ))}
                    </ul>
                      )
                    : (
                    <div>
                      <p className='text-center text-white text-2xl'>
                        0 results for this search
                      </p>
                      <EmojiSad className='flex mx-auto mt-3 text-niceOrange-400' size={60} />
                    </div>
                      )
                )
              )
        )}

        {selected === 'playlists' && (
          loading
            ? (
              <Spinner
                className="flex mx-auto"
                classNames={{
                  circle1: 'border-b-niceOrange-400',
                  circle2: 'border-b-niceOrange-400'
                }}
                size="lg"
              />
              )
            : (
                isDataLoaded && (
                  data.length !== 0
                    ? (
                    <ul className='grid grid-cols-[repeat(_auto-fill,minmax(150px,1fr)_)] grid-flow-dense mini:gap-[15px] gap-[10px] w-full'>
                      {data.map((data) => (
                        <li key={data.playlist_id}>
                          <PlaylistCard
                            name={data.name}
                            id={data.playlist_id}
                            src={data.image_url}
                          />
                        </li>
                      ))}
                    </ul>
                      )
                    : (
                    <div>
                      <p className='text-center text-white text-2xl'>
                        0 results for this search
                      </p>
                      <EmojiSad className='flex mx-auto mt-3 text-niceOrange-400' size={60} />
                    </div>
                      )
                )
              )
        )}

        {selected === 'users' && (
          loading
            ? (
              <Spinner
                className="flex mx-auto"
                classNames={{
                  circle1: 'border-b-niceOrange-400',
                  circle2: 'border-b-niceOrange-400'
                }}
                size="lg"
              />
              )
            : (
                isDataLoaded && (
                  data.length !== 0
                    ? (
                    <ul className='grid grid-cols-[repeat(_auto-fill,minmax(150px,1fr)_)] grid-flow-dense mini:gap-[15px] gap-[10px] w-full'>
                      {data.map((data) => (
                        <li key={data.username}>
                          <UserCard
                            name={data.username}
                            username={data.username}
                            src={data.image_url}
                          />
                        </li>
                      ))}
                    </ul>
                      )
                    : (
                    <div>
                      <p className='text-center text-white text-2xl'>
                        0 results for this search
                      </p>
                      <EmojiSad className='flex mx-auto mt-3 text-niceOrange-400' size={60} />
                    </div>
                      )
                )
              )
        )}
      </section>
    </>
  )
}

export default Search
