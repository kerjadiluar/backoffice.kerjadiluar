"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { FaTimes, FaSave, FaSpinner } from "react-icons/fa"

// Define the interface for the form data to give TypeScript better context
interface PengajarFormData {
  name: string
  email: string
  phone: string
  address: string
  specialization: string
  experience: string
  education: string
  certifications: string
  languages: string
  students: number
  maxStudents: number
  courses: number
  rating: number
  teachingSince: string
  location: string
  availability: "available" | "busy" | "full" | "on-leave" // More specific type
  teachingMethods: string[] // Explicitly an array of strings
  subjectAreas: string[] // Explicitly an array of strings
  onlineTeaching: boolean
  offlineTeaching: boolean
  groupTeaching: boolean
  individualTeaching: boolean
  weekdayAvailability: string
  weekendAvailability: string
  hourlyRate: string
  currency: string
  bio: string
  achievements: string
  portfolio: string
  linkedinProfile: string
  status: "active" | "inactive" | "suspended" // More specific type
}

interface PengajarModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (data: PengajarFormData) => void // Use PengajarFormData here
  userData?: PengajarFormData // Use PengajarFormData here
  mode: "create" | "edit"
}

export default function PengajarModal({ isOpen, onClose, onSave, userData, mode }: PengajarModalProps) {
  // Initialize formData with the defined interface
  const [formData, setFormData] = useState<PengajarFormData>({
    name: "",
    email: "",
    phone: "",
    address: "",
    specialization: "",
    experience: "",
    education: "",
    certifications: "",
    languages: "",
    students: 0,
    maxStudents: 30,
    courses: 0,
    rating: 0,
    teachingSince: "", // Initialize as empty string, will be set in useEffect
    location: "",
    availability: "available",
    teachingMethods: [],
    subjectAreas: [],
    onlineTeaching: false,
    offlineTeaching: true,
    groupTeaching: true,
    individualTeaching: true,
    weekdayAvailability: "",
    weekendAvailability: "",
    hourlyRate: "",
    currency: "IDR",
    bio: "",
    achievements: "",
    portfolio: "",
    linkedinProfile: "",
    status: "active",
  })

  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<Partial<Record<keyof PengajarFormData, string>>>({}) // More specific error type

  useEffect(() => {
    // Only update form data if modal is open and in edit mode with userData
    if (isOpen) { // Check if modal is open to avoid re-initializing on every render
        if (userData && mode === "edit") {
            // Ensure teachingSince is formatted correctly when loading existing data
            const formattedTeachingSince = userData.teachingSince
                ? new Date(userData.teachingSince).toISOString().split("T")[0]
                : "";
            setFormData((prev) => ({
                ...prev,
                ...userData,
                teachingSince: formattedTeachingSince,
            }));
        } else if (mode === "create") {
            setFormData({
                name: "",
                email: "",
                phone: "",
                address: "",
                specialization: "",
                experience: "",
                education: "",
                certifications: "",
                languages: "",
                students: 0,
                maxStudents: 30,
                courses: 0,
                rating: 0,
                teachingSince: new Date().toISOString().split("T")[0], // Default for create
                location: "",
                availability: "available",
                teachingMethods: [],
                subjectAreas: [],
                onlineTeaching: false,
                offlineTeaching: true,
                groupTeaching: true,
                individualTeaching: true,
                weekdayAvailability: "",
                weekendAvailability: "",
                hourlyRate: "",
                currency: "IDR",
                bio: "",
                achievements: "",
                portfolio: "",
                linkedinProfile: "",
                status: "active",
            })
        }
        // Clear errors when modal opens or mode changes
        setErrors({});
    }
  }, [userData, mode, isOpen]) // Depend on isOpen to re-initialize when modal opens

  const validateForm = () => {
    const newErrors: Partial<Record<keyof PengajarFormData, string>> = {} // Use specific type
    if (!formData.name.trim()) newErrors.name = "Nama wajib diisi"
    if (!formData.email.trim()) newErrors.email = "Email wajib diisi"
    if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Format email tidak valid"
    if (!formData.phone.trim()) newErrors.phone = "Nomor telepon wajib diisi"
    if (!formData.specialization.trim()) newErrors.specialization = "Spesialisasi wajib diisi"
    if (!formData.experience.trim()) newErrors.experience = "Pengalaman wajib diisi"

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
    } catch (error) {
      console.error("Error saving teacher:", error)
      // Optionally, set an error message to display in the UI
      // setErrors(prev => ({ ...prev, general: "Failed to save teacher." }));
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    const checked = (e.target as HTMLInputElement).checked

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : type === "number" ? Number(value) : value,
    }))

    if (errors[name as keyof PengajarFormData]) { // Corrected type for errors check
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  // Corrected handleArrayChange to properly type `prev[arrayName]`
  const handleArrayChange = (arrayName: 'teachingMethods' | 'subjectAreas', value: string) => {
    setFormData((prev) => {
      // Type assertion: We know arrayName will refer to a string array here
      const currentArray = prev[arrayName] as string[];
      return {
        ...prev,
        [arrayName]: currentArray.includes(value)
          ? currentArray.filter((item: string) => item !== value)
          : [...currentArray, value],
      };
    });
  };

  if (!isOpen) return null

  const teachingMethodOptions = [
    "Lecture",
    "Interactive Discussion",
    "Hands-on Practice",
    "Case Study",
    "Role Playing",
    "Multimedia Presentation",
    "Group Work",
    "Problem-based Learning",
  ]

  const subjectAreaOptions = [
    "Bahasa Jepang",
    "Budaya Kerja Jepang",
    "Keselamatan Kerja",
    "Keterampilan Teknis",
    "Soft Skills",
    "Komunikasi",
    "Etika Kerja",
    "Manajemen Waktu",
    "Teamwork",
    "Leadership",
  ]

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">{mode === "create" ? "Tambah" : "Edit"} Pengajar</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <FaTimes size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Personal Information */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-3">Informasi Pribadi</h3>
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
                  placeholder="Tanaka Hiroshi"
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
                  placeholder="tanaka@kejadiluar.com"
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
                  placeholder="+81-90-1234-5678"
                />
                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Lokasi</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="Tokyo, Japan"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Bahasa yang Dikuasai</label>
                <input
                  type="text"
                  name="languages"
                  value={formData.languages}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="Japanese (Native), English (Fluent), Indonesian (Intermediate)"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">LinkedIn Profile</label>
                <input
                  type="url"
                  name="linkedinProfile"
                  value={formData.linkedinProfile}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="[https://linkedin.com/in/username](https://linkedin.com/in/username)"
                />
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Alamat</label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                rows={2}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="Alamat lengkap"
              />
            </div>
          </div>

          {/* Professional Information */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-3">Informasi Profesional</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Spesialisasi *</label>
                <select
                  name="specialization"
                  value={formData.specialization}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 ${
                    errors.specialization ? "border-red-500" : "border-gray-300"
                  }`}
                >
                  <option value="">Pilih Spesialisasi</option>
                  <option value="Bahasa Jepang">Bahasa Jepang</option>
                  <option value="Budaya Kerja">Budaya Kerja</option>
                  <option value="Keselamatan Kerja">Keselamatan Kerja</option>
                  <option value="Keterampilan Teknis">Keterampilan Teknis</option>
                  <option value="Soft Skills">Soft Skills</option>
                  <option value="Komunikasi">Komunikasi</option>
                  <option value="Leadership">Leadership</option>
                </select>
                {errors.specialization && <p className="text-red-500 text-xs mt-1">{errors.specialization}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Pengalaman *</label>
                <input
                  type="text"
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 ${
                    errors.experience ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="8 years"
                />
                {errors.experience && <p className="text-red-500 text-xs mt-1">{errors.experience}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Pendidikan</label>
                <input
                  type="text"
                  name="education"
                  value={formData.education}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="Master in Education, University of Tokyo"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Mulai Mengajar</label>
                <input
                  type="date"
                  name="teachingSince"
                  value={formData.teachingSince}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Jumlah Siswa Saat Ini</label>
                <input
                  type="number"
                  name="students"
                  value={formData.students}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  min="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Maksimal Siswa</label>
                <input
                  type="number"
                  name="maxStudents"
                  value={formData.maxStudents}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  min="1"
                  max="100"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Jumlah Kursus</label>
                <input
                  type="number"
                  name="courses"
                  value={formData.courses}
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
                  value={formData.rating}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  min="0"
                  max="5"
                  step="0.1"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tarif per Jam</label>
                <input
                  type="text"
                  name="hourlyRate"
                  value={formData.hourlyRate}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="Rp 150,000"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Mata Uang</label>
                <select
                  name="currency"
                  value={formData.currency}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  <option value="IDR">Indonesian Rupiah (IDR)</option>
                  <option value="JPY">Japanese Yen (JPY)</option>
                  <option value="USD">US Dollar (USD)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Ketersediaan</label>
                <select
                  name="availability"
                  value={formData.availability}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  <option value="available">Available</option>
                  <option value="busy">Busy</option>
                  <option value="full">Full Capacity</option>
                  <option value="on-leave">On Leave</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Portfolio/Website</label>
                <input
                  type="url"
                  name="portfolio"
                  value={formData.portfolio}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="[https://portfolio.com](https://portfolio.com)"
                />
              </div>
            </div>

            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Sertifikasi</label>
                <textarea
                  name="certifications"
                  value={formData.certifications}
                  onChange={handleChange}
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="JLPT N1, Teaching License, TESOL Certificate"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Pencapaian</label>
                <textarea
                  name="achievements"
                  value={formData.achievements}
                  onChange={handleChange}
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="Best Teacher Award 2023, Published author"
                />
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Bio/Deskripsi</label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="Ceritakan tentang pengalaman mengajar dan metodologi"
              />
            </div>
          </div>

          {/* Teaching Preferences */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-3">Preferensi Mengajar</h3>

            {/* Teaching Format */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Format Mengajar</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="onlineTeaching"
                    checked={formData.onlineTeaching}
                    onChange={handleChange}
                    className="rounded border-gray-300 text-red-600 focus:ring-red-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">Online</span>
                </label>

                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="offlineTeaching"
                    checked={formData.offlineTeaching}
                    onChange={handleChange}
                    className="rounded border-gray-300 text-red-600 focus:ring-red-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">Offline</span>
                </label>

                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="groupTeaching"
                    checked={formData.groupTeaching}
                    onChange={handleChange}
                    className="rounded border-gray-300 text-red-600 focus:ring-red-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">Group</span>
                </label>

                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="individualTeaching"
                    checked={formData.individualTeaching}
                    onChange={handleChange}
                    className="rounded border-gray-300 text-red-600 focus:ring-red-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">Individual</span>
                </label>
              </div>
            </div>

            {/* Teaching Methods */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Metode Mengajar</label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {teachingMethodOptions.map((method) => (
                  <label key={method} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.teachingMethods.includes(method)}
                      onChange={() => handleArrayChange("teachingMethods", method)}
                      className="rounded border-gray-300 text-red-600 focus:ring-red-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">{method}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Subject Areas */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Area Subjek</label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {subjectAreaOptions.map((subject) => (
                  <label key={subject} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.subjectAreas.includes(subject)}
                      onChange={() => handleArrayChange("subjectAreas", subject)}
                      className="rounded border-gray-300 text-red-600 focus:ring-red-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">{subject}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Availability Schedule */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Ketersediaan Weekday</label>
                <input
                  type="text"
                  name="weekdayAvailability"
                  value={formData.weekdayAvailability}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="Monday-Friday 9AM-5PM"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Ketersediaan Weekend</label>
                <input
                  type="text"
                  name="weekendAvailability"
                  value={formData.weekendAvailability}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="Saturday 10AM-2PM"
                />
              </div>
            </div>
          </div>

          {/* Status */}
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
              <option value="suspended">Suspended</option>
            </select>
          </div>

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
