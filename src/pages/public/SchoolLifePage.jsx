import { Link } from 'react-router-dom'
import { 
  Clock, 
  Utensils, 
  Bus, 
  Palette, 
  Shield, 
  BookOpen,
  Music,
  Cpu,
  Dribbble,
  Heart,
  Users,
  ArrowRight,
  CheckCircle,
  Calendar,
  MapPin,
  Bell,
  AlertTriangle
} from 'lucide-react'
import { Card, Badge, Button } from '../../components/common'
import { SCHOOL_INFO, VALEURS } from '../../utils/constants'

// Emploi du temps type
const EMPLOI_DU_TEMPS = {
  prescolaire: [
    { heure: '07h45 - 08h00', activite: 'Accueil des élèves', type: 'accueil' },
    { heure: '08h00 - 08h30', activite: 'Rassemblement / Éveil', type: 'cours' },
    { heure: '08h30 - 09h30', activite: 'Activités d\'apprentissage', type: 'cours' },
    { heure: '09h30 - 10h00', activite: 'Récréation / Collation', type: 'pause' },
    { heure: '10h00 - 11h00', activite: 'Activités dirigées', type: 'cours' },
    { heure: '11h00 - 11h30', activite: 'Jeux éducatifs', type: 'cours' },
    { heure: '11h30 - 12h00', activite: 'Préparation sortie', type: 'accueil' },
    { heure: '12h00 - 15h00', activite: 'Pause déjeuner', type: 'pause' },
    { heure: '15h00 - 16h00', activite: 'Activités de l\'après-midi', type: 'cours' },
    { heure: '16h00 - 16h30', activite: 'Goûter / Sortie', type: 'accueil' }
  ],
  elementaire: [
    { heure: '07h45 - 08h00', activite: 'Accueil des élèves', type: 'accueil' },
    { heure: '08h00 - 10h00', activite: 'Cours du matin (1)', type: 'cours' },
    { heure: '10h00 - 10h30', activite: 'Récréation', type: 'pause' },
    { heure: '10h30 - 12h30', activite: 'Cours du matin (2)', type: 'cours' },
    { heure: '12h30 - 15h00', activite: 'Pause déjeuner', type: 'pause' },
    { heure: '15h00 - 17h00', activite: 'Cours de l\'après-midi', type: 'cours' },
    { heure: '17h00 - 17h30', activite: 'Études surveillées (optionnel)', type: 'etude' }
  ]
}

// Règles de vie
const REGLES_VIE = [
  {
    categorie: 'Ponctualité',
    icon: <Clock className="w-6 h-6" />,
    regles: [
      'Arriver à l\'école avant 08h00',
      'Prévenir en cas d\'absence ou de retard',
      'Respecter les horaires de début et fin de cours'
    ]
  },
  {
    categorie: 'Respect',
    icon: <Heart className="w-6 h-6" />,
    regles: [
      'Respecter les enseignants et le personnel',
      'Respecter ses camarades',
      'Respecter le matériel et les locaux'
    ]
  },
  {
    categorie: 'Tenue',
    icon: <Users className="w-6 h-6" />,
    regles: [
      'Porter l\'uniforme scolaire obligatoire',
      'Maintenir une tenue propre et correcte',
      'Avoir son matériel scolaire complet'
    ]
  },
  {
    categorie: 'Comportement',
    icon: <Shield className="w-6 h-6" />,
    regles: [
      'Pas de violence verbale ou physique',
      'Pas de téléphones portables en classe',
      'Lever la main pour prendre la parole'
    ]
  }
]

// Activités périscolaires
const ACTIVITES_PERISCOLAIRES = [
  {
    nom: 'Sport et Education Physique',
    description: 'Football, basketball, athlétisme et gymnastique pour développer la coordination et l\'esprit d\'équipe.',
    icon: <Dribbble className="w-8 h-8" />,
    horaires: 'Mercredi après-midi',
    couleur: 'bg-green-500'
  },
  {
    nom: 'Arts plastiques',
    description: 'Peinture, dessin, modelage et travaux manuels pour exprimer sa créativité.',
    icon: <Palette className="w-8 h-8" />,
    horaires: 'Mardi et Jeudi 16h-17h',
    couleur: 'bg-purple-500'
  },
  {
    nom: 'Musique et danse',
    description: 'Initiation au chant, aux percussions et aux danses traditionnelles sénégalaises.',
    icon: <Music className="w-8 h-8" />,
    horaires: 'Lundi et Vendredi 16h-17h',
    couleur: 'bg-pink-500'
  },
  {
    nom: 'Informatique',
    description: 'Initiation à l\'utilisation des ordinateurs et des outils numériques.',
    icon: <Cpu className="w-8 h-8" />,
    horaires: 'Mercredi 10h-12h',
    couleur: 'bg-blue-500'
  },
  {
    nom: 'Club de lecture',
    description: 'Développer le goût de la lecture à travers des histoires et des contes.',
    icon: <BookOpen className="w-8 h-8" />,
    horaires: 'Tous les jours pendant la pause',
    couleur: 'bg-yellow-500'
  }
]

