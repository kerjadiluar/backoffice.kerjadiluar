"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { FaTimes, FaSave, FaSpinner } from "react-icons/fa"

// Define a comprehensive interface for all possible form data fields across user types
interface UserFormData {
  name: string
  email: string
  phone: string
  address: string
  status: "active" | "inactive" | "pending" | "suspended" // More specific status types
  // Fields for 'admin'
  role?: string // Optional, as it's only for admin
  permissions?: string // Optional, as it's only for admin
  // Fields for 'karyawan'
  position?: string // Optional
  department?: string // Optional
  salary?: string // Optional (assuming it's formatted string like "Rp 0")
  joinDate?: string // Optional (for date input)
  // Fields for 'mentor'
  company?: string // Optional
  specialization?: string // Optional
  experience?: string // Optional
  mentees?: number // Optional
  // Fields for 'mitra'
  companyName?: string // Optional
  country?: string // Optional
  industryType?: string // Optional
  contractStart?: string // Optional (for date input)
  contractEnd?: string // Optional (for date input)
  workers?: number // Optional
  // Fields for 'pengajar'
  // specialization and experience already declared, but adding courses/rating here
  courses?: number // Optional
  rating?: number // Optional
  // Fields for 'pengguna'
  // role and joinDate already declared (role will be 'Calon Pekerja' specific to pengguna), but including here for completeness
}

interface UserModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (userData: UserFormData) => void // Use the specific UserFormData type
  userData?: UserFormData // Use the specific UserFormData type
  userType: "admin" | "karyawan" | "mentor" | "mitra" | "pengajar" | "pengguna"
  mode: "create" | "edit"
}

