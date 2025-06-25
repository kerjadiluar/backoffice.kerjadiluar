import { API_CONFIG, REQUEST_TIMEOUT } from "./config"

// Types for API responses
export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  message?: string
  errors?: Record<string, string[]>
  meta?: {
    total: number
    page: number
    per_page: number
    last_page: number
  }
}

export interface ApiError {
  message: string
  status: number
  errors?: Record<string, string[]>
}

class ApiClient {
  private baseURL: string
  private defaultHeaders: Record<string, string>

  constructor() {
    this.baseURL = API_CONFIG.BASE_URL
    this.defaultHeaders = API_CONFIG.HEADERS
  }

  // Get auth token from localStorage or cookies
  private getAuthToken(): string | null {
    if (typeof window !== "undefined") {
      return localStorage.getItem("auth_token") || sessionStorage.getItem("auth_token")
    }
    return null
  }

  // Set auth headers
  private getHeaders(customHeaders?: Record<string, string>): Record<string, string> {
    const headers = { ...this.defaultHeaders, ...customHeaders }

    const token = this.getAuthToken()
    if (token) {
      headers["Authorization"] = `Bearer ${token}`
    }

    return headers
  }

  // Generic request method
  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
    const url = `${this.baseURL}${endpoint}`
    const headers = this.getHeaders(options.headers as Record<string, string>)

    try {
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT)

      const response = await fetch(url, {
        ...options,
        headers,
        signal: controller.signal,
      })

      clearTimeout(timeoutId)

      const data = await response.json()

      if (!response.ok) {
        throw {
          message: data.message || "Request failed",
          status: response.status,
          errors: data.errors,
        } as ApiError
      }

      return data
    } catch (error: any) {
      if (error.name === "AbortError") {
        throw {
          message: "Request timeout",
          status: 408,
        } as ApiError
      }

      // Network error
      if (!error.status) {
        throw {
          message: "Network error. Please check your connection.",
          status: 0,
        } as ApiError
      }

      throw error
    }
  }

  // HTTP Methods
  async get<T>(endpoint: string, params?: Record<string, any>): Promise<ApiResponse<T>> {
    let url = endpoint
    if (params) {
      const searchParams = new URLSearchParams()
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          searchParams.append(key, String(value))
        }
      })
      url += `?${searchParams.toString()}`
    }

    return this.request<T>(url, { method: "GET" })
  }

  async post<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: "POST",
      body: data ? JSON.stringify(data) : undefined,
    })
  }

  async put<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: "PUT",
      body: data ? JSON.stringify(data) : undefined,
    })
  }

  async patch<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: "PATCH",
      body: data ? JSON.stringify(data) : undefined,
    })
  }

  async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: "DELETE" })
  }

  // File upload method
  async uploadFile<T>(endpoint: string, formData: FormData): Promise<ApiResponse<T>> {
    const headers = this.getHeaders()
    delete headers["Content-Type"] // Let browser set content-type for FormData

    return this.request<T>(endpoint, {
      method: "POST",
      body: formData,
      headers,
    })
  }
}

export const apiClient = new ApiClient()
