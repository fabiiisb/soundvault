import { respMsg, respMsgWithData } from '@/utils/respMsg'
import { getConn } from '@/utils/db/dbConn'
import { dbError } from '@/utils/db/dbErrors'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import bcrypt from 'bcrypt'
import sql from 'mssql'

export async function GET () {
  let pool
  const session = await getServerSession(authOptions)

  try {
    pool = await getConn()
    const result = await pool.request()
      .input('USER_ID', sql.Int, session.user.id)
      .execute('PrivateGetAllDataUser')

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

export async function PUT (request) {
  let pool
  const session = await getServerSession(authOptions)
  const data = await request.json()
  const password = data.password

  try {
    pool = await getConn()
    const authResult = await pool.request()
      .input('USER_ID', sql.Int, session.user.id)
      .execute('AuthPassword')

    if (authResult.returnValue === 0) {
      const hashedPass = authResult.recordset[0].password

      const isMatch = bcrypt.compareSync(password, hashedPass)

      if (isMatch) {
        const result = await pool.request()
          .input('USER_ID', sql.Int, session.user.id)
          .input('NAME', sql.VarChar(50), data.first_name)
          .input('LASTNAME', sql.VarChar(50), data.last_name)
          .execute('PrivateUpdateDataUser')

        if (result.returnValue === 0) {
          return respMsg('Success', false, 200)
        } else {
          throw new Error('Unexpected error')
        }
      } else {
        return respMsg('Bad password', false, 401)
      }
    } else {
      throw new Error('Unexpected error')
    }
  } catch (err) {
    return dbError(err, pool)
  } finally {
    if (pool) {
      pool.close()
    }
  }
}
