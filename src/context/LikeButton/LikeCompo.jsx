'use client'
import { useState, useEffect } from 'react'
import likeContext from './likeContext'
import { FetchAddLike, FetchRemoveLike } from '@/utils/fetchs'
const LikeCompo = ({ children }) => {
  const [likedList, setLikedList] = useState([])

  useEffect(() => {
    fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/private/likes`,
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
          setLikedList(data)
        }
      })
      .catch(err => {
        console.error(err)
      })
  }, [])

  const addToLikePlaylist = async (songId) => {
    const exists = likedList.some(item => item.songId === songId)
    if (!exists) {
      await FetchAddLike(songId)

      setLikedList(prevList => [...prevList, { songId }])
    }
  }

  const removeFromLikePlaylist = async (songId) => {
    const updatedList = likedList.filter(item => item.songId !== songId)
    if (updatedList.length !== likedList.length) {
      await FetchRemoveLike(songId)

      setLikedList(updatedList)
    }
  }

  return (
    <likeContext.Provider
      value={{
        likedList,
        addToLikePlaylist,
        removeFromLikePlaylist
      }}
    >
      {children}
    </likeContext.Provider>
  )
}

export default LikeCompo
