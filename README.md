# KerjaDiluar Backoffice

Frontend application untuk backoffice KerjaDiluar yang terintegrasi dengan API database terpisah.

## 🚀 Fitur Utama

- **User Management**: Manajemen admin, karyawan, mentor, mitra, pengajar, dan pengguna
- **Verification System**: Sistem verifikasi administrasi, keberangkatan, kepulangan, dan pelatihan
- **Dashboard Analytics**: Statistik dan monitoring sistem
- **API Integration**: Terintegrasi dengan backend API di `http://192.168.20.33:8000`

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI + Custom Components
- **State Management**: React Hooks + Custom Hooks
- **HTTP Client**: Fetch API dengan custom wrapper
- **Notifications**: Sonner
- **Icons**: Lucide React + React Icons

## 📁 Struktur Project

```
backoffice.kerjadiluar/
├── app/                    # Next.js App Router
│   ├── dashboard/         # Dashboard pages
│   │   ├── user/         # User management
│   │   └── verifikasi/   # Verification system
│   ├── login/            # Authentication
│   └── layout.tsx        # Root layout
├── components/           # Reusable components
│   ├── ui/              # Base UI components
│   ├── layout/          # Layout components
│   └── features/        # Feature-specific components
├── lib/                 # Utilities and services
│   ├── api/            # API utilities
│   ├── services/       # Business logic services
│   ├── hooks/          # Custom hooks
│   ├── types/          # TypeScript types
│   └── utils/          # Utility functions
├── public/             # Static assets
└── docs/              # Documentation
```

## 🔧 Setup & Installation

1. **Clone repository**
   ```bash
   git clone <repository-url>
   cd backoffice.kerjadiluar
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   Buat file `.env.local`:
   ```env
   NEXT_PUBLIC_API_URL=http://192.168.20.33:8000
   NEXT_PUBLIC_AUTH_TOKEN_KEY=auth_token
   ```

4. **Run development server**
   ```bash
   npm run dev
   ```

5. **Build for production**
   ```bash
   npm run build
   npm start
   ```

## 🔌 API Integration

### Endpoints

- **Authentication**: `/api/auth/*`
- **User Management**: `/api/users/*`
- **Admin Specific**: `/api/admins/*`

### Service Layer

Menggunakan service layer pattern untuk mengelola API calls:

```typescript
import { adminService } from "@/lib/services/admin-service"

// Create admin
const newAdmin = await adminService.createAdmin({
  name: "John Doe",
  email: "john@example.com",
  password: "password123",
  role: "admin"
})

// Get admins with pagination
const admins = await adminService.getAdmins({
  page: 1,
  per_page: 10,
  search: "john"
})
```

### Custom Hooks

Menggunakan custom hooks untuk state management:

```typescript
import { useAdmins } from "@/lib/hooks/useAdmins"

function AdminPage() {
  const {
    admins,
    loading,
    createAdmin,
    updateAdmin,
    deleteAdmin
  } = useAdmins()

  // Component logic...
}
```

## 📋 User Management

### Admin Management

- **Create Admin**: Form modal sederhana dengan nama, email, password, dan konfirmasi password
- **Edit Admin**: Update data admin existing
- **Delete Admin**: Soft delete dengan konfirmasi
- **Bulk Operations**: Aktifkan/nonaktifkan/hapus multiple admin
- **Search & Filter**: Pencarian berdasarkan nama, email, status, role

### Data Structure

```typescript
interface CreateAdminRequest {
  name: string
  email: string
  password: string
  password_confirmation: string
}
```

## 🔐 Authentication

- **Token-based**: Bearer token disimpan di localStorage
- **Auto-refresh**: Token refresh otomatis
- **Protected Routes**: Middleware untuk route protection

## 🎨 UI/UX Features

- **Responsive Design**: Mobile-first approach
- **Dark/Light Mode**: Theme switching (planned)
- **Loading States**: Skeleton loading dan spinners
- **Error Handling**: Toast notifications untuk feedback
- **Form Validation**: Client-side validation dengan error messages

## 📊 Dashboard Features

- **Statistics Cards**: Overview metrics
- **Data Tables**: Sortable dan filterable tables
- **Charts**: Data visualization (planned)
- **Real-time Updates**: Live data updates (planned)

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm run test:coverage

# Run e2e tests
npm run test:e2e
```

## 📚 Documentation

- [API Integration Guide](./docs/API_INTEGRATION.md)
- [Component Documentation](./docs/COMPONENTS.md)
- [Deployment Guide](./docs/DEPLOYMENT.md)

## 🤝 Contributing

1. Fork repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

Untuk bantuan dan pertanyaan:
- Email: support@kejadiluar.com
- Documentation: [docs.kejadiluar.com](https://docs.kejadiluar.com)
- Issues: [GitHub Issues](https://github.com/kejadiluar/backoffice/issues)
