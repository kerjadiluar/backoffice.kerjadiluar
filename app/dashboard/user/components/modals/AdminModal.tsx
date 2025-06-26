"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { FaTimes, FaSave, FaSpinner } from "react-icons/fa"
import { type CreateAdminRequest, type AdminData } from "@/lib/services/admin-service" // Pastikan path ini benar

// --- START: Definisi Tipe Respons API (Tambahan) ---
// Biasanya, ini akan didefinisikan di file terpisah (misal: src/lib/types/api-response.ts)
// dan diimport ke sini. Untuk kemudahan, kita letakkan di sini dulu.
interface ApiResponse<T = any> {
  success: boolean;
  message?: string; // Pesan dari server, bisa sukses atau error
  data?: T;       // Data yang dikembalikan jika operasi berhasil
  // Anda bisa menambahkan properti lain sesuai format respons API Anda,
  // seperti 'statusCode', 'errors', dll.
}
// --- END: Definisi Tipe Respons API ---


interface AdminModalProps {
  isOpen: boolean
  onClose: () => void
  // Perbaikan di sini: onSave sekarang diharapkan mengembalikan Promise dari ApiResponse
  // yang berisi AdminData jika sukses. Ini mencerminkan bahwa onSave adalah fungsi async.
  onSave: (data: CreateAdminRequest | AdminData) => Promise<ApiResponse<AdminData>>;
  userData?: AdminData | null
  mode: "create" | "edit"
}

export default function AdminModal({ isOpen, onClose, onSave, userData, mode }: AdminModalProps) {
  const [formData, setFormData] = useState<CreateAdminRequest>({
    name: "",
    email: "",
    password: "",
    roleId: "rl2", // default roleId
  })

  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({}) // Untuk error validasi form
  const [apiError, setApiError] = useState<string | null>(null); // Untuk error dari API

  useEffect(() => {
    if (userData && mode === "edit") {
      setFormData({
        name: userData.name || "",
        email: userData.email || "",
        password: "", // Password biasanya dikosongkan/reset untuk keamanan saat edit
        roleId: userData.roleId || "rl2",
      })
    } else if (mode === "create") {
      setFormData({
        name: "",
        email: "",
        password: "",
        roleId: "rl2",
      })
    }
    setErrors({}) // Clear errors on modal open/mode change
    setApiError(null); // Clear API error on modal open/mode change
  }, [userData, mode, isOpen]) // Tambahkan isOpen ke dependency array untuk reset saat modal dibuka/tutup

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    if (!formData.name.trim()) {
      newErrors.name = "Nama wajib diisi"
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email wajib diisi"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Format email tidak valid"
    }

    // Password hanya wajib diisi dan divalidasi saat mode 'create'
    // atau jika mode 'edit' tapi user ingin mengubah password (input tidak kosong)
    if (mode === "create" || (mode === "edit" && formData.password.trim())) {
      if (!formData.password.trim()) {
        newErrors.password = "Password wajib diisi"
      } else if (formData.password.length < 6) {
        newErrors.password = "Password minimal 6 karakter"
      }
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setApiError(null); // Clear previous API errors

    if (!validateForm()) {
        return // Hentikan jika validasi form gagal
    }

    setIsLoading(true)
    try {
      // onSave sekarang diharapkan mengembalikan Promise<ApiResponse>
      const response = await onSave(formData) 
      
      console.log("API response saat save admin:", response); // Ubah log message agar lebih umum

      // Periksa properti 'success' dari respons API
      if (response.success) {
        onClose() // Tutup modal hanya jika operasi berhasil
      } else {
        // Jika API mengembalikan success: false, gunakan message dari API
        throw new Error(response.message || "Gagal menambahkan/mengedit admin: Respon tidak sukses.")
      }
    } catch (error) {
      console.error("Error saving admin:", error)
      // Tampilkan error dari API atau error jaringan ke pengguna
      setApiError((error as Error).message || "Terjadi kesalahan saat menyimpan data admin.");
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    // Hapus error spesifik untuk field yang sedang diubah jika user mulai mengetik
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
    // Hapus error API jika user mulai mengetik di salah satu field
    if (apiError) {
      setApiError(null);
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">{mode === "create" ? "Tambah" : "Edit"} Administrator</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <FaTimes size={20} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {apiError && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative text-sm" role="alert">
              <span className="block sm:inline">{apiError}</span>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 ${errors.name ? "border-red-500" : "border-gray-300"}`}
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
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 ${errors.email ? "border-red-500" : "border-gray-300"}`}
              placeholder="admin@kejadiluar.com"
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password {mode === "create" ? "*" : "(Isi jika ingin mengubah)"}
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 ${errors.password ? "border-red-500" : "border-gray-300"}`}
              placeholder={mode === "create" ? "Masukkan password" : "Biarkan kosong jika tidak berubah"}
            />
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
          </div>
          {/* Hidden roleId field, default rl2 */}
          <input type="hidden" name="roleId" value={formData.roleId} />
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