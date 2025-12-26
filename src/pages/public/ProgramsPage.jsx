import { Link } from 'react-router-dom'
import { 
  Heart, BookOpen, CheckCircle, ArrowRight, Clock,
  Palette, Music, Globe, Calculator, Pen, Users
} from 'lucide-react'
import { NIVEAUX_PRESCOLAIRE, NIVEAUX_ELEMENTAIRE, MATIERES } from '../../utils/constants'
import Button from '../../components/common/Button'

const ProgramsPage = () => {
  const prescolaireActivities = [
    { icon: Palette, title: 'Arts plastiques', description: 'Développement de la créativité' },
    { icon: Music, title: 'Musique & Chant', description: 'Éveil musical et rythmique' },
    { icon: Users, title: 'Socialisation', description: 'Vivre ensemble et partage' },
    { icon: BookOpen, title: 'Pré-lecture', description: 'Initiation aux lettres et sons' },
    { icon: Calculator, title: 'Pré-mathématiques', description: 'Nombres et formes' },
    { icon: Globe, title: 'Découverte du monde', description: 'Sciences et nature' },
  ]

  const elementaireSubjects = [
    { icon: Pen, title: 'Français', description: 'Lecture, écriture, grammaire' },
    { icon: Calculator, title: 'Mathématiques', description: 'Calcul, géométrie, problèmes' },
    { icon: Globe, title: 'Sciences', description: 'Observation et expérimentation' },
    { icon: BookOpen, title: 'Histoire-Géo', description: 'Culture et patrimoine' },
    { icon: Users, title: 'Éducation civique', description: 'Citoyenneté et valeurs' },
    { icon: Music, title: 'Arts & EPS', description: 'Expression et sport' },
  ]

  return (
    <div>
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-gsnsd-blue to-gsnsd-magenta overflow-hidden">
        <div className="absolute inset-0 opacity-5 bg-white" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block px-4 py-1 bg-white/20 text-white text-sm font-medium rounded-full mb-6">
            Nos Programmes
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Un parcours éducatif complet
          </h1>
          <p className="text-lg text-white/90 max-w-2xl mx-auto">
            Du préscolaire à l'élémentaire, nous accompagnons votre enfant 
            dans son développement et son apprentissage.
          </p>
        </div>
      </section>

      {/* Préscolaire Section */}
      <section id="prescolaire" className="py-20 bg-white scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-gsnsd-blue/10 rounded-xl">
                  <Heart className="w-8 h-8 text-gsnsd-blue" />
                </div>
                <span className="px-4 py-1 bg-gsnsd-blue/10 text-gsnsd-blue text-sm font-medium rounded-full">
                  3-5 ans
                </span>
              </div>
              
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                Préscolaire (Maternelle)
              </h2>
              
              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                Notre programme préscolaire offre un environnement d'apprentissage 
                ludique et stimulant où les enfants développent leurs compétences 
                fondamentales tout en s'amusant.
              </p>

              <h3 className="font-bold text-gray-900 mb-4">Niveaux proposés :</h3>
              <div className="space-y-3 mb-8">
                {NIVEAUX_PRESCOLAIRE.map((niveau) => (
                  <div key={niveau.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-gsnsd-blue flex-shrink-0" />
                    <div>
                      <span className="font-medium text-gray-900">{niveau.nom}</span>
                      <span className="text-gray-500 ml-2">({niveau.abbreviation})</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-3 text-gray-600">
                <Clock className="w-5 h-5 text-gsnsd-blue" />
                <span>Horaires : 7h30 - 12h30</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {prescolaireActivities.map((activity, index) => (
                <div 
                  key={index} 
                  className="card p-5 hover:shadow-lg transition-shadow"
                >
                  <div className="p-2 bg-gsnsd-blue/10 rounded-lg w-fit mb-3">
                    <activity.icon className="w-5 h-5 text-gsnsd-blue" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-1">{activity.title}</h4>
                  <p className="text-sm text-gray-600">{activity.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Élémentaire Section */}
      <section id="elementaire" className="py-20 bg-gray-50 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1 grid grid-cols-2 gap-4">
              {elementaireSubjects.map((subject, index) => (
                <div 
                  key={index} 
                  className="card p-5 hover:shadow-lg transition-shadow"
                >
                  <div className="p-2 bg-gsnsd-magenta/10 rounded-lg w-fit mb-3">
                    <subject.icon className="w-5 h-5 text-gsnsd-magenta" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-1">{subject.title}</h4>
                  <p className="text-sm text-gray-600">{subject.description}</p>
                </div>
              ))}
            </div>

            <div className="order-1 lg:order-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-gsnsd-magenta/10 rounded-xl">
                  <BookOpen className="w-8 h-8 text-gsnsd-magenta" />
                </div>
                <span className="px-4 py-1 bg-gsnsd-magenta/10 text-gsnsd-magenta text-sm font-medium rounded-full">
                  6-11 ans
                </span>
              </div>
              
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                Élémentaire (Primaire)
              </h2>
              
              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                Notre programme élémentaire suit le curriculum officiel sénégalais 
                tout en intégrant des méthodes pédagogiques modernes pour assurer 
                la réussite de chaque élève.
              </p>

              <h3 className="font-bold text-gray-900 mb-4">Niveaux proposés :</h3>
              <div className="space-y-3 mb-8">
                {NIVEAUX_ELEMENTAIRE.map((niveau) => (
                  <div key={niveau.id} className="flex items-center gap-3 p-3 bg-white rounded-lg">
                    <CheckCircle className="w-5 h-5 text-gsnsd-magenta flex-shrink-0" />
                    <div>
                      <span className="font-medium text-gray-900">{niveau.nom}</span>
                      <span className="text-gray-500 ml-2">({niveau.abbreviation})</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-3 text-gray-600">
                <Clock className="w-5 h-5 text-gsnsd-magenta" />
                <span>Horaires : 7h30 - 12h30 / 15h00 - 17h00</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CFEE Preparation */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-gsnsd-blue/10 to-gsnsd-magenta/10 rounded-3xl p-8 md:p-12">
            <div className="max-w-3xl mx-auto text-center">
              <span className="inline-block px-4 py-1 bg-white text-gsnsd-blue text-sm font-medium rounded-full mb-4">
                Préparation aux examens
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                Préparation au CFEE
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Nos élèves de CM2 bénéficient d'un programme renforcé de préparation 
                au Certificat de Fin d'Études Élémentaires (CFEE). Notre taux de réussite 
                témoigne de notre engagement envers l'excellence académique.
              </p>
              
              <div className="grid grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <p className="text-4xl font-bold text-gsnsd-blue">95%</p>
                  <p className="text-sm text-gray-600 mt-1">Taux de réussite</p>
                </div>
                <div className="text-center">
                  <p className="text-4xl font-bold text-gsnsd-magenta">100+</p>
                  <p className="text-sm text-gray-600 mt-1">Élèves préparés</p>
                </div>
                <div className="text-center">
                  <p className="text-4xl font-bold text-green-600">15+</p>
                  <p className="text-sm text-gray-600 mt-1">Mentions par an</p>
                </div>
              </div>

              <Link to="/admission">
                <Button size="lg" icon={ArrowRight} iconPosition="right">
                  Inscrire mon enfant
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Schedule */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block px-4 py-1 bg-gsnsd-blue/10 text-gsnsd-blue text-sm font-medium rounded-full mb-4">
              Organisation
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
              Emploi du temps type
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Préscolaire Schedule */}
            <div className="card p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Heart className="w-6 h-6 text-gsnsd-blue" />
                Préscolaire
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-600">7h30 - 8h00</span>
                  <span className="font-medium">Accueil</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-600">8h00 - 9h30</span>
                  <span className="font-medium">Activités dirigées</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-600">9h30 - 10h00</span>
                  <span className="font-medium">Récréation</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-600">10h00 - 11h30</span>
                  <span className="font-medium">Ateliers</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-600">11h30 - 12h30</span>
                  <span className="font-medium">Activités ludiques</span>
                </div>
              </div>
            </div>

            {/* Élémentaire Schedule */}
            <div className="card p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <BookOpen className="w-6 h-6 text-gsnsd-magenta" />
                Élémentaire
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-600">7h30 - 10h00</span>
                  <span className="font-medium">Cours du matin</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-600">10h00 - 10h30</span>
                  <span className="font-medium">Récréation</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-600">10h30 - 12h30</span>
                  <span className="font-medium">Cours</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-600">12h30 - 15h00</span>
                  <span className="font-medium">Pause déjeuner</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-600">15h00 - 17h00</span>
                  <span className="font-medium">Cours de l'après-midi</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-gsnsd-blue to-gsnsd-magenta">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Prêt à commencer l'aventure ?
          </h2>
          <p className="text-lg text-white/90 mb-8">
            Inscrivez votre enfant dès maintenant et rejoignez la famille GSNSD.
          </p>
          <Link to="/admission">
            <Button size="lg" className="bg-white text-gsnsd-blue hover:bg-gray-100">
              Commencer l'inscription
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}

export default ProgramsPage
