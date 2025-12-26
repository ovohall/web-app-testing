import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { v4 as uuidv4 } from 'uuid'

// Generate JWT access token
export const generateAccessToken = (userId) => {
  return jwt.sign(
    { userId },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRE || '7d' }
  )
}

// Generate JWT refresh token
export const generateRefreshToken = (userId) => {
  return jwt.sign(
    { userId, type: 'refresh' },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: process.env.JWT_REFRESH_EXPIRE || '30d' }
  )
}

// Hash password
export const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10)
  return bcrypt.hash(password, salt)
}

// Compare password
export const comparePassword = async (password, hash) => {
  return bcrypt.compare(password, hash)
}

// Generate matricule for students
export const generateMatricule = (prefix = 'GSNSD') => {
  const year = new Date().getFullYear()
  const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0')
  return `${prefix}-${year}-${random}`
}

// Format currency (XOF)
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('fr-SN', {
    style: 'currency',
    currency: 'XOF',
    minimumFractionDigits: 0
  }).format(amount)
}

// Get current school year
export const getCurrentSchoolYear = () => {
  const now = new Date()
  const year = now.getFullYear()
  const month = now.getMonth() + 1
  
  // School year starts in October
  if (month >= 10) {
    return `${year}-${year + 1}`
  }
  return `${year - 1}-${year}`
}

// Get current trimester
export const getCurrentTrimester = () => {
  const now = new Date()
  const month = now.getMonth() + 1
  
  if (month >= 10 || month <= 12) return 1
  if (month >= 1 && month <= 3) return 2
  return 3
}

// Sanitize user object (remove password)
export const sanitizeUser = (user) => {
  const { password_hash, ...safeUser } = user
  return safeUser
}

// Parse boolean from query string
export const parseBoolean = (value) => {
  if (value === 'true' || value === '1') return true
  if (value === 'false' || value === '0') return false
  return null
}

// Generate random password
export const generateRandomPassword = (length = 8) => {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789'
  let password = ''
  for (let i = 0; i < length; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return password
}
