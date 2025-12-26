import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Users,
  Calendar,
  ClipboardCheck,
  FileText,
  BookOpen,
  Bell,
  ChevronRight,
  CheckCircle,
  AlertCircle,
  Clock,
  TrendingUp,
  MessageSquare,
  UserCheck,
  UserX,
  Timer
} from 'lucide-react'
import { Card, Badge, Button, StatCard } from '../../components/common'
import { useAuth } from '../../context/AuthContext'
import { VALEURS } from '../../utils/constants'

// Données de démonstration
const MES_CLASSES = [
  { id: 1, nom: 'CM2 A', effectif: 28, presentsAujourdhui: 26, matiere: 'Français, Mathématiques' },
  { id: 2, nom: 'CM1 B', effectif: 25, presentsAujourdhui: 24, matiere: 'Français' },
  { id: 3, nom: 'CE2 A', effectif: 30, presentsAujourdhui: 28, matiere: 'Mathématiques' }
]

const EMPLOI_DU_TEMPS_AUJOURDHUI = [
  { heure: '08:00 - 10:00', classe: 'CM2 A', matiere: 'Français', salle: 'Salle A1', statut: 'termine' },
  { heure: '10:30 - 12:30', classe: 'CM1 B', matiere: 'Français', salle: 'Salle B2', statut: 'en_cours' },
  { heure: '15:00 - 17:00', classe: 'CE2 A', matiere: 'Mathématiques', salle: 'Salle A3', statut: 'a_venir' }
]

const DEVOIRS_EN_ATTENTE = [
  { id: 1, classe: 'CM2 A', titre: 'Rédaction', dateRendu: '2024-12-28', soumis: 22, total: 28 },
  { id: 2, classe: 'CM1 B', titre: 'Exercices calcul', dateRendu: '2024-12-27', soumis: 20, total: 25 },
  { id: 3, classe: 'CE2 A', titre: 'Problèmes', dateRendu: '2024-12-30', soumis: 15, total: 30 }
]

const OBSERVATIONS_RECENTES = [
  { id: 1, eleve: 'Mamadou Diallo', classe: 'CM2 A', type: 'positif', observation: 'Excellente participation en classe', date: '2024-12-26' },
  { id: 2, eleve: 'Fatou Ndiaye', classe: 'CM1 B', type: 'attention', observation: 'Difficultés en orthographe', date: '2024-12-25' },
  { id: 3, eleve: 'Ibrahima Sow', classe: 'CE2 A', type: 'positif', observation: 'Progrès remarquables en calcul', date: '2024-12-24' }
]

const MESSAGES = [
  { id: 1, expediteur: 'M. Diop (Parent)', sujet: 'Demande de rendez-vous', date: '2024-12-26', lu: false },
  { id: 2, expediteur: 'Direction', sujet: 'Conseil de classe CM2', date: '2024-12-25', lu: true },
  { id: 3, expediteur: 'Mme Faye (Parent)', sujet: 'Absence de son enfant', date: '2024-12-24', lu: true }
]

function formatDate(dateStr) {
  const date = new Date(dateStr)
  const options = { weekday: 'long', day: 'numeric', month: 'long' }
  return date.toLocaleDateString('fr-FR', options)
}

function getStatutColor(statut) {
  switch (statut) {
    case 'termine':
      return 'bg-gray-100 text-gray-600'
    case 'en_cours':
      return 'bg-green-100 text-green-700'
    case 'a_venir':
      return 'bg-blue-100 text-blue-700'
    default:
      return 'bg-gray-100 text-gray-600'
  }
}

function getStatutLabel(statut) {
  switch (statut) {
    case 'termine':
      return 'Terminé'
    case 'en_cours':
      return 'En cours'
    case 'a_venir':
      return 'À venir'
    default:
      return statut
  }
}