export default function UserModal({ isOpen, onClose, onSave, userData, userType, mode }: UserModalProps) {
  // Initialize formData with all possible fields set to default empty values
  const [formData, setFormData] = useState<UserFormData>({
    name: "",
    email: "",
    phone: "",
    address: "",
    status: "active",
    // Admin
    role: "Admin", // Default role for admin, will be overwritten by userData if editing
    permissions: "Full Access",
    // Karyawan
    position: "",
    department: "",
    salary: "",
    joinDate: "",
    // Mentor
    company: "",
    specialization: "",
    experience: "",
    mentees: 0,
    // Mitra
    companyName: "",
    country: "",
    industryType: "",
    contractStart: "",
    contractEnd: "",
    workers: 0,
    // Pengajar (already have specialization and experience in common fields, adding specifics)
    courses: 0,
    rating: 0,
    // Pengguna
    // role: "Calon Pekerja", // Role for pengguna, will be overwritten by userData if editing
    // joinDate: "", // Join date for pengguna, will be overwritten by userData if editing
  })

  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<Partial<Record<keyof UserFormData, string>>>({}) // More specific error type

  useEffect(() => {
    if (isOpen) { // Only update form data if modal is open
      if (mode === "edit" && userData) {
        // Format date fields from userData if they exist
        const formattedUserData = { ...userData };
        if (formattedUserData.joinDate) {
          formattedUserData.joinDate = new Date(formattedUserData.joinDate).toISOString().split('T')[0];
        }
        if (formattedUserData.contractStart) {
          formattedUserData.contractStart = new Date(formattedUserData.contractStart).toISOString().split('T')[0];
        }
        if (formattedUserData.contractEnd) {
          formattedUserData.contractEnd = new Date(formattedUserData.contractEnd).toISOString().split('T')[0];
        }

        setFormData((prev) => ({
          ...prev, // Keep existing defaults for fields not in userData
          ...formattedUserData, // Overlay userData values
        }));
      } else if (mode === "create") {
        // Reset form to initial empty state for create mode
        setFormData({
          name: "",
          email: "",
          phone: "",
          address: "",
          status: "active",
          // Admin
          role: "Admin",
          permissions: "Full Access",
          // Karyawan
          position: "",
          department: "",
          salary: "",
          joinDate: "",
          // Mentor
          company: "",
          specialization: "",
          experience: "",
          mentees: 0,
          // Mitra
          companyName: "",
          country: "",
          industryType: "",
          contractStart: "",
          contractEnd: "",
          workers: 0,
          // Pengajar
          courses: 0,
          rating: 0,
          // Pengguna
          // role: "Calon Pekerja",
          // joinDate: "",
        });
      }
      // Clear errors when modal opens or mode changes
      setErrors({});
    }
  }, [userData, mode, isOpen]) // Add isOpen to dependencies to trigger reset when modal opens

  const validateForm = () => {
    const newErrors: Partial<Record<keyof UserFormData, string>> = {}

    if (!formData.name.trim()) newErrors.name = "Nama wajib diisi"
    if (!formData.email.trim()) newErrors.email = "Email wajib diisi"
    if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Format email tidak valid"
    if (!formData.phone.trim()) newErrors.phone = "Nomor telepon wajib diisi"

    // Validation based on user type, now safe to call .trim() as fields exist
    if (userType === "karyawan") {
      if (!formData.position?.trim()) newErrors.position = "Posisi wajib diisi"
      if (!formData.department?.trim()) newErrors.department = "Departemen wajib diisi"
    }

    if (userType === "mitra") {
      if (!formData.companyName?.trim()) newErrors.companyName = "Nama perusahaan wajib diisi"
      if (!formData.country?.trim()) newErrors.country = "Negara wajib diisi"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsLoading(true)
    try {
      await onSave(formData)
      onClose()
      // Reset form after successful save to prepare for next creation if needed
      // This reset should ideally be handled by useEffect's create mode logic
      // when the modal is reopened in 'create' mode.
    } catch (error) {
      console.error("Error saving user:", error)
      // Optionally, set an error message to display in the UI
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : (type === "number" ? Number(value) : value),
    }));

    // Clear error for the field being changed
    if (errors[name as keyof UserFormData]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  if (!isOpen) return null

  const getUserTypeTitle = () => {
    const titles = {
      admin: "Administrator",
      karyawan: "Karyawan",
      mentor: "Mentor",
      mitra: "Mitra",
      pengajar: "Pengajar",
      pengguna: "Pengguna",
    }
    return titles[userType] || "User" // Direct access, userType is typed
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">
            {mode === "create" ? "Tambah" : "Edit"} {getUserTypeTitle()}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <FaTimes size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 ${
                  errors.name ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Masukkan nama lengkap"
              />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 ${
                  errors.email ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Masukkan email"
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nomor Telepon *</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 ${
                  errors.phone ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Masukkan nomor telepon"
              />
              {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <option value="active">Aktif</option>
                <option value="inactive">Tidak Aktif</option>
                <option value="pending">Pending</option>
              </select>
            </div>
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Alamat</label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="Masukkan alamat lengkap"
            />
          </div>

          {/* Dynamic Fields Based on User Type */}
          {userType === "admin" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                <select
                  name="role"
                  value={formData.role || ''} // Use default empty string for select
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  <option value="Super Admin">Super Admin</option>
                  <option value="Admin">Admin</option>
                  <option value="Verification Admin">Verification Admin</option>
                  <option value="User Admin">User Admin</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Permissions</label>
                <select
                  name="permissions"
                  value={formData.permissions || ''} // Use default empty string for select
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  <option value="Full Access">Full Access</option>
                  <option value="Verification Only">Verification Only</option>
                  <option value="User Management">User Management</option>
                  <option value="Read Only">Read Only</option>
                </select>
              </div>
            </div>
          )}

          {userType === "karyawan" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Posisi *</label>
                <input
                  type="text"
                  name="position"
                  value={formData.position || ''}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 ${
                    errors.position ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Masukkan posisi"
                />
                {errors.position && <p className="text-red-500 text-xs mt-1">{errors.position}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Departemen *</label>
                <select
                  name="department"
                  value={formData.department || ''}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 ${
                    errors.department ? "border-red-500" : "border-gray-300"
                  }`}
                >
                  <option value="">Pilih Departemen</option>
                  <option value="Human Resources">Human Resources</option>
                  <option value="Finance">Finance</option>
                  <option value="Information Technology">Information Technology</option>
                  <option value="Operations">Operations</option>
                  <option value="Marketing">Marketing</option>
                </select>
                {errors.department && <p className="text-red-500 text-xs mt-1">{errors.department}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Gaji</label>
                <input
                  type="text"
                  name="salary"
                  value={formData.salary || ''}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="Rp 0"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tanggal Bergabung</label>
                <input
                  type="date"
                  name="joinDate"
                  value={formData.joinDate || ''}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
            </div>
          )}

          {userType === "mentor" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Perusahaan</label>
                <input
                  type="text"
                  name="company"
                  value={formData.company || ''}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="Nama perusahaan"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Spesialisasi</label>
                <select
                  name="specialization"
                  value={formData.specialization || ''}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  <option value="">Pilih Spesialisasi</option>
                  <option value="Manufacturing">Manufacturing</option>
                  <option value="Automotive">Automotive</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Construction">Construction</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Pengalaman</label>
                <input
                  type="text"
                  name="experience"
                  value={formData.experience || ''}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="5 years"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Jumlah Mentee</label>
                <input
                  type="number"
                  name="mentees"
                  value={formData.mentees ?? ''} // Use nullish coalescing for numbers
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  min="0"
                />
              </div>
            </div>
          )}

          {userType === "mitra" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nama Perusahaan *</label>
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName || ''}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 ${
                    errors.companyName ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Nama perusahaan"
                />
                {errors.companyName && <p className="text-red-500 text-xs mt-1">{errors.companyName}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Negara *</label>
                <select
                  name="country"
                  value={formData.country || ''}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 ${
                    errors.country ? "border-red-500" : "border-gray-300"
                  }`}
                >
                  <option value="">Pilih Negara</option>
                  <option value="Japan">Japan</option>
                  <option value="South Korea">South Korea</option>
                  <option value="Taiwan">Taiwan</option>
                  <option value="Singapore">Singapore</option>
                </select>
                {errors.country && <p className="text-red-500 text-xs mt-1">{errors.country}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tipe Industri</label>
                <select
                  name="industryType"
                  value={formData.industryType || ''}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  <option value="">Pilih Tipe Industri</option>
                  <option value="Manufacturing">Manufacturing</option>
                  <option value="Automotive">Automotive</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Construction">Construction</option>
                  <option value="Agriculture">Agriculture</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Jumlah Pekerja</label>
                <input
                  type="number"
                  name="workers"
                  value={formData.workers ?? ''}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  min="0"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tanggal Mulai Kontrak</label>
                <input
                  type="date"
                  name="contractStart"
                  value={formData.contractStart || ''}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tanggal Berakhir Kontrak</label>
                <input
                  type="date"
                  name="contractEnd"
                  value={formData.contractEnd || ''}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
            </div>
          )}

          {userType === "pengajar" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Spesialisasi</label>
                <select
                  name="specialization"
                  value={formData.specialization || ''}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  <option value="">Pilih Spesialisasi</option>
                  <option value="Bahasa Jepang">Bahasa Jepang</option>
                  <option value="Budaya Kerja">Budaya Kerja</option>
                  <option value="Keselamatan Kerja">Keselamatan Kerja</option>
                  <option value="Teknik Industri">Teknik Industri</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Pengalaman</label>
                <input
                  type="text"
                  name="experience"
                  value={formData.experience || ''}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="5 years"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Jumlah Kursus</label>
                <input
                  type="number"
                  name="courses"
                  value={formData.courses ?? ''}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  min="0"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
                <input
                  type="number"
                  name="rating"
                  value={formData.rating ?? ''}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  min="0"
                  max="5"
                  step="0.1"
                />
              </div>
            </div>
          )}

          {userType === "pengguna" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                <select
                  name="role"
                  value={formData.role || 'Calon Pekerja'} // Default for Pengguna
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  <option value="Calon Pekerja">Calon Pekerja</option>
                  <option value="Mitra Pekerja">Mitra Pekerja</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tanggal Bergabung</label>
                <input
                  type="date"
                  name="joinDate"
                  value={formData.joinDate || ''}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
            </div>
          )}


          {/* Action Buttons */}
          <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-4 py-2 bg-red-900 text-white rounded-lg hover:bg-red-800 transition-colors flex items-center disabled:opacity-50"
            >
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
