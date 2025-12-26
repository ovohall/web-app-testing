import { useState } from 'react'
import { 
  Camera, 
  X, 
  ChevronLeft, 
  ChevronRight,
  Filter,
  Grid3X3,
  LayoutGrid,
  Calendar,
  Image as ImageIcon,
  Download,
  Share2,
  Heart,
  Eye
} from 'lucide-react'
import { Card, Badge, Button } from '../../components/common'
import { SCHOOL_INFO } from '../../utils/constants'

// Données de démonstration pour la galerie
const ALBUMS = [
  {
    id: 'rentree-2024',
    titre: 'Rentrée scolaire 2024-2025',
    description: 'Les premiers jours de la nouvelle année scolaire',
    date: '2024-10-01',
    categorie: 'Rentrée',
    couverture: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800',
    photos: 24
  },
  {
    id: 'fete-fin-annee-2024',
    titre: 'Fête de fin d\'année 2024',
    description: 'Spectacles et célébrations de nos élèves',
    date: '2024-06-28',
    categorie: 'Fête',
    couverture: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800',
    photos: 48
  },
  {
    id: 'sport-2024',
    titre: 'Journée sportive',
    description: 'Compétitions et jeux pour tous les niveaux',
    date: '2024-05-15',
    categorie: 'Sport',
    couverture: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=800',
    photos: 36
  },
  {
    id: 'culture-2024',
    titre: 'Journée culturelle',
    description: 'Célébration de notre patrimoine sénégalais',
    date: '2024-04-20',
    categorie: 'Culture',
    couverture: 'https://images.unsplash.com/photo-1544928147-79a2dbc1f389?w=800',
    photos: 32
  },
  {
    id: 'classes-2024',
    titre: 'Photos de classe 2023-2024',
    description: 'Portraits officiels de toutes les classes',
    date: '2024-03-10',
    categorie: 'Classes',
    couverture: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800',
    photos: 12
  },
  {
    id: 'sortie-2024',
    titre: 'Sortie pédagogique',
    description: 'Visite du musée IFAN de Dakar',
    date: '2024-02-22',
    categorie: 'Sortie',
    couverture: 'https://images.unsplash.com/photo-1544928147-79a2dbc1f389?w=800',
    photos: 28
  }
]

// Photos individuelles pour la galerie
const PHOTOS = [
  {
    id: 1,
    url: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800',
    titre: 'Accueil des nouveaux élèves',
    categorie: 'Rentrée',
    date: '2024-10-01',
    likes: 45
  },
  {
    id: 2,
    url: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800',
    titre: 'En classe de CP',
    categorie: 'Classes',
    date: '2024-09-15',
    likes: 38
  },
  {
    id: 3,
    url: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?w=800',
    titre: 'Réunion parents-enseignants',
    categorie: 'Réunion',
    date: '2024-09-10',
    likes: 22
  },
  {
    id: 4,
    url: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=800',
    titre: 'Cours d\'éducation physique',
    categorie: 'Sport',
    date: '2024-09-08',
    likes: 56
  },
  {
    id: 5,
    url: 'https://images.unsplash.com/photo-1544928147-79a2dbc1f389?w=800',
    titre: 'Atelier d\'art',
    categorie: 'Culture',
    date: '2024-09-05',
    likes: 41
  },
  {
    id: 6,
    url: 'https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?w=800',
    titre: 'Cérémonie de remise des prix',
    categorie: 'Fête',
    date: '2024-06-28',
    likes: 89
  },
  {
    id: 7,
    url: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800',
    titre: 'Spectacle de fin d\'année',
    categorie: 'Fête',
    date: '2024-06-28',
    likes: 72
  },
  {
    id: 8,
    url: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=800',
    titre: 'Lecture en bibliothèque',
    categorie: 'Classes',
    date: '2024-05-20',
    likes: 33
  },
  {
    id: 9,
    url: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800',
    titre: 'Cour de récréation',
    categorie: 'Vie quotidienne',
    date: '2024-05-15',
    likes: 28
  },
  {
    id: 10,
    url: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800',
    titre: 'Travail en groupe',
    categorie: 'Classes',
    date: '2024-05-10',
    likes: 35
  },
  {
    id: 11,
    url: 'https://images.unsplash.com/photo-1588075592446-265fd1e6e76f?w=800',
    titre: 'Atelier de peinture',
    categorie: 'Culture',
    date: '2024-04-25',
    likes: 47
  },
  {
    id: 12,
    url: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=800',
    titre: 'Jardin pédagogique',
    categorie: 'Vie quotidienne',
    date: '2024-04-15',
    likes: 31
  }
]