export default function EnseignantDashboardPage() {
  const { user } = useAuth()
  const [currentTime] = useState(new Date())

  const totalEleves = MES_CLASSES.reduce((acc, c) => acc + c.effectif, 0)
  const totalPresents = MES_CLASSES.reduce((acc, c) => acc + c.presentsAujourdhui, 0)
  const tauxPresence = ((totalPresents / totalEleves) * 100).toFixed(1)

  return (
    <div className="space-y-6">
      {/* Message de bienvenue */}
      <div className="bg-gradient-to-r from-gsnsd-magenta to-gsnsd-magenta-dark rounded-2xl p-6 text-white">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-heading font-bold mb-2">
              Bonjour, {user?.prenom || 'Enseignant'} ! 👨‍🏫
            </h1>
            <p className="text-pink-100">
              {formatDate(currentTime)} • Bonne journée d'enseignement !
            </p>
          </div>
          <div className="flex items-center gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold">{MES_CLASSES.length}</div>
              <div className="text-xs text-pink-100">Classes</div>
            </div>
            <div className="w-px h-12 bg-white/20" />
            <div className="text-center">
              <div className="text-3xl font-bold">{totalEleves}</div>
              <div className="text-xs text-pink-100">Élèves</div>
            </div>
            <div className="w-px h-12 bg-white/20" />
            <div className="text-center">
              <div className="text-3xl font-bold">{tauxPresence}%</div>
              <div className="text-xs text-pink-100">Présence</div>
            </div>
          </div>
        </div>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard
          title="Élèves présents"
          value={`${totalPresents}/${totalEleves}`}
          subtitle="Aujourd'hui"
          icon={<UserCheck className="w-6 h-6" />}
          trend={{ value: 2, isPositive: true }}
        />
        <StatCard
          title="Cours du jour"
          value={EMPLOI_DU_TEMPS_AUJOURDHUI.length}
          subtitle="Séances"
          icon={<Clock className="w-6 h-6" />}
        />
        <StatCard
          title="Devoirs à corriger"
          value={DEVOIRS_EN_ATTENTE.reduce((acc, d) => acc + d.soumis, 0)}
          subtitle="Copies"
          icon={<FileText className="w-6 h-6" />}
        />
        <StatCard
          title="Messages"
          value={MESSAGES.filter(m => !m.lu).length}
          subtitle="Non lus"
          icon={<MessageSquare className="w-6 h-6" />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Emploi du temps du jour */}
        <div className="lg:col-span-2">
          <Card>
            <div className="p-4 border-b border-gray-100 flex items-center justify-between">
              <h2 className="font-heading font-bold text-gray-800 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-gsnsd-blue" />
                Mes cours aujourd'hui
              </h2>
              <Link to="/enseignant/emploi-du-temps">
                <Button variant="ghost" size="sm">
                  Voir tout <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
            </div>
            <div className="divide-y divide-gray-50">
              {EMPLOI_DU_TEMPS_AUJOURDHUI.map((cours, index) => (
                <div 
                  key={index} 
                  className={`p-4 flex items-center gap-4 ${cours.statut === 'en_cours' ? 'bg-green-50' : 'hover:bg-gray-50'} transition-colors`}
                >
                  <div className="w-28 text-sm font-mono text-gray-500">
                    {cours.heure}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-gray-800">{cours.classe}</p>
                      <span className="text-gray-400">•</span>
                      <p className="text-gray-600">{cours.matiere}</p>
                    </div>
                    <p className="text-sm text-gray-500">{cours.salle}</p>
                  </div>
                  <Badge 
                    variant={cours.statut === 'en_cours' ? 'success' : 'default'} 
                    size="sm"
                    className={getStatutColor(cours.statut)}
                  >
                    {getStatutLabel(cours.statut)}
                  </Badge>
                  {cours.statut === 'en_cours' && (
                    <Link to="/enseignant/presences">
                      <Button variant="primary" size="sm">
                        <ClipboardCheck className="w-4 h-4 mr-1" />
                        Appel
                      </Button>
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </Card>

          {/* Mes classes */}
          <Card className="mt-6">
            <div className="p-4 border-b border-gray-100 flex items-center justify-between">
              <h2 className="font-heading font-bold text-gray-800 flex items-center gap-2">
                <Users className="w-5 h-5 text-gsnsd-magenta" />
                Mes classes
              </h2>
              <Link to="/enseignant/classes">
                <Button variant="ghost" size="sm">
                  Voir tout <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
            </div>
            <div className="divide-y divide-gray-50">
              {MES_CLASSES.map((classe) => (
                <div key={classe.id} className="p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-800">{classe.nom}</p>
                      <p className="text-sm text-gray-500">{classe.matiere}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="flex items-center gap-2">
                          <UserCheck className="w-4 h-4 text-green-500" />
                          <span className="font-medium text-gray-800">{classe.presentsAujourdhui}</span>
                          <span className="text-gray-400">/</span>
                          <span className="text-gray-500">{classe.effectif}</span>
                        </div>
                        <p className="text-xs text-gray-500">Présents aujourd'hui</p>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Colonne droite */}
        <div className="space-y-6">
          {/* Actions rapides */}
          <Card className="p-4">
            <h3 className="font-heading font-bold text-gray-800 mb-4">Actions rapides</h3>
            <div className="grid grid-cols-2 gap-3">
              <Link to="/enseignant/presences">
                <Button variant="outline" className="w-full justify-start">
                  <ClipboardCheck className="w-4 h-4 mr-2" />
                  Faire l'appel
                </Button>
              </Link>
              <Link to="/enseignant/notes">
                <Button variant="outline" className="w-full justify-start">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Saisir notes
                </Button>
              </Link>
              <Link to="/enseignant/devoirs">
                <Button variant="outline" className="w-full justify-start">
                  <BookOpen className="w-4 h-4 mr-2" />
                  Créer devoir
                </Button>
              </Link>
              <Link to="/enseignant/observations">
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="w-4 h-4 mr-2" />
                  Observation
                </Button>
              </Link>
            </div>
          </Card>

          {/* Devoirs en attente */}
          <Card>
            <div className="p-4 border-b border-gray-100">
              <h2 className="font-heading font-bold text-gray-800 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-yellow-500" />
                Devoirs à corriger
              </h2>
            </div>
            <div className="divide-y divide-gray-50">
              {DEVOIRS_EN_ATTENTE.map((devoir) => (
                <div key={devoir.id} className="p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="default" size="sm">{devoir.classe}</Badge>
                    <span className="text-xs text-gray-500">
                      Rendu le {new Date(devoir.dateRendu).toLocaleDateString('fr-FR')}
                    </span>
                  </div>
                  <p className="text-sm font-medium text-gray-800 mb-2">{devoir.titre}</p>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-gsnsd-blue rounded-full h-2"
                        style={{ width: `${(devoir.soumis / devoir.total) * 100}%` }}
                      />
                    </div>
                    <span className="text-xs text-gray-500">{devoir.soumis}/{devoir.total}</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Messages */}
          <Card>
            <div className="p-4 border-b border-gray-100 flex items-center justify-between">
              <h2 className="font-heading font-bold text-gray-800 flex items-center gap-2">
                <Bell className="w-5 h-5 text-blue-500" />
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
                      <p className="font-medium text-gray-800 text-sm">{msg.sujet}</p>
                      <p className="text-xs text-gray-500">
                        {msg.expediteur} • {new Date(msg.date).toLocaleDateString('fr-FR')}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      {/* Observations récentes */}
      <Card>
        <div className="p-4 border-b border-gray-100 flex items-center justify-between">
          <h2 className="font-heading font-bold text-gray-800 flex items-center gap-2">
            <FileText className="w-5 h-5 text-purple-500" />
            Observations récentes
          </h2>
          <Link to="/enseignant/observations">
            <Button variant="ghost" size="sm">
              Voir tout <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </Link>
        </div>
        <div className="divide-y divide-gray-50">
          {OBSERVATIONS_RECENTES.map((obs) => (
            <div key={obs.id} className="p-4 hover:bg-gray-50 transition-colors flex items-start gap-4">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                obs.type === 'positif' ? 'bg-green-100' : 'bg-yellow-100'
              }`}>
                {obs.type === 'positif' ? (
                  <CheckCircle className="w-5 h-5 text-green-600" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-yellow-600" />
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <p className="font-medium text-gray-800">{obs.eleve}</p>
                  <Badge variant="default" size="sm">{obs.classe}</Badge>
                </div>
                <p className="text-sm text-gray-600">{obs.observation}</p>
                <p className="text-xs text-gray-400 mt-1">
                  {new Date(obs.date).toLocaleDateString('fr-FR')}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
