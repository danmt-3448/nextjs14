import { NextRequest, NextResponse } from 'next/server'

// Mock companies data using free API structure
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

// GET - Fetch all companies
export async function GET(request: NextRequest) {
  try {
    const guard = ensureAdmin(request)
    if (guard) return guard

    // You can also fetch from a real free API:
    // const response = await fetch('https://jsonplaceholder.typicode.com/users')
    // const users = await response.json()
    // Transform users to companies format...

    return NextResponse.json(companiesStore, { status: 200 })
  } catch (error) {
    return NextResponse.json({ message: 'Failed to fetch companies' }, { status: 500 })
  }
}

// POST - Create new company
export async function POST(request: NextRequest) {
  try {
    const guard = ensureAdmin(request)
    if (guard) return guard

    const body = await request.json()
    const { name, description, website, employees } = body

    // Validation
    if (!name) {
      return NextResponse.json({ message: 'Company name is required' }, { status: 400 })
    }

    // Create new company
    const newCompany = {
      id: String(companiesStore.length + 1),
      name,
      description: description || '',
      website: website || '',
      employees: employees || 0,
      status: 'active' as const,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    companiesStore.push(newCompany)

    return NextResponse.json(newCompany, { status: 201 })
  } catch (error) {
    return NextResponse.json({ message: 'Failed to create company' }, { status: 500 })
  }
}
