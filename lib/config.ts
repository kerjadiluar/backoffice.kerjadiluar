// API Configuration
export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || "http://192.168.20.33:8000",
  ENDPOINTS: {
    // Auth endpoints
    LOGIN: "/api/auth/login",
    LOGOUT: "/api/auth/logout",
    REFRESH: "/api/auth/refresh",

    // User endpoints
    USERS: "/api/users",
    USER_REGISTER: "/api/users/register",
    USER_BY_ID: (id: string) => `/api/users/${id}`,

    // Admin specific endpoints
    ADMINS: "/api/admins",
    ADMIN_BY_ID: (id: string) => `/api/admins/${id}`,

    // Other user types
    PENGAJAR: "/api/pengajar",
    MENTOR: "/api/mentor",
    KARYAWAN: "/api/karyawan",
    MITRA: "/api/mitra",
    PENGGUNA: "/api/pengguna",
  },
  HEADERS: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
}

// Request timeout
export const REQUEST_TIMEOUT = 10000 // 10 seconds
