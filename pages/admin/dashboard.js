import AdminLayout from '@/components/Admin/Layout/AdminLayout'
import ProtectAdminRouter from '@/components/ProtectAdminRouter'
import React from 'react'

export default function Dashboard() {
  return (
    <ProtectAdminRouter>
      <AdminLayout />
    </ProtectAdminRouter>
  )
}
