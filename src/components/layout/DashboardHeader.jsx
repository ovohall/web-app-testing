import { useState } from 'react'
import { Link } from 'react-router-dom'
import { 
  Bell, Search, Menu, X, LogOut, User, Settings, ChevronDown
} from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { SCHOOL_INFO } from '../../utils/constants'

const DashboardHeader = ({ onMenuClick, title }) => {
  const { user, logout } = useAuth()
  const [showNotifications, setShowNotifications] = useState(false)
  const [showProfile, setShowProfile] = useState(false)

  // Sample notifications
  const notifications = [
    { id: 1, title: 'Nouveau message', message: 'Réunion des parents le 15 janvier', time: 'Il y a 2h', read: false },
    { id: 2, title: 'Rappel', message: 'Évaluation de mathématiques demain', time: 'Il y a 5h', read: false },
    { id: 3, title: 'Paiement reçu', message: 'Frais de scolarité - Janvier', time: 'Hier', read: true },
  ]

  const unreadCount = notifications.filter(n => !n.read).length

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-gray-200">
      <div className="flex items-center justify-between h-16 px-4 lg:px-6">
        {/* Left: Menu button (mobile) and Title */}
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100"
          >
            <Menu className="w-6 h-6" />
          </button>
          <h1 className="text-lg font-semibold text-gray-900 hidden sm:block">
            {title}
          </h1>
        </div>

        {/* Right: Search, Notifications, Profile */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Search - hidden on mobile */}
          <div className="hidden md:block relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher..."
              className="pl-10 pr-4 py-2 w-64 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gsnsd-blue focus:border-transparent"
            />
          </div>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 relative"
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>

            {showNotifications && (
              <>
                <div 
                  className="fixed inset-0 z-10" 
                  onClick={() => setShowNotifications(false)} 
                />
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-lg border border-gray-100 z-20 animate-fade-in">
                  <div className="p-4 border-b border-gray-100">
                    <h3 className="font-semibold text-gray-900">Notifications</h3>
                  </div>
                  <div className="max-h-80 overflow-y-auto">
                    {notifications.map((notif) => (
                      <div 
                        key={notif.id}
                        className={`p-4 border-b border-gray-50 hover:bg-gray-50 cursor-pointer ${
                          !notif.read ? 'bg-gsnsd-blue/5' : ''
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="font-medium text-sm text-gray-900">{notif.title}</p>
                            <p className="text-sm text-gray-600 mt-0.5">{notif.message}</p>
                          </div>
                          {!notif.read && (
                            <span className="w-2 h-2 bg-gsnsd-blue rounded-full flex-shrink-0 mt-1.5" />
                          )}
                        </div>
                        <p className="text-xs text-gray-400 mt-1">{notif.time}</p>
                      </div>
                    ))}
                  </div>
                  <div className="p-3 text-center border-t border-gray-100">
                    <button className="text-sm text-gsnsd-blue hover:underline">
                      Voir toutes les notifications
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowProfile(!showProfile)}
              className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-gray-100"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gsnsd-blue to-gsnsd-magenta flex items-center justify-center">
                <span className="text-white text-sm font-semibold">
                  {user?.prenom?.[0]}{user?.nom?.[0]}
                </span>
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-sm font-medium text-gray-900">
                  {user?.prenom}
                </p>
              </div>
              <ChevronDown className="w-4 h-4 text-gray-400 hidden sm:block" />
            </button>

            {showProfile && (
              <>
                <div 
                  className="fixed inset-0 z-10" 
                  onClick={() => setShowProfile(false)} 
                />
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-100 z-20 animate-fade-in">
                  <div className="p-4 border-b border-gray-100">
                    <p className="font-medium text-gray-900">{user?.prenom} {user?.nom}</p>
                    <p className="text-sm text-gray-500">{user?.email}</p>
                    <span className="inline-block mt-2 px-2 py-0.5 bg-gsnsd-blue/10 text-gsnsd-blue text-xs font-medium rounded-full capitalize">
                      {user?.role}
                    </span>
                  </div>
                  <div className="p-2">
                    <Link
                      to={`/${user?.role}/profil`}
                      onClick={() => setShowProfile(false)}
                      className="flex items-center gap-3 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg"
                    >
                      <User className="w-4 h-4" />
                      Mon Profil
                    </Link>
                    <Link
                      to={`/${user?.role}/parametres`}
                      onClick={() => setShowProfile(false)}
                      className="flex items-center gap-3 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg"
                    >
                      <Settings className="w-4 h-4" />
                      Paramètres
                    </Link>
                    <button
                      onClick={logout}
                      className="w-full flex items-center gap-3 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg"
                    >
                      <LogOut className="w-4 h-4" />
                      Déconnexion
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export default DashboardHeader
