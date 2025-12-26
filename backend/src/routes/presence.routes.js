import { Router } from 'express'
import { query } from '../config/database.js'
import { authenticate, authorize } from '../middleware/auth.middleware.js'

const router = Router()

router.use(authenticate)

// Get attendance for a class on a date
router.get('/classe/:classeId', authorize('admin', 'enseignant'), async (req, res) => {
  try {
    const { classeId } = req.params
    const { date } = req.query

    if (!date) {
      return res.status(400).json({ success: false, message: 'Date requise' })
    }

    // Get all students in class with their attendance for the date
    const result = await query(`
      SELECT e.id as eleve_id, e.matricule, u.prenom, u.nom,
             p.id as presence_id, p.statut, p.heure_arrivee, p.justification, p.justifie
      FROM eleves e
      JOIN users u ON e.user_id = u.id
      LEFT JOIN presences p ON e.id = p.eleve_id AND p.date = $2
      WHERE e.classe_id = $1 AND e.statut = 'actif'
      ORDER BY u.nom, u.prenom
    `, [classeId, date])

    res.json({ success: true, data: result.rows })
  } catch (error) {
    console.error('Get presences error:', error)
    res.status(500).json({ success: false, message: 'Erreur serveur' })
  }
})

// Mark attendance (bulk)
router.post('/appel', authorize('admin', 'enseignant'), async (req, res) => {
  try {
    const { classe_id, date, presences } = req.body

    if (!classe_id || !date || !presences || !Array.isArray(presences)) {
      return res.status(400).json({
        success: false,
        message: 'Classe, date et liste de présences requis'
      })
    }

    // Upsert each presence
    for (const p of presences) {
      await query(`
        INSERT INTO presences (eleve_id, classe_id, date, statut, heure_arrivee, justification, justifie, marque_par)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        ON CONFLICT (eleve_id, date)
        DO UPDATE SET statut = $4, heure_arrivee = $5, justification = $6, justifie = $7, marque_par = $8
      `, [
        p.eleve_id,
        classe_id,
        date,
        p.statut,
        p.heure_arrivee || null,
        p.justification || null,
        p.justifie || false,
        req.user.id
      ])
    }

    res.json({ success: true, message: 'Appel enregistré' })
  } catch (error) {
    console.error('Mark attendance error:', error)
    res.status(500).json({ success: false, message: 'Erreur serveur' })
  }
})

// Get attendance stats for a class
router.get('/stats/:classeId', authorize('admin', 'enseignant'), async (req, res) => {
  try {
    const { classeId } = req.params
    const { mois, annee } = req.query

    let dateFilter = ''
    const params = [classeId]

    if (mois && annee) {
      dateFilter = ` AND EXTRACT(MONTH FROM p.date) = $2 AND EXTRACT(YEAR FROM p.date) = $3`
      params.push(mois, annee)
    }

    const result = await query(`
      SELECT 
        COUNT(*) FILTER (WHERE p.statut = 'present') as presents,
        COUNT(*) FILTER (WHERE p.statut = 'absent') as absents,
        COUNT(*) FILTER (WHERE p.statut = 'retard') as retards,
        COUNT(*) FILTER (WHERE p.statut = 'excuse') as excuses,
        COUNT(*) as total
      FROM presences p
      JOIN eleves e ON p.eleve_id = e.id
      WHERE e.classe_id = $1 ${dateFilter}
    `, params)

    res.json({ success: true, data: result.rows[0] })
  } catch (error) {
    console.error('Get presence stats error:', error)
    res.status(500).json({ success: false, message: 'Erreur serveur' })
  }
})

export default router
