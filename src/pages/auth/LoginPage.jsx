import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Eye, EyeOff, Mail, Lock, GraduationCap, Shield, Users, UserCheck } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import toast from 'react-hot-toast'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  
  const from = location.state?.from?.pathname || null

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!email || !password) {
      toast.error('Veuillez remplir tous les champs')
      return
    }
    
    setLoading(true)
    
    try {
      const result = await login(email, password)
      
      if (result.success) {
        toast.success('Connexion réussie!')
        
        // Redirect based on role
        const role = result.user?.role
        let redirectPath = from
        
        if (!redirectPath) {
          switch (role) {
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
        toast.error(result.error || 'Email ou mot de passe incorrect')
      }
    } catch (error) {
      toast.error('Erreur de connexion. Veuillez réessayer.')
    } finally {
      setLoading(false)
    }
  }

  const fillDemoAccount = (demoEmail, demoPassword) => {
    setEmail(demoEmail)
    setPassword(demoPassword)
  }

  // Demo accounts info
  const demoAccounts = [
    {
      role: 'Directeur',
      email: 'mayare.mbaye@gsnsd.sn',
      password: '1234',
      icon: <Shield className="w-5 h-5" />,
      color: 'bg-purple-500',
      description: 'Accès complet'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gsnsd-blue via-blue-600 to-gsnsd-magenta flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo & Title */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-4">
            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-lg">
              <GraduationCap className="w-10 h-10 text-gsnsd-blue" />
            </div>
          </Link>
          <h1 className="text-2xl font-bold text-white mb-2">
            Bienvenue à GSNSD
          </h1>
          <p className="text-white/80">
            Groupe Scolaire Ndella Sémou DIOUF
          </p>
        </div>
        
        {/* Login Form */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">Connexion</h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Adresse email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-gsnsd-blue focus:border-transparent transition"
                  placeholder="votre.email@gsnsd.sn"
                  required
                />
              </div>
            </div>
            
            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Mot de passe
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-gsnsd-blue focus:border-transparent transition"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>
            
            {/* Remember & Forgot */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="rounded border-gray-300 text-gsnsd-blue focus:ring-gsnsd-blue" />
                <span className="text-sm text-gray-600">Se souvenir de moi</span>
              </label>
              <Link 
                to="/mot-de-passe-oublie" 
                className="text-sm text-gsnsd-blue hover:underline"
              >
                Mot de passe oublié?
              </Link>
            </div>
            
            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-gsnsd-blue to-gsnsd-magenta text-white font-semibold py-3 px-4 rounded-xl hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Connexion en cours...
                </>
              ) : (
                <>
                  <UserCheck className="w-5 h-5" />
                  Se connecter
                </>
              )}
            </button>
          </form>
          
          {/* Demo Accounts */}
          <div className="mt-6 pt-6 border-t">
            <p className="text-sm text-gray-500 mb-3">Compte de démonstration:</p>
            <div className="space-y-2">
              {demoAccounts.map((account, index) => (
                <button
                  key={index}
                  onClick={() => fillDemoAccount(account.email, account.password)}
                  className="w-full flex items-center gap-3 p-3 bg-gray-50 hover:bg-gray-100 rounded-xl transition text-left"
                >
                  <div className={`w-10 h-10 ${account.color} rounded-lg flex items-center justify-center text-white`}>
                    {account.icon}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-800">{account.role}</p>
                    <p className="text-xs text-gray-500">{account.description}</p>
                  </div>
                  <div className="text-right text-xs text-gray-400">
                    <p>{account.email}</p>
                    <p>Mot de passe: {account.password}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
        
        {/* Back to Home */}
        <div className="text-center mt-6">
          <Link 
            to="/" 
            className="text-white/80 hover:text-white transition"
          >
            ← Retour à l'accueil
          </Link>
        </div>
      </div>
    </div>
  )
}
