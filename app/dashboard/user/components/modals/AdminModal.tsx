"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { FaTimes, FaSave, FaSpinner } from "react-icons/fa"

interface AdminModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (data: any) => void
  userData?: any
  mode: "create" | "edit"
}

export default function AdminModal({ isOpen, onClose, onSave, userData, mode }: AdminModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    address: "",
    twoFactorEnabled: false,
    status: "active",
  })

  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<any>({})

  useEffect(() => {
    if (userData && mode === "edit") {
      setFormData({ ...formData, ...userData, password: "", confirmPassword: "" }) // Reset password fields
    } else if (mode === "create") {
      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        address: "",
        twoFactorEnabled: false,
        status: "active",
      })
    }
  }, [userData, mode, isOpen])

  const validateForm = () => {
    const newErrors: any = {}
    if (!formData.name.trim()) newErrors.name = "Nama wajib diisi"
    if (!formData.email.trim()) newErrors.email = "Email wajib diisi"
    if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Format email tidak valid"
    if (!formData.password.trim()) newErrors.password = "Password wajib diisi"
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Password tidak cocok"

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
      console.error("Error saving admin:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    const checked = (e.target as HTMLInputElement).checked

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))

    if (errors[name]) {
      setErrors((prev: any) => ({ ...prev, [name]: "" }))
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">{mode === "create" ? "Tambah" : "Edit"} Administrator</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <FaTimes size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Basic Information */}
          <div className="grid grid-cols-1 gap-4">
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
                placeholder="admin@kejadiluar.com"
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password *</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 ${
                  errors.password ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Masukkan password"
              />
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Konfirmasi Password *</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 ${
                  errors.confirmPassword ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Konfirmasi password"
              />
              {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
            </div>
          </div>

          {/* Security Settings */}
          <div className="border-t pt-4">
            {/* <h3 className="text-lg font-medium text-gray-900 mb-3">Pengaturan Keamanan</h3> */}
            <div className="flex items-center">
              <input
                type="checkbox"
                name="twoFactorEnabled"
                checked={formData.twoFactorEnabled}
                onChange={handleChange}
                className="rounded border-gray-300 text-red-600 focus:ring-red-500"
              />
              <label className="ml-2 text-sm text-gray-700">Saya menyatakan bahwa data yang ditambah sudah benar.</label>
            </div>
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
