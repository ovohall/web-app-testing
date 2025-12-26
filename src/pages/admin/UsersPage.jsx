import { useState, useEffect } from 'react'
import { 
  Users, Plus, Search, Filter, Edit, Trash2, Shield, 
  UserCheck, UserX, Key, AlertTriangle, X, Check
} from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { Card, Button, Input, Modal, Badge, Loader } from '../../components/common'
import toast from 'react-hot-toast'

const ROLES = [
  { value: 'admin', label: 'Administrateur', color: 'purple' },
  { value: 'enseignant', label: 'Enseignant', color: 'blue' },
  { value: 'eleve', label: 'Élève', color: 'green' },
  { value: 'parent', label: 'Parent', color: 'orange' },
]

const PERMISSIONS = [
  { key: 'canCreateUsers', label: 'Créer des utilisateurs', description: 'Peut créer de nouveaux comptes' },
  { key: 'canDeleteUsers', label: 'Supprimer des utilisateurs', description: 'Peut supprimer des comptes' },
  { key: 'canManageFinances', label: 'Gérer les finances', description: 'Accès au module financier' },
  { key: 'canManageStudents', label: 'Gérer les élèves', description: 'Gestion des inscriptions' },
  { key: 'canManageClasses', label: 'Gérer les classes', description: 'Création et affectation des classes' },
  { key: 'canViewReports', label: 'Voir les rapports', description: 'Accès aux statistiques et rapports' },
  { key: 'canDelegateAccess', label: 'Déléguer les accès', description: 'Peut modifier les permissions' },
]

