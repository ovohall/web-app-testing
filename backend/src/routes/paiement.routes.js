import { Router } from 'express'
import { query } from '../config/database.js'
import { authenticate, authorize } from '../middleware/auth.middleware.js'
import { getCurrentSchoolYear } from '../utils/helpers.js'

const router = Router()

router.use(authenticate)

// Get all payments
router.get('/', authorize('admin'), async (req, res) => {
  try {
    const { eleve_id, type_frais, mode_paiement, annee_scolaire, limit = 50, offset = 0 } = req.query

    let sql = `
      SELECT p.*, 
             u.prenom as eleve_prenom, u.nom as eleve_nom,
             parent.prenom as parent_prenom, parent.nom as parent_nom,
             c.nom as classe_nom
      FROM paiements p
      JOIN eleves e ON p.eleve_id = e.id
      JOIN users u ON e.user_id = u.id
      LEFT JOIN users parent ON p.parent_id = parent.id
      LEFT JOIN classes c ON e.classe_id = c.id
      WHERE 1=1
    `
    const params = []

    if (eleve_id) {
      params.push(eleve_id)
      sql += ` AND p.eleve_id = $${params.length}`
    }

    if (type_frais) {
      params.push(type_frais)
      sql += ` AND p.type_frais = $${params.length}`
    }

    if (mode_paiement) {
      params.push(mode_paiement)
      sql += ` AND p.mode_paiement = $${params.length}`
    }

    if (annee_scolaire) {
      params.push(annee_scolaire)
      sql += ` AND p.annee_scolaire = $${params.length}`
    }

    sql += ` ORDER BY p.date_paiement DESC`
    
    params.push(limit)
    sql += ` LIMIT $${params.length}`
    
    params.push(offset)
    sql += ` OFFSET $${params.length}`

    const result = await query(sql, params)

    res.json({ success: true, data: result.rows })
  } catch (error) {
    console.error('Get paiements error:', error)
    res.status(500).json({ success: false, message: 'Erreur serveur' })
  }
})

// Record payment
router.post('/', authorize('admin'), async (req, res) => {
  try {
    const {
      eleve_id,
      parent_id,
      type_frais,
      montant,
      mode_paiement,
      reference,
      mois_concerne,
      notes,
      annee_scolaire
    } = req.body

    if (!eleve_id || !type_frais || !montant || !mode_paiement) {
      return res.status(400).json({
        success: false,
        message: 'Élève, type de frais, montant et mode de paiement requis'
      })
    }

    const result = await query(`
      INSERT INTO paiements (eleve_id, parent_id, type_frais, montant, mode_paiement, 
                            reference, mois_concerne, notes, annee_scolaire, traite_par)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      RETURNING *
    `, [
      eleve_id,
      parent_id || null,
      type_frais,
      montant,
      mode_paiement,
      reference || null,
      mois_concerne || null,
      notes || null,
      annee_scolaire || getCurrentSchoolYear(),
      req.user.id
    ])

    res.status(201).json({ success: true, data: result.rows[0] })
  } catch (error) {
    console.error('Create paiement error:', error)
    res.status(500).json({ success: false, message: 'Erreur serveur' })
  }
})

// Get payment stats
router.get('/stats', authorize('admin'), async (req, res) => {
  try {
    const { annee_scolaire } = req.query
    const year = annee_scolaire || getCurrentSchoolYear()

    const result = await query(`
      SELECT 
        SUM(montant) as total_recettes,
        SUM(montant) FILTER (WHERE type_frais = 'scolarite') as scolarite,
        SUM(montant) FILTER (WHERE type_frais = 'inscription') as inscription,
        SUM(montant) FILTER (WHERE type_frais = 'cantine') as cantine,
        SUM(montant) FILTER (WHERE type_frais = 'transport') as transport,
        COUNT(*) as nombre_paiements,
        COUNT(DISTINCT eleve_id) as eleves_ayant_paye
      FROM paiements
      WHERE annee_scolaire = $1 AND statut = 'paye'
    `, [year])

    res.json({ success: true, data: result.rows[0] })
  } catch (error) {
    console.error('Get paiement stats error:', error)
    res.status(500).json({ success: false, message: 'Erreur serveur' })
  }
})

// Get frais scolaires
router.get('/frais', async (req, res) => {
  try {
    const { annee_scolaire } = req.query
    const year = annee_scolaire || getCurrentSchoolYear()

    const result = await query(
      'SELECT * FROM frais_scolaires WHERE annee_scolaire = $1 AND actif = true ORDER BY niveau',
      [year]
    )

    res.json({ success: true, data: result.rows })
  } catch (error) {
    console.error('Get frais error:', error)
    res.status(500).json({ success: false, message: 'Erreur serveur' })
  }
})

export default router
