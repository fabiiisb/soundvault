import { NextResponse } from 'next/server'

const respMsg = (msg, isError, statusCode) => {
  return NextResponse.json(
    {
      message: msg,
      error: isError
    },
    {
      status: statusCode
    }
  )
}

export default respMsg
