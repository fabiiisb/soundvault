import SmallArtistCard from '@/components/artists/SmallArtistCard'
import TopArtistCard from '@/components/artists/TopArtistCard'
import '@/app/test.css'

const LIST = [
  {
    name: 'test'
  },
  {
    name: 'test'
  },
  {
    name: 'test'
  },
  {
    name: 'test'
  },
  {
    name: 'test'
  },
  {
    name: 'test'
  },
  {
    name: 'test'
  },
  {
    name: 'test'
  },
  {
    name: 'test'
  },
  {
    name: 'test'
  },
  {
    name: 'test'
  },
  {
    name: 'test'
  },
  {
    name: 'test'
  },
  {
    name: 'test'
  },
  {
    name: 'test'
  }
]

export default function Home () {
  return (
    <>
      <ul className='grid grid-cols-[repeat(_auto-fill,minmax(140px,1fr)_)] grid-flow-dense gap-[15px] w-full'>
        <li className='col-[1_/_3] row-[1_/_3]'><TopArtistCard /></li>
        {LIST.map((item, index) => (
          <li key={index}><SmallArtistCard name={item.name} /></li>
        ))}
      </ul>
    </>
  )
}
