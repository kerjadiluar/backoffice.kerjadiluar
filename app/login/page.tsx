import React from "react";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-red-900 flex">
      {/* Kolom Kiri - Gambar */}
      <div className="hidden lg:flex lg:w-1/2 bg-red-800 items-center justify-center">
        <div className="text-center text-white">
          <div className="w-32 h-32 bg-white/20 rounded-full mx-auto mb-6 flex items-center justify-center">
            <svg className="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold mb-2">Admin Panel</h2>
          <p className="text-red-200">Sistem Backoffice Kejadiluar</p>
        </div>
      </div>
      
      {/* Kolom Kanan - Form Login */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Login</h1>
            <p className="text-red-200">Masuk ke sistem admin</p>
          </div>
          
          <form className="space-y-6">
            <div>
              <label className="block text-white text-sm font-medium mb-2">
                Username
              </label>
              <input
                type="text"
                placeholder="Masukkan username"
                className="w-full px-4 py-3 border border-red-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white/10 text-white placeholder-red-300"
              />
            </div>
            
            <div>
              <label className="block text-white text-sm font-medium mb-2">
                Password
              </label>
              <input
                type="password"
                placeholder="Masukkan password"
                className="w-full px-4 py-3 border border-red-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white/10 text-white placeholder-red-300"
              />
            </div>
            
            <div>
              <label className="block text-white text-sm font-medium mb-2">
                Login sebagai
              </label>
              <select
                className="w-full px-4 py-3 border border-red-300 rounded-lg bg-white/10 text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                defaultValue="admin"
              >
                <option value="admin" className="text-black">Admin</option>
                <option value="manajer" className="text-black">Manajer</option>
                <option value="pengajar" className="text-black">Pengajar</option>
              </select>
            </div>
            
            <button
              type="submit"
              className="w-full bg-white text-red-900 py-3 px-4 rounded-lg font-semibold hover:bg-gray-100 transition duration-200"
            >
              Masuk
            </button>
          </form>
          
          <div className="text-center mt-6">
            <a href="/" className="text-red-200 hover:text-white text-sm">
              Kembali ke Beranda
            </a>
          </div>
        </div>
      </div>
    </div>
  );
} 