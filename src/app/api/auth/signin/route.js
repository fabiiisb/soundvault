import respMsg from '@/utils/respMsg'
import { getConn } from '@/utils/db/dbConn'
import { dbError } from '@/utils/db/dbErrors'
import { validateSignIn } from '@/schemas/Validations/signin'
import bcrypt from 'bcrypt'

export async function POST (request) {
  let pool
  const data = await request.json()
  const validationRes = await validateSignIn(data)
  const emailData = data.EmailAddress
  const passData = data.Password

  if (validationRes.error) {
    return respMsg(validationRes.error.issues, true, 400)
  }

  try {
    pool = await getConn()
    const result = await pool.request()
      .input('EMAIL_ADDRESS', emailData)
      .execute('AuthLogin')

    if (result.returnValue === 0) {
      const hashedPass = result.recordset[0].Password
      const isMatch = bcrypt.compareSync(passData, hashedPass)

      if (isMatch) {
        return respMsg('Login Success!!', false, 200)
      } else {
        return respMsg('Incorrect Password', true, 409)
      }
    }
  } catch (err) {
    return dbError(err, pool)
  } finally {
    if (pool) {
      pool.close()
    }
  }
}
