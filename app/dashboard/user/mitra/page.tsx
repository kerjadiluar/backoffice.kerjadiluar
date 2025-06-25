"use client"

import { useState } from "react"
import {
  FaHandshake,
  FaBuilding,
  FaUsers,
  FaGlobe,
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
import MitraModal from "../components/modals/MitraModal"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface Partner {
  id: string
  name: string
  email: string
  phone: string
  country: string
  industryType: string
  workers: number
  contractStart: string
  contractEnd: string
  status: string
}

export default function MitraPage() {
  const [partners, setPartners] = useState<Partner[]>([
    {
      id: "1",
      name: "Toyota Motor Corporation",
      email: "hr@toyota.co.jp",
      phone: "+81-3-3817-7111",
      country: "Japan",
      industryType: "Manufacturing",
      workers: 45,
      contractStart: "2022-01-15",
      contractEnd: "2025-01-15",
      status: "active",
    },
    {
      id: "2",
      name: "Honda Manufacturing",
      email: "recruitment@honda.co.jp",
      phone: "+81-3-3423-1111",
      country: "Japan",
      industryType: "Automotive",
      workers: 32,
      contractStart: "2021-06-20",
      contractEnd: "2024-06-20",
      status: "active",
    },
  ])

  const [searchQuery, setSearchQuery] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedPartner, setSelectedPartner] = useState<Partner | null>(null)
  const [modalMode, setModalMode] = useState<"create" | "edit">("create")

  const handleEdit = (partner: Partner) => {
    setSelectedPartner(partner)
    setModalMode("edit")
    setIsModalOpen(true)
  }

  const handleDelete = (id: string) => {
    setPartners(partners.filter((partner) => partner.id !== id))
  }

  const handleSave = (partnerData: any) => {
    if (modalMode === "create") {
      const newPartner = { ...partnerData, id: Date.now().toString() }
      setPartners([...partners, newPartner])
    } else {
      setPartners(partners.map((partner) => (partner.id === partnerData.id ? partnerData : partner)))
    }
    setIsModalOpen(false)
  }

  const filteredPartners = partners.filter((partner) => partner.name.toLowerCase().includes(searchQuery.toLowerCase()))

  return (
    <>
      <PageHeader title="Manajemen Mitra" description="Kelola perusahaan mitra dan kerjasama internasional">
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
              setSelectedPartner(null)
              setModalMode("create")
              setIsModalOpen(true)
            }}
            className="bg-red-900 hover:bg-red-800"
          >
            <FaPlus className="mr-2" />
            Tambah Mitra
          </Button>
        </div>
      </PageHeader>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
        <StatsCard
          title="Total Mitra"
          value="28"
          change="+4"
          changeType="positive"
          icon={<FaHandshake className="text-blue-600" />}
          iconBg="bg-blue-100"
        />
        <StatsCard
          title="Mitra Aktif"
          value="24"
          change="+2"
          changeType="positive"
          icon={<FaBuilding className="text-green-600" />}
          iconBg="bg-green-100"
        />
        <StatsCard
          title="Total Pekerja"
          value="456"
          change="+45"
          changeType="positive"
          icon={<FaUsers className="text-yellow-600" />}
          iconBg="bg-yellow-100"
        />
        <StatsCard
          title="Negara"
          value="5"
          change="+1"
          changeType="positive"
          icon={<FaGlobe className="text-purple-600" />}
          iconBg="bg-purple-100"
        />
      </div>

      {/* Search */}
      {/* <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 md:p-6 mb-6">
        <div className="relative max-w-md">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            type="text"
            placeholder="Cari mitra..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div> */}

      {/* Partners Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 md:p-6 border-b border-gray-100">
          <h3 className="text-lg font-bold text-gray-900">Daftar Mitra</h3>
          <p className="text-sm text-gray-600 mt-1">
            Menampilkan {filteredPartners.length} dari {partners.length} mitra
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Perusahaan
                </th>
                <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Negara
                </th>
                <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Industri
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
              {filteredPartners.map((partner) => (
                <tr key={partner.id} className="hover:bg-gray-50">
                  <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-red-900 rounded-full flex items-center justify-center mr-3">
                        <span className="text-white text-sm font-semibold">
                          {partner.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                            .substring(0, 2)}
                        </span>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">{partner.name}</div>
                        <div className="text-sm text-gray-500">{partner.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{partner.country}</div>
                  </td>
                  <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{partner.industryType}</div>
                  </td>
                  <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        partner.status === "active"
                          ? "bg-green-100 text-green-800"
                          : partner.status === "expired"
                            ? "bg-red-100 text-red-800"
                            : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {partner.status === "active" ? "Aktif" : partner.status === "expired" ? "Expired" : "Suspended"}
                    </span>
                  </td>
                  <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(partner)}
                        className="text-blue-600 hover:text-blue-900 p-1"
                        title="Edit"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDelete(partner.id)}
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

      <MitraModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        userData={selectedPartner}
        mode={modalMode}
      />
    </>
  )
}
