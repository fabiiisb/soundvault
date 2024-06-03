import { respMsg, respValMsg, respMsgWithData } from '@/utils/respMsg'
import { getConn } from '@/utils/db/dbConn'
import { dbError } from '@/utils/db/dbErrors'
import sql from 'mssql'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { validateEditAlbum } from '@/schemas/Validations/editAlbum'
import { deleteImageCloudinary, deleteSongCloudinary } from '@/utils/cloundinaryUtils'

export async function GET (request, { params }) {
  let pool
  const session = await getServerSession()
  try {
    pool = await getConn()
    const result = await pool.request()
      .input('ALBUM_ID', sql.Int, params.albumId)
      .input('USERNAME', sql.VarChar(20), session.user.name)
      .execute('PrivateGetAlbumWithSongs')

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

export async function PUT (request, { params }) {
  let pool
  const data = await request.json()
  const validationRes = await validateEditAlbum(data)
  if (validationRes.error) return respValMsg(validationRes.error.issues, true, 400)

  const session = await getServerSession(authOptions)
  const albumName = data.AlbumName
  const visibility = data.Visibility ? 1 : 0

  try {
    pool = await getConn()
    const result = await pool.request()
      .input('USER_ID', sql.Int, session.user.id)
      .input('ALBUM_ID', sql.Int, params.albumId)
      .input('ALBUM_NAME', sql.VarChar(50), albumName)
      .input('VISIBILITY', sql.Bit, visibility)
      .execute('PrivateEditAlbum')

    if (result.returnValue === 0) {
      return respMsg('Success', false, 200)
    }
  } catch (err) {
    return dbError(err, pool)
  } finally {
    if (pool) {
      pool.close()
    }
  }
}

export async function DELETE (request, { params }) {
  let pool
  const session = await getServerSession(authOptions)

  try {
    pool = await getConn()

    const publicIds = await pool.request()
      .input('USER_ID', sql.Int, session.user.id)
      .input('ALBUM_ID', sql.Int, params.albumId)
      .execute('PrivateGetAlbumAndSongsCloudIds')

    const cloudImgPublicId = publicIds.recordsets[0][0].cloud_img_public_id
    const cloudSongsPublicIds = publicIds.recordsets[1]
    const cloudSongPublicIdsArray = cloudSongsPublicIds.map(item => item.cloud_song_public_id)

    const deleteResponseImg = await deleteImageCloudinary(cloudImgPublicId, 'albumImage')

    const deleteResponseSongs = await deleteSongCloudinary(cloudSongPublicIdsArray, 'albumSongs')

    const allItemsDeleted = (deleteResponse) => {
      return Object.values(deleteResponse.deleted).every(status => status === 'deleted')
    }

    if (allItemsDeleted(deleteResponseImg) && allItemsDeleted(deleteResponseSongs)) {
      const result = await pool.request()
        .input('USER_ID', sql.Int, session.user.id)
        .input('ALBUM_ID', sql.Int, params.albumId)
        .execute('PrivateDeleteAlbum')

      if (result.returnValue === 0) {
        return respMsg('Success', false, 200)
      } else {
        throw new Error('Unexpected error')
      }
    } else {
      throw new Error('Unexpected error')
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
