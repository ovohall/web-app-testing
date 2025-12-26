import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext(null)

// Initial users - Mayare Mbaye as Director with full access
const INITIAL_USERS = {
  'mayare.mbaye@gsnsd.sn': {
    id: 1,
    email: 'mayare.mbaye@gsnsd.sn',
    password: '1234',
    role: 'admin',
    prenom: 'Mayare',
    nom: 'MBAYE',
    titre: 'Directeur',
    photo: null,
    permissions: {
      canCreateUsers: true,
      canDeleteUsers: true,
      canManageFinances: true,
      canManageStudents: true,
      canManageTeachers: true,
      canManageClasses: true,
      canViewReports: true,
      canDelegateAccess: true,
      isSuper: true, // Full access to everything
    },
    createdAt: new Date().toISOString(),
  },
  'enseignant@gsnsd.sn': {
    id: 2,
    email: 'enseignant@gsnsd.sn',
    password: '1234',
    role: 'enseignant',
    prenom: 'Fatou',
    nom: 'DIALLO',
    photo: null,
    classes: ['CP', 'CE1'],
    matieres: ['Français', 'Mathématiques'],
    permissions: {
      canManageOwnClasses: true,
      canEnterGrades: true,
      canManageAttendance: true,
      canCreateHomework: true,
      canCommunicateParents: true,
    },
    createdAt: new Date().toISOString(),
  },
  'eleve@gsnsd.sn': {
    id: 3,
    email: 'eleve@gsnsd.sn',
    password: '1234',
    role: 'eleve',
    prenom: 'Mamadou',
    nom: 'FALL',
    photo: null,
    classe: 'CE1',
    niveau: 'Élémentaire',
    matricule: 'GSNSD-2024-001',
    permissions: {
      canViewOwnGrades: true,
      canViewSchedule: true,
      canViewHomework: true,
      canSubmitHomework: true,
    },
    createdAt: new Date().toISOString(),
  },
  'parent@gsnsd.sn': {
    id: 4,
    email: 'parent@gsnsd.sn',
    password: '1234',
    role: 'parent',
    prenom: 'Awa',
    nom: 'NDIAYE',
    photo: null,
    enfants: [3],
    telephone: '+221 77 123 45 67',
    permissions: {
      canViewChildrenGrades: true,
      canViewChildrenAttendance: true,
      canCommunicateTeachers: true,
      canMakePayments: true,
    },
    createdAt: new Date().toISOString(),
  },
}

// Get users from localStorage or use initial users
function getStoredUsers() {
  try {
    const stored = localStorage.getItem('gsnsd_users')
    if (stored) {
      return JSON.parse(stored)
    }
  } catch (e) {
    console.error('Error reading users from localStorage:', e)
  }
  // Initialize with default users
  localStorage.setItem('gsnsd_users', JSON.stringify(INITIAL_USERS))
  return INITIAL_USERS
}

