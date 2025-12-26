import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext(null)

// Demo users for testing
const DEMO_USERS = {
  'admin@gsnsd.sn': {
    id: 1,
    email: 'admin@gsnsd.sn',
    password: 'admin123',
    role: 'admin',
    prenom: 'Directeur',
    nom: 'GSNSD',
    photo: null,
  },
  'enseignant@gsnsd.sn': {
    id: 2,
    email: 'enseignant@gsnsd.sn',
    password: 'prof123',
    role: 'enseignant',
    prenom: 'Fatou',
    nom: 'DIALLO',
    photo: null,
    classes: ['CP', 'CE1'],
  },
  'eleve@gsnsd.sn': {
    id: 3,
    email: 'eleve@gsnsd.sn',
    password: 'eleve123',
    role: 'eleve',
    prenom: 'Mamadou',
    nom: 'FALL',
    photo: null,
    classe: 'CE1',
    niveau: 'Élémentaire',
  },
  'parent@gsnsd.sn': {
    id: 4,
    email: 'parent@gsnsd.sn',
    password: 'parent123',
    role: 'parent',
    prenom: 'Awa',
    nom: 'NDIAYE',
    photo: null,
    enfants: [3],
  },
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check for saved user in localStorage
    const savedUser = localStorage.getItem('gsnsd_user')
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser))
      } catch (e) {
        localStorage.removeItem('gsnsd_user')
      }
    }
    setLoading(false)
  }, [])

  const login = async (email, password) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800))
    
    const demoUser = DEMO_USERS[email.toLowerCase()]
    if (demoUser && demoUser.password === password) {
      const userData = { ...demoUser }
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
  }

  const value = {
    user,
    loading,
    login,
    logout,
    updateProfile,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin',
    isEnseignant: user?.role === 'enseignant',
    isEleve: user?.role === 'eleve',
    isParent: user?.role === 'parent',
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

export default AuthContext
