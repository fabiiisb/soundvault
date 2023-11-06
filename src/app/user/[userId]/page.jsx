import { SongUl } from '@/components/Song/SongList'

const popularData = [
  {
    songName: 'The Less I Know The Better',
    artist: 'Tame Impala',
    duration: '3:36',
    id: 'top1'
  },
  {
    songName: 'Let It Happen',
    artist: 'Tame Impala',
    duration: '7:47',
    id: 'top2'
  },
  {
    songName: 'Feels Like We Only Go Backwards',
    artist: 'Tame Impala',
    duration: '3:12',
    id: 'top3'
  },
  {
    songName: 'Elephant',
    artist: 'Tame Impala',
    duration: '3:31',
    id: 'top4'
  },
  {
    songName: 'Eventually',
    artist: 'Tame Impala',
    duration: '5:19',
    id: 'top5'
  }
]

const page = () => {
  return (
    <>
      <section>
        <p>USUARIO - Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque illum facere dolorum facilis consequatur nam distinctio, similique explicabo amet pariatur velit neque repellendus in ex sint deserunt beatae dolor accusamus!</p>
      </section>
      <section className="mt-10">
        <SongUl title={'Top rating songs'} songList={popularData} />
      </section>
    </>
  )
}

export default page