export default function UsersPage() {
  const { user: currentUser, getAllUsers, createUser, deleteUser, updateUserPermissions, resetUserPassword, canCreateUsers, canDelegateAccess, canDeleteUsers } = useAuth()
  
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [roleFilter, setRoleFilter] = useState('all')
  
  // Modals
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showPermissionsModal, setShowPermissionsModal] = useState(false)
  const [selectedUser, setSelectedUser] = useState(null)
  
  // Form state
  const [formData, setFormData] = useState({
    email: '',
    prenom: '',
    nom: '',
    role: 'enseignant',
    telephone: '',
    password: '1234'
  })
  const [formLoading, setFormLoading] = useState(false)

  useEffect(() => {
    loadUsers()
  }, [roleFilter])

  const loadUsers = async () => {
    setLoading(true)
    try {
      const params = {}
      if (roleFilter !== 'all') {
        params.role = roleFilter
      }
      const response = await getAllUsers(params)
      if (response.success) {
        setUsers(response.data.users || [])
      } else {
        toast.error(response.message || 'Erreur lors du chargement')
      }
    } catch (error) {
      toast.error('Erreur lors du chargement des utilisateurs')
    } finally {
      setLoading(false)
    }
  }

  const handleCreateUser = async (e) => {
    e.preventDefault()
    
    if (!formData.email || !formData.prenom || !formData.nom) {
      toast.error('Veuillez remplir tous les champs obligatoires')
      return
    }

    setFormLoading(true)
    try {
      const response = await createUser(formData)
      if (response.success) {
        toast.success('Utilisateur créé avec succès')
        setShowCreateModal(false)
        setFormData({ email: '', prenom: '', nom: '', role: 'enseignant', telephone: '', password: '1234' })
        loadUsers()
      } else {
        toast.error(response.message || 'Erreur lors de la création')
      }
    } catch (error) {
      toast.error('Erreur lors de la création')
    } finally {
      setFormLoading(false)
    }
  }

  const handleDeleteUser = async () => {
    if (!selectedUser) return
    
    setFormLoading(true)
    try {
      const response = await deleteUser(selectedUser.id)
      if (response.success) {
        toast.success('Utilisateur supprimé')
        setShowDeleteModal(false)
        setSelectedUser(null)
        loadUsers()
      } else {
        toast.error(response.message || 'Erreur lors de la suppression')
      }
    } catch (error) {
      toast.error('Erreur lors de la suppression')
    } finally {
      setFormLoading(false)
    }
  }

  const handleUpdatePermission = async (permissionKey, value) => {
    if (!selectedUser) return
    
    try {
      const response = await updateUserPermissions(selectedUser.id, { [permissionKey]: value })
      if (response.success) {
        toast.success('Permission mise à jour')
        // Update local state
        setSelectedUser(prev => ({
          ...prev,
          permissions: { ...prev.permissions, [permissionKey]: value }
        }))
        loadUsers()
      } else {
        toast.error(response.message || 'Erreur')
      }
    } catch (error) {
      toast.error('Erreur lors de la mise à jour')
    }
  }

  const handleResetPassword = async (userId) => {
    try {
      const response = await resetUserPassword(userId)
      if (response.success) {
        toast.success('Mot de passe réinitialisé à "1234"')
      } else {
        toast.error(response.message || 'Erreur')
      }
    } catch (error) {
      toast.error('Erreur lors de la réinitialisation')
    }
  }

  // Filter users by search
  const filteredUsers = users.filter(u => {
    const searchLower = searchTerm.toLowerCase()
    return (
      u.prenom?.toLowerCase().includes(searchLower) ||
      u.nom?.toLowerCase().includes(searchLower) ||
      u.email?.toLowerCase().includes(searchLower)
    )
  })

  // Stats
  const stats = {
    total: users.length,
    admins: users.filter(u => u.role === 'admin').length,
    enseignants: users.filter(u => u.role === 'enseignant').length,
    eleves: users.filter(u => u.role === 'eleve').length,
    parents: users.filter(u => u.role === 'parent').length,
  }

  if (!canCreateUsers && !currentUser?.is_super) {
    return (
      <div className="text-center py-12">
        <Shield className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Accès Restreint</h2>
        <p className="text-gray-600">Vous n'avez pas la permission de gérer les utilisateurs.</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gestion des Utilisateurs</h1>
          <p className="text-gray-600">Créez et gérez les comptes utilisateurs</p>
        </div>
        <Button onClick={() => setShowCreateModal(true)} icon={<Plus className="w-4 h-4" />}>
          Nouveau Compte
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="bg-white rounded-xl p-4 border">
          <p className="text-sm text-gray-500">Total</p>
          <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
        </div>
        <div className="bg-purple-50 rounded-xl p-4 border border-purple-100">
          <p className="text-sm text-purple-600">Administrateurs</p>
          <p className="text-2xl font-bold text-purple-700">{stats.admins}</p>
        </div>
        <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
          <p className="text-sm text-blue-600">Enseignants</p>
          <p className="text-2xl font-bold text-blue-700">{stats.enseignants}</p>
        </div>
        <div className="bg-green-50 rounded-xl p-4 border border-green-100">
          <p className="text-sm text-green-600">Élèves</p>
          <p className="text-2xl font-bold text-green-700">{stats.eleves}</p>
        </div>
        <div className="bg-orange-50 rounded-xl p-4 border border-orange-100">
          <p className="text-sm text-orange-600">Parents</p>
          <p className="text-2xl font-bold text-orange-700">{stats.parents}</p>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher par nom ou email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-gsnsd-blue focus:border-transparent"
            />
          </div>
          <div className="flex gap-2">
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-gsnsd-blue"
            >
              <option value="all">Tous les rôles</option>
              {ROLES.map(role => (
                <option key={role.value} value={role.value}>{role.label}</option>
              ))}
            </select>
          </div>
        </div>
      </Card>

      {/* Users Table */}
      <Card>
        {loading ? (
          <div className="py-12">
            <Loader size="lg" />
          </div>
        ) : filteredUsers.length === 0 ? (
          <div className="text-center py-12">
            <Users className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">Aucun utilisateur trouvé</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Utilisateur</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Email</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Rôle</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Statut</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((u) => (
                  <tr key={u.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gsnsd-blue/10 rounded-full flex items-center justify-center">
                          <span className="text-gsnsd-blue font-medium">
                            {u.prenom?.[0]}{u.nom?.[0]}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">
                            {u.prenom} {u.nom}
                            {u.is_super && <Shield className="inline w-4 h-4 text-purple-500 ml-1" />}
                          </p>
                          {u.titre && <p className="text-sm text-gray-500">{u.titre}</p>}
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-gray-600">{u.email}</td>
                    <td className="py-3 px-4">
                      <Badge color={ROLES.find(r => r.value === u.role)?.color || 'gray'}>
                        {ROLES.find(r => r.value === u.role)?.label || u.role}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      {u.is_active ? (
                        <span className="flex items-center gap-1 text-green-600">
                          <UserCheck className="w-4 h-4" /> Actif
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-red-600">
                          <UserX className="w-4 h-4" /> Inactif
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center justify-end gap-2">
                        {canDelegateAccess && u.role === 'admin' && !u.is_super && (
                          <button
                            onClick={() => { setSelectedUser(u); setShowPermissionsModal(true); }}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                            title="Permissions"
                          >
                            <Shield className="w-4 h-4" />
                          </button>
                        )}
                        {!u.is_super && (
                          <button
                            onClick={() => handleResetPassword(u.id)}
                            className="p-2 text-orange-600 hover:bg-orange-50 rounded-lg"
                            title="Réinitialiser mot de passe"
                          >
                            <Key className="w-4 h-4" />
                          </button>
                        )}
                        {canDeleteUsers && !u.is_super && u.id !== currentUser?.id && (
                          <button
                            onClick={() => { setSelectedUser(u); setShowDeleteModal(true); }}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                            title="Supprimer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      {/* Create User Modal */}
      <Modal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        title="Nouveau Compte Utilisateur"
      >
        <form onSubmit={handleCreateUser} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Prénom *"
              value={formData.prenom}
              onChange={(e) => setFormData({ ...formData, prenom: e.target.value })}
              required
            />
            <Input
              label="Nom *"
              value={formData.nom}
              onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
              required
            />
          </div>
          <Input
            label="Email *"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
          <Input
            label="Téléphone"
            value={formData.telephone}
            onChange={(e) => setFormData({ ...formData, telephone: e.target.value })}
          />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Rôle *</label>
            <select
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-gsnsd-blue"
            >
              {ROLES.map(role => (
                <option key={role.value} value={role.value}>{role.label}</option>
              ))}
            </select>
          </div>
          <Input
            label="Mot de passe"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            helperText="Par défaut: 1234"
          />
          <div className="flex justify-end gap-3 pt-4">
            <Button variant="outline" onClick={() => setShowCreateModal(false)}>
              Annuler
            </Button>
            <Button type="submit" loading={formLoading}>
              Créer le compte
            </Button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="Confirmer la suppression"
      >
        <div className="text-center py-4">
          <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <p className="text-gray-700 mb-2">
            Êtes-vous sûr de vouloir supprimer le compte de
          </p>
          <p className="font-semibold text-gray-900">
            {selectedUser?.prenom} {selectedUser?.nom}?
          </p>
          <p className="text-sm text-gray-500 mt-2">Cette action est irréversible.</p>
        </div>
        <div className="flex justify-center gap-3 pt-4">
          <Button variant="outline" onClick={() => setShowDeleteModal(false)}>
            Annuler
          </Button>
          <Button variant="danger" onClick={handleDeleteUser} loading={formLoading}>
            Supprimer
          </Button>
        </div>
      </Modal>

      {/* Permissions Modal */}
      <Modal
        isOpen={showPermissionsModal}
        onClose={() => setShowPermissionsModal(false)}
        title={`Permissions - ${selectedUser?.prenom} ${selectedUser?.nom}`}
      >
        <div className="space-y-4">
          {PERMISSIONS.map((perm) => (
            <div key={perm.key} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-800">{perm.label}</p>
                <p className="text-sm text-gray-500">{perm.description}</p>
              </div>
              <button
                onClick={() => handleUpdatePermission(perm.key, !selectedUser?.permissions?.[perm.key])}
                className={`w-12 h-6 rounded-full transition ${
                  selectedUser?.permissions?.[perm.key] ? 'bg-green-500' : 'bg-gray-300'
                }`}
              >
                <div className={`w-5 h-5 bg-white rounded-full shadow transform transition ${
                  selectedUser?.permissions?.[perm.key] ? 'translate-x-6' : 'translate-x-1'
                }`} />
              </button>
            </div>
          ))}
        </div>
        <div className="flex justify-end pt-4">
          <Button onClick={() => setShowPermissionsModal(false)}>
            Fermer
          </Button>
        </div>
      </Modal>
    </div>
  )
}
