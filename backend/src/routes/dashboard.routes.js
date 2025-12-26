import { Router } from 'express'
import { query } from '../config/database.js'
import { authenticate, authorize } from '../middleware/auth.middleware.js'
import { getCurrentSchoolYear } from '../utils/helpers.js'

const router = Router()

router.use(authenticate)

// Admin dashboard stats
router.get('/admin', authorize('admin'), async (req, res) => {
  try {
    const anneeScolaire = getCurrentSchoolYear()

    // Get counts
    const [
      elevesResult,
      enseignantsResult,
      classesResult,
      presenceResult,
      paiementsResult
    ] = await Promise.all([
      // Total students
      query(`
        SELECT 
          COUNT(*) as total,
          COUNT(*) FILTER (WHERE c.niveau IN ('PS', 'MS', 'GS')) as prescolaire,
          COUNT(*) FILTER (WHERE c.niveau IN ('CP', 'CE1', 'CE2', 'CM1', 'CM2')) as elementaire
        FROM eleves e
        LEFT JOIN classes c ON e.classe_id = c.id
        WHERE e.statut = 'actif'
      `),
      // Total teachers
      query('SELECT COUNT(*) as total FROM enseignants'),
      // Total classes
      query(`SELECT COUNT(*) as total FROM classes WHERE annee_scolaire = $1`, [anneeScolaire]),
      // Today's attendance
      query(`
        SELECT 
          COUNT(*) FILTER (WHERE statut = 'present') as presents,
          COUNT(*) FILTER (WHERE statut = 'absent') as absents,
          COUNT(*) FILTER (WHERE statut = 'retard') as retards,
          COUNT(*) as total
        FROM presences
        WHERE date = CURRENT_DATE
      `),
      // This month's payments
      query(`
        SELECT 
          COALESCE(SUM(montant), 0) as total_mois,
          COUNT(*) as nombre_paiements
        FROM paiements
        WHERE EXTRACT(MONTH FROM date_paiement) = EXTRACT(MONTH FROM CURRENT_DATE)
          AND EXTRACT(YEAR FROM date_paiement) = EXTRACT(YEAR FROM CURRENT_DATE)
          AND statut = 'paye'
      `)
    ])

    // Attendance rate
    const presence = presenceResult.rows[0]
    const tauxPresence = presence.total > 0 
      ? ((presence.presents / presence.total) * 100).toFixed(1)
      : 0

    res.json({
      success: true,
      data: {
        effectifs: {
          total: parseInt(elevesResult.rows[0].total),
          prescolaire: parseInt(elevesResult.rows[0].prescolaire),
          elementaire: parseInt(elevesResult.rows[0].elementaire)
        },
        enseignants: parseInt(enseignantsResult.rows[0].total),
        classes: parseInt(classesResult.rows[0].total),
        presence: {
          ...presence,
          tauxPresence: parseFloat(tauxPresence)
        },
        finances: {
          recettesMois: parseFloat(paiementsResult.rows[0].total_mois),
          nombrePaiements: parseInt(paiementsResult.rows[0].nombre_paiements)
        },
        anneeScolaire
      }
    })
  } catch (error) {
    console.error('Admin dashboard error:', error)
    res.status(500).json({ success: false, message: 'Erreur serveur' })
  }
})

// Teacher dashboard
router.get('/enseignant', authorize('enseignant', 'admin'), async (req, res) => {
  try {
    const userId = req.user.id

    // Get teacher's classes
    const classesResult = await query(`
      SELECT c.*, 
             (SELECT COUNT(*) FROM eleves e WHERE e.classe_id = c.id AND e.statut = 'actif') as effectif
      FROM classes c
      WHERE c.enseignant_principal_id = $1
      ORDER BY c.niveau, c.nom
    `, [userId])

    // Get today's schedule
    const scheduleResult = await query(`
      SELECT edt.*, m.nom as matiere_nom, c.nom as classe_nom
      FROM emploi_du_temps edt
      JOIN matieres m ON edt.matiere_id = m.id
      JOIN classes c ON edt.classe_id = c.id
      WHERE edt.enseignant_id = $1 AND edt.jour_semaine = EXTRACT(DOW FROM CURRENT_DATE)
      ORDER BY edt.heure_debut
    `, [userId])

    res.json({
      success: true,
      data: {
        classes: classesResult.rows,
        emploiDuTemps: scheduleResult.rows
      }
    })
  } catch (error) {
    console.error('Teacher dashboard error:', error)
    res.status(500).json({ success: false, message: 'Erreur serveur' })
  }
})

// Student dashboard
router.get('/eleve', authorize('eleve', 'admin'), async (req, res) => {
  try {
    // Get student info
    const eleveResult = await query(`
      SELECT e.*, c.nom as classe_nom, c.niveau
      FROM eleves e
      LEFT JOIN classes c ON e.classe_id = c.id
      WHERE e.user_id = $1
    `, [req.user.id])

    if (eleveResult.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Élève non trouvé' })
    }

    const eleve = eleveResult.rows[0]

    // Get recent grades
    const notesResult = await query(`
      SELECT n.*, m.nom as matiere_nom
      FROM notes n
      JOIN matieres m ON n.matiere_id = m.id
      WHERE n.eleve_id = $1
      ORDER BY n.date_evaluation DESC
      LIMIT 10
    `, [eleve.id])

    // Get attendance stats
    const presenceResult = await query(`
      SELECT 
        COUNT(*) FILTER (WHERE statut = 'present') as presents,
        COUNT(*) FILTER (WHERE statut = 'absent') as absents,
        COUNT(*) FILTER (WHERE statut = 'retard') as retards,
        COUNT(*) as total
      FROM presences
      WHERE eleve_id = $1
        AND EXTRACT(YEAR FROM date) = EXTRACT(YEAR FROM CURRENT_DATE)
    `, [eleve.id])

    res.json({
      success: true,
      data: {
        eleve,
        notes: notesResult.rows,
        presence: presenceResult.rows[0]
      }
    })
  } catch (error) {
    console.error('Student dashboard error:', error)
    res.status(500).json({ success: false, message: 'Erreur serveur' })
  }
})

export default router
