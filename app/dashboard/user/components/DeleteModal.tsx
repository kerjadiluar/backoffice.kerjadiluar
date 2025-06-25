"use client"

import { useState } from "react"
import { FaExclamationTriangle, FaTrash, FaSpinner } from "react-icons/fa"

interface DeleteModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  userName: string
  userType: string
}

export default function DeleteModal({ isOpen, onClose, onConfirm, userName, userType }: DeleteModalProps) {
  const [isLoading, setIsLoading] = useState(false)

  const handleConfirm = async () => {
    setIsLoading(true)
    try {
      await onConfirm()
      onClose()
    } catch (error) {
      console.error("Error deleting user:", error)
    } finally {
      setIsLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md">
        <div className="p-6">
          <div className="flex items-center justify-center w-12 h-12 mx-auto bg-red-100 rounded-full mb-4">
            <FaExclamationTriangle className="text-red-600 text-xl" />
          </div>

          <h3 className="text-lg font-bold text-gray-900 text-center mb-2">Hapus {userType}</h3>

          <p className="text-gray-600 text-center mb-6">
            Apakah Anda yakin ingin menghapus <strong>{userName}</strong>? Tindakan ini tidak dapat dibatalkan.
          </p>

          <div className="flex space-x-3">
            <button
              onClick={onClose}
              disabled={isLoading}
              className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50"
            >
              Batal
            </button>
            <button
              onClick={handleConfirm}
              disabled={isLoading}
              className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <FaSpinner className="animate-spin mr-2" />
                  Menghapus...
                </>
              ) : (
                <>
                  <FaTrash className="mr-2" />
                  Hapus
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
