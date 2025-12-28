import { Router } from 'express'
import { 
  login, 
  logout, 
  refreshToken, 
  getMe, 
  changePassword 
} from '../controllers/auth.controller.js'
import { authenticate } from '../middleware/auth.middleware.js'

const router = Router()

// Public routes
router.post('/login', login)
router.post('/logout', logout)
router.post('/refresh-token', refreshToken)

// Protected routes
router.get('/me', authenticate, getMe)
router.post('/change-password', authenticate, changePassword)

export default router
