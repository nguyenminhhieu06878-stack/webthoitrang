import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import './AdminCategories.css'

const AdminCategories = () => {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingCategory, setEditingCategory] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: ''
  })

  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    try {
      const response = await fetch('http://localhost:5001/api/categories')
      const data = await response.json()
      setCategories(data.categories || [])
    } catch (error) {
      console.error('Error fetching categories:', error)
      toast.error('Không thể tải danh sách danh mục')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    try {
      const token = localStorage.getItem('token')
      const url = editingCategory 
        ? `http://localhost:5001/api/categories/${editingCategory.id}`
        : 'http://localhost:5001/api/categories'
      
      const method = editingCategory ? 'PUT' : 'POST'
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        toast.success(editingCategory ? 'Cập nhật danh mục thành công!' : 'Thêm danh mục thành công!')
        setShowModal(false)
        setEditingCategory(null)
        resetForm()
        fetchCategories()
      } else {
        const error = await response.json()
        toast.error(error.message || 'Có lỗi xảy ra')
      }
    } catch (error) {
      console.error('Error saving category:', error)
      toast.error('Có lỗi xảy ra')
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Bạn có chắc chắn muốn xóa danh mục này?')) return

    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`http://localhost:5001/api/categories/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (response.ok) {
        toast.success('Xóa danh mục thành công!')
        fetchCategories()
      } else {
        const error = await response.json()
        toast.error(error.message || 'Có lỗi xảy ra')
      }
    } catch (error) {
      console.error('Error deleting category:', error)
      toast.error('Có lỗi xảy ra')
    }
  }

  const handleEdit = (category) => {
    setEditingCategory(category)
    setFormData({
      name: category.name,
      slug: category.slug,
      description: category.description || ''
    })
    setShowModal(true)
  }

  const resetForm = () => {
    setFormData({
      name: '',
      slug: '',
      description: ''
    })
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    // Auto-generate slug from name
    if (name === 'name') {
      const slug = value
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/đ/g, 'd')
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim()
      setFormData(prev => ({ ...prev, slug }))
    }
  }

  if (loading) {
    return <div className="admin-loading">Đang tải...</div>
  }

  return (
    <div className="admin-categories">
      <div className="page-header">
        <h2>Quản lý danh mục</h2>
        <button className="btn-primary" onClick={() => setShowModal(true)}>
          Thêm danh mục
        </button>
      </div>

      {/* Categories Grid */}
      <div className="categories-grid">
        {categories.map((category) => (
          <div key={category.id} className="category-card">
            <div className="category-info">
              <h3>{category.name}</h3>
              <p className="category-slug">/{category.slug}</p>
              <p className="category-count">{category.productCount} sản phẩm</p>
            </div>
            <div className="category-actions">
              <button className="btn-edit" onClick={() => handleEdit(category)}>
                <svg width="18" height="18" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                </svg>
                Chỉnh sửa
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
              <h3>{editingCategory ? 'Sửa danh mục' : 'Thêm danh mục mới'}</h3>
              <button className="modal-close" onClick={() => setShowModal(false)}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Tên danh mục *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Nhập tên danh mục"
                  required
                />
              </div>

              <div className="form-group">
                <label>Slug (URL)</label>
                <input
                  type="text"
                  name="slug"
                  value={formData.slug}
                  onChange={handleInputChange}
                  placeholder="ten-danh-muc"
                />
                <small>Tự động tạo từ tên danh mục</small>
              </div>

              <div className="form-group">
                <label>Mô tả</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Mô tả về danh mục"
                  rows="3"
                />
              </div>

              <div className="form-actions">
                {editingCategory && (
                  <button 
                    type="button" 
                    className="btn-delete-modal" 
                    onClick={() => handleDelete(editingCategory.id)}
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
                    {editingCategory ? 'Cập nhật' : 'Thêm mới'}
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

export default AdminCategories
