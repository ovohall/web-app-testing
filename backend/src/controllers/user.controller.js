import { query, getClient } from '../config/database.js'
import { hashPassword, sanitizeUser, generateMatricule } from '../utils/helpers.js'

// Get all users
export const getAllUsers = async (req, res) => {
  try {
    const { role, search, limit = 50, offset = 0 } = req.query
    
    let sql = `
      SELECT id, email, role, prenom, nom, titre, telephone, photo_url, 
             is_active, is_super, permissions, created_at, last_login
      FROM users
      WHERE 1=1
    `
    const params = []
    let paramCount = 0

    if (role && role !== 'all') {
      paramCount++
      sql += ` AND role = $${paramCount}`
      params.push(role)
    }

    if (search) {
      paramCount++
      sql += ` AND (prenom ILIKE $${paramCount} OR nom ILIKE $${paramCount} OR email ILIKE $${paramCount})`
      params.push(`%${search}%`)
    }

    sql += ` ORDER BY created_at DESC`
    
    paramCount++
    sql += ` LIMIT $${paramCount}`
    params.push(parseInt(limit))
    
    paramCount++
    sql += ` OFFSET $${paramCount}`
    params.push(parseInt(offset))

    const result = await query(sql, params)

    // Get total count
    let countSql = 'SELECT COUNT(*) FROM users WHERE 1=1'
    const countParams = []
    let countParamIndex = 0

    if (role && role !== 'all') {
      countParamIndex++
      countSql += ` AND role = $${countParamIndex}`
      countParams.push(role)
    }

    if (search) {
      countParamIndex++
      countSql += ` AND (prenom ILIKE $${countParamIndex} OR nom ILIKE $${countParamIndex} OR email ILIKE $${countParamIndex})`
      countParams.push(`%${search}%`)
    }

    const countResult = await query(countSql, countParams)

    res.json({
      success: true,
      data: {
        users: result.rows,
        total: parseInt(countResult.rows[0].count),
        limit: parseInt(limit),
        offset: parseInt(offset)
      }
    })
  } catch (error) {
    console.error('Get all users error:', error)
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération des utilisateurs'
    })
  }
}

// Get user by ID
export const getUserById = async (req, res) => {
  try {
    const { id } = req.params

    const result = await query(
      `SELECT id, email, role, prenom, nom, titre, telephone, date_naissance,
              adresse, photo_url, is_active, is_super, permissions, 
              created_at, updated_at, last_login
       FROM users WHERE id = $1`,
      [id]
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
    console.error('Get user by ID error:', error)
    res.status(500).json({
      success: false,
      message: 'Erreur serveur'
    })
  }
}

// Create user
export const createUser = async (req, res) => {
  const client = await getClient()
  
  try {
    const { 
      email, 
      password = '1234', 
      role, 
      prenom, 
      nom, 
      telephone,
      titre,
      date_naissance,
      adresse,
      // For eleve
      classe_id,
      lieu_naissance,
      sexe,
      parent1_email,
      // For enseignant
      specialite,
      matieres,
      // For parent
      civilite,
      profession
    } = req.body

    // Validate required fields
    if (!email || !role || !prenom || !nom) {
      return res.status(400).json({
        success: false,
        message: 'Email, rôle, prénom et nom sont requis'
      })
    }

    // Check if email already exists
    const existingUser = await client.query(
      'SELECT id FROM users WHERE email = $1',
      [email.toLowerCase().trim()]
    )

    if (existingUser.rows.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Un compte avec cet email existe déjà'
      })
    }

    await client.query('BEGIN')

    // Hash password
    const passwordHash = await hashPassword(password)

    // Get default permissions for role
    const permissions = getDefaultPermissions(role)

    // Create user
    const userResult = await client.query(
      `INSERT INTO users (email, password_hash, role, prenom, nom, telephone, titre, date_naissance, adresse, permissions, created_by)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
       RETURNING id, email, role, prenom, nom, titre, telephone, is_active, permissions, created_at`,
      [
        email.toLowerCase().trim(),
        passwordHash,
        role,
        prenom,
        nom,
        telephone || null,
        titre || null,
        date_naissance || null,
        adresse || null,
        JSON.stringify(permissions),
        req.user.id
      ]
    )

    const newUser = userResult.rows[0]

    // Create role-specific record
    if (role === 'eleve') {
      const matricule = generateMatricule('ELV')
      await client.query(
        `INSERT INTO eleves (user_id, matricule, classe_id, date_naissance, lieu_naissance, sexe)
         VALUES ($1, $2, $3, $4, $5, $6)`,
        [newUser.id, matricule, classe_id || null, date_naissance, lieu_naissance || null, sexe || null]
      )
      newUser.matricule = matricule
    } else if (role === 'enseignant') {
      const matricule = generateMatricule('ENS')
      await client.query(
        `INSERT INTO enseignants (user_id, matricule, specialite, matieres, date_embauche)
         VALUES ($1, $2, $3, $4, CURRENT_DATE)`,
        [newUser.id, matricule, specialite || null, matieres || null]
      )
      newUser.matricule = matricule
    } else if (role === 'parent') {
      await client.query(
        `INSERT INTO parents (user_id, civilite, profession)
         VALUES ($1, $2, $3)`,
        [newUser.id, civilite || null, profession || null]
      )
    }

    await client.query('COMMIT')

    res.status(201).json({
      success: true,
      message: 'Utilisateur créé avec succès',
      data: newUser
    })
  } catch (error) {
    await client.query('ROLLBACK')
    console.error('Create user error:', error)
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la création de l\'utilisateur'
    })
  } finally {
    client.release()
  }
}

