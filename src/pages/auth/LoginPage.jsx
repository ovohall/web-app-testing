import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  LogIn,
  ArrowLeft,
  AlertCircle,
  GraduationCap,
  Users,
  Shield
} from 'lucide-react'
import { Card, Button, Input } from '../../components/common'
import { useAuth } from '../../context/AuthContext'
import { SCHOOL_INFO, VALEURS } from '../../utils/constants'

const DEMO_ACCOUNTS = [
  {
    role: 'Directeur - Mayare MBAYE',
    email: 'mayare.mbaye@gsnsd.sn',
    password: '1234',
    icon: <Shield className="w-5 h-5" />,
    color: 'bg-purple-500',
    description: 'Accès complet - Peut créer des comptes et déléguer'
  },
  {
    role: 'Enseignant',
    email: 'enseignant@gsnsd.sn',
    password: '1234',
    icon: <Users className="w-5 h-5" />,
    color: 'bg-blue-500',
    description: 'Gestion des classes, notes et présences'
  },
  {
    role: 'Élève',
    email: 'eleve@gsnsd.sn',
    password: '1234',
    icon: <GraduationCap className="w-5 h-5" />,
    color: 'bg-green-500',
    description: 'Consultation des notes et emploi du temps'
  }
]

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showDemoAccounts, setShowDemoAccounts] = useState(false)

  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const from = location.state?.from?.pathname || '/admin/tableau-de-bord'

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      const result = await login(email, password)
      
      if (result.success) {
        // Rediriger vers le tableau de bord approprié selon le rôle
        const user = result.user
        let redirectPath = from

        if (from === '/admin/tableau-de-bord') {
          switch (user.role) {
            case 'admin':
              redirectPath = '/admin/tableau-de-bord'
              break
            case 'enseignant':
              redirectPath = '/enseignant/tableau-de-bord'
              break
            case 'eleve':
              redirectPath = '/eleve/tableau-de-bord'
              break
            case 'parent':
              redirectPath = '/parent/tableau-de-bord'
              break
            default:
              redirectPath = '/'
          }
        }

        navigate(redirectPath, { replace: true })
      } else {
        setError(result.error || 'Identifiants incorrects')
      }
    } catch (err) {
      setError('Une erreur est survenue. Veuillez réessayer.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleDemoLogin = async (account) => {
    setEmail(account.email)
    setPassword(account.password)
    setError('')
    setIsLoading(true)

    try {
      const result = await login(account.email, account.password)
      
      if (result.success) {
        const user = result.user
        let redirectPath

        switch (user.role) {
          case 'admin':
            redirectPath = '/admin/tableau-de-bord'
            break
          case 'enseignant':
            redirectPath = '/enseignant/tableau-de-bord'
            break
          case 'eleve':
            redirectPath = '/eleve/tableau-de-bord'
            break
          case 'parent':
            redirectPath = '/parent/tableau-de-bord'
            break
          default:
            redirectPath = '/'
        }

        navigate(redirectPath, { replace: true })
      }
    } catch (err) {
      setError('Une erreur est survenue. Veuillez réessayer.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex">
      {/* Partie gauche - Décoration */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-gsnsd-blue via-gsnsd-blue-dark to-gsnsd-magenta relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-72 h-72 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
        </div>
        
        <div className="relative z-10 flex flex-col justify-center px-12 text-white">
          <Link to="/" className="flex items-center gap-3 mb-12">
            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center">
              <span className="text-2xl font-bold text-gsnsd-blue">GS</span>
            </div>
            <div>
              <h1 className="font-heading font-bold text-xl">{SCHOOL_INFO.abbreviation}</h1>
              <p className="text-sm text-white/70">{SCHOOL_INFO.name}</p>
            </div>
          </Link>

          <h2 className="text-4xl font-heading font-bold mb-6">
            Bienvenue sur votre<br />espace personnel
          </h2>
          <p className="text-xl text-white/80 mb-12">
            Accédez à toutes les informations scolaires : notes, emploi du temps, 
            présences et plus encore.
          </p>

          <div className="grid grid-cols-2 gap-4">
            {Object.values(VALEURS).slice(0, 4).map((valeur) => (
              <div 
                key={valeur.nom}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-4 flex items-center gap-3"
              >
                <span className="text-2xl">{valeur.icone}</span>
                <span className="font-medium">{valeur.nom}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Partie droite - Formulaire */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Logo mobile */}
          <div className="lg:hidden text-center mb-8">
            <Link to="/" className="inline-flex items-center gap-3">
              <div className="w-14 h-14 bg-gradient-to-br from-gsnsd-blue to-gsnsd-magenta rounded-2xl flex items-center justify-center">
                <span className="text-xl font-bold text-white">GS</span>
              </div>
              <div className="text-left">
                <h1 className="font-heading font-bold text-lg text-gray-800">{SCHOOL_INFO.abbreviation}</h1>
                <p className="text-xs text-gray-500">Espace personnel</p>
              </div>
            </Link>
          </div>

          {/* Retour */}
          <Link 
            to="/"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gsnsd-blue transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour au site
          </Link>

          <Card className="p-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-heading font-bold text-gray-800 mb-2">
                Connexion
              </h2>
              <p className="text-gray-600">
                Accédez à votre espace personnel
              </p>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <Input
                label="Adresse email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="votre@email.com"
                icon={<Mail className="w-5 h-5" />}
                required
              />

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mot de passe
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="w-5 h-5 text-gray-400" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gsnsd-blue focus:border-transparent"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-gsnsd-blue border-gray-300 rounded focus:ring-gsnsd-blue"
                  />
                  <span className="text-sm text-gray-600">Se souvenir de moi</span>
                </label>
                <Link 
                  to="/mot-de-passe-oublie"
                  className="text-sm text-gsnsd-blue hover:underline"
                >
                  Mot de passe oublié ?
                </Link>
              </div>

              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full"
                loading={isLoading}
              >
                <LogIn className="w-5 h-5 mr-2" />
                Se connecter
              </Button>
            </form>

            {/* Comptes de démonstration */}
            <div className="mt-8 pt-8 border-t border-gray-100">
              <button
                onClick={() => setShowDemoAccounts(!showDemoAccounts)}
                className="w-full text-center text-sm text-gray-500 hover:text-gsnsd-blue transition-colors"
              >
                {showDemoAccounts ? 'Masquer' : 'Afficher'} les comptes de démonstration
              </button>

              {showDemoAccounts && (
                <div className="mt-4 space-y-3">
                  {DEMO_ACCOUNTS.map((account, index) => (
                    <button
                      key={index}
                      onClick={() => handleDemoLogin(account)}
                      disabled={isLoading}
                      className="w-full p-4 bg-gray-50 hover:bg-gray-100 rounded-xl flex items-center gap-4 transition-colors text-left disabled:opacity-50"
                    >
                      <div className={`w-10 h-10 ${account.color} rounded-xl flex items-center justify-center text-white`}>
                        {account.icon}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-800">{account.role}</p>
                        <p className="text-xs text-gray-500">{account.description}</p>
                      </div>
                      <ArrowLeft className="w-4 h-4 text-gray-400 rotate-180" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </Card>

          <p className="text-center text-sm text-gray-500 mt-6">
            © 2024 {SCHOOL_INFO.name}. Tous droits réservés.
          </p>
        </div>
      </div>
    </div>
  )
}
