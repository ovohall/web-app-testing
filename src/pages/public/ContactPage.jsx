import { useState } from 'react'
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send,
  CheckCircle,
  Facebook,
  MessageCircle,
  Building,
  User,
  FileText,
  ArrowRight
} from 'lucide-react'
import { Card, Button, Input } from '../../components/common'
import { SCHOOL_INFO, VALEURS } from '../../utils/constants'

const MOTIFS_CONTACT = [
  { value: '', label: 'Sélectionnez un motif' },
  { value: 'inscription', label: 'Demande d\'inscription' },
  { value: 'information', label: 'Demande d\'informations' },
  { value: 'rdv', label: 'Prise de rendez-vous' },
  { value: 'reclamation', label: 'Réclamation' },
  { value: 'partenariat', label: 'Proposition de partenariat' },
  { value: 'autre', label: 'Autre' }
]

const FAQ = [
  {
    question: "Quels sont les documents requis pour l'inscription ?",
    answer: "Pour l'inscription, vous aurez besoin de : l'extrait de naissance de l'enfant, le carnet de vaccination à jour, 4 photos d'identité, le certificat de résidence, et les bulletins scolaires des années précédentes (si applicable)."
  },
  {
    question: "Quels sont les modes de paiement acceptés ?",
    answer: "Nous acceptons les paiements par Orange Money, Wave, Free Money, espèces et chèques. Des facilités de paiement en plusieurs mensualités sont disponibles."
  },
  {
    question: "Y a-t-il un service de cantine ?",
    answer: "Oui, nous proposons un service de cantine avec des repas équilibrés préparés sur place. Le menu est adapté aux besoins nutritionnels des enfants."
  },
  {
    question: "Proposez-vous un transport scolaire ?",
    answer: "Oui, un service de transport scolaire est disponible pour les quartiers environnants. Contactez-nous pour connaître les trajets et tarifs."
  },
  {
    question: "Quelles sont les activités périscolaires proposées ?",
    answer: "Nous proposons diverses activités : sport, arts plastiques, musique, danse traditionnelle, initiation à l'informatique, et clubs de lecture."
  }
]

