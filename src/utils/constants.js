// GSNSD School Constants

export const SCHOOL_INFO = {
  name: 'Groupe Scolaire Ndella Sémou DIOUF',
  abbreviation: 'GSNSD',
  address: 'Cité Doudou BASSE 1, Ndiakhirate, Sénégal',
  phone: '+221 77 XXX XX XX',
  email: 'contact@gsnsd.sn',
  founded: 2015,
  motto: 'Excellence et Valeurs',
}

// Les 4 valeurs essentielles
export const VALEURS = [
  {
    id: 'engagement',
    nom: 'Engagement',
    icon: '🤝',
    color: 'gsnsd-blue',
    colorHex: '#4A9FD8',
    description: 'Implication des parents dans le cheminement scolaire. Encadrement à domicile essentiel à la réussite.',
    details: [
      'Implication des parents dans le cheminement scolaire',
      'Encadrement à domicile essentiel à la réussite',
      'Participation active aux réunions',
      'Suivi régulier des devoirs',
    ],
  },
  {
    id: 'perseverance',
    nom: 'Persévérance',
    icon: '💪',
    color: 'gsnsd-magenta',
    colorHex: '#B64881',
    description: 'Ponctualité des élèves, assiduité et constance dans les efforts pour atteindre les objectifs.',
    details: [
      'Ponctualité des élèves',
      'Assiduité et constance dans les efforts',
      'Atteinte des objectifs d\'apprentissage',
      'Ne jamais abandonner face aux difficultés',
    ],
  },
  {
    id: 'respect',
    nom: 'Respect',
    icon: '🤗',
    color: 'green',
    colorHex: '#10B981',
    description: 'Ouverture et acceptation envers soi-même, respect des autres et de l\'environnement.',
    details: [
      'Ouverture et acceptation envers soi-même',
      'Respect des autres et de l\'environnement',
      'Écoute et tolérance',
      'Vivre ensemble harmonieusement',
    ],
  },
  {
    id: 'fierte',
    nom: 'Fierté',
    icon: '🏆',
    color: 'yellow',
    colorHex: '#F59E0B',
    description: 'Fierté du milieu et de la vie collective, sentiment d\'appartenance à l\'école.',
    details: [
      'Fierté du milieu et de la vie collective',
      'Sentiment d\'appartenance à l\'école',
      'Célébration des réussites',
      'Représenter dignement l\'école',
    ],
  },
]

// Les 3 grandes orientations
export const ORIENTATIONS = [
  {
    id: 1,
    titre: 'Favoriser la persévérance',
    description: 'Favoriser la persévérance pour augmenter la réussite des élèves',
    icon: '📈',
  },
  {
    id: 2,
    titre: 'Développer l\'appartenance',
    description: 'Développer un sentiment d\'appartenance où l\'élève, le personnel et les parents s\'engagent dans la vie scolaire',
    icon: '🏫',
  },
  {
    id: 3,
    titre: 'Conscience citoyenne',
    description: 'Participer activement à une conscience citoyenne pour favoriser un milieu sain et sécuritaire',
    icon: '🌍',
  },
]

// Niveaux scolaires
export const NIVEAUX_PRESCOLAIRE = [
  { id: 'PS', nom: 'Petite Section', abbreviation: 'PS' },
  { id: 'MS', nom: 'Moyenne Section', abbreviation: 'MS' },
  { id: 'GS', nom: 'Grande Section', abbreviation: 'GS' },
]

export const NIVEAUX_ELEMENTAIRE = [
  { id: 'CP', nom: 'Cours Préparatoire', abbreviation: 'CP' },
  { id: 'CE1', nom: 'Cours Élémentaire 1', abbreviation: 'CE1' },
  { id: 'CE2', nom: 'Cours Élémentaire 2', abbreviation: 'CE2' },
  { id: 'CM1', nom: 'Cours Moyen 1', abbreviation: 'CM1' },
  { id: 'CM2', nom: 'Cours Moyen 2', abbreviation: 'CM2' },
]

export const TOUS_NIVEAUX = [...NIVEAUX_PRESCOLAIRE, ...NIVEAUX_ELEMENTAIRE]

// Matières
export const MATIERES = {
  prescolaire: [
    'Langage',
    'Graphisme',
    'Mathématiques',
    'Découverte du monde',
    'Arts plastiques',
    'Éducation physique',
    'Musique',
  ],
  elementaire: [
    'Français',
    'Mathématiques',
    'Sciences',
    'Histoire-Géographie',
    'Éducation civique',
    'Éducation physique',
    'Arts plastiques',
    'Musique',
    'Anglais',
  ],
}

// Jours de la semaine
export const JOURS_SEMAINE = [
  { id: 1, nom: 'Lundi', abbreviation: 'Lun' },
  { id: 2, nom: 'Mardi', abbreviation: 'Mar' },
  { id: 3, nom: 'Mercredi', abbreviation: 'Mer' },
  { id: 4, nom: 'Jeudi', abbreviation: 'Jeu' },
  { id: 5, nom: 'Vendredi', abbreviation: 'Ven' },
  { id: 6, nom: 'Samedi', abbreviation: 'Sam' },
]

