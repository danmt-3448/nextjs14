import { z } from 'zod'

export const updateProfileSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  avatar: z.string().url().optional(),
})

export type UpdateProfileFormData = z.infer<typeof updateProfileSchema>
