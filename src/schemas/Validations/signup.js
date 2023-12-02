import zod from 'zod'

const signUpSchema = zod.object({
  Username: zod.string().min(4).max(20),
  Password: zod.string().min(6).max(60),
  EmailAddress: zod.string().min(6).max(50),
  FirstName: zod.string().min(3).max(50),
  LastName: zod.string().min(3).max(50)
})

export async function validateSignUp (object) {
  return signUpSchema.safeParse(object)
}
