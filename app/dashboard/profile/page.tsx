"use client"

import { useState } from "react"
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaCalendarAlt, FaEdit, FaSave, FaTimes, FaCamera } from "react-icons/fa"
import PageHeader from "@/components/ui/PageHeader"

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState({
    fullName: "Admin Kejadiluar",
    email: "admin@kejadiluar.com",
    phone: "+62 21 1234 5678",
    role: "Super Admin",
    department: "Administration",
    location: "Jakarta, Indonesia",
    joinDate: "2022-01-15",
    employeeId: "EMP-001",
    bio: "Experienced administrator with over 5 years in overseas worker management. Specialized in system administration and team coordination.",
    avatar: "AK"
  })

  const [editData, setEditData] = useState(profileData)

  const handleEdit = () => {
    setIsEditing(true)
    setEditData(profileData)
  }

  const handleSave = () => {
    setProfileData(editData)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditData(profileData)
    setIsEditing(false)
  }

  const handleInputChange = (field: string, value: string) => {
    setEditData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const activityLog = [
    { id: 1, action: "Updated user permissions", timestamp: "2024-01-15 14:30", type: "system" },
    { id: 2, action: "Approved visa application", timestamp: "2024-01-15 13:45", type: "approval" },
    { id: 3, action: "Created new training schedule", timestamp: "2024-01-15 11:20", type: "create" },
    { id: 4, action: "Exported financial report", timestamp: "2024-01-15 09:15", type: "export" },
    { id: 5, action: "Updated system settings", timestamp: "2024-01-14 16:30", type: "system" },
  ]

  const permissions = [
    { module: "User Management", access: "Full Access", status: "active" },
    { module: "Financial Management", access: "Read/Write", status: "active" },
    { module: "Visa Processing", access: "Full Access", status: "active" },
    { module: "Training Management", access: "Read/Write", status: "active" },
    { module: "System Settings", access: "Full Access", status: "active" },
    { module: "Reports & Analytics", access: "Full Access", status: "active" },
  ]

  return (
    <>
      <PageHeader
        title="Profile"
        description="Manage your personal information and account settings"
      >
        {!isEditing ? (
          <button
            onClick={handleEdit}
            className="bg-red-900 text-white px-4 py-2 rounded-lg hover:bg-red-800 transition-colors flex items-center"
          >
            <FaEdit className="mr-2" />
            Edit Profile
          </button>
        ) : (
          <div className="flex space-x-2">
            <button
              onClick={handleSave}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center"
            >
              <FaSave className="mr-2" />
              Save
            </button>
            <button
              onClick={handleCancel}
              className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors flex items-center"
            >
              <FaTimes className="mr-2" />
              Cancel
            </button>
          </div>
        )}
      </PageHeader>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Information */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Information */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-6">Basic Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editData.fullName}
                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                ) : (
                  <p className="text-gray-900">{profileData.fullName}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                {isEditing ? (
                  <input
                    type="email"
                    value={editData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                ) : (
                  <p className="text-gray-900">{profileData.email}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                {isEditing ? (
                  <input
                    type="tel"
                    value={editData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                ) : (
                  <p className="text-gray-900">{profileData.phone}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                ) : (
                  <p className="text-gray-900">{profileData.location}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
                <p className="text-gray-900">{profileData.role}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
                <p className="text-gray-900">{profileData.department}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Employee ID</label>
                <p className="text-gray-900">{profileData.employeeId}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Join Date</label>
                <p className="text-gray-900">{profileData.joinDate}</p>
              </div>
            </div>

            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
              {isEditing ? (
                <textarea
                  value={editData.bio}
                  onChange={(e) => handleInputChange('bio', e.target.value)}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              ) : (
                <p className="text-gray-900">{profileData.bio}</p>
              )}
            </div>
          </div>

          {/* Permissions */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-6">Permissions & Access</h3>
            
            <div className="space-y-4">
              {permissions.map((permission, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-900">{permission.module}</h4>
                    <p className="text-sm text-gray-600">{permission.access}</p>
                  </div>
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    permission.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {permission.status === 'active' ? 'Active' : 'Inactive'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Profile Picture */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-6">Profile Picture</h3>
            
            <div className="flex flex-col items-center">
              <div className="relative">
                <div className="w-24 h-24 bg-gradient-to-r from-red-900 to-red-800 rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-2xl">{profileData.avatar}</span>
                </div>
                <button className="absolute bottom-0 right-0 w-8 h-8 bg-red-600 rounded-full flex items-center justify-center text-white hover:bg-red-700 transition-colors">
                  <FaCamera className="text-xs" />
                </button>
              </div>
              
              <div className="mt-4 text-center">
                <h4 className="font-semibold text-gray-900">{profileData.fullName}</h4>
                <p className="text-sm text-gray-600">{profileData.role}</p>
                <p className="text-xs text-gray-500 mt-1">{profileData.department}</p>
              </div>

              <button className="mt-4 px-4 py-2 bg-red-900 text-white rounded-lg hover:bg-red-800 transition-colors text-sm">
                Change Picture
              </button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-6">Quick Stats</h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Total Logins</span>
                <span className="font-semibold text-gray-900">1,247</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Last Login</span>
                <span className="font-semibold text-gray-900">Today, 09:30</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Actions This Month</span>
                <span className="font-semibold text-gray-900">156</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Account Status</span>
                <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                  Active
                </span>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-6">Recent Activity</h3>
            
            <div className="space-y-4">
              {activityLog.slice(0, 5).map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3">
                  <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                    activity.type === 'system' ? 'bg-blue-500' :
                    activity.type === 'approval' ? 'bg-green-500' :
                    activity.type === 'create' ? 'bg-yellow-500' : 'bg-purple-500'
                  }`}></div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-900">{activity.action}</p>
                    <p className="text-xs text-gray-500">{activity.timestamp}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
