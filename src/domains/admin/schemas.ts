import { z } from 'zod'

export const createCompanySchema = z.object({
  name: z.string().min(1, 'Company name is required'),
  description: z.string().optional(),
  website: z.string().url('Invalid URL').optional().or(z.literal('')),
  employees: z.number().int().positive().optional(),
})

export const updateCompanySchema = createCompanySchema.partial().extend({
  status: z.enum(['active', 'inactive']).optional(),
})

export type CreateCompanyFormData = z.infer<typeof createCompanySchema>
export type UpdateCompanyFormData = z.infer<typeof updateCompanySchema>
