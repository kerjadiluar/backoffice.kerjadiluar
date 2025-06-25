"use client"

import { useState, useEffect } from "react"
import { adminService, type AdminData } from "../services/admin-service"
import { toast } from "sonner"

interface UseAdminsOptions {
  page?: number
  per_page?: number
  search?: string
  status?: string
  role?: string
  department?: string
}

export function useAdmins(options: UseAdminsOptions = {}) {
  const [admins, setAdmins] = useState<AdminData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    per_page: 10,
    last_page: 1,
  })

  const fetchAdmins = async () => {
    try {
      setLoading(true)
      setError(null)

      const response = await adminService.getAdmins(options)

      if (response.success && response.data) {
        setAdmins(response.data.admins)
        setPagination({
          total: response.data.total,
          page: response.data.page,
          per_page: response.data.per_page,
          last_page: response.data.last_page,
        })
      } else {
        throw new Error(response.message || "Failed to fetch admins")
      }
    } catch (err: any) {
      setError(err.message)
      toast.error("Gagal memuat data admin: " + err.message)
    } finally {
      setLoading(false)
    }
  }

  const createAdmin = async (adminData: AdminData) => {
    try {
      const response = await adminService.createAdmin(adminData)

      if (response.success) {
        toast.success("Admin berhasil ditambahkan!")
        await fetchAdmins() // Refresh data
        return response.data
      } else {
        throw new Error(response.message || "Failed to create admin")
      }
    } catch (err: any) {
      toast.error("Gagal menambah admin: " + err.message)
      throw err
    }
  }

  const updateAdmin = async (id: string, adminData: Partial<AdminData>) => {
    try {
      const response = await adminService.updateAdmin(id, adminData)

      if (response.success) {
        toast.success("Admin berhasil diperbarui!")
        await fetchAdmins() // Refresh data
        return response.data
      } else {
        throw new Error(response.message || "Failed to update admin")
      }
    } catch (err: any) {
      toast.error("Gagal memperbarui admin: " + err.message)
      throw err
    }
  }

  const deleteAdmin = async (id: string) => {
    try {
      const response = await adminService.deleteAdmin(id)

      if (response.success) {
        toast.success("Admin berhasil dihapus!")
        await fetchAdmins() // Refresh data
      } else {
        throw new Error(response.message || "Failed to delete admin")
      }
    } catch (err: any) {
      toast.error("Gagal menghapus admin: " + err.message)
      throw err
    }
  }

  const bulkUpdateAdmins = async (ids: string[], data: Partial<AdminData>) => {
    try {
      const response = await adminService.bulkUpdateAdmins(ids, data)

      if (response.success) {
        toast.success(`${ids.length} admin berhasil diperbarui!`)
        await fetchAdmins() // Refresh data
      } else {
        throw new Error(response.message || "Failed to bulk update admins")
      }
    } catch (err: any) {
      toast.error("Gagal memperbarui admin: " + err.message)
      throw err
    }
  }

  const bulkDeleteAdmins = async (ids: string[]) => {
    try {
      const response = await adminService.bulkDeleteAdmins(ids)

      if (response.success) {
        toast.success(`${ids.length} admin berhasil dihapus!`)
        await fetchAdmins() // Refresh data
      } else {
        throw new Error(response.message || "Failed to bulk delete admins")
      }
    } catch (err: any) {
      toast.error("Gagal menghapus admin: " + err.message)
      throw err
    }
  }

  useEffect(() => {
    fetchAdmins()
  }, [options.page, options.per_page, options.search, options.status, options.role, options.department])

  return {
    admins,
    loading,
    error,
    pagination,
    refetch: fetchAdmins,
    createAdmin,
    updateAdmin,
    deleteAdmin,
    bulkUpdateAdmins,
    bulkDeleteAdmins,
  }
}
