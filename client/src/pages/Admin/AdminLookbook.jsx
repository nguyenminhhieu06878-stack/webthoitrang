import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import './AdminLookbook.css'

const AdminLookbook = () => {
  const [lookbooks, setLookbooks] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingLookbook, setEditingLookbook] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [seasonFilter, setSeasonFilter] = useState('all')
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '',
    season: '',
    featured: false,
    order: 0
  })

  const seasons = [
    'Spring 2024',
    'Summer 2024',
    'Fall 2024',
    'Winter 2024',
    'Spring 2025',
    'Summer 2025',
    'Fall 2025',
    'Winter 2025'
  ]

  useEffect(() => {
    fetchLookbooks()
  }, [])

  const fetchLookbooks = async () => {
    try {
      const response = await fetch('http://localhost:5001/api/lookbook')
      const data = await response.json()
      setLookbooks(data.lookbooks || [])
    } catch (error) {
      console.error('Error fetching lookbooks:', error)
      toast.error('Không thể tải danh sách lookbook')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    try {
      const token = localStorage.getItem('token')
      const url = editingLookbook 
        ? `http://localhost:5001/api/lookbook/${editingLookbook.id}`
        : 'http://localhost:5001/api/lookbook'
      
      const method = editingLookbook ? 'PUT' : 'POST'
      
      const lookbookData = {
        ...formData,
        order: parseInt(formData.order)
      }

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(lookbookData)
      })

      if (response.ok) {
        toast.success(editingLookbook ? 'Cập nhật lookbook thành công!' : 'Thêm lookbook thành công!')
        setShowModal(false)
        setEditingLookbook(null)
        resetForm()
        fetchLookbooks()
      } else {
        toast.error('Có lỗi xảy ra')
      }
    } catch (error) {
      console.error('Error saving lookbook:', error)
      toast.error('Có lỗi xảy ra')
    }
  }

  const handleEdit = (lookbook) => {
    setEditingLookbook(lookbook)
    setFormData({
      title: lookbook.title,
      description: lookbook.description || '',
      image: lookbook.image,
      season: lookbook.season || '',
      featured: lookbook.featured,
      order: lookbook.order || 0
    })
    setShowModal(true)
  }

  const handleDelete = async (id) => {
    if (!confirm('Bạn có chắc chắn muốn xóa lookbook này?')) return

    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`http://localhost:5001/api/lookbook/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (response.ok) {
        toast.success('Xóa lookbook thành công!')
        fetchLookbooks()
      } else {
        toast.error('Có lỗi xảy ra')
      }
    } catch (error) {
      console.error('Error deleting lookbook:', error)
      toast.error('Có lỗi xảy ra')
    }
  }

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      image: '',
      season: '',
      featured: false,
      order: 0
    })
  }

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('vi-VN')
  }

  const filteredLookbooks = lookbooks.filter(lookbook => {
    const matchesSearch = lookbook.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesSeason = seasonFilter === 'all' || lookbook.season === seasonFilter
    return matchesSearch && matchesSeason
  })

  const lookbookStats = {
    total: lookbooks.length,
    featured: lookbooks.filter(l => l.featured).length,
    seasons: [...new Set(lookbooks.map(l => l.season).filter(Boolean))].length
  }

  if (loading) {
    return <div className="admin-loading">Đang tải...</div>
  }

  return (
    <div className="admin-lookbook">
      <div className="page-header">
        <h2>Quản lý Lookbook</h2>
        <button className="btn-primary" onClick={() => setShowModal(true)}>
          Thêm lookbook
        </button>
      </div>

      {/* Stats */}
      <div className="lookbook-stats">
        <div className="stat-item">
          <span className="stat-number">{lookbookStats.total}</span>
          <span className="stat-label">Tổng lookbook</span>
        </div>
        <div className="stat-item featured">
          <span className="stat-number">{lookbookStats.featured}</span>
          <span className="stat-label">Nổi bật</span>
        </div>
        <div className="stat-item seasons">
          <span className="stat-number">{lookbookStats.seasons}</span>
          <span className="stat-label">Mùa</span>
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
            placeholder="Tìm kiếm lookbook..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <select
          value={seasonFilter}
          onChange={(e) => setSeasonFilter(e.target.value)}
          className="season-filter"
        >
          <option value="all">Tất cả mùa</option>
          {seasons.map(season => (
            <option key={season} value={season}>{season}</option>
          ))}
        </select>
      </div>

      {/* Lookbook Grid */}
      <div className="lookbook-grid">
        {filteredLookbooks.map((lookbook) => (
          <div key={lookbook.id} className="lookbook-card">
            <div className="lookbook-image">
              <img src={lookbook.image} alt={lookbook.title} />
              {lookbook.featured && (
                <div className="featured-badge">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                </div>
              )}
            </div>
            <div className="lookbook-info">
              <h3 className="lookbook-title">{lookbook.title}</h3>
              {lookbook.description && (
                <p className="lookbook-description">{lookbook.description}</p>
              )}
              {lookbook.season && (
                <div className="lookbook-season">{lookbook.season}</div>
              )}
              <div className="lookbook-meta">
                <span className="order">Thứ tự: {lookbook.order}</span>
                <span className="date">{formatDate(lookbook.createdAt)}</span>
              </div>
            </div>
            <div className="lookbook-actions">
              <button className="btn-edit" onClick={() => handleEdit(lookbook)}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                </svg>
              </button>
              <button className="btn-delete" onClick={() => handleDelete(lookbook.id)}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="3 6 5 6 21 6"></polyline>
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{editingLookbook ? 'Sửa lookbook' : 'Thêm lookbook mới'}</h3>
              <button className="modal-close" onClick={() => setShowModal(false)}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="lookbook-form">
              <div className="form-grid">
                <div className="form-group">
                  <label>Tiêu đề *</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Mùa</label>
                  <select
                    value={formData.season}
                    onChange={(e) => setFormData({...formData, season: e.target.value})}
                  >
                    <option value="">Chọn mùa</option>
                    {seasons.map(season => (
                      <option key={season} value={season}>{season}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group full-width">
                  <label>Hình ảnh (URL) *</label>
                  <input
                    type="text"
                    value={formData.image}
                    onChange={(e) => setFormData({...formData, image: e.target.value})}
                    placeholder="/lookbook/lookbook1.png"
                    required
                  />
                </div>

                <div className="form-group full-width">
                  <label>Mô tả</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    rows="3"
                  />
                </div>

                <div className="form-group">
                  <label>Thứ tự hiển thị</label>
                  <input
                    type="number"
                    value={formData.order}
                    onChange={(e) => setFormData({...formData, order: e.target.value})}
                    min="0"
                  />
                </div>
              </div>

              <div className="form-group checkbox-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={formData.featured}
                    onChange={(e) => setFormData({...formData, featured: e.target.checked})}
                  />
                  <span className="checkmark"></span>
                  Lookbook nổi bật
                </label>
              </div>

              <div className="form-actions">
                <button type="button" className="btn-secondary" onClick={() => setShowModal(false)}>
                  Hủy
                </button>
                <button type="submit" className="btn-primary">
                  {editingLookbook ? 'Cập nhật' : 'Thêm mới'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminLookbook