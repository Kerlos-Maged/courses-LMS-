import Logo from './logo'
import React from 'react'
import SideBarRoutes from './SideBarRoutes'

const SideBar = () => {
  return (
    <div className='h-full border-r flex flex-col overflow-y-auto bg-white shadow-sm z-50'>
      <div className="p-6">
        <h2>Dashboard</h2>
      </div>
      <div className="flex flex-col h-full">
        <SideBarRoutes />
      </div>
    </div>
  )
}

export default SideBar