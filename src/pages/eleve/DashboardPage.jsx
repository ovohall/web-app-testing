import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { 
  BookOpen, Calendar, ClipboardCheck, Award, 
  Clock, CheckCircle, AlertTriangle, TrendingUp,
  Target, Trophy, Star
} from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { dashboardApi } from '../../services/api'
import { Card, StatCard, Loader, Badge } from '../../components/common'

export default function EleveDashboardPage() {
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
      const response = await dashboardApi.getEleve()
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

  const data = dashboardData || { 
    eleve: {}, 
    notes: [], 
    presence: { presents: 0, absents: 0, retards: 0, total: 0 } 
  }

  // Calculate average
  const moyenne = data.notes.length > 0 
    ? (data.notes.reduce((sum, n) => sum + parseFloat(n.note), 0) / data.notes.length).toFixed(2)
    : null

  // Calculate attendance rate
  const tauxPresence = data.presence.total > 0
    ? ((data.presence.presents / data.presence.total) * 100).toFixed(1)
    : 100

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-gsnsd-blue via-gsnsd-blue-dark to-gsnsd-magenta rounded-2xl p-6 text-white">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold mb-2">
              Salut, {user?.prenom} ! 👋
            </h1>
            <p className="text-white/80">
              {data.eleve?.classe_nom || 'Classe'} • {data.eleve?.niveau || 'Niveau'}
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-white/80">
              {new Date().toLocaleDateString('fr-FR', { 
                weekday: 'long', 
                day: 'numeric',
                month: 'long'
              })}
            </p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard
          title="Moyenne Générale"
          value={moyenne || '-'}
          subtitle={moyenne ? '/20' : 'Pas encore de notes'}
          icon={<TrendingUp className="w-6 h-6" />}
          color="blue"
        />
        <StatCard
          title="Taux de Présence"
          value={`${tauxPresence}%`}
          subtitle={`${data.presence.presents} jours présent`}
          icon={<CheckCircle className="w-6 h-6" />}
          color="green"
        />
        <StatCard
          title="Notes Reçues"
          value={data.notes.length}
          subtitle="cette année"
          icon={<BookOpen className="w-6 h-6" />}
          color="purple"
        />
        <StatCard
          title="Retards"
          value={data.presence.retards || 0}
          subtitle="cette année"
          icon={<Clock className="w-6 h-6" />}
          color={data.presence.retards > 5 ? 'red' : 'orange'}
        />
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Grades */}
        <div className="lg:col-span-2">
          <Card 
            title="Dernières Notes" 
            icon={<BookOpen className="w-5 h-5" />}
            action={
              <Link to="/eleve/notes" className="text-sm text-gsnsd-blue hover:underline">
                Voir tout
              </Link>
            }
          >
            {data.notes.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <BookOpen className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>Pas encore de notes</p>
                <p className="text-sm">Tes notes apparaîtront ici</p>
              </div>
            ) : (
              <div className="space-y-3">
                {data.notes.slice(0, 5).map((note, index) => (
                  <div 
                    key={index}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        note.note >= 14 ? 'bg-green-100 text-green-600' :
                        note.note >= 10 ? 'bg-blue-100 text-blue-600' :
                        'bg-red-100 text-red-600'
                      }`}>
                        <BookOpen className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">{note.matiere_nom}</p>
                        <p className="text-sm text-gray-500">
                          {new Date(note.date_evaluation).toLocaleDateString('fr-FR')}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`text-xl font-bold ${
                        note.note >= 14 ? 'text-green-600' :
                        note.note >= 10 ? 'text-blue-600' :
                        'text-red-600'
                      }`}>
                        {note.note}/{note.note_max || 20}
                      </p>
                      {note.type_evaluation && (
                        <Badge color="gray" size="sm">{note.type_evaluation}</Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Attendance Summary */}
          <Card title="Ma Présence" icon={<ClipboardCheck className="w-5 h-5" />}>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-gray-700">Présent</span>
                </div>
                <span className="font-bold text-green-600">{data.presence.presents || 0}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-red-500" />
                  <span className="text-gray-700">Absent</span>
                </div>
                <span className="font-bold text-red-600">{data.presence.absents || 0}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-orange-500" />
                  <span className="text-gray-700">Retard</span>
                </div>
                <span className="font-bold text-orange-600">{data.presence.retards || 0}</span>
              </div>
            </div>
          </Card>

          {/* Values Progress */}
          <Card title="Mes Valeurs" icon={<Trophy className="w-5 h-5" />}>
            <div className="space-y-4">
              <div className="p-3 bg-blue-50 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Target className="w-5 h-5 text-blue-500" />
                  <span className="font-medium text-gray-700">Engagement</span>
                </div>
                <div className="w-full bg-blue-200 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: '75%' }} />
                </div>
              </div>
              <div className="p-3 bg-orange-50 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Star className="w-5 h-5 text-orange-500" />
                  <span className="font-medium text-gray-700">Persévérance</span>
                </div>
                <div className="w-full bg-orange-200 rounded-full h-2">
                  <div className="bg-orange-500 h-2 rounded-full" style={{ width: `${tauxPresence}%` }} />
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Quick Links */}
      <Card title="Accès Rapide">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link 
            to="/eleve/notes"
            className="p-4 bg-blue-50 rounded-xl text-center hover:bg-blue-100 transition"
          >
            <BookOpen className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <p className="font-medium text-gray-800">Mes Notes</p>
          </Link>
          <Link 
            to="/eleve/emploi-du-temps"
            className="p-4 bg-purple-50 rounded-xl text-center hover:bg-purple-100 transition"
          >
            <Calendar className="w-8 h-8 text-purple-600 mx-auto mb-2" />
            <p className="font-medium text-gray-800">Emploi du temps</p>
          </Link>
          <Link 
            to="/eleve/devoirs"
            className="p-4 bg-green-50 rounded-xl text-center hover:bg-green-100 transition"
          >
            <ClipboardCheck className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <p className="font-medium text-gray-800">Mes Devoirs</p>
          </Link>
          <Link 
            to="/eleve/reussites"
            className="p-4 bg-yellow-50 rounded-xl text-center hover:bg-yellow-100 transition"
          >
            <Award className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
            <p className="font-medium text-gray-800">Mes Réussites</p>
          </Link>
        </div>
      </Card>
    </div>
  )
}
