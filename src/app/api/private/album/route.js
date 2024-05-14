import { respMsgWithData } from '@/utils/respMsg'
import { getConn } from '@/utils/db/dbConn'
import { dbError } from '@/utils/db/dbErrors'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { uploadImageCloudinary, uploadMultipleSongsCloudinary } from '@/utils/cloundinaryUtils'
import sql, { MAX } from 'mssql'

export async function GET () {
  let pool
  const session = await getServerSession(authOptions)

  try {
    pool = await getConn()
    const result = await pool.request()
      .input('USER_ID', sql.Int, session.user.id)
      .execute('PrivateGetAllAlbumsFromUser')

    if (result.returnValue === 0) {
      return respMsgWithData('Success', false, 200, result)
    }
  } catch (err) {
    return dbError(err, pool)
  } finally {
    if (pool) {
      pool.close()
    }
  }
}

export async function POST (request) {
  let pool
  let index = 0
  const songs = []
  const filteredSongs = []

  const session = await getServerSession(authOptions)
  const formData = await request.formData()
  const albumName = formData.get('albumName')
  const croppedImgFile = formData.get('croppedImgUrl')

  while (formData.has(`songFile[${index}]`)) {
    const songFile = formData.get(`songFile[${index}]`)
    const songName = formData.get(`songName[${index}]`)
    const songDuration = formData.get(`songDuration[${index}]`)

    songs.push({
      file: songFile,
      name: songName,
      duration: songDuration
    })

    index++
  }

  const responseImg = await uploadImageCloudinary(croppedImgFile, 'albumImage')
  const responseSongs = await uploadMultipleSongsCloudinary(songs, 'albumSongs')

  responseSongs.map((song) => (
    filteredSongs.push({
      user_id: session.user.id,
      name: song.name,
      duration: song.duration,
      song_url: song.secure_url,
      cloud_song_public_id: song.public_id,
      image_url: responseImg.secure_url,
      cloud_img_public_id: responseImg.public_id
    })
  ))

  const jsonSongs = JSON.stringify(filteredSongs)

  try {
    pool = await getConn()
    const result = await pool.request()
      .input('USER_ID', sql.Int, session.user.id)
      .input('ALBUM_NAME', sql.VarChar(50), albumName)
      .input('SONG_ARRAY', sql.NVarChar(MAX), jsonSongs)
      .execute('PrivateUploadNewAlbumWithSongs')

    if (result.returnValue === 0) {
      return respMsgWithData('Success', false, 200, result.recordset[0].albumId)
    } else {
      console.log(result)
    }
  } catch (err) {
    console.log(err)
    return dbError(err, pool)
  } finally {
    if (pool) {
      pool.close()
    }
  }
}
