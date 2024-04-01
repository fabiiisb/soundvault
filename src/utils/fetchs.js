// Likes
export const FetchAddLike = async (songId) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/private/likes`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(songId)
      }
    )

    const data = await response.json()

    if (!data.error) {
      return data
    } else {
      throw new Error(data.error)
    }
  } catch (err) {
    console.error(err)
    throw err
  }
}

export const FetchRemoveLike = async (songId) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/private/likes`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(songId)
      }
    )

    const data = await response.json()

    if (!data.error) {
      return data
    } else {
      throw new Error(data.error)
    }
  } catch (error) {
    console.error(error)
    throw error
  }
}
// Likes

// Playlists

export const FetchAddToPlaylist = async (playlistId, songId) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/private/playlistsSongs`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ playlistId, songId })
      }
    )

    const data = await response.json()

    if (!data.error) {
      return data
    } else {
      throw new Error(data.error)
    }
  } catch (err) {
    console.error(err)
    throw err
  }
}

export const FetchRemoveFromPlaylist = async (playlistId, songId) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/private/playlistsSongs`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ playlistId, songId })
      }
    )

    const data = await response.json()

    if (!data.error) {
      return data
    } else {
      throw new Error(data.error)
    }
  } catch (error) {
    console.error(error)
    throw error
  }
}

// Playlists
