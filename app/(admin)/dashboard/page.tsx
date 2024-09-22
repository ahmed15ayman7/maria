"use client"
import AdminSocialLinks from '@/components/shared/AdminSocialLinks'
import Dashboard from '@/components/shared/Dashboard'
import AdminsDashboard from '@/components/shared/admins'
import React from 'react'

const page = () => {
  return (
    <div className=" min-h-screen">
      <Dashboard/>
      <AdminSocialLinks/>
      <br/>
      <br/>
      <div className="p-5">
      <AdminsDashboard/>
      </div>
    </div>
  )
}

export default page