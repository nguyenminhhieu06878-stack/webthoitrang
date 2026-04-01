import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import './AdminUsers.css'

const AdminUsers = () => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [roleFilter, setRoleFilter] = useState('all')
  const [showModal, setShowModal] = useState(false)
  const [editingUser, setEditingUser] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    role: 'user'
  })

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch('http://localhost:5001/api/users', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      const data = await response.json()
      setUsers(data.users || [])
    } catch (error) {
      console.error('Error fetching users:', error)
      toast.error('Không thể tải danh sách người dùng')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    try {
      const token = localStorage.getItem('token')
      const url = editingUser 
        ? `http://localhost:5001/api/users/${editingUser.id}`
        : 'http://localhost:5001/api/users'
      
      const method = editingUser ? 'PUT' : 'POST'
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        toast.success(editingUser ? 'Cập nhật người dùng thành công!' : 'Thêm người dùng thành công!')
        setShowModal(false)
        setEditingUser(null)
        resetForm()
        fetchUsers()
      } else {
        const error = await response.json()
        toast.error(error.message || 'Có lỗi xảy ra')
      }
    } catch (error) {
      console.error('Error saving user:', error)
      toast.error('Có lỗi xảy ra')
    }
  }

  const handleEdit = (user) => {
    setEditingUser(user)
    setFormData({
      name: user.name,
      email: user.email,
      phone: user.phone || '',
      password: '',
      role: user.role
    })
    setShowModal(true)
  }

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      password: '',
      role: 'user'
    })
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const updateUserRole = async (userId, role) => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`http://localhost:5001/api/users/${userId}/role`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ role })
      })

      if (response.ok) {
        toast.success('Cập nhật quyền thành công!')
        fetchUsers()
      } else {
        toast.error('Có lỗi xảy ra')
      }
    } catch (error) {
      console.error('Error updating user role:', error)
      toast.error('Có lỗi xảy ra')
    }
  }

  const deleteUser = async (userId) => {
    if (!confirm('Bạn có chắc chắn muốn xóa người dùng này?')) return

    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`http://localhost:5001/api/users/${userId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (response.ok) {
        toast.success('Xóa người dùng thành công!')
        fetchUsers()
      } else {
        toast.error('Có lỗi xảy ra')
      }
    } catch (error) {
      console.error('Error deleting user:', error)
      toast.error('Có lỗi xảy ra')
    }
  }

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('vi-VN')
  }

  const getRoleBadge = (role) => {
    const roleMap = {
      admin: { text: 'Quản trị viên', class: 'role-admin' },
      user: { text: 'Khách hàng', class: 'role-user' }
    }
    return roleMap[role] || { text: role, class: '' }
  }

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = roleFilter === 'all' || user.role === roleFilter
    return matchesSearch && matchesRole
  })

  const userStats = {
    total: users.length,
    admins: users.filter(u => u.role === 'admin').length,
    customers: users.filter(u => u.role === 'user').length
  }

  if (loading) {
    return <div className="admin-loading">Đang tải...</div>
  }

  return (
    <div className="admin-users">
      <div className="page-header">
        <h2>Quản lý người dùng</h2>
        <button className="btn-primary" onClick={() => setShowModal(true)}>
          Thêm người dùng
        </button>
      </div>

      {/* Stats */}
      <div className="user-stats">
        <div className="stat-item">
          <span className="stat-number">{userStats.total}</span>
          <span className="stat-label">Tổng người dùng</span>
        </div>
        <div className="stat-item admin">
          <span className="stat-number">{userStats.admins}</span>
          <span className="stat-label">Quản trị viên</span>
        </div>
        <div className="stat-item customer">
          <span className="stat-number">{userStats.customers}</span>
          <span className="stat-label">Khách hàng</span>
        </div>
      </div>

      {/* Filters */}
      <div className="filters">
        <div className="search-box">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.35-4.35"></path>
          </svg>
          <input
            type="text"
            placeholder="Tìm kiếm theo tên hoặc email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className="role-filter"
        >
          <option value="all">Tất cả quyền</option>
          <option value="admin">Quản trị viên</option>
          <option value="user">Khách hàng</option>
        </select>
      </div>

      {/* Users Table */}
      <div className="users-table">
        <table>
          <colgroup>
            <col style={{ width: '8%' }} />
            <col style={{ width: '20%' }} />
            <col style={{ width: '25%' }} />
            <col style={{ width: '13%' }} />
            <col style={{ width: '12%' }} />
            <col style={{ width: '12%' }} />
            <col style={{ width: '10%' }} />
          </colgroup>
          <thead>
            <tr>
              <th>ID</th>
              <th>Tên</th>
              <th>Email</th>
              <th>Điện thoại</th>
              <th>Quyền</th>
              <th>Ngày tạo</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => {
              const role = getRoleBadge(user.role)
              return (
                <tr key={user.id}>
                  <td>#{user.id}</td>
                  <td className="user-name">{user.name}</td>
                  <td className="user-email">{user.email}</td>
                  <td>{user.phone || 'Chưa có'}</td>
                  <td>
                    <span className={`role-badge ${role.class}`}>
                      {role.text}
                    </span>
                  </td>
                  <td>{formatDate(user.createdAt)}</td>
                  <td className="actions">
                    <button 
                      className="btn-edit"
                      onClick={() => handleEdit(user)}
                    >
                      <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                      </svg>
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{editingUser ? 'Sửa người dùng' : 'Thêm người dùng mới'}</h3>
              <button className="modal-close" onClick={() => setShowModal(false)}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Tên *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Nhập tên người dùng"
                  required
                />
              </div>

              <div className="form-group">
                <label>Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="email@example.com"
                  required
                />
              </div>

              <div className="form-group">
                <label>Điện thoại</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="0123456789"
                />
              </div>

              <div className="form-group">
                <label>Mật khẩu {editingUser ? '' : '*'}</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder={editingUser ? 'Để trống nếu không đổi' : 'Nhập mật khẩu'}
                  required={!editingUser}
                />
                {editingUser && <small>Để trống nếu không muốn thay đổi mật khẩu</small>}
              </div>

              <div className="form-group">
                <label>Quyền *</label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  required
                >
                  <option value="user">Khách hàng</option>
                  <option value="admin">Quản trị viên</option>
                </select>
              </div>

              <div className="form-actions">
                {editingUser && (
                  <button 
                    type="button" 
                    className="btn-delete-modal" 
                    onClick={() => deleteUser(editingUser.id)}
                  >
                    <svg width="18" height="18" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    Xóa
                  </button>
                )}
                <div className="form-actions-right">
                  <button type="button" className="btn-secondary" onClick={() => setShowModal(false)}>
                    Hủy
                  </button>
                  <button type="submit" className="btn-primary">
                    {editingUser ? 'Cập nhật' : 'Thêm mới'}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminUsers