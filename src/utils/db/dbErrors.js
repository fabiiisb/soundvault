import { NextResponse } from 'next/server'

export function dbSignUpErr (err, pool) {
  if (pool === undefined) {
    return NextResponse.json(
      {
        message: 'Error connecting to the database or invalid JSON',
        error: true
      }, {
        status: 500
      }
    )
  }

  return NextResponse.json(
    {
      message: err.message,
      error: true
    }, {
      status: 409
    }
  )
}
