import { query } from '../config/database.js'
import { 
  generateAccessToken, 
  generateRefreshToken, 
  hashPassword, 
  comparePassword,
  sanitizeUser 
} from '../utils/helpers.js'
import jwt from 'jsonwebtoken'

// Login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email et mot de passe requis'
      })
    }

    // Find user
    const result = await query(
      'SELECT * FROM users WHERE email = $1',
      [email.toLowerCase().trim()]
    )

    if (result.rows.length === 0) {
      return res.status(401).json({
        success: false,
        message: 'Email ou mot de passe incorrect'
      })
    }

    const user = result.rows[0]

    // Check if account is active
    if (!user.is_active) {
      return res.status(401).json({
        success: false,
        message: 'Compte désactivé. Contactez l\'administration.'
      })
    }

    // Verify password
    const isValidPassword = await comparePassword(password, user.password_hash)
    
    if (!isValidPassword) {
      return res.status(401).json({
        success: false,
        message: 'Email ou mot de passe incorrect'
      })
    }

    // Generate tokens
    const accessToken = generateAccessToken(user.id)
    const refreshToken = generateRefreshToken(user.id)

    // Save refresh token to database
    const expiresAt = new Date()
    expiresAt.setDate(expiresAt.getDate() + 30)

    await query(
      `INSERT INTO sessions (user_id, refresh_token, expires_at, ip_address, user_agent)
       VALUES ($1, $2, $3, $4, $5)`,
      [user.id, refreshToken, expiresAt, req.ip, req.headers['user-agent']]
    )

    // Update last login
    await query(
      'UPDATE users SET last_login = CURRENT_TIMESTAMP WHERE id = $1',
      [user.id]
    )

    // Return user data without password
    const safeUser = sanitizeUser(user)

    res.json({
      success: true,
      message: 'Connexion réussie',
      data: {
        user: safeUser,
        accessToken,
        refreshToken
      }
    })
  } catch (error) {
    console.error('Login error:', error)
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la connexion'
    })
  }
}

// Logout
export const logout = async (req, res) => {
  try {
    const { refreshToken } = req.body

    if (refreshToken) {
      await query(
        'DELETE FROM sessions WHERE refresh_token = $1',
        [refreshToken]
      )
    }

    res.json({
      success: true,
      message: 'Déconnexion réussie'
    })
  } catch (error) {
    console.error('Logout error:', error)
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la déconnexion'
    })
  }
}

// Refresh token
export const refreshToken = async (req, res) => {
  try {
    const { refreshToken } = req.body

    if (!refreshToken) {
      return res.status(400).json({
        success: false,
        message: 'Refresh token requis'
      })
    }

    // Verify refresh token
    let decoded
    try {
      decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET)
    } catch (err) {
      return res.status(401).json({
        success: false,
        message: 'Refresh token invalide ou expiré'
      })
    }

    // Check if session exists
    const sessionResult = await query(
      'SELECT * FROM sessions WHERE refresh_token = $1 AND expires_at > NOW()',
      [refreshToken]
    )

    if (sessionResult.rows.length === 0) {
      return res.status(401).json({
        success: false,
        message: 'Session expirée'
      })
    }

    // Get user
    const userResult = await query(
      'SELECT * FROM users WHERE id = $1 AND is_active = true',
      [decoded.userId]
    )

    if (userResult.rows.length === 0) {
      return res.status(401).json({
        success: false,
        message: 'Utilisateur non trouvé'
      })
    }

    const user = userResult.rows[0]

    // Generate new access token
    const newAccessToken = generateAccessToken(user.id)

    res.json({
      success: true,
      data: {
        accessToken: newAccessToken
      }
    })
  } catch (error) {
    console.error('Refresh token error:', error)
    res.status(500).json({
      success: false,
      message: 'Erreur lors du rafraîchissement du token'
    })
  }
}

// Get current user
export const getMe = async (req, res) => {
  try {
    const result = await query(
      `SELECT id, email, role, prenom, nom, titre, telephone, photo_url, 
              is_active, is_super, permissions, created_at, last_login
       FROM users WHERE id = $1`,
      [req.user.id]
    )

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Utilisateur non trouvé'
      })
    }

    res.json({
      success: true,
      data: result.rows[0]
    })
  } catch (error) {
    console.error('Get me error:', error)
    res.status(500).json({
      success: false,
      message: 'Erreur serveur'
    })
  }
}

// Change password
export const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: 'Mot de passe actuel et nouveau mot de passe requis'
      })
    }

    if (newPassword.length < 4) {
      return res.status(400).json({
        success: false,
        message: 'Le nouveau mot de passe doit contenir au moins 4 caractères'
      })
    }

    // Get current user with password
    const result = await query(
      'SELECT password_hash FROM users WHERE id = $1',
      [req.user.id]
    )

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Utilisateur non trouvé'
      })
    }

    // Verify current password
    const isValid = await comparePassword(currentPassword, result.rows[0].password_hash)
    
    if (!isValid) {
      return res.status(401).json({
        success: false,
        message: 'Mot de passe actuel incorrect'
      })
    }

    // Hash new password
    const hashedPassword = await hashPassword(newPassword)

    // Update password
    await query(
      'UPDATE users SET password_hash = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2',
      [hashedPassword, req.user.id]
    )

    res.json({
      success: true,
      message: 'Mot de passe modifié avec succès'
    })
  } catch (error) {
    console.error('Change password error:', error)
    res.status(500).json({
      success: false,
      message: 'Erreur lors du changement de mot de passe'
    })
  }
}
