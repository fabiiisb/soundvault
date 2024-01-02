import { respMsgWithData } from '@/utils/respMsg'
import { getConn } from '@/utils/db/dbConn'
import { dbError } from '@/utils/db/dbErrors'
import sql from 'mssql'

export async function GET (request, { params }) {
  let pool

  try {
    pool = await getConn()
    const result = await pool.request()
      .input('PLAYLIST_ID', sql.Int, params.playlistId)
      .execute('GetPlaylistWithSongs')

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
