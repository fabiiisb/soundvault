'use client'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Tooltip, CircularProgress } from '@nextui-org/react'
import { ArchiveAdd, AddCircle, CloseCircle } from 'iconsax-react'
import { BtnCreateNewPlaylist } from '../Player/PlayerBtns'
import { useState, useContext, useEffect } from 'react'
import playlistContext from '@/context/PlaylistsContext/playlistContext'

export default function AddToPlaylistModal ({ children, songId }) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [playlistData, setPlaylistData] = useState()
  const [saved, setSaved] = useState(false)
  const { userPlaylists } = useContext(playlistContext)

  useEffect(() => {
    const isSaved = userPlaylists.some(playlist => playlist.songs.includes(songId))
    setSaved(isSaved)
  }, [songId, userPlaylists])

  const getAllPlaylists = () => {
    fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/private/playlist`,
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
          const data = res.data.recordset
          setPlaylistData(data)
          // console.log(data)
        }
      })
      .catch(err => {
        console.error(err)
      })
  }

  return (
    <>
      <Tooltip
        content={'Add to playlist'}
        closeDelay={100}
      >
        <Button
          onPress={onOpen}
          isIconOnly
          className={'text-default-900/60 data-[hover]:bg-foreground/10 '}
          radius="full"
          variant="light"
          onClick={getAllPlaylists}
        >
          <ArchiveAdd
            className={saved ? 'text-niceOrange-400' : 'text-inherit'}
            variant={saved ? 'Bold' : 'Linear'}
          />
        </Button>
      </Tooltip>

      <Modal isOpen={isOpen} onClose={onClose} backdrop='blur' scrollBehavior={'inside'}>
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            Add to playlist
          </ModalHeader>
          <ModalBody>

            <BtnCreateNewPlaylist />
            {children}

            {
              playlistData !== undefined
                ? <AllPlaylists list={playlistData} songId={songId} />
                : <CircularProgress className='mx-auto py-3' aria-label="Loading..." />
            }

          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="light" onPress={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

const AllPlaylists = ({ list, songId }) => {
  const [isOnPlaylist, setIsOnPlaylist] = useState([])
  const { userPlaylists, setUserPlaylists, addToPlaylist, removeFromPlaylist } = useContext(playlistContext)

  useEffect(() => {
    const checkSongsInPlaylists = () => {
      const updatedIsOnPlaylist = list.map((playlist) => {
        const songsInPlaylist = userPlaylists.find(
          (userPlaylist) => userPlaylist.playlist_id === playlist.playlist_id
        ).songs
        const isSongInPlaylist = songsInPlaylist.includes(songId)
        return isSongInPlaylist
      })
      setIsOnPlaylist(updatedIsOnPlaylist)
    }

    checkSongsInPlaylists()
  }, [songId, userPlaylists])

  const handleAddToPlaylist = (playlistId, bool, index) => {
    if (bool === true) {
      removeFromPlaylist(playlistId, songId)

      const updatedUserPlaylists = [...userPlaylists]
      const updatedPlaylist = updatedUserPlaylists.find(
        (playlist) => playlist.playlist_id === playlistId
      )
      updatedPlaylist.songs = updatedPlaylist.songs.filter((song) => song !== songId)
      setUserPlaylists(updatedUserPlaylists)

      const updatedIsOnPlaylist = [...isOnPlaylist]
      updatedIsOnPlaylist[index] = false
      setIsOnPlaylist(updatedIsOnPlaylist)
    } else {
      addToPlaylist(playlistId, songId)

      const updatedUserPlaylists = [...userPlaylists]
      const updatedPlaylist = updatedUserPlaylists.find(
        (playlist) => playlist.playlist_id === playlistId
      )
      updatedPlaylist.songs.push(songId)
      setUserPlaylists(updatedUserPlaylists)

      const updatedIsOnPlaylist = [...isOnPlaylist]
      updatedIsOnPlaylist[index] = true
      setIsOnPlaylist(updatedIsOnPlaylist)
    }
  }

  return (
    <ul className='flex flex-col gap-1 bg-content2 shadow-medium rounded-medium p-2 '>
      {list.map((playlist, index) => (
        <li
          key={playlist.playlist_id}
          className={playlist.visible === false ? 'hidden ' : ' ' + 'p-2 rounded-lg hover:bg-content1 hover:shadow-medium'}
        >
          <div className='group flex items-center justify-between text-white/70'>
            <p className='group-hover:text-white select-none truncate'>
              {playlist.name}
            </p>
            <Button
              isIconOnly
              className={'data-[hover]:bg-foreground/10 text-white/70 group-hover:text-white'}
              radius="full"
              variant="light"
              onClick={() => handleAddToPlaylist(playlist.playlist_id, isOnPlaylist[index], index)}
            >
              {isOnPlaylist[index]
                ? <CloseCircle
                  className='text-niceOrange-400'
                  variant='Bold'
                />
                : <AddCircle />}
            </Button>
          </div>
        </li>
      ))}
    </ul>
  )
}
