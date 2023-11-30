import { NextResponse } from 'next/server'

export function dbSignUpErr (err) {
  if (err.message.includes('Username already exists')) {
    return NextResponse.json(
      {
        message: 'Username already exists.',
        error: true
      }, {
        status: 409
      }
    )
  } else if (err.message.includes('Email address already exists')) {
    return NextResponse.json(
      {
        message: 'Email address already exists.',
        error: true
      }, {
        status: 409
      }
    )
  } else {
    return NextResponse.json(
      {
        message: 'There was an error processing the request.',
        error: true
      }, {
        status: 400
      }
    )
  }
}
