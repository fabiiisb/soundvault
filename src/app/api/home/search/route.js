import { respMsgWithData } from '@/utils/respMsg'
import { getConn } from '@/utils/db/dbConn'
import { dbError } from '@/utils/db/dbErrors'
import sql from 'mssql'

export async function POST (request) {
  let pool
  const data = await request.json()

  const cleanInput = (input) => {
    return input.replace(/[^\w\s]/gi, '')
  }

  const cleanSearchParams = cleanInput(data.searchParams.trim())

  if (cleanSearchParams.length === 0) {
    return respMsgWithData('Success', false, 200, [])
  }

  try {
    pool = await getConn()
    const result = await pool.request()
      .input('SearchParams', sql.NVarChar(100), cleanSearchParams)
      .input('Scope', sql.NVarChar(50), data.scope)
      .execute('ExecuteSearch')

    if (result.returnValue === 0) {
      return respMsgWithData('Success', false, 200, result.recordset)
    }
  } catch (err) {
    return dbError(err, pool)
  } finally {
    if (pool) {
      pool.close()
    }
  }
}
