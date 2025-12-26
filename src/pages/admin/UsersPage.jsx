import { useState, useEffect } from 'react'
import {
  Users,
  UserPlus,
  Search,
  Filter,
  MoreVertical,
  Edit,
  Trash2,
  Shield,
  Key,
  Mail,
  Phone,
  CheckCircle,
  XCircle,
  AlertCircle,
  GraduationCap,
  BookOpen,
  UserCheck
} from 'lucide-react'
import { Card, Badge, Button, Input, Modal } from '../../components/common'
import { useAuth } from '../../context/AuthContext'

const ROLE_CONFIG = {
  admin: {
    label: 'Administrateur',
    color: 'bg-purple-100 text-purple-800',
    icon: <Shield className="w-4 h-4" />
  },
  enseignant: {
    label: 'Enseignant',
    color: 'bg-blue-100 text-blue-800',
    icon: <BookOpen className="w-4 h-4" />
  },
  eleve: {
    label: 'Élève',
    color: 'bg-green-100 text-green-800',
    icon: <GraduationCap className="w-4 h-4" />
  },
  parent: {
    label: 'Parent',
    color: 'bg-yellow-100 text-yellow-800',
    icon: <Users className="w-4 h-4" />
  }
}

export default function UsersPage() {
  const { user, getAllUsers, createUser, deleteUser, updateUserPermissions, canCreateUsers, canDelegateAccess } = useAuth()
  const [users, setUsers] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [roleFilter, setRoleFilter] = useState('all')
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showPermissionsModal, setShowPermissionsModal] = useState(false)
  const [selectedUser, setSelectedUser] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState({ type: '', text: '' })

  // New user form state
  const [newUser, setNewUser] = useState({
    email: '',
    password: '1234',
    prenom: '',
    nom: '',
    role: 'enseignant',
    telephone: ''
  })

  useEffect(() => {
    loadUsers()
  }, [])

  const loadUsers = () => {
    const allUsers = getAllUsers()
    setUsers(allUsers)
  }

  const filteredUsers = users.filter(u => {
    const matchSearch = 
      u.prenom?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.nom?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email?.toLowerCase().includes(searchQuery.toLowerCase())
    const matchRole = roleFilter === 'all' || u.role === roleFilter
    return matchSearch && matchRole
  })

  const handleCreateUser = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage({ type: '', text: '' })

    const result = await createUser(newUser)
    
    if (result.success) {
      setMessage({ type: 'success', text: 'Compte créé avec succès!' })
      loadUsers()
      setNewUser({
        email: '',
        password: '1234',
        prenom: '',
        nom: '',
        role: 'enseignant',
        telephone: ''
      })
      setTimeout(() => {
        setShowCreateModal(false)
        setMessage({ type: '', text: '' })
      }, 1500)
    } else {
      setMessage({ type: 'error', text: result.error })
    }
    
    setIsLoading(false)
  }

  const handleDeleteUser = async () => {
    if (!selectedUser) return
    
    setIsLoading(true)
    const result = await deleteUser(selectedUser.email)
    
    if (result.success) {
      setMessage({ type: 'success', text: 'Compte supprimé avec succès!' })
      loadUsers()
      setTimeout(() => {
        setShowDeleteModal(false)
        setSelectedUser(null)
        setMessage({ type: '', text: '' })
      }, 1500)
    } else {
      setMessage({ type: 'error', text: result.error })
    }
    
    setIsLoading(false)
  }

  const handleUpdatePermissions = async (permission, value) => {
    if (!selectedUser) return
    
    const result = await updateUserPermissions(selectedUser.email, { [permission]: value })
    
    if (result.success) {
      loadUsers()
      // Update selected user
      const updatedUser = getAllUsers().find(u => u.email === selectedUser.email)
      setSelectedUser(updatedUser)
    }
  }

  if (!canCreateUsers) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mb-6">
          <XCircle className="w-12 h-12 text-red-500" />
        </div>
        <h1 className="text-2xl font-heading font-bold text-gray-800 mb-2">Accès refusé</h1>
        <p className="text-gray-600">Vous n'avez pas la permission de gérer les utilisateurs.</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-heading font-bold text-gray-800">Gestion des utilisateurs</h1>
          <p className="text-gray-600">Créez et gérez les comptes des enseignants, élèves et parents</p>
        </div>
        <Button variant="primary" onClick={() => setShowCreateModal(true)}>
          <UserPlus className="w-5 h-5 mr-2" />
          Nouveau compte
        </Button>
      </div>

      {/* Filters */}
      <Card className="p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher par nom ou email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gsnsd-blue"
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-gray-400" />
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gsnsd-blue"
            >
              <option value="all">Tous les rôles</option>
              <option value="admin">Administrateurs</option>
              <option value="enseignant">Enseignants</option>
              <option value="eleve">Élèves</option>
              <option value="parent">Parents</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="p-4 text-center">
          <div className="text-3xl font-bold text-purple-600">{users.filter(u => u.role === 'admin').length}</div>
          <div className="text-sm text-gray-500">Administrateurs</div>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-3xl font-bold text-blue-600">{users.filter(u => u.role === 'enseignant').length}</div>
          <div className="text-sm text-gray-500">Enseignants</div>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-3xl font-bold text-green-600">{users.filter(u => u.role === 'eleve').length}</div>
          <div className="text-sm text-gray-500">Élèves</div>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-3xl font-bold text-yellow-600">{users.filter(u => u.role === 'parent').length}</div>
          <div className="text-sm text-gray-500">Parents</div>
        </Card>
      </div>

      {/* Users Table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Utilisateur</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Rôle</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date de création</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredUsers.map((u) => (
                <tr key={u.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gsnsd-blue/10 rounded-full flex items-center justify-center">
                        <span className="text-gsnsd-blue font-medium">
                          {u.prenom?.[0]}{u.nom?.[0]}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">{u.prenom} {u.nom}</p>
                        {u.titre && <p className="text-xs text-gray-500">{u.titre}</p>}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{u.email}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${ROLE_CONFIG[u.role]?.color}`}>
                      {ROLE_CONFIG[u.role]?.icon}
                      {ROLE_CONFIG[u.role]?.label}
                    </span>
                    {u.permissions?.isSuper && (
                      <Badge variant="warning" size="sm" className="ml-2">Super Admin</Badge>
                    )}
                  </td>
                  <td className="px-6 py-4 text-gray-500 text-sm">
                    {u.createdAt ? new Date(u.createdAt).toLocaleDateString('fr-FR') : '-'}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      {canDelegateAccess && (
                        <button
                          onClick={() => {
                            setSelectedUser(u)
                            setShowPermissionsModal(true)
                          }}
                          className="p-2 text-gray-400 hover:text-gsnsd-blue hover:bg-gray-100 rounded-lg"
                          title="Gérer les permissions"
                        >
                          <Key className="w-4 h-4" />
                        </button>
                      )}
                      {!u.permissions?.isSuper && (
                        <button
                          onClick={() => {
                            setSelectedUser(u)
                            setShowDeleteModal(true)
                          }}
                          className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg"
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
          
          {filteredUsers.length === 0 && (
            <div className="text-center py-12">
              <Users className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">Aucun utilisateur trouvé</p>
            </div>
          )}
        </div>
      </Card>

      {/* Create User Modal */}
      <Modal
        isOpen={showCreateModal}
        onClose={() => {
          setShowCreateModal(false)
          setMessage({ type: '', text: '' })
        }}
        title="Créer un nouveau compte"
      >
        <form onSubmit={handleCreateUser} className="space-y-4">
          {message.text && (
            <div className={`p-4 rounded-lg flex items-center gap-3 ${
              message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
            }`}>
              {message.type === 'success' ? <CheckCircle className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
              {message.text}
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Prénom"
              value={newUser.prenom}
              onChange={(e) => setNewUser({ ...newUser, prenom: e.target.value })}
              placeholder="Prénom"
              required
            />
            <Input
              label="Nom"
              value={newUser.nom}
              onChange={(e) => setNewUser({ ...newUser, nom: e.target.value })}
              placeholder="Nom"
              required
            />
          </div>

          <Input
            label="Email"
            type="email"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            placeholder="email@gsnsd.sn"
            icon={<Mail className="w-5 h-5" />}
            required
          />

          <Input
            label="Téléphone"
            type="tel"
            value={newUser.telephone}
            onChange={(e) => setNewUser({ ...newUser, telephone: e.target.value })}
            placeholder="+221 77 XXX XX XX"
            icon={<Phone className="w-5 h-5" />}
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Rôle</label>
            <select
              value={newUser.role}
              onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gsnsd-blue"
            >
              <option value="enseignant">Enseignant</option>
              <option value="admin">Administrateur</option>
              <option value="eleve">Élève</option>
              <option value="parent">Parent</option>
            </select>
          </div>

          <Input
            label="Mot de passe initial"
            type="text"
            value={newUser.password}
            onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
            placeholder="Mot de passe"
            icon={<Key className="w-5 h-5" />}
          />

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={() => setShowCreateModal(false)}
            >
              Annuler
            </Button>
            <Button
              type="submit"
              variant="primary"
              className="flex-1"
              loading={isLoading}
            >
              Créer le compte
            </Button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false)
          setSelectedUser(null)
          setMessage({ type: '', text: '' })
        }}
        title="Confirmer la suppression"
      >
        <div className="space-y-4">
          {message.text && (
            <div className={`p-4 rounded-lg flex items-center gap-3 ${
              message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
            }`}>
              {message.type === 'success' ? <CheckCircle className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
              {message.text}
            </div>
          )}

          <div className="text-center py-4">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Trash2 className="w-8 h-8 text-red-500" />
            </div>
            <p className="text-gray-800">
              Êtes-vous sûr de vouloir supprimer le compte de <br />
              <strong>{selectedUser?.prenom} {selectedUser?.nom}</strong> ?
            </p>
            <p className="text-sm text-gray-500 mt-2">Cette action est irréversible.</p>
          </div>

          <div className="flex gap-3">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => {
                setShowDeleteModal(false)
                setSelectedUser(null)
              }}
            >
              Annuler
            </Button>
            <Button
              variant="primary"
              className="flex-1 bg-red-500 hover:bg-red-600"
              onClick={handleDeleteUser}
              loading={isLoading}
            >
              Supprimer
            </Button>
          </div>
        </div>
      </Modal>

      {/* Permissions Modal */}
      <Modal
        isOpen={showPermissionsModal}
        onClose={() => {
          setShowPermissionsModal(false)
          setSelectedUser(null)
        }}
        title={`Permissions - ${selectedUser?.prenom} ${selectedUser?.nom}`}
      >
        {selectedUser && (
          <div className="space-y-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">
                Rôle: <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${ROLE_CONFIG[selectedUser.role]?.color}`}>
                  {ROLE_CONFIG[selectedUser.role]?.label}
                </span>
              </p>
            </div>

            <div className="space-y-3">
              <h4 className="font-medium text-gray-800">Permissions</h4>
              
              {selectedUser.role === 'admin' && (
                <>
                  <PermissionToggle
                    label="Peut créer des comptes"
                    enabled={selectedUser.permissions?.canCreateUsers}
                    onChange={(v) => handleUpdatePermissions('canCreateUsers', v)}
                    disabled={selectedUser.permissions?.isSuper}
                  />
                  <PermissionToggle
                    label="Peut supprimer des comptes"
                    enabled={selectedUser.permissions?.canDeleteUsers}
                    onChange={(v) => handleUpdatePermissions('canDeleteUsers', v)}
                    disabled={selectedUser.permissions?.isSuper}
                  />
                  <PermissionToggle
                    label="Peut déléguer des accès"
                    enabled={selectedUser.permissions?.canDelegateAccess}
                    onChange={(v) => handleUpdatePermissions('canDelegateAccess', v)}
                    disabled={selectedUser.permissions?.isSuper}
                  />
                  <PermissionToggle
                    label="Peut gérer les finances"
                    enabled={selectedUser.permissions?.canManageFinances}
                    onChange={(v) => handleUpdatePermissions('canManageFinances', v)}
                    disabled={selectedUser.permissions?.isSuper}
                  />
                  <PermissionToggle
                    label="Peut gérer les enseignants"
                    enabled={selectedUser.permissions?.canManageTeachers}
                    onChange={(v) => handleUpdatePermissions('canManageTeachers', v)}
                    disabled={selectedUser.permissions?.isSuper}
                  />
                </>
              )}

              {selectedUser.role === 'enseignant' && (
                <>
                  <PermissionToggle
                    label="Peut gérer ses propres classes"
                    enabled={selectedUser.permissions?.canManageOwnClasses}
                    onChange={(v) => handleUpdatePermissions('canManageOwnClasses', v)}
                  />
                  <PermissionToggle
                    label="Peut saisir des notes"
                    enabled={selectedUser.permissions?.canEnterGrades}
                    onChange={(v) => handleUpdatePermissions('canEnterGrades', v)}
                  />
                  <PermissionToggle
                    label="Peut gérer les présences"
                    enabled={selectedUser.permissions?.canManageAttendance}
                    onChange={(v) => handleUpdatePermissions('canManageAttendance', v)}
                  />
                  <PermissionToggle
                    label="Peut communiquer avec les parents"
                    enabled={selectedUser.permissions?.canCommunicateParents}
                    onChange={(v) => handleUpdatePermissions('canCommunicateParents', v)}
                  />
                </>
              )}

              {selectedUser.permissions?.isSuper && (
                <div className="p-4 bg-yellow-50 rounded-lg text-yellow-700 text-sm">
                  <strong>Super Admin</strong> - Cet utilisateur a tous les droits et ne peut pas être modifié.
                </div>
              )}
            </div>

            <Button
              variant="outline"
              className="w-full mt-4"
              onClick={() => {
                setShowPermissionsModal(false)
                setSelectedUser(null)
              }}
            >
              Fermer
            </Button>
          </div>
        )}
      </Modal>
    </div>
  )
}

function PermissionToggle({ label, enabled, onChange, disabled }) {
  return (
    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
      <span className="text-sm text-gray-700">{label}</span>
      <button
        type="button"
        onClick={() => !disabled && onChange(!enabled)}
        disabled={disabled}
        className={`
          relative w-11 h-6 rounded-full transition-colors
          ${enabled ? 'bg-gsnsd-blue' : 'bg-gray-300'}
          ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        `}
      >
        <span
          className={`
            absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform
            ${enabled ? 'translate-x-5' : 'translate-x-0'}
          `}
        />
      </button>
    </div>
  )
}
