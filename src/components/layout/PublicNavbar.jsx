import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, LogIn, ChevronDown } from 'lucide-react'
import { NAV_LINKS, SCHOOL_INFO } from '../../utils/constants'
import Button from '../common/Button'

const PublicNavbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()

  const isActive = (path) => location.pathname === path

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-gradient-to-br from-gsnsd-blue to-gsnsd-magenta">
              <span className="text-white font-bold text-sm lg:text-base">GS</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg lg:text-xl font-bold text-gray-900">
                {SCHOOL_INFO.abbreviation}
              </h1>
              <p className="text-xs text-gray-500 hidden lg:block">
                Groupe Scolaire Ndella Sémou DIOUF
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.public.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`
                  px-4 py-2 rounded-lg text-sm font-medium transition-colors
                  ${isActive(link.path)
                    ? 'bg-gsnsd-blue/10 text-gsnsd-blue'
                    : 'text-gray-600 hover:text-gsnsd-blue hover:bg-gray-50'
                  }
                `}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <Link to="/connexion">
              <Button variant="outline" size="sm" icon={LogIn}>
                Connexion
              </Button>
            </Link>
            <Link to="/admission">
              <Button size="sm">
                Inscrivez-vous
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 animate-fade-in">
          <div className="px-4 py-4 space-y-1">
            {NAV_LINKS.public.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`
                  block px-4 py-3 rounded-lg text-sm font-medium transition-colors
                  ${isActive(link.path)
                    ? 'bg-gsnsd-blue/10 text-gsnsd-blue'
                    : 'text-gray-600 hover:bg-gray-50'
                  }
                `}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-4 flex flex-col gap-2">
              <Link to="/connexion" onClick={() => setIsOpen(false)}>
                <Button variant="outline" className="w-full" icon={LogIn}>
                  Connexion
                </Button>
              </Link>
              <Link to="/admission" onClick={() => setIsOpen(false)}>
                <Button className="w-full">
                  Inscrivez-vous
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}

export default PublicNavbar
