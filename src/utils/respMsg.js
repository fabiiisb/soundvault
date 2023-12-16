import { NextResponse } from 'next/server'

export const respMsg = (msg, isError, statusCode) => {
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

export const respValMsg = (msg, isError, statusCode) => {
  return NextResponse.json(
    {
      validationError: msg,
      error: isError
    },
    {
      status: statusCode
    }
  )
}

export const respMsgWithData = (msg, isError, statusCode, data) => {
  return NextResponse.json(
    {
      message: msg,
      error: isError,
      data
    },
    {
      status: statusCode
    }
  )
}
