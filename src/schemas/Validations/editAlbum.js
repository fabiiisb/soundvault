import zod from 'zod'

const signUpSchema = zod.object({
  AlbumName: zod.string().min(3).max(50),
  Visibility: zod.boolean()
})

export async function validateEditAlbum (object) {
  return signUpSchema.safeParse(object)
}
