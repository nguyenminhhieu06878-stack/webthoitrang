import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'
import './Profile.css'

const Profile = () => {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: {
      street: '',
      city: '',
      district: '',
      ward: ''
    }
  })
  const [loading, setLoading] = useState(false)
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    const userData = localStorage.getItem('user')
    const token = localStorage.getItem('token')
    
    if (!userData || !token) {
      navigate('/dang-nhap')
      return
    }

    const parsedUser = JSON.parse(userData)
    setUser(parsedUser)
    setFormData({
      name: parsedUser.name || '',
      email: parsedUser.email || '',
      phone: parsedUser.phone || '',
      address: parsedUser.address || {
        street: '',
        city: '',
        district: '',
        ward: ''
      }
    })
  }, [navigate])

  const handleChange = (e) => {
    const { name, value } = e.target
    
    if (['street', 'city', 'district', 'ward'].includes(name)) {
      setFormData(prev => ({
        ...prev,
        address: {
          ...prev.address,
          [name]: value
        }
      }))
    } else {
      setFormData(prev => ({ ...prev, [name]: value }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const token = localStorage.getItem('token')
      const response = await axios.put(
        'http://localhost:5001/api/users/profile',
        {
          name: formData.name,
          phone: formData.phone,
          address: formData.address
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      localStorage.setItem('user', JSON.stringify(response.data.user))
      setUser(response.data.user)
      setIsEditing(false)
      toast.success('Cập nhật thông tin thành công!')
    } catch (error) {
      toast.error(error.response?.data?.message || 'Cập nhật thất bại')
    } finally {
      setLoading(false)
    }
  }

  if (!user) return null

  return (
    <main className="profile-page">
      <div className="breadcrumb">
        <div className="container">
          <a href="/">Trang chủ</a>
          <span className="separator">/</span>
          <span className="current">Thông tin tài khoản</span>
        </div>
      </div>

      <div className="profile-content">
        <div className="container">
          <div className="profile-box">
            <div className="profile-header">
              <div className="profile-avatar">
                <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </div>
              <h2>{user.name}</h2>
              <p className="user-email">{user.email}</p>
              {user.role === 'admin' && <span className="admin-badge">Admin</span>}
            </div>

            <div className="profile-body">
              {!isEditing ? (
                <div className="profile-info">
                  <div className="info-group">
                    <label>Họ tên</label>
                    <p>{user.name}</p>
                  </div>
                  <div className="info-group">
                    <label>Email</label>
                    <p>{user.email}</p>
                  </div>
                  <div className="info-group">
                    <label>Số điện thoại</label>
                    <p>{user.phone || 'Chưa cập nhật'}</p>
                  </div>
                  <div className="info-group">
                    <label>Địa chỉ</label>
                    <p>
                      {user.address?.street && user.address?.city
                        ? `${user.address.street}, ${user.address.ward}, ${user.address.district}, ${user.address.city}`
                        : 'Chưa cập nhật'}
                    </p>
                  </div>
                  <button onClick={() => setIsEditing(true)} className="btn-edit">
                    Chỉnh sửa thông tin
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="profile-form">
                  <div className="form-group">
                    <label htmlFor="name">Họ tên *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="email">Email (không thể thay đổi)</label>
                    <input
                      type="email"
                      id="email"
                      value={formData.email}
                      disabled
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="phone">Số điện thoại</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="city">Tỉnh / Thành phố</label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={formData.address.city}
                      onChange={handleChange}
                      placeholder="VD: TP. Hồ Chí Minh"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="district">Quận / Huyện</label>
                    <input
                      type="text"
                      id="district"
                      name="district"
                      value={formData.address.district}
                      onChange={handleChange}
                      placeholder="VD: Quận 1"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="ward">Phường / Xã</label>
                    <input
                      type="text"
                      id="ward"
                      name="ward"
                      value={formData.address.ward}
                      onChange={handleChange}
                      placeholder="VD: Phường Bến Nghé"
                    />
                  </div>

                  <div className="form-group full-width">
                    <label htmlFor="street">Địa chỉ chi tiết</label>
                    <textarea
                      id="street"
                      name="street"
                      value={formData.address.street}
                      onChange={handleChange}
                      rows="2"
                      placeholder="Số nhà, tên đường..."
                    ></textarea>
                  </div>

                  <div className="form-actions">
                    <button type="submit" className="btn-save" disabled={loading}>
                      {loading ? 'Đang lưu...' : 'Lưu thay đổi'}
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsEditing(false)}
                      className="btn-cancel"
                    >
                      Hủy
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Profile
