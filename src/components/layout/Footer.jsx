import { Link } from 'react-router-dom'
import { 
  MapPin, 
  Phone, 
  Mail, 
  Facebook, 
  Clock,
  Heart
} from 'lucide-react'
import { SCHOOL_INFO, VALEURS } from '../../utils/constants'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* About Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-gsnsd-blue to-gsnsd-magenta">
                <span className="text-white font-bold">GS</span>
              </div>
              <div>
                <h3 className="text-white font-bold text-lg">{SCHOOL_INFO.abbreviation}</h3>
                <p className="text-sm text-gray-400">Depuis {SCHOOL_INFO.founded}</p>
              </div>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Le Groupe Scolaire Ndella Sémou DIOUF offre une éducation de qualité 
              basée sur quatre valeurs essentielles: Engagement, Persévérance, 
              Respect et Fierté.
            </p>
            <div className="flex gap-3 mt-6">
              <a 
                href="#" 
                className="p-2 rounded-lg bg-gray-800 text-gray-400 hover:text-white hover:bg-gsnsd-blue transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Liens Rapides</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/a-propos" className="text-sm hover:text-gsnsd-blue transition-colors">
                  À propos de nous
                </Link>
              </li>
              <li>
                <Link to="/programmes" className="text-sm hover:text-gsnsd-blue transition-colors">
                  Nos Programmes
                </Link>
              </li>
              <li>
                <Link to="/nos-valeurs" className="text-sm hover:text-gsnsd-blue transition-colors">
                  Nos Valeurs
                </Link>
              </li>
              <li>
                <Link to="/admission" className="text-sm hover:text-gsnsd-blue transition-colors">
                  Admission
                </Link>
              </li>
              <li>
                <Link to="/actualites" className="text-sm hover:text-gsnsd-blue transition-colors">
                  Actualités
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm hover:text-gsnsd-blue transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Our Values */}
          <div>
            <h4 className="text-white font-semibold mb-4">Nos Valeurs</h4>
            <ul className="space-y-3">
              {VALEURS.map((valeur) => (
                <li key={valeur.id} className="flex items-center gap-2">
                  <span>{valeur.icon}</span>
                  <span className="text-sm">{valeur.nom}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-semibold mb-4">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-gsnsd-blue flex-shrink-0 mt-0.5" />
                <span className="text-sm">{SCHOOL_INFO.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-gsnsd-blue flex-shrink-0" />
                <span className="text-sm">{SCHOOL_INFO.phone}</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-gsnsd-blue flex-shrink-0" />
                <span className="text-sm">{SCHOOL_INFO.email}</span>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-gsnsd-blue flex-shrink-0 mt-0.5" />
                <div className="text-sm">
                  <p>Lun - Ven: 7h30 - 17h00</p>
                  <p>Sam: 8h00 - 12h00</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-400">
              © {currentYear} {SCHOOL_INFO.name}. Tous droits réservés.
            </p>
            <p className="text-sm text-gray-400 flex items-center gap-1">
              Fait avec <Heart className="w-4 h-4 text-gsnsd-magenta" /> à Ndiakhirate, Sénégal
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
