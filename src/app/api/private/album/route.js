import { respMsgWithData } from '@/utils/respMsg'
import { getConn } from '@/utils/db/dbConn'
import { dbError } from '@/utils/db/dbErrors'
import { getServerSession } from 'next-auth'
import sql from 'mssql'

export async function GET () {
  let pool
  const session = await getServerSession()

  try {
    pool = await getConn()
    const result = await pool.request()
      .input('USERNAME', sql.VarChar(20), session.user.name)
      .execute('PrivateGetAllAlbumsFromUser')

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
