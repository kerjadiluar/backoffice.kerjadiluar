"use client"

import { useState, useEffect } from "react"
import { FaUserShield, FaUsers, FaKey, FaCrown, FaEdit, FaTrash, FaPlus, FaSearch, FaDownload } from "react-icons/fa"
import PageHeader from "@/components/ui/PageHeader"
import StatsCard from "@/components/ui/StatsCard"
import AdminModal from "../components/modals/AdminModal"
import DeleteModal from "../components/DeleteModal"
import BulkActionModal from "../components/BulkActionModal"
import { useAdmins } from "@/lib/hooks/useAdmins"
import { type AdminData, type CreateAdminRequest } from "@/lib/services/admin-service"
import { type ApiResponse } from "@/lib/api-clients"

export default function AdminPage() {
  const {
    admins,
    loading,
    error,
    pagination,
    loadAdmins,
    createAdmin,
    updateAdmin,
    deleteAdmin,
    bulkUpdateStatus,
    bulkDelete
  } = useAdmins({ initialLoad: true })

  const [filteredAdmins, setFilteredAdmins] = useState<AdminData[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("")
  const [roleFilter, setRoleFilter] = useState("")
  const [selectedAdmins, setSelectedAdmins] = useState<string[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(10)

  // Modal states
  const [showUserModal, setShowUserModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showBulkModal, setShowBulkModal] = useState(false)
  const [selectedAdmin, setSelectedAdmin] = useState<AdminData | null>(null)
  const [modalMode, setModalMode] = useState<"create" | "edit">("create")

  // Filter and search
  useEffect(() => {
    const filtered = admins.filter((admin) => {
      const matchesSearch =
        admin.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        admin.email?.toLowerCase().includes(searchTerm.toLowerCase())
      // const matchesStatus = statusFilter === "" || admin.status === statusFilter
      // const matchesRole = roleFilter === "" || admin.role === roleFilter

      // return matchesSearch && matchesStatus && matchesRole
    })

    setFilteredAdmins(filtered)
    setCurrentPage(1)
  }, [searchTerm, statusFilter, roleFilter, admins])

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentAdmins = filteredAdmins.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(filteredAdmins.length / itemsPerPage)

  // CRUD Operations
  const handleCreateAdmin = () => {
    setSelectedAdmin(null)
    setModalMode("create")
    setShowUserModal(true)
  }

  const handleEditAdmin = (admin: AdminData) => {
    setSelectedAdmin(admin)
    setModalMode("edit")
    setShowUserModal(true)
  }

  const handleDeleteAdmin = (admin: AdminData) => {
    setSelectedAdmin(admin)
    setShowDeleteModal(true)
  }

  // ... inside handleSaveAdmin
  const handleSaveAdmin = async (adminData: CreateAdminRequest | AdminData): Promise<ApiResponse<AdminData>> => {
    try {
      if (modalMode === "create") {
        const createData = adminData as CreateAdminRequest;
        const response = await createAdmin(createData);
        return {
          success: response.success,
          data: response.data,
          message: response.message,
          errors: response.errors,
          meta: response.meta,
        };
      } else {
        if (!selectedAdmin?.id) {
          return { success: false, message: "ID admin tidak ditemukan"};
        }
        const response = await updateAdmin(selectedAdmin.id, adminData as AdminData);
        return {
          success: response.success,
          data: response.data,
          message: response.message,
          errors: response.errors,
          meta: response.meta,
        };
      }
    } catch (error) {
      return { success: false, message: error instanceof Error ? error.message : "Gagal menyimpan admin"};
    }
  };

// ... inside handleConfirmDelete
const handleConfirmDelete = async () => {
  if (!selectedAdmin?.id) {
    console.warn("No admin selected for deletion."); // <<< ADD THIS
    return;
  }
  console.log("Calling deleteAdmin with ID:", selectedAdmin.id); // <<< ADD THIS
  try {
    await deleteAdmin(selectedAdmin.id);
    setShowDeleteModal(false);
  } catch (error) {
    console.error("Error deleting admin:", error);
  }
};

  // Bulk operations
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedAdmins(currentAdmins.map((admin) => admin.id!))
    } else {
      setSelectedAdmins([])
    }
  }

  const handleSelectAdmin = (adminId: string, checked: boolean) => {
    if (checked) {
      setSelectedAdmins([...selectedAdmins, adminId])
    } else {
      setSelectedAdmins(selectedAdmins.filter((id) => id !== adminId))
    }
  }

  const handleBulkAction = async (action: string) => {
    if (selectedAdmins.length === 0) {
      return
    }

    try {
      if (action === "activate") {
        await bulkUpdateStatus(selectedAdmins, "active")
      } else if (action === "deactivate") {
        await bulkUpdateStatus(selectedAdmins, "inactive")
      } else if (action === "delete") {
        await bulkDelete(selectedAdmins)
      }
      setSelectedAdmins([])
      setShowBulkModal(false)
    } catch (error) {
      console.error("Error performing bulk action:", error)
    }
  }

  return (
    <>
      <PageHeader title="Manajemen Admin" description="Kelola akun administrator dan hak akses sistem">
        <div className="flex space-x-2">
          {selectedAdmins.length > 0 && (
            <button
              onClick={() => setShowBulkModal(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
            >
              <FaUsers className="mr-2" />
              Aksi Massal ({selectedAdmins.length})
            </button>
          )}
          <button
            onClick={handleCreateAdmin}
            className="bg-red-900 text-white px-4 py-2 rounded-lg hover:bg-red-800 transition-colors flex items-center"
          >
            <FaPlus className="mr-2" />
            Tambah Admin
          </button>
        </div>
      </PageHeader>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
        <StatsCard
          title="Total Admin"
          value={admins.length.toString()}
          change="+2"
          changeType="positive"
          icon={<FaUserShield className="text-blue-600" />}
          iconBg="bg-blue-100"
        />

        {/* <StatsCard
          title="Admin Aktif"
          value={admins.filter((a) => a.status === "active").length.toString()}
          change="0"
          changeType="neutral"
          icon={<FaUsers className="text-green-600" />}
          iconBg="bg-green-100"
        />

        <StatsCard
          title="Super Admin"
          value={admins.filter((a) => a.role === "Super Admin").length.toString()}
          change="0"
          changeType="neutral"
          icon={<FaCrown className="text-yellow-600" />}
          iconBg="bg-yellow-100"
        /> */}

        <StatsCard
          title="Role Tersedia"
          value="5"
          change="+1"
          changeType="positive"
          icon={<FaKey className="text-purple-600" />}
          iconBg="bg-purple-100"
        />
      </div>

      {/* Filters and Search */}
      {/* <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 md:p-6 mb-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row gap-3 flex-1">
            <div className="relative flex-1 max-w-md">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Cari admin..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <option value="">Semua Status</option>
              <option value="active">Aktif</option>
              <option value="inactive">Tidak Aktif</option>
            </select>

            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <option value="">Semua Role</option>
              <option value="Super Admin">Super Admin</option>
              <option value="Verification Admin">Verification Admin</option>
              <option value="User Admin">User Admin</option>
            </select>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => handleBulkAction("export")}
              className="px-3 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors flex items-center"
            >
              <FaDownload className="mr-2" />
              Export
            </button>
          </div>
        </div>
      </div> */}

      {/* Admin Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 md:p-6 border-b border-gray-100">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-bold text-gray-900">Daftar Administrator</h3>
              <p className="text-sm text-gray-600 mt-1">
                Menampilkan {currentAdmins.length} dari {filteredAdmins.length} admin
              </p>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 md:px-6 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={selectedAdmins.length === currentAdmins.length && currentAdmins.length > 0}
                    onChange={(e) => handleSelectAll(e.target.checked)}
                    className="rounded border-gray-300 text-red-600 focus:ring-red-500"
                  />
                </th>
                <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Admin
                </th>
                <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Permissions
                </th>
                <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Login
                </th>
                <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentAdmins.map((admin) => (
                <tr key={admin.id} className="hover:bg-gray-50">
                  <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                    <input
                      type="checkbox"
                      checked={selectedAdmins.includes(admin.id!)}
                      onChange={(e) => handleSelectAdmin(admin.id!, e.target.checked)}
                      className="rounded border-gray-300 text-red-600 focus:ring-red-500"
                    />
                  </td>
                  <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-red-900 rounded-full flex items-center justify-center mr-3">
                        {/* <span className="text-white text-xs font-semibold">{admin.avatar}</span> */}
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">{admin.name}</div>
                        {/* <div className="text-xs text-gray-500">{admin.phone}</div> */}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{admin.email}</div>
                  </td>
                  <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                    {/* <div className="text-sm text-gray-900">{admin.role}</div> */}
                  </td>
                  <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                    {/* <div className="text-sm text-gray-900">{admin.permissions}</div> */}
                  </td>
                  <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                    {/* <div className="text-sm text-gray-500">{admin.lastLogin}</div> */}
                  </td>
                  <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                    {/* <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        admin.status === "active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                      }`}
                    >
                      {admin.status === "active" ? "Aktif" : "Tidak Aktif"}
                    </span> */}
                  </td>
                  <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEditAdmin(admin)}
                        className="text-blue-600 hover:text-blue-900 p-1"
                        title="Edit"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDeleteAdmin(admin)}
                        className="text-red-600 hover:text-red-900 p-1"
                        title="Hapus"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="px-4 md:px-6 py-3 border-t border-gray-200 flex items-center justify-between">
            <div className="text-sm text-gray-700">
              Menampilkan {indexOfFirstItem + 1} - {Math.min(indexOfLastItem, filteredAdmins.length)} dari{" "}
              {filteredAdmins.length} data
            </div>
            <div className="flex space-x-1">
              <button
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Sebelumnya
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-3 py-1 text-sm border rounded ${
                    currentPage === page ? "bg-red-900 text-white border-red-900" : "border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  {page}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Selanjutnya
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Modals */}
      <AdminModal
        isOpen={showUserModal}
        onClose={() => setShowUserModal(false)}
        onSave={handleSaveAdmin}
        userData={selectedAdmin}
        mode={modalMode}
      />

      <DeleteModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleConfirmDelete}
        userName={selectedAdmin?.name || ""}
        userType="Admin"
      />

      <BulkActionModal
        isOpen={showBulkModal}
        onClose={() => setShowBulkModal(false)}
        selectedUsers={admins.filter((admin) => selectedAdmins.includes(admin.id!))}
        onBulkAction={handleBulkAction}
        userType="admin"
      />
    </>
  )
}
