import { NextResponse } from 'next/server'
import { getConn } from '@/utils/mssqlConn'

export async function POST (request) {
  const {
    Username,
    EmailAddress,
    Password,
    FirstName,
    LastName
  } = await request.json()

  let pool

  try {
    pool = await getConn()
    const result = await pool
      .request()
      .input('USERNAME', Username)
      .input('PASSWORD', Password)
      .input('EMAIL_ADDRESS', EmailAddress)
      .input('FIRST_NAME', FirstName)
      .input('LAST_NAME', LastName)
      .execute('CreateNewUser')

    if (result.returnValue === 0) {
      return NextResponse.json({
        message: 'user created successfully'
      })
    }
  } catch (err) {
    if (pool === undefined) {
      return NextResponse.json({
        error: 'Error connecting to the database'
      })
    }

    if (err.message.includes('Username already exists')) {
      return NextResponse.json({
        error: 'Username already exists'
      })
    } else if (err.message.includes('Email address already exists')) {
      return NextResponse.json({
        error: 'Email address already exists'
      })
    } else {
      return NextResponse.json({
        error: 'There was an error processing the request.'
      })
    }
  } finally {
    if (pool) {
      pool.close()
    }
  }
}
