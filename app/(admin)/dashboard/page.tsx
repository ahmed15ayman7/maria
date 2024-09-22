import AdminSocialLinks from '@/components/shared/AdminSocialLinks'
import Dashboard from '@/components/shared/Dashboard'
import AdminDashboard from '@/components/shared/admins'
import React from 'react'

const page = () => {
  return (
    <div className=" min-h-screen">
      <Dashboard/>
      <AdminSocialLinks/>
      <AdminDashboard/>
    </div>
  )
}

export default page