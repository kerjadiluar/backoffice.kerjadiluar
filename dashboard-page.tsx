"use client"
import { useState, useRef, useEffect } from "react"
import {
  FaHome,
  FaCheckCircle,
  FaUsers,
  FaUserShield,
  FaChalkboardTeacher,
  FaUserTie,
  FaUserFriends,
  FaHandshake,
  FaBullhorn,
  FaCertificate,
  FaPassport,
  FaPlane,
  FaHotel,
  FaBookOpen,
  FaMoneyBill,
  FaFileContract,
  // FaNetworkWiwhite,
  FaLifeRing,
  FaChevronDown,
  FaChevronRight,
  FaChevronLeft,
  FaSignOutAlt,
  FaUserCircle,
  FaUserCheck,
  FaUserPlus,
  FaClock,
  FaBell,
  FaSearch,
  FaCog,
  // FaTrendingUp,
  FaBars,
  FaTimes,
} from "react-icons/fa"


const utamaMenu = [
  { name: "Beranda", href: "/dashboard", icon: <FaHome /> },
  {
    name: "Verifikasi",
    icon: <FaCheckCircle />,
    children: [
      { name: "Administrasi", href: "/dashboard/verifikasi/administrasi", icon: <FaUserShield /> },
      { name: "Pelatihan", href: "/dashboard/verifikasi/pelatihan", icon: <FaChalkboardTeacher /> },
      { name: "Keberangkatan", href: "/dashboard/verifikasi/keberangkatan", icon: <FaPlane /> },
      { name: "Kepulangan", href: "/dashboard/verifikasi/kepulangan", icon: <FaHotel /> },
    ],
  },
  {
    name: "User Management",
    icon: <FaUsers />,
    children: [
      { name: "Pengguna", href: "/dashboard/user/pengguna", icon: <FaUserFriends /> },
      { name: "Admin", href: "/dashboard/user/admin", icon: <FaUserShield /> },
      { name: "Pengajar", href: "/dashboard/user/pengajar", icon: <FaChalkboardTeacher /> },
      { name: "Mentor", href: "/dashboard/user/mentor", icon: <FaUserTie /> },
      { name: "Karyawan", href: "/dashboard/user/karyawan", icon: <FaUserTie /> },
      { name: "Mitra", href: "/dashboard/user/mitra", icon: <FaHandshake /> },
    ],
  },
]

const umumMenu = [
  { name: "Pemasaran & Rekrutmen", href: "/dashboard/umum/pemasaran", icon: <FaBullhorn /> },
  { name: "Tes & Sertifikasi", href: "/dashboard/umum/tes", icon: <FaCertificate /> },
  { name: "Visa & Izin", href: "/dashboard/umum/visa", icon: <FaPassport /> },
  { name: "Perjalanan & Asuransi", href: "/dashboard/umum/perjalanan", icon: <FaPlane /> },
  { name: "Onboarding & Residensi", href: "/dashboard/umum/onboarding", icon: <FaHotel /> },
  { name: "Orientasi Kerja", href: "/dashboard/umum/orientasi", icon: <FaBookOpen /> },
  { name: "Pembiayaan", href: "/dashboard/umum/pembiayaan", icon: <FaMoneyBill /> },
  { name: "Manajemen Kontrak", href: "/dashboard/umum/kontrak", icon: <FaFileContract /> },
  // { name: "Manajemen Komunitas", href: "/dashboard/umum/komunitas", icon: <FaNetworkWiwhite /> },
  { name: "Bantuan Darurat", href: "/dashboard/umum/bantuan", icon: <FaLifeRing /> },
]

export default function DashboardPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const [showLogout, setShowLogout] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const logoutRef = useRef<HTMLDivElement>(null)
  const notificationRef = useRef<HTMLDivElement>(null)

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
      if (window.innerWidth < 768) {
        setSidebarCollapsed(true)
      }
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  // Close menus when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (logoutRef.current && !logoutRef.current.contains(event.target as Node)) {
        setShowLogout(false)
      }
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setShowNotifications(false)
      }
    }
    if (showLogout || showNotifications) {
      document.addEventListener("mousedown", handleClickOutside)
    } else {
      document.removeEventListener("mousedown", handleClickOutside)
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [showLogout, showNotifications])

  const handleDropdown = (name: string) => {
    if (sidebarCollapsed && !isMobile) return
    setOpenDropdown(openDropdown === name ? null : name)
  }

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  const user = { name: "Admin Kejadiluar", role: "Super Admin", avatar: "AK" }

  return (
    <div className="min-h-screen bg-gray-50 flex relative">
      {/* Mobile Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden" onClick={() => setMobileMenuOpen(false)} />
      )}

      {/* Sidebar */}
      <div
        className={`
          ${isMobile ? "fixed" : "relative"} 
          ${isMobile && !mobileMenuOpen ? "-translate-x-full" : "translate-x-0"}
          ${!isMobile && sidebarCollapsed ? "w-16" : "w-72"}
          bg-white-900 border-r border-white-800 transition-all duration-300 
          flex flex-col h-screen shadow-lg z-50
        `}
      >
        {/* Sidebar Header */}
        <div className="p-4 border-b border-white-800 flex-shrink-0">
          <div className="flex items-center justify-between">
            {(!sidebarCollapsed || isMobile) && (
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
                  <span className="text-white-900 font-bold text-lg">K</span>
                </div>
                <div>
                  <h1 className="text-xl font-bold text-white">Kejadiluar</h1>
                  <p className="text-xs text-white-200">Admin Panel</p>
                </div>
              </div>
            )}
            <div className="flex items-center space-x-2">
              {isMobile && (
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 hover:bg-white-800 rounded-lg transition-colors text-white-200 hover:text-white md:hidden"
                >
                  <FaTimes />
                </button>
              )}
              {!isMobile && (
                <button
                  onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                  className="p-2 hover:bg-white-800 rounded-lg transition-colors text-white-200 hover:text-white"
                  aria-label="Toggle sidebar"
                >
                  {sidebarCollapsed ? <FaChevronRight /> : <FaChevronLeft />}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4 px-3 slim-scroll">
          {/* Main Section */}
          <div className="mb-8">
            {(!sidebarCollapsed || isMobile) && (
              <p className="uppercase text-xs font-semibold text-white-200 px-3 mb-3 tracking-wider">Menu Utama</p>
            )}
            {utamaMenu.map((item) => (
              <div key={item.name} className="mb-1">
                {item.children ? (
                  <div>
                    <button
                      onClick={() => handleDropdown(item.name)}
                      className={`w-full flex items-center py-3 px-3 rounded-lg hover:bg-white-800 focus:outline-none text-left transition-all duration-200 group ${
                        !isMobile && sidebarCollapsed ? "justify-center" : ""
                      } ${openDropdown === item.name ? "bg-white-800 text-white" : "text-white-100 hover:text-white"}`}
                      title={!isMobile && sidebarCollapsed ? item.name : undefined}
                    >
                      <span
                        className={`text-lg flex-shrink-0 ${openDropdown === item.name ? "text-white" : "text-white-300 group-hover:text-white"}`}
                      >
                        {item.icon}
                      </span>
                      {(isMobile || !sidebarCollapsed) && (
                        <>
                          <span className="flex-1 ml-3 font-medium">{item.name}</span>
                          <span
                            className={`ml-2 text-sm transition-transform duration-200 ${openDropdown === item.name ? "rotate-180" : ""}`}
                          >
                            <FaChevronDown />
                          </span>
                        </>
                      )}
                    </button>
                    {openDropdown === item.name && (isMobile || !sidebarCollapsed) && (
                      <div className="mt-1 ml-3 space-y-1 bg-white-800 bg-opacity-50 rounded-lg p-2">
                        {item.children.map((child: any) => (
                          <a
                            key={child.name}
                            href={child.href}
                            className="flex items-center px-3 py-2 text-sm text-white-100 hover:text-white hover:bg-white-700 rounded-lg transition-colors group"
                            onClick={() => isMobile && setMobileMenuOpen(false)}
                          >
                            <span className="mr-3 text-base flex-shrink-0 text-white-300 group-hover:text-white">
                              {child.icon}
                            </span>
                            {child.name}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <a
                    href={item.href}
                    className={`flex items-center py-3 px-3 rounded-lg hover:bg-white-800 transition-colors group ${
                      !isMobile && sidebarCollapsed ? "justify-center" : ""
                    } text-white-100 hover:text-white`}
                    title={!isMobile && sidebarCollapsed ? item.name : undefined}
                    onClick={() => isMobile && setMobileMenuOpen(false)}
                  >
                    <span className="text-lg flex-shrink-0 text-white-300 group-hover:text-white">{item.icon}</span>
                    {(isMobile || !sidebarCollapsed) && <span className="ml-3 font-medium">{item.name}</span>}
                  </a>
                )}
              </div>
            ))}
          </div>

          {/* General Section */}
          <div className="mb-4">
            {(!sidebarCollapsed || isMobile) && (
              <p className="uppercase text-xs font-semibold text-white-200 px-3 mb-3 tracking-wider">Menu Umum</p>
            )}
            {umumMenu.map((item) => (
              <div key={item.name} className="mb-1">
                <a
                  href={item.href}
                  className={`flex items-center py-3 px-3 rounded-lg hover:bg-white-800 transition-colors group ${
                    !isMobile && sidebarCollapsed ? "justify-center" : ""
                  } text-white-100 hover:text-white`}
                  title={!isMobile && sidebarCollapsed ? item.name : undefined}
                  onClick={() => isMobile && setMobileMenuOpen(false)}
                >
                  <span className="text-lg flex-shrink-0 text-white-300 group-hover:text-white">{item.icon}</span>
                  {(isMobile || !sidebarCollapsed) && <span className="ml-3 font-medium">{item.name}</span>}
                </a>
              </div>
            ))}
          </div>
        </nav>

        {/* Sidebar Footer */}
        {(!sidebarCollapsed || isMobile) && (
          <div className="p-4 border-t border-white-800">
            <div className="bg-gradient-to-r from-white-800 to-white-700 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                {/* <FaTrendingUp className="text-white text-sm" /> */}
                <span className="text-sm font-medium text-white">Upgrade Plan</span>
              </div>
              <p className="text-xs text-white-100 mb-3">Unlock advanced features for better management</p>
              <button className="w-full bg-white text-white-900 text-xs py-2 px-3 rounded-md hover:bg-white-50 transition-colors font-medium">
                Learn More
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-screen min-w-0">
        {/* Header */}
        <header className="bg-white border-b border-white-100 px-4 md:px-6 py-4 flex items-center justify-between flex-shrink-0 shadow-sm">
          <div className="flex items-center space-x-4">
            {isMobile && (
              <button
                onClick={toggleMobileMenu}
                className="p-2 text-gray-600 hover:text-white-900 hover:bg-white-50 rounded-lg transition-colors md:hidden"
              >
                <FaBars className="text-lg" />
              </button>
            )}
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-gray-900">Dashboard</h2>
              <p className="text-xs md:text-sm text-gray-500 mt-1 hidden sm:block">
                Welcome back! Here's what's happening today.
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2 md:space-x-4">
            {/* Search - Hidden on mobile */}
            <div className="relative hidden lg:block">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-white-500 focus:border-transparent w-48 xl:w-64"
              />
            </div>

            {/* Mobile Search Button */}
            <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors lg:hidden">
              <FaSearch className="text-lg" />
            </button>

            {/* Notifications */}
            <div className="relative" ref={notificationRef}>
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <FaBell className="text-lg" />
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-white-500 text-white text-xs rounded-full flex items-center justify-center">
                  3
                </span>
              </button>
              {showNotifications && (
                <div className="absolute right-0 top-12 bg-white shadow-xl rounded-lg border border-gray-200 z-50 w-80 max-w-[90vw]">
                  <div className="p-4 border-b border-gray-100">
                    <h3 className="font-semibold text-gray-900">Notifications</h3>
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    <div className="p-4 hover:bg-gray-50 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900">New user registration</p>
                      <p className="text-xs text-gray-500 mt-1">5 minutes ago</p>
                    </div>
                    <div className="p-4 hover:bg-gray-50 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900">Verification completed</p>
                      <p className="text-xs text-gray-500 mt-1">1 hour ago</p>
                    </div>
                    <div className="p-4 hover:bg-gray-50">
                      <p className="text-sm font-medium text-gray-900">System maintenance scheduled</p>
                      <p className="text-xs text-gray-500 mt-1">2 hours ago</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Settings - Hidden on small mobile */}
            <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors hidden sm:block">
              <FaCog className="text-lg" />
            </button>

            {/* User Menu */}
            <div className="relative" ref={logoutRef}>
              <button
                onClick={() => setShowLogout(!showLogout)}
                className="flex items-center space-x-2 md:space-x-3 p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="text-right hidden md:block">
                  <p className="font-semibold text-gray-900 text-sm">{user.name}</p>
                  <p className="text-xs text-gray-500">{user.role}</p>
                </div>
                <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-r from-white-900 to-white-800 rounded-full flex items-center justify-center shadow-sm">
                  <span className="text-white font-semibold text-xs md:text-sm">{user.avatar}</span>
                </div>
              </button>
              {showLogout && (
                <div className="absolute right-0 top-14 bg-white shadow-xl rounded-lg border border-gray-200 z-50 min-w-[200px]">
                  <div className="p-2">
                    <button className="flex items-center w-full px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                      <FaUserCircle className="mr-3" /> Profile
                    </button>
                    <button className="flex items-center w-full px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                      <FaCog className="mr-3" /> Settings
                    </button>
                    <hr className="my-2" />
                    <button
                      onClick={() => (window.location.href = "/login")}
                      className="flex items-center w-full px-3 py-2 text-white-600 hover:bg-white-50 rounded-lg transition-colors"
                    >
                      <FaSignOutAlt className="mr-3" /> Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
            <div className="bg-white p-4 md:p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <p className="text-gray-500 text-sm font-medium truncate">Total Pengguna Aktif</p>
                  <p className="text-2xl md:text-3xl font-bold text-gray-900 mt-2">2,847</p>
                  <div className="flex items-center mt-2">
                    <span className="text-green-600 text-sm font-medium">+12%</span>
                    <span className="text-gray-500 text-sm ml-1 hidden sm:inline">vs last month</span>
                  </div>
                </div>
                <div className="p-3 bg-green-100 rounded-xl flex-shrink-0">
                  <FaUserCheck className="text-xl md:text-2xl text-green-600" />
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-white-50 to-white-100 p-4 md:p-6 rounded-xl shadow-sm border border-white-200 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <p className="text-gray-600 text-sm font-medium truncate">Pendaftar Baru</p>
                  <p className="text-xs text-gray-500 mb-1">(30 Hari Terakhir)</p>
                  <p className="text-2xl md:text-3xl font-bold text-gray-900">342</p>
                  <div className="flex items-center mt-2">
                    <span className="text-white-600 text-sm font-medium">+8%</span>
                    <span className="text-gray-500 text-sm ml-1 hidden sm:inline">vs last month</span>
                  </div>
                </div>
                <div className="p-3 bg-white-200 rounded-xl flex-shrink-0">
                  <FaUserPlus className="text-xl md:text-2xl text-white-700" />
                </div>
              </div>
            </div>

            <div className="bg-white p-4 md:p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <p className="text-gray-500 text-sm font-medium truncate">Dalam Proses</p>
                  <p className="text-2xl md:text-3xl font-bold text-gray-900 mt-2">156</p>
                  <div className="flex items-center mt-2">
                    <span className="text-yellow-600 text-sm font-medium">-3%</span>
                    <span className="text-gray-500 text-sm ml-1 hidden sm:inline">vs last month</span>
                  </div>
                </div>
                <div className="p-3 bg-yellow-100 rounded-xl flex-shrink-0">
                  <FaClock className="text-xl md:text-2xl text-yellow-600" />
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 md:p-6 rounded-xl shadow-sm border border-blue-200 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <p className="text-gray-600 text-sm font-medium truncate">Telah Berangkat</p>
                  <p className="text-2xl md:text-3xl font-bold text-gray-900 mt-2">1,289</p>
                  <div className="flex items-center mt-2">
                    <span className="text-blue-600 text-sm font-medium">+15%</span>
                    <span className="text-gray-500 text-sm ml-1 hidden sm:inline">vs last month</span>
                  </div>
                </div>
                <div className="p-3 bg-blue-200 rounded-xl flex-shrink-0">
                  <FaPlane className="text-xl md:text-2xl text-blue-700" />
                </div>
              </div>
            </div>
          </div>

          {/* Welcome Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
            <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-4 md:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
                <h3 className="text-lg md:text-xl font-bold text-gray-900">Selamat Datang di Dashboard Admin</h3>
                <div className="flex space-x-2">
                  <span className="px-3 py-1 bg-white-100 text-white-800 text-xs font-medium rounded-full whitespace-nowrap">
                    System Online
                  </span>
                </div>
              </div>
              <p className="text-gray-600 mb-6 leading-relaxed text-sm md:text-base">
                Ini adalah halaman dashboard untuk mengelola sistem backoffice Kejadiluar. Gunakan menu di sidebar untuk
                navigasi ke berbagai fitur admin dan kelola seluruh proses administrasi dengan mudah.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-white-50 rounded-lg border border-white-100">
                  <h4 className="font-semibold text-white-900 mb-2 flex items-center">
                    <FaClock className="mr-2 text-sm" />
                    Quick Actions
                  </h4>
                  <ul className="text-sm text-white-700 space-y-1">
                    <li>• Verifikasi dokumen pending</li>
                    <li>• Review aplikasi baru</li>
                    <li>• Update status kandidat</li>
                  </ul>
                </div>
                <div className="p-4 bg-green-50 rounded-lg border border-green-100">
                  <h4 className="font-semibold text-green-900 mb-2 flex items-center">
                    <FaCheckCircle className="mr-2 text-sm" />
                    Recent Updates
                  </h4>
                  <ul className="text-sm text-green-700 space-y-1">
                    <li>• System backup completed</li>
                    <li>• New security patch applied</li>
                    <li>• Database optimized</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 md:p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Activity</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-gray-900 truncate">New user registewhite</p>
                    <p className="text-xs text-gray-500">2 minutes ago</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-gray-900 truncate">Document verified</p>
                    <p className="text-xs text-gray-500">15 minutes ago</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-gray-900 truncate">Training scheduled</p>
                    <p className="text-xs text-gray-500">1 hour ago</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-white-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-gray-900 truncate">Departure confirmed</p>
                    <p className="text-xs text-gray-500">3 hours ago</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
