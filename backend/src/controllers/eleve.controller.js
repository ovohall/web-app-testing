import { query, getClient } from '../config/database.js'
import { hashPassword, generateMatricule } from '../utils/helpers.js'

// Get all students
export const getAllEleves = async (req, res) => {
  try {
    const { classe_id, niveau, search, statut = 'actif', limit = 50, offset = 0 } = req.query

    let sql = `
      SELECT e.*, u.email, u.prenom, u.nom, u.telephone, u.photo_url, u.is_active,
             c.nom as classe_nom, c.niveau
      FROM eleves e
      JOIN users u ON e.user_id = u.id
      LEFT JOIN classes c ON e.classe_id = c.id
      WHERE 1=1
    `
    const params = []
    let paramCount = 0

    if (statut) {
      paramCount++
      sql += ` AND e.statut = $${paramCount}`
      params.push(statut)
    }

    if (classe_id) {
      paramCount++
      sql += ` AND e.classe_id = $${paramCount}`
      params.push(classe_id)
    }

    if (niveau) {
      paramCount++
      sql += ` AND c.niveau = $${paramCount}`
      params.push(niveau)
    }

    if (search) {
      paramCount++
      sql += ` AND (u.prenom ILIKE $${paramCount} OR u.nom ILIKE $${paramCount} OR e.matricule ILIKE $${paramCount})`
      params.push(`%${search}%`)
    }

    sql += ` ORDER BY u.nom, u.prenom`
    
    paramCount++
    sql += ` LIMIT $${paramCount}`
    params.push(parseInt(limit))
    
    paramCount++
    sql += ` OFFSET $${paramCount}`
    params.push(parseInt(offset))

    const result = await query(sql, params)

    res.json({
      success: true,
      data: result.rows
    })
  } catch (error) {
    console.error('Get all eleves error:', error)
    res.status(500).json({
      success: false,
      message: 'Erreur serveur'
    })
  }
}

// Get student by ID
export const getEleveById = async (req, res) => {
  try {
    const { id } = req.params

    const result = await query(`
      SELECT e.*, u.email, u.prenom, u.nom, u.telephone, u.photo_url, u.is_active, u.created_at,
             c.nom as classe_nom, c.niveau,
             p1.prenom as parent1_prenom, p1.nom as parent1_nom, p1.telephone as parent1_tel,
             p2.prenom as parent2_prenom, p2.nom as parent2_nom, p2.telephone as parent2_tel
      FROM eleves e
      JOIN users u ON e.user_id = u.id
      LEFT JOIN classes c ON e.classe_id = c.id
      LEFT JOIN users p1 ON e.parent1_id = p1.id
      LEFT JOIN users p2 ON e.parent2_id = p2.id
      WHERE e.id = $1
    `, [id])

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Élève non trouvé'
      })
    }

    res.json({
      success: true,
      data: result.rows[0]
    })
  } catch (error) {
    console.error('Get eleve by ID error:', error)
    res.status(500).json({
      success: false,
      message: 'Erreur serveur'
    })
  }
}

// Create student
export const createEleve = async (req, res) => {
  const client = await getClient()
  
  try {
    const {
      email,
      prenom,
      nom,
      date_naissance,
      lieu_naissance,
      sexe,
      classe_id,
      adresse_domicile,
      info_medicale,
      allergies,
      groupe_sanguin,
      parent1_id,
      parent2_id
    } = req.body

    if (!email || !prenom || !nom || !date_naissance) {
      return res.status(400).json({
        success: false,
        message: 'Email, prénom, nom et date de naissance requis'
      })
    }

    // Check if email exists
    const existingUser = await client.query(
      'SELECT id FROM users WHERE email = $1',
      [email.toLowerCase().trim()]
    )

    if (existingUser.rows.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Un compte avec cet email existe déjà'
      })
    }

    await client.query('BEGIN')

    // Create user account
    const passwordHash = await hashPassword('1234')
    const userResult = await client.query(
      `INSERT INTO users (email, password_hash, role, prenom, nom, date_naissance, permissions, created_by)
       VALUES ($1, $2, 'eleve', $3, $4, $5, $6, $7)
       RETURNING id`,
      [
        email.toLowerCase().trim(),
        passwordHash,
        prenom,
        nom,
        date_naissance,
        JSON.stringify({ canViewOwnGrades: true, canViewSchedule: true, canViewHomework: true, canSubmitHomework: true }),
        req.user.id
      ]
    )

    const userId = userResult.rows[0].id
    const matricule = generateMatricule('ELV')

    // Create eleve record
    const eleveResult = await client.query(
      `INSERT INTO eleves (user_id, matricule, classe_id, date_naissance, lieu_naissance, sexe, 
                          adresse_domicile, info_medicale, allergies, groupe_sanguin, parent1_id, parent2_id)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
       RETURNING *`,
      [userId, matricule, classe_id || null, date_naissance, lieu_naissance, sexe,
       adresse_domicile, info_medicale, allergies, groupe_sanguin, parent1_id, parent2_id]
    )

    await client.query('COMMIT')

    res.status(201).json({
      success: true,
      message: 'Élève inscrit avec succès',
      data: {
        ...eleveResult.rows[0],
        email,
        prenom,
        nom
      }
    })
  } catch (error) {
    await client.query('ROLLBACK')
    console.error('Create eleve error:', error)
    res.status(500).json({
      success: false,
      message: 'Erreur lors de l\'inscription'
    })
  } finally {
    client.release()
  }
}

