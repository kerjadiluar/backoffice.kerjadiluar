// Mock API functions - replace with your actual API calls
export interface User {
  id: string
  name: string
  email: string
  role: string
  phone?: string
  address?: string
  status?: 'active' | 'inactive'
  createdAt?: string
  updatedAt?: string
}

// Mock data for demonstration
const mockUsers: User[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    role: "karyawan",
    phone: "+62 812-3456-7890",
    address: "Jakarta",
    status: "active",
    createdAt: "2024-01-01",
    updatedAt: "2024-01-01"
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    role: "karyawan",
    phone: "+62 813-4567-8901",
    address: "Bandung",
    status: "active",
    createdAt: "2024-01-02",
    updatedAt: "2024-01-02"
  }
]

export async function getUsers(): Promise<User[]> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000))
  return mockUsers
}

export async function createUser(userData: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<User> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500))
  
  const newUser: User = {
    ...userData,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
  
  mockUsers.push(newUser)
  return newUser
}

export async function updateUser(id: string, userData: Partial<User>): Promise<User> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500))
  
  const userIndex = mockUsers.findIndex(user => user.id === id)
  if (userIndex === -1) {
    throw new Error('User not found')
  }
  
  const updatedUser = {
    ...mockUsers[userIndex],
    ...userData,
    updatedAt: new Date().toISOString()
  }
  
  mockUsers[userIndex] = updatedUser
  return updatedUser
}

export async function deleteUser(id: string): Promise<void> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500))
  
  const userIndex = mockUsers.findIndex(user => user.id === id)
  if (userIndex === -1) {
    throw new Error('User not found')
  }
  
  mockUsers.splice(userIndex, 1)
}
