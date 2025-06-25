"use server"

import { revalidatePath } from "next/cache"

// Types
export interface User {
  id: string
  name: string
  email: string
  phone?: string
  role: string
  status: "active" | "inactive"
  createdAt: Date
  updatedAt: Date
}

export interface Pengajar extends User {
  specialization: string
  experience: string
  students: number
  courses: number
  rating: number
  location: string
  certification: string
  languages: string[]
  hourlyRate?: number
  availability: string
}

export interface Mentor extends User {
  companyName: string
  position: string
  companyAddress: string
  specialization: string
  experience: number
  rating: number
  mentees: number
  areasOfExpertise: string[]
  availability: string
  workingHours: string
  bio: string
  certifications: string[]
}

// Mock data - In real app, this would be database calls
let mockUsers: User[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    phone: "+1234567890",
    role: "admin",
    status: "active",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    phone: "+1234567891",
    role: "user",
    status: "active",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]

let mockPengajar: Pengajar[] = [
  {
    id: "1",
    name: "Tanaka Hiroshi",
    email: "tanaka@kejadiluar.com",
    phone: "+81-90-1234-5678",
    role: "pengajar",
    status: "active",
    specialization: "Bahasa Jepang",
    experience: "8 years",
    students: 45,
    courses: 3,
    rating: 4.8,
    location: "Tokyo, Japan",
    certification: "JLPT N1, Teaching License",
    languages: ["Japanese", "English", "Indonesian"],
    hourlyRate: 50,
    availability: "weekdays",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "2",
    name: "Yamada Yuki",
    email: "yamada@kejadiluar.com",
    phone: "+81-90-2345-6789",
    role: "pengajar",
    status: "active",
    specialization: "Budaya Kerja",
    experience: "5 years",
    students: 32,
    courses: 2,
    rating: 4.6,
    location: "Osaka, Japan",
    certification: "Cultural Training Certificate",
    languages: ["Japanese", "Indonesian"],
    hourlyRate: 40,
    availability: "flexible",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]

let mockMentors: Mentor[] = [
  {
    id: "1",
    name: "Sato Kenji",
    email: "sato@company.com",
    phone: "+81-90-3456-7890",
    role: "mentor",
    status: "active",
    companyName: "Toyota Motor Corp",
    position: "Senior Manager",
    companyAddress: "Tokyo, Japan",
    specialization: "Manufacturing",
    experience: 15,
    rating: 4.9,
    mentees: 12,
    areasOfExpertise: ["Leadership", "Quality Control", "Team Management"],
    availability: "weekends",
    workingHours: "9:00-17:00",
    bio: "Experienced manager with 15+ years in automotive industry",
    certifications: ["Six Sigma Black Belt", "PMP"],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]

// Generic User Actions
export async function getUsers(): Promise<User[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))
  return mockUsers
}

export async function createUser(userData: Omit<User, "id" | "createdAt" | "updatedAt">): Promise<User> {
  await new Promise((resolve) => setTimeout(resolve, 1000))

  const newUser: User = {
    ...userData,
    id: Date.now().toString(),
    createdAt: new Date(),
    updatedAt: new Date(),
  }

  mockUsers.push(newUser)
  revalidatePath("/dashboard/user")
  return newUser
}

export async function updateUser(id: string, userData: Partial<User>): Promise<User> {
  await new Promise((resolve) => setTimeout(resolve, 1000))

  const userIndex = mockUsers.findIndex((user) => user.id === id)
  if (userIndex === -1) {
    throw new Error("User not found")
  }

  mockUsers[userIndex] = {
    ...mockUsers[userIndex],
    ...userData,
    updatedAt: new Date(),
  }

  revalidatePath("/dashboard/user")
  return mockUsers[userIndex]
}

export async function deleteUser(id: string): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, 500))

  mockUsers = mockUsers.filter((user) => user.id !== id)
  revalidatePath("/dashboard/user")
}

// Pengajar Actions
export async function getPengajar(): Promise<Pengajar[]> {
  await new Promise((resolve) => setTimeout(resolve, 500))
  return mockPengajar
}