// Services
const SERVICES = [
  {
    titre: 'Cantine scolaire',
    description: 'Des repas équilibrés préparés sur place par notre équipe de cuisine. Menu varié et adapté aux besoins nutritionnels des enfants.',
    icon: <Utensils className="w-8 h-8" />,
    details: [
      'Repas préparés quotidiennement',
      'Menu équilibré et varié',
      'Respect des régimes alimentaires',
      'Collation matinale incluse'
    ],
    tarif: '25 000 FCFA / mois'
  },
  {
    titre: 'Transport scolaire',
    description: 'Service de ramassage scolaire sécurisé pour les quartiers environnants.',
    icon: <Bus className="w-8 h-8" />,
    details: [
      'Bus climatisé et sécurisé',
      'Accompagnateur à bord',
      'Points de ramassage définis',
      'Horaires réguliers'
    ],
    tarif: '15 000 FCFA / mois'
  },
  {
    titre: 'Études surveillées',
    description: 'Accompagnement des élèves dans leurs devoirs après les cours.',
    icon: <BookOpen className="w-8 h-8" />,
    details: [
      'De 17h00 à 18h00',
      'Aide aux devoirs',
      'Encadrement par un enseignant',
      'Révisions et exercices'
    ],
    tarif: '10 000 FCFA / mois'
  }
]

// Mesures de sécurité
const SECURITE = [
  {
    titre: 'Accès contrôlé',
    description: 'Seules les personnes autorisées peuvent entrer dans l\'établissement et récupérer les enfants.',
    icon: <Shield className="w-6 h-6" />
  },
  {
    titre: 'Surveillance permanente',
    description: 'Personnel de surveillance présent pendant les heures de classe et les récréations.',
    icon: <Users className="w-6 h-6" />
  },
  {
    titre: 'Protocole d\'urgence',
    description: 'Procédures établies pour les situations d\'urgence avec exercices réguliers.',
    icon: <AlertTriangle className="w-6 h-6" />
  },
  {
    titre: 'Communication rapide',
    description: 'Système de notification SMS pour informer les parents en cas de besoin.',
    icon: <Bell className="w-6 h-6" />
  }
]

function getTypeColor(type) {
  switch (type) {
    case 'accueil':
      return 'bg-blue-100 text-blue-700'
    case 'cours':
      return 'bg-green-100 text-green-700'
    case 'pause':
      return 'bg-yellow-100 text-yellow-700'
    case 'etude':
      return 'bg-purple-100 text-purple-700'
    default:
      return 'bg-gray-100 text-gray-700'
  }
}

