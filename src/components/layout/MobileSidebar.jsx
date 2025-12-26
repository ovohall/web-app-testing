import { Link, useLocation } from 'react-router-dom'
import { X, Home, LogOut } from 'lucide-react'
import * as Icons from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { SCHOOL_INFO } from '../../utils/constants'

const MobileSidebar = ({ links, isOpen, onClose }) => {
  const location = useLocation()
  const { user, logout } = useAuth()

  const isActive = (path) => location.pathname === path

  const getIcon = (iconName) => {
    return Icons[iconName] || Home
  }

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 z-50 lg:hidden"
        onClick={onClose}
      />

      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-screen w-72 bg-white z-50 lg:hidden animate-slide-in-right">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <Link to="/" className="flex items-center gap-3" onClick={onClose}>
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-gsnsd-blue to-gsnsd-magenta">
              <span className="text-white font-bold text-sm">GS</span>
            </div>
            <div>
              <h1 className="font-bold text-gray-900">{SCHOOL_INFO.abbreviation}</h1>
              <p className="text-xs text-gray-500">Gestion Scolaire</p>
            </div>
          </Link>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-gray-400 hover:bg-gray-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* User Info */}
        <div className="p-4 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gsnsd-blue to-gsnsd-magenta flex items-center justify-center">
              <span className="text-white font-semibold">
                {user?.prenom?.[0]}{user?.nom?.[0]}
              </span>
            </div>
            <div>
              <p className="font-medium text-gray-900">
                {user?.prenom} {user?.nom}
              </p>
              <p className="text-sm text-gray-500 capitalize">{user?.role}</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-3 space-y-1">
          {links.map((link) => {
            const Icon = getIcon(link.icon)
            return (
              <Link
                key={link.path}
                to={link.path}
                onClick={onClose}
                className={`
                  flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200
                  ${isActive(link.path)
                    ? 'bg-gsnsd-blue text-white'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  }
                `}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                <span className="text-sm font-medium">{link.label}</span>
              </Link>
            )
          })}
        </nav>

        {/* Logout */}
        <div className="p-3 border-t border-gray-100">
          <button
            onClick={() => {
              logout()
              onClose()
            }}
            className="w-full flex items-center gap-3 px-3 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span className="text-sm font-medium">Déconnexion</span>
          </button>
        </div>
      </aside>
    </>
  )
}

export default MobileSidebar