export default function ContactPage() {
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    telephone: '',
    motif: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [openFaq, setOpenFaq] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulation d'envoi
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    setIsSubmitting(false)
    setIsSubmitted(true)
    setFormData({
      nom: '',
      prenom: '',
      email: '',
      telephone: '',
      motif: '',
      message: ''
    })
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gsnsd-magenta to-gsnsd-magenta-dark text-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full mb-6">
              <MessageCircle className="w-5 h-5" />
              <span className="text-sm font-medium">Contactez-nous</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6">
              Nous sommes à votre écoute
            </h1>
            <p className="text-xl text-pink-100">
              Une question ? Une demande d'information ? N'hésitez pas à nous contacter. 
              Notre équipe vous répondra dans les plus brefs délais.
            </p>
          </div>
        </div>
      </section>

      {/* Coordonnées et Formulaire */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Informations de contact */}
            <div className="lg:col-span-1 space-y-6">
              {/* Adresse */}
              <Card className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-gsnsd-blue/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-gsnsd-blue" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-gray-800 mb-2">Adresse</h3>
                    <p className="text-gray-600">
                      {SCHOOL_INFO.address.street}<br />
                      {SCHOOL_INFO.address.city}, {SCHOOL_INFO.address.country}
                    </p>
                  </div>
                </div>
              </Card>

              {/* Téléphone */}
              <Card className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-gsnsd-magenta/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-gsnsd-magenta" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-gray-800 mb-2">Téléphone</h3>
                    <p className="text-gray-600">
                      <a href={`tel:${SCHOOL_INFO.phone}`} className="hover:text-gsnsd-blue transition-colors">
                        {SCHOOL_INFO.phone}
                      </a>
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      Du lundi au vendredi
                    </p>
                  </div>
                </div>
              </Card>

              {/* Email */}
              <Card className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-gray-800 mb-2">Email</h3>
                    <p className="text-gray-600">
                      <a href={`mailto:${SCHOOL_INFO.email}`} className="hover:text-gsnsd-blue transition-colors">
                        {SCHOOL_INFO.email}
                      </a>
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      Réponse sous 24-48h
                    </p>
                  </div>
                </div>
              </Card>

              {/* Horaires */}
              <Card className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-yellow-600" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-gray-800 mb-2">Horaires du secrétariat</h3>
                    <div className="text-gray-600 text-sm space-y-1">
                      <p><span className="font-medium">Lundi - Vendredi :</span> 08h00 - 17h00</p>
                      <p><span className="font-medium">Samedi :</span> 08h00 - 12h00</p>
                      <p><span className="font-medium">Dimanche :</span> Fermé</p>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Réseaux sociaux */}
              <Card className="p-6 bg-gradient-to-br from-gsnsd-blue to-gsnsd-blue-dark text-white">
                <h3 className="font-heading font-bold mb-4">Suivez-nous</h3>
                <p className="text-blue-100 text-sm mb-4">
                  Restez connectés avec la communauté GSNSD sur les réseaux sociaux.
                </p>
                <div className="flex gap-3">
                  <a 
                    href={SCHOOL_INFO.social.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center hover:bg-white/30 transition-colors"
                  >
                    <Facebook className="w-5 h-5" />
                  </a>
                </div>
              </Card>
            </div>

            {/* Formulaire de contact */}
            <div className="lg:col-span-2">
              <Card className="p-8">
                {isSubmitted ? (
                  <div className="text-center py-12">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle className="w-10 h-10 text-green-600" />
                    </div>
                    <h3 className="text-2xl font-heading font-bold text-gray-800 mb-4">
                      Message envoyé avec succès !
                    </h3>
                    <p className="text-gray-600 mb-6 max-w-md mx-auto">
                      Merci de nous avoir contactés. Notre équipe vous répondra dans les plus brefs délais, 
                      généralement sous 24 à 48 heures.
                    </p>
                    <Button 
                      variant="primary"
                      onClick={() => setIsSubmitted(false)}
                    >
                      Envoyer un autre message
                    </Button>
                  </div>
                ) : (
                  <>
                    <div className="mb-8">
                      <h2 className="text-2xl font-heading font-bold text-gray-800 mb-2">
                        Envoyez-nous un message
                      </h2>
                      <p className="text-gray-600">
                        Remplissez le formulaire ci-dessous et nous vous répondrons rapidement.
                      </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Input
                          label="Nom"
                          name="nom"
                          value={formData.nom}
                          onChange={handleChange}
                          placeholder="Votre nom"
                          icon={<User className="w-5 h-5" />}
                          required
                        />
                        <Input
                          label="Prénom"
                          name="prenom"
                          value={formData.prenom}
                          onChange={handleChange}
                          placeholder="Votre prénom"
                          icon={<User className="w-5 h-5" />}
                          required
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Input
                          label="Email"
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="votre@email.com"
                          icon={<Mail className="w-5 h-5" />}
                          required
                        />
                        <Input
                          label="Téléphone"
                          type="tel"
                          name="telephone"
                          value={formData.telephone}
                          onChange={handleChange}
                          placeholder="+221 XX XXX XX XX"
                          icon={<Phone className="w-5 h-5" />}
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Motif de contact <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <FileText className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <select
                            name="motif"
                            value={formData.motif}
                            onChange={handleChange}
                            required
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gsnsd-blue focus:border-transparent appearance-none bg-white"
                          >
                            {MOTIFS_CONTACT.map(motif => (
                              <option key={motif.value} value={motif.value}>
                                {motif.label}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Votre message <span className="text-red-500">*</span>
                        </label>
                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          placeholder="Écrivez votre message ici..."
                          rows={5}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gsnsd-blue focus:border-transparent resize-none"
                        />
                      </div>

                      <div className="flex items-start gap-3">
                        <input
                          type="checkbox"
                          id="consent"
                          required
                          className="mt-1 w-4 h-4 text-gsnsd-blue border-gray-300 rounded focus:ring-gsnsd-blue"
                        />
                        <label htmlFor="consent" className="text-sm text-gray-600">
                          J'accepte que mes données soient utilisées pour traiter ma demande. 
                          Consultez notre politique de confidentialité pour en savoir plus.
                        </label>
                      </div>

                      <Button 
                        type="submit" 
                        variant="primary" 
                        size="lg" 
                        className="w-full"
                        loading={isSubmitting}
                      >
                        <Send className="w-5 h-5 mr-2" />
                        Envoyer le message
                      </Button>
                    </form>
                  </>
                )}
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Carte Google Maps */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <Card className="overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-xl font-heading font-bold text-gray-800 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-gsnsd-blue" />
                Nous trouver
              </h2>
            </div>
            <div className="h-96 bg-gray-200">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3859.0!2d-17.4!3d14.7!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTTCsDQyJzAwLjAiTiAxN8KwMjQnMDAuMCJX!5e0!3m2!1sfr!2ssn!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Localisation GSNSD"
              />
            </div>
          </Card>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-heading font-bold text-gray-800 mb-4">
                Questions fréquentes
              </h2>
              <p className="text-gray-600">
                Trouvez rapidement des réponses à vos questions
              </p>
            </div>

            <div className="space-y-4">
              {FAQ.map((item, index) => (
                <Card 
                  key={index} 
                  className={`overflow-hidden transition-all ${openFaq === index ? 'ring-2 ring-gsnsd-blue' : ''}`}
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                  >
                    <span className="font-semibold text-gray-800 pr-4">{item.question}</span>
                    <ArrowRight 
                      className={`w-5 h-5 text-gsnsd-blue flex-shrink-0 transition-transform ${
                        openFaq === index ? 'rotate-90' : ''
                      }`}
                    />
                  </button>
                  {openFaq === index && (
                    <div className="px-6 pb-6">
                      <p className="text-gray-600">{item.answer}</p>
                    </div>
                  )}
                </Card>
              ))}
            </div>

            <div className="text-center mt-8">
              <p className="text-gray-600 mb-4">
                Vous n'avez pas trouvé la réponse à votre question ?
              </p>
              <Button variant="primary">
                <MessageCircle className="w-5 h-5 mr-2" />
                Contactez-nous directement
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Nos valeurs - Rappel */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-heading font-bold text-gray-800 mb-4">
              Nos valeurs guident chaque échange
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Que ce soit par téléphone, email ou en personne, notre équipe incarne les valeurs de l'école.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {Object.values(VALEURS).map((valeur) => (
              <Card key={valeur.nom} className="p-6 text-center hover:shadow-lg transition-all group">
                <div 
                  className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform"
                  style={{ backgroundColor: valeur.couleur + '20' }}
                >
                  <span className="text-3xl">{valeur.icone}</span>
                </div>
                <h3 className="font-heading font-bold text-gray-800">{valeur.nom}</h3>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