// Update student
export const updateEleve = async (req, res) => {
  try {
    const { id } = req.params
    const { classe_id, adresse_domicile, info_medicale, allergies, statut, parent1_id, parent2_id } = req.body

    const result = await query(
      `UPDATE eleves 
       SET classe_id = COALESCE($1, classe_id),
           adresse_domicile = COALESCE($2, adresse_domicile),
           info_medicale = COALESCE($3, info_medicale),
           allergies = COALESCE($4, allergies),
           statut = COALESCE($5, statut),
           parent1_id = COALESCE($6, parent1_id),
           parent2_id = COALESCE($7, parent2_id),
           updated_at = CURRENT_TIMESTAMP
       WHERE id = $8
       RETURNING *`,
      [classe_id, adresse_domicile, info_medicale, allergies, statut, parent1_id, parent2_id, id]
    )

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Élève non trouvé'
      })
    }

    res.json({
      success: true,
      message: 'Élève mis à jour',
      data: result.rows[0]
    })
  } catch (error) {
    console.error('Update eleve error:', error)
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la mise à jour'
    })
  }
}

// Get student grades
export const getEleveNotes = async (req, res) => {
  try {
    const { id } = req.params
    const { trimestre, annee_scolaire } = req.query

    let sql = `
      SELECT n.*, m.nom as matiere_nom, m.coefficient as matiere_coef,
             u.prenom as enseignant_prenom, u.nom as enseignant_nom
      FROM notes n
      JOIN matieres m ON n.matiere_id = m.id
      LEFT JOIN users u ON n.enseignant_id = u.id
      WHERE n.eleve_id = $1
    `
    const params = [id]

    if (trimestre) {
      sql += ` AND n.trimestre = $${params.length + 1}`
      params.push(trimestre)
    }

    if (annee_scolaire) {
      sql += ` AND n.annee_scolaire = $${params.length + 1}`
      params.push(annee_scolaire)
    }

    sql += ` ORDER BY n.date_evaluation DESC`

    const result = await query(sql, params)

    res.json({
      success: true,
      data: result.rows
    })
  } catch (error) {
    console.error('Get eleve notes error:', error)
    res.status(500).json({
      success: false,
      message: 'Erreur serveur'
    })
  }
}

// Get student attendance
export const getElevePresences = async (req, res) => {
  try {
    const { id } = req.params
    const { mois, annee } = req.query

    let sql = `
      SELECT p.*, u.prenom as marque_par_prenom, u.nom as marque_par_nom
      FROM presences p
      LEFT JOIN users u ON p.marque_par = u.id
      WHERE p.eleve_id = $1
    `
    const params = [id]

    if (mois && annee) {
      sql += ` AND EXTRACT(MONTH FROM p.date) = $${params.length + 1}`
      sql += ` AND EXTRACT(YEAR FROM p.date) = $${params.length + 2}`
      params.push(mois, annee)
    }

    sql += ` ORDER BY p.date DESC`

    const result = await query(sql, params)

    res.json({
      success: true,
      data: result.rows
    })
  } catch (error) {
    console.error('Get eleve presences error:', error)
    res.status(500).json({
      success: false,
      message: 'Erreur serveur'
    })
  }
}
