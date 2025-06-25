"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { FaTimes, FaSave, FaSpinner } from "react-icons/fa"

interface MitraModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (data: any) => void
  userData?: any
  mode: "create" | "edit"
}

export default function MitraModal({ isOpen, onClose, onSave, userData, mode }: MitraModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    country: "",
    city: "",
    postalCode: "",
    industryType: "",
    companySize: "",
    establishedYear: "",
    website: "",
    contactPerson: "",
    contactPosition: "",
    contactPhone: "",
    contactEmail: "",
    workers: 0,
    maxWorkers: 100,
    contractStart: "",
    contractEnd: "",
    contractType: "annual",
    paymentTerms: "",
    currency: "JPY",
    minimumWage: "",
    workingHours: "",
    overtimePolicy: "",
    benefits: "",
    accommodationProvided: false,
    transportationProvided: false,
    mealProvided: false,
    insuranceProvided: false,
    trainingProvided: false,
    languageRequirement: "",
    skillRequirements: "",
    workEnvironment: "",
    safetyStandards: "",
    companyDescription: "",
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
        country: "",
        city: "",
        postalCode: "",
        industryType: "",
        companySize: "",
        establishedYear: "",
        website: "",
        contactPerson: "",
        contactPosition: "",
        contactPhone: "",
        contactEmail: "",
        workers: 0,
        maxWorkers: 100,
        contractStart: "",
        contractEnd: "",
        contractType: "annual",
        paymentTerms: "",
        currency: "JPY",
        minimumWage: "",
        workingHours: "",
        overtimePolicy: "",
        benefits: "",
        accommodationProvided: false,
        transportationProvided: false,
        mealProvided: false,
        insuranceProvided: false,
        trainingProvided: false,
        languageRequirement: "",
        skillRequirements: "",
        workEnvironment: "",
        safetyStandards: "",
        companyDescription: "",
        notes: "",
        status: "active",
      })
    }
  }, [userData, mode, isOpen])

  const validateForm = () => {
    const newErrors: any = {}
    if (!formData.name.trim()) newErrors.name = "Nama perusahaan wajib diisi"
    if (!formData.email.trim()) newErrors.email = "Email wajib diisi"
    if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Format email tidak valid"
    if (!formData.phone.trim()) newErrors.phone = "Nomor telepon wajib diisi"
    if (!formData.country.trim()) newErrors.country = "Negara wajib diisi"
    if (!formData.industryType.trim()) newErrors.industryType = "Tipe industri wajib diisi"
    if (!formData.contactPerson.trim()) newErrors.contactPerson = "Contact person wajib diisi"

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
      console.error("Error saving partner:", error)
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
          <h2 className="text-xl font-bold text-gray-900">{mode === "create" ? "Tambah" : "Edit"} Mitra Perusahaan</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <FaTimes size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Company Information */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-3">Informasi Perusahaan</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nama Perusahaan *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 ${
                    errors.name ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Toyota Motor Corporation"
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
                  placeholder="hr@toyota.co.jp"
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
                  placeholder="+81-3-3817-7111"
                />
                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Negara *</label>
                <select
                  name="country"
                  value={formData.country}
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
                  <option value="Malaysia">Malaysia</option>
                  <option value="Thailand">Thailand</option>
                </select>
                {errors.country && <p className="text-red-500 text-xs mt-1">{errors.country}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Kota</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="Tokyo"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Kode Pos</label>
                <input
                  type="text"
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="100-0001"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tipe Industri *</label>
                <select
                  name="industryType"
                  value={formData.industryType}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 ${
                    errors.industryType ? "border-red-500" : "border-gray-300"
                  }`}
                >
                  <option value="">Pilih Tipe Industri</option>
                  <option value="Manufacturing">Manufacturing</option>
                  <option value="Automotive">Automotive</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Construction">Construction</option>
                  <option value="Agriculture">Agriculture</option>
                  <option value="Food Processing">Food Processing</option>
                  <option value="Textile">Textile</option>
                  <option value="Machinery">Machinery</option>
                  <option value="Chemical">Chemical</option>
                </select>
                {errors.industryType && <p className="text-red-500 text-xs mt-1">{errors.industryType}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Ukuran Perusahaan</label>
                <select
                  name="companySize"
                  value={formData.companySize}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  <option value="">Pilih Ukuran</option>
                  <option value="Small (1-50)">Small (1-50 employees)</option>
                  <option value="Medium (51-250)">Medium (51-250 employees)</option>
                  <option value="Large (251-1000)">Large (251-1000 employees)</option>
                  <option value="Enterprise (1000+)">Enterprise (1000+ employees)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tahun Berdiri</label>
                <input
                  type="number"
                  name="establishedYear"
                  value={formData.establishedYear}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="1937"
                  min="1800"
                  max={new Date().getFullYear()}
                />
              </div>
            </div>

            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Website</label>
                <input
                  type="url"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="https://www.toyota.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Alamat Perusahaan</label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="Alamat lengkap perusahaan"
                />
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Deskripsi Perusahaan</label>
              <textarea
                name="companyDescription"
                value={formData.companyDescription}
                onChange={handleChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="Deskripsi singkat tentang perusahaan dan bidang usahanya"
              />
            </div>
          </div>

          {/* Contact Person */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-3">Contact Person</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nama Contact Person *</label>
                <input
                  type="text"
                  name="contactPerson"
                  value={formData.contactPerson}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 ${
                    errors.contactPerson ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Yamada Taro"
                />
                {errors.contactPerson && <p className="text-red-500 text-xs mt-1">{errors.contactPerson}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Posisi</label>
                <input
                  type="text"
                  name="contactPosition"
                  value={formData.contactPosition}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="HR Manager"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nomor Telepon Contact</label>
                <input
                  type="tel"
                  name="contactPhone"
                  value={formData.contactPhone}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="+81-90-1234-5678"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Contact</label>
                <input
                  type="email"
                  name="contactEmail"
                  value={formData.contactEmail}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="yamada@toyota.co.jp"
                />
              </div>
            </div>
          </div>

          {/* Contract Information */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-3">Informasi Kontrak</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Jumlah Pekerja Saat Ini</label>
                <input
                  type="number"
                  name="workers"
                  value={formData.workers}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  min="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Maksimal Pekerja</label>
                <input
                  type="number"
                  name="maxWorkers"
                  value={formData.maxWorkers}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  min="1"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tipe Kontrak</label>
                <select
                  name="contractType"
                  value={formData.contractType}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  <option value="annual">Annual</option>
                  <option value="multi-year">Multi-Year</option>
                  <option value="project-based">Project Based</option>
                  <option value="permanent">Permanent</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tanggal Mulai Kontrak</label>
                <input
                  type="date"
                  name="contractStart"
                  value={formData.contractStart}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tanggal Berakhir Kontrak</label>
                <input
                  type="date"
                  name="contractEnd"
                  value={formData.contractEnd}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
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
                  <option value="JPY">Japanese Yen (JPY)</option>
                  <option value="KRW">Korean Won (KRW)</option>
                  <option value="TWD">Taiwan Dollar (TWD)</option>
                  <option value="SGD">Singapore Dollar (SGD)</option>
                  <option value="MYR">Malaysian Ringgit (MYR)</option>
                  <option value="USD">US Dollar (USD)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Gaji Minimum</label>
                <input
                  type="text"
                  name="minimumWage"
                  value={formData.minimumWage}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="¥200,000/month"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Jam Kerja</label>
                <input
                  type="text"
                  name="workingHours"
                  value={formData.workingHours}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="8 hours/day, 5 days/week"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Kebijakan Lembur</label>
                <input
                  type="text"
                  name="overtimePolicy"
                  value={formData.overtimePolicy}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="1.25x rate after 8 hours"
                />
              </div>
            </div>

            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Terms Pembayaran</label>
                <textarea
                  name="paymentTerms"
                  value={formData.paymentTerms}
                  onChange={handleChange}
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="Monthly payment, bank transfer"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Benefits</label>
                <textarea
                  name="benefits"
                  value={formData.benefits}
                  onChange={handleChange}
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="Health insurance, bonus, vacation days"
                />
              </div>
            </div>
          </div>

          {/* Facilities & Requirements */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-3">Fasilitas & Persyaratan</h3>

            {/* Facilities Provided */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Fasilitas yang Disediakan</label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="accommodationProvided"
                    checked={formData.accommodationProvided}
                    onChange={handleChange}
                    className="rounded border-gray-300 text-red-600 focus:ring-red-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">Akomodasi</span>
                </label>

                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="transportationProvided"
                    checked={formData.transportationProvided}
                    onChange={handleChange}
                    className="rounded border-gray-300 text-red-600 focus:ring-red-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">Transportasi</span>
                </label>

                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="mealProvided"
                    checked={formData.mealProvided}
                    onChange={handleChange}
                    className="rounded border-gray-300 text-red-600 focus:ring-red-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">Makan</span>
                </label>

                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="insuranceProvided"
                    checked={formData.insuranceProvided}
                    onChange={handleChange}
                    className="rounded border-gray-300 text-red-600 focus:ring-red-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">Asuransi</span>
                </label>

                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="trainingProvided"
                    checked={formData.trainingProvided}
                    onChange={handleChange}
                    className="rounded border-gray-300 text-red-600 focus:ring-red-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">Pelatihan</span>
                </label>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Persyaratan Bahasa</label>
                <input
                  type="text"
                  name="languageRequirement"
                  value={formData.languageRequirement}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="Japanese N4 level, Basic English"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Persyaratan Skill</label>
                <input
                  type="text"
                  name="skillRequirements"
                  value={formData.skillRequirements}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="Manufacturing experience, Technical skills"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Lingkungan Kerja</label>
                <textarea
                  name="workEnvironment"
                  value={formData.workEnvironment}
                  onChange={handleChange}
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="Factory environment, air-conditioned, clean workspace"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Standar Keselamatan</label>
                <textarea
                  name="safetyStandards"
                  value={formData.safetyStandards}
                  onChange={handleChange}
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="ISO 45001, safety equipment provided, regular training"
                />
              </div>
            </div>
          </div>

          {/* Additional Notes */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Catatan Tambahan</label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="Informasi tambahan tentang perusahaan atau kontrak"
            />
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
              <option value="expired">Expired</option>
              <option value="suspended">Suspended</option>
              <option value="pending">Pending</option>
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
