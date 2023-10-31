import SimilarSongs from '@/components/SimilarSongs'
import MusicCard from '@/components/SongCard'

const SongPage = ({ params }) => {
  // const id = params.songId
  return (
    <>
      <section>
        <MusicCard />
      </section>
      <section className='mt-5'>
        <SimilarSongs />
      </section>
    </>
  )
}

export default SongPage
