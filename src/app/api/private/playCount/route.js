import { respMsg } from '@/utils/respMsg'
import { getConn } from '@/utils/db/dbConn'
import { dbError } from '@/utils/db/dbErrors'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import sql from 'mssql'

export async function PUT (request) {
  let pool
  const session = await getServerSession(authOptions)
  const songId = await request.json()

  try {
    pool = await getConn()
    const result = await pool.request()
      .input('SONG_ID', sql.Int, songId)
      .input('USER_ID', sql.Int, session.user.id)
      .execute('PrivateIncrementPlayCount')

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