export async function createPengajar(
  pengajarData: Omit<Pengajar, "id" | "createdAt" | "updatedAt">,
): Promise<Pengajar> {
  await new Promise((resolve) => setTimeout(resolve, 1000))

  const newPengajar: Pengajar = {
    ...pengajarData,
    id: Date.now().toString(),
    createdAt: new Date(),
    updatedAt: new Date(),
  }

  mockPengajar.push(newPengajar)
  revalidatePath("/dashboard/user/pengajar")
  return newPengajar
}

export async function updatePengajar(id: string, pengajarData: Partial<Pengajar>): Promise<Pengajar> {
  await new Promise((resolve) => setTimeout(resolve, 1000))

  const pengajarIndex = mockPengajar.findIndex((pengajar) => pengajar.id === id)
  if (pengajarIndex === -1) {
    throw new Error("Pengajar not found")
  }

  mockPengajar[pengajarIndex] = {
    ...mockPengajar[pengajarIndex],
    ...pengajarData,
    updatedAt: new Date(),
  }

  revalidatePath("/dashboard/user/pengajar")
  return mockPengajar[pengajarIndex]
}

export async function deletePengajar(id: string): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, 500))

  mockPengajar = mockPengajar.filter((pengajar) => pengajar.id !== id)
  revalidatePath("/dashboard/user/pengajar")
}

// Mentor Actions
export async function getMentors(): Promise<Mentor[]> {
  await new Promise((resolve) => setTimeout(resolve, 500))
  return mockMentors
}

export async function createMentor(mentorData: Omit<Mentor, "id" | "createdAt" | "updatedAt">): Promise<Mentor> {
  await new Promise((resolve) => setTimeout(resolve, 1000))

  const newMentor: Mentor = {
    ...mentorData,
    id: Date.now().toString(),
    createdAt: new Date(),
    updatedAt: new Date(),
  }

  mockMentors.push(newMentor)
  revalidatePath("/dashboard/user/mentor")
  return newMentor
}

export async function updateMentor(id: string, mentorData: Partial<Mentor>): Promise<Mentor> {
  await new Promise((resolve) => setTimeout(resolve, 1000))

  const mentorIndex = mockMentors.findIndex((mentor) => mentor.id === id)
  if (mentorIndex === -1) {
    throw new Error("Mentor not found")
  }

  mockMentors[mentorIndex] = {
    ...mockMentors[mentorIndex],
    ...mentorData,
    updatedAt: new Date(),
  }

  revalidatePath("/dashboard/user/mentor")
  return mockMentors[mentorIndex]
}

export async function deleteMentor(id: string): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, 500))

  mockMentors = mockMentors.filter((mentor) => mentor.id !== id)
  revalidatePath("/dashboard/user/mentor")
}

// Bulk Actions
export async function bulkDeleteUsers(ids: string[]): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, 1000))

  mockUsers = mockUsers.filter((user) => !ids.includes(user.id))
  revalidatePath("/dashboard/user")
}

export async function bulkUpdateUserStatus(ids: string[], status: "active" | "inactive"): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, 1000))

  mockUsers = mockUsers.map((user) => (ids.includes(user.id) ? { ...user, status, updatedAt: new Date() } : user))
  revalidatePath("/dashboard/user")
}

// Search Actions
export async function searchUsers(query: string): Promise<User[]> {
  await new Promise((resolve) => setTimeout(resolve, 300))

  const lowercaseQuery = query.toLowerCase()
  return mockUsers.filter(
    (user) =>
      user.name.toLowerCase().includes(lowercaseQuery) ||
      user.email.toLowerCase().includes(lowercaseQuery) ||
      user.role.toLowerCase().includes(lowercaseQuery),
  )
}

// Statistics Actions
export async function getUserStats() {
  await new Promise((resolve) => setTimeout(resolve, 300))

  return {
    totalUsers: mockUsers.length,
    activeUsers: mockUsers.filter((user) => user.status === "active").length,
    inactiveUsers: mockUsers.filter((user) => user.status === "inactive").length,
    totalPengajar: mockPengajar.length,
    totalMentors: mockMentors.length,
  }
}
