import { NextResponse } from 'next/server'

export function dbError (err, pool) {
  if (pool === undefined) {
    return NextResponse.json(
      {
        message: 'Unexpected error',
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
