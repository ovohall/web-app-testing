import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Users,
  GraduationCap,
  UserCheck,
  DollarSign,
  Calendar,
  TrendingUp,
  TrendingDown,
  AlertCircle,
  CheckCircle,
  ChevronRight,
  Bell,
  FileText,
  Clock,
  CreditCard,
  UserPlus,
  Settings,
  BarChart3,
  PieChart,
  Activity,
  Target,
  Award
} from 'lucide-react'
import { Card, Badge, Button, StatCard } from '../../components/common'
import { useAuth } from '../../context/AuthContext'
import { VALEURS, NIVEAUX_PRESCOLAIRE, NIVEAUX_ELEMENTAIRE } from '../../utils/constants'

// Données de démonstration
const STATS = {
  effectifTotal: 285,
  prescolaire: 85,
  elementaire: 200,
  tauxPresence: 94.5,
  tauxReussite: 98,
  recettesMois: 4250000,
  impayes: 850000,
  enseignants: 15
}

const PRESENCES_PAR_NIVEAU = [
  { niveau: 'PS', presents: 22, total: 25 },
  { niveau: 'MS', presents: 28, total: 30 },
  { niveau: 'GS', presents: 27, total: 30 },
  { niveau: 'CP', presents: 32, total: 35 },
  { niveau: 'CE1', presents: 38, total: 40 },
  { niveau: 'CE2', presents: 36, total: 40 },
  { niveau: 'CM1', presents: 34, total: 38 },
  { niveau: 'CM2', presents: 45, total: 47 }
]

const PAIEMENTS_RECENTS = [
  { id: 1, eleve: 'Mamadou Diallo', classe: 'CM2 A', montant: 35000, type: 'Scolarité', date: '2024-12-26', mode: 'Orange Money' },
  { id: 2, eleve: 'Fatou Ndiaye', classe: 'CE1 B', montant: 30000, type: 'Scolarité', date: '2024-12-26', mode: 'Wave' },
  { id: 3, eleve: 'Ibrahima Sow', classe: 'MS', montant: 25000, type: 'Cantine', date: '2024-12-25', mode: 'Espèces' }
]

const IMPAYES = [
  { id: 1, eleve: 'Aminata Fall', classe: 'CM1 A', montant: 105000, moisDus: 3 },
  { id: 2, eleve: 'Ousmane Gueye', classe: 'CE2 B', montant: 70000, moisDus: 2 },
  { id: 3, eleve: 'Khady Diop', classe: 'CP A', montant: 35000, moisDus: 1 }
]

const EVENEMENTS_PROCHAINS = [
  { id: 1, titre: 'Réunion parents CM2', date: '2024-12-28', heure: '15:00', type: 'Réunion' },
  { id: 2, titre: 'Conseil des enseignants', date: '2024-12-30', heure: '14:00', type: 'Conseil' },
  { id: 3, titre: 'Journée portes ouvertes', date: '2025-01-15', heure: '09:00', type: 'Événement' }
]

const NOTIFICATIONS = [
  { id: 1, message: '3 nouvelles inscriptions en attente de validation', type: 'info', time: 'Il y a 2h' },
  { id: 2, message: '5 élèves en retard ce matin', type: 'warning', time: 'Il y a 3h' },
  { id: 3, message: 'Nouveau paiement reçu - 35 000 FCFA', type: 'success', time: 'Il y a 4h' }
]

const INDICATEURS_VALEURS = [
  { valeur: 'Engagement', score: 85, description: 'Participation des parents aux réunions' },
  { valeur: 'Persévérance', score: 92, description: 'Taux d\'assiduité des élèves' },
  { valeur: 'Respect', score: 88, description: 'Comportement et discipline' },
  { valeur: 'Fierté', score: 95, description: 'Participation aux événements' }
]

function formatCurrency(amount) {
  return new Intl.NumberFormat('fr-SN', {
    style: 'currency',
    currency: 'XOF',
    minimumFractionDigits: 0
  }).format(amount)
}

