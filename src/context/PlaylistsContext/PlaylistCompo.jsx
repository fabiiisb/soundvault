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
          console.log(parsedData)
        }
      })
      .catch(err => {
        console.error(err)
      })
  }

  const addToPlaylist = async (playlistId, songId) => {
    await FetchAddToPlaylist(playlistId, songId)
  }

  const removeFromPlaylist = async (playlistId, songId) => {
    await FetchRemoveFromPlaylist(playlistId, songId)
  }

  return (
    <playlistContext.Provider
      value={{
        setUserPlaylists,
        userPlaylists,
        addToPlaylist,
        removeFromPlaylist
      }}
    >
      {children}
    </playlistContext.Provider>
  )
}

export default PlaylistCompo
