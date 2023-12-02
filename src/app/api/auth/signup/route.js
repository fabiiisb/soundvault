import { NextResponse } from 'next/server'
import { getConn } from '@/utils/db/dbConn'
import { dbSignUpErr } from '@/utils/db/dbErrors'
import { validateSignUp } from '@/schemas/Validations/signup'

export async function POST (request) {
  let pool

  const data = await request.json()
  const validationRes = await validateSignUp(data)

  if (validationRes.error) {
    return NextResponse.json(
      {
        error: validationRes.error.issues
      }, {
        status: 400
      }
    )
  }

  // falta encriptar password, escape de datos

  try {
    pool = await getConn()
    const result = await pool.request()
      .input('USERNAME', data.Username)
      .input('PASSWORD', data.Password)
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
    const errorResponse = dbSignUpErr(err, pool)
    return errorResponse
  } finally {
    if (pool) {
      pool.close()
    }
  }
}
