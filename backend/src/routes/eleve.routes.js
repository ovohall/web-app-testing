import { Router } from 'express'
import {
  getAllEleves,
  getEleveById,
  createEleve,
  updateEleve,
  getEleveNotes,
  getElevePresences
} from '../controllers/eleve.controller.js'
import { authenticate, authorize } from '../middleware/auth.middleware.js'

const router = Router()

router.use(authenticate)

router.get('/', authorize('admin', 'enseignant'), getAllEleves)
router.get('/:id', getAllEleves)
router.get('/:id/notes', getEleveNotes)
router.get('/:id/presences', getElevePresences)
router.post('/', authorize('admin'), createEleve)
router.put('/:id', authorize('admin'), updateEleve)

export default router
