import { useState } from 'react'
import { Link } from 'react-router-dom'
import { 
  Calendar, 
  Clock, 
  ArrowRight, 
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
  Users,
  MapPin,
  Star,
  Bell,
  Newspaper,
  PartyPopper,
  GraduationCap,
  Heart
} from 'lucide-react'
import { Card, Badge, Button, Input } from '../../components/common'
import { SCHOOL_INFO } from '../../utils/constants'

// Données de démonstration pour les actualités
const ACTUALITES = [
  {
    id: 1,
    titre: "Rentrée scolaire 2024-2025 : Une nouvelle année pleine de promesses",
    extrait: "Le Groupe Scolaire Ndella Sémou DIOUF a accueilli ses élèves pour la rentrée 2024-2025. Une cérémonie officielle a marqué le début de cette nouvelle année académique.",
    contenu: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
    image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800",
    date: "2024-10-01",
    categorie: "Rentrée",
    auteur: "Direction GSNSD",
    important: true
  },
  {
    id: 2,
    titre: "Excellents résultats au CFEE : 98% de réussite",
    extrait: "Nos élèves de CM2 ont brillamment réussi leur examen du Certificat de Fin d'Études Élémentaires avec un taux de réussite exceptionnel.",
    contenu: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
    image: "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?w=800",
    date: "2024-08-15",
    categorie: "Résultats",
    auteur: "Direction GSNSD",
    important: true
  },
  {
    id: 3,
    titre: "Journée culturelle : Célébration de notre patrimoine",
    extrait: "Une journée riche en couleurs et traditions pour sensibiliser nos élèves à la richesse de notre culture sénégalaise.",
    contenu: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
    image: "https://images.unsplash.com/photo-1544928147-79a2dbc1f389?w=800",
    date: "2024-04-15",
    categorie: "Culture",
    auteur: "Équipe pédagogique"
  },
  {
    id: 4,
    titre: "Compétition sportive inter-écoles",
    extrait: "Nos élèves ont participé à la compétition sportive régionale et ont remporté plusieurs médailles.",
    contenu: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
    image: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=800",
    date: "2024-03-20",
    categorie: "Sport",
    auteur: "Professeur d'EPS"
  },
  {
    id: 5,
    titre: "Réunion parents-enseignants du 2ème trimestre",
    extrait: "Une rencontre importante pour faire le point sur les progrès de vos enfants et échanger avec les enseignants.",
    contenu: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
    image: "https://images.unsplash.com/photo-1577896851231-70ef18881754?w=800",
    date: "2024-02-10",
    categorie: "Réunion",
    auteur: "Direction GSNSD"
  },
  {
    id: 6,
    titre: "Atelier de lecture pour les maternelles",
    extrait: "Un atelier ludique pour initier nos plus jeunes élèves au plaisir de la lecture.",
    contenu: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800",
    date: "2024-01-25",
    categorie: "Pédagogie",
    auteur: "Enseignants préscolaire"
  }
]

// Données pour les événements à venir
const EVENEMENTS = [
  {
    id: 1,
    titre: "Journée portes ouvertes",
    date: "2025-01-15",
    heure: "09:00 - 16:00",
    lieu: "Campus GSNSD",
    type: "Portes ouvertes",
    description: "Venez découvrir notre école et rencontrer notre équipe pédagogique."
  },
  {
    id: 2,
    titre: "Réunion parents-enseignants",
    date: "2025-01-25",
    heure: "14:00 - 17:00",
    lieu: "Salles de classe",
    type: "Réunion",
    description: "Remise des bulletins du 1er trimestre et échanges avec les enseignants."
  },
  {
    id: 3,
    titre: "Fête de fin d'année",
    date: "2025-06-28",
    heure: "10:00 - 18:00",
    lieu: "Cour de l'école",
    type: "Fête",
    description: "Spectacles, jeux et célébration de la fin d'année scolaire."
  },
  {
    id: 4,
    titre: "Concours de récitation",
    date: "2025-02-14",
    heure: "10:00 - 12:00",
    lieu: "Salle polyvalente",
    type: "Concours",
    description: "Les élèves présenteront leurs récitations devant un jury."
  }
]

const CATEGORIES = [
  { value: 'all', label: 'Toutes les catégories' },
  { value: 'Rentrée', label: 'Rentrée' },
  { value: 'Résultats', label: 'Résultats' },
  { value: 'Culture', label: 'Culture' },
  { value: 'Sport', label: 'Sport' },
  { value: 'Réunion', label: 'Réunion' },
  { value: 'Pédagogie', label: 'Pédagogie' }
]

function formatDate(dateString) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' }
  return new Date(dateString).toLocaleDateString('fr-FR', options)
}

function formatShortDate(dateString) {
  const date = new Date(dateString)
  const day = date.getDate()
  const month = date.toLocaleDateString('fr-FR', { month: 'short' }).toUpperCase()
  return { day, month }
}

