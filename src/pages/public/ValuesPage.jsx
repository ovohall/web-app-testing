import { Link } from 'react-router-dom'
import { ArrowRight, CheckCircle, Quote } from 'lucide-react'
import { VALEURS, ORIENTATIONS } from '../../utils/constants'
import Button from '../../components/common/Button'

const ValuesPage = () => {
  const valuesDetails = {
    engagement: {
      examples: [
        'Participer régulièrement aux réunions parents-enseignants',
        'Suivre les devoirs et travaux de votre enfant à la maison',
        'Communiquer avec les enseignants sur les progrès de votre enfant',
        'S\'impliquer dans les activités et événements scolaires',
        'Créer un environnement d\'étude favorable à la maison',
      ],
      quote: 'L\'engagement des parents est le socle de la réussite scolaire.',
    },
    perseverance: {
      examples: [
        'Arriver à l\'heure tous les jours',
        'Faire ses devoirs avec constance et régularité',
        'Ne pas abandonner face aux difficultés',
        'Travailler pour atteindre ses objectifs d\'apprentissage',
        'Maintenir l\'effort même quand c\'est difficile',
      ],
      quote: 'La persévérance transforme les obstacles en opportunités.',
    },
    respect: {
      examples: [
        'Respecter les enseignants, le personnel et les camarades',
        'Prendre soin du matériel scolaire et des locaux',
        'Écouter et accepter les différences des autres',
        'Utiliser un langage poli et respectueux',
        'Protéger l\'environnement et le cadre de vie',
      ],
      quote: 'Le respect mutuel crée un environnement où chacun peut s\'épanouir.',
    },
    fierte: {
      examples: [
        'Porter fièrement l\'uniforme de l\'école',
        'Représenter dignement l\'école lors des événements',
        'Célébrer les réussites, petites et grandes',
        'Développer un sentiment d\'appartenance à la communauté',
        'Être fier de son travail et de ses progrès',
      ],
      quote: 'La fierté d\'appartenir à une communauté renforce l\'estime de soi.',
    },
  }

  return (
    <div>
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-gray-900 to-gray-800 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-gsnsd-blue/20 to-gsnsd-magenta/20" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block px-4 py-1 bg-white/10 text-white text-sm font-medium rounded-full mb-6">
            Nos Fondements
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Les Quatre Valeurs Essentielles
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Ces valeurs guident notre approche pédagogique et façonnent 
            les citoyens de demain que nous formons.
          </p>
          
          {/* Values icons row */}
          <div className="flex justify-center gap-4 mt-12">
            {VALEURS.map((valeur) => (
              <div 
                key={valeur.id}
                className="flex flex-col items-center p-4 bg-white/10 backdrop-blur-sm rounded-xl"
              >
                <span className="text-4xl">{valeur.icon}</span>
                <span className="text-white font-medium mt-2">{valeur.nom}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Detail Sections */}
      {VALEURS.map((valeur, index) => {
        const details = valuesDetails[valeur.id]
        const isEven = index % 2 === 0
        
        return (
          <section 
            key={valeur.id} 
            id={valeur.id}
            className={`py-20 scroll-mt-20 ${isEven ? 'bg-white' : 'bg-gray-50'}`}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className={`grid lg:grid-cols-2 gap-12 items-center ${!isEven ? 'lg:flex-row-reverse' : ''}`}>
                <div className={!isEven ? 'lg:order-2' : ''}>
                  <div className="flex items-center gap-4 mb-6">
                    <div className={`p-4 rounded-2xl ${
                      index === 0 ? 'bg-gsnsd-blue/10' :
                      index === 1 ? 'bg-gsnsd-magenta/10' :
                      index === 2 ? 'bg-green-100' : 'bg-yellow-100'
                    }`}>
                      <span className="text-5xl">{valeur.icon}</span>
                    </div>
                    <div>
                      <span className={`inline-block px-3 py-1 text-sm font-medium rounded-full ${
                        index === 0 ? 'bg-gsnsd-blue/10 text-gsnsd-blue' :
                        index === 1 ? 'bg-gsnsd-magenta/10 text-gsnsd-magenta' :
                        index === 2 ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        Valeur {index + 1}
                      </span>
                      <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-2">
                        {valeur.nom}
                      </h2>
                    </div>
                  </div>

                  <p className="text-lg text-gray-600 leading-relaxed mb-8">
                    {valeur.description}
                  </p>

                  <div className="space-y-3">
                    {valeur.details.map((detail, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <CheckCircle className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                          index === 0 ? 'text-gsnsd-blue' :
                          index === 1 ? 'text-gsnsd-magenta' :
                          index === 2 ? 'text-green-600' : 'text-yellow-600'
                        }`} />
                        <span className="text-gray-700">{detail}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className={!isEven ? 'lg:order-1' : ''}>
                  <div className={`p-8 rounded-3xl ${
                    index === 0 ? 'bg-gradient-to-br from-gsnsd-blue/10 to-gsnsd-blue/5' :
                    index === 1 ? 'bg-gradient-to-br from-gsnsd-magenta/10 to-gsnsd-magenta/5' :
                    index === 2 ? 'bg-gradient-to-br from-green-100 to-green-50' : 
                    'bg-gradient-to-br from-yellow-100 to-yellow-50'
                  }`}>
                    <h3 className="font-bold text-gray-900 mb-6">Comment pratiquer cette valeur :</h3>
                    <ul className="space-y-4">
                      {details.examples.map((example, i) => (
                        <li key={i} className="flex items-start gap-3 bg-white/50 p-3 rounded-lg">
                          <span className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold text-white ${
                            index === 0 ? 'bg-gsnsd-blue' :
                            index === 1 ? 'bg-gsnsd-magenta' :
                            index === 2 ? 'bg-green-600' : 'bg-yellow-600'
                          }`}>
                            {i + 1}
                          </span>
                          <span className="text-gray-700">{example}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-8 p-4 bg-white rounded-xl">
                      <Quote className={`w-8 h-8 mb-2 ${
                        index === 0 ? 'text-gsnsd-blue' :
                        index === 1 ? 'text-gsnsd-magenta' :
                        index === 2 ? 'text-green-600' : 'text-yellow-600'
                      }`} />
                      <p className="text-gray-700 italic">"{details.quote}"</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )
      })}

      {/* Orientations Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block px-4 py-1 bg-white/10 text-white text-sm font-medium rounded-full mb-4">
              Notre Vision
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold">
              Nos Trois Grandes Orientations
            </h2>
            <p className="mt-4 text-lg text-gray-400">
              Ces orientations stratégiques guident notre action quotidienne.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {ORIENTATIONS.map((orientation) => (
              <div 
                key={orientation.id}
                className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all"
              >
                <div className="text-5xl mb-6">{orientation.icon}</div>
                <h3 className="text-xl font-bold mb-4">{orientation.titre}</h3>
                <p className="text-gray-400 leading-relaxed">{orientation.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-gsnsd-blue to-gsnsd-magenta">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Rejoignez une école qui a des valeurs
          </h2>
          <p className="text-lg text-white/90 mb-8">
            Offrez à votre enfant une éducation fondée sur l'excellence et les valeurs humaines.
          </p>
          <Link to="/admission">
            <Button size="lg" className="bg-white text-gsnsd-blue hover:bg-gray-100">
              Inscrivez votre enfant
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}

export default ValuesPage
