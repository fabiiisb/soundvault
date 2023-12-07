import { NextResponse } from 'next/server'
import { getConn } from '@/utils/db/dbConn'
import { dbError } from '@/utils/db/dbErrors'
import { validateSignUp } from '@/schemas/Validations/signup'
import bcrypt from 'bcrypt'

export async function POST (request) {
  let pool
  const data = await request.json()
  const validationRes = await validateSignUp(data)
  const salt = 12

  if (validationRes.error) {
    return NextResponse.json(
      {
        validationError: validationRes.error.issues
      }, {
        status: 400
      }
    )
  }

  const hashedPass = HashPasswords(data.Password, salt)
  try {
    pool = await getConn()
    const result = await pool.request()
      .input('USERNAME', data.Username)
      .input('PASSWORD', hashedPass)
      .input('EMAIL_ADDRESS', data.EmailAddress)
      .input('FIRST_NAME', data.FirstName)
      .input('LAST_NAME', data.LastName)
      .execute('CreateNewUser')

    if (result.returnValue === 0) {
      return NextResponse.json(
        {
          message: 'User created successfully!',
          error: false
        },
        {
          status: 201
        }
      )
    }
  } catch (err) {
    const errorResponse = dbError(err, pool)
    return errorResponse
  } finally {
    if (pool) {
      pool.close()
    }
  }
}

const HashPasswords = (plainPass, salt) => {
  return bcrypt.hashSync(plainPass, salt)
}