function getCategoryIcon(categorie) {
  switch (categorie) {
    case 'Rentrée':
      return <GraduationCap className="w-4 h-4" />
    case 'Résultats':
      return <Star className="w-4 h-4" />
    case 'Culture':
      return <Heart className="w-4 h-4" />
    case 'Sport':
      return <Users className="w-4 h-4" />
    case 'Réunion':
      return <Users className="w-4 h-4" />
    case 'Pédagogie':
      return <GraduationCap className="w-4 h-4" />
    default:
      return <Newspaper className="w-4 h-4" />
  }
}

function getCategoryColor(categorie) {
  switch (categorie) {
    case 'Rentrée':
      return 'primary'
    case 'Résultats':
      return 'success'
    case 'Culture':
      return 'secondary'
    case 'Sport':
      return 'warning'
    case 'Réunion':
      return 'info'
    case 'Pédagogie':
      return 'primary'
    default:
      return 'default'
  }
}

export default function NewsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 4

  // Filtrer les actualités
  const filteredActualites = ACTUALITES.filter(actu => {
    const matchSearch = actu.titre.toLowerCase().includes(searchQuery.toLowerCase()) ||
                       actu.extrait.toLowerCase().includes(searchQuery.toLowerCase())
    const matchCategory = selectedCategory === 'all' || actu.categorie === selectedCategory
    return matchSearch && matchCategory
  })

  // Pagination
  const totalPages = Math.ceil(filteredActualites.length / itemsPerPage)
  const paginatedActualites = filteredActualites.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  // Actualité à la une
  const actualiteVedette = ACTUALITES.find(a => a.important)

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gsnsd-blue to-gsnsd-blue-dark text-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full mb-6">
              <Newspaper className="w-5 h-5" />
              <span className="text-sm font-medium">Actualités & Événements</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6">
              Restez informés de la vie de l'école
            </h1>
            <p className="text-xl text-blue-100 mb-8">
              Découvrez les dernières nouvelles, événements et activités du {SCHOOL_INFO.abbreviation}
            </p>
            
            {/* Barre de recherche */}
            <div className="max-w-xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Rechercher une actualité..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-xl text-gray-800 focus:outline-none focus:ring-4 focus:ring-white/30"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Colonne principale - Actualités */}
          <div className="lg:col-span-2">
            {/* Filtres */}
            <div className="flex flex-wrap items-center gap-4 mb-8">
              <div className="flex items-center gap-2 text-gray-600">
                <Filter className="w-5 h-5" />
                <span className="font-medium">Filtrer par :</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.value}
                    onClick={() => {
                      setSelectedCategory(cat.value)
                      setCurrentPage(1)
                    }}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      selectedCategory === cat.value
                        ? 'bg-gsnsd-blue text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Actualité à la une */}
            {actualiteVedette && selectedCategory === 'all' && currentPage === 1 && (
              <div className="mb-8">
                <h2 className="text-2xl font-heading font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <Star className="w-6 h-6 text-yellow-500" />
                  À la une
                </h2>
                <Card className="overflow-hidden group cursor-pointer hover:shadow-xl transition-all">
                  <div className="grid grid-cols-1 md:grid-cols-2">
                    <div className="relative h-64 md:h-auto">
                      <img
                        src={actualiteVedette.image}
                        alt={actualiteVedette.titre}
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-4 left-4">
                        <Badge variant="secondary" size="lg">
                          {getCategoryIcon(actualiteVedette.categorie)}
                          {actualiteVedette.categorie}
                        </Badge>
                      </div>
                    </div>
                    <div className="p-6 flex flex-col justify-center">
                      <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {formatDate(actualiteVedette.date)}
                        </span>
                        <span>{actualiteVedette.auteur}</span>
                      </div>
                      <h3 className="text-2xl font-heading font-bold text-gray-800 mb-3 group-hover:text-gsnsd-blue transition-colors">
                        {actualiteVedette.titre}
                      </h3>
                      <p className="text-gray-600 mb-4 line-clamp-3">
                        {actualiteVedette.extrait}
                      </p>
                      <Button variant="outline" className="self-start group/btn">
                        Lire la suite
                        <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                      </Button>
                    </div>
                  </div>
                </Card>
              </div>
            )}

            {/* Liste des actualités */}
            <div>
              <h2 className="text-2xl font-heading font-bold text-gray-800 mb-6">
                {selectedCategory === 'all' ? 'Toutes les actualités' : `Actualités - ${selectedCategory}`}
                <span className="text-sm font-normal text-gray-500 ml-2">
                  ({filteredActualites.length} résultat{filteredActualites.length > 1 ? 's' : ''})
                </span>
              </h2>

              {paginatedActualites.length > 0 ? (
                <div className="space-y-6">
                  {paginatedActualites.map((actu) => (
                    <Card key={actu.id} className="overflow-hidden group cursor-pointer hover:shadow-lg transition-all">
                      <div className="flex flex-col sm:flex-row">
                        <div className="relative w-full sm:w-48 h-48 sm:h-auto flex-shrink-0">
                          <img
                            src={actu.image}
                            alt={actu.titre}
                            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <div className="p-5 flex-1">
                          <div className="flex flex-wrap items-center gap-3 mb-2">
                            <Badge variant={getCategoryColor(actu.categorie)} size="sm">
                              {getCategoryIcon(actu.categorie)}
                              {actu.categorie}
                            </Badge>
                            <span className="text-sm text-gray-500 flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {formatDate(actu.date)}
                            </span>
                          </div>
                          <h3 className="text-lg font-heading font-bold text-gray-800 mb-2 group-hover:text-gsnsd-blue transition-colors line-clamp-2">
                            {actu.titre}
                          </h3>
                          <p className="text-gray-600 text-sm line-clamp-2 mb-3">
                            {actu.extrait}
                          </p>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-gray-400">{actu.auteur}</span>
                            <span className="text-gsnsd-blue text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                              Lire plus <ArrowRight className="w-4 h-4" />
                            </span>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card className="p-12 text-center">
                  <Newspaper className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-heading font-bold text-gray-800 mb-2">
                    Aucune actualité trouvée
                  </h3>
                  <p className="text-gray-600">
                    Essayez de modifier vos critères de recherche
                  </p>
                </Card>
              )}

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-8">
                  <button
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`w-10 h-10 rounded-lg font-medium transition-all ${
                        currentPage === page
                          ? 'bg-gsnsd-blue text-white'
                          : 'border border-gray-200 hover:bg-gray-50'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                  <button
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar - Événements à venir */}
          <div className="lg:col-span-1">
            {/* Événements à venir */}
            <Card className="sticky top-24">
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-xl font-heading font-bold text-gray-800 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-gsnsd-magenta" />
                  Événements à venir
                </h2>
              </div>
              <div className="divide-y divide-gray-100">
                {EVENEMENTS.slice(0, 4).map((event) => {
                  const { day, month } = formatShortDate(event.date)
                  return (
                    <div key={event.id} className="p-4 hover:bg-gray-50 transition-colors cursor-pointer">
                      <div className="flex gap-4">
                        <div className="flex-shrink-0 w-14 h-14 bg-gsnsd-blue/10 rounded-lg flex flex-col items-center justify-center">
                          <span className="text-lg font-bold text-gsnsd-blue">{day}</span>
                          <span className="text-xs text-gsnsd-blue uppercase">{month}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-gray-800 text-sm mb-1 line-clamp-1">
                            {event.titre}
                          </h4>
                          <div className="flex items-center gap-2 text-xs text-gray-500">
                            <Clock className="w-3 h-3" />
                            {event.heure}
                          </div>
                          <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                            <MapPin className="w-3 h-3" />
                            {event.lieu}
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
              <div className="p-4 border-t border-gray-100">
                <Button variant="outline" className="w-full">
                  Voir tous les événements
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </Card>

            {/* Newsletter */}
            <Card className="mt-6 bg-gradient-to-br from-gsnsd-magenta to-gsnsd-magenta-dark text-white overflow-hidden">
              <div className="p-6 relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
                <Bell className="w-10 h-10 mb-4" />
                <h3 className="text-xl font-heading font-bold mb-2">
                  Restez informés
                </h3>
                <p className="text-white/80 text-sm mb-4">
                  Recevez les dernières actualités de l'école directement dans votre boîte mail.
                </p>
                <div className="space-y-3">
                  <input
                    type="email"
                    placeholder="Votre adresse email"
                    className="w-full px-4 py-3 rounded-lg text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white/50"
                  />
                  <button className="w-full bg-white text-gsnsd-magenta font-semibold py-3 rounded-lg hover:bg-gray-100 transition-colors">
                    S'inscrire
                  </button>
                </div>
              </div>
            </Card>

            {/* Catégories populaires */}
            <Card className="mt-6">
              <div className="p-6 border-b border-gray-100">
                <h3 className="font-heading font-bold text-gray-800">Catégories</h3>
              </div>
              <div className="p-4">
                <div className="flex flex-wrap gap-2">
                  {CATEGORIES.filter(c => c.value !== 'all').map((cat) => (
                    <button
                      key={cat.value}
                      onClick={() => {
                        setSelectedCategory(cat.value)
                        setCurrentPage(1)
                      }}
                      className={`px-3 py-1.5 rounded-full text-sm transition-all ${
                        selectedCategory === cat.value
                          ? 'bg-gsnsd-blue text-white'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <PartyPopper className="w-16 h-16 text-gsnsd-magenta mx-auto mb-6" />
            <h2 className="text-3xl font-heading font-bold text-gray-800 mb-4">
              Participez à la vie de l'école
            </h2>
            <p className="text-gray-600 mb-8">
              Vous souhaitez proposer une activité ou un événement ? Nous sommes toujours ouverts 
              aux initiatives des parents et de la communauté scolaire.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <Button variant="primary" size="lg">
                  Nous contacter
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link to="/vie-scolaire">
                <Button variant="outline" size="lg">
                  Découvrir la vie scolaire
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