// Save users to localStorage
function saveUsers(users) {
  localStorage.setItem('gsnsd_users', JSON.stringify(users))
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [users, setUsers] = useState(INITIAL_USERS)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Load users from storage
    const storedUsers = getStoredUsers()
    setUsers(storedUsers)

    // Check for saved user session
    const savedUser = localStorage.getItem('gsnsd_user')
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser)
        // Verify user still exists
        if (storedUsers[parsedUser.email]) {
          setUser(parsedUser)
        } else {
          localStorage.removeItem('gsnsd_user')
        }
      } catch (e) {
        localStorage.removeItem('gsnsd_user')
      }
    }
    setLoading(false)
  }, [])

  const login = async (email, password) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500))
    
    const normalizedEmail = email.toLowerCase().trim()
    const foundUser = users[normalizedEmail]
    
    if (foundUser && foundUser.password === password) {
      const userData = { ...foundUser }
      delete userData.password
      setUser(userData)
      localStorage.setItem('gsnsd_user', JSON.stringify(userData))
      return { success: true, user: userData }
    }
    
    return { success: false, error: 'Email ou mot de passe incorrect' }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('gsnsd_user')
  }

  const updateProfile = (updates) => {
    const updatedUser = { ...user, ...updates }
    setUser(updatedUser)
    localStorage.setItem('gsnsd_user', JSON.stringify(updatedUser))
    
    // Also update in users list
    const updatedUsers = { ...users }
    if (updatedUsers[user.email]) {
      updatedUsers[user.email] = { ...updatedUsers[user.email], ...updates }
      setUsers(updatedUsers)
      saveUsers(updatedUsers)
    }
  }

  // Create a new user account (Admin/Director only)
  const createUser = async (userData) => {
    if (!user?.permissions?.canCreateUsers) {
      return { success: false, error: 'Vous n\'avez pas la permission de créer des comptes' }
    }

    const normalizedEmail = userData.email.toLowerCase().trim()
    
    if (users[normalizedEmail]) {
      return { success: false, error: 'Un compte avec cet email existe déjà' }
    }

    const newUser = {
      id: Date.now(),
      email: normalizedEmail,
      password: userData.password || '1234', // Default password
      role: userData.role,
      prenom: userData.prenom,
      nom: userData.nom,
      photo: null,
      permissions: getDefaultPermissions(userData.role),
      createdBy: user.id,
      createdAt: new Date().toISOString(),
      ...userData,
    }

    const updatedUsers = { ...users, [normalizedEmail]: newUser }
    setUsers(updatedUsers)
    saveUsers(updatedUsers)

    return { success: true, user: { ...newUser, password: undefined } }
  }

  // Delete a user account (Admin/Director only)
  const deleteUser = async (email) => {
    if (!user?.permissions?.canDeleteUsers) {
      return { success: false, error: 'Vous n\'avez pas la permission de supprimer des comptes' }
    }

    const normalizedEmail = email.toLowerCase().trim()
    
    // Can't delete yourself
    if (normalizedEmail === user.email) {
      return { success: false, error: 'Vous ne pouvez pas supprimer votre propre compte' }
    }

    if (!users[normalizedEmail]) {
      return { success: false, error: 'Compte non trouvé' }
    }

    const updatedUsers = { ...users }
    delete updatedUsers[normalizedEmail]
    setUsers(updatedUsers)
    saveUsers(updatedUsers)

    return { success: true }
  }

  // Update user permissions (Admin/Director only)
  const updateUserPermissions = async (email, permissions) => {
    if (!user?.permissions?.canDelegateAccess) {
      return { success: false, error: 'Vous n\'avez pas la permission de modifier les accès' }
    }

    const normalizedEmail = email.toLowerCase().trim()
    
    if (!users[normalizedEmail]) {
      return { success: false, error: 'Compte non trouvé' }
    }

    const updatedUsers = { ...users }
    updatedUsers[normalizedEmail] = {
      ...updatedUsers[normalizedEmail],
      permissions: { ...updatedUsers[normalizedEmail].permissions, ...permissions },
    }
    setUsers(updatedUsers)
    saveUsers(updatedUsers)

    return { success: true }
  }

  // Get all users (Admin only)
  const getAllUsers = () => {
    if (!user?.permissions?.canCreateUsers) {
      return []
    }
    return Object.values(users).map(u => {
      const { password, ...safeUser } = u
      return safeUser
    })
  }

  // Reset to initial users (for testing)
  const resetUsers = () => {
    localStorage.setItem('gsnsd_users', JSON.stringify(INITIAL_USERS))
    setUsers(INITIAL_USERS)
    logout()
  }

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
    resetUsers,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin',
    isDirecteur: user?.role === 'admin' && user?.permissions?.isSuper,
    isEnseignant: user?.role === 'enseignant',
    isEleve: user?.role === 'eleve',
    isParent: user?.role === 'parent',
    canCreateUsers: user?.permissions?.canCreateUsers || false,
    canDelegateAccess: user?.permissions?.canDelegateAccess || false,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

// Default permissions by role
function getDefaultPermissions(role) {
  switch (role) {
    case 'admin':
      return {
        canCreateUsers: false,
        canDeleteUsers: false,
        canManageFinances: true,
        canManageStudents: true,
        canManageTeachers: false,
        canManageClasses: true,
        canViewReports: true,
        canDelegateAccess: false,
        isSuper: false,
      }
    case 'enseignant':
      return {
        canManageOwnClasses: true,
        canEnterGrades: true,
        canManageAttendance: true,
        canCreateHomework: true,
        canCommunicateParents: true,
      }
    case 'eleve':
      return {
        canViewOwnGrades: true,
        canViewSchedule: true,
        canViewHomework: true,
        canSubmitHomework: true,
      }
    case 'parent':
      return {
        canViewChildrenGrades: true,
        canViewChildrenAttendance: true,
        canCommunicateTeachers: true,
        canMakePayments: true,
      }
    default:
      return {}
  }
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export default AuthContext