// Update user
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params
    const { prenom, nom, telephone, titre, adresse, is_active } = req.body

    // Check if user exists
    const existingUser = await query('SELECT id, is_super FROM users WHERE id = $1', [id])
    
    if (existingUser.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Utilisateur non trouvé'
      })
    }

    // Can't modify super admin unless you are super admin
    if (existingUser.rows[0].is_super && !req.user.is_super) {
      return res.status(403).json({
        success: false,
        message: 'Impossible de modifier le compte du directeur'
      })
    }

    const result = await query(
      `UPDATE users 
       SET prenom = COALESCE($1, prenom),
           nom = COALESCE($2, nom),
           telephone = COALESCE($3, telephone),
           titre = COALESCE($4, titre),
           adresse = COALESCE($5, adresse),
           is_active = COALESCE($6, is_active),
           updated_at = CURRENT_TIMESTAMP
       WHERE id = $7
       RETURNING id, email, role, prenom, nom, titre, telephone, is_active, permissions`,
      [prenom, nom, telephone, titre, adresse, is_active, id]
    )

    res.json({
      success: true,
      message: 'Utilisateur mis à jour',
      data: result.rows[0]
    })
  } catch (error) {
    console.error('Update user error:', error)
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la mise à jour'
    })
  }
}

// Delete user
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params

    // Check if user exists
    const existingUser = await query('SELECT id, is_super, email FROM users WHERE id = $1', [id])
    
    if (existingUser.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Utilisateur non trouvé'
      })
    }

    // Can't delete super admin
    if (existingUser.rows[0].is_super) {
      return res.status(403).json({
        success: false,
        message: 'Impossible de supprimer le compte du directeur'
      })
    }

    // Can't delete yourself
    if (existingUser.rows[0].id === req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Impossible de supprimer votre propre compte'
      })
    }

    await query('DELETE FROM users WHERE id = $1', [id])

    res.json({
      success: true,
      message: 'Utilisateur supprimé'
    })
  } catch (error) {
    console.error('Delete user error:', error)
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la suppression'
    })
  }
}

// Update user permissions
export const updatePermissions = async (req, res) => {
  try {
    const { id } = req.params
    const { permissions } = req.body

    // Check if user exists
    const existingUser = await query('SELECT id, is_super, permissions FROM users WHERE id = $1', [id])
    
    if (existingUser.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Utilisateur non trouvé'
      })
    }

    // Can't modify super admin permissions
    if (existingUser.rows[0].is_super) {
      return res.status(403).json({
        success: false,
        message: 'Impossible de modifier les permissions du directeur'
      })
    }

    // Merge permissions
    const currentPermissions = existingUser.rows[0].permissions || {}
    const newPermissions = { ...currentPermissions, ...permissions }

    const result = await query(
      `UPDATE users SET permissions = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2
       RETURNING id, email, role, prenom, nom, permissions`,
      [JSON.stringify(newPermissions), id]
    )

    res.json({
      success: true,
      message: 'Permissions mises à jour',
      data: result.rows[0]
    })
  } catch (error) {
    console.error('Update permissions error:', error)
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la mise à jour des permissions'
    })
  }
}

// Reset user password
export const resetPassword = async (req, res) => {
  try {
    const { id } = req.params
    const { newPassword = '1234' } = req.body

    // Check if user exists
    const existingUser = await query('SELECT id, is_super FROM users WHERE id = $1', [id])
    
    if (existingUser.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Utilisateur non trouvé'
      })
    }

    // Can't reset super admin password unless you are super admin
    if (existingUser.rows[0].is_super && !req.user.is_super) {
      return res.status(403).json({
        success: false,
        message: 'Impossible de réinitialiser le mot de passe du directeur'
      })
    }

    const passwordHash = await hashPassword(newPassword)

    await query(
      'UPDATE users SET password_hash = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2',
      [passwordHash, id]
    )

    res.json({
      success: true,
      message: 'Mot de passe réinitialisé'
    })
  } catch (error) {
    console.error('Reset password error:', error)
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la réinitialisation'
    })
  }
}

// Helper function for default permissions
function getDefaultPermissions(role) {
  switch (role) {
    case 'admin':
      return {
        canManageFinances: true,
        canManageStudents: true,
        canManageClasses: true,
        canViewReports: true
      }
    case 'enseignant':
      return {
        canManageOwnClasses: true,
        canEnterGrades: true,
        canManageAttendance: true,
        canCreateHomework: true,
        canCommunicateParents: true
      }
    case 'eleve':
      return {
        canViewOwnGrades: true,
        canViewSchedule: true,
        canViewHomework: true,
        canSubmitHomework: true
      }
    case 'parent':
      return {
        canViewChildrenGrades: true,
        canViewChildrenAttendance: true,
        canCommunicateTeachers: true,
        canMakePayments: true
      }
    default:
      return {}
  }
}
