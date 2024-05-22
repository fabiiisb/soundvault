'use client'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Tooltip, CircularProgress, Input } from '@nextui-org/react'
import { ArchiveAdd, AddCircle, CloseCircle, Add, Minus } from 'iconsax-react'
import { useState, useContext, useEffect } from 'react'
import playlistContext from '@/context/PlaylistsContext/playlistContext'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function AddToPlaylistModal ({ songId }) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { userPlaylists, setUserPlaylists } = useContext(playlistContext)
  const [playlistData, setPlaylistData] = useState()
  const [saved, setSaved] = useState(false)
  const [isLoadingBtn, setIsLoadingBtn] = useState(false)
  const [isShowForm, setIsShowForm] = useState(false)
  const [inputPlaylistName, setInputPlaylistName] = useState('')
  const [valPlaylistName, setValPlaylistName] = useState(false)
  const [errorPlaylistName, setErrorPlaylistName] = useState('')

  const router = useRouter()
  const { data: session } = useSession()

  useEffect(() => {
    const isSaved = userPlaylists.some(playlist => playlist.songs.includes(songId))
    setSaved(isSaved)
  }, [songId, userPlaylists])

  const fetchGetAllPlaylists = () => {
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
        }
      })
      .catch(err => {
        console.error(err)
      })
  }

  const getAllPlaylists = () => {
    if (session?.user) {
      onOpen()
      fetchGetAllPlaylists()
    } else {
      router.push('/auth/login')
    }
  }

  const handleCreatePlaylistClick = () => {
    setIsShowForm(!isShowForm) // Toggle form visibility on button click
  }

  const handleSetPlaylistName = (ev) => {
    const newPlaylistName = ev.target.value
    const truncatedInput = newPlaylistName.slice(0, 50)

    setInputPlaylistName(truncatedInput)
  }

  const validNewPlaylist = () => {
    if (inputPlaylistName.length === 0) {
      setErrorPlaylistName('Playlist name cannot be empty')
      setValPlaylistName(true)

      return false
    } else if (inputPlaylistName.length < 3) {
      setErrorPlaylistName('Your playlist name must contain at least 3 characters')
      setValPlaylistName(true)
    } else {
      setValPlaylistName(false)

      return true
    }
  }

  const submitNewPlaylists = (e) => {
    e.preventDefault()

    const validation = validNewPlaylist()

    if (validation === true) {
      setIsLoadingBtn(true)
      const playlistName = String(inputPlaylistName.trim())

      const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(playlistName)
      }

      fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/private/playlist`, options)
        .then(response => response.json())
        .then(res => {
          if (res.error) {
            if (res.validationError) {
              console.log(res.validationError)
              throw new Error('Validation error')
            } else {
              const msgError = res.message
              console.log(msgError)

              return setIsLoadingBtn(false)
            }
          } else {
            const newData = res.data.recordset[0]

            const newPlaylistData = [...playlistData]
            newPlaylistData.push(newData)
            setPlaylistData(newPlaylistData)

            const newUserPlaylistData = [
              ...userPlaylists,
              {
                playlist_id: newData.playlist_id,
                songs: []
              }
            ]
            setUserPlaylists(newUserPlaylistData)

            setIsLoadingBtn(false)
          }
        })
        .catch(err => {
          if (err.message === 'Validation error') {
            console.log('validation error')
          } else {
            console.log('Unexpected error')
          }
          setIsLoadingBtn(false)
        })
    }
  }

  return (
    <>
      <Tooltip
        content={'Add to playlist'}
        closeDelay={100}
      >
        <Button
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

      <Modal isOpen={isOpen} onClose={onClose} backdrop='blur' scrollBehavior={'inside'} placement={'center'}>
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            Add to playlist
          </ModalHeader>
          <ModalBody>

            <div className='flex flex-col gap-3'>
              <Button
                className={'bg-foreground/10 data-[hover]:text-niceOrange-400'}
                variant="light"
                onClick={handleCreatePlaylistClick}
              >
                Create new playlist {isShowForm ? <Minus /> : <Add />}
              </Button>

              {isShowForm && (
                <form className='flex gap-1' onSubmit={submitNewPlaylists}>
                  <Input
                    type="text"
                    label="Playlist name"
                    size='sm'
                    placeholder="Enter your playlist name"
                    color={valPlaylistName ? 'danger' : ''}
                    isInvalid={valPlaylistName}
                    errorMessage={valPlaylistName && errorPlaylistName}
                    value={inputPlaylistName}
                    onChange={handleSetPlaylistName}
                  />

                  <Button
                    isIconOnly
                    className={'bg-foreground/10 data-[hover]:text-niceOrange-400 h-auto w-20'}
                    variant="light"
                    isLoading={isLoadingBtn}
                    type='submit'
                  >
                    <Add />
                  </Button>
                </form>
              )}
            </div>

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

      {list.length !== 0
        ? list.map((playlist, index) => (
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
        ))
        : <p className='mx-auto font-semibold'>You don&apos;t have any playlists created</p>
      }
    </ul>
  )
}
