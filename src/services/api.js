// API Service for GSNSD

// Use relative URL - works when frontend is served from same server as backend
const API_URL = '/api'
console.log('🔌 API URL:', API_URL)

// Token management
const getToken = () => localStorage.getItem('accessToken')
const setTokens = (accessToken, refreshToken) => {
  localStorage.setItem('accessToken', accessToken)
  if (refreshToken) {
    localStorage.setItem('refreshToken', refreshToken)
  }
}
const clearTokens = () => {
  localStorage.removeItem('accessToken')
  localStorage.removeItem('refreshToken')
  localStorage.removeItem('gsnsd_user')
}

// API request helper
const apiRequest = async (endpoint, options = {}) => {
  const token = getToken()
  
  const config = {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
  }

  try {
    const response = await fetch(`${API_URL}${endpoint}`, config)
    const data = await response.json()

    // Handle token expiration
    if (response.status === 401 && data.code === 'TOKEN_EXPIRED') {
      const refreshed = await refreshAccessToken()
      if (refreshed) {
        // Retry the request with new token
        config.headers.Authorization = `Bearer ${getToken()}`
        const retryResponse = await fetch(`${API_URL}${endpoint}`, config)
        return retryResponse.json()
      } else {
        clearTokens()
        window.location.href = '/connexion'
        throw new Error('Session expirée')
      }
    }

    if (!response.ok) {
      throw new Error(data.message || 'Une erreur est survenue')
    }

    return data
  } catch (error) {
    console.error('API Error:', error)
    
    // Provide more helpful error message for connection issues
    if (error.name === 'TypeError' && error.message === 'Failed to fetch') {
      throw new Error(
        'Impossible de se connecter au serveur. Veuillez vérifier que le backend est démarré sur le port 5000. ' +
        'Exécutez: cd backend && npm start'
      )
    }
    
    throw error
  }
}

