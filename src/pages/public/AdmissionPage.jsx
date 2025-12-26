import { useState } from 'react'
import { 
  FileText, CheckCircle, Calendar, CreditCard, 
  ArrowRight, Download, Phone, Mail
} from 'lucide-react'
import { NIVEAUX_PRESCOLAIRE, NIVEAUX_ELEMENTAIRE, TOUS_NIVEAUX } from '../../utils/constants'
import Button from '../../components/common/Button'
import Input from '../../components/common/Input'

const AdmissionPage = () => {
  const [formData, setFormData] = useState({
    childFirstName: '',
    childLastName: '',
    childBirthDate: '',
    niveau: '',
    parentFirstName: '',
    parentLastName: '',
    parentPhone: '',
    parentEmail: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Simulate form submission
    setSubmitted(true)
  }

  const steps = [
    {
      icon: FileText,
      title: 'Pré-inscription en ligne',
      description: 'Remplissez le formulaire de pré-inscription ci-dessous',
    },
    {
      icon: Phone,
      title: 'Contact de l\'école',
      description: 'Nous vous contacterons pour fixer un rendez-vous',
    },
    {
      icon: Calendar,
      title: 'Visite et entretien',
      description: 'Rencontrez l\'équipe pédagogique et visitez l\'école',
    },
    {
      icon: CheckCircle,
      title: 'Inscription définitive',
      description: 'Finalisez l\'inscription avec les documents requis',
    },
  ]

  const documents = [
    'Extrait de naissance ou jugement supplétif',
    'Carnet de vaccination à jour',
    'Certificat de scolarité (si transfert)',
    '4 photos d\'identité récentes',
    'Photocopie CNI des parents',
    'Certificat médical d\'aptitude',
  ]

  const fees = {
    prescolaire: {
      inscription: '25 000 FCFA',
      scolarite: '15 000 FCFA/mois',
      cantine: '10 000 FCFA/mois',
    },
    elementaire: {
      inscription: '30 000 FCFA',
      scolarite: '20 000 FCFA/mois',
      cantine: '10 000 FCFA/mois',
    },
  }

  return (
    <div>
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-gsnsd-blue to-gsnsd-magenta overflow-hidden">
        <div className="absolute inset-0 opacity-5 bg-white" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block px-4 py-1 bg-white/20 text-white text-sm font-medium rounded-full mb-6">
            Inscriptions Ouvertes
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Processus d'Admission
          </h1>
          <p className="text-lg text-white/90 max-w-2xl mx-auto">
            Rejoignez la famille GSNSD ! Découvrez les étapes pour inscrire 
            votre enfant dans notre établissement.
          </p>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block px-4 py-1 bg-gsnsd-blue/10 text-gsnsd-blue text-sm font-medium rounded-full mb-4">
              Étapes
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
              Comment s'inscrire ?
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <div className="card p-6 text-center h-full">
                  <div className="w-12 h-12 mx-auto bg-gsnsd-blue/10 rounded-full flex items-center justify-center mb-4">
                    <step.icon className="w-6 h-6 text-gsnsd-blue" />
                  </div>
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-8 h-8 bg-gsnsd-blue rounded-full flex items-center justify-center text-white font-bold">
                    {index + 1}
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2 mt-2">{step.title}</h3>
                  <p className="text-sm text-gray-600">{step.description}</p>
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2">
                    <ArrowRight className="w-6 h-6 text-gray-300" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Fees Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block px-4 py-1 bg-gsnsd-magenta/10 text-gsnsd-magenta text-sm font-medium rounded-full mb-4">
              Tarifs
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
              Frais de Scolarité
            </h2>
            <p className="mt-4 text-gray-600">
              Année scolaire 2024-2025
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Préscolaire */}
            <div className="card p-8">
              <div className="text-center mb-6">
                <span className="px-4 py-1 bg-gsnsd-blue/10 text-gsnsd-blue text-sm font-medium rounded-full">
                  Préscolaire
                </span>
                <h3 className="text-2xl font-bold text-gray-900 mt-4">Maternelle</h3>
                <p className="text-gray-500">PS, MS, GS</p>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-600">Frais d'inscription</span>
                  <span className="font-bold text-gray-900">{fees.prescolaire.inscription}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-600">Scolarité mensuelle</span>
                  <span className="font-bold text-gray-900">{fees.prescolaire.scolarite}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-600">Cantine (optionnel)</span>
                  <span className="font-bold text-gray-900">{fees.prescolaire.cantine}</span>
                </div>
              </div>
            </div>

            {/* Élémentaire */}
            <div className="card p-8 border-2 border-gsnsd-magenta">
              <div className="text-center mb-6">
                <span className="px-4 py-1 bg-gsnsd-magenta/10 text-gsnsd-magenta text-sm font-medium rounded-full">
                  Élémentaire
                </span>
                <h3 className="text-2xl font-bold text-gray-900 mt-4">Primaire</h3>
                <p className="text-gray-500">CP à CM2</p>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-600">Frais d'inscription</span>
                  <span className="font-bold text-gray-900">{fees.elementaire.inscription}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-600">Scolarité mensuelle</span>
                  <span className="font-bold text-gray-900">{fees.elementaire.scolarite}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-600">Cantine (optionnel)</span>
                  <span className="font-bold text-gray-900">{fees.elementaire.cantine}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-gray-600 text-sm">
              * Possibilité de paiement échelonné (3, 6 ou 9 mensualités)
              <br />
              * Réduction accordée pour les fratries
            </p>
          </div>
        </div>
      </section>

      {/* Documents Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block px-4 py-1 bg-gsnsd-blue/10 text-gsnsd-blue text-sm font-medium rounded-full mb-4">
                Documents
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                Documents Requis
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Pour finaliser l'inscription de votre enfant, vous devrez fournir 
                les documents suivants :
              </p>
              <div className="space-y-4">
                {documents.map((doc, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-gsnsd-blue flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{doc}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="card p-8 bg-gradient-to-br from-gsnsd-blue/5 to-gsnsd-magenta/5">
              <h3 className="font-bold text-gray-900 mb-4">Télécharger le dossier complet</h3>
              <p className="text-gray-600 mb-6">
                Obtenez tous les formulaires nécessaires à l'inscription en un seul clic.
              </p>
              <Button icon={Download} className="w-full">
                Télécharger le dossier d'inscription
              </Button>
              <p className="text-sm text-gray-500 mt-4 text-center">
                Format PDF - 245 Ko
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pre-inscription Form */}
      <section className="py-20 bg-gray-50" id="formulaire">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-gsnsd-magenta/10 text-gsnsd-magenta text-sm font-medium rounded-full mb-4">
              Pré-inscription
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
              Formulaire de Pré-inscription
            </h2>
            <p className="mt-4 text-gray-600">
              Remplissez ce formulaire et nous vous contacterons dans les plus brefs délais.
            </p>
          </div>

          {submitted ? (
            <div className="card p-8 text-center">
              <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Demande envoyée !
              </h3>
              <p className="text-gray-600 mb-6">
                Merci pour votre demande de pré-inscription. Notre équipe vous contactera 
                dans les 48 heures pour fixer un rendez-vous.
              </p>
              <p className="text-sm text-gray-500">
                Pour toute question urgente, appelez-nous au +221 77 XXX XX XX
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="card p-8">
              <div className="space-y-6">
                <div>
                  <h3 className="font-bold text-gray-900 mb-4">Informations de l'enfant</h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Input
                      label="Prénom de l'enfant"
                      name="childFirstName"
                      value={formData.childFirstName}
                      onChange={handleChange}
                      required
                    />
                    <Input
                      label="Nom de l'enfant"
                      name="childLastName"
                      value={formData.childLastName}
                      onChange={handleChange}
                      required
                    />
                    <Input
                      label="Date de naissance"
                      type="date"
                      name="childBirthDate"
                      value={formData.childBirthDate}
                      onChange={handleChange}
                      required
                    />
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Niveau souhaité <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="niveau"
                        value={formData.niveau}
                        onChange={handleChange}
                        required
                        className="input"
                      >
                        <option value="">Sélectionnez un niveau</option>
                        <optgroup label="Préscolaire">
                          {NIVEAUX_PRESCOLAIRE.map((n) => (
                            <option key={n.id} value={n.id}>{n.nom}</option>
                          ))}
                        </optgroup>
                        <optgroup label="Élémentaire">
                          {NIVEAUX_ELEMENTAIRE.map((n) => (
                            <option key={n.id} value={n.id}>{n.nom}</option>
                          ))}
                        </optgroup>
                      </select>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-bold text-gray-900 mb-4">Informations du parent</h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Input
                      label="Prénom du parent"
                      name="parentFirstName"
                      value={formData.parentFirstName}
                      onChange={handleChange}
                      required
                    />
                    <Input
                      label="Nom du parent"
                      name="parentLastName"
                      value={formData.parentLastName}
                      onChange={handleChange}
                      required
                    />
                    <Input
                      label="Téléphone"
                      type="tel"
                      name="parentPhone"
                      value={formData.parentPhone}
                      onChange={handleChange}
                      placeholder="+221 77 XXX XX XX"
                      required
                    />
                    <Input
                      label="Email"
                      type="email"
                      name="parentEmail"
                      value={formData.parentEmail}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Message (optionnel)
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="input"
                    placeholder="Questions ou informations complémentaires..."
                  />
                </div>

                <Button type="submit" size="lg" className="w-full">
                  Envoyer la demande de pré-inscription
                </Button>

                <p className="text-sm text-gray-500 text-center">
                  En soumettant ce formulaire, vous acceptez d'être contacté par l'équipe du GSNSD.
                </p>
              </div>
            </form>
          )}
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-gradient-to-r from-gsnsd-blue to-gsnsd-magenta">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Des questions sur les inscriptions ?
          </h2>
          <p className="text-lg text-white/90 mb-8">
            Notre équipe administrative est à votre disposition.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:+221770000000" className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-gsnsd-blue rounded-lg font-medium hover:bg-gray-100 transition-colors">
              <Phone className="w-5 h-5" />
              +221 77 XXX XX XX
            </a>
            <a href="mailto:inscription@gsnsd.sn" className="inline-flex items-center justify-center gap-2 px-6 py-3 border-2 border-white text-white rounded-lg font-medium hover:bg-white hover:text-gsnsd-blue transition-colors">
              <Mail className="w-5 h-5" />
              inscription@gsnsd.sn
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

export default AdmissionPage