const CATEGORIES = [
  { value: 'all', label: 'Tout' },
  { value: 'Rentrée', label: 'Rentrée' },
  { value: 'Classes', label: 'Classes' },
  { value: 'Sport', label: 'Sport' },
  { value: 'Culture', label: 'Culture' },
  { value: 'Fête', label: 'Fête' },
  { value: 'Sortie', label: 'Sortie' },
  { value: 'Vie quotidienne', label: 'Vie quotidienne' }
]

function formatDate(dateString) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' }
  return new Date(dateString).toLocaleDateString('fr-FR', options)
}

export default function GalleryPage() {
  const [viewMode, setViewMode] = useState('grid') // 'grid' ou 'albums'
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedPhoto, setSelectedPhoto] = useState(null)
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0)

  // Filtrer les photos
  const filteredPhotos = PHOTOS.filter(photo => 
    selectedCategory === 'all' || photo.categorie === selectedCategory
  )

  // Filtrer les albums
  const filteredAlbums = ALBUMS.filter(album =>
    selectedCategory === 'all' || album.categorie === selectedCategory
  )

  // Navigation dans la lightbox
  const handlePrevPhoto = () => {
    setCurrentPhotoIndex((prev) => 
      prev === 0 ? filteredPhotos.length - 1 : prev - 1
    )
    setSelectedPhoto(filteredPhotos[currentPhotoIndex === 0 ? filteredPhotos.length - 1 : currentPhotoIndex - 1])
  }

  const handleNextPhoto = () => {
    setCurrentPhotoIndex((prev) => 
      prev === filteredPhotos.length - 1 ? 0 : prev + 1
    )
    setSelectedPhoto(filteredPhotos[currentPhotoIndex === filteredPhotos.length - 1 ? 0 : currentPhotoIndex + 1])
  }

  const openLightbox = (photo, index) => {
    setSelectedPhoto(photo)
    setCurrentPhotoIndex(index)
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gsnsd-blue to-gsnsd-magenta text-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full mb-6">
              <Camera className="w-5 h-5" />
              <span className="text-sm font-medium">Galerie Photos</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6">
              Nos plus beaux moments
            </h1>
            <p className="text-xl text-white/90">
              Découvrez la vie quotidienne au {SCHOOL_INFO.abbreviation} à travers notre galerie photos. 
              Des moments de joie, d'apprentissage et de partage.
            </p>
          </div>
        </div>
      </section>

      {/* Statistiques */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-gsnsd-blue">{ALBUMS.length}</div>
              <div className="text-sm text-gray-600">Albums</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gsnsd-magenta">
                {ALBUMS.reduce((sum, album) => sum + album.photos, 0)}+
              </div>
              <div className="text-sm text-gray-600">Photos</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">{CATEGORIES.length - 1}</div>
              <div className="text-sm text-gray-600">Catégories</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-600">
                {PHOTOS.reduce((sum, photo) => sum + photo.likes, 0)}
              </div>
              <div className="text-sm text-gray-600">J'aime</div>
            </div>
          </div>
        </div>
      </section>

      {/* Filtres et contrôles */}
      <section className="py-8 bg-gray-50 sticky top-0 z-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Mode d'affichage */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600 mr-2">Affichage :</span>
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-all ${
                  viewMode === 'grid' 
                    ? 'bg-gsnsd-blue text-white' 
                    : 'bg-white text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Grid3X3 className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('albums')}
                className={`p-2 rounded-lg transition-all ${
                  viewMode === 'albums' 
                    ? 'bg-gsnsd-blue text-white' 
                    : 'bg-white text-gray-600 hover:bg-gray-100'
                }`}
              >
                <LayoutGrid className="w-5 h-5" />
              </button>
            </div>

            {/* Catégories */}
            <div className="flex flex-wrap items-center gap-2">
              <Filter className="w-5 h-5 text-gray-400" />
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => setSelectedCategory(cat.value)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedCategory === cat.value
                      ? 'bg-gsnsd-blue text-white'
                      : 'bg-white text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contenu principal */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {viewMode === 'albums' ? (
            /* Vue Albums */
            <div>
              <h2 className="text-2xl font-heading font-bold text-gray-800 mb-6 flex items-center gap-2">
                <LayoutGrid className="w-6 h-6 text-gsnsd-blue" />
                Albums photos
                <span className="text-sm font-normal text-gray-500">
                  ({filteredAlbums.length} albums)
                </span>
              </h2>

              {filteredAlbums.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredAlbums.map((album) => (
                    <Card 
                      key={album.id} 
                      className="overflow-hidden group cursor-pointer hover:shadow-xl transition-all"
                    >
                      <div className="relative h-56">
                        <img
                          src={album.couverture}
                          alt={album.titre}
                          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-4">
                          <Badge variant="secondary" size="sm" className="mb-2">
                            {album.categorie}
                          </Badge>
                          <h3 className="text-white font-heading font-bold text-lg">
                            {album.titre}
                          </h3>
                        </div>
                        <div className="absolute top-4 right-4 bg-white/90 px-3 py-1 rounded-full">
                          <span className="text-sm font-medium text-gray-800 flex items-center gap-1">
                            <ImageIcon className="w-4 h-4" />
                            {album.photos} photos
                          </span>
                        </div>
                      </div>
                      <div className="p-4">
                        <p className="text-gray-600 text-sm mb-3">{album.description}</p>
                        <div className="flex items-center justify-between text-sm text-gray-500">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {formatDate(album.date)}
                          </span>
                          <Button variant="ghost" size="sm">
                            <Eye className="w-4 h-4 mr-1" />
                            Voir
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card className="p-12 text-center">
                  <LayoutGrid className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-heading font-bold text-gray-800 mb-2">
                    Aucun album dans cette catégorie
                  </h3>
                  <p className="text-gray-600">
                    Sélectionnez une autre catégorie pour voir les albums
                  </p>
                </Card>
              )}
            </div>
          ) : (
            /* Vue Grille */
            <div>
              <h2 className="text-2xl font-heading font-bold text-gray-800 mb-6 flex items-center gap-2">
                <Grid3X3 className="w-6 h-6 text-gsnsd-blue" />
                Toutes les photos
                <span className="text-sm font-normal text-gray-500">
                  ({filteredPhotos.length} photos)
                </span>
              </h2>

              {filteredPhotos.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {filteredPhotos.map((photo, index) => (
                    <div
                      key={photo.id}
                      onClick={() => openLightbox(photo, index)}
                      className="relative aspect-square rounded-xl overflow-hidden cursor-pointer group"
                    >
                      <img
                        src={photo.url}
                        alt={photo.titre}
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all" />
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="text-white text-center p-4">
                          <Eye className="w-8 h-8 mx-auto mb-2" />
                          <p className="text-sm font-medium line-clamp-2">{photo.titre}</p>
                        </div>
                      </div>
                      <div className="absolute bottom-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Badge variant="secondary" size="sm">
                          {photo.categorie}
                        </Badge>
                      </div>
                      <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="text-white text-sm flex items-center gap-1">
                          <Heart className="w-4 h-4" />
                          {photo.likes}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <Card className="p-12 text-center">
                  <ImageIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-heading font-bold text-gray-800 mb-2">
                    Aucune photo dans cette catégorie
                  </h3>
                  <p className="text-gray-600">
                    Sélectionnez une autre catégorie pour voir les photos
                  </p>
                </Card>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      {selectedPhoto && (
        <div 
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center"
          onClick={() => setSelectedPhoto(null)}
        >
          {/* Bouton fermer */}
          <button
            onClick={() => setSelectedPhoto(null)}
            className="absolute top-4 right-4 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors z-10"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Navigation */}
          <button
            onClick={(e) => { e.stopPropagation(); handlePrevPhoto(); }}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); handleNextPhoto(); }}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Image */}
          <div 
            className="max-w-5xl max-h-[80vh] px-16"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedPhoto.url}
              alt={selectedPhoto.titre}
              className="max-w-full max-h-[70vh] object-contain mx-auto rounded-lg"
            />
            <div className="text-center mt-4 text-white">
              <h3 className="text-xl font-heading font-bold mb-2">{selectedPhoto.titre}</h3>
              <div className="flex items-center justify-center gap-4 text-white/70">
                <Badge variant="secondary">{selectedPhoto.categorie}</Badge>
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {formatDate(selectedPhoto.date)}
                </span>
                <span className="flex items-center gap-1">
                  <Heart className="w-4 h-4" />
                  {selectedPhoto.likes}
                </span>
              </div>
              <div className="flex items-center justify-center gap-3 mt-4">
                <button className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors">
                  <Download className="w-5 h-5" />
                </button>
                <button className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors">
                  <Share2 className="w-5 h-5" />
                </button>
                <button className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors">
                  <Heart className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Indicateur de position */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/70">
            {currentPhotoIndex + 1} / {filteredPhotos.length}
          </div>
        </div>
      )}

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-br from-gsnsd-blue to-gsnsd-blue-dark text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <Camera className="w-16 h-16 mx-auto mb-6 opacity-80" />
            <h2 className="text-3xl font-heading font-bold mb-4">
              Partagez vos photos
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Vous avez des photos d'événements scolaires à partager ? 
              Envoyez-les nous pour enrichir notre galerie !
            </p>
            <Button 
              variant="secondary" 
              size="lg"
              className="bg-white text-gsnsd-blue hover:bg-gray-100"
            >
              Envoyer des photos
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
