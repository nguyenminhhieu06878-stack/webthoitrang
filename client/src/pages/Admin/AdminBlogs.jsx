import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import './AdminBlogs.css'

const AdminBlogs = () => {
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingBlog, setEditingBlog] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    image: '',
    category: '',
    featured: false
  })

  const categories = [
    'Bộ sưu tập',
    'Xu hướng',
    'Hướng dẫn',
    'Khuyến mãi',
    'Tin tức'
  ]

  useEffect(() => {
    fetchBlogs()
  }, [])

  const fetchBlogs = async () => {
    try {
      const response = await fetch('http://localhost:5001/api/blogs')
      const data = await response.json()
      setBlogs(data.blogs || [])
    } catch (error) {
      console.error('Error fetching blogs:', error)
      toast.error('Không thể tải danh sách blog')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    try {
      const token = localStorage.getItem('token')
      const url = editingBlog 
        ? `http://localhost:5001/api/blogs/${editingBlog.id}`
        : 'http://localhost:5001/api/blogs'
      
      const method = editingBlog ? 'PUT' : 'POST'
      
      const blogData = {
        ...formData,
        slug: formData.title.toLowerCase()
          .replace(/[^a-z0-9\s]/g, '')
          .replace(/\s+/g, '-')
      }

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(blogData)
      })

      if (response.ok) {
        toast.success(editingBlog ? 'Cập nhật blog thành công!' : 'Thêm blog thành công!')
        setShowModal(false)
        setEditingBlog(null)
        resetForm()
        fetchBlogs()
      } else {
        toast.error('Có lỗi xảy ra')
      }
    } catch (error) {
      console.error('Error saving blog:', error)
      toast.error('Có lỗi xảy ra')
    }
  }

  const handleEdit = (blog) => {
    setEditingBlog(blog)
    setFormData({
      title: blog.title,
      excerpt: blog.excerpt,
      content: blog.content,
      image: blog.image,
      category: blog.category,
      featured: blog.featured
    })
    setShowModal(true)
  }

  const handleDelete = async (id) => {
    if (!confirm('Bạn có chắc chắn muốn xóa blog này?')) return

    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`http://localhost:5001/api/blogs/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (response.ok) {
        toast.success('Xóa blog thành công!')
        fetchBlogs()
      } else {
        toast.error('Có lỗi xảy ra')
      }
    } catch (error) {
      console.error('Error deleting blog:', error)
      toast.error('Có lỗi xảy ra')
    }
  }

  const resetForm = () => {
    setFormData({
      title: '',
      excerpt: '',
      content: '',
      image: '',
      category: '',
      featured: false
    })
  }

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('vi-VN')
  }

  const filteredBlogs = blogs.filter(blog => {
    const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = categoryFilter === 'all' || blog.category === categoryFilter
    return matchesSearch && matchesCategory
  })

  const blogStats = {
    total: blogs.length,
    featured: blogs.filter(b => b.featured).length,
    published: blogs.length // All blogs are published for now
  }

  if (loading) {
    return <div className="admin-loading">Đang tải...</div>
  }

  return (
    <div className="admin-blogs">
      <div className="page-header">
        <h2>Quản lý Blog</h2>
        <button className="btn-primary" onClick={() => setShowModal(true)}>
          Thêm blog
        </button>
      </div>

      {/* Stats */}
      <div className="blog-stats">
        <div className="stat-item">
          <span className="stat-number">{blogStats.total}</span>
          <span className="stat-label">Tổng blog</span>
        </div>
        <div className="stat-item featured">
          <span className="stat-number">{blogStats.featured}</span>
          <span className="stat-label">Nổi bật</span>
        </div>
        <div className="stat-item published">
          <span className="stat-number">{blogStats.published}</span>
          <span className="stat-label">Đã xuất bản</span>
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
            placeholder="Tìm kiếm blog..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="category-filter"
        >
          <option value="all">Tất cả danh mục</option>
          {categories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
      </div>

      {/* Blogs Table */}
      <div className="blogs-table">
        <table>
          <colgroup>
            <col style={{ width: '35%' }} />
            <col style={{ width: '15%' }} />
            <col style={{ width: '10%' }} />
            <col style={{ width: '12%' }} />
            <col style={{ width: '13%' }} />
            <col style={{ width: '15%' }} />
          </colgroup>
          <thead>
            <tr>
              <th>Tiêu đề</th>
              <th>Danh mục</th>
              <th>Lượt xem</th>
              <th>Nổi bật</th>
              <th>Ngày tạo</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {filteredBlogs.map((blog) => (
              <tr key={blog.id}>
                <td className="blog-title">
                  <div className="title-with-image">
                    {blog.image && (
                      <img src={blog.image} alt={blog.title} className="blog-thumbnail" />
                    )}
                    <div>
                      <div className="title">{blog.title}</div>
                      <div className="excerpt">{blog.excerpt}</div>
                    </div>
                  </div>
                </td>
                <td>{blog.category}</td>
                <td>{blog.views || 0}</td>
                <td>
                  <span className={`featured-badge ${blog.featured ? 'yes' : 'no'}`}>
                    {blog.featured ? 'Có' : 'Không'}
                  </span>
                </td>
                <td>{formatDate(blog.createdAt)}</td>
                <td className="actions">
                  <button className="btn-edit" onClick={() => handleEdit(blog)}>
                    <svg width="18" height="18" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content large" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{editingBlog ? 'Sửa blog' : 'Thêm blog mới'}</h3>
              <button className="modal-close" onClick={() => setShowModal(false)}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="blog-form">
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
                  <label>Danh mục *</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    required
                  >
                    <option value="">Chọn danh mục</option>
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group full-width">
                  <label>Hình ảnh (URL)</label>
                  <input
                    type="text"
                    value={formData.image}
                    onChange={(e) => setFormData({...formData, image: e.target.value})}
                    placeholder="/images/blog1.png"
                  />
                </div>

                <div className="form-group full-width">
                  <label>Tóm tắt *</label>
                  <textarea
                    value={formData.excerpt}
                    onChange={(e) => setFormData({...formData, excerpt: e.target.value})}
                    rows="3"
                    required
                  />
                </div>

                <div className="form-group full-width">
                  <label>Nội dung *</label>
                  <textarea
                    value={formData.content}
                    onChange={(e) => setFormData({...formData, content: e.target.value})}
                    rows="8"
                    required
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
                  Blog nổi bật
                </label>
              </div>

              <div className="form-actions">
                <div>
                  {editingBlog && (
                    <button 
                      type="button" 
                      className="btn-delete-modal" 
                      onClick={() => handleDelete(editingBlog.id)}
                    >
                      Xóa blog
                    </button>
                  )}
                </div>
                <div className="form-actions-right">
                  <button type="button" className="btn-secondary" onClick={() => setShowModal(false)}>
                    Hủy
                  </button>
                  <button type="submit" className="btn-primary">
                    {editingBlog ? 'Cập nhật' : 'Thêm mới'}
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

export default AdminBlogs