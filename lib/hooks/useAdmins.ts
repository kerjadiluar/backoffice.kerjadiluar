"use client"

import { useState, useEffect, useCallback } from "react"
import { adminService, type AdminData, type CreateAdminRequest } from "@/lib/services/admin-service"
import { type ApiResponse } from "@/lib/api-clients"
import { toast } from "sonner"

interface UseAdminsOptions {
  initialLoad?: boolean
  page?: number
  perPage?: number
}

export function useAdmins(options: UseAdminsOptions = {}) {
  const { initialLoad = true, page = 1, perPage = 10 } = options
  
  const [admins, setAdmins] = useState<AdminData[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [pagination, setPagination] = useState({
    currentPage: page,
    perPage,
    total: 0,
    lastPage: 1
  })

  // Load admins
  const loadAdmins = useCallback(async (params?: {
    page?: number
    per_page?: number
    search?: string
    status?: string
    role?: string
  }) => {
    setLoading(true)
    setError(null)
    
    try {
      const response = await adminService.getAdmins({
        page: params?.page || pagination.currentPage,
        per_page: params?.per_page || pagination.perPage,
        search: params?.search,
        status: params?.status,
        role: params?.role
      })
      
      if (response.success && response.data) {
        setAdmins(response.data)
        
        // Update pagination if meta data is available
        if (response.meta) {
          setPagination(prev => ({
            ...prev,
            currentPage: response.meta!.page,
            perPage: response.meta!.per_page,
            total: response.meta!.total,
            lastPage: response.meta!.last_page
          }))
        }
      } else {
        throw new Error(response.message || "Gagal memuat data admin")
      }
    } catch (err: any) {
      if (err.response) {
        // The request was made and the server responded with a status code
        console.error("Error loading admins:", err.response.data);
        setError(err.response.data.message || "Terjadi kesalahan saat memuat data");
      } else if (err.request) {
        // The request was made but no response was received
        console.error("Error loading admins: No response received", err.request);
        setError("Tidak ada respons dari server");
      } else {
        // Something happened in setting up the request that triggered an Error
        // console.error("Error loading admins:", err.message);
        setError(err.message || "Terjadi kesalahan saat memuat data");
      }
      toast.error(err.message || "Terjadi kesalahan saat memuat data");
    }
     finally {
      setLoading(false)
    }
  }, [pagination.currentPage, pagination.perPage])

  // Create admin
  const createAdmin = useCallback(async (adminData: CreateAdminRequest): Promise<ApiResponse<AdminData>> => {
    setLoading(true)
    setError(null)
    
    try {
      const response = await adminService.createAdmin(adminData)
      
      if (response.success && response.data) {
        const newAdmin = {
          ...response.data,
          avatar: response.data.name
            ?.split(" ")
            .map((n: string) => n[0])
            .join("")
            .substring(0, 2) || "AD",
          lastLogin: "Never",
        }
        setAdmins(prev => [...prev, newAdmin])
        toast.success("Admin berhasil ditambahkan!")
        return response
      } else {
        throw new Error(response.message || "Gagal menambahkan admin")
      }
    } catch (err: any) {
      console.error("Error creating admin:", err)
      setError(err.message || "Terjadi kesalahan saat menambahkan admin")
      toast.error(err.message || "Terjadi kesalahan saat menambahkan admin")
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  // Update admin
  const updateAdmin = useCallback(async (id: string, adminData: Partial<AdminData>): Promise<ApiResponse<AdminData>> => {
    setLoading(true)
    setError(null)
    
    try {
      const response = await adminService.updateAdmin(id, adminData)
      
      if (response.success && response.data) {
        setAdmins(prev => prev.map(admin => 
          admin.id === id ? { ...admin, ...response.data } : admin
        ))
        toast.success("Admin berhasil diperbarui!")
        return response
      } else {
        throw new Error(response.message || "Gagal memperbarui admin")
      }
    } catch (err: any) {
      console.error("Error updating admin:", err)
      setError(err.message || "Terjadi kesalahan saat memperbarui admin")
      toast.error(err.message || "Terjadi kesalahan saat memperbarui admin")
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  // Delete admin
  const deleteAdmin = useCallback(async (id: string) => {
    setLoading(true)
    setError(null)
    
    try {
      const response = await adminService.deleteAdmin(id)
      
      if (response.success) {
        setAdmins(prev => prev.filter(admin => admin.id !== id))
        toast.success("Admin berhasil dihapus!")
      } else {
        throw new Error(response.message || "Gagal menghapus admin")
      }
    } catch (err: any) {
      console.error("Error deleting admin:", err)
      setError(err.message || "Terjadi kesalahan saat menghapus admin")
      toast.error(err.message || "Terjadi kesalahan saat menghapus admin")
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  // Bulk operations
  const bulkUpdateStatus = useCallback(async (ids: string[], status: "active" | "inactive") => {
    setLoading(true)
    setError(null)
    
    try {
      const response = await adminService.bulkUpdateStatus(ids, status)
      
      if (response.success) {
        setAdmins(prev => prev.map(admin =>
          ids.includes(admin.id!) ? { ...admin, status } : admin
        ))
        toast.success(`Admin berhasil ${status === 'active' ? 'diaktifkan' : 'dinonaktifkan'}!`)
      } else {
        throw new Error(response.message || "Gagal memperbarui status admin")
      }
    } catch (err: any) {
      console.error("Error bulk updating status:", err)
      setError(err.message || "Terjadi kesalahan saat memperbarui status")
      toast.error(err.message || "Terjadi kesalahan saat memperbarui status")
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  const bulkDelete = useCallback(async (ids: string[]) => {
    setLoading(true)
    setError(null)
    
    try {
      const response = await adminService.bulkDelete(ids)
      
      if (response.success) {
        setAdmins(prev => prev.filter(admin => !ids.includes(admin.id!)))
        toast.success("Admin berhasil dihapus!")
      } else {
        throw new Error(response.message || "Gagal menghapus admin")
      }
    } catch (err: any) {
      console.error("Error bulk deleting:", err)
      setError(err.message || "Terjadi kesalahan saat menghapus admin")
      toast.error(err.message || "Terjadi kesalahan saat menghapus admin")
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  // Change page
  const changePage = useCallback((newPage: number) => {
    setPagination(prev => ({ ...prev, currentPage: newPage }))
    loadAdmins({ page: newPage })
  }, [loadAdmins])

  // Initial load
  useEffect(() => {
    if (initialLoad) {
      loadAdmins()
    }
  }, [initialLoad, loadAdmins])

  return {
    admins,
    loading,
    error,
    pagination,
    loadAdmins,
    createAdmin,
    updateAdmin,
    deleteAdmin,
    bulkUpdateStatus,
    bulkDelete,
    changePage,
    setError
  }
}
