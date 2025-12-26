import { Router } from 'express'
import { query } from '../config/database.js'
import { authenticate, authorize } from '../middleware/auth.middleware.js'
import { getCurrentSchoolYear, getCurrentTrimester } from '../utils/helpers.js'

const router = Router()

router.use(authenticate)

// Get notes for a class
router.get('/classe/:classeId', authorize('admin', 'enseignant'), async (req, res) => {
  try {
    const { classeId } = req.params
    const { matiere_id, trimestre, annee_scolaire } = req.query

    let sql = `
      SELECT n.*, 
             u.prenom as eleve_prenom, u.nom as eleve_nom,
             m.nom as matiere_nom,
             ens.prenom as enseignant_prenom, ens.nom as enseignant_nom
      FROM notes n
      JOIN eleves e ON n.eleve_id = e.id
      JOIN users u ON e.user_id = u.id
      JOIN matieres m ON n.matiere_id = m.id
      LEFT JOIN users ens ON n.enseignant_id = ens.id
      WHERE e.classe_id = $1
    `
    const params = [classeId]

    if (matiere_id) {
      params.push(matiere_id)
      sql += ` AND n.matiere_id = $${params.length}`
    }

    if (trimestre) {
      params.push(trimestre)
      sql += ` AND n.trimestre = $${params.length}`
    }

    if (annee_scolaire) {
      params.push(annee_scolaire)
      sql += ` AND n.annee_scolaire = $${params.length}`
    }

    sql += ` ORDER BY u.nom, u.prenom, n.date_evaluation DESC`

    const result = await query(sql, params)

    res.json({ success: true, data: result.rows })
  } catch (error) {
    console.error('Get notes classe error:', error)
    res.status(500).json({ success: false, message: 'Erreur serveur' })
  }
})

// Add note
router.post('/', authorize('admin', 'enseignant'), async (req, res) => {
  try {
    const {
      eleve_id,
      matiere_id,
      note,
      note_max = 20,
      coefficient = 1,
      type_evaluation,
      date_evaluation,
      observation,
      trimestre,
      annee_scolaire
    } = req.body

    if (!eleve_id || !matiere_id || note === undefined || !type_evaluation || !date_evaluation) {
      return res.status(400).json({
        success: false,
        message: 'Élève, matière, note, type et date requis'
      })
    }

    const result = await query(`
      INSERT INTO notes (eleve_id, matiere_id, enseignant_id, note, note_max, coefficient, 
                        type_evaluation, date_evaluation, observation, trimestre, annee_scolaire)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
      RETURNING *
    `, [
      eleve_id,
      matiere_id,
      req.user.id,
      note,
      note_max,
      coefficient,
      type_evaluation,
      date_evaluation,
      observation,
      trimestre || getCurrentTrimester(),
      annee_scolaire || getCurrentSchoolYear()
    ])

    res.status(201).json({ success: true, data: result.rows[0] })
  } catch (error) {
    console.error('Add note error:', error)
    res.status(500).json({ success: false, message: 'Erreur serveur' })
  }
})

// Update note
router.put('/:id', authorize('admin', 'enseignant'), async (req, res) => {
  try {
    const { note, observation } = req.body

    const result = await query(`
      UPDATE notes
      SET note = COALESCE($1, note),
          observation = COALESCE($2, observation)
      WHERE id = $3
      RETURNING *
    `, [note, observation, req.params.id])

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Note non trouvée' })
    }

    res.json({ success: true, data: result.rows[0] })
  } catch (error) {
    console.error('Update note error:', error)
    res.status(500).json({ success: false, message: 'Erreur serveur' })
  }
})

// Delete note
router.delete('/:id', authorize('admin', 'enseignant'), async (req, res) => {
  try {
    const result = await query('DELETE FROM notes WHERE id = $1 RETURNING id', [req.params.id])

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Note non trouvée' })
    }

    res.json({ success: true, message: 'Note supprimée' })
  } catch (error) {
    console.error('Delete note error:', error)
    res.status(500).json({ success: false, message: 'Erreur serveur' })
  }
})

// Get matieres
router.get('/matieres', async (req, res) => {
  try {
    const result = await query('SELECT * FROM matieres ORDER BY nom')
    res.json({ success: true, data: result.rows })
  } catch (error) {
    console.error('Get matieres error:', error)
    res.status(500).json({ success: false, message: 'Erreur serveur' })
  }
})

export default router
