import dotenv from 'dotenv'
import pg from 'pg'
import bcrypt from 'bcryptjs'

dotenv.config()

const { Pool } = pg

async function initializeDatabase() {
  // Support DATABASE_URL for cloud deployments
  const poolConfig = process.env.DATABASE_URL 
    ? {
        connectionString: process.env.DATABASE_URL,
        ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
      }
    : {
        host: process.env.DB_HOST || 'localhost',
        port: parseInt(process.env.DB_PORT) || 5432,
        database: process.env.DB_NAME || 'gsnsd_db',
        user: process.env.DB_USER || 'postgres',
        password: process.env.DB_PASSWORD || 'postgres',
      }
  
  const pool = new Pool(poolConfig)

  try {
    console.log('🚀 Initializing database...')

    // Create tables
    await pool.query(`
      -- Users table
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        role VARCHAR(50) NOT NULL CHECK (role IN ('admin', 'enseignant', 'eleve', 'parent')),
        prenom VARCHAR(100) NOT NULL,
        nom VARCHAR(100) NOT NULL,
        telephone VARCHAR(20),
        date_naissance DATE,
        adresse TEXT,
        photo_url TEXT,
        titre VARCHAR(100),
        is_active BOOLEAN DEFAULT true,
        is_super BOOLEAN DEFAULT false,
        permissions JSONB DEFAULT '{}',
        created_by INTEGER REFERENCES users(id),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        last_login TIMESTAMP
      );

      -- Classes table
      CREATE TABLE IF NOT EXISTS classes (
        id SERIAL PRIMARY KEY,
        nom VARCHAR(50) NOT NULL,
        niveau VARCHAR(20) NOT NULL CHECK (niveau IN ('PS', 'MS', 'GS', 'CP', 'CE1', 'CE2', 'CM1', 'CM2')),
        annee_scolaire VARCHAR(20) NOT NULL,
        enseignant_principal_id INTEGER REFERENCES users(id),
        effectif_max INTEGER DEFAULT 35,
        salle VARCHAR(50),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      -- Eleves table (extends users)
      CREATE TABLE IF NOT EXISTS eleves (
        id SERIAL PRIMARY KEY,
        user_id INTEGER UNIQUE REFERENCES users(id) ON DELETE CASCADE,
        matricule VARCHAR(50) UNIQUE NOT NULL,
        classe_id INTEGER REFERENCES classes(id),
        date_naissance DATE NOT NULL,
        lieu_naissance VARCHAR(100),
        sexe VARCHAR(10) CHECK (sexe IN ('M', 'F')),
        nationalite VARCHAR(50) DEFAULT 'Sénégalaise',
        adresse_domicile TEXT,
        info_medicale TEXT,
        allergies TEXT,
        groupe_sanguin VARCHAR(5),
        parent1_id INTEGER REFERENCES users(id),
        parent2_id INTEGER REFERENCES users(id),
        statut VARCHAR(20) DEFAULT 'actif' CHECK (statut IN ('actif', 'inactif', 'transfere', 'radie')),
        date_inscription DATE DEFAULT CURRENT_DATE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      -- Enseignants table (extends users)
      CREATE TABLE IF NOT EXISTS enseignants (
        id SERIAL PRIMARY KEY,
        user_id INTEGER UNIQUE REFERENCES users(id) ON DELETE CASCADE,
        matricule VARCHAR(50) UNIQUE NOT NULL,
        date_embauche DATE,
        specialite VARCHAR(100),
        matieres TEXT[],
        experience_annees INTEGER DEFAULT 0,
        diplomes TEXT[],
        statut_contrat VARCHAR(50) DEFAULT 'CDI',
        salaire_mensuel DECIMAL(10,2),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      -- Parents table (extends users)
      CREATE TABLE IF NOT EXISTS parents (
        id SERIAL PRIMARY KEY,
        user_id INTEGER UNIQUE REFERENCES users(id) ON DELETE CASCADE,
        civilite VARCHAR(10) CHECK (civilite IN ('M.', 'Mme', 'Mlle')),
        lien_parente VARCHAR(50),
        profession VARCHAR(100),
        lieu_travail VARCHAR(100),
        telephone_secondaire VARCHAR(20),
        personne_urgence VARCHAR(100),
        telephone_urgence VARCHAR(20),
        niveau_engagement INTEGER DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      -- Matieres table
      CREATE TABLE IF NOT EXISTS matieres (
        id SERIAL PRIMARY KEY,
        nom VARCHAR(100) NOT NULL,
        code VARCHAR(20) UNIQUE NOT NULL,
        coefficient DECIMAL(3,1) DEFAULT 1.0,
        niveau VARCHAR(20),
        description TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      -- Emploi du temps
      CREATE TABLE IF NOT EXISTS emploi_du_temps (
        id SERIAL PRIMARY KEY,
        classe_id INTEGER REFERENCES classes(id) ON DELETE CASCADE,
        matiere_id INTEGER REFERENCES matieres(id),
        enseignant_id INTEGER REFERENCES users(id),
        jour_semaine INTEGER CHECK (jour_semaine BETWEEN 1 AND 6),
        heure_debut TIME NOT NULL,
        heure_fin TIME NOT NULL,
        salle VARCHAR(50),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      -- Notes
      CREATE TABLE IF NOT EXISTS notes (
        id SERIAL PRIMARY KEY,
        eleve_id INTEGER REFERENCES eleves(id) ON DELETE CASCADE,
        matiere_id INTEGER REFERENCES matieres(id),
        enseignant_id INTEGER REFERENCES users(id),
        note DECIMAL(5,2) NOT NULL CHECK (note >= 0 AND note <= 20),
        note_max DECIMAL(5,2) DEFAULT 20,
        coefficient DECIMAL(3,1) DEFAULT 1.0,
        type_evaluation VARCHAR(50) NOT NULL,
        trimestre INTEGER CHECK (trimestre BETWEEN 1 AND 3),
        annee_scolaire VARCHAR(20) NOT NULL,
        date_evaluation DATE NOT NULL,
        observation TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      -- Presences
      CREATE TABLE IF NOT EXISTS presences (
        id SERIAL PRIMARY KEY,
        eleve_id INTEGER REFERENCES eleves(id) ON DELETE CASCADE,
        classe_id INTEGER REFERENCES classes(id),
        date DATE NOT NULL,
        statut VARCHAR(20) NOT NULL CHECK (statut IN ('present', 'absent', 'retard', 'excuse')),
        heure_arrivee TIME,
        justification TEXT,
        justifie BOOLEAN DEFAULT false,
        marque_par INTEGER REFERENCES users(id),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(eleve_id, date)
      );

      -- Devoirs
      CREATE TABLE IF NOT EXISTS devoirs (
        id SERIAL PRIMARY KEY,
        classe_id INTEGER REFERENCES classes(id) ON DELETE CASCADE,
        matiere_id INTEGER REFERENCES matieres(id),
        enseignant_id INTEGER REFERENCES users(id),
        titre VARCHAR(255) NOT NULL,
        description TEXT,
        date_donnee DATE DEFAULT CURRENT_DATE,
        date_rendu DATE NOT NULL,
        fichier_url TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      -- Devoirs soumis par les élèves
      CREATE TABLE IF NOT EXISTS devoirs_eleves (
        id SERIAL PRIMARY KEY,
        devoir_id INTEGER REFERENCES devoirs(id) ON DELETE CASCADE,
        eleve_id INTEGER REFERENCES eleves(id) ON DELETE CASCADE,
        fichier_url TEXT,
        date_soumission TIMESTAMP,
        note DECIMAL(5,2),
        commentaire TEXT,
        statut VARCHAR(20) DEFAULT 'a_faire' CHECK (statut IN ('a_faire', 'soumis', 'corrige')),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(devoir_id, eleve_id)
      );

      -- Frais scolaires
      CREATE TABLE IF NOT EXISTS frais_scolaires (
        id SERIAL PRIMARY KEY,
        annee_scolaire VARCHAR(20) NOT NULL,
        niveau VARCHAR(20) NOT NULL,
        frais_inscription DECIMAL(10,2) DEFAULT 0,
        frais_scolarite_mensuel DECIMAL(10,2) DEFAULT 0,
        frais_cantine_mensuel DECIMAL(10,2) DEFAULT 0,
        frais_transport_mensuel DECIMAL(10,2) DEFAULT 0,
        frais_fournitures DECIMAL(10,2) DEFAULT 0,
        frais_uniforme DECIMAL(10,2) DEFAULT 0,
        actif BOOLEAN DEFAULT true,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(annee_scolaire, niveau)
      );

      -- Paiements
      CREATE TABLE IF NOT EXISTS paiements (
        id SERIAL PRIMARY KEY,
        eleve_id INTEGER REFERENCES eleves(id) ON DELETE CASCADE,
        parent_id INTEGER REFERENCES users(id),
        annee_scolaire VARCHAR(20) NOT NULL,
        type_frais VARCHAR(50) NOT NULL,
        montant DECIMAL(10,2) NOT NULL,
        mode_paiement VARCHAR(50) NOT NULL CHECK (mode_paiement IN ('orange_money', 'wave', 'free_money', 'especes', 'cheque', 'virement')),
        reference VARCHAR(100),
        mois_concerne VARCHAR(20),
        statut VARCHAR(20) DEFAULT 'paye' CHECK (statut IN ('paye', 'partiel', 'annule')),
        date_paiement TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        recu_url TEXT,
        notes TEXT,
        traite_par INTEGER REFERENCES users(id),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      -- Evenements
      CREATE TABLE IF NOT EXISTS evenements (
        id SERIAL PRIMARY KEY,
        titre VARCHAR(255) NOT NULL,
        description TEXT,
        type VARCHAR(50) NOT NULL,
        date_debut DATE NOT NULL,
        date_fin DATE,
        heure_debut TIME,
        heure_fin TIME,
        lieu VARCHAR(255),
        public_cible VARCHAR(50) DEFAULT 'tous',
        organisateur_id INTEGER REFERENCES users(id),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      -- Messages/Communications
      CREATE TABLE IF NOT EXISTS messages (
        id SERIAL PRIMARY KEY,
        expediteur_id INTEGER REFERENCES users(id),
        destinataire_id INTEGER REFERENCES users(id),
        sujet VARCHAR(255) NOT NULL,
        contenu TEXT NOT NULL,
        lu BOOLEAN DEFAULT false,
        important BOOLEAN DEFAULT false,
        date_envoi TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      -- Annonces
      CREATE TABLE IF NOT EXISTS annonces (
        id SERIAL PRIMARY KEY,
        titre VARCHAR(255) NOT NULL,
        contenu TEXT NOT NULL,
        type VARCHAR(50) DEFAULT 'information',
        public_cible VARCHAR(50) DEFAULT 'tous',
        classe_id INTEGER REFERENCES classes(id),
        auteur_id INTEGER REFERENCES users(id),
        date_publication TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        date_expiration DATE,
        important BOOLEAN DEFAULT false
      );

      -- Sessions (for JWT refresh tokens)
      CREATE TABLE IF NOT EXISTS sessions (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        refresh_token TEXT NOT NULL,
        expires_at TIMESTAMP NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        ip_address VARCHAR(50),
        user_agent TEXT
      );

      -- Create indexes
      CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
      CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);
      CREATE INDEX IF NOT EXISTS idx_eleves_classe ON eleves(classe_id);
      CREATE INDEX IF NOT EXISTS idx_notes_eleve ON notes(eleve_id);
      CREATE INDEX IF NOT EXISTS idx_presences_eleve_date ON presences(eleve_id, date);
      CREATE INDEX IF NOT EXISTS idx_paiements_eleve ON paiements(eleve_id);
      CREATE INDEX IF NOT EXISTS idx_messages_destinataire ON messages(destinataire_id);
    `)

    console.log('✅ Tables created successfully')

    // Check if admin exists
    const adminCheck = await pool.query(
      'SELECT id FROM users WHERE email = $1',
      [process.env.ADMIN_EMAIL || 'mayare.mbaye@gsnsd.sn']
    )

    if (adminCheck.rows.length === 0) {
      // Create default admin (Mayare MBAYE)
      const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD || '1234', 10)
      
      await pool.query(`
        INSERT INTO users (email, password_hash, role, prenom, nom, titre, is_super, permissions)
        VALUES ($1, $2, 'admin', $3, $4, 'Directeur', true, $5)
      `, [
        process.env.ADMIN_EMAIL || 'mayare.mbaye@gsnsd.sn',
        hashedPassword,
        process.env.ADMIN_PRENOM || 'Mayare',
        process.env.ADMIN_NOM || 'MBAYE',
        JSON.stringify({
          canCreateUsers: true,
          canDeleteUsers: true,
          canManageFinances: true,
          canManageStudents: true,
          canManageTeachers: true,
          canManageClasses: true,
          canViewReports: true,
          canDelegateAccess: true,
          isSuper: true
        })
      ])
      
      console.log('✅ Default admin created: mayare.mbaye@gsnsd.sn / 1234')
    } else {
      console.log('ℹ️ Admin already exists')
    }

    // Insert default matieres
    const matieresCheck = await pool.query('SELECT COUNT(*) FROM matieres')
    if (parseInt(matieresCheck.rows[0].count) === 0) {
      await pool.query(`
        INSERT INTO matieres (nom, code, coefficient, niveau) VALUES
        ('Français', 'FR', 3, 'elementaire'),
        ('Mathématiques', 'MATH', 3, 'elementaire'),
        ('Histoire-Géographie', 'HG', 2, 'elementaire'),
        ('Sciences', 'SCI', 2, 'elementaire'),
        ('Anglais', 'ANG', 2, 'elementaire'),
        ('Éducation Physique', 'EPS', 1, 'elementaire'),
        ('Éducation Civique', 'EC', 1, 'elementaire'),
        ('Arts Plastiques', 'ART', 1, 'elementaire'),
        ('Musique', 'MUS', 1, 'elementaire'),
        ('Éveil', 'EVL', 2, 'prescolaire'),
        ('Graphisme', 'GRA', 2, 'prescolaire'),
        ('Langage', 'LAN', 2, 'prescolaire')
      `)
      console.log('✅ Default matieres inserted')
    }

    // Insert default frais scolaires
    const fraisCheck = await pool.query('SELECT COUNT(*) FROM frais_scolaires')
    if (parseInt(fraisCheck.rows[0].count) === 0) {
      const anneeScolaire = '2024-2025'
      await pool.query(`
        INSERT INTO frais_scolaires (annee_scolaire, niveau, frais_inscription, frais_scolarite_mensuel, frais_cantine_mensuel, frais_transport_mensuel) VALUES
        ($1, 'PS', 25000, 25000, 15000, 10000),
        ($1, 'MS', 25000, 25000, 15000, 10000),
        ($1, 'GS', 25000, 25000, 15000, 10000),
        ($1, 'CP', 30000, 30000, 15000, 10000),
        ($1, 'CE1', 30000, 30000, 15000, 10000),
        ($1, 'CE2', 30000, 30000, 15000, 10000),
        ($1, 'CM1', 35000, 35000, 15000, 10000),
        ($1, 'CM2', 35000, 35000, 15000, 10000)
      `, [anneeScolaire])
      console.log('✅ Default frais scolaires inserted')
    }

    console.log('🎉 Database initialization complete!')
    
  } catch (error) {
    console.error('❌ Error initializing database:', error)
    throw error
  } finally {
    await pool.end()
  }
}

initializeDatabase()
