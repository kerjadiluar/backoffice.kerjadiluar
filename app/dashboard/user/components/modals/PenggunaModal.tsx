"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { FaTimes, FaSave, FaSpinner } from "react-icons/fa"

interface PenggunaModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (data: any) => void
  userData?: any
  mode: "create" | "edit"
}

export default function PenggunaModal({ isOpen, onClose, onSave, userData, mode }: PenggunaModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    dateOfBirth: "",
    gender: "",
    nationality: "Indonesian",
    idNumber: "",
    passportNumber: "",
    passportExpiry: "",
    role: "Calon Pekerja",
    applicationDate: "",
    documentStatus: "pending",
    trainingStatus: "not-started",
    medicalStatus: "pending",
    interviewStatus: "pending",
    emergencyContact: "",
    emergencyPhone: "",
    emergencyRelation: "",
    education: "",
    workExperience: "",
    skills: "",
    languageSkills: "",
    japaneseLevel: "",
    desiredCountry: "",
    desiredIndustry: "",
    desiredPosition: "",
    expectedSalary: "",
    availableStartDate: "",
    maritalStatus: "",
    dependents: 0,
    healthCondition: "",
    allergies: "",
    medications: "",
    criminalRecord: false,
    previousOverseasWork: false,
    notes: "",
    status: "active",
  })

  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<any>({})

  useEffect(() => {
    if (userData && mode === "edit") {
      setFormData({ ...formData, ...userData })
    } else if (mode === "create") {
      setFormData({
        name: "",
        email: "",
        phone: "",
        address: "",
        dateOfBirth: "",
        gender: "",
        nationality: "Indonesian",
        idNumber: "",
        passportNumber: "",
        passportExpiry: "",
        role: "Calon Pekerja",
        applicationDate: new Date().toISOString().split("T")[0],
        documentStatus: "pending",
        trainingStatus: "not-started",
        medicalStatus: "pending",
        interviewStatus: "pending",
        emergencyContact: "",
        emergencyPhone: "",
        emergencyRelation: "",
        education: "",
        workExperience: "",
        skills: "",
        languageSkills: "",
        japaneseLevel: "",
        desiredCountry: "",
        desiredIndustry: "",
        desiredPosition: "",
        expectedSalary: "",
        availableStartDate: "",
        maritalStatus: "",
        dependents: 0,
        healthCondition: "",
        allergies: "",
        medications: "",
        criminalRecord: false,
        previousOverseasWork: false,
        notes: "",
        status: "active",
      })
    }
  }, [userData, mode, isOpen])

  const validateForm = () => {
    const newErrors: any = {}
    if (!formData.name.trim()) newErrors.name = "Nama wajib diisi"
    if (!formData.email.trim()) newErrors.email = "Email wajib diisi"
    if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Format email tidak valid"
    if (!formData.phone.trim()) newErrors.phone = "Nomor telepon wajib diisi"
    if (!formData.dateOfBirth.trim()) newErrors.dateOfBirth = "Tanggal lahir wajib diisi"
    if (!formData.idNumber.trim()) newErrors.idNumber = "Nomor KTP wajib diisi"

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
      console.error("Error saving user:", error)
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

    if (errors[name]) {
      setErrors((prev: any) => ({ ...prev, [name]: "" }))
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">{mode === "create" ? "Tambah" : "Edit"} Pengguna</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <FaTimes size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Personal Information */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-3">Informasi Pribadi</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
                  placeholder="Ahmad Rizki"
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
                  placeholder="ahmad@email.com"
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
                  placeholder="+62 812-3456-7890"
                />
                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tanggal Lahir *</label>
                <input
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 ${
                    errors.dateOfBirth ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.dateOfBirth && <p className="text-red-500 text-xs mt-1">{errors.dateOfBirth}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Jenis Kelamin</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  <option value="">Pilih Jenis Kelamin</option>
                  <option value="Laki-laki">Laki-laki</option>
                  <option value="Perempuan">Perempuan</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Kewarganegaraan</label>
                <input
                  type="text"
                  name="nationality"
                  value={formData.nationality}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="Indonesian"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nomor KTP *</label>
                <input
                  type="text"
                  name="idNumber"
                  value={formData.idNumber}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 ${
                    errors.idNumber ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="3201234567890123"
                />
                {errors.idNumber && <p className="text-red-500 text-xs mt-1">{errors.idNumber}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nomor Paspor</label>
                <input
                  type="text"
                  name="passportNumber"
                  value={formData.passportNumber}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="A1234567"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tanggal Expired Paspor</label>
                <input
                  type="date"
                  name="passportExpiry"
                  value={formData.passportExpiry}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status Pernikahan</label>
                <select
                  name="maritalStatus"
                  value={formData.maritalStatus}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  <option value="">Pilih Status</option>
                  <option value="Single">Single</option>
                  <option value="Married">Married</option>
                  <option value="Divorced">Divorced</option>
                  <option value="Widowed">Widowed</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Jumlah Tanggungan</label>
                <input
                  type="number"
                  name="dependents"
                  value={formData.dependents}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  min="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  <option value="Calon Pekerja">Calon Pekerja</option>
                  <option value="Pekerja Aktif">Pekerja Aktif</option>
                  <option value="Alumni">Alumni</option>
                </select>
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Alamat Lengkap</label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="Alamat lengkap sesuai KTP"
              />
            </div>
          </div>

          {/* Emergency Contact */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-3">Kontak Darurat</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nama Kontak Darurat</label>
                <input
                  type="text"
                  name="emergencyContact"
                  value={formData.emergencyContact}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="Nama keluarga/kerabat"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nomor Kontak Darurat</label>
                <input
                  type="tel"
                  name="emergencyPhone"
                  value={formData.emergencyPhone}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="+62 812-3456-7890"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Hubungan</label>
                <select
                  name="emergencyRelation"
                  value={formData.emergencyRelation}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  <option value="">Pilih Hubungan</option>
                  <option value="Orang Tua">Orang Tua</option>
                  <option value="Saudara">Saudara</option>
                  <option value="Pasangan">Pasangan</option>
                  <option value="Anak">Anak</option>
                  <option value="Kerabat">Kerabat</option>
                  <option value="Teman">Teman</option>
                </select>
              </div>
            </div>
          </div>

          {/* Education & Experience */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-3">Pendidikan & Pengalaman</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Pendidikan Terakhir</label>
                <select
                  name="education"
                  value={formData.education}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  <option value="">Pilih Pendidikan</option>
                  <option value="SD">SD</option>
                  <option value="SMP">SMP</option>
                  <option value="SMA/SMK">SMA/SMK</option>
                  <option value="D3">Diploma 3</option>
                  <option value="S1">Sarjana (S1)</option>
                  <option value="S2">Magister (S2)</option>
                  <option value="S3">Doktor (S3)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Level Bahasa Jepang</label>
                <select
                  name="japaneseLevel"
                  value={formData.japaneseLevel}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  <option value="">Pilih Level</option>
                  <option value="N5">N5 (Beginner)</option>
                  <option value="N4">N4 (Elementary)</option>
                  <option value="N3">N3 (Intermediate)</option>
                  <option value="N2">N2 (Upper Intermediate)</option>
                  <option value="N1">N1 (Advanced)</option>
                  <option value="Native">Native</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Pengalaman Kerja</label>
                <textarea
                  name="workExperience"
                  value={formData.workExperience}
                  onChange={handleChange}
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="Deskripsi pengalaman kerja sebelumnya"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Keterampilan</label>
                <textarea
                  name="skills"
                  value={formData.skills}
                  onChange={handleChange}
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="Keterampilan yang dimiliki"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Kemampuan Bahasa</label>
                <textarea
                  name="languageSkills"
                  value={formData.languageSkills}
                  onChange={handleChange}
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="Bahasa yang dikuasai dan levelnya"
                />
              </div>
            </div>
          </div>

          {/* Job Preferences */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-3">Preferensi Pekerjaan</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Negara Tujuan</label>
                <select
                  name="desiredCountry"
                  value={formData.desiredCountry}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  <option value="">Pilih Negara</option>
                  <option value="Japan">Japan</option>
                  <option value="South Korea">South Korea</option>
                  <option value="Taiwan">Taiwan</option>
                  <option value="Singapore">Singapore</option>
                  <option value="Malaysia">Malaysia</option>
                  <option value="Thailand">Thailand</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Industri yang Diinginkan</label>
                <select
                  name="desiredIndustry"
                  value={formData.desiredIndustry}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  <option value="">Pilih Industri</option>
                  <option value="Manufacturing">Manufacturing</option>
                  <option value="Automotive">Automotive</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Construction">Construction</option>
                  <option value="Agriculture">Agriculture</option>
                  <option value="Food Processing">Food Processing</option>
                  <option value="Textile">Textile</option>
                  <option value="Machinery">Machinery</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Posisi yang Diinginkan</label>
                <input
                  type="text"
                  name="desiredPosition"
                  value={formData.desiredPosition}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="Factory Worker, Technician, dll"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Ekspektasi Gaji</label>
                <input
                  type="text"
                  name="expectedSalary"
                  value={formData.expectedSalary}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="¥200,000/month"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tanggal Mulai Tersedia</label>
                <input
                  type="date"
                  name="availableStartDate"
                  value={formData.availableStartDate}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tanggal Aplikasi</label>
                <input
                  type="date"
                  name="applicationDate"
                  value={formData.applicationDate}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
            </div>
          </div>

          {/* Health Information */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-3">Informasi Kesehatan</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Kondisi Kesehatan</label>
                <textarea
                  name="healthCondition"
                  value={formData.healthCondition}
                  onChange={handleChange}
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="Kondisi kesehatan umum"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Alergi</label>
                <textarea
                  name="allergies"
                  value={formData.allergies}
                  onChange={handleChange}
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="Alergi yang dimiliki"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Obat-obatan yang Dikonsumsi</label>
                <textarea
                  name="medications"
                  value={formData.medications}
                  onChange={handleChange}
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="Obat-obatan rutin yang dikonsumsi"
                />
              </div>
            </div>
          </div>

          {/* Status Information */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-3">Status Proses</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status Dokumen</label>
                <select
                  name="documentStatus"
                  value={formData.documentStatus}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                  <option value="incomplete">Incomplete</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status Pelatihan</label>
                <select
                  name="trainingStatus"
                  value={formData.trainingStatus}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  <option value="not-started">Not Started</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                  <option value="failed">Failed</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status Medical</label>
                <select
                  name="medicalStatus"
                  value={formData.medicalStatus}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  <option value="pending">Pending</option>
                  <option value="passed">Passed</option>
                  <option value="failed">Failed</option>
                  <option value="retest">Retest Required</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status Interview</label>
                <select
                  name="interviewStatus"
                  value={formData.interviewStatus}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  <option value="pending">Pending</option>
                  <option value="scheduled">Scheduled</option>
                  <option value="passed">Passed</option>
                  <option value="failed">Failed</option>
                </select>
              </div>
            </div>
          </div>

          {/* Additional Information */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-3">Informasi Tambahan</h3>

            <div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="criminalRecord"
                  checked={formData.criminalRecord}
                  onChange={handleChange}
                  className="rounded border-gray-300 text-red-600 focus:ring-red-500"
                />
                <span className="ml-2 text-sm text-gray-700">Memiliki Catatan Kriminal</span>
              </label>

              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="previousOverseasWork"
                  checked={formData.previousOverseasWork}
                  onChange={handleChange}
                  className="rounded border-gray-300 text-red-600 focus:ring-red-500"
                />
                <span className="ml-2 text-sm text-gray-700">Pernah Bekerja di Luar Negeri</span>
              </label>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Catatan Tambahan</label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="Catatan atau informasi tambahan"
              />
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
              <option value="blacklisted">Blacklisted</option>
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
