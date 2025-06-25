export interface User {
  id: string
  name: string
  email: string
  role: string
  phone?: string
  address?: string
  status?: "active" | "inactive"
  createdAt?: string
  updatedAt?: string
}

export interface KaryawanData extends User {
  employeeId: string
  position: string
  department: string
  salary: string
  joinDate: string
  contractType: string
  workLocation: string
  supervisor: string
  emergencyContactName: string
  emergencyContactPhone: string
  bankAccount: string
  bankName: string
  npwp: string
  bpjs: string
}

export interface MentorData extends User {
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
  languages: string[]
}

export interface MitraData extends User {
  companyName: string
  industryType: string
  companySize: string
  establishedYear: number
  country: string
  city: string
  postalCode: string
  contactPersonName: string
  contactPersonPosition: string
  contactPersonPhone: string
  contactPersonEmail: string
  maxWorkers: number
  contractType: string
  contractStartDate: string
  contractEndDate: string
  currency: string
  minimumWage: number
  paymentTerms: string
  accommodation: boolean
  transportation: boolean
  meals: boolean
  insurance: boolean
  languageRequirement: string
  skillsRequired: string[]
  safetyStandards: string
}

export interface PengajarData extends User {
  specialization: string
  experience: number
  education: string
  certifications: string[]
  maxStudents: number
  courses: string[]
  rating: number
  hourlyRate: number
  teachingMethods: string[]
  subjectAreas: string[]
  onlineOffline: 'online' | 'offline' | 'both'
  weekdayAvailability: string
  weekendAvailability: string
  languages: string[]
}

export interface PenggunaData extends User {
  dateOfBirth: string
  gender: 'male' | 'female'
  nationality: string
  ktpNumber: string
  passportNumber: string
  maritalStatus: 'single' | 'married' | 'divorced' | 'widowed'
  dependents: number
  emergencyContactName: string
  emergencyContactPhone: string
  emergencyContactRelation: string
  lastEducation: string
  japaneseLevel: string
  workExperience: string
  desiredCountry: string
  desiredIndustry: string
  desiredPosition: string
  expectedSalary: string
  healthCondition: string
  allergies: string
  medications: string
  documentStatus: 'pending' | 'approved' | 'rejected'
  trainingStatus: 'not_started' | 'in_progress' | 'completed'
  medicalStatus: 'pending' | 'approved' | 'rejected'
  interviewStatus: 'scheduled' | 'completed' | 'passed' | 'failed'
  criminalRecord: boolean
  previousOverseasWork: boolean
}
