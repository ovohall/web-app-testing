import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { 
  Users, BookOpen, Calendar, ClipboardCheck, MessageSquare,
  Clock, ChevronRight, Bell, Plus, AlertTriangle
} from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { dashboardApi } from '../../services/api'
import { Card, StatCard, Loader } from '../../components/common'

export default function EnseignantDashboardPage() {
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
      const response = await dashboardApi.getEnseignant()
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

  if (loading) {
    return <Loader size="lg" page />
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Erreur de chargement</h2>
        <p className="text-gray-600 mb-4">{error}</p>
        <button onClick={loadDashboard} className="btn-primary">
          Réessayer
        </button>
      </div>
    )
  }

  const data = dashboardData || { classes: [], emploiDuTemps: [] }
  const totalEleves = data.classes.reduce((sum, c) => sum + (parseInt(c.effectif) || 0), 0)

  // Quick actions
  const quickActions = [
    { label: 'Faire l\'appel', icon: ClipboardCheck, path: '/enseignant/presences', color: 'bg-green-500' },
    { label: 'Saisir notes', icon: BookOpen, path: '/enseignant/notes', color: 'bg-blue-500' },
    { label: 'Nouveau devoir', icon: Plus, path: '/enseignant/devoirs', color: 'bg-purple-500' },
  ]

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-gsnsd-blue to-gsnsd-magenta rounded-2xl p-6 text-white">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold mb-2">
              Bonjour, {user?.prenom} {user?.nom}
            </h1>
            <p className="text-white/80">
              Enseignant{user?.titre ? ` - ${user.titre}` : ''}
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-white/80">
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

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard
          title="Mes Classes"
          value={data.classes.length}
          icon={<Users className="w-6 h-6" />}
          color="blue"
        />
        <StatCard
          title="Total Élèves"
          value={totalEleves}
          icon={<Users className="w-6 h-6" />}
          color="green"
        />
        <StatCard
          title="Cours Aujourd'hui"
          value={data.emploiDuTemps.length}
          icon={<Calendar className="w-6 h-6" />}
          color="purple"
        />
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Classes */}
        <div className="lg:col-span-2">
          <Card title="Mes Classes" icon={<Users className="w-5 h-5" />}>
            {data.classes.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <Users className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>Aucune classe assignée</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {data.classes.map((classe, index) => (
                  <Link
                    key={index}
                    to={`/enseignant/classes/${classe.id}`}
                    className="p-4 bg-gradient-to-br from-blue-50 to-white rounded-xl border hover:shadow-md transition"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-semibold text-gray-800">{classe.nom}</h3>
                        <p className="text-sm text-gray-500">Niveau: {classe.niveau}</p>
                      </div>
                      <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-sm font-medium">
                        {classe.effectif || 0} élèves
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-gsnsd-blue">
                      <span className="text-sm">Voir la classe</span>
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </Card>
        </div>

        {/* Today's Schedule */}
        <div>
          <Card title="Emploi du temps" icon={<Clock className="w-5 h-5" />}>
            {data.emploiDuTemps.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <Calendar className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>Pas de cours aujourd'hui</p>
              </div>
            ) : (
              <div className="space-y-3">
                {data.emploiDuTemps.map((cours, index) => (
                  <div 
                    key={index}
                    className="p-3 bg-gray-50 rounded-lg border-l-4 border-gsnsd-blue"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium text-gray-800">{cours.matiere_nom}</h4>
                        <p className="text-sm text-gray-500">{cours.classe_nom}</p>
                      </div>
                      <span className="text-sm text-gray-600">
                        {cours.heure_debut?.slice(0, 5)} - {cours.heure_fin?.slice(0, 5)}
                      </span>
                    </div>
                    {cours.salle && (
                      <p className="text-xs text-gray-400 mt-1">Salle: {cours.salle}</p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>
      </div>

      {/* Quick Links */}
      <Card title="Accès Rapide">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link 
            to="/enseignant/presences"
            className="p-4 bg-green-50 rounded-xl text-center hover:bg-green-100 transition"
          >
            <ClipboardCheck className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <p className="font-medium text-gray-800">Présences</p>
          </Link>
          <Link 
            to="/enseignant/notes"
            className="p-4 bg-blue-50 rounded-xl text-center hover:bg-blue-100 transition"
          >
            <BookOpen className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <p className="font-medium text-gray-800">Notes</p>
          </Link>
          <Link 
            to="/enseignant/devoirs"
            className="p-4 bg-purple-50 rounded-xl text-center hover:bg-purple-100 transition"
          >
            <BookOpen className="w-8 h-8 text-purple-600 mx-auto mb-2" />
            <p className="font-medium text-gray-800">Devoirs</p>
          </Link>
          <Link 
            to="/enseignant/parents"
            className="p-4 bg-orange-50 rounded-xl text-center hover:bg-orange-100 transition"
          >
            <MessageSquare className="w-8 h-8 text-orange-600 mx-auto mb-2" />
            <p className="font-medium text-gray-800">Parents</p>
          </Link>
        </div>
      </Card>
    </div>
  )
}
