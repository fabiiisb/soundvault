import { respMsgWithData } from '@/utils/respMsg'
import { getConn } from '@/utils/db/dbConn'
import { dbError } from '@/utils/db/dbErrors'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import sql from 'mssql'

export async function GET (request, { params }) {
  let pool
  const session = await getServerSession(authOptions)

  try {
    pool = await getConn()
    const result = await pool.request()
      .input('ALBUM_ID', sql.Int, params.albumId)
      .input('USER_ID', sql.VarChar(20), session?.user?.id)
      .execute('GetAlbumWithSongs')

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
