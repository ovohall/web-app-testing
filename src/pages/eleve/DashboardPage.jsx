import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Calendar,
  Clock,
  BookOpen,
  Award,
  TrendingUp,
  CheckCircle,
  AlertCircle,
  FileText,
  Bell,
  ChevronRight,
  Star,
  Target,
  Trophy
} from 'lucide-react'
import { Card, Badge, Button, StatCard } from '../../components/common'
import { useAuth } from '../../context/AuthContext'
import { VALEURS, MATIERES } from '../../utils/constants'

// Données de démonstration
const EMPLOI_DU_TEMPS_AUJOURDHUI = [
  { heure: '08:00 - 09:00', matiere: 'Français', salle: 'Salle A1', enseignant: 'Mme Diallo' },
  { heure: '09:00 - 10:00', matiere: 'Mathématiques', salle: 'Salle A1', enseignant: 'M. Ndiaye' },
  { heure: '10:30 - 11:30', matiere: 'Histoire-Géo', salle: 'Salle A1', enseignant: 'M. Faye' },
  { heure: '11:30 - 12:30', matiere: 'Sciences', salle: 'Labo', enseignant: 'Mme Sow' },
  { heure: '15:00 - 16:00', matiere: 'Anglais', salle: 'Salle A1', enseignant: 'Mme Fall' },
  { heure: '16:00 - 17:00', matiere: 'EPS', salle: 'Terrain', enseignant: 'M. Sarr' }
]

const DEVOIRS_A_FAIRE = [
  { id: 1, matiere: 'Mathématiques', titre: 'Exercices page 45', echeance: '2024-12-28', priorite: 'haute' },
  { id: 2, matiere: 'Français', titre: 'Rédaction sur les vacances', echeance: '2024-12-30', priorite: 'moyenne' },
  { id: 3, matiere: 'Sciences', titre: 'Exposé sur les plantes', echeance: '2025-01-05', priorite: 'normale' }
]

const NOTES_RECENTES = [
  { matiere: 'Mathématiques', note: 16, max: 20, date: '2024-12-20', type: 'Devoir' },
  { matiere: 'Français', note: 14, max: 20, date: '2024-12-18', type: 'Dictée' },
  { matiere: 'Histoire-Géo', note: 17, max: 20, date: '2024-12-15', type: 'Interrogation' },
  { matiere: 'Sciences', note: 15, max: 20, date: '2024-12-12', type: 'TP' }
]

const MESSAGES = [
  { id: 1, expediteur: 'Mme Diallo', sujet: 'Rappel pour la sortie scolaire', date: '2024-12-26', lu: false },
  { id: 2, expediteur: 'Direction', sujet: 'Réunion parents-enseignants', date: '2024-12-24', lu: true }
]

const BADGES = [
  { nom: 'Ponctualité', icone: '⏰', description: 'Toujours à l\'heure', obtenu: true },
  { nom: 'Participation', icone: '🙋', description: 'Participe activement', obtenu: true },
  { nom: 'Excellent travail', icone: '⭐', description: 'Notes supérieures à 15', obtenu: false },
  { nom: 'Persévérance', icone: '💪', description: 'Efforts constants', obtenu: true }
]

function getPrioriteColor(priorite) {
  switch (priorite) {
    case 'haute':
      return 'danger'
    case 'moyenne':
      return 'warning'
    default:
      return 'default'
  }
}

function formatDate(dateStr) {
  const date = new Date(dateStr)
  const options = { weekday: 'long', day: 'numeric', month: 'long' }
  return date.toLocaleDateString('fr-FR', options)
}

function getDaysRemaining(dateStr) {
  const today = new Date()
  const dueDate = new Date(dateStr)
  const diffTime = dueDate - today
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  return diffDays
}

