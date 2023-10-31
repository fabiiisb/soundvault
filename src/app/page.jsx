import SmallArtistCard from '@/components/songCards/SmallSongCard'
import TopArtistCard from '@/components/songCards/TopSongCard'
import '@/app/test.css'

const SONGS = [
  {
    id: 1,
    name: 'test'
  },
  {
    id: 2,
    name: 'test'
  },
  {
    id: 3,
    name: 'test'
  },
  {
    id: 4,
    name: 'test'
  },
  {
    id: 5,
    name: 'test'
  },
  {
    id: 6,
    name: 'test'
  },
  {
    id: 7,
    name: 'test'
  },
  {
    id: 8,
    name: 'test'
  },
  {
    id: 8,
    name: 'test'
  },
  {
    id: 8,
    name: 'test'
  },
  {
    id: 8,
    name: 'test'
  },
  {
    id: 8,
    name: 'test'
  },
  {
    id: 8,
    name: 'test'
  }
]

export default function HomePage () {
  return (
    <section>
      <h1 className='text-2xl pb-5 font-bold underline underline-offset-[3px] decoration-niceOrange-400 decoration-2'>Songs of the mounth</h1>
      <ul className='grid mini:grid-cols-[repeat(_auto-fill,minmax(150px,1fr)_)] grid-flow-dense mini:gap-[15px] gap-[10px] w-full'>
        <li className='mini:col-[1_/_3] mini:row-[1_/_3] row-span-1 col-span-1'>
          <TopArtistCard />
        </li>
        {SONGS.map((item, index) => (
          <li key={index}>
            <SmallArtistCard name={item.name} id={item.id} />
          </li>
        ))}
      </ul>
    </section>
  )
}
