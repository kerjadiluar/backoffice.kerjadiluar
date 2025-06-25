"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import type { User, KaryawanData } from "@/lib/types"

interface KaryawanModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (userData: User) => void
  userData: User | null
  mode: "create" | "edit"
}

// Rename interface to avoid conflicts
interface KaryawanFormData extends User {
  employeeId?: string
  position?: string
  department?: string
  salary?: string
  joinDate?: string
  contractType?: string
  workLocation?: string
  supervisor?: string
  emergencyContactName?: string
  emergencyContactPhone?: string
  bankAccount?: string
  bankName?: string
  npwp?: string
  bpjs?: string
}

export default function KaryawanModal({ isOpen, onClose, onSave, userData, mode }: KaryawanModalProps) {
  const [formData, setFormData] = useState<Partial<KaryawanData>>({
    name: "",
    email: "",
    phone: "",
    address: "",
    employeeId: "",
    position: "",
    department: "",
    salary: "",
    joinDate: "",
    contractType: "",
    workLocation: "",
    supervisor: "",
    emergencyContactName: "",
    emergencyContactPhone: "",
    bankAccount: "",
    bankName: "",
    npwp: "",
    bpjs: "",
    status: "active",
    role: "karyawan",
  })

  useEffect(() => {
    if (userData && mode === "edit") {
      setFormData(userData as KaryawanData)
    } else {
      setFormData({
        name: "",
        email: "",
        phone: "",
        address: "",
        employeeId: "",
        position: "",
        department: "",
        salary: "",
        joinDate: "",
        contractType: "",
        workLocation: "",
        supervisor: "",
        emergencyContactName: "",
        emergencyContactPhone: "",
        bankAccount: "",
        bankName: "",
        npwp: "",
        bpjs: "",
        status: "active",
        role: "karyawan",
      })
    }
  }, [userData, mode, isOpen])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData as User)
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{mode === "create" ? "Tambah Karyawan" : "Edit Karyawan"}</DialogTitle>
          <DialogDescription>
            {mode === "create" ? "Tambahkan karyawan baru ke sistem" : "Edit informasi karyawan"}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Informasi Personal</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Nama Lengkap *</Label>
                <Input
                  id="name"
                  value={formData.name || ""}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email || ""}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="phone">Nomor Telepon *</Label>
                <Input
                  id="phone"
                  value={formData.phone || ""}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="employeeId">ID Karyawan *</Label>
                <Input
                  id="employeeId"
                  value={formData.employeeId || ""}
                  onChange={(e) => handleInputChange("employeeId", e.target.value)}
                  required
                />
              </div>
            </div>
            <div>
              <Label htmlFor="address">Alamat</Label>
              <Textarea
                id="address"
                value={formData.address || ""}
                onChange={(e) => handleInputChange("address", e.target.value)}
              />
            </div>
          </div>

          {/* Employment Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Informasi Pekerjaan</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="position">Posisi *</Label>
                <Input
                  id="position"
                  value={formData.position || ""}
                  onChange={(e) => handleInputChange("position", e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="department">Departemen *</Label>
                <Select
                  value={formData.department || ""}
                  onValueChange={(value) => handleInputChange("department", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih departemen" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Human Resources">Human Resources</SelectItem>
                    <SelectItem value="Finance">Finance</SelectItem>
                    <SelectItem value="Information Technology">Information Technology</SelectItem>
                    <SelectItem value="Operations">Operations</SelectItem>
                    <SelectItem value="Marketing">Marketing</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="salary">Gaji *</Label>
                <Input
                  id="salary"
                  value={formData.salary || ""}
                  onChange={(e) => handleInputChange("salary", e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="joinDate">Tanggal Bergabung *</Label>
                <Input
                  id="joinDate"
                  type="date"
                  value={formData.joinDate || ""}
                  onChange={(e) => handleInputChange("joinDate", e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="contractType">Tipe Kontrak</Label>
                <Select
                  value={formData.contractType || ""}
                  onValueChange={(value) => handleInputChange("contractType", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih tipe kontrak" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="permanent">Tetap</SelectItem>
                    <SelectItem value="contract">Kontrak</SelectItem>
                    <SelectItem value="internship">Magang</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="workLocation">Lokasi Kerja</Label>
                <Input
                  id="workLocation"
                  value={formData.workLocation || ""}
                  onChange={(e) => handleInputChange("workLocation", e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Emergency Contact */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Kontak Darurat</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="emergencyContactName">Nama Kontak Darurat</Label>
                <Input
                  id="emergencyContactName"
                  value={formData.emergencyContactName || ""}
                  onChange={(e) => handleInputChange("emergencyContactName", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="emergencyContactPhone">Telepon Kontak Darurat</Label>
                <Input
                  id="emergencyContactPhone"
                  value={formData.emergencyContactPhone || ""}
                  onChange={(e) => handleInputChange("emergencyContactPhone", e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Financial Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Informasi Keuangan</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="bankAccount">Nomor Rekening</Label>
                <Input
                  id="bankAccount"
                  value={formData.bankAccount || ""}
                  onChange={(e) => handleInputChange("bankAccount", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="bankName">Nama Bank</Label>
                <Input
                  id="bankName"
                  value={formData.bankName || ""}
                  onChange={(e) => handleInputChange("bankName", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="npwp">NPWP</Label>
                <Input
                  id="npwp"
                  value={formData.npwp || ""}
                  onChange={(e) => handleInputChange("npwp", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="bpjs">BPJS</Label>
                <Input
                  id="bpjs"
                  value={formData.bpjs || ""}
                  onChange={(e) => handleInputChange("bpjs", e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Status */}
          <div>
            <Label htmlFor="status">Status</Label>
            <Select value={formData.status || "active"} onValueChange={(value) => handleInputChange("status", value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Aktif</SelectItem>
                <SelectItem value="inactive">Tidak Aktif</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Batal
            </Button>
            <Button type="submit">{mode === "create" ? "Tambah" : "Simpan"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
