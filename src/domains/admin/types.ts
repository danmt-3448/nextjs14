export interface Company {
  id: string
  name: string
  description?: string
  logo?: string
  website?: string
  employees?: number
  status: 'active' | 'inactive'
  createdAt: string
  updatedAt: string
}

export interface CreateCompanyRequest {
  name: string
  description?: string
  website?: string
  employees?: number
}

export interface UpdateCompanyRequest extends Partial<CreateCompanyRequest> {
  status?: 'active' | 'inactive'
}
