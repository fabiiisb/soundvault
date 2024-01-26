'use client'
import SongView from '@/components/Song/Cards/SongView'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import AlbumCard from '@/components/Cards/AlbumCard'
import { Skeleton, Card } from '@nextui-org/react'
import { MusicSquareSearch, ArrowLeft } from 'iconsax-react'
import Link from 'next/link'

const SongPage = () => {
  const songId = useParams().songId
  const [notFound, setNotFound] = useState(false)
  const [songData, setSongData] = useState()

  const similarSongs = [
    {
      songName: 'Rap God',
      user: 'Eminem',
      duration: '6:03',
      id: 'similarsong1',
      image_url: 'https://media.discordapp.net/attachments/945077390839787570/1121637709765681213/reinboughshawty_AlaSka_Ska_Covers_Unleashed_Visualize_the_vibra_20ba48f3-0cda-41c3-9360-acfa4b06e8f1.png?ex=6556d905&is=65446405&hm=845b3ceb01e66054b973bf696819f830eab5b24a20b3bdefc54572c36edfbdb6&=&width=671&height=671'
    },
    {
      songName: 'Lose Yourself',
      user: 'Eminem',
      duration: '5:26',
      id: 'similarsong2',
      image_url: 'https://media.discordapp.net/attachments/945077390839787570/1121637709765681213/reinboughshawty_AlaSka_Ska_Covers_Unleashed_Visualize_the_vibra_20ba48f3-0cda-41c3-9360-acfa4b06e8f1.png?ex=6556d905&is=65446405&hm=845b3ceb01e66054b973bf696819f830eab5b24a20b3bdefc54572c36edfbdb6&=&width=671&height=671'
    },
    {
      songName: 'Juicy',
      user: 'The Notorious B.I.G.',
      duration: '5:02',
      id: 'similarsong3',
      image_url: 'https://media.discordapp.net/attachments/945077390839787570/1121637709765681213/reinboughshawty_AlaSka_Ska_Covers_Unleashed_Visualize_the_vibra_20ba48f3-0cda-41c3-9360-acfa4b06e8f1.png?ex=6556d905&is=65446405&hm=845b3ceb01e66054b973bf696819f830eab5b24a20b3bdefc54572c36edfbdb6&=&width=671&height=671'
    },
    {
      songName: 'Nuthin\' But a \'G\' Thang asd asdasd asd asdasd as dasda sdasd xd',
      user: 'Dr. Dre',
      duration: '3:58',
      id: 'similarsong4',
      image_url: 'https://media.discordapp.net/attachments/945077390839787570/1121637709765681213/reinboughshawty_AlaSka_Ska_Covers_Unleashed_Visualize_the_vibra_20ba48f3-0cda-41c3-9360-acfa4b06e8f1.png?ex=6556d905&is=65446405&hm=845b3ceb01e66054b973bf696819f830eab5b24a20b3bdefc54572c36edfbdb6&=&width=671&height=671'
    },
    {
      songName: 'Gin and Juice',
      user: 'Snoop Dogg',
      duration: '3:31',
      id: 'similarsong5',
      image_url: 'https://media.discordapp.net/attachments/945077390839787570/1121637709765681213/reinboughshawty_AlaSka_Ska_Covers_Unleashed_Visualize_the_vibra_20ba48f3-0cda-41c3-9360-acfa4b06e8f1.png?ex=6556d905&is=65446405&hm=845b3ceb01e66054b973bf696819f830eab5b24a20b3bdefc54572c36edfbdb6&=&width=671&height=671'
    },
    {
      songName: 'Gin and Juice 2',
      user: 'Snoop Dogg',
      duration: '3:31',
      id: 'similarsong6',
      image_url: 'https://media.discordapp.net/attachments/945077390839787570/1121637709765681213/reinboughshawty_AlaSka_Ska_Covers_Unleashed_Visualize_the_vibra_20ba48f3-0cda-41c3-9360-acfa4b06e8f1.png?ex=6556d905&is=65446405&hm=845b3ceb01e66054b973bf696819f830eab5b24a20b3bdefc54572c36edfbdb6&=&width=671&height=671'
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
        } else {
          setNotFound(true)
        }
      })
      .catch(err => {
        console.error(err)
      })
  }, [songId])

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

  if (!songData) {
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
          <h1 className='text-2xl pb-2 font-bold underline underline-offset-[3px] decoration-niceOrange-400 decoration-2'>Similar songs</h1>
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
        </section>
      </>
    )
  }

  return (
    <>
      <section>
        <SongView
          songId={songData.song_id}
          songName={songData.name}
          src={songData.image_url}
          user={songData.username}
          duration={songData.duration}
          date={new Date(songData.creation_date).getFullYear()}
          reproductions={songData.total_play_cont}
          songUrl={songData.songUrl}
        />
      </section>
      <section className='mt-10'>
        <h1 className='text-2xl pb-2 font-bold underline underline-offset-[3px] decoration-niceOrange-400 decoration-2'>Similar songs</h1>
        <ul className='grid grid-cols-[repeat(_auto-fill,minmax(150px,1fr)_)] grid-flow-dense mini:gap-[15px] gap-[10px] w-full'>

          {similarSongs.map((item) => (
            <li key={item.id}>
              <AlbumCard
                name={item.songName}
                year={'cambiar albumcard por songcard'}
                id={item.id}
                src={item.image_url}
              />
            </li>
          ))}

        </ul>
      </section>
    </>
  )
}

export default SongPage
