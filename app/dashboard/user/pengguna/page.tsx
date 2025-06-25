"use client"

import { useState } from "react"
import {
  FaUserFriends,
  FaUserCheck,
  FaUserClock,
  FaUserTimes,
  FaEdit,
  FaTrash,
  FaEye,
  FaPlus,
  FaSearch,
  FaDownload,
  FaUpload,
} from "react-icons/fa"
import PageHeader from "@/components/ui/PageHeader"
import StatsCard from "@/components/ui/StatsCard"
import PenggunaModal from "../components/modals/PenggunaModal"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface User {
  id: string
  name: string
  email: string
  phone: string
  address: string
  dateOfBirth: string
  role: string
  applicationDate: string
  documentStatus: string
  trainingStatus: string
  status: string
}

export default function PenggunaPage() {
  const [users, setUsers] = useState<User[]>([
    {
      id: "1",
      name: "Ahmad Rizki",
      email: "ahmad@email.com",
      phone: "+62 812-3456-7890",
      address: "Jakarta Selatan",
      dateOfBirth: "1995-05-15",
      role: "Calon Pekerja",
      applicationDate: "2024-01-10",
      documentStatus: "verified",
      trainingStatus: "completed",
      status: "active",
    },
    {
      id: "2",
      name: "Siti Nurhaliza",
      email: "siti@email.com",
      phone: "+62 813-4567-8901",
      address: "Bandung",
      dateOfBirth: "1992-08-22",
      role: "Calon Pekerja",
      applicationDate: "2024-01-12",
      documentStatus: "pending",
      trainingStatus: "in-progress",
      status: "pending",
    },
  ])

  const [searchQuery, setSearchQuery] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [modalMode, setModalMode] = useState<"create" | "edit">("create")

  const handleEdit = (user: User) => {
    setSelectedUser(user)
    setModalMode("edit")
    setIsModalOpen(true)
  }

  const handleDelete = (id: string) => {
    setUsers(users.filter((user) => user.id !== id))
  }

  const handleSave = (userData: any) => {
    if (modalMode === "create") {
      const newUser = { ...userData, id: Date.now().toString() }
      setUsers([...users, newUser])
    } else {
      setUsers(users.map((user) => (user.id === userData.id ? userData : user)))
    }
    setIsModalOpen(false)
  }

  const filteredUsers = users.filter((user) => user.name.toLowerCase().includes(searchQuery.toLowerCase()))

  return (
    <>
      <PageHeader title="Manajemen Pengguna" description="Kelola data pengguna dan calon pekerja dalam sistem">
        <div className="flex space-x-2">
          <Button className="bg-green-600 hover:bg-green-700">
            <FaUpload className="mr-2" />
            Import
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <FaDownload className="mr-2" />
            Export
          </Button>
          <Button
            onClick={() => {
              setSelectedUser(null)
              setModalMode("create")
              setIsModalOpen(true)
            }}
            className="bg-red-900 hover:bg-red-800"
          >
            <FaPlus className="mr-2" />
            Tambah Pengguna
          </Button>
        </div>
      </PageHeader>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
        <StatsCard
          title="Total Pengguna"
          value="2,847"
          change="+12%"
          changeType="positive"
          icon={<FaUserFriends className="text-blue-600" />}
          iconBg="bg-blue-100"
        />
        <StatsCard
          title="Pengguna Aktif"
          value="2,456"
          change="+8%"
          changeType="positive"
          icon={<FaUserCheck className="text-green-600" />}
          iconBg="bg-green-100"
        />
        <StatsCard
          title="Menunggu Verifikasi"
          value="234"
          change="+15%"
          changeType="positive"
          icon={<FaUserClock className="text-yellow-600" />}
          iconBg="bg-yellow-100"
        />
        <StatsCard
          title="Tidak Aktif"
          value="157"
          change="-5%"
          changeType="negative"
          icon={<FaUserTimes className="text-red-600" />}
          iconBg="bg-red-100"
        />
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 md:p-6 mb-6">
        <div className="relative max-w-md">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            type="text"
            placeholder="Cari pengguna..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 md:p-6 border-b border-gray-100">
          <h3 className="text-lg font-bold text-gray-900">Daftar Pengguna</h3>
          <p className="text-sm text-gray-600 mt-1">
            Menampilkan {filteredUsers.length} dari {users.length} pengguna
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Pengguna
                </th>
                <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-red-900 rounded-full flex items-center justify-center mr-3">
                        <span className="text-white text-sm font-semibold">
                          {user.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </span>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">{user.name}</div>
                        <div className="text-sm text-gray-500">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{user.role}</div>
                  </td>
                  <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        user.status === "active"
                          ? "bg-green-100 text-green-800"
                          : user.status === "pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                      }`}
                    >
                      {user.status === "active" ? "Aktif" : user.status === "pending" ? "Pending" : "Tidak Aktif"}
                    </span>
                  </td>
                  <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(user)}
                        className="text-blue-600 hover:text-blue-900 p-1"
                        title="Edit"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDelete(user.id)}
                        className="text-red-600 hover:text-red-900 p-1"
                        title="Hapus"
                      >
                        <FaTrash />
                      </button>
                      <button className="text-gray-600 hover:text-gray-900 p-1" title="Detail">
                        <FaEye />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <PenggunaModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        userData={selectedUser}
        mode={modalMode}
      />
    </>
  )
}
