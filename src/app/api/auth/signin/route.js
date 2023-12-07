import { NextResponse } from 'next/server'
import { getConn } from '@/utils/db/dbConn'
import { dbError } from '@/utils/db/dbErrors'
import bcrypt from 'bcrypt'
// import pc from 'picocolors'

export async function POST (request) {
  let pool
  const data = await request.json()
  const emailData = data.EmailAddress
  const passData = data.Password
  // VALIDACIONES ZOD
  // return NextResponse.json(data)

  try {
    pool = await getConn()
    const result = await pool.request()
      .input('EMAIL_ADDRESS', emailData)
      .execute('AuthLogin')

    if (result.returnValue === 0) {
      // console.log(pc.green('SUCCESS'))
      const hashedPass = result.recordset[0].Password
      const isMatch = bcrypt.compareSync(passData, hashedPass)

      if (isMatch) {
        return NextResponse.json(
          {
            message: 'Login Success!!',
            error: false
          },
          {
            status: 200
          }
        )
      } else {
        return NextResponse.json(
          {
            message: 'Incorrect Password',
            error: true
          },
          {
            status: 409
          }
        )
      }
    }
  } catch (err) {
    // console.log(pc.red('ERROR'))
    const errorResponse = dbError(err, pool)
    return errorResponse
  } finally {
    if (pool) {
      pool.close()
    }
  }
}
