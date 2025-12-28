import { Link, useLocation } from 'react-router-dom'
import { 
  Home, Users, BookOpen, Calendar, Settings, 
  CheckSquare, FileText, Award, BarChart3, DollarSign
} from 'lucide-react'

const iconMap = {
  Home, Users, BookOpen, Calendar, Settings,
  CheckSquare, FileText, Award, BarChart3, DollarSign
}

const MobileNav = ({ role }) => {
  const location = useLocation()

  // Get the 5 most important links for mobile based on role
  const getMobileLinks = () => {
    switch (role) {
      case 'eleve':
        return [
          { path: '/eleve/tableau-de-bord', label: 'Accueil', icon: 'Home' },
          { path: '/eleve/emploi-du-temps', label: 'Emploi', icon: 'Calendar' },
          { path: '/eleve/notes', label: 'Notes', icon: 'BookOpen' },
          { path: '/eleve/devoirs', label: 'Devoirs', icon: 'FileText' },
          { path: '/eleve/reussites', label: 'Réussites', icon: 'Award' },
        ]
      case 'enseignant':
        return [
          { path: '/enseignant/tableau-de-bord', label: 'Accueil', icon: 'Home' },
          { path: '/enseignant/classes', label: 'Classes', icon: 'Users' },
          { path: '/enseignant/presences', label: 'Présences', icon: 'CheckSquare' },
          { path: '/enseignant/notes', label: 'Notes', icon: 'BookOpen' },
          { path: '/enseignant/devoirs', label: 'Devoirs', icon: 'FileText' },
        ]
      case 'admin':
        return [
          { path: '/admin/tableau-de-bord', label: 'Accueil', icon: 'Home' },
          { path: '/admin/eleves', label: 'Élèves', icon: 'Users' },
          { path: '/admin/finances', label: 'Finances', icon: 'DollarSign' },
          { path: '/admin/rapports', label: 'Rapports', icon: 'BarChart3' },
          { path: '/admin/parametres', label: 'Plus', icon: 'Settings' },
        ]
      default:
        return []
    }
  }

  const links = getMobileLinks()
  const isActive = (path) => location.pathname === path

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-2 py-1 z-50 lg:hidden safe-area-bottom">
      <div className="flex justify-around items-center">
        {links.map((link) => {
          const Icon = iconMap[link.icon] || Home
          return (
            <Link
              key={link.path}
              to={link.path}
              className={`
                flex flex-col items-center gap-0.5 py-2 px-3 rounded-lg transition-colors
                ${isActive(link.path)
                  ? 'text-gsnsd-blue'
                  : 'text-gray-500 hover:text-gsnsd-blue'
                }
              `}
            >
              <Icon className="w-5 h-5" />
              <span className="text-[10px] font-medium">{link.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}

export default MobileNav
