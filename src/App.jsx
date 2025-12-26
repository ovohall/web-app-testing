import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './context/AuthContext'

// Layouts
import { PublicLayout, DashboardLayout } from './components/layout'

// Common components
import { ProtectedRoute, Loader } from './components/common'

// Public pages
import {
  HomePage,
  AboutPage,
  ProgramsPage,
  ValuesPage,
  AdmissionPage,
  NewsPage,
  ContactPage,
  GalleryPage,
  SchoolLifePage
} from './pages/public'

// Auth pages
import { LoginPage, ForgotPasswordPage } from './pages/auth'

// Portal pages
import { DashboardPage as EleveDashboard } from './pages/eleve'
import { DashboardPage as EnseignantDashboard } from './pages/enseignant'
import { DashboardPage as AdminDashboard } from './pages/admin'

// Placeholder components for pages not yet created
function PlaceholderPage({ title }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
        <span className="text-4xl">🚧</span>
      </div>
      <h1 className="text-2xl font-heading font-bold text-gray-800 mb-2">{title}</h1>
      <p className="text-gray-600">Cette page est en cours de développement.</p>
    </div>
  )
}

function App() {
  const { loading } = useAuth()

  if (loading) {
    return <Loader size="lg" page />
  }

  return (
    <Routes>
      {/* ========== Public Routes ========== */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/a-propos" element={<AboutPage />} />
        <Route path="/programmes" element={<ProgramsPage />} />
        <Route path="/nos-valeurs" element={<ValuesPage />} />
        <Route path="/admission" element={<AdmissionPage />} />
        <Route path="/actualites" element={<NewsPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/galerie" element={<GalleryPage />} />
        <Route path="/vie-scolaire" element={<SchoolLifePage />} />
      </Route>

      {/* ========== Auth Routes ========== */}
      <Route path="/connexion" element={<LoginPage />} />
      <Route path="/mot-de-passe-oublie" element={<ForgotPasswordPage />} />

      {/* ========== Student Portal ========== */}
      <Route
        path="/eleve"
        element={
          <ProtectedRoute allowedRoles={['eleve']}>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="tableau-de-bord" replace />} />
        <Route path="tableau-de-bord" element={<EleveDashboard />} />
        <Route path="notes" element={<PlaceholderPage title="Mes Notes" />} />
        <Route path="emploi-du-temps" element={<PlaceholderPage title="Emploi du Temps" />} />
        <Route path="devoirs" element={<PlaceholderPage title="Mes Devoirs" />} />
        <Route path="presences" element={<PlaceholderPage title="Mes Présences" />} />
        <Route path="reussites" element={<PlaceholderPage title="Mes Réussites" />} />
        <Route path="messages" element={<PlaceholderPage title="Messages" />} />
        <Route path="profil" element={<PlaceholderPage title="Mon Profil" />} />
      </Route>

      {/* ========== Teacher Portal ========== */}
      <Route
        path="/enseignant"
        element={
          <ProtectedRoute allowedRoles={['enseignant']}>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="tableau-de-bord" replace />} />
        <Route path="tableau-de-bord" element={<EnseignantDashboard />} />
        <Route path="classes" element={<PlaceholderPage title="Mes Classes" />} />
        <Route path="presences" element={<PlaceholderPage title="Gestion des Présences" />} />
        <Route path="notes" element={<PlaceholderPage title="Saisie des Notes" />} />
        <Route path="devoirs" element={<PlaceholderPage title="Gestion des Devoirs" />} />
        <Route path="observations" element={<PlaceholderPage title="Observations" />} />
        <Route path="parents" element={<PlaceholderPage title="Communication Parents" />} />
        <Route path="emploi-du-temps" element={<PlaceholderPage title="Mon Emploi du Temps" />} />
        <Route path="ressources" element={<PlaceholderPage title="Ressources Pédagogiques" />} />
        <Route path="profil" element={<PlaceholderPage title="Mon Profil" />} />
      </Route>

      {/* ========== Admin Portal ========== */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="tableau-de-bord" replace />} />
        <Route path="tableau-de-bord" element={<AdminDashboard />} />
        <Route path="eleves" element={<PlaceholderPage title="Gestion des Élèves" />} />
        <Route path="parents" element={<PlaceholderPage title="Gestion des Parents" />} />
        <Route path="enseignants" element={<PlaceholderPage title="Gestion des Enseignants" />} />
        <Route path="classes" element={<PlaceholderPage title="Gestion des Classes" />} />
        <Route path="emploi-du-temps" element={<PlaceholderPage title="Emplois du Temps" />} />
        <Route path="finances" element={<PlaceholderPage title="Gestion Financière" />} />
        <Route path="paiements" element={<PlaceholderPage title="Paiements" />} />
        <Route path="creances" element={<PlaceholderPage title="Créances et Impayés" />} />
        <Route path="presences" element={<PlaceholderPage title="Suivi des Présences" />} />
        <Route path="communication" element={<PlaceholderPage title="Communication" />} />
        <Route path="evenements" element={<PlaceholderPage title="Événements" />} />
        <Route path="securite" element={<PlaceholderPage title="Sécurité" />} />
        <Route path="rapports" element={<PlaceholderPage title="Rapports & Statistiques" />} />
        <Route path="parametres" element={<PlaceholderPage title="Paramètres" />} />
      </Route>

      {/* ========== Parent Portal (future) ========== */}
      <Route
        path="/parent"
        element={
          <ProtectedRoute allowedRoles={['parent']}>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="tableau-de-bord" replace />} />
        <Route path="tableau-de-bord" element={<PlaceholderPage title="Tableau de bord Parent" />} />
        <Route path="enfants" element={<PlaceholderPage title="Mes Enfants" />} />
        <Route path="paiements" element={<PlaceholderPage title="Paiements" />} />
        <Route path="messages" element={<PlaceholderPage title="Messages" />} />
      </Route>

      {/* ========== 404 Page ========== */}
      <Route
        path="*"
        element={
          <PublicLayout>
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center py-20">
              <div className="text-8xl mb-6">🔍</div>
              <h1 className="text-4xl font-heading font-bold text-gray-800 mb-4">
                Page non trouvée
              </h1>
              <p className="text-gray-600 mb-8 max-w-md">
                Désolé, la page que vous recherchez n'existe pas ou a été déplacée.
              </p>
              <a
                href="/"
                className="px-6 py-3 bg-gsnsd-blue text-white rounded-lg font-medium hover:bg-gsnsd-blue-dark transition-colors"
              >
                Retour à l'accueil
              </a>
            </div>
          </PublicLayout>
        }
      />
    </Routes>
  )
}

export default App
