"use client"

import { useState } from "react"
import { FaUsers, FaSpinner } from "react-icons/fa"

interface BulkActionModalProps {
  isOpen: boolean
  onClose: () => void
  selectedUsers: any[]
  onBulkAction: (action: string) => void
  userType: string
}

export default function BulkActionModal({
  isOpen,
  onClose,
  selectedUsers,
  onBulkAction,
  userType,
}: BulkActionModalProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [selectedAction, setSelectedAction] = useState("")

  const handleBulkAction = async () => {
    if (!selectedAction) return

    setIsLoading(true)
    try {
      await onBulkAction(selectedAction)
      onClose()
    } catch (error) {
      console.error("Error performing bulk action:", error)
    } finally {
      setIsLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md">
        <div className="p-6">
          <div className="flex items-center justify-center w-12 h-12 mx-auto bg-blue-100 rounded-full mb-4">
            <FaUsers className="text-blue-600 text-xl" />
          </div>

          <h3 className="text-lg font-bold text-gray-900 text-center mb-2">Aksi Massal</h3>

          <p className="text-gray-600 text-center mb-4">
            {selectedUsers.length} {userType} dipilih
          </p>

          <div className="space-y-3 mb-6">
            <label className="flex items-center p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
              <input
                type="radio"
                name="bulkAction"
                value="activate"
                checked={selectedAction === "activate"}
                onChange={(e) => setSelectedAction(e.target.value)}
                className="mr-3"
              />
              <span className="text-sm">Aktifkan Semua</span>
            </label>

            <label className="flex items-center p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
              <input
                type="radio"
                name="bulkAction"
                value="deactivate"
                checked={selectedAction === "deactivate"}
                onChange={(e) => setSelectedAction(e.target.value)}
                className="mr-3"
              />
              <span className="text-sm">Nonaktifkan Semua</span>
            </label>

            <label className="flex items-center p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
              <input
                type="radio"
                name="bulkAction"
                value="export"
                checked={selectedAction === "export"}
                onChange={(e) => setSelectedAction(e.target.value)}
                className="mr-3"
              />
              <span className="text-sm">Export Data</span>
            </label>

            <label className="flex items-center p-3 border border-red-200 rounded-lg cursor-pointer hover:bg-red-50">
              <input
                type="radio"
                name="bulkAction"
                value="delete"
                checked={selectedAction === "delete"}
                onChange={(e) => setSelectedAction(e.target.value)}
                className="mr-3"
              />
              <span className="text-sm text-red-600">Hapus Semua</span>
            </label>
          </div>

          <div className="flex space-x-3">
            <button
              onClick={onClose}
              disabled={isLoading}
              className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50"
            >
              Batal
            </button>
            <button
              onClick={handleBulkAction}
              disabled={isLoading || !selectedAction}
              className="flex-1 px-4 py-2 bg-red-900 text-white rounded-lg hover:bg-red-800 transition-colors flex items-center justify-center disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <FaSpinner className="animate-spin mr-2" />
                  Memproses...
                </>
              ) : (
                "Jalankan"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