// Statuts de présence
export const STATUTS_PRESENCE = {
  present: { label: 'Présent', color: 'green', icon: '✓' },
  absent: { label: 'Absent', color: 'red', icon: '✗' },
  retard: { label: 'Retard', color: 'yellow', icon: '⏰' },
  excuse: { label: 'Excusé', color: 'blue', icon: '📝' },
}

// Modes de paiement
export const MODES_PAIEMENT = [
  { id: 'orange_money', nom: 'Orange Money', icon: '📱', color: 'orange' },
  { id: 'wave', nom: 'Wave', icon: '💳', color: 'blue' },
  { id: 'free_money', nom: 'Free Money', icon: '📲', color: 'green' },
  { id: 'especes', nom: 'Espèces', icon: '💵', color: 'green' },
  { id: 'cheque', nom: 'Chèque', icon: '📄', color: 'gray' },
]

// Types de frais
export const TYPES_FRAIS = [
  { id: 'inscription', nom: 'Frais d\'inscription' },
  { id: 'scolarite', nom: 'Frais de scolarité' },
  { id: 'cantine', nom: 'Cantine' },
  { id: 'transport', nom: 'Transport' },
  { id: 'fournitures', nom: 'Fournitures scolaires' },
  { id: 'uniforme', nom: 'Uniforme' },
]

// Trimestres
export const TRIMESTRES = [
  { id: 1, nom: 'Premier Trimestre', periode: 'Octobre - Décembre' },
  { id: 2, nom: 'Deuxième Trimestre', periode: 'Janvier - Mars' },
  { id: 3, nom: 'Troisième Trimestre', periode: 'Avril - Juin' },
]

// Couleurs de la palette
export const COLORS = {
  primary: '#4A9FD8',
  secondary: '#B64881',
  success: '#10B981',
  warning: '#F59E0B',
  danger: '#EF4444',
  info: '#3B82F6',
  gray: '#6B7280',
}

// Navigation links par rôle
export const NAV_LINKS = {
  public: [
    { path: '/', label: 'Accueil' },
    { path: '/a-propos', label: 'À propos' },
    { path: '/programmes', label: 'Programmes' },
    { path: '/nos-valeurs', label: 'Nos Valeurs' },
    { path: '/admission', label: 'Admission' },
    { path: '/actualites', label: 'Actualités' },
    { path: '/contact', label: 'Contact' },
  ],
  eleve: [
    { path: '/eleve/tableau-de-bord', label: 'Tableau de bord', icon: 'Home' },
    { path: '/eleve/emploi-du-temps', label: 'Emploi du temps', icon: 'Calendar' },
    { path: '/eleve/notes', label: 'Notes', icon: 'BookOpen' },
    { path: '/eleve/devoirs', label: 'Devoirs', icon: 'FileText' },
    { path: '/eleve/presences', label: 'Présences', icon: 'CheckSquare' },
    { path: '/eleve/reussites', label: 'Réussites', icon: 'Award' },
  ],
  enseignant: [
    { path: '/enseignant/tableau-de-bord', label: 'Tableau de bord', icon: 'Home' },
    { path: '/enseignant/classes', label: 'Mes Classes', icon: 'Users' },
    { path: '/enseignant/presences', label: 'Présences', icon: 'CheckSquare' },
    { path: '/enseignant/notes', label: 'Notes', icon: 'BookOpen' },
    { path: '/enseignant/devoirs', label: 'Devoirs', icon: 'FileText' },
    { path: '/enseignant/observations', label: 'Observations', icon: 'MessageSquare' },
    { path: '/enseignant/parents', label: 'Parents', icon: 'UserPlus' },
  ],
  admin: [
    { path: '/admin/tableau-de-bord', label: 'Tableau de bord', icon: 'Home' },
    { path: '/admin/eleves', label: 'Élèves', icon: 'Users' },
    { path: '/admin/parents', label: 'Parents', icon: 'UserPlus' },
    { path: '/admin/enseignants', label: 'Enseignants', icon: 'GraduationCap' },
    { path: '/admin/classes', label: 'Classes', icon: 'Building' },
    { path: '/admin/emploi-du-temps', label: 'Emploi du temps', icon: 'Calendar' },
    { path: '/admin/finances', label: 'Finances', icon: 'DollarSign' },
    { path: '/admin/paiements', label: 'Paiements', icon: 'CreditCard' },
    { path: '/admin/communication', label: 'Communication', icon: 'MessageCircle' },
    { path: '/admin/evenements', label: 'Événements', icon: 'CalendarDays' },
    { path: '/admin/rapports', label: 'Rapports', icon: 'BarChart3' },
    { path: '/admin/parametres', label: 'Paramètres', icon: 'Settings' },
  ],
}
