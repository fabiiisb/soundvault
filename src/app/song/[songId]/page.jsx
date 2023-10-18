import React from 'react'

const Page = ({ params }) => {
  const id = params.songId
  return (
    <div>{id}</div>
  )
}

export default Page
