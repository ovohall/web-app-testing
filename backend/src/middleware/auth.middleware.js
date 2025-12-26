import jwt from 'jsonwebtoken'
import { query } from '../config/database.js'

// Verify JWT token
export const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'Token d\'authentification requis'
      })
    }

    const token = authHeader.split(' ')[1]
    
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      
      // Get user from database
      const result = await query(
        'SELECT id, email, role, prenom, nom, titre, is_active, is_super, permissions FROM users WHERE id = $1',
        [decoded.userId]
      )

      if (result.rows.length === 0) {
        return res.status(401).json({
          success: false,
          message: 'Utilisateur non trouvé'
        })
      }

      const user = result.rows[0]

      if (!user.is_active) {
        return res.status(401).json({
          success: false,
          message: 'Compte désactivé'
        })
      }

      req.user = user
      next()
    } catch (jwtError) {
      if (jwtError.name === 'TokenExpiredError') {
        return res.status(401).json({
          success: false,
          message: 'Token expiré',
          code: 'TOKEN_EXPIRED'
        })
      }
      return res.status(401).json({
        success: false,
        message: 'Token invalide'
      })
    }
  } catch (error) {
    console.error('Auth middleware error:', error)
    return res.status(500).json({
      success: false,
      message: 'Erreur serveur'
    })
  }
}

// Check if user has required role
export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Non authentifié'
      })
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: 'Accès refusé - Permissions insuffisantes'
      })
    }

    next()
  }
}

// Check specific permission
export const hasPermission = (permission) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Non authentifié'
      })
    }

    // Super admin has all permissions
    if (req.user.is_super) {
      return next()
    }

    const userPermissions = req.user.permissions || {}
    
    if (!userPermissions[permission]) {
      return res.status(403).json({
        success: false,
        message: 'Accès refusé - Permission requise: ' + permission
      })
    }

    next()
  }
}

// Check if user is super admin
export const isSuperAdmin = (req, res, next) => {
  if (!req.user || !req.user.is_super) {
    return res.status(403).json({
      success: false,
      message: 'Accès réservé au directeur'
    })
  }
  next()
}
