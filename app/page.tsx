import React from "react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-red-900 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Selamat Datang</h1>
          <p className="text-xl mb-8">Sistem Backoffice Kejadiluar</p>
          <div className="space-x-4">
            <a 
              href="/login" 
              className="bg-white text-red-900 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
            >
              Login
            </a>
            <a 
              href="/dashboard" 
              className="border border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-red-900 transition"
            >
              Dashboard
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
