"use client"
import { useState } from "react"
import Image from "next/image"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="min-h-screen max-h-screen bg-red-900 flex overflow-hidden">
      {/* Left Column - Japanese Work Theme */}
      <div className="hidden lg:flex lg:w-1/2 xl:w-3/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-black-800/40 z-10"></div>
        <Image
           src="/img/japan3.png" // Perbaikan di sini: path lengkap dari folder public, tanpa query parameter di src
          alt="Modern Japanese Office"
          width={600}
          height={800}
          className="object-cover w-full h-full"
        />
        <div className="absolute inset-0 z-20 flex flex-col justify-center items-center text-center p-12">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
            <div className="w-20 h-20 bg-red-600 rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-lg">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6"
                />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-white mb-3">Japan Admin Portal</h2>
            <p className="text-blue-100 text-lg mb-4">日本管理システム</p>
            <p className="text-blue-200 text-sm">Professional Administrative Gateway</p>
          </div>
        </div>
      </div>

      {/* Right Column - Login Form */}
      <div className="w-full lg:w-1/2 xl:w-2/5 flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-red-800/30 backdrop-blur-sm">
        <div className="w-full max-w-xs sm:max-w-sm">
          <div className="text-center mb-4 sm:mb-6 lg:mb-8">
            <div className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-red-600 rounded-2xl mb-3 sm:mb-4 shadow-lg">
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-2">Admin Login</h1>
            <p className="text-slate-300 text-sm sm:text-base">Access Administrative System</p>
          </div>

          <form className="space-y-3 sm:space-y-4">
            <div className="space-y-2">
              <label className="block text-white text-sm font-semibold tracking-wide">Email Address</label>
              <div className="relative">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-3 py-2 sm:py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent text-white placeholder-red-300 transition-all duration-200 hover:bg-white/15"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-white text-sm font-semibold tracking-wide">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="w-full px-3 py-2 sm:py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent text-white placeholder-red-300 transition-all duration-200 hover:bg-white/15"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center rounded-r-xl transition-colors"
                >
                  {showPassword ? (
                    <svg
                      className="w-5 h-5 text-slate-400 hover:text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="w-5 h-5 text-slate-400 hover:text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-white text-sm font-semibold tracking-wide">Account Type</label>
              <select
                className="w-full px-3 py-2 sm:py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent transition-all duration-200 hover:bg-white/15 appearance-none cursor-pointer"
                defaultValue="admin"
              >
                <option value="administrasi" className="text-slate-900 bg-white">
                  Administrasi
                </option>
                <option value="manager" className="text-slate-900 bg-white">
                  Manager
                </option>
                <option value="supervisor" className="text-slate-900 bg-white">
                  Supervisor
                </option>
                <option value="system-administrator" className="text-slate-900 bg-white">
                  System Administrator
                </option>
              </select>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-blue-500 bg-white/10 border-white/20 rounded focus:ring-blue-400 focus:ring-2"
                />
                <span className="ml-2 text-sm text-slate-300">Remember me</span>
              </label>
              {/* <a href="#" className="text-red-300 hover:text-red-200 transition-colors">
                Forgot password?
              </a> */}
            </div>

            <button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 text-white py-2 sm:py-3 px-4 rounded-xl font-semibold text-sm sm:text-base transition-all duration-200 transform"
            >
              Sign In
            </button>
          </form>

          <div className="mt-4 sm:mt-6 text-center space-y-3">
            <div className="pt-4 border-t border-white/10">
              <a
                href="https://kerjadiluar.id/"
                className="text-slate-400 hover:text-white text-sm transition-colors flex items-center justify-center space-x-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                <span>Back to Homepage</span>
              </a>
            </div>
            <div className="text-center">
              <p className="text-slate-400 text-sm">Need access? Contact your administrator</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
