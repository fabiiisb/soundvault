import { respMsg, respMsgWithData } from '@/utils/respMsg'
import { getConn } from '@/utils/db/dbConn'
import { dbError } from '@/utils/db/dbErrors'
import sql from 'mssql'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

export async function GET (request, { params }) {
  let pool
  const session = await getServerSession(authOptions)

  try {
    pool = await getConn()
    const result = await pool.request()
      .input('SONG_ID', sql.Int, params.singleId)
      .input('USER_ID', sql.Int, session.user.id)
      .execute('PrivateGetSong')

    if (result.returnValue === 0) {
      return respMsgWithData('Success', false, 200, result.recordset[0])
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
  const session = await getServerSession(authOptions)
  const singleName = data.SingleName
  const visibility = data.Visibility ? 1 : 0

  try {
    pool = await getConn()
    const result = await pool.request()
      .input('USER_ID', sql.Int, session.user.id)
      .input('SONG_ID', sql.Int, params.singleId)
      .input('SONG_NAME', sql.VarChar(35), singleName)
      .input('VISIBILITY', sql.Bit, visibility)
      .execute('PrivateEditSong')

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
      .input('SONG_ID', sql.Int, params.singleId)
      .input('USER_ID', sql.Int, session.user.id)
      .execute('PrivateDeleteSong')

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
