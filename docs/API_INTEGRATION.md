# API Integration Documentation

## Overview
Backoffice KerjaDiluar menggunakan API database yang terpisah dengan endpoint utama di `http://192.168.20.33:8000`.

## Endpoints

### Authentication
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `POST /api/auth/refresh` - Refresh token

### User Management
- `GET /api/users` - Get all users
- `POST /api/users/register` - Register new user (including admin)
- `GET /api/users/{id}` - Get user by ID
- `PUT /api/users/{id}` - Update user
- `DELETE /api/users/{id}` - Delete user

### Admin Specific
- `GET /api/admins` - Get all admins
- `GET /api/admins/{id}` - Get admin by ID
- `PUT /api/admins/{id}` - Update admin
- `DELETE /api/admins/{id}` - Delete admin
- `PATCH /api/admins/{id}` - Update admin status
- `POST /api/admins/{id}/reset-password` - Reset admin password

## Service Layer

### AdminService
Service layer untuk mengelola operasi admin:

```typescript
import { adminService } from "@/lib/services/admin-service"

// Create new admin
const newAdmin = await adminService.createAdmin({
  name: "John Doe",
  email: "john@example.com",
  password: "password123",
  role: "admin",
  user_type: "admin"
})

// Get all admins
const admins = await adminService.getAdmins({
  page: 1,
  per_page: 10,
  search: "john",
  status: "active"
})

// Update admin
const updatedAdmin = await adminService.updateAdmin("1", {
  name: "John Updated",
  status: "inactive"
})

// Delete admin
await adminService.deleteAdmin("1")
```

## Data Structures

### AdminData Interface
```typescript
interface AdminData {
  id?: string
  name: string
  email: string
  password?: string
  phone?: string
  address?: string
  role?: string
  permissions?: string
  department?: string
  accessLevel?: string
  lastLogin?: string
  twoFactorEnabled?: boolean
  status?: "active" | "inactive"
  avatar?: string
  createdAt?: string
  updatedAt?: string
}
```

### CreateAdminRequest Interface
```typescript
interface CreateAdminRequest {
  name: string
  email: string
  password: string
  password_confirmation: string
}
```

## Error Handling

API responses follow this structure:
```typescript
interface ApiResponse<T> {
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
```

## Authentication

Token authentication menggunakan Bearer token yang disimpan di localStorage:
```typescript
// Set token after login
localStorage.setItem("auth_token", token)

// Token automatically included in API requests
const headers = {
  "Authorization": `Bearer ${token}`,
  "Content-Type": "application/json"
}
```

## Usage Examples

### Creating Admin via Frontend
1. User clicks "Tambah Admin" button
2. Modal form opens dengan field sederhana:
   - Nama Lengkap (required)
   - Email (required, dengan validasi format)
   - Password (required, minimal 6 karakter)
   - Konfirmasi Password (required, harus sama dengan password)
3. Form data sent to `/api/users/register` dengan `role: "admin"` dan `user_type: "admin"`
4. Success response updates local state
5. Toast notification shows success message

### Form Validation
- **Nama**: Wajib diisi
- **Email**: Wajib diisi dengan format email yang valid
- **Password**: Wajib diisi, minimal 6 karakter
- **Konfirmasi Password**: Wajib diisi dan harus sama dengan password

### Error Handling Example
```typescript
try {
  const response = await adminService.createAdmin(adminData)
  if (response.success && response.data) {
    // Handle success
    toast.success("Admin berhasil ditambahkan!")
  } else {
    throw new Error(response.message || "Gagal menambahkan admin")
  }
} catch (error: any) {
  console.error("Error:", error)
  toast.error(error.message || "Terjadi kesalahan")
}
```

## Configuration

Update `.env.local` file:
```env
NEXT_PUBLIC_API_URL=http://192.168.20.33:8000
NEXT_PUBLIC_AUTH_TOKEN_KEY=auth_token
```

## Testing

Untuk testing API integration:
1. Pastikan backend server berjalan di `http://192.168.20.33:8000`
2. Test endpoint `/api/users/register` dengan data admin
3. Verifikasi response format sesuai dengan `ApiResponse<T>`
4. Test error handling dengan invalid data 