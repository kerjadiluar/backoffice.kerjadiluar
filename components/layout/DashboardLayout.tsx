"use client"
import { useState, useRef, useEffect } from "react"
import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
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
  FaNetworkWired,
  FaLifeRing,
  FaChevronDown,
  FaChevronRight,
  FaChevronLeft,
  FaSignOutAlt,
  FaUserCircle,
  FaBell,
  FaSearch,
  FaCog,
  FaChartLine,
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
  { name: "Manajemen Komunitas", href: "/dashboard/umum/komunitas", icon: <FaNetworkWired /> },
  { name: "Bantuan Darurat", href: "/dashboard/umum/bantuan", icon: <FaLifeRing /> },
]

interface DashboardLayoutProps {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const [showLogout, setShowLogout] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const logoutRef = useRef<HTMLDivElement>(null)
  const notificationRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()

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

  const isActiveLink = (href: string) => {
    return pathname === href
  }

  const isActiveParent = (children: any[]) => {
    return children.some((child) => pathname === child.href)
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
          bg-red-900 border-r border-red-800 transition-all duration-300 
          flex flex-col h-screen shadow-lg z-50
        `}
      >
        {/* Sidebar Header */}
        <div className="p-4 border-b border-red-800 flex-shrink-0">
          <div className="flex items-center justify-between">
            {(!sidebarCollapsed || isMobile) && (
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
                  <span className="text-red-900 font-bold text-lg">K</span>
                </div>
                <div>
                  <h1 className="text-xl font-bold text-white">Kejadiluar</h1>
                  <p className="text-xs text-red-200">Admin Panel</p>
                </div>
              </div>
            )}
            <div className="flex items-center space-x-2">
              {isMobile && (
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 hover:bg-red-800 rounded-lg transition-colors text-red-200 hover:text-white md:hidden"
                >
                  <FaTimes />
                </button>
              )}
              {!isMobile && (
                <button
                  onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                  className="p-2 hover:bg-red-800 rounded-lg transition-colors text-red-200 hover:text-white"
                  aria-label="Toggle sidebar"
                >
                  {sidebarCollapsed ? <FaChevronRight /> : <FaChevronLeft />}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Navigation - Updated with thinner scrollbar class */}
        <nav className="flex-1 overflow-y-auto py-4 px-3 sidebar-scroll">
          {/* Main Section */}
          <div className="mb-8">
            {(!sidebarCollapsed || isMobile) && (
              <p className="uppercase text-xs font-semibold text-red-200 px-3 mb-3 tracking-wider">Menu Utama</p>
            )}
            {utamaMenu.map((item) => (
              <div key={item.name} className="mb-1">
                {item.children ? (
                  <div>
                    <button
                      onClick={() => handleDropdown(item.name)}
                      className={`w-full flex items-center py-3 px-3 rounded-lg hover:bg-red-800 focus:outline-none text-left transition-all duration-200 group ${
                        !isMobile && sidebarCollapsed ? "justify-center" : ""
                      } ${
                        openDropdown === item.name || isActiveParent(item.children)
                          ? "bg-red-800 text-white"
                          : "text-red-100 hover:text-white"
                      }`}
                      title={!isMobile && sidebarCollapsed ? item.name : undefined}
                    >
                      <span
                        className={`text-lg flex-shrink-0 ${
                          openDropdown === item.name || isActiveParent(item.children)
                            ? "text-white"
                            : "text-red-300 group-hover:text-white"
                        }`}
                      >
                        {item.icon}
                      </span>
                      {(isMobile || !sidebarCollapsed) && (
                        <>
                          <span className="flex-1 ml-3 font-medium">{item.name}</span>
                          <span
                            className={`ml-2 text-sm transition-transform duration-200 ${
                              openDropdown === item.name ? "rotate-180" : ""
                            }`}
                          >
                            <FaChevronDown />
                          </span>
                        </>
                      )}
                    </button>
                    {openDropdown === item.name && (isMobile || !sidebarCollapsed) && (
                      <div className="mt-1 ml-3 space-y-1 bg-red-800 bg-opacity-50 rounded-lg p-2">
                        {item.children.map((child: any) => (
                          <Link
                            key={child.name}
                            href={child.href}
                            className={`flex items-center px-3 py-2 text-sm rounded-lg transition-colors group ${
                              isActiveLink(child.href)
                                ? "bg-red-700 text-white"
                                : "text-red-100 hover:text-white hover:bg-red-700"
                            }`}
                            onClick={() => isMobile && setMobileMenuOpen(false)}
                          >
                            <span
                              className={`mr-3 text-base flex-shrink-0 ${
                                isActiveLink(child.href) ? "text-white" : "text-red-300 group-hover:text-white"
                              }`}
                            >
                              {child.icon}
                            </span>
                            {child.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    className={`flex items-center py-3 px-3 rounded-lg transition-colors group ${
                      !isMobile && sidebarCollapsed ? "justify-center" : ""
                    } ${
                      isActiveLink(item.href)
                        ? "bg-red-800 text-white"
                        : "text-red-100 hover:text-white hover:bg-red-800"
                    }`}
                    title={!isMobile && sidebarCollapsed ? item.name : undefined}
                    onClick={() => isMobile && setMobileMenuOpen(false)}
                  >
                    <span
                      className={`text-lg flex-shrink-0 ${
                        isActiveLink(item.href) ? "text-white" : "text-red-300 group-hover:text-white"
                      }`}
                    >
                      {item.icon}
                    </span>
                    {(isMobile || !sidebarCollapsed) && <span className="ml-3 font-medium">{item.name}</span>}
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* General Section */}
          <div className="mb-4">
            {(!sidebarCollapsed || isMobile) && (
              <p className="uppercase text-xs font-semibold text-red-200 px-3 mb-3 tracking-wider">Menu Umum</p>
            )}
            {umumMenu.map((item) => (
              <div key={item.name} className="mb-1">
                <Link
                  href={item.href}
                  className={`flex items-center py-3 px-3 rounded-lg transition-colors group ${
                    !isMobile && sidebarCollapsed ? "justify-center" : ""
                  } ${
                    isActiveLink(item.href) ? "bg-red-800 text-white" : "text-red-100 hover:text-white hover:bg-red-800"
                  }`}
                  title={!isMobile && sidebarCollapsed ? item.name : undefined}
                  onClick={() => isMobile && setMobileMenuOpen(false)}
                >
                  <span
                    className={`text-lg flex-shrink-0 ${
                      isActiveLink(item.href) ? "text-white" : "text-red-300 group-hover:text-white"
                    }`}
                  >
                    {item.icon}
                  </span>
                  {(isMobile || !sidebarCollapsed) && <span className="ml-3 font-medium">{item.name}</span>}
                </Link>
              </div>
            ))}
          </div>
        </nav>

        {/* Sidebar Footer */}
        {(!sidebarCollapsed || isMobile) && (
          <div className="p-4 border-t border-red-800">
            <div className="bg-gradient-to-r from-red-800 to-red-700 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <FaChartLine className="text-white text-sm" />
                <span className="text-sm font-medium text-white">Upgrade Plan</span>
              </div>
              <p className="text-xs text-red-100 mb-3">Unlock advanced features for better management</p>
              <button className="w-full bg-white text-red-900 text-xs py-2 px-3 rounded-md hover:bg-red-50 transition-colors font-medium">
                Learn More
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-screen min-w-0">
        {/* Header */}
        <header className="bg-white border-b border-red-100 px-4 md:px-6 py-4 flex items-center justify-between flex-shrink-0 shadow-sm">
          <div className="flex items-center space-x-4">
            {isMobile && (
              <button
                onClick={toggleMobileMenu}
                className="p-2 text-gray-600 hover:text-red-900 hover:bg-red-50 rounded-lg transition-colors md:hidden"
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
                className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent w-48 xl:w-64"
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
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
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
            {/* <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors hidden sm:block">
              <FaCog className="text-lg" />
            </button> */}

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
                <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-r from-red-900 to-red-800 rounded-full flex items-center justify-center shadow-sm">
                  <span className="text-white font-semibold text-xs md:text-sm">{user.avatar}</span>
                </div>
              </button>
              {showLogout && (
                <div className="absolute right-0 top-14 bg-white shadow-xl rounded-lg border border-gray-200 z-50 min-w-[200px]">
                  <div className="p-2">
                    <Link
                      href="/dashboard/profile"
                      className="flex items-center w-full px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                      onClick={() => setShowLogout(false)}
                    >
                      <FaUserCircle className="mr-3" /> Profile
                    </Link>
                    <Link
                      href="/dashboard/settings"
                      className="flex items-center w-full px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                      onClick={() => setShowLogout(false)}
                    >
                      <FaCog className="mr-3" /> Settings
                    </Link>
                    <hr className="my-2" />
                    <button
                      onClick={() => (window.location.href = "/login")}
                      className="flex items-center w-full px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
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
        <main className="flex-1 overflow-y-auto p-4 md:p-6">{children}</main>
      </div>
    </div>
  )
}
