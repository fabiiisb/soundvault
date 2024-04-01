import { respMsgWithData } from '@/utils/respMsg'
import { getConn } from '@/utils/db/dbConn'
import { dbError } from '@/utils/db/dbErrors'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import sql from 'mssql'

export async function GET () {
  let pool
  const session = await getServerSession(authOptions)

  try {
    pool = await getConn()
    const result = await pool.request()
      .input('USER_ID', sql.Int, session.user.id)
      .execute('PrivateGetAllPlaylistWithSongs')

    if (result.returnValue === 0) {
      return respMsgWithData('Success', false, 200, result)
    }
  } catch (err) {
    return dbError(err, pool)
  } finally {
    if (pool) {
      pool.close()
    }
  }
}

export async function POST (request) {
  let pool
  const session = await getServerSession(authOptions)
  const { playlistId, songId } = await request.json()

  try {
    pool = await getConn()
    const result = await pool.request()
      .input('PLAYLIST_ID', sql.Int, playlistId)
      .input('SONG_ID', sql.Int, songId)
      .input('USER_ID', sql.Int, session.user.id)
      .execute('PrivateAddSongToPlaylist')
    if (result.returnValue === 0) {
      return respMsgWithData('Success', false, 200, result)
    }
  } catch (err) {
    return dbError(err, pool)
  } finally {
    if (pool) {
      pool.close()
    }
  }
}

export async function DELETE (request) {
  let pool
  const session = await getServerSession(authOptions)
  const { playlistId, songId } = await request.json()

  try {
    pool = await getConn()
    const result = await pool.request()
      .input('PLAYLIST_ID', sql.Int, playlistId)
      .input('SONG_ID', sql.Int, songId)
      .input('USER_ID', sql.Int, session.user.id)
      .execute('PrivateRemoveSongFromPlaylist')

    if (result.returnValue === 0) {
      return respMsgWithData('Success', false, 200, result)
    }
  } catch (err) {
    return dbError(err, pool)
  } finally {
    if (pool) {
      pool.close()
    }
  }
}
