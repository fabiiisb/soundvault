'use client'
import { Card, CardBody, Button, Tooltip } from '@nextui-org/react'
import { BtnPlaySong } from '@/components/Player/PlayerBtns'
import { SaveRemove } from 'iconsax-react'
import { useContext, useState } from 'react'
import Link from 'next/link'
import playlistContext from '@/context/PlaylistsContext/playlistContext'

const PlaylistSongListOptions = ({ songList, playlistId }) => {
  const [playlistSongList, setPlaylistSongList] = useState(songList)

  return (
    <div>
      {playlistSongList.length === 0
        ? <section className='flex flex-col gap-5 '>
          <div className='mx-auto mt-2'>
            <p className='text-xl font-semibold'>
              You don&apos;t have any songs on this playlist
            </p>
          </div>
          <div className='mx-auto'>
            <Button as={Link} href={'/'} className='bg-content2 hover:text-niceOrange-400'>
              Go explore!
            </Button>
          </div>
        </section>
        : <Card
          className={'flex relative gap-3 backdrop-blur-lg bg-transparent border-medium border-default-200'}
        >
          {playlistSongList.map((song) => (
            <SongLi
              key={song.songId}
              song={song}
              playlistId={playlistId}
              list={playlistSongList} // Pass the current list state
              changeList={setPlaylistSongList} // Pass the update function
            />
          ))}
        </Card>
      }

    </div>
  )
}

const SongLi = ({ song, playlistId, list, changeList }) => {
  const { removeFromPlaylist } = useContext(playlistContext)

  const handleRemoveSongFromPlaylist = () => {
    removeFromPlaylist(playlistId, song.songId)

    changeList(list.filter((item) => item.songId !== song.songId))
  }

  if (list.length === 0) {
    return (
      <section className='flex flex-col gap-5 '>
        <div className='mx-auto mt-2'>
          <p className='text-xl font-semibold'>
            You don&apos;t have any song on this playlist
          </p>
        </div>
        <div className='mx-auto'>
          <Button
            as={Link}
            href={'/'}
            className='bg-content2 hover:text-niceOrange-400'
          >
            Go explore!
          </Button>
        </div>
      </section>
    )
  }

  return (
    <CardBody
      className='group px-3 py-1 first:mt-2 last:mb-2 hover:bg-default-500/20 z-10'
    >
      <div className='flex justify-between '>
        <div className='flex items-center gap-2 justify-start'>
          <BtnPlaySong
            className={'text-foreground/80 hover:text-white'}
            songList={list}
            songId={song.songId}
            songUrl={song.songUrl}
            songName={song.songName}
          />
          <div className='flex flex-col max-w-[120px] overflow-hidden'>
            <Link
              className='marquee text-small hover:text-foreground/80 text-white flex gap-4'
              href={`/song/${song.songId}`}
            >
              <p className='marquee__content min-w-full flex flex-shrink-0 '>{song.songName}</p>
              <p aria-hidden='true' className='marquee__content min-w-full flex flex-shrink-0'>{song.songName}</p>
            </Link>
            <Link
              className='text-tiny hover:text-foreground/80 no-underline hover:underline text-white/70 truncate'
              href={`/user/${song.ownerUsername}`}
            >
              {song.ownerUsername}
            </Link>
          </div>
        </div>
        <div className='flex items-center justify-end gap-1 ml-5'>
          <Tooltip content="Remove from playlist" delay={200} closeDelay={1}>
            <Button
              className={'text-foreground/80 data-[hover]:bg-foreground/10 hover:text-white'}
              isIconOnly
              radius="full"
              variant="light"
              onClick={handleRemoveSongFromPlaylist}
            >
              <SaveRemove className='text-danger/80' />
            </Button>
          </Tooltip>
          <p className='text-small text-foreground/80'>
            {song.songDuration}
          </p>
        </div>
      </div>
    </CardBody >
  )
}

export default PlaylistSongListOptions
