import { respMsgWithData } from '@/utils/respMsg'
import { getConn } from '@/utils/db/dbConn'
import { dbError } from '@/utils/db/dbErrors'

export async function GET (request, { params }) {
  let pool

  try {
    pool = await getConn()
    const result = await pool.request()
      .input('SONG_ID', params.songId)
      .execute('GetSong')

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
