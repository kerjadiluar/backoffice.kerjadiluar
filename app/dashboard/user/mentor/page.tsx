"use client"

import { useState, useEffect } from "react"
import {
  FaUserTie,
  FaUsers,
  FaHandshake,
  FaStar,
  FaEdit,
  FaTrash,
  FaEye,
  FaPlus,
  FaSearch,
  FaFilter,
  FaDownload,
  FaUpload,
} from "react-icons/fa"
import PageHeader from "@/components/ui/PageHeader"
import StatsCard from "@/components/ui/StatsCard"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal } from 'lucide-react'
import { toast } from "sonner"
import { getUsers, deleteUser } from "@/lib/api"
import type { MentorData } from "@/lib/types"
import MentorModal from "../components/modals/MentorModal"

export default function MentorPage() {
  const [mentors, setMentors] = useState<MentorData[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [modalMode, setModalMode] = useState<"create" | "edit">("create")
  const [selectedMentor, setSelectedMentor] = useState<MentorData | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [specializationFilter, setSpecializationFilter] = useState("all")

  // Mock data for demonstration
  const mockMentors: MentorData[] = [
    {
      id: "1",
      name: "Suzuki Takeshi",
      email: "suzuki@kejadiluar.com",
      role: "mentor",
      phone: "+81-90-1234-5678",
      address: "Tokyo, Japan",
      status: "active",
      companyName: "Toyota Manufacturing",
      position: "Senior Manager",
      companyAddress: "Tokyo, Japan",
      specialization: "Manufacturing",
      experience: 15,
      rating: 4.9,
      mentees: 12,
      areasOfExpertise: ["Technical Skills", "Leadership", "Safety Procedures"],
      availability: "available",
      workingHours: "Monday-Friday 9AM-6PM JST",
      bio: "Experienced manufacturing professional with 15+ years in automotive industry",
      certifications: ["ISO 9001", "Lean Manufacturing", "Six Sigma Black Belt"],
      languages: ["Japanese (Native)", "English (Fluent)", "Indonesian (Basic)"],
      createdAt: "2024-01-01",
      updatedAt: "2024-01-01",
    },
    {
      id: "2",
      name: "Watanabe Akira",
      email: "watanabe@kejadiluar.com",
      role: "mentor",
      phone: "+81-90-2345-6789",
      address: "Osaka, Japan",
      status: "active",
      companyName: "Honda Motors",
      position: "Team Lead",
      companyAddress: "Osaka, Japan",
      specialization: "Automotive",
      experience: 12,
      rating: 4.7,
      mentees: 8,
      areasOfExpertise: ["Technical Skills", "Problem Solving", "Team Management"],
      availability: "available",
      workingHours: "Monday-Friday 8AM-5PM JST",
      bio: "Automotive specialist with expertise in engine manufacturing",
      certifications: ["Automotive Engineering", "Quality Control"],
      languages: ["Japanese (Native)", "English (Intermediate)"],
      createdAt: "2024-01-02",
      updatedAt: "2024-01-02",
    },
    {
      id: "3",
      name: "Nakamura Yuki",
      email: "nakamura@kejadiluar.com",
      role: "mentor",
      phone: "+81-90-3456-7890",
      address: "Kyoto, Japan",
      status: "inactive",
      companyName: "Panasonic Corp",
      position: "Senior Engineer",
      companyAddress: "Kyoto, Japan",
      specialization: "Electronics",
      experience: 18,
      rating: 4.8,
      mentees: 15,
      areasOfExpertise: ["Electronics", "Innovation", "Cultural Adaptation"],
      availability: "busy",
      workingHours: "Monday-Friday 9AM-6PM JST",
      bio: "Electronics expert with extensive experience in consumer electronics",
      certifications: ["Electronics Engineering", "Project Management"],
      languages: ["Japanese (Native)", "English (Fluent)", "Korean (Basic)"],
      createdAt: "2024-01-03",
      updatedAt: "2024-01-03",
    },
  ]

  useEffect(() => {
    fetchMentors()
  }, [])

  const fetchMentors = async () => {
    setLoading(true)
    try {
      // In real app, this would filter by role: 'mentor'
      // const data = await getUsers()
      // const mentorData = data.filter(user => user.role === 'mentor') as MentorData[]
      
      // For now, use mock data
      await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate loading
      setMentors(mockMentors)
    } catch (error) {
      console.error("Error fetching mentors:", error)
      toast.error("Gagal memuat data mentor")
    } finally {
      setLoading(false)
    }
  }

  const handleCreate = () => {
    setModalMode("create")
    setSelectedMentor(null)
    setShowModal(true)
  }

  const handleEdit = (mentor: MentorData) => {
    setModalMode("edit")
    setSelectedMentor(mentor)
    setShowModal(true)
  }

  const handleDelete = async (mentor: MentorData) => {
    if (confirm(`Apakah Anda yakin ingin menghapus mentor "${mentor.name}"?`)) {
      try {
        await deleteUser(mentor.id)
        await fetchMentors()
        toast.success("Mentor berhasil dihapus")
      } catch (error) {
        console.error("Error deleting mentor:", error)
        toast.error("Gagal menghapus mentor")
      }
    }
  }

  const handleSave = async (mentorData: MentorData) => {
    try {
      // In real app, you would call createUser or updateUser
      console.log("Saving mentor:", mentorData)
      await fetchMentors()
      setShowModal(false)
      toast.success(modalMode === "create" ? "Mentor berhasil ditambahkan" : "Mentor berhasil diperbarui")
    } catch (error) {
      console.error("Error saving mentor:", error)
      toast.error("Gagal menyimpan mentor")
    }
  }

  const filteredMentors = mentors.filter((mentor) => {
    const matchesSearch =
      mentor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mentor.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mentor.companyName.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || mentor.status === statusFilter
    const matchesSpecialization = specializationFilter === "all" || mentor.specialization === specializationFilter

    return matchesSearch && matchesStatus && matchesSpecialization
  })

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <Skeleton className="h-8 w-48 mb-2" />
            <Skeleton className="h-4 w-96" />
          </div>
          <Skeleton className="h-10 w-32" />
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-24 w-full" />
          ))}
        </div>
        
        <Skeleton className="h-96 w-full" />
      </div>
    )
  }

  return (
    <>
      <PageHeader title="Manajemen Mentor" description="Kelola mentor dan pembimbing untuk pekerja di lapangan">
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <FaUpload className="mr-2 h-4 w-4" />
            Import
          </Button>
          <Button variant="outline" size="sm">
            <FaDownload className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button onClick={handleCreate} size="sm">
            <FaPlus className="mr-2 h-4 w-4" />
            Tambah Mentor
          </Button>
        </div>
      </PageHeader>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
        <StatsCard
          title="Total Mentor"
          value="18"
          change="+2"
          changeType="positive"
          icon={<FaUserTie className="text-blue-600" />}
          iconBg="bg-blue-100"
        />

        <StatsCard
          title="Mentor Aktif"
          value="15"
          change="+1"
          changeType="positive"
          icon={<FaUsers className="text-green-600" />}
          iconBg="bg-green-100"
        />

        <StatsCard
          title="Total Mentee"
          value="156"
          change="+12"
          changeType="positive"
          icon={<FaHandshake className="text-yellow-600" />}
          iconBg="bg-yellow-100"
        />

        <StatsCard
          title="Avg Rating"
          value="4.8"
          change="+0.1"
          changeType="positive"
          icon={<FaStar className="text-purple-600" />}
          iconBg="bg-purple-100"
        />
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 md:p-6 mb-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row gap-4 flex-1">
            <div className="relative flex-1 max-w-md">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                type="text"
                placeholder="Cari mentor..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <option value="all">Semua Status</option>
              <option value="active">Aktif</option>
              <option value="inactive">Tidak Aktif</option>
            </select>
            <select
              value={specializationFilter}
              onChange={(e) => setSpecializationFilter(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <option value="all">Semua Spesialisasi</option>
              <option value="Manufacturing">Manufacturing</option>
              <option value="Automotive">Automotive</option>
              <option value="Electronics">Electronics</option>
              <option value="Construction">Construction</option>
              <option value="Agriculture">Agriculture</option>
            </select>
          </div>
        </div>
      </div>

      {/* Mentors Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 md:p-6 border-b border-gray-100">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-bold text-gray-900">Daftar Mentor</h3>
              <p className="text-sm text-gray-600 mt-1">
                Menampilkan {filteredMentors.length} dari {mentors.length} mentor
              </p>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Mentor</TableHead>
                <TableHead>Perusahaan</TableHead>
                <TableHead>Spesialisasi</TableHead>
                <TableHead>Mentee</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredMentors.map((mentor) => (
                <TableRow key={mentor.id}>
                  <TableCell>
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-red-900 rounded-full flex items-center justify-center mr-3">
                        <span className="text-white text-sm font-semibold">
                          {mentor.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </span>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">{mentor.name}</div>
                        <div className="text-sm text-gray-500">{mentor.email}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm text-gray-900">{mentor.companyName}</div>
                    <div className="text-sm text-gray-500">{mentor.position}</div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">{mentor.specialization}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm text-gray-900">{mentor.mentees} orang</div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <span className="text-sm text-gray-900">{mentor.rating}</span>
                      <span className="text-yellow-400 ml-1">★</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={mentor.status === "active" ? "default" : "secondary"}>
                      {mentor.status === "active" ? "Aktif" : "Tidak Aktif"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Aksi</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => handleEdit(mentor)}>
                          <FaEdit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <FaEye className="mr-2 h-4 w-4" />
                          Detail
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => handleDelete(mentor)}
                          className="text-red-600"
                        >
                          <FaTrash className="mr-2 h-4 w-4" />
                          Hapus
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Modal */}
      <MentorModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSave={handleSave}
        userData={selectedMentor}
        mode={modalMode}
      />
    </>
  )
}
