import { Link } from 'react-router-dom'
import { 
  GraduationCap, Users, Award, Calendar, ArrowRight, 
  CheckCircle, Star, BookOpen, Heart, Shield
} from 'lucide-react'
import { VALEURS, ORIENTATIONS, SCHOOL_INFO, NIVEAUX_PRESCOLAIRE, NIVEAUX_ELEMENTAIRE } from '../../utils/constants'
import Button from '../../components/common/Button'

const HomePage = () => {
  const stats = [
    { value: '10+', label: 'Années d\'expérience' },
    { value: '200+', label: 'Élèves formés' },
    { value: '95%', label: 'Taux de réussite' },
    { value: '15+', label: 'Enseignants qualifiés' },
  ]

  const testimonials = [
    {
      id: 1,
      name: 'Awa Ndiaye',
      role: 'Parent d\'élève - CE2',
      content: 'L\'équipe pédagogique est exceptionnelle. Mon enfant a beaucoup progressé depuis son inscription au GSNSD.',
      avatar: 'AN',
    },
    {
      id: 2,
      name: 'Ibrahima Diallo',
      role: 'Parent d\'élève - CM1',
      content: 'Les valeurs enseignées ici ont vraiment transformé mon fils. Il est plus engagé et persévérant.',
      avatar: 'ID',
    },
    {
      id: 3,
      name: 'Fatou Fall',
      role: 'Parent d\'élève - GS',
      content: 'Un environnement sécurisé et chaleureux pour les tout-petits. Ma fille adore aller à l\'école !',
      avatar: 'FF',
    },
  ]

  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-gsnsd-blue via-gsnsd-blue-light to-gsnsd-magenta opacity-90" />
        <div className="absolute inset-0 opacity-30" style={{backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")"}} />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm mb-6">
              <Star className="w-4 h-4" />
              <span>Bienvenue au {SCHOOL_INFO.abbreviation}</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
              {SCHOOL_INFO.name}
            </h1>
            
            <p className="mt-6 text-lg sm:text-xl text-white/90 leading-relaxed max-w-2xl">
              Une éducation de qualité fondée sur nos quatre valeurs essentielles : 
              <span className="font-semibold"> Engagement, Persévérance, Respect et Fierté</span>.
            </p>
            
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link to="/admission">
                <Button size="lg" className="bg-white text-gsnsd-blue hover:bg-gray-100 w-full sm:w-auto">
                  Inscrivez votre enfant
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link to="/a-propos">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-gsnsd-blue w-full sm:w-auto">
                  Découvrir l'école
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="text-center sm:text-left">
                  <p className="text-3xl sm:text-4xl font-bold text-white">{stat.value}</p>
                  <p className="text-sm text-white/80 mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Decorative shapes */}
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-gray-50 to-transparent" />
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block px-4 py-1 bg-gsnsd-blue/10 text-gsnsd-blue text-sm font-medium rounded-full mb-4">
              Nos Fondements
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
              Les Quatre Valeurs Essentielles
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Notre projet éducatif repose sur quatre piliers fondamentaux qui guident notre enseignement.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {VALEURS.map((valeur, index) => (
              <div 
                key={valeur.id}
                className={`
                  p-8 rounded-2xl text-center transition-all duration-300 hover:-translate-y-2
                  ${index === 0 ? 'bg-gradient-to-br from-gsnsd-blue/10 to-gsnsd-blue/5 hover:shadow-lg hover:shadow-gsnsd-blue/20' : ''}
                  ${index === 1 ? 'bg-gradient-to-br from-gsnsd-magenta/10 to-gsnsd-magenta/5 hover:shadow-lg hover:shadow-gsnsd-magenta/20' : ''}
                  ${index === 2 ? 'bg-gradient-to-br from-green-100 to-green-50 hover:shadow-lg hover:shadow-green-200' : ''}
                  ${index === 3 ? 'bg-gradient-to-br from-yellow-100 to-yellow-50 hover:shadow-lg hover:shadow-yellow-200' : ''}
                `}
              >
                <div className="text-5xl mb-4">{valeur.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{valeur.nom}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{valeur.description}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/nos-valeurs">
              <Button variant="outline" icon={ArrowRight} iconPosition="right">
                En savoir plus sur nos valeurs
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block px-4 py-1 bg-gsnsd-magenta/10 text-gsnsd-magenta text-sm font-medium rounded-full mb-4">
              Nos Programmes
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
              Du Préscolaire à l'Élémentaire
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Un parcours éducatif complet pour accompagner votre enfant de la maternelle au CM2.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Préscolaire */}
            <div className="card-hover p-8 bg-gradient-to-br from-gsnsd-blue/5 to-white border-2 border-gsnsd-blue/20">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-gsnsd-blue/10 rounded-xl">
                  <Heart className="w-8 h-8 text-gsnsd-blue" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">Préscolaire</h3>
                  <p className="text-gray-500">Maternelle (3-5 ans)</p>
                </div>
              </div>
              <ul className="space-y-3 mb-6">
                {NIVEAUX_PRESCOLAIRE.map((niveau) => (
                  <li key={niveau.id} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-gsnsd-blue flex-shrink-0" />
                    <span className="text-gray-700">{niveau.nom} ({niveau.abbreviation})</span>
                  </li>
                ))}
              </ul>
              <p className="text-gray-600 text-sm leading-relaxed mb-6">
                Éveil, socialisation et préparation aux apprentissages fondamentaux dans un environnement bienveillant.
              </p>
              <Link to="/programmes#prescolaire">
                <Button variant="outline" size="sm" icon={ArrowRight} iconPosition="right">
                  Découvrir le programme
                </Button>
              </Link>
            </div>

            {/* Élémentaire */}
            <div className="card-hover p-8 bg-gradient-to-br from-gsnsd-magenta/5 to-white border-2 border-gsnsd-magenta/20">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-gsnsd-magenta/10 rounded-xl">
                  <BookOpen className="w-8 h-8 text-gsnsd-magenta" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">Élémentaire</h3>
                  <p className="text-gray-500">Primaire (6-11 ans)</p>
                </div>
              </div>
              <ul className="space-y-3 mb-6">
                {NIVEAUX_ELEMENTAIRE.map((niveau) => (
                  <li key={niveau.id} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-gsnsd-magenta flex-shrink-0" />
                    <span className="text-gray-700">{niveau.nom} ({niveau.abbreviation})</span>
                  </li>
                ))}
              </ul>
              <p className="text-gray-600 text-sm leading-relaxed mb-6">
                Acquisition des savoirs fondamentaux et préparation au CFEE dans le respect du programme officiel.
              </p>
              <Link to="/programmes#elementaire">
                <Button variant="outlineMagenta" size="sm" icon={ArrowRight} iconPosition="right">
                  Découvrir le programme
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Orientations Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block px-4 py-1 bg-white/10 text-white text-sm font-medium rounded-full mb-4">
              Notre Vision
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold">
              Nos Grandes Orientations
            </h2>
            <p className="mt-4 text-lg text-gray-400">
              Trois axes stratégiques pour assurer la réussite de chaque élève.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {ORIENTATIONS.map((orientation, index) => (
              <div 
                key={orientation.id}
                className="p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all"
              >
                <div className="text-4xl mb-4">{orientation.icon}</div>
                <h3 className="text-xl font-bold mb-3">{orientation.titre}</h3>
                <p className="text-gray-400 leading-relaxed">{orientation.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block px-4 py-1 bg-gsnsd-blue/10 text-gsnsd-blue text-sm font-medium rounded-full mb-4">
              Témoignages
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
              Ce que disent les parents
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="card p-8">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-600 leading-relaxed mb-6">"{testimonial.content}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gsnsd-blue to-gsnsd-magenta flex items-center justify-center">
                    <span className="text-white font-semibold">{testimonial.avatar}</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-gsnsd-blue to-gsnsd-magenta">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Prêt à rejoindre la famille GSNSD ?
          </h2>
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            Offrez à votre enfant une éducation de qualité dans un environnement bienveillant 
            et stimulant. Les inscriptions sont ouvertes !
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/admission">
              <Button size="lg" className="bg-white text-gsnsd-blue hover:bg-gray-100 w-full sm:w-auto">
                Commencer l'inscription
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link to="/contact">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-gsnsd-blue w-full sm:w-auto">
                Nous contacter
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default HomePage
