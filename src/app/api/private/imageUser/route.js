import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import sql, { MAX } from 'mssql'
import { updateImageCloudinary } from '@/utils/cloundinaryUtils'
import { getConn } from '@/utils/db/dbConn'
import { dbError } from '@/utils/db/dbErrors'
import { respMsgWithData } from '@/utils/respMsg'

export async function PUT (request, { params }) {
  let pool
  const session = await getServerSession(authOptions)
  const data = await request.formData()
  const fileImage = data.get('croppedImgFile')

  try {
    pool = await getConn()
    const result = await pool.request()
      .input('USER_ID', sql.Int, session.user.id)
      .execute('PrivateGetUserImagePublicId')

    if (result.returnValue === 0) {
      const publicId = await result.recordset[0].cloud_img_public_id

      const response = await updateImageCloudinary(fileImage, publicId, 'userImage')

      if (response && response.public_id && response.secure_url) {
        const result = await pool.request()
          .input('USER_ID', sql.Int, session.user.id)
          .input('NEW_IMAGE_URL', sql.NVarChar(MAX), response.secure_url)
          .execute('PrivateUpdateUserImage')

        if (result.returnValue === 0) return respMsgWithData('Success', false, 200, response.secure_url)
        else throw new Error(result)
      } else {
        throw new Error('Cannot update the image')
      }
    } else {
      throw new Error(result)
    }
  } catch (err) {
    return dbError(err, pool)
  } finally {
    if (pool) {
      pool.close()
    }
  }
}
