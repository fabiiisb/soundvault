import { respMsg, respValMsg, respMsgWithData } from '@/utils/respMsg'
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
    return respValMsg(validationRes.error.issues, true, 400)
  }

  try {
    pool = await getConn()
    const result = await pool.request()
      .input('EMAIL_ADDRESS', emailData)
      .execute('AuthLogin')

    if (result.returnValue === 0) {
      const hashedPass = result.recordset[0].password

      const isMatch = bcrypt.compareSync(passData, hashedPass)

      if (isMatch) {
        const data = {
          username: result.recordset[0].username,
          email: result.recordset[0].email_address,
          firstName: result.recordset[0].first_name,
          lastName: result.recordset[0].last_name,
          imgUrl: result.recordset[0].image_url
        }

        return respMsgWithData('Login Success!!', false, 200, data)
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
