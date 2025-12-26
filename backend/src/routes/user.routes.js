import { Router } from 'express'
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  updatePermissions,
  resetPassword
} from '../controllers/user.controller.js'
import { authenticate, authorize, hasPermission } from '../middleware/auth.middleware.js'

const router = Router()

// All routes require authentication
router.use(authenticate)

// Get all users (admin only)
router.get('/', authorize('admin'), getAllUsers)

// Get user by ID
router.get('/:id', authorize('admin'), getUserById)

// Create user (requires canCreateUsers permission)
router.post('/', hasPermission('canCreateUsers'), createUser)

// Update user
router.put('/:id', authorize('admin'), updateUser)

// Delete user (requires canDeleteUsers permission)
router.delete('/:id', hasPermission('canDeleteUsers'), deleteUser)

// Update permissions (requires canDelegateAccess permission)
router.patch('/:id/permissions', hasPermission('canDelegateAccess'), updatePermissions)

// Reset password
router.post('/:id/reset-password', hasPermission('canCreateUsers'), resetPassword)

export default router
