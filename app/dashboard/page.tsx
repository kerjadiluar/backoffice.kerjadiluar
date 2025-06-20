"use client";
import React, { useState, useRef } from "react";
import { FaHome, FaCheckCircle, FaUsers, FaUserShield, FaChalkboardTeacher, FaUserTie, FaUserFriends, FaHandshake, FaBullhorn, FaCertificate, FaPassport, FaPlane, FaHotel, FaBookOpen, FaMoneyBill, FaFileContract, FaNetworkWired, FaLifeRing, FaChevronDown, FaChevronUp, FaChevronRight, FaChevronLeft, FaSignOutAlt, FaUserCircle, FaUserCheck, FaUserPlus, FaClock, FaUserTimes } from "react-icons/fa";

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
];

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
];

export default function DashboardPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [showLogout, setShowLogout] = useState(false);
  const logoutRef = useRef<HTMLDivElement>(null);

  // Untuk close menu logout jika klik di luar
  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (logoutRef.current && !logoutRef.current.contains(event.target as Node)) {
        setShowLogout(false);
      }
    }
    if (showLogout) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showLogout]);

  const handleDropdown = (name: string) => {
    if (sidebarCollapsed) return; // Tidak bisa buka dropdown saat collapsed
    setOpenDropdown(openDropdown === name ? null : name);
  };

  // Simulasi user
  const user = { name: "Admin", role: "admin" };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <div className={`relative bg-red-900 text-white transition-all duration-300 ${sidebarCollapsed ? 'w-16' : 'w-72'} flex flex-col h-screen`}>
        <div className="p-4 border-b border-red-800 flex-shrink-0">
          <div className="flex items-center justify-between">
            {!sidebarCollapsed && (
              <h1 className="text-xl font-bold">Admin Panel</h1>
            )}
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="p-2 hover:bg-red-800 rounded"
              aria-label="Toggle sidebar"
            >
              {sidebarCollapsed ? <FaChevronRight /> : <FaChevronLeft />}
            </button>
          </div>
        </div>
        <nav className="flex-1 overflow-y-auto py-4 custom-scrollbar">
          {/* Section UTAMA */}
          <div className="mb-6">
            {!sidebarCollapsed && (
              <p className="uppercase text-xs text-red-200 px-6 mb-2">Utama</p>
            )}
            {utamaMenu.map((item, idx) => (
              <div key={item.name}>
                {item.children ? (
                  <div>
                    <button
                      onClick={() => handleDropdown(item.name)}
                      className={`w-full flex items-center py-3 hover:bg-red-800 focus:outline-none text-left transition-colors ${
                        sidebarCollapsed ? 'px-4 justify-center' : 'px-6'
                      }`}
                      title={sidebarCollapsed ? item.name : undefined}
                    >
                      <span className="text-lg flex-shrink-0">{item.icon}</span>
                      {!sidebarCollapsed && (
                        <>
                          <span className="flex-1 ml-3">{item.name}</span>
                          {openDropdown === item.name ? (
                            <FaChevronUp className="ml-2 text-sm" />
                          ) : (
                            <FaChevronDown className="ml-2 text-sm" />
                          )}
                        </>
                      )}
                    </button>
                    {openDropdown === item.name && !sidebarCollapsed && (
                      <div className="bg-red-800 bg-opacity-50">
                        {item.children.map((child: any) => (
                          <a
                            key={child.name}
                            href={child.href}
                            className="flex items-center px-12 py-2 text-sm hover:bg-red-700 transition-colors"
                          >
                            <span className="mr-3 text-base flex-shrink-0">{child.icon}</span>
                            {child.name}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <a
                    href={item.href}
                    className={`flex items-center py-3 hover:bg-red-800 transition-colors ${
                      sidebarCollapsed ? 'px-4 justify-center' : 'px-6'
                    }`}
                    title={sidebarCollapsed ? item.name : undefined}
                  >
                    <span className="text-lg flex-shrink-0">{item.icon}</span>
                    {!sidebarCollapsed && <span className="ml-3">{item.name}</span>}
                  </a>
                )}
              </div>
            ))}
          </div>

          {/* Section UMUM */}
          <div className="mb-4">
            {!sidebarCollapsed && (
              <p className="uppercase text-xs text-red-200 px-6 mb-2">Umum</p>
            )}
            {umumMenu.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={`flex items-center py-3 hover:bg-red-800 transition-colors ${
                  sidebarCollapsed ? 'px-4 justify-center' : 'px-6'
                }`}
                title={sidebarCollapsed ? item.name : undefined}
              >
                <span className="text-lg flex-shrink-0">{item.icon}</span>
                {!sidebarCollapsed && <span className="ml-3">{item.name}</span>}
              </a>
            ))}
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-screen">
        {/* Header */}
        <header className="bg-white shadow-sm border-b px-6 py-4 flex items-center justify-between flex-shrink-0">
          <h2 className="text-2xl font-semibold text-gray-800">Dashboard</h2>
          <div className="relative">
            <button
              onClick={() => setShowLogout(!showLogout)}
              className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors border border-gray-200"
            >
              <div className="flex flex-col items-start">
                <span className="font-semibold text-gray-800 text-sm">{user.name}</span>
                <span className="text-xs text-gray-500">{user.role}</span>
              </div>
              <div className="w-10 h-10 bg-red-900 rounded-full flex items-center justify-center">
                <FaUserCircle className="text-white text-xl" />
              </div>
            </button>
            {showLogout && (
              <div ref={logoutRef} className="absolute right-0 top-16 bg-white shadow-lg rounded-lg border border-gray-200 z-50 min-w-[200px]">
                <button
                  onClick={() => window.location.href = '/login'}
                  className="flex items-center justify-center w-full px-4 py-3 text-red-700 hover:bg-red-50 transition-colors rounded-lg"
                >
                  <FaSignOutAlt className="mr-2" /> Logout
                </button>
              </div>
            )}
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-6 custom-scrollbar">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow">
              <div className="flex items-center">
                <div className="p-3 bg-green-100 rounded-full">
                  <FaUserCheck className="text-2xl text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-gray-500 text-sm">Total Pengguna Aktif</p>
                  <p className="text-2xl font-bold text-black">2,847</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow">
              <div className="flex items-center">
                <div className="p-3 bg-blue-100 rounded-full">
                  <FaUserPlus className="text-2xl text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-gray-500 text-sm">Pendaftar Baru</p>
                  <p className="text-xs text-gray-400">(30 Hari Terakhir)</p>
                  <p className="text-2xl font-bold text-black">342</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow">
              <div className="flex items-center">
                <div className="p-3 bg-yellow-100 rounded-full">
                  <FaClock className="text-2xl text-yellow-600" />
                </div>
                <div className="ml-4">
                  <p className="text-gray-500 text-sm">Kandidat Dalam Proses</p>
                  <p className="text-2xl font-bold text-black">156</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow">
              <div className="flex items-center">
                <div className="p-3 bg-purple-100 rounded-full">
                  <FaPlane className="text-2xl text-purple-600" />
                </div>
                <div className="ml-4">
                  <p className="text-gray-500 text-sm">Kandidat Telah Berangkat</p>
                  <p className="text-2xl font-bold text-black">1,289</p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-4 text-black">Selamat Datang di Dashboard Admin</h3>
            <p className="text-gray-600">
              Ini adalah halaman dashboard untuk mengelola sistem backoffice Kejadiluar. 
              Gunakan menu di sidebar untuk navigasi ke berbagai fitur admin.
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}