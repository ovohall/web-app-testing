import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { NAV_LINKS } from '../../utils/constants'
import Sidebar from './Sidebar'
import MobileNav from './MobileNav'
import DashboardHeader from './DashboardHeader'
import MobileSidebar from './MobileSidebar'

const DashboardLayout = ({ role }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)

  const links = NAV_LINKS[role] || []

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Desktop Sidebar */}
      <Sidebar 
        links={links} 
        collapsed={sidebarCollapsed} 
        setCollapsed={setSidebarCollapsed} 
      />

      {/* Mobile Sidebar */}
      <MobileSidebar
        links={links}
        isOpen={mobileSidebarOpen}
        onClose={() => setMobileSidebarOpen(false)}
      />

      {/* Main Content */}
      <div className={`transition-all duration-300 ${sidebarCollapsed ? 'lg:ml-20' : 'lg:ml-64'}`}>
        <DashboardHeader 
          onMenuClick={() => setMobileSidebarOpen(true)}
          title={getTitle(role)}
        />
        <main className="p-4 lg:p-6 pb-24 lg:pb-6">
          <Outlet />
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <MobileNav role={role} />
    </div>
  )
}

function getTitle(role) {
  switch (role) {
    case 'admin':
      return 'Administration'
    case 'enseignant':
      return 'Espace Enseignant'
    case 'eleve':
      return 'Espace Élève'
    case 'parent':
      return 'Espace Parent'
    default:
      return 'GSNSD'
  }
}

export default DashboardLayout
