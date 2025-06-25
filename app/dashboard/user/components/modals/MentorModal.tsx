"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FaSave, FaSpinner } from "react-icons/fa"
import type { MentorData } from "@/lib/types"

interface MentorModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (data: MentorData) => Promise<void>
  userData?: MentorData | null
  mode: "create" | "edit"
}

export default function MentorModal({ isOpen, onClose, onSave, userData, mode }: MentorModalProps) {
  const [formData, setFormData] = useState<Partial<MentorData>>({
    name: "",
    email: "",
    phone: "",
    address: "",
    companyName: "",
    position: "",
    companyAddress: "",
    specialization: "",
    experience: 0,
    rating: 0,
    mentees: 0,
    areasOfExpertise: [],
    availability: "available",
    workingHours: "",
    bio: "",
    certifications: [],
    languages: [],
    status: "active",
  })

  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    if (userData && mode === "edit") {
      setFormData(userData)
    } else if (mode === "create") {
      setFormData({
        name: "",
        email: "",
        phone: "",
        address: "",
        companyName: "",
        position: "",
        companyAddress: "",
        specialization: "",
        experience: 0,
        rating: 0,
        mentees: 0,
        areasOfExpertise: [],
        availability: "available",
        workingHours: "",
        bio: "",
        certifications: [],
        languages: [],
        status: "active",
      })
    }
  }, [userData, mode, isOpen])

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name?.trim()) newErrors.name = "Nama wajib diisi"
    if (!formData.email?.trim()) newErrors.email = "Email wajib diisi"
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Format email tidak valid"
    if (!formData.phone?.trim()) newErrors.phone = "Nomor telepon wajib diisi"
    if (!formData.companyName?.trim()) newErrors.companyName = "Nama perusahaan wajib diisi"
    if (!formData.specialization?.trim()) newErrors.specialization = "Spesialisasi wajib diisi"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return

    setIsLoading(true)
    try {
      await onSave(formData as MentorData)
      onClose()
    } catch (error) {
      console.error("Error saving mentor:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{mode === "create" ? "Tambah" : "Edit"} Mentor</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Information */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-3">Informasi Pribadi</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Nama Lengkap *</Label>
                <Input
                  id="name"
                  value={formData.name || ""}
                  onChange={(e) => handleChange("name", e.target.value)}
                  placeholder="Suzuki Takeshi"
                  className={errors.name ? "border-red-500" : ""}
                />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
              </div>

              <div>
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email || ""}
                  onChange={(e) => handleChange("email", e.target.value)}
                  placeholder="suzuki@company.co.jp"
                  className={errors.email ? "border-red-500" : ""}
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>

              <div>
                <Label htmlFor="phone">Nomor Telepon *</Label>
                <Input
                  id="phone"
                  value={formData.phone || ""}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  placeholder="+81-90-1234-5678"
                  className={errors.phone ? "border-red-500" : ""}
                />
                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
              </div>

              <div>
                <Label htmlFor="address">Alamat</Label>
                <Input
                  id="address"
                  value={formData.address || ""}
                  onChange={(e) => handleChange("address", e.target.value)}
                  placeholder="Tokyo, Japan"
                />
              </div>
            </div>
          </div>

          {/* Company Information */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-3">Informasi Perusahaan</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="companyName">Nama Perusahaan *</Label>
                <Input
                  id="companyName"
                  value={formData.companyName || ""}
                  onChange={(e) => handleChange("companyName", e.target.value)}
                  placeholder="Toyota Manufacturing"
                  className={errors.companyName ? "border-red-500" : ""}
                />
                {errors.companyName && <p className="text-red-500 text-xs mt-1">{errors.companyName}</p>}
              </div>

              <div>
                <Label htmlFor="position">Posisi</Label>
                <Input
                  id="position"
                  value={formData.position || ""}
                  onChange={(e) => handleChange("position", e.target.value)}
                  placeholder="Senior Manager"
                />
              </div>

              <div className="md:col-span-2">
                <Label htmlFor="companyAddress">Alamat Perusahaan</Label>
                <Textarea
                  id="companyAddress"
                  value={formData.companyAddress || ""}
                  onChange={(e) => handleChange("companyAddress", e.target.value)}
                  placeholder="Alamat lengkap perusahaan"
                  rows={2}
                />
              </div>
            </div>
          </div>

          {/* Professional Information */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-3">Informasi Profesional</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="specialization">Spesialisasi *</Label>
                <Select
                  value={formData.specialization || ""}
                  onValueChange={(value) => handleChange("specialization", value)}
                >
                  <SelectTrigger className={errors.specialization ? "border-red-500" : ""}>
                    <SelectValue placeholder="Pilih Spesialisasi" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Manufacturing">Manufacturing</SelectItem>
                    <SelectItem value="Automotive">Automotive</SelectItem>
                    <SelectItem value="Electronics">Electronics</SelectItem>
                    <SelectItem value="Construction">Construction</SelectItem>
                    <SelectItem value="Agriculture">Agriculture</SelectItem>
                  </SelectContent>
                </Select>
                {errors.specialization && <p className="text-red-500 text-xs mt-1">{errors.specialization}</p>}
              </div>

              <div>
                <Label htmlFor="experience">Pengalaman (tahun)</Label>
                <Input
                  id="experience"
                  type="number"
                  value={formData.experience || 0}
                  onChange={(e) => handleChange("experience", Number(e.target.value))}
                  min="0"
                />
              </div>

              <div>
                <Label htmlFor="mentees">Jumlah Mentee</Label>
                <Input
                  id="mentees"
                  type="number"
                  value={formData.mentees || 0}
                  onChange={(e) => handleChange("mentees", Number(e.target.value))}
                  min="0"
                />
              </div>

              <div>
                <Label htmlFor="rating">Rating</Label>
                <Input
                  id="rating"
                  type="number"
                  value={formData.rating || 0}
                  onChange={(e) => handleChange("rating", Number(e.target.value))}
                  min="0"
                  max="5"
                  step="0.1"
                />
              </div>

              <div>
                <Label htmlFor="availability">Ketersediaan</Label>
                <Select
                  value={formData.availability || "available"}
                  onValueChange={(value) => handleChange("availability", value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="available">Available</SelectItem>
                    <SelectItem value="busy">Busy</SelectItem>
                    <SelectItem value="full">Full Capacity</SelectItem>
                    <SelectItem value="on-leave">On Leave</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="workingHours">Jam Kerja</Label>
                <Input
                  id="workingHours"
                  value={formData.workingHours || ""}
                  onChange={(e) => handleChange("workingHours", e.target.value)}
                  placeholder="Monday-Friday 9AM-6PM JST"
                />
              </div>
            </div>

            <div className="mt-4">
              <Label htmlFor="bio">Bio/Deskripsi</Label>
              <Textarea
                id="bio"
                value={formData.bio || ""}
                onChange={(e) => handleChange("bio", e.target.value)}
                placeholder="Ceritakan tentang pengalaman dan keahlian sebagai mentor"
                rows={3}
              />
            </div>
          </div>

          {/* Status */}
          <div>
            <Label htmlFor="status">Status</Label>
            <Select value={formData.status || "active"} onValueChange={(value) => handleChange("status", value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Aktif</SelectItem>
                <SelectItem value="inactive">Tidak Aktif</SelectItem>
                <SelectItem value="suspended">Suspended</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
            <Button type="button" variant="outline" onClick={onClose}>
              Batal
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <FaSpinner className="animate-spin mr-2 h-4 w-4" />
                  Menyimpan...
                </>
              ) : (
                <>
                  <FaSave className="mr-2 h-4 w-4" />
                  Simpan
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
