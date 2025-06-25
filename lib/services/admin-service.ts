import { apiClient, type ApiResponse } from "../api-clients"
import { API_CONFIG } from "../config"

// Admin data types
export interface AdminData {
  id?: string
  name: string
  email: string
  phone: string
  address?: string
  role: string
  permissions: string
  department: string
  accessLevel: string
  twoFactorEnabled?: boolean
  status: "active" | "inactive"
  password?: string
  password_confirmation?: string
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
    department?: string
  }): Promise<ApiResponse<AdminListResponse>> {
    return apiClient.get<AdminListResponse>(API_CONFIG.ENDPOINTS.ADMINS, params)
  }

  // Get single admin by ID
  async getAdminById(id: string): Promise<ApiResponse<AdminData>> {
    return apiClient.get<AdminData>(API_CONFIG.ENDPOINTS.ADMIN_BY_ID(id))
  }

  // Create new admin
  async createAdmin(adminData: AdminData): Promise<ApiResponse<AdminData>> {
    // Use the register endpoint for creating admin
    return apiClient.post<AdminData>(API_CONFIG.ENDPOINTS.USER_REGISTER, {
      ...adminData,
      user_type: "admin", // Specify user type
    })
  }

  // Update admin
  async updateAdmin(id: string, adminData: Partial<AdminData>): Promise<ApiResponse<AdminData>> {
    return apiClient.put<AdminData>(API_CONFIG.ENDPOINTS.ADMIN_BY_ID(id), adminData)
  }

  // Delete admin
  async deleteAdmin(id: string): Promise<ApiResponse<void>> {
    return apiClient.delete<void>(API_CONFIG.ENDPOINTS.ADMIN_BY_ID(id))
  }

  // Bulk operations
  async bulkUpdateAdmins(ids: string[], data: Partial<AdminData>): Promise<ApiResponse<void>> {
    return apiClient.post<void>(`${API_CONFIG.ENDPOINTS.ADMINS}/bulk-update`, {
      ids,
      data,
    })
  }

  async bulkDeleteAdmins(ids: string[]): Promise<ApiResponse<void>> {
    return apiClient.post<void>(`${API_CONFIG.ENDPOINTS.ADMINS}/bulk-delete`, {
      ids,
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
      password_confirmation: newPassword,
    })
  }
}

export const adminService = new AdminService()