function formatDate(dateStr) {
  const date = new Date(dateStr)
  const options = { weekday: 'long', day: 'numeric', month: 'long' }
  return date.toLocaleDateString('fr-FR', options)
}

export default function AdminDashboardPage() {
  const { user } = useAuth()
  const [currentTime] = useState(new Date())

  const totalPresents = PRESENCES_PAR_NIVEAU.reduce((acc, n) => acc + n.presents, 0)
  const totalEleves = PRESENCES_PAR_NIVEAU.reduce((acc, n) => acc + n.total, 0)

  return (
    <div className="space-y-6">
      {/* Message de bienvenue */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-800 rounded-2xl p-6 text-white">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-heading font-bold mb-2">
              Bienvenue, {user?.prenom || 'Directeur'} ! 👋
            </h1>
            <p className="text-purple-200">
              {formatDate(currentTime)} • Tableau de bord administrateur
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/admin/eleves">
              <Button className="bg-white text-purple-700 hover:bg-purple-50">
                <UserPlus className="w-4 h-4 mr-2" />
                Nouvelle inscription
              </Button>
            </Link>
            <Link to="/admin/parametres">
              <Button variant="ghost" className="text-white hover:bg-white/10">
                <Settings className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Statistiques principales */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard
          title="Effectif total"
          value={STATS.effectifTotal}
          subtitle={`${STATS.prescolaire} présco. + ${STATS.elementaire} élém.`}
          icon={<GraduationCap className="w-6 h-6" />}
          trend={{ value: 5, isPositive: true }}
        />
        <StatCard
          title="Présence aujourd'hui"
          value={`${((totalPresents / totalEleves) * 100).toFixed(1)}%`}
          subtitle={`${totalPresents}/${totalEleves} élèves`}
          icon={<UserCheck className="w-6 h-6" />}
          trend={{ value: 2.3, isPositive: true }}
        />
        <StatCard
          title="Recettes du mois"
          value={formatCurrency(STATS.recettesMois)}
          subtitle="Décembre 2024"
          icon={<DollarSign className="w-6 h-6" />}
          trend={{ value: 12, isPositive: true }}
        />
        <StatCard
          title="Impayés"
          value={formatCurrency(STATS.impayes)}
          subtitle={`${IMPAYES.length} familles`}
          icon={<AlertCircle className="w-6 h-6" />}
          trend={{ value: 5, isPositive: false }}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Colonne principale */}
        <div className="lg:col-span-2 space-y-6">
          {/* Présences par niveau */}
          <Card>
            <div className="p-4 border-b border-gray-100 flex items-center justify-between">
              <h2 className="font-heading font-bold text-gray-800 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-gsnsd-blue" />
                Présences par niveau
              </h2>
              <Link to="/admin/presences">
                <Button variant="ghost" size="sm">
                  Détails <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
            </div>
            <div className="p-4">
              <div className="grid grid-cols-4 md:grid-cols-8 gap-3">
                {PRESENCES_PAR_NIVEAU.map((niveau) => {
                  const pourcentage = (niveau.presents / niveau.total) * 100
                  return (
                    <div key={niveau.niveau} className="text-center">
                      <div className="relative w-12 h-12 mx-auto mb-2">
                        <svg className="w-full h-full transform -rotate-90">
                          <circle
                            cx="24"
                            cy="24"
                            r="20"
                            stroke="#e5e7eb"
                            strokeWidth="4"
                            fill="none"
                          />
                          <circle
                            cx="24"
                            cy="24"
                            r="20"
                            stroke={pourcentage >= 90 ? '#10B981' : pourcentage >= 80 ? '#F59E0B' : '#EF4444'}
                            strokeWidth="4"
                            fill="none"
                            strokeLinecap="round"
                            strokeDasharray={`${pourcentage * 1.26} 126`}
                          />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-xs font-bold">{niveau.presents}</span>
                        </div>
                      </div>
                      <p className="text-xs font-medium text-gray-800">{niveau.niveau}</p>
                      <p className="text-xs text-gray-500">{niveau.total}</p>
                    </div>
                  )
                })}
              </div>
            </div>
          </Card>

          {/* Paiements récents */}
          <Card>
            <div className="p-4 border-b border-gray-100 flex items-center justify-between">
              <h2 className="font-heading font-bold text-gray-800 flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-green-500" />
                Paiements récents
              </h2>
              <Link to="/admin/paiements">
                <Button variant="ghost" size="sm">
                  Voir tout <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
            </div>
            <div className="divide-y divide-gray-50">
              {PAIEMENTS_RECENTS.map((paiement) => (
                <div key={paiement.id} className="p-4 hover:bg-gray-50 transition-colors flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">{paiement.eleve}</p>
                      <p className="text-sm text-gray-500">
                        {paiement.classe} • {paiement.type} • {paiement.mode}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-green-600">{formatCurrency(paiement.montant)}</p>
                    <p className="text-xs text-gray-500">{new Date(paiement.date).toLocaleDateString('fr-FR')}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Impayés */}
          <Card>
            <div className="p-4 border-b border-gray-100 flex items-center justify-between">
              <h2 className="font-heading font-bold text-gray-800 flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-red-500" />
                Impayés à recouvrer
              </h2>
              <Link to="/admin/creances">
                <Button variant="ghost" size="sm">
                  Gérer <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
            </div>
            <div className="divide-y divide-gray-50">
              {IMPAYES.map((impaye) => (
                <div key={impaye.id} className="p-4 hover:bg-gray-50 transition-colors flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                      <AlertCircle className="w-5 h-5 text-red-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">{impaye.eleve}</p>
                      <p className="text-sm text-gray-500">
                        {impaye.classe} • {impaye.moisDus} mois de retard
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-red-600">{formatCurrency(impaye.montant)}</p>
                    <Button variant="outline" size="sm" className="mt-1">
                      Relancer
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Colonne latérale */}
        <div className="space-y-6">
          {/* Actions rapides */}
          <Card className="p-4">
            <h3 className="font-heading font-bold text-gray-800 mb-4">Actions rapides</h3>
            <div className="space-y-2">
              <Link to="/admin/eleves">
                <Button variant="outline" className="w-full justify-start">
                  <UserPlus className="w-4 h-4 mr-2" />
                  Nouvelle inscription
                </Button>
              </Link>
              <Link to="/admin/paiements">
                <Button variant="outline" className="w-full justify-start">
                  <CreditCard className="w-4 h-4 mr-2" />
                  Enregistrer paiement
                </Button>
              </Link>
              <Link to="/admin/communication">
                <Button variant="outline" className="w-full justify-start">
                  <Bell className="w-4 h-4 mr-2" />
                  Envoyer annonce
                </Button>
              </Link>
              <Link to="/admin/rapports">
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="w-4 h-4 mr-2" />
                  Générer rapport
                </Button>
              </Link>
            </div>
          </Card>

          {/* Notifications */}
          <Card>
            <div className="p-4 border-b border-gray-100">
              <h2 className="font-heading font-bold text-gray-800 flex items-center gap-2">
                <Bell className="w-5 h-5 text-yellow-500" />
                Notifications
              </h2>
            </div>
            <div className="divide-y divide-gray-50">
              {NOTIFICATIONS.map((notif) => (
                <div key={notif.id} className="p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start gap-3">
                    <div className={`w-2 h-2 rounded-full mt-2 ${
                      notif.type === 'info' ? 'bg-blue-500' :
                      notif.type === 'warning' ? 'bg-yellow-500' :
                      'bg-green-500'
                    }`} />
                    <div className="flex-1">
                      <p className="text-sm text-gray-800">{notif.message}</p>
                      <p className="text-xs text-gray-500 mt-1">{notif.time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Événements à venir */}
          <Card>
            <div className="p-4 border-b border-gray-100">
              <h2 className="font-heading font-bold text-gray-800 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-purple-500" />
                Événements à venir
              </h2>
            </div>
            <div className="divide-y divide-gray-50">
              {EVENEMENTS_PROCHAINS.map((event) => (
                <div key={event.id} className="p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex flex-col items-center justify-center">
                      <span className="text-xs text-purple-600 font-medium">
                        {new Date(event.date).toLocaleDateString('fr-FR', { day: 'numeric' })}
                      </span>
                      <span className="text-xs text-purple-400">
                        {new Date(event.date).toLocaleDateString('fr-FR', { month: 'short' })}
                      </span>
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-800 text-sm">{event.titre}</p>
                      <p className="text-xs text-gray-500">
                        <Clock className="w-3 h-3 inline mr-1" />
                        {event.heure} • {event.type}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      {/* Indicateurs des 4 valeurs */}
      <Card>
        <div className="p-4 border-b border-gray-100">
          <h2 className="font-heading font-bold text-gray-800 flex items-center gap-2">
            <Award className="w-5 h-5 text-yellow-500" />
            Indicateurs des 4 valeurs essentielles
          </h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {INDICATEURS_VALEURS.map((indicateur, index) => {
              const valeurInfo = VALEURS[indicateur.valeur.toLowerCase()]
              return (
                <div key={index} className="text-center">
                  <div className="relative w-24 h-24 mx-auto mb-4">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle
                        cx="48"
                        cy="48"
                        r="40"
                        stroke="#e5e7eb"
                        strokeWidth="8"
                        fill="none"
                      />
                      <circle
                        cx="48"
                        cy="48"
                        r="40"
                        stroke={valeurInfo?.couleur || '#4A9FD8'}
                        strokeWidth="8"
                        fill="none"
                        strokeLinecap="round"
                        strokeDasharray={`${indicateur.score * 2.51} 251`}
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-2xl">{valeurInfo?.icone}</span>
                    </div>
                  </div>
                  <h3 className="font-heading font-bold text-gray-800">{indicateur.valeur}</h3>
                  <p className="text-2xl font-bold" style={{ color: valeurInfo?.couleur }}>
                    {indicateur.score}%
                  </p>
                  <p className="text-xs text-gray-500 mt-1">{indicateur.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </Card>

      {/* Statistiques supplémentaires */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-heading font-bold text-gray-800">Personnel</h3>
            <Users className="w-5 h-5 text-gray-400" />
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Enseignants</span>
              <span className="font-bold text-gray-800">{STATS.enseignants}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Personnel administratif</span>
              <span className="font-bold text-gray-800">3</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Personnel de service</span>
              <span className="font-bold text-gray-800">4</span>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-heading font-bold text-gray-800">Taux de réussite</h3>
            <Target className="w-5 h-5 text-gray-400" />
          </div>
          <div className="text-center py-4">
            <div className="text-4xl font-bold text-green-600">{STATS.tauxReussite}%</div>
            <p className="text-gray-500 mt-2">CFEE 2024</p>
            <div className="flex items-center justify-center gap-1 mt-2 text-green-600">
              <TrendingUp className="w-4 h-4" />
              <span className="text-sm">+3% vs 2023</span>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-heading font-bold text-gray-800">Répartition par niveau</h3>
            <PieChart className="w-5 h-5 text-gray-400" />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-gsnsd-magenta" />
                <span className="text-gray-600">Préscolaire</span>
              </div>
              <span className="font-bold text-gray-800">{STATS.prescolaire}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-gsnsd-blue" />
                <span className="text-gray-600">Élémentaire</span>
              </div>
              <span className="font-bold text-gray-800">{STATS.elementaire}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div 
                className="bg-gsnsd-magenta rounded-l-full h-2"
                style={{ width: `${(STATS.prescolaire / STATS.effectifTotal) * 100}%` }}
              />
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
