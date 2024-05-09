import { respMsgWithData } from '@/utils/respMsg'
import { getConn } from '@/utils/db/dbConn'
import { dbError } from '@/utils/db/dbErrors'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import sql, { MAX } from 'mssql'
import { uploadSongCloudinary, uploadImageCloudinary } from '@/utils/cloundinaryUtils'

export async function POST (request) {
  let pool
  const session = await getServerSession(authOptions)
  const songData = await request.formData()

  const songName = songData.get('songName')
  const songDuration = songData.get('songDuration')
  const image = songData.get('croppedImgUrl')
  const song = songData.get('newSongUrl')

  const responseImg = await uploadImageCloudinary(image, 'singleImage')
  const responseSong = await uploadSongCloudinary(song, 'singles')

  const imgSecureUrl = responseImg.secure_url
  const imgPublicId = responseImg.public_id

  const songSecureUrl = responseSong.secure_url
  const songPublicId = responseSong.public_id

  try {
    pool = await getConn()
    const result = await pool.request()
      .input('USER_ID', sql.Int, session.user.id)
      .input('CLOUD_IMG_PUBLIC_ID', sql.NVarChar(MAX), imgPublicId)
      .input('CLOUD_SONG_PUBLIC_ID', sql.NVarChar(MAX), songPublicId)
      .input('SONG_NAME', sql.VarChar(35), songName)
      .input('SONG_DURATION', sql.VarChar(8), songDuration)
      .input('IMAGE_URL', sql.NVarChar(MAX), imgSecureUrl)
      .input('SONG_URL', sql.NVarChar(MAX), songSecureUrl)
      .execute('PrivateUploadNewSingle')
    if (result.returnValue === 0) {
      return respMsgWithData('Success', false, 200, result.recordset[0].songId)
    }
  } catch (err) {
    return dbError(err, pool)
  } finally {
    if (pool) {
      pool.close()
    }
  }
}
