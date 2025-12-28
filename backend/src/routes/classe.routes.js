import { Router } from 'express'
import { query } from '../config/database.js'
import { authenticate, authorize } from '../middleware/auth.middleware.js'

const router = Router()

router.use(authenticate)

// Get all classes
router.get('/', async (req, res) => {
  try {
    const { niveau, annee_scolaire } = req.query

    let sql = `
      SELECT c.*, 
             u.prenom as enseignant_prenom, u.nom as enseignant_nom,
             (SELECT COUNT(*) FROM eleves e WHERE e.classe_id = c.id AND e.statut = 'actif') as effectif
      FROM classes c
      LEFT JOIN users u ON c.enseignant_principal_id = u.id
      WHERE 1=1
    `
    const params = []

    if (niveau) {
      params.push(niveau)
      sql += ` AND c.niveau = $${params.length}`
    }

    if (annee_scolaire) {
      params.push(annee_scolaire)
      sql += ` AND c.annee_scolaire = $${params.length}`
    }

    sql += ` ORDER BY c.niveau, c.nom`

    const result = await query(sql, params)

    res.json({ success: true, data: result.rows })
  } catch (error) {
    console.error('Get classes error:', error)
    res.status(500).json({ success: false, message: 'Erreur serveur' })
  }
})

// Get class by ID
router.get('/:id', async (req, res) => {
  try {
    const result = await query(`
      SELECT c.*, 
             u.prenom as enseignant_prenom, u.nom as enseignant_nom, u.email as enseignant_email
      FROM classes c
      LEFT JOIN users u ON c.enseignant_principal_id = u.id
      WHERE c.id = $1
    `, [req.params.id])

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Classe non trouvée' })
    }

    res.json({ success: true, data: result.rows[0] })
  } catch (error) {
    console.error('Get classe error:', error)
    res.status(500).json({ success: false, message: 'Erreur serveur' })
  }
})

// Get students in class
router.get('/:id/eleves', async (req, res) => {
  try {
    const result = await query(`
      SELECT e.*, u.prenom, u.nom, u.email, u.photo_url
      FROM eleves e
      JOIN users u ON e.user_id = u.id
      WHERE e.classe_id = $1 AND e.statut = 'actif'
      ORDER BY u.nom, u.prenom
    `, [req.params.id])

    res.json({ success: true, data: result.rows })
  } catch (error) {
    console.error('Get classe eleves error:', error)
    res.status(500).json({ success: false, message: 'Erreur serveur' })
  }
})

// Create class
router.post('/', authorize('admin'), async (req, res) => {
  try {
    const { nom, niveau, annee_scolaire, enseignant_principal_id, effectif_max, salle } = req.body

    if (!nom || !niveau || !annee_scolaire) {
      return res.status(400).json({ success: false, message: 'Nom, niveau et année scolaire requis' })
    }

    const result = await query(`
      INSERT INTO classes (nom, niveau, annee_scolaire, enseignant_principal_id, effectif_max, salle)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *
    `, [nom, niveau, annee_scolaire, enseignant_principal_id, effectif_max || 35, salle])

    res.status(201).json({ success: true, data: result.rows[0] })
  } catch (error) {
    console.error('Create classe error:', error)
    res.status(500).json({ success: false, message: 'Erreur serveur' })
  }
})

// Update class
router.put('/:id', authorize('admin'), async (req, res) => {
  try {
    const { nom, enseignant_principal_id, effectif_max, salle } = req.body

    const result = await query(`
      UPDATE classes
      SET nom = COALESCE($1, nom),
          enseignant_principal_id = COALESCE($2, enseignant_principal_id),
          effectif_max = COALESCE($3, effectif_max),
          salle = COALESCE($4, salle),
          updated_at = CURRENT_TIMESTAMP
      WHERE id = $5
      RETURNING *
    `, [nom, enseignant_principal_id, effectif_max, salle, req.params.id])

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Classe non trouvée' })
    }

    res.json({ success: true, data: result.rows[0] })
  } catch (error) {
    console.error('Update classe error:', error)
    res.status(500).json({ success: false, message: 'Erreur serveur' })
  }
})

export default router
