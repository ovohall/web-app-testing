import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { 
  Home, Users, UserPlus, UserCog, GraduationCap, Building, Calendar, 
  DollarSign, CreditCard, MessageCircle, CalendarDays, BarChart3, 
  Settings, BookOpen, FileText, CheckSquare, Award, MessageSquare,
  ChevronLeft, ChevronRight, LogOut
} from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { SCHOOL_INFO } from '../../utils/constants'

const iconMap = {
  Home, Users, UserPlus, UserCog, GraduationCap, Building, Calendar,
  DollarSign, CreditCard, MessageCircle, CalendarDays, BarChart3,
  Settings, BookOpen, FileText, CheckSquare, Award, MessageSquare,
}

const Sidebar = ({ links, collapsed, setCollapsed }) => {
  const location = useLocation()
  const { user, logout } = useAuth()

  const isActive = (path) => location.pathname === path

  return (
    <aside 
      className={`
        fixed left-0 top-0 h-screen bg-white border-r border-gray-200 z-40
        transition-all duration-300 hidden lg:flex flex-col
        ${collapsed ? 'w-20' : 'w-64'}
      `}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-100">
        <Link to="/" className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-gsnsd-blue to-gsnsd-magenta flex-shrink-0">
            <span className="text-white font-bold text-sm">GS</span>
          </div>
          {!collapsed && (
            <div className="overflow-hidden">
              <h1 className="font-bold text-gray-900">{SCHOOL_INFO.abbreviation}</h1>
              <p className="text-xs text-gray-500 truncate">Gestion Scolaire</p>
            </div>
          )}
        </Link>
      </div>

      {/* User Info */}
      <div className={`p-4 border-b border-gray-100 ${collapsed ? 'px-2' : ''}`}>
        <div className={`flex items-center gap-3 ${collapsed ? 'justify-center' : ''}`}>
          <div className="w-10 h-10 rounded-full bg-gsnsd-blue/10 flex items-center justify-center flex-shrink-0">
            <span className="text-gsnsd-blue font-semibold">
              {user?.prenom?.[0]}{user?.nom?.[0]}
            </span>
          </div>
          {!collapsed && (
            <div className="overflow-hidden">
              <p className="font-medium text-gray-900 truncate">
                {user?.prenom} {user?.nom}
              </p>
              <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-3 space-y-1">
        {links.map((link) => {
          const Icon = iconMap[link.icon] || Home
          return (
            <Link
              key={link.path}
              to={link.path}
              className={`
                flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200
                ${collapsed ? 'justify-center' : ''}
                ${isActive(link.path)
                  ? 'bg-gsnsd-blue text-white'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }
              `}
              title={collapsed ? link.label : ''}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              {!collapsed && (
                <span className="text-sm font-medium truncate">{link.label}</span>
              )}
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="p-3 border-t border-gray-100 space-y-1">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className={`
            w-full flex items-center gap-3 px-3 py-2.5 rounded-lg
            text-gray-600 hover:bg-gray-100 transition-colors
            ${collapsed ? 'justify-center' : ''}
          `}
        >
          {collapsed ? (
            <ChevronRight className="w-5 h-5" />
          ) : (
            <>
              <ChevronLeft className="w-5 h-5" />
              <span className="text-sm font-medium">Réduire</span>
            </>
          )}
        </button>
        <button
          onClick={logout}
          className={`
            w-full flex items-center gap-3 px-3 py-2.5 rounded-lg
            text-red-600 hover:bg-red-50 transition-colors
            ${collapsed ? 'justify-center' : ''}
          `}
          title={collapsed ? 'Déconnexion' : ''}
        >
          <LogOut className="w-5 h-5" />
          {!collapsed && <span className="text-sm font-medium">Déconnexion</span>}
        </button>
      </div>
    </aside>
  )
}

export default Sidebar
