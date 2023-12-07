import zod from 'zod'

const signUpSchema = zod.object({
  EmailAddress: zod.string().min(6).max(50),
  Password: zod.string().min(6).max(100)
})

export async function validateSignIn (object) {
  return signUpSchema.safeParse(object)
}
