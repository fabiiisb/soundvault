import zod from 'zod'

const signUpSchema = zod.object({
  PlaylistName: zod.string().min(3).max(50),
  Visibility: zod.boolean()
})

export async function validateEditPlaylist (object) {
  return signUpSchema.safeParse(object)
}
