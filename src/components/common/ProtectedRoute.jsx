import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import Loader from './Loader'

export function ProtectedRoute({ children, allowedRoles = [] }) {
  const { user, loading, isAuthenticated } = useAuth()
  const location = useLocation()

  if (loading) {
    return <Loader size="lg" page />
  }

  if (!isAuthenticated) {
    // Rediriger vers la page de connexion en gardant l'URL de destination
    return <Navigate to="/connexion" state={{ from: location }} replace />
  }

  // Vérifier si l'utilisateur a le rôle requis
  if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    // Rediriger vers le tableau de bord approprié selon le rôle
    const dashboardPath = getDashboardPath(user.role)
    return <Navigate to={dashboardPath} replace />
  }

  return children
}

function getDashboardPath(role) {
  switch (role) {
    case 'admin':
      return '/admin/tableau-de-bord'
    case 'enseignant':
      return '/enseignant/tableau-de-bord'
    case 'eleve':
      return '/eleve/tableau-de-bord'
    case 'parent':
      return '/parent/tableau-de-bord'
    default:
      return '/'
  }
}

export default ProtectedRoute
