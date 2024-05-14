import { v2 as cloudinary } from 'cloudinary'
import { fileToBuffer } from '@/utils/functions'
import { respMsg } from './respMsg'

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
})

export const uploadImageCloudinary = async (img, folderName) => {
  const imgBuffer = await fileToBuffer(img)

  const response = await new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream({
      resource_type: 'image',
      folder: folderName,
      transformation: [
        { width: 250, height: 250, crop: 'fill' }
      ]
    }, (err, res) => {
      if (err) {
        reject(err)
        return respMsg(err, true, 400)
      }

      return resolve(res)
    }).end(imgBuffer)
  })

  return response
}

export const uploadSongCloudinary = async (song, folderName) => {
  const songBuffer = await fileToBuffer(song)

  const response = await new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream({
      resource_type: 'video',
      folder: folderName,
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

  return response
}

export const uploadMultipleSongsCloudinary = async (songs, folderName) => {
  const uploadPromises = songs.map(async (song) => {
    const uploadResult = await uploadSongCloudinary(song.file, folderName)

    return {
      ...uploadResult,
      name: song.name,
      duration: song.duration
    }
  })

  const uploadResults = await Promise.all(uploadPromises)

  return uploadResults
}
