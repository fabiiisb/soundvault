import { respMsg, respMsgWithData } from '@/utils/respMsg'
import { getConn } from '@/utils/db/dbConn'
import { dbError } from '@/utils/db/dbErrors'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import sql, { MAX } from 'mssql'
import { v2 as cloudinary } from 'cloudinary'
import { fileToBuffer } from '@/utils/functions'

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
})

export async function POST (request) {
  let pool
  const session = await getServerSession(authOptions)
  const songData = await request.formData()

  const songName = songData.get('songName')
  const songDuration = songData.get('songDuration')
  const image = songData.get('croppedImgUrl')
  const song = songData.get('newSongUrl')

  const imgBuffer = await fileToBuffer(image)
  const songBuffer = await fileToBuffer(song)

  const responseImg = await new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream({
      resource_type: 'image',
      folder: 'singleImage',
      transformation: [
        { width: 250, height: 250, crop: 'fill' }
      ]
    }, (err, res) => {
      if (err) {
        reject(err)
        return respMsg(err, true, 400)
      }

      resolve(res)
    }).end(imgBuffer)
  })

  const responseSong = await new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream({
      resource_type: 'video',
      folder: 'singles',
      transformation: [
        { audio_codec: 'mp3', bit_rate: '64k' }
      ]
    }, (err, res) => {
      if (err) {
        reject(err)
        return respMsg(err, true, 400)
      }

      resolve(res)
    }).end(songBuffer)
  })

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
