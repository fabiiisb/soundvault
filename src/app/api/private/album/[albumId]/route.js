import { respMsgWithData } from '@/utils/respMsg'
import { getConn } from '@/utils/db/dbConn'
import { dbError } from '@/utils/db/dbErrors'
import sql from 'mssql'
import { getServerSession } from 'next-auth'

export async function GET (request, { params }) {
  let pool
  const session = await getServerSession()
  try {
    pool = await getConn()
    const result = await pool.request()
      .input('ALBUM_ID', sql.Int, params.albumId)
      .input('USERNAME', sql.VarChar(20), session.user.name)
      .execute('PrivateGetAlbumWithSongs')

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
