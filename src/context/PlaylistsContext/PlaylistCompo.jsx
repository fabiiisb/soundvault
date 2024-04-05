'use client'
import { useEffect, useState } from 'react'
import playlistContext from './playlistContext'
import { useSession } from 'next-auth/react'
import { FetchAddToPlaylist, FetchRemoveFromPlaylist } from '@/utils/fetchs'

const PlaylistCompo = ({ children }) => {
  const { data: session } = useSession()
  const [userPlaylists, setUserPlaylists] = useState([])

  useEffect(() => {
    if (session?.user !== undefined || null) fetchGetUserPlaylists()
  }, [session?.user.name])

  const fetchGetUserPlaylists = () => {
    fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/private/playlistsSongs`,
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
          const parsedData = JSON.parse(Object.values(data)[0])

          setUserPlaylists(parsedData)
        }
      })
      .catch(err => {
        console.error(err)
      })
  }

  const deleteObjectFromPlaylist = async (playlistId) => {
    const newPlaylist = await userPlaylists.filter(playlist => playlist.playlist_id !== playlistId)

    setUserPlaylists(newPlaylist)
  }

  const deleteSongFromPlaylist = async (songId, playlistId) => {
    const updatedUserPlaylists = [...userPlaylists]
    const updatedPlaylist = updatedUserPlaylists.find(
      (playlist) => playlist.playlist_id === playlistId
    )
    updatedPlaylist.songs = updatedPlaylist.songs.filter((song) => song !== songId)
    setUserPlaylists(updatedUserPlaylists)
  }

  const addToPlaylist = async (playlistId, songId) => {
    await FetchAddToPlaylist(playlistId, songId)
  }

  const removeFromPlaylist = async (playlistId, songId) => {
    await FetchRemoveFromPlaylist(playlistId, songId)

    deleteSongFromPlaylist(parseInt(songId), parseInt(playlistId))
  }

  return (
    <playlistContext.Provider
      value={{
        setUserPlaylists,
        userPlaylists,
        addToPlaylist,
        removeFromPlaylist,
        deleteObjectFromPlaylist
      }}
    >
      {children}
    </playlistContext.Provider>
  )
}

export default PlaylistCompo
