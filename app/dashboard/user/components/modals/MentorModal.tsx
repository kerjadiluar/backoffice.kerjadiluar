"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { FaTimes, FaSave, FaSpinner } from "react-icons/fa"
import type { MentorData } from "@/lib/types"

interface MentorModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (data: MentorData) => Promise<void>
  userData?: MentorData | null
  mode: "create" | "edit"
}

export default function MentorModal({ isOpen, onClose, onSave, userData, mode }: MentorModalProps) {
  const [formData, setFormData] = useState<Partial<MentorData>>({
    name: "",
    email: "",
    phone: "",
    address: "",
    companyName: "",
    position: "",
    companyAddress: "",
    specialization: "",
    experience: 0,
    rating: 0,
    mentees: 0,
    areasOfExpertise: [],
    availability: "available",
    workingHours: "",
    bio: "",
    certifications: [],
    languages: [],
    status: "active",
  })

  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    if (userData && mode === "edit") {
      setFormData(userData)
    } else if (mode === "create") {
      setFormData({
        name: "",
        email: "",
        phone: "",
        address: "",
        companyName: "",
        position: "",
        companyAddress: "",
        specialization: "",
        experience: 0,
        rating: 0,
        mentees: 0,
        areasOfExpertise: [],
        availability: "available",
        workingHours: "",
        bio: "",
        certifications: [],
        languages: [],
        status: "active",
      })
    }
  }, [userData, mode, isOpen])

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name?.trim()) newErrors.name = "Nama wajib diisi"
    if (!formData.email?.trim()) newErrors.email = "Email wajib diisi"
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Format email tidak valid"
    if (!formData.phone?.trim()) newErrors.phone = "Nomor telepon wajib diisi"
    if (!formData.companyName?.trim()) newErrors.companyName = "Nama perusahaan wajib diisi"
    if (!formData.specialization?.trim()) newErrors.specialization = "Spesialisasi wajib diisi"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return

    setIsLoading(true)
    try {
      await onSave(formData as MentorData)
      onClose()
    } catch (error) {
      console.error("Error saving mentor:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">{mode === "create" ? "Tambah" : "Edit"} Mentor</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <FaTimes size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Personal Information */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-3">Informasi Pribadi</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap *</label>
                <input
                  type="text"
                  value={formData.name || ""}
                  onChange={(e) => handleChange("name", e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 ${errors.name ? "border-red-500" : "border-gray-300"}`}
                  placeholder="Suzuki Takeshi"
                />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                <input
                  type="email"
                  value={formData.email || ""}
                  onChange={(e) => handleChange("email", e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 ${errors.email ? "border-red-500" : "border-gray-300"}`}
                  placeholder="suzuki@company.co.jp"
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nomor Telepon *</label>
                <input
                  type="tel"
                  value={formData.phone || ""}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 ${errors.phone ? "border-red-500" : "border-gray-300"}`}
                  placeholder="+81-90-1234-5678"
                />
                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Alamat</label>
                <input
                  type="text"
                  value={formData.address || ""}
                  onChange={(e) => handleChange("address", e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="Tokyo, Japan"
                />
              </div>
            </div>
          </div>

          {/* Company Information */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-3">Informasi Perusahaan</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nama Perusahaan *</label>
                <input
                  type="text"
                  value={formData.companyName || ""}
                  onChange={(e) => handleChange("companyName", e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 ${errors.companyName ? "border-red-500" : "border-gray-300"}`}
                  placeholder="Toyota Manufacturing"
                />
                {errors.companyName && <p className="text-red-500 text-xs mt-1">{errors.companyName}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Posisi</label>
                <input
                  type="text"
                  value={formData.position || ""}
                  onChange={(e) => handleChange("position", e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="Senior Manager"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Alamat Perusahaan</label>
                <textarea
                  value={formData.companyAddress || ""}
                  onChange={(e) => handleChange("companyAddress", e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="Alamat lengkap perusahaan"
                  rows={2}
                />
              </div>
            </div>
          </div>

          {/* Professional Information */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-3">Informasi Profesional</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Spesialisasi *</label>
                <select
                  value={formData.specialization || ""}
                  onChange={(e) => handleChange("specialization", e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 ${errors.specialization ? "border-red-500" : "border-gray-300"}`}
                >
                  <option value="">Pilih Spesialisasi</option>
                  <option value="Manufacturing">Manufacturing</option>
                  <option value="Automotive">Automotive</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Construction">Construction</option>
                  <option value="Agriculture">Agriculture</option>
                </select>
                {errors.specialization && <p className="text-red-500 text-xs mt-1">{errors.specialization}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Pengalaman (tahun)</label>
                <input
                  type="number"
                  value={formData.experience || 0}
                  onChange={(e) => handleChange("experience", Number(e.target.value))}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  min="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Jumlah Mentee</label>
                <input
                  type="number"
                  value={formData.mentees || 0}
                  onChange={(e) => handleChange("mentees", Number(e.target.value))}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  min="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
                <input
                  type="number"
                  value={formData.rating || 0}
                  onChange={(e) => handleChange("rating", Number(e.target.value))}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  min="0"
                  max="5"
                  step="0.1"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Ketersediaan</label>
                <select
                  value={formData.availability || "available"}
                  onChange={(e) => handleChange("availability", e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  <option value="available">Available</option>
                  <option value="busy">Busy</option>
                  <option value="full">Full Capacity</option>
                  <option value="on-leave">On Leave</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Jam Kerja</label>
                <input
                  type="text"
                  value={formData.workingHours || ""}
                  onChange={(e) => handleChange("workingHours", e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="Monday-Friday 9AM-6PM JST"
                />
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Bio/Deskripsi</label>
              <textarea
                value={formData.bio || ""}
                onChange={(e) => handleChange("bio", e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="Ceritakan tentang pengalaman dan keahlian sebagai mentor"
                rows={3}
              />
            </div>
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select
              value={formData.status || "active"}
              onChange={(e) => handleChange("status", e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <option value="active">Aktif</option>
              <option value="inactive">Tidak Aktif</option>
              <option value="suspended">Suspended</option>
            </select>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
            <button type="button" onClick={onClose} className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
              Batal
            </button>
            <button type="submit" disabled={isLoading} className="px-4 py-2 bg-red-900 text-white rounded-lg hover:bg-red-800 transition-colors flex items-center disabled:opacity-50">
              {isLoading ? (
                <>
                  <FaSpinner className="animate-spin mr-2" />
                  Menyimpan...
                </>
              ) : (
                <>
                  <FaSave className="mr-2" />
                  Simpan
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