export default function EleveDashboardPage() {
  const { user } = useAuth()
  const [currentTime] = useState(new Date())

  const moyenneGenerale = NOTES_RECENTES.reduce((acc, n) => acc + (n.note / n.max * 20), 0) / NOTES_RECENTES.length

  return (
    <div className="space-y-6">
      {/* Message de bienvenue */}
      <div className="bg-gradient-to-r from-gsnsd-blue to-gsnsd-blue-dark rounded-2xl p-6 text-white">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-heading font-bold mb-2">
              Bonjour, {user?.prenom || 'Élève'} ! 👋
            </h1>
            <p className="text-blue-100">
              {formatDate(currentTime)} • Bonne journée d'apprentissage !
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-center">
              <div className="text-3xl font-bold">{moyenneGenerale.toFixed(1)}</div>
              <div className="text-xs text-blue-100">Moyenne générale</div>
            </div>
            <div className="w-px h-12 bg-white/20" />
            <div className="text-center">
              <div className="text-3xl font-bold">{DEVOIRS_A_FAIRE.length}</div>
              <div className="text-xs text-blue-100">Devoirs à faire</div>
            </div>
          </div>
        </div>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard
          title="Présence"
          value="95%"
          subtitle="Ce trimestre"
          icon={<CheckCircle className="w-6 h-6" />}
          trend={{ value: 2, isPositive: true }}
        />
        <StatCard
          title="Notes"
          value="15.5"
          subtitle="Moyenne"
          icon={<Star className="w-6 h-6" />}
          trend={{ value: 0.5, isPositive: true }}
        />
        <StatCard
          title="Devoirs"
          value={`${DEVOIRS_A_FAIRE.length}`}
          subtitle="À rendre"
          icon={<FileText className="w-6 h-6" />}
        />
        <StatCard
          title="Badges"
          value={BADGES.filter(b => b.obtenu).length}
          subtitle="Obtenus"
          icon={<Trophy className="w-6 h-6" />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Emploi du temps du jour */}
        <div className="lg:col-span-2">
          <Card>
            <div className="p-4 border-b border-gray-100 flex items-center justify-between">
              <h2 className="font-heading font-bold text-gray-800 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-gsnsd-blue" />
                Emploi du temps d'aujourd'hui
              </h2>
              <Link to="/eleve/emploi-du-temps">
                <Button variant="ghost" size="sm">
                  Voir tout <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
            </div>
            <div className="divide-y divide-gray-50">
              {EMPLOI_DU_TEMPS_AUJOURDHUI.map((cours, index) => (
                <div 
                  key={index} 
                  className="p-4 hover:bg-gray-50 transition-colors flex items-center gap-4"
                >
                  <div className="w-24 text-sm font-mono text-gray-500">
                    {cours.heure.split(' - ')[0]}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-800">{cours.matiere}</p>
                    <p className="text-sm text-gray-500">{cours.enseignant} • {cours.salle}</p>
                  </div>
                  <Badge variant="default" size="sm">
                    <Clock className="w-3 h-3 mr-1" />
                    1h
                  </Badge>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Devoirs à faire */}
        <div>
          <Card>
            <div className="p-4 border-b border-gray-100 flex items-center justify-between">
              <h2 className="font-heading font-bold text-gray-800 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-gsnsd-magenta" />
                Devoirs à faire
              </h2>
              <Link to="/eleve/devoirs">
                <Button variant="ghost" size="sm">
                  Voir tout <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
            </div>
            <div className="divide-y divide-gray-50">
              {DEVOIRS_A_FAIRE.map((devoir) => {
                const jours = getDaysRemaining(devoir.echeance)
                return (
                  <div key={devoir.id} className="p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start justify-between mb-2">
                      <Badge variant={getPrioriteColor(devoir.priorite)} size="sm">
                        {devoir.matiere}
                      </Badge>
                      <span className={`text-xs font-medium ${jours <= 2 ? 'text-red-500' : 'text-gray-500'}`}>
                        {jours <= 0 ? 'Aujourd\'hui' : `Dans ${jours} jour${jours > 1 ? 's' : ''}`}
                      </span>
                    </div>
                    <p className="text-sm text-gray-800">{devoir.titre}</p>
                  </div>
                )
              })}
            </div>
          </Card>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Notes récentes */}
        <Card>
          <div className="p-4 border-b border-gray-100 flex items-center justify-between">
            <h2 className="font-heading font-bold text-gray-800 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-green-500" />
              Notes récentes
            </h2>
            <Link to="/eleve/notes">
              <Button variant="ghost" size="sm">
                Voir tout <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </div>
          <div className="divide-y divide-gray-50">
            {NOTES_RECENTES.map((note, index) => (
              <div key={index} className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                <div>
                  <p className="font-medium text-gray-800">{note.matiere}</p>
                  <p className="text-sm text-gray-500">{note.type} • {new Date(note.date).toLocaleDateString('fr-FR')}</p>
                </div>
                <div className={`text-lg font-bold ${note.note >= 15 ? 'text-green-600' : note.note >= 10 ? 'text-yellow-600' : 'text-red-600'}`}>
                  {note.note}/{note.max}
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Messages et notifications */}
        <Card>
          <div className="p-4 border-b border-gray-100 flex items-center justify-between">
            <h2 className="font-heading font-bold text-gray-800 flex items-center gap-2">
              <Bell className="w-5 h-5 text-yellow-500" />
              Messages
              {MESSAGES.filter(m => !m.lu).length > 0 && (
                <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                  {MESSAGES.filter(m => !m.lu).length}
                </span>
              )}
            </h2>
          </div>
          <div className="divide-y divide-gray-50">
            {MESSAGES.map((msg) => (
              <div 
                key={msg.id} 
                className={`p-4 hover:bg-gray-50 transition-colors ${!msg.lu ? 'bg-blue-50/50' : ''}`}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-2 h-2 rounded-full mt-2 ${!msg.lu ? 'bg-gsnsd-blue' : 'bg-gray-300'}`} />
                  <div className="flex-1">
                    <p className="font-medium text-gray-800">{msg.sujet}</p>
                    <p className="text-sm text-gray-500">
                      De {msg.expediteur} • {new Date(msg.date).toLocaleDateString('fr-FR')}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Espace Fierté - Badges */}
      <Card>
        <div className="p-4 border-b border-gray-100">
          <h2 className="font-heading font-bold text-gray-800 flex items-center gap-2">
            <Award className="w-5 h-5 text-yellow-500" />
            Espace Fierté - Mes badges
          </h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {BADGES.map((badge, index) => (
              <div 
                key={index}
                className={`p-4 rounded-xl text-center transition-all ${
                  badge.obtenu 
                    ? 'bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-yellow-200' 
                    : 'bg-gray-50 opacity-50'
                }`}
              >
                <div className="text-4xl mb-2">{badge.icone}</div>
                <p className="font-semibold text-gray-800">{badge.nom}</p>
                <p className="text-xs text-gray-500">{badge.description}</p>
                {badge.obtenu && (
                  <Badge variant="success" size="sm" className="mt-2">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Obtenu
                  </Badge>
                )}
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Suivi Persévérance */}
      <Card>
        <div className="p-4 border-b border-gray-100">
          <h2 className="font-heading font-bold text-gray-800 flex items-center gap-2">
            <Target className="w-5 h-5 text-gsnsd-magenta" />
            Suivi de la Persévérance
          </h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="relative w-32 h-32 mx-auto">
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    stroke="#e5e7eb"
                    strokeWidth="12"
                    fill="none"
                  />
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    stroke="#4A9FD8"
                    strokeWidth="12"
                    fill="none"
                    strokeLinecap="round"
                    strokeDasharray={`${95 * 3.52} 352`}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl font-bold text-gray-800">95%</span>
                </div>
              </div>
              <p className="mt-4 font-medium text-gray-800">Assiduité</p>
              <p className="text-sm text-gray-500">Présence aux cours</p>
            </div>

            <div className="text-center">
              <div className="relative w-32 h-32 mx-auto">
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    stroke="#e5e7eb"
                    strokeWidth="12"
                    fill="none"
                  />
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    stroke="#B64881"
                    strokeWidth="12"
                    fill="none"
                    strokeLinecap="round"
                    strokeDasharray={`${85 * 3.52} 352`}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl font-bold text-gray-800">85%</span>
                </div>
              </div>
              <p className="mt-4 font-medium text-gray-800">Devoirs rendus</p>
              <p className="text-sm text-gray-500">À temps</p>
            </div>

            <div className="text-center">
              <div className="relative w-32 h-32 mx-auto">
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    stroke="#e5e7eb"
                    strokeWidth="12"
                    fill="none"
                  />
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    stroke="#10B981"
                    strokeWidth="12"
                    fill="none"
                    strokeLinecap="round"
                    strokeDasharray={`${100 * 3.52} 352`}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl font-bold text-gray-800">100%</span>
                </div>
              </div>
              <p className="mt-4 font-medium text-gray-800">Ponctualité</p>
              <p className="text-sm text-gray-500">Ce mois-ci</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
