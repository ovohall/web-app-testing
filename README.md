# 🎓 Groupe Scolaire Ndella Sémou DIOUF (GSNSD)

Système de gestion scolaire moderne pour le Groupe Scolaire Ndella Sémou DIOUF, une école maternelle et primaire privée située à Ndiakhirate, Sénégal.

## 🏫 À Propos

GSNSD est une école fondée sur 4 valeurs essentielles:
- **Engagement** - Implication des parents dans le cheminement scolaire
- **Persévérance** - Ponctualité et assiduité des élèves
- **Respect** - Ouverture et acceptation envers soi-même et les autres
- **Fierté** - Sentiment d'appartenance à l'école

## 🚀 Démarrage Rapide

### Prérequis
- Node.js 18+
- PostgreSQL 14+

### Installation

1. **Installer les dépendances**
```bash
# Frontend
npm install

# Backend
cd backend && npm install
```

2. **Configurer la base de données**
```bash
# Démarrer PostgreSQL
sudo service postgresql start

# Créer la base de données
sudo -u postgres psql -c "CREATE DATABASE gsnsd_db;"
sudo -u postgres psql -c "ALTER USER postgres PASSWORD 'postgres';"

# Initialiser les tables
cd backend && npm run db:init
```

3. **Démarrer les serveurs**
```bash
# Option 1: Script de démarrage (démarre tout)
./start.sh

# Option 2: Démarrer séparément
# Terminal 1 - Backend
cd backend && npm start

# Terminal 2 - Frontend
npm run dev
```

## 🔐 Connexion

### Compte Administrateur (Directeur)
- **Email:** mayare.mbaye@gsnsd.sn
- **Mot de passe:** 1234

Ce compte a tous les accès et peut:
- Créer de nouveaux utilisateurs (enseignants, élèves, parents)
- Déléguer des permissions
- Gérer les finances
- Voir tous les rapports

## 📁 Structure du Projet

```
/workspace
├── src/                    # Frontend React
│   ├── components/         # Composants réutilisables
│   ├── context/           # Contextes React (Auth)
│   ├── pages/             # Pages de l'application
│   │   ├── public/        # Pages publiques
│   │   ├── auth/          # Authentification
│   │   ├── admin/         # Portail administrateur
│   │   ├── enseignant/    # Portail enseignant
│   │   └── eleve/         # Portail élève
│   ├── services/          # Services API
│   └── utils/             # Utilitaires
├── backend/               # Backend Node.js/Express
│   └── src/
│       ├── config/        # Configuration (DB)
│       ├── controllers/   # Contrôleurs
│       ├── middleware/    # Middleware (Auth)
│       ├── routes/        # Routes API
│       └── utils/         # Utilitaires
└── start.sh               # Script de démarrage
```

## 🔌 API Endpoints

### Authentification
- `POST /api/auth/login` - Connexion
- `POST /api/auth/logout` - Déconnexion
- `GET /api/auth/me` - Utilisateur courant
- `POST /api/auth/change-password` - Changer mot de passe

### Utilisateurs
- `GET /api/users` - Liste des utilisateurs
- `POST /api/users` - Créer un utilisateur
- `PUT /api/users/:id` - Modifier un utilisateur
- `DELETE /api/users/:id` - Supprimer un utilisateur
- `PATCH /api/users/:id/permissions` - Modifier permissions

### Élèves
- `GET /api/eleves` - Liste des élèves
- `POST /api/eleves` - Inscrire un élève
- `GET /api/eleves/:id/notes` - Notes d'un élève
- `GET /api/eleves/:id/presences` - Présences d'un élève

### Classes
- `GET /api/classes` - Liste des classes
- `POST /api/classes` - Créer une classe
- `GET /api/classes/:id/eleves` - Élèves d'une classe

### Notes
- `GET /api/notes/classe/:id` - Notes d'une classe
- `POST /api/notes` - Saisir une note

### Présences
- `GET /api/presences/classe/:id` - Présences d'une classe
- `POST /api/presences/appel` - Faire l'appel

### Paiements
- `GET /api/paiements` - Liste des paiements
- `POST /api/paiements` - Enregistrer un paiement
- `GET /api/paiements/stats` - Statistiques financières

### Dashboard
- `GET /api/dashboard/admin` - Dashboard administrateur
- `GET /api/dashboard/enseignant` - Dashboard enseignant
- `GET /api/dashboard/eleve` - Dashboard élève

## 🛠️ Technologies

### Frontend
- React 18
- React Router v7
- Tailwind CSS
- Lucide React (icônes)
- React Hot Toast

### Backend
- Node.js
- Express.js
- PostgreSQL
- JWT (authentification)
- bcryptjs (hachage)

## 📝 Variables d'Environnement

### Frontend (.env)
```
VITE_API_URL=http://localhost:5000/api
```

### Backend (backend/.env)
```
NODE_ENV=development
PORT=5000
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/gsnsd_db
JWT_SECRET=your_secret_key
JWT_EXPIRE=7d
FRONTEND_URL=http://localhost:5173
```

## 🎓 Niveaux Scolaires

### Préscolaire (Maternelle)
- PS - Petite Section
- MS - Moyenne Section
- GS - Grande Section

### Élémentaire (Primaire)
- CP - Cours Préparatoire
- CE1 - Cours Élémentaire 1
- CE2 - Cours Élémentaire 2
- CM1 - Cours Moyen 1
- CM2 - Cours Moyen 2

## 📞 Contact

**Groupe Scolaire Ndella Sémou DIOUF**
- Adresse: Cité Doudou BASSE 1, Ndiakhirate, Sénégal
- Email: contact@gsnsd.sn

---

Développé avec ❤️ pour l'éducation au Sénégal 🇸🇳
