import { NextRequest, NextResponse } from 'next/server'

// Mock companies data (shared with route.ts)
const mockCompanies = [
  {
    id: '1',
    name: 'Tech Solutions Inc',
    description: 'Leading provider of innovative technology solutions',
    website: 'https://techsolutions.example.com',
    employees: 150,
    status: 'active',
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z',
  },
  {
    id: '2',
    name: 'Digital Marketing Pro',
    description: 'Full-service digital marketing agency',
    website: 'https://digitalmarketing.example.com',
    employees: 75,
    status: 'active',
    createdAt: '2024-01-20T10:00:00Z',
    updatedAt: '2024-01-20T10:00:00Z',
  },
  {
    id: '3',
    name: 'Green Energy Corp',
    description: 'Renewable energy and sustainability solutions',
    website: 'https://greenenergy.example.com',
    employees: 200,
    status: 'active',
    createdAt: '2024-02-01T10:00:00Z',
    updatedAt: '2024-02-01T10:00:00Z',
  },
  {
    id: '4',
    name: 'Cloud Services Ltd',
    description: 'Enterprise cloud infrastructure and services',
    website: 'https://cloudservices.example.com',
    employees: 300,
    status: 'active',
    createdAt: '2024-02-10T10:00:00Z',
    updatedAt: '2024-02-10T10:00:00Z',
  },
  {
    id: '5',
    name: 'AI Innovations',
    description: 'Artificial intelligence and machine learning solutions',
    website: 'https://aiinnovations.example.com',
    employees: 120,
    status: 'inactive',
    createdAt: '2024-02-15T10:00:00Z',
    updatedAt: '2024-02-15T10:00:00Z',
  },
]

// Store for in-memory CRUD operations
let companiesStore = [...mockCompanies]

const ensureAdmin = (request: NextRequest) => {
  const token = request.cookies.get('auth-token')?.value
  const role = request.cookies.get('auth-role')?.value

  if (!token) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
  }

  if (role !== 'admin') {
    return NextResponse.json({ message: 'Forbidden' }, { status: 403 })
  }

  return null
}

// GET - Fetch single company by ID
export async function GET(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    const guard = ensureAdmin(request)
    if (guard) return guard

    const { id } = await context.params

    const company = companiesStore.find((c) => c.id === id)

    if (!company) {
      return NextResponse.json({ message: 'Company not found' }, { status: 404 })
    }

    return NextResponse.json(company, { status: 200 })
  } catch (error) {
    return NextResponse.json({ message: 'Failed to fetch company' }, { status: 500 })
  }
}

// PUT - Update company
export async function PUT(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    const guard = ensureAdmin(request)
    if (guard) return guard

    const { id } = await context.params
    const body = await request.json()

    const companyIndex = companiesStore.findIndex((c) => c.id === id)

    if (companyIndex === -1) {
      return NextResponse.json({ message: 'Company not found' }, { status: 404 })
    }

    // Update company
    const updatedCompany = {
      ...companiesStore[companyIndex],
      ...body,
      id, // Ensure ID doesn't change
      updatedAt: new Date().toISOString(),
    }

    companiesStore[companyIndex] = updatedCompany

    return NextResponse.json(updatedCompany, { status: 200 })
  } catch (error) {
    return NextResponse.json({ message: 'Failed to update company' }, { status: 500 })
  }
}

// DELETE - Delete company
export async function DELETE(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    const guard = ensureAdmin(request)
    if (guard) return guard

    const { id } = await context.params

    const companyIndex = companiesStore.findIndex((c) => c.id === id)

    if (companyIndex === -1) {
      return NextResponse.json({ message: 'Company not found' }, { status: 404 })
    }

    // Remove company from store
    companiesStore.splice(companyIndex, 1)

    return NextResponse.json({ message: 'Company deleted successfully' }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ message: 'Failed to delete company' }, { status: 500 })
  }
}