export default function SchoolLifePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gsnsd-blue via-gsnsd-blue-dark to-gsnsd-magenta text-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full mb-6">
              <Calendar className="w-5 h-5" />
              <span className="text-sm font-medium">Vie Scolaire</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6">
              Une journée au GSNSD
            </h1>
            <p className="text-xl text-white/90">
              Découvrez l'organisation de notre école, les horaires, les services proposés 
              et tout ce qui fait le quotidien de nos élèves.
            </p>
          </div>
        </div>
      </section>

      {/* Horaires et Emploi du temps */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-heading font-bold text-gray-800 mb-4">
              <Clock className="inline-block w-8 h-8 text-gsnsd-blue mr-2 -mt-1" />
              Horaires et emploi du temps
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              L'école est ouverte du lundi au vendredi. Voici l'organisation type d'une journée.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Préscolaire */}
            <Card className="overflow-hidden">
              <div className="bg-gsnsd-magenta text-white p-6">
                <h3 className="text-xl font-heading font-bold">Préscolaire (Maternelle)</h3>
                <p className="text-pink-100 text-sm">PS - MS - GS</p>
              </div>
              <div className="divide-y divide-gray-100">
                {EMPLOI_DU_TEMPS.prescolaire.map((item, index) => (
                  <div key={index} className="p-4 flex items-center gap-4 hover:bg-gray-50 transition-colors">
                    <span className="text-sm font-mono text-gray-500 w-28 flex-shrink-0">
                      {item.heure}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getTypeColor(item.type)}`}>
                      {item.activite}
                    </span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Élémentaire */}
            <Card className="overflow-hidden">
              <div className="bg-gsnsd-blue text-white p-6">
                <h3 className="text-xl font-heading font-bold">Élémentaire (Primaire)</h3>
                <p className="text-blue-100 text-sm">CP - CE1 - CE2 - CM1 - CM2</p>
              </div>
              <div className="divide-y divide-gray-100">
                {EMPLOI_DU_TEMPS.elementaire.map((item, index) => (
                  <div key={index} className="p-4 flex items-center gap-4 hover:bg-gray-50 transition-colors">
                    <span className="text-sm font-mono text-gray-500 w-28 flex-shrink-0">
                      {item.heure}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getTypeColor(item.type)}`}>
                      {item.activite}
                    </span>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Légende */}
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getTypeColor('accueil')}`}>
              Accueil
            </span>
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getTypeColor('cours')}`}>
              Cours / Activités
            </span>
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getTypeColor('pause')}`}>
              Pause
            </span>
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getTypeColor('etude')}`}>
              Études
            </span>
          </div>
        </div>
      </section>

      {/* Règlement intérieur */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-heading font-bold text-gray-800 mb-4">
              <BookOpen className="inline-block w-8 h-8 text-gsnsd-magenta mr-2 -mt-1" />
              Règlement intérieur
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Pour le bien-être de tous, nous demandons à chacun de respecter ces règles de vie commune.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {REGLES_VIE.map((item, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-all">
                <div className="w-12 h-12 bg-gsnsd-blue/10 rounded-xl flex items-center justify-center text-gsnsd-blue mb-4">
                  {item.icon}
                </div>
                <h3 className="font-heading font-bold text-gray-800 mb-4">{item.categorie}</h3>
                <ul className="space-y-2">
                  {item.regles.map((regle, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                      {regle}
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <Button variant="outline">
              Télécharger le règlement complet (PDF)
            </Button>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-heading font-bold text-gray-800 mb-4">
              Nos services
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Pour faciliter le quotidien des familles, nous proposons plusieurs services complémentaires.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {SERVICES.map((service, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-xl transition-all group">
                <div className="p-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-gsnsd-blue to-gsnsd-magenta rounded-2xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-heading font-bold text-gray-800 mb-3">
                    {service.titre}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    {service.description}
                  </p>
                  <ul className="space-y-2 mb-6">
                    {service.details.map((detail, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                  <div className="pt-4 border-t border-gray-100">
                    <span className="text-lg font-bold text-gsnsd-blue">{service.tarif}</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Activités périscolaires */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-heading font-bold text-gray-800 mb-4">
              <Palette className="inline-block w-8 h-8 text-gsnsd-magenta mr-2 -mt-1" />
              Activités périscolaires
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              En dehors des heures de cours, nous proposons diverses activités pour enrichir l'expérience scolaire de vos enfants.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {ACTIVITES_PERISCOLAIRES.map((activite, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-all group">
                <div className={`w-16 h-16 ${activite.couleur} rounded-2xl flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform`}>
                  {activite.icon}
                </div>
                <h3 className="text-lg font-heading font-bold text-gray-800 mb-2">
                  {activite.nom}
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  {activite.description}
                </p>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Clock className="w-4 h-4" />
                  {activite.horaires}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Sécurité */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <Badge variant="success" size="lg" className="mb-4">
                  <Shield className="w-4 h-4" />
                  Sécurité
                </Badge>
                <h2 className="text-3xl font-heading font-bold text-gray-800 mb-4">
                  La sécurité de vos enfants, notre priorité
                </h2>
                <p className="text-gray-600 mb-8">
                  Nous mettons tout en œuvre pour garantir un environnement sûr et sécurisé 
                  pour tous les élèves. Voici les mesures que nous appliquons quotidiennement.
                </p>

                <div className="space-y-4">
                  {SECURITE.map((item, index) => (
                    <div key={index} className="flex gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                      <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center text-green-600 flex-shrink-0">
                        {item.icon}
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800">{item.titre}</h4>
                        <p className="text-sm text-gray-600">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative">
                <div className="aspect-square bg-gradient-to-br from-green-100 to-blue-100 rounded-3xl overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800"
                    alt="Sécurité à l'école"
                    className="w-full h-full object-cover"
                  />
                </div>
                <Card className="absolute -bottom-6 -left-6 p-4 shadow-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-800">Environnement certifié</p>
                      <p className="text-sm text-gray-500">Sain et sécuritaire</p>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Valeurs */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-heading font-bold text-gray-800 mb-4">
              Nos valeurs au quotidien
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Chaque jour, nous incarnons nos quatre valeurs essentielles dans toutes nos activités.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {Object.values(VALEURS).map((valeur) => (
              <Link 
                key={valeur.nom} 
                to="/nos-valeurs"
                className="group"
              >
                <Card className="p-6 text-center hover:shadow-lg transition-all h-full">
                  <div 
                    className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform"
                    style={{ backgroundColor: valeur.couleur + '20' }}
                  >
                    <span className="text-3xl">{valeur.icone}</span>
                  </div>
                  <h3 className="font-heading font-bold text-gray-800 group-hover:text-gsnsd-blue transition-colors">
                    {valeur.nom}
                  </h3>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-br from-gsnsd-blue to-gsnsd-magenta text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-heading font-bold mb-4">
              Rejoignez notre communauté
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Inscrivez votre enfant au GSNSD et offrez-lui un environnement d'apprentissage 
              épanouissant et structuré.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/admission">
                <Button variant="secondary" size="lg" className="bg-white text-gsnsd-blue hover:bg-gray-100">
                  Demander une inscription
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                  Nous contacter
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
