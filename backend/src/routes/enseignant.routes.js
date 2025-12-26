import { Router } from 'express'
import { query } from '../config/database.js'
import { authenticate, authorize } from '../middleware/auth.middleware.js'

const router = Router()

router.use(authenticate)

// Get all teachers
router.get('/', authorize('admin'), async (req, res) => {
  try {
    const result = await query(`
      SELECT e.*, u.email, u.prenom, u.nom, u.telephone, u.photo_url, u.is_active,
             c.nom as classe_principale_nom
      FROM enseignants e
      JOIN users u ON e.user_id = u.id
      LEFT JOIN classes c ON c.enseignant_principal_id = u.id
      ORDER BY u.nom, u.prenom
    `)

    res.json({
      success: true,
      data: result.rows
    })
  } catch (error) {
    console.error('Get enseignants error:', error)
    res.status(500).json({ success: false, message: 'Erreur serveur' })
  }
})

// Get teacher by ID
router.get('/:id', async (req, res) => {
  try {
    const result = await query(`
      SELECT e.*, u.email, u.prenom, u.nom, u.telephone, u.photo_url, u.is_active
      FROM enseignants e
      JOIN users u ON e.user_id = u.id
      WHERE e.id = $1
    `, [req.params.id])

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Enseignant non trouvé' })
    }

    res.json({ success: true, data: result.rows[0] })
  } catch (error) {
    console.error('Get enseignant error:', error)
    res.status(500).json({ success: false, message: 'Erreur serveur' })
  }
})

// Get teacher's classes
router.get('/:id/classes', async (req, res) => {
  try {
    const result = await query(`
      SELECT c.*, 
             (SELECT COUNT(*) FROM eleves e WHERE e.classe_id = c.id AND e.statut = 'actif') as effectif
      FROM classes c
      WHERE c.enseignant_principal_id = (SELECT user_id FROM enseignants WHERE id = $1)
      ORDER BY c.niveau, c.nom
    `, [req.params.id])

    res.json({ success: true, data: result.rows })
  } catch (error) {
    console.error('Get enseignant classes error:', error)
    res.status(500).json({ success: false, message: 'Erreur serveur' })
  }
})

export default router
