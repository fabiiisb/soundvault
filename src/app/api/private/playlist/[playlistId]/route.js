import { respMsg, respValMsg, respMsgWithData } from '@/utils/respMsg'
import { getConn } from '@/utils/db/dbConn'
import { dbError } from '@/utils/db/dbErrors'
import sql from 'mssql'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { validateEditPlaylist } from '@/schemas/Validations/editPlaylist'

export async function GET (request, { params }) {
  let pool
  const session = await getServerSession(authOptions)
  try {
    pool = await getConn()
    const result = await pool.request()
      .input('PLAYLIST_ID', sql.Int, params.playlistId)
      .input('USER_ID', sql.Int, session.user.id)
      .execute('PrivateGetPlaylistWithSongs')

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

export async function PUT (request, { params }) {
  let pool
  const data = await request.json()
  const validationRes = await validateEditPlaylist(data)
  if (validationRes.error) return respValMsg(validationRes.error.issues, true, 400)

  const session = await getServerSession(authOptions)
  const playlistName = data.PlaylistName
  const visibility = data.Visibility ? 1 : 0

  try {
    pool = await getConn()
    const result = await pool.request()
      .input('USER_ID', sql.Int, session.user.id)
      .input('PLAYLIST_ID', sql.Int, params.playlistId)
      .input('PLAYLIST_NAME', sql.VarChar(50), playlistName)
      .input('VISIBILITY', sql.Bit, visibility)
      .execute('PrivateEditPlaylist')

    if (result.returnValue === 0) {
      return respMsg('Success', false, 200)
    }
  } catch (err) {
    console.log(err)
    return dbError(err, pool)
  } finally {
    if (pool) {
      pool.close()
    }
  }
}

export async function DELETE (request, { params }) {
  let pool
  const session = await getServerSession(authOptions)

  try {
    pool = await getConn()
    const result = await pool.request()
      .input('PLAYLIST_ID', sql.Int, params.playlistId)
      .input('USER_ID', sql.Int, session.user.id)
      .execute('PrivateDeletePlaylist')

    if (result.returnValue === 0) {
      return respMsg('Success', false, 200)
    }
  } catch (err) {
    return dbError(err, pool)
  } finally {
    if (pool) {
      pool.close()
    }
  }
}
