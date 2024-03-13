'use client'
import { useState } from 'react'
import likeContext from './likeContext'

const LikeCompo = ({ children }) => {
  const [songList, setSongList] = useState([
    {
      songId: 1,
      songName: 'Lorem ipsum dolor sit, amet consectetur adipisicda',
      songDuration: '3:36',
      ownerUsername: 'Fabiiisb',
      songUrl: 'https://audiocdn.epidemicsound.com/ES_ITUNES/The%20Postman/ES_The%20Postman.mp3',
      isLiked: false
    },
    {
      songId: 2,
      songName: 'The Storyteller',
      songDuration: '3:36',
      ownerUsername: 'user1',
      songUrl: 'https://audiocdn.epidemicsound.com/ES_ITUNES/The%20Storyteller/ES_The%20Storyteller.mp3',
      isLiked: true
    },
    {
      songId: 3,
      songName: 'Secrets of the Mind',
      songDuration: '7:47',
      ownerUsername: 'user2',
      songUrl: 'https://audiocdn.epidemicsound.com/ES_ITUNES/0koJZQ_Secrets%20of%20the%20Mind/ES_Secrets%20of%20the%20Mind.mp3',
      isLiked: false
    },
    {
      songId: 4,
      songName: 'corto',
      songDuration: '0:13',
      ownerUsername: 'fabiiisb',
      songUrl: 'https://audiocdn.epidemicsound.com/ES_ITUNES/Multimedia%20770/ES_Multimedia%20770.mp3',
      isLiked: true
    }
  ])

  const handleLikeSong = (songId) => {
    const updatedList = songList.map(song =>
      song.songId === songId ? { ...song, isLiked: !song.isLiked } : song
    )
    setSongList(updatedList)

    const selectedSong = updatedList.find(song => song.songId === songId)

    console.log(
      '%cLa canción: %c' + songId + '%c cambiara su like a: %c' + selectedSong.isLiked,
      'color: #09F76CA4;',
      'color: royalblue;',
      'color: #09F76CA4;',
      'color: royalblue;'
    )
  }

  return (
  <likeContext.Provider
    value={{
      songList,
      handleLikeSong
    }}
  >
    {children}
  </likeContext.Provider>
  )
}

export default LikeCompo
