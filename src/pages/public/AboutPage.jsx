import { Link } from 'react-router-dom'
import { 
  MapPin, Users, Award, BookOpen, Shield, Heart,
  CheckCircle, ArrowRight, Calendar, Target
} from 'lucide-react'
import { SCHOOL_INFO, VALEURS, ORIENTATIONS } from '../../utils/constants'
import Button from '../../components/common/Button'

const AboutPage = () => {
  const team = [
    { name: 'Direction', role: 'Équipe de direction', count: 2 },
    { name: 'Enseignants', role: 'Personnel pédagogique', count: 15 },
    { name: 'Administration', role: 'Personnel administratif', count: 3 },
    { name: 'Support', role: 'Personnel de soutien', count: 5 },
  ]

  const milestones = [
    { year: '2015', title: 'Fondation', description: 'Création du Groupe Scolaire Ndella Sémou DIOUF' },
    { year: '2017', title: 'Expansion', description: 'Ouverture des classes élémentaires' },
    { year: '2019', title: 'Excellence', description: '100% de réussite au CFEE' },
    { year: '2023', title: 'Croissance', description: 'Plus de 200 élèves inscrits' },
  ]

  const facilities = [
    { icon: BookOpen, title: 'Salles de classe modernes', description: 'Équipées pour l\'apprentissage' },
    { icon: Shield, title: 'Environnement sécurisé', description: 'Surveillance et protocoles stricts' },
    { icon: Users, title: 'Cour de récréation', description: 'Espace de jeux adapté' },
    { icon: Heart, title: 'Cantine scolaire', description: 'Repas équilibrés' },
  ]

  return (
    <div>
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-gray-900 to-gray-800 overflow-hidden">
        <div className="absolute inset-0 opacity-5 bg-white" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="inline-block px-4 py-1 bg-gsnsd-blue/20 text-gsnsd-blue text-sm font-medium rounded-full mb-6">
              À Propos
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              Notre Histoire, <br/>
              <span className="text-gsnsd-blue">Notre Mission</span>
            </h1>
            <p className="text-lg text-gray-300 leading-relaxed">
              Depuis {SCHOOL_INFO.founded}, le Groupe Scolaire Ndella Sémou DIOUF s'engage à offrir 
              une éducation de qualité aux enfants de Ndiakhirate et ses environs, 
              guidé par nos quatre valeurs essentielles.
            </p>
            <div className="flex items-center gap-2 mt-6 text-gray-400">
              <MapPin className="w-5 h-5 text-gsnsd-blue" />
              <span>{SCHOOL_INFO.address}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block px-4 py-1 bg-gsnsd-magenta/10 text-gsnsd-magenta text-sm font-medium rounded-full mb-4">
                Notre Mission
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                Former les citoyens de demain
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                Notre mission est d'offrir à chaque enfant un environnement d'apprentissage 
                stimulant et bienveillant, où les valeurs d'engagement, de persévérance, 
                de respect et de fierté sont au cœur de notre projet éducatif.
              </p>
              <div className="space-y-4">
                {ORIENTATIONS.map((orientation) => (
                  <div key={orientation.id} className="flex items-start gap-4">
                    <div className="p-2 bg-gsnsd-blue/10 rounded-lg flex-shrink-0">
                      <Target className="w-5 h-5 text-gsnsd-blue" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{orientation.titre}</h4>
                      <p className="text-sm text-gray-600">{orientation.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {VALEURS.map((valeur, index) => (
                <div 
                  key={valeur.id}
                  className={`p-6 rounded-2xl text-center ${
                    index === 0 ? 'bg-gsnsd-blue/10' :
                    index === 1 ? 'bg-gsnsd-magenta/10' :
                    index === 2 ? 'bg-green-100' : 'bg-yellow-100'
                  }`}
                >
                  <div className="text-4xl mb-3">{valeur.icon}</div>
                  <h4 className="font-bold text-gray-900">{valeur.nom}</h4>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block px-4 py-1 bg-gsnsd-blue/10 text-gsnsd-blue text-sm font-medium rounded-full mb-4">
              Notre Parcours
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
              Les étapes clés de notre histoire
            </h2>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-gsnsd-blue to-gsnsd-magenta rounded-full hidden md:block" />

            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div 
                  key={milestone.year}
                  className={`flex items-center gap-8 ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                    <div className="card p-6 inline-block">
                      <div className="flex items-center gap-3 mb-2">
                        <Calendar className="w-5 h-5 text-gsnsd-blue" />
                        <span className="text-2xl font-bold text-gsnsd-blue">{milestone.year}</span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{milestone.title}</h3>
                      <p className="text-gray-600">{milestone.description}</p>
                    </div>
                  </div>
                  
                  {/* Center dot */}
                  <div className="hidden md:flex w-4 h-4 rounded-full bg-white border-4 border-gsnsd-blue z-10" />
                  
                  <div className="flex-1" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block px-4 py-1 bg-gsnsd-magenta/10 text-gsnsd-magenta text-sm font-medium rounded-full mb-4">
              Notre Équipe
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
              Une équipe dévouée
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Des professionnels passionnés au service de l'éducation de vos enfants.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {team.map((member, index) => (
              <div key={index} className="card p-6 text-center">
                <div className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4 ${
                  index === 0 ? 'bg-gsnsd-blue/10' :
                  index === 1 ? 'bg-gsnsd-magenta/10' :
                  index === 2 ? 'bg-green-100' : 'bg-yellow-100'
                }`}>
                  <Users className={`w-8 h-8 ${
                    index === 0 ? 'text-gsnsd-blue' :
                    index === 1 ? 'text-gsnsd-magenta' :
                    index === 2 ? 'text-green-600' : 'text-yellow-600'
                  }`} />
                </div>
                <h3 className="text-3xl font-bold text-gray-900">{member.count}</h3>
                <p className="font-medium text-gray-900 mt-1">{member.name}</p>
                <p className="text-sm text-gray-500">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Facilities */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block px-4 py-1 bg-gsnsd-blue/10 text-gsnsd-blue text-sm font-medium rounded-full mb-4">
              Nos Infrastructures
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
              Un environnement adapté
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {facilities.map((facility, index) => (
              <div key={index} className="card hover:shadow-lg transition-shadow p-6">
                <div className="p-3 bg-gsnsd-blue/10 rounded-xl w-fit mb-4">
                  <facility.icon className="w-6 h-6 text-gsnsd-blue" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{facility.title}</h3>
                <p className="text-sm text-gray-600">{facility.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-gsnsd-blue to-gsnsd-magenta">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Venez nous rencontrer
          </h2>
          <p className="text-lg text-white/90 mb-8">
            Nous serions ravis de vous accueillir pour une visite de l'établissement.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <Button size="lg" className="bg-white text-gsnsd-blue hover:bg-gray-100 w-full sm:w-auto">
                Planifier une visite
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link to="/admission">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-gsnsd-blue w-full sm:w-auto">
                Procédure d'admission
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default AboutPage