// Refresh access token
const refreshAccessToken = async () => {
  const refreshToken = localStorage.getItem('refreshToken')
  if (!refreshToken) return false

  try {
    const response = await fetch(`${API_URL}/auth/refresh-token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken }),
    })

    if (!response.ok) return false

    const data = await response.json()
    if (data.success && data.data.accessToken) {
      localStorage.setItem('accessToken', data.data.accessToken)
      return true
    }
    return false
  } catch {
    return false
  }
}

// Auth API
export const authApi = {
  login: async (email, password) => {
    const response = await apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    })
    
    if (response.success) {
      setTokens(response.data.accessToken, response.data.refreshToken)
      localStorage.setItem('gsnsd_user', JSON.stringify(response.data.user))
    }
    
    return response
  },

  logout: async () => {
    const refreshToken = localStorage.getItem('refreshToken')
    try {
      await apiRequest('/auth/logout', {
        method: 'POST',
        body: JSON.stringify({ refreshToken }),
      })
    } catch {
      // Ignore logout errors
    }
    clearTokens()
  },

  getMe: async () => {
    return apiRequest('/auth/me')
  },

  changePassword: async (currentPassword, newPassword) => {
    return apiRequest('/auth/change-password', {
      method: 'POST',
      body: JSON.stringify({ currentPassword, newPassword }),
    })
  },
}

// Users API
export const usersApi = {
  getAll: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString()
    return apiRequest(`/users?${queryString}`)
  },

  getById: async (id) => {
    return apiRequest(`/users/${id}`)
  },

  create: async (userData) => {
    return apiRequest('/users', {
      method: 'POST',
      body: JSON.stringify(userData),
    })
  },

  update: async (id, userData) => {
    return apiRequest(`/users/${id}`, {
      method: 'PUT',
      body: JSON.stringify(userData),
    })
  },

  delete: async (id) => {
    return apiRequest(`/users/${id}`, {
      method: 'DELETE',
    })
  },

  updatePermissions: async (id, permissions) => {
    return apiRequest(`/users/${id}/permissions`, {
      method: 'PATCH',
      body: JSON.stringify({ permissions }),
    })
  },

  resetPassword: async (id, newPassword = '1234') => {
    return apiRequest(`/users/${id}/reset-password`, {
      method: 'POST',
      body: JSON.stringify({ newPassword }),
    })
  },
}

// Eleves API
export const elevesApi = {
  getAll: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString()
    return apiRequest(`/eleves?${queryString}`)
  },

  getById: async (id) => {
    return apiRequest(`/eleves/${id}`)
  },

  create: async (eleveData) => {
    return apiRequest('/eleves', {
      method: 'POST',
      body: JSON.stringify(eleveData),
    })
  },

  update: async (id, eleveData) => {
    return apiRequest(`/eleves/${id}`, {
      method: 'PUT',
      body: JSON.stringify(eleveData),
    })
  },

  getNotes: async (id, params = {}) => {
    const queryString = new URLSearchParams(params).toString()
    return apiRequest(`/eleves/${id}/notes?${queryString}`)
  },

  getPresences: async (id, params = {}) => {
    const queryString = new URLSearchParams(params).toString()
    return apiRequest(`/eleves/${id}/presences?${queryString}`)
  },
}

// Enseignants API
export const enseignantsApi = {
  getAll: async () => {
    return apiRequest('/enseignants')
  },

  getById: async (id) => {
    return apiRequest(`/enseignants/${id}`)
  },

  getClasses: async (id) => {
    return apiRequest(`/enseignants/${id}/classes`)
  },
}

// Classes API
export const classesApi = {
  getAll: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString()
    return apiRequest(`/classes?${queryString}`)
  },

  getById: async (id) => {
    return apiRequest(`/classes/${id}`)
  },

  getEleves: async (id) => {
    return apiRequest(`/classes/${id}/eleves`)
  },

  create: async (classeData) => {
    return apiRequest('/classes', {
      method: 'POST',
      body: JSON.stringify(classeData),
    })
  },

  update: async (id, classeData) => {
    return apiRequest(`/classes/${id}`, {
      method: 'PUT',
      body: JSON.stringify(classeData),
    })
  },
}

// Notes API
export const notesApi = {
  getByClasse: async (classeId, params = {}) => {
    const queryString = new URLSearchParams(params).toString()
    return apiRequest(`/notes/classe/${classeId}?${queryString}`)
  },

  create: async (noteData) => {
    return apiRequest('/notes', {
      method: 'POST',
      body: JSON.stringify(noteData),
    })
  },

  update: async (id, noteData) => {
    return apiRequest(`/notes/${id}`, {
      method: 'PUT',
      body: JSON.stringify(noteData),
    })
  },

  delete: async (id) => {
    return apiRequest(`/notes/${id}`, {
      method: 'DELETE',
    })
  },

  getMatieres: async () => {
    return apiRequest('/notes/matieres')
  },
}

// Presences API
export const presencesApi = {
  getByClasse: async (classeId, date) => {
    return apiRequest(`/presences/classe/${classeId}?date=${date}`)
  },

  markAttendance: async (data) => {
    return apiRequest('/presences/appel', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  },

  getStats: async (classeId, params = {}) => {
    const queryString = new URLSearchParams(params).toString()
    return apiRequest(`/presences/stats/${classeId}?${queryString}`)
  },
}

// Paiements API
export const paiementsApi = {
  getAll: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString()
    return apiRequest(`/paiements?${queryString}`)
  },

  create: async (paiementData) => {
    return apiRequest('/paiements', {
      method: 'POST',
      body: JSON.stringify(paiementData),
    })
  },

  getStats: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString()
    return apiRequest(`/paiements/stats?${queryString}`)
  },

  getFrais: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString()
    return apiRequest(`/paiements/frais?${queryString}`)
  },
}

// Dashboard API
export const dashboardApi = {
  getAdmin: async () => {
    return apiRequest('/dashboard/admin')
  },

  getEnseignant: async () => {
    return apiRequest('/dashboard/enseignant')
  },

  getEleve: async () => {
    return apiRequest('/dashboard/eleve')
  },
}

export default {
  auth: authApi,
  users: usersApi,
  eleves: elevesApi,
  enseignants: enseignantsApi,
  classes: classesApi,
  notes: notesApi,
  presences: presencesApi,
  paiements: paiementsApi,
  dashboard: dashboardApi,
}
