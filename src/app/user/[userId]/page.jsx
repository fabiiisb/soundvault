import { SongUl } from '@/components/Song/SongList'
import UserView from '@/components/User/Cards/UserView'
import AlbumCard from '@/components/User/Cards/AlbumCard'
import PlaylistCard from '@/components/User/Cards/PlaylistCard'

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

const albums = [
  {
    albumName: 'Bleach',
    id: 'album1',
    year: '1989'
  },
  {
    albumName: 'Nevermind',
    id: 'album2',
    year: '1991'
  },
  {
    albumName: 'In Utero',
    id: 'album3',
    year: '1993'
  },
  {
    albumName: 'MTV Unplugged in New York',
    id: 'album4',
    year: '1994'
  },
  {
    albumName: 'From the Muddy Banks of the Wishkah madafakiña loquiño ashbkgas fghasghjkasd ghjkasghjkdghjkasdas ghjkaf ghjkasfasghj fas',
    id: 'album5',
    year: '1996'
  },
  {
    albumName: 'Nirvana',
    id: 'album6',
    year: '2002'
  }
]

const playlists = [
  {
    playlistName: 'playlist1',
    id: 'playlist1'
  },
  {
    playlistName: 'playlist2',
    id: 'playlist2'
  },
  {
    playlistName: 'playlist3',
    id: 'playlist3'
  },
  {
    playlistName: 'playlist4',
    id: 'playlist4'
  },
  {
    playlistName: 'playlist5',
    id: 'playlist5'
  },
  {
    playlistName: 'playlist6',
    id: 'playlist6'
  }
]

const page = () => {
  return (
    <>
      <section className='flex flex-col gap-5 sm:flex-row'>
        <div className=''>
          <h2 className='text-xl pb-2 font-bold text-niceOrange-400'>
            User
          </h2>
          <UserView className={'h-full sm:h-[304px]'} />
        </div>
        <div className='w-full'>
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
          {albums.map((item, index) => (
            <li key={index}>
              <AlbumCard
                name={item.albumName}
                year={item.year}
                id={item.id}
                src={'https://media.discordapp.net/attachments/945077390839787570/1121637709765681213/reinboughshawty_AlaSka_Ska_Covers_Unleashed_Visualize_the_vibra_20ba48f3-0cda-41c3-9360-acfa4b06e8f1.png?ex=6556d905&is=65446405&hm=845b3ceb01e66054b973bf696819f830eab5b24a20b3bdefc54572c36edfbdb6&=&width=671&height=671'}
              />
            </li>
          ))}

        </ul>
      </section>
      <section className='mt-10'>
        <h2 className='text-xl pb-2 font-bold text-niceOrange-400'>
          Playlists
        </h2>
        <ul className='grid grid-cols-[repeat(_auto-fill,minmax(150px,1fr)_)] grid-flow-dense mini:gap-[15px] gap-[10px] w-full'>
          {playlists.map((item, index) => (
            <li key={index}>
              <PlaylistCard name={item.playlistName} id={item.id} src={'https://media.discordapp.net/attachments/990816877691437086/1172158885696647280/mayaadis82_2_guys__Theyre_pop_rock_music_artist_.this_is_cover__ae89f55d-a618-4af0-b129-5a7cb0b7996f.png?ex=655f4d08&is=654cd808&hm=e3779779426e32691473050194bbda58d4f16cef9d6bc4fc2e1364ac6c68d4b5&=&width=671&height=671'} />
            </li>
          ))}
        </ul>
      </section>
    </>
  )
}

export default page
