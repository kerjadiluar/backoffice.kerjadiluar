"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import type { User } from "@/lib/types"
import AdminModal from "../components/modals/AdminModal"

const AdminPage = () => {
  const [users, setUsers] = useState<User[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [modalMode, setModalMode] = useState<"create" | "edit">("create")

  useEffect(() => {
    // Fetch users from API (replace with your actual API endpoint)
    const fetchUsers = async () => {
      try {
        const response = await fetch("/api/users")
        if (!response.ok) {
          throw new Error("Failed to fetch users")
        }
        const data = await response.json()
        setUsers(data)
      } catch (error: any) {
        console.error("Error fetching users:", error.message)
      }
    }

    fetchUsers()
  }, [])

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value)
  }

  const filteredUsers = users.filter((user) => user.name.toLowerCase().includes(searchQuery.toLowerCase()))

  const handleEdit = (user: User) => {
    setSelectedUser(user)
    setModalMode("edit")
    setIsModalOpen(true)
  }

  const handleCreate = () => {
    setSelectedUser(null)
    setModalMode("create")
    setIsModalOpen(true)
  }

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/users/${id}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("Failed to delete user")
      }

      // Update the users state after successful deletion
      setUsers(users.filter((user) => user.id !== id))
    } catch (error: any) {
      console.error("Error deleting user:", error.message)
    }
  }

  const handleSave = async (userData: User) => {
    try {
      let response
      if (modalMode === "create") {
        response = await fetch("/api/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        })
      } else {
        response = await fetch(`/api/users/${selectedUser?.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        })
      }

      if (!response.ok) {
        throw new Error("Failed to save user")
      }

      const updatedUser = await response.json()

      if (modalMode === "create") {
        setUsers([...users, updatedUser])
      } else {
        setUsers(users.map((user) => (user.id === updatedUser.id ? updatedUser : user)))
      }

      setIsModalOpen(false)
    } catch (error: any) {
      console.error("Error saving user:", error.message)
    }
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-semibold mb-5">Admin Dashboard</h1>

      <div className="flex justify-between items-center mb-5">
        <Input type="text" placeholder="Search users..." value={searchQuery} onChange={handleSearch} />
        <Button onClick={handleCreate}>Create User</Button>
      </div>

      <Table>
        <TableCaption>A list of your users.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredUsers.map((user) => (
            <TableRow key={user.id}>
              <TableCell className="font-medium">{user.id}</TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell className="text-right">
                <Button variant="secondary" size="sm" onClick={() => handleEdit(user)}>
                  Edit
                </Button>{" "}
                <Button variant="destructive" size="sm" onClick={() => handleDelete(user.id)}>
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <AdminModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        userData={selectedUser}
        mode={modalMode}
      />
    </div>
  )
}

export default AdminPage
