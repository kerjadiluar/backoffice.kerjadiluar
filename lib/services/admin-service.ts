import { apiClient, type ApiResponse } from "../api-clients"
import { API_CONFIG } from "../config"

// Admin data types
export interface AdminData {
  id?: string
  name: string
  email: string
  password: string
  roleId: string
}

export interface CreateAdminRequest {
  name: string
  email: string
  password: string
  // password_confirmation: string
  roleId: string
}

export interface UpdateAdminRequest {
  name?: string
  email?: string
  phone?: string
  address?: string
  role?: string
  permissions?: string
  department?: string
  accessLevel?: string
  twoFactorEnabled?: boolean
  status?: "active" | "inactive"
}

export interface AdminListResponse {
  admins: AdminData[]
  total: number
  page: number
  per_page: number
  last_page: number
}

class AdminService {
  // Get all admins with pagination and filters
  async getAdmins(params?: {
    page?: number
    per_page?: number
    search?: string
    status?: string
    role?: string
  }): Promise<ApiResponse<AdminData[]>> {
    return apiClient.get<AdminData[]>(API_CONFIG.ENDPOINTS.ADMINS, params)
  }

  // Get single admin by ID
  async getAdminById(id: string): Promise<ApiResponse<AdminData>> {
    return apiClient.get<AdminData>(API_CONFIG.ENDPOINTS.ADMIN_BY_ID(id))
  }

  // Create new admin
  async createAdmin(data: CreateAdminRequest): Promise<ApiResponse<AdminData>> {
    return apiClient.post<AdminData>(API_CONFIG.ENDPOINTS.USER_REGISTER, {
      name: data.name,
      email: data.email,
      password: data.password,
      // password_confirmation: data.password_confirmation,
      roleId: "rl2",
      // user_type: "admin"
    })
  }

  // Update admin
  async updateAdmin(id: string, data: UpdateAdminRequest): Promise<ApiResponse<AdminData>> {
    return apiClient.put<AdminData>(API_CONFIG.ENDPOINTS.ADMIN_BY_ID(id), data)
  }

  // Delete admin
  async deleteAdmin(id: string): Promise<ApiResponse<void>> {
    return apiClient.delete<void>(API_CONFIG.ENDPOINTS.ADMIN_BY_ID(id))
  }

  // Bulk operations
  async bulkUpdateStatus(ids: string[], status: "active" | "inactive"): Promise<ApiResponse<void>> {
    return apiClient.patch<void>(API_CONFIG.ENDPOINTS.ADMINS, {
      ids,
      status
    })
  }

  async bulkDelete(ids: string[]): Promise<ApiResponse<void>> {
    return apiClient.post<void>(`${API_CONFIG.ENDPOINTS.ADMINS}/bulk-delete`, {
      ids
    })
  }

  // Change admin status
  async changeAdminStatus(id: string, status: "active" | "inactive"): Promise<ApiResponse<AdminData>> {
    return apiClient.patch<AdminData>(API_CONFIG.ENDPOINTS.ADMIN_BY_ID(id), { status })
  }

  // Reset admin password
  async resetAdminPassword(id: string, newPassword: string): Promise<ApiResponse<void>> {
    return apiClient.post<void>(`${API_CONFIG.ENDPOINTS.ADMIN_BY_ID(id)}/reset-password`, {
      password: newPassword,
    })
  }
}

export const adminService = new AdminService()
