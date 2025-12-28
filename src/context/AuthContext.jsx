import { createContext, useContext, useState, useEffect } from 'react'
import { authApi, usersApi } from '../services/api'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // Initialize auth state
  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem('accessToken')
      const savedUser = localStorage.getItem('gsnsd_user')
      
      if (token && savedUser) {
        try {
          // Verify token is still valid
          const response = await authApi.getMe()
          if (response.success) {
            setUser(response.data)
            localStorage.setItem('gsnsd_user', JSON.stringify(response.data))
          } else {
            // Token invalid, clear everything
            localStorage.removeItem('accessToken')
            localStorage.removeItem('refreshToken')
            localStorage.removeItem('gsnsd_user')
          }
        } catch (error) {
          console.error('Auth init error:', error)
          // Use saved user data as fallback
          try {
            setUser(JSON.parse(savedUser))
          } catch {
            localStorage.removeItem('gsnsd_user')
          }
        }
      }
      setLoading(false)
    }

    initAuth()
  }, [])

  const login = async (email, password) => {
    try {
      const response = await authApi.login(email, password)
      
      if (response.success) {
        setUser(response.data.user)
        return { success: true, user: response.data.user }
      } else {
        return { success: false, error: response.message }
      }
    } catch (error) {
      console.error('Login error:', error)
      return { success: false, error: error.message || 'Erreur de connexion' }
    }
  }

  const logout = async () => {
    try {
      await authApi.logout()
    } catch (error) {
      console.error('Logout error:', error)
    }
    setUser(null)
  }

  const updateProfile = async (updates) => {
    if (!user) return { success: false, error: 'Non connecté' }
    
    try {
      const response = await usersApi.update(user.id, updates)
      if (response.success) {
        const updatedUser = { ...user, ...response.data }
        setUser(updatedUser)
        localStorage.setItem('gsnsd_user', JSON.stringify(updatedUser))
        return { success: true }
      }
      return { success: false, error: response.message }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  const createUser = async (userData) => {
    try {
      const response = await usersApi.create(userData)
      return response
    } catch (error) {
      return { success: false, message: error.message }
    }
  }

  const deleteUser = async (userId) => {
    try {
      const response = await usersApi.delete(userId)
      return response
    } catch (error) {
      return { success: false, message: error.message }
    }
  }

  const updateUserPermissions = async (userId, permissions) => {
    try {
      const response = await usersApi.updatePermissions(userId, permissions)
      return response
    } catch (error) {
      return { success: false, message: error.message }
    }
  }

  const getAllUsers = async (params = {}) => {
    try {
      const response = await usersApi.getAll(params)
      return response
    } catch (error) {
      return { success: false, message: error.message, data: { users: [] } }
    }
  }

  const resetUserPassword = async (userId, newPassword = '1234') => {
    try {
      const response = await usersApi.resetPassword(userId, newPassword)
      return response
    } catch (error) {
      return { success: false, message: error.message }
    }
  }

  // Computed values
  const isAuthenticated = !!user
  const isAdmin = user?.role === 'admin'
  const isDirecteur = user?.role === 'admin' && user?.is_super
  const isEnseignant = user?.role === 'enseignant'
  const isEleve = user?.role === 'eleve'
  const isParent = user?.role === 'parent'
  
  // Permissions
  const permissions = user?.permissions || {}
  const canCreateUsers = permissions.canCreateUsers || user?.is_super || false
  const canDeleteUsers = permissions.canDeleteUsers || user?.is_super || false
  const canDelegateAccess = permissions.canDelegateAccess || user?.is_super || false
  const canManageFinances = permissions.canManageFinances || user?.is_super || false
  const canManageStudents = permissions.canManageStudents || user?.is_super || false
  const canViewReports = permissions.canViewReports || user?.is_super || false

  const value = {
    user,
    loading,
    login,
    logout,
    updateProfile,
    createUser,
    deleteUser,
    updateUserPermissions,
    getAllUsers,
    resetUserPassword,
    isAuthenticated,
    isAdmin,
    isDirecteur,
    isEnseignant,
    isEleve,
    isParent,
    canCreateUsers,
    canDeleteUsers,
    canDelegateAccess,
    canManageFinances,
    canManageStudents,
    canViewReports,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
