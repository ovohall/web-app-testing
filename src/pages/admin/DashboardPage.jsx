import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { 
  Users, GraduationCap, UserCheck, Wallet, TrendingUp, 
  Calendar, Bell, AlertTriangle, CheckCircle, Clock,
  Target, Heart, Trophy, Handshake, Plus, FileText, Settings
} from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { dashboardApi } from '../../services/api'
import { Card, StatCard, Loader } from '../../components/common'

export default function AdminDashboardPage() {
  const { user } = useAuth()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [dashboardData, setDashboardData] = useState(null)

  useEffect(() => {
    loadDashboard()
  }, [])

  const loadDashboard = async () => {
    try {
      setLoading(true)
      const response = await dashboardApi.getAdmin()
      if (response.success) {
        setDashboardData(response.data)
      } else {
        setError(response.message)
      }
    } catch (err) {
      setError(err.message || 'Erreur lors du chargement')
    } finally {
      setLoading(false)
    }
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('fr-SN', {
      style: 'currency',
      currency: 'XOF',
      minimumFractionDigits: 0
    }).format(amount || 0)
  }

  if (loading) {
    return <Loader size="lg" page />
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Erreur de chargement</h2>
        <p className="text-gray-600 mb-4">{error}</p>
        <button 
          onClick={loadDashboard}
          className="btn-primary"
        >
          Réessayer
        </button>
      </div>
    )
  }

  const data = dashboardData || {
    effectifs: { total: 0, prescolaire: 0, elementaire: 0 },
    enseignants: 0,
    classes: 0,
    presence: { presents: 0, absents: 0, retards: 0, total: 0, tauxPresence: 0 },
    finances: { recettesMois: 0, nombrePaiements: 0 },
    anneeScolaire: '2024-2025'
  }

  // Quick actions
  const quickActions = [
    { label: 'Nouvel élève', icon: Plus, path: '/admin/eleves', color: 'bg-blue-500' },
    { label: 'Saisir paiement', icon: Wallet, path: '/admin/paiements', color: 'bg-green-500' },
    { label: 'Rapport', icon: FileText, path: '/admin/rapports', color: 'bg-purple-500' },
    { label: 'Paramètres', icon: Settings, path: '/admin/parametres', color: 'bg-gray-500' },
  ]

  // The 4 values
  const valeurs = [
    { 
      nom: 'Engagement', 
      icon: Handshake, 
      color: 'text-blue-600 bg-blue-100',
      description: 'Implication des parents'
    },
    { 
      nom: 'Persévérance', 
      icon: Target, 
      color: 'text-orange-600 bg-orange-100',
      description: 'Assiduité et ponctualité'
    },
    { 
      nom: 'Respect', 
      icon: Heart, 
      color: 'text-pink-600 bg-pink-100',
      description: 'Vivre ensemble'
    },
    { 
      nom: 'Fierté', 
      icon: Trophy, 
      color: 'text-yellow-600 bg-yellow-100',
      description: 'Appartenance à l\'école'
    },
  ]

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-gsnsd-blue to-gsnsd-blue-dark rounded-2xl p-6 text-white">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold mb-2">
              Bienvenue, {user?.prenom} {user?.nom}
            </h1>
            <p className="text-blue-100">
              {user?.titre || 'Directeur'} • Année scolaire {data.anneeScolaire}
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-blue-100">
              {new Date().toLocaleDateString('fr-FR', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </div>
        </div>
        
        {/* Quick Actions */}
        <div className="flex gap-3 mt-6">
          {quickActions.map((action, index) => (
            <Link 
              key={index}
              to={action.path}
              className="flex items-center gap-2 bg-white/20 hover:bg-white/30 transition px-4 py-2 rounded-lg"
            >
              <action.icon className="w-4 h-4" />
              <span className="text-sm font-medium">{action.label}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Main Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Effectif Total"
          value={data.effectifs.total}
          subtitle={`${data.effectifs.prescolaire} préscolaire • ${data.effectifs.elementaire} élémentaire`}
          icon={<Users className="w-6 h-6" />}
          color="blue"
        />
        <StatCard
          title="Taux de Présence"
          value={`${data.presence.tauxPresence}%`}
          subtitle={`${data.presence.presents} présents aujourd'hui`}
          icon={<UserCheck className="w-6 h-6" />}
          color="green"
          trend={data.presence.tauxPresence >= 90 ? 'up' : data.presence.tauxPresence >= 80 ? 'neutral' : 'down'}
        />
        <StatCard
          title="Recettes du Mois"
          value={formatCurrency(data.finances.recettesMois)}
          subtitle={`${data.finances.nombrePaiements} paiements reçus`}
          icon={<Wallet className="w-6 h-6" />}
          color="purple"
        />
        <StatCard
          title="Enseignants"
          value={data.enseignants}
          subtitle={`${data.classes} classes actives`}
          icon={<GraduationCap className="w-6 h-6" />}
          color="orange"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - 2/3 */}
        <div className="lg:col-span-2 space-y-6">
          {/* Presence Summary */}
          <Card title="Présence Aujourd'hui" icon={<UserCheck className="w-5 h-5" />}>
            {data.presence.total > 0 ? (
              <div className="grid grid-cols-4 gap-4">
                <div className="text-center p-4 bg-green-50 rounded-xl">
                  <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-green-600">{data.presence.presents}</p>
                  <p className="text-sm text-gray-600">Présents</p>
                </div>
                <div className="text-center p-4 bg-red-50 rounded-xl">
                  <AlertTriangle className="w-8 h-8 text-red-500 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-red-600">{data.presence.absents}</p>
                  <p className="text-sm text-gray-600">Absents</p>
                </div>
                <div className="text-center p-4 bg-orange-50 rounded-xl">
                  <Clock className="w-8 h-8 text-orange-500 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-orange-600">{data.presence.retards}</p>
                  <p className="text-sm text-gray-600">Retards</p>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-xl">
                  <TrendingUp className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-blue-600">{data.presence.tauxPresence}%</p>
                  <p className="text-sm text-gray-600">Taux</p>
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <Clock className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>Aucune donnée de présence pour aujourd'hui</p>
                <p className="text-sm">L'appel n'a pas encore été fait</p>
              </div>
            )}
          </Card>

          {/* Effectifs by Level */}
          <Card title="Répartition des Effectifs" icon={<Users className="w-5 h-5" />}>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
                    <GraduationCap className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Préscolaire</h3>
                    <p className="text-sm text-gray-500">PS, MS, GS</p>
                  </div>
                </div>
                <p className="text-3xl font-bold text-blue-600">{data.effectifs.prescolaire}</p>
                <p className="text-sm text-gray-600">élèves inscrits</p>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center">
                    <GraduationCap className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Élémentaire</h3>
                    <p className="text-sm text-gray-500">CP à CM2</p>
                  </div>
                </div>
                <p className="text-3xl font-bold text-purple-600">{data.effectifs.elementaire}</p>
                <p className="text-sm text-gray-600">élèves inscrits</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Right Column - 1/3 */}
        <div className="space-y-6">
          {/* Quick Links */}
          <Card title="Accès Rapide" icon={<Settings className="w-5 h-5" />}>
            <div className="space-y-2">
              <Link 
                to="/admin/utilisateurs" 
                className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition"
              >
                <Users className="w-5 h-5 text-blue-500" />
                <span className="font-medium">Gestion des utilisateurs</span>
              </Link>
              <Link 
                to="/admin/eleves" 
                className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition"
              >
                <GraduationCap className="w-5 h-5 text-green-500" />
                <span className="font-medium">Liste des élèves</span>
              </Link>
              <Link 
                to="/admin/classes" 
                className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition"
              >
                <Calendar className="w-5 h-5 text-purple-500" />
                <span className="font-medium">Gestion des classes</span>
              </Link>
              <Link 
                to="/admin/paiements" 
                className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition"
              >
                <Wallet className="w-5 h-5 text-orange-500" />
                <span className="font-medium">Paiements & Finances</span>
              </Link>
            </div>
          </Card>

          {/* Notifications placeholder */}
          <Card title="Notifications" icon={<Bell className="w-5 h-5" />}>
            <div className="text-center py-6 text-gray-500">
              <Bell className="w-10 h-10 mx-auto mb-3 opacity-50" />
              <p className="text-sm">Aucune notification</p>
            </div>
          </Card>
        </div>
      </div>

      {/* 4 Values Section */}
      <div className="bg-gradient-to-r from-gray-50 to-white rounded-2xl p-6 border">
        <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <Trophy className="w-5 h-5 text-gsnsd-magenta" />
          Nos 4 Valeurs Essentielles
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {valeurs.map((valeur, index) => (
            <div 
              key={index}
              className="bg-white rounded-xl p-4 border border-gray-100 hover:shadow-md transition"
            >
              <div className={`w-12 h-12 rounded-xl ${valeur.color} flex items-center justify-center mb-3`}>
                <valeur.icon className="w-6 h-6" />
              </div>
              <h3 className="font-semibold text-gray-800">{valeur.nom}</h3>
              <p className="text-sm text-gray-500">{valeur.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
