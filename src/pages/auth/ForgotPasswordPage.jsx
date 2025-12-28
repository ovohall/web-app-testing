import { useState } from 'react'
import { Link } from 'react-router-dom'
import { 
  Mail, 
  ArrowLeft,
  Send,
  CheckCircle,
  AlertCircle
} from 'lucide-react'
import { Card, Button, Input } from '../../components/common'
import { SCHOOL_INFO } from '../../utils/constants'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    // Simulation d'envoi
    await new Promise(resolve => setTimeout(resolve, 1500))

    // Vérification simple de l'email
    if (email.includes('@')) {
      setIsSubmitted(true)
    } else {
      setError('Adresse email invalide')
    }

    setIsLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-3">
            <div className="w-14 h-14 bg-gradient-to-br from-gsnsd-blue to-gsnsd-magenta rounded-2xl flex items-center justify-center">
              <span className="text-xl font-bold text-white">GS</span>
            </div>
            <div className="text-left">
              <h1 className="font-heading font-bold text-lg text-gray-800">{SCHOOL_INFO.abbreviation}</h1>
              <p className="text-xs text-gray-500">Récupération de mot de passe</p>
            </div>
          </Link>
        </div>

        {/* Retour */}
        <Link 
          to="/connexion"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gsnsd-blue transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Retour à la connexion
        </Link>

        <Card className="p-8">
          {isSubmitted ? (
            <div className="text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
              <h2 className="text-2xl font-heading font-bold text-gray-800 mb-4">
                Email envoyé !
              </h2>
              <p className="text-gray-600 mb-6">
                Si un compte existe avec l'adresse <strong>{email}</strong>, 
                vous recevrez un email avec les instructions pour réinitialiser votre mot de passe.
              </p>
              <p className="text-sm text-gray-500 mb-6">
                Vérifiez également votre dossier spam si vous ne voyez pas l'email.
              </p>
              <div className="space-y-3">
                <Link to="/connexion">
                  <Button variant="primary" className="w-full">
                    Retour à la connexion
                  </Button>
                </Link>
                <button
                  onClick={() => {
                    setIsSubmitted(false)
                    setEmail('')
                  }}
                  className="w-full text-sm text-gsnsd-blue hover:underline"
                >
                  Essayer avec une autre adresse
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-gsnsd-blue/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-8 h-8 text-gsnsd-blue" />
                </div>
                <h2 className="text-2xl font-heading font-bold text-gray-800 mb-2">
                  Mot de passe oublié ?
                </h2>
                <p className="text-gray-600">
                  Entrez votre adresse email et nous vous enverrons un lien pour réinitialiser votre mot de passe.
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

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="w-full"
                  loading={isLoading}
                >
                  <Send className="w-5 h-5 mr-2" />
                  Envoyer le lien
                </Button>
              </form>

              <div className="mt-8 pt-6 border-t border-gray-100 text-center">
                <p className="text-sm text-gray-500">
                  Vous n'avez pas de compte ?{' '}
                  <Link to="/contact" className="text-gsnsd-blue hover:underline">
                    Contactez l'administration
                  </Link>
                </p>
              </div>
            </>
          )}
        </Card>

        <div className="text-center mt-6">
          <p className="text-sm text-gray-500">
            Besoin d'aide ?{' '}
            <Link to="/contact" className="text-gsnsd-blue hover:underline">
              Contactez-nous
            </Link>
          </p>
        </div>

        <p className="text-center text-xs text-gray-400 mt-4">
          © 2024 {SCHOOL_INFO.name}. Tous droits réservés.
        </p>
      </div>
    </div>
  )
}
