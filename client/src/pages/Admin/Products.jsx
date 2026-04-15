import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import './Products.css'

const Products = () => {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(10)
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    price: '',
    category: '',
    sizes: '',
    stock: '',
    featured: false,
    description: '',
    images: ''
  })

  useEffect(() => {
    fetchProducts()
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    try {
      const response = await fetch('http://localhost:5001/api/categories')
      const data = await response.json()
      const categoriesData = data.categories || []
      // Ensure we have valid array of objects with name property
      setCategories(Array.isArray(categoriesData) ? categoriesData : [])
    } catch (error) {
      console.error('Error fetching categories:', error)
      setCategories([])
    }
  }

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:5001/api/products')
      const data = await response.json()
      setProducts(data.products || [])
    } catch (error) {
      console.error('Error fetching products:', error)
      toast.error('Không thể tải danh sách sản phẩm')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    try {
      const token = localStorage.getItem('token')
      const url = editingProduct 
        ? `http://localhost:5001/api/products/${editingProduct.id}`
        : 'http://localhost:5001/api/products'
      
      const method = editingProduct ? 'PUT' : 'POST'
      
      const productData = {
        ...formData,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock),
        sizes: formData.sizes ? formData.sizes.split(',').map(s => s.trim()).filter(s => s) : [],
        images: formData.images ? formData.images.split(',').map(s => s.trim()).filter(s => s) : [],
        description: formData.description || ''
      }

      console.log('Sending product data:', productData) // Debug log

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(productData)
      })

      const responseData = await response.json()
      console.log('Response:', responseData) // Debug log

      if (response.ok) {
        toast.success(editingProduct ? 'Cập nhật sản phẩm thành công!' : 'Thêm sản phẩm thành công!')
        setShowModal(false)
        setEditingProduct(null)
        resetForm()
        fetchProducts()
      } else {
        console.error('Server error:', responseData)
        toast.error(responseData.message || 'Có lỗi xảy ra')
      }
    } catch (error) {
      console.error('Error saving product:', error)
      toast.error('Có lỗi xảy ra: ' + error.message)
    }
  }

  const handleEdit = (product) => {
    setEditingProduct(product)
    setFormData({
      name: product.name,
      code: product.code,
      price: product.price.toString(),
      category: product.category,
      sizes: Array.isArray(product.sizes) ? product.sizes.join(', ') : product.sizes,
      stock: product.stock.toString(),
      featured: product.featured,
      description: product.description || '',
      images: Array.isArray(product.images) ? product.images.join(', ') : (product.images || '')
    })
    setShowModal(true)
  }

  const handleDelete = async (id) => {
    if (!confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) return

    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`http://localhost:5001/api/products/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (response.ok) {
        toast.success('Xóa sản phẩm thành công!')
        fetchProducts()
      } else {
        toast.error('Có lỗi xảy ra')
      }
    } catch (error) {
      console.error('Error deleting product:', error)
      toast.error('Có lỗi xảy ra')
    }
  }

  const resetForm = () => {
    setFormData({
      name: '',
      code: '',
      price: '',
      category: '',
      sizes: '',
      stock: '',
      featured: false,
      description: '',
      images: ''
    })
  }

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.code.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter
    return matchesSearch && matchesCategory
  })

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentProducts = filteredProducts.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage)

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price)
  }

  if (loading) {
    return <div className="admin-loading">Đang tải...</div>
  }

  return (
    <div className="admin-products">
      <div className="page-header">
        <h2>Quản lý sản phẩm</h2>
        <button className="btn-primary" onClick={() => setShowModal(true)}>
          Thêm sản phẩm
        </button>
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
            placeholder="Tìm kiếm sản phẩm..."
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
          {Array.isArray(categories) && categories.map((category, index) => (
            category && category.name ? (
              <option key={`filter-${category.id}-${index}`} value={category.name}>
                {category.name}
              </option>
            ) : null
          ))}
        </select>
      </div>

      {/* Products Table */}
      <div className="products-table">
        <table>
          <colgroup>
            <col style={{ width: '10%' }} />
            <col style={{ width: '25%' }} />
            <col style={{ width: '18%' }} />
            <col style={{ width: '12%' }} />
            <col style={{ width: '10%' }} />
            <col style={{ width: '10%' }} />
            <col style={{ width: '15%' }} />
          </colgroup>
          <thead>
            <tr>
              <th>Mã SP</th>
              <th>Tên sản phẩm</th>
              <th>Danh mục</th>
              <th>Giá</th>
              <th>Tồn kho</th>
              <th>Nổi bật</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {currentProducts.map((product) => (
              <tr key={product.id}>
                <td className="product-code">{product.code}</td>
                <td className="product-name">{product.name}</td>
                <td>{product.category}</td>
                <td className="product-price">{formatPrice(product.price)}</td>
                <td className="product-stock">{product.stock}</td>
                <td>
                  <span className={`featured-badge ${product.featured ? 'yes' : 'no'}`}>
                    {product.featured ? 'Có' : 'Không'}
                  </span>
                </td>
                <td className="actions">
                  <button className="btn-edit" onClick={() => handleEdit(product)}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="pagination">
          <button 
            className="pagination-btn"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Trước
          </button>
          
          <div className="pagination-numbers">
            {[...Array(totalPages)].map((_, index) => {
              const pageNumber = index + 1
              // Show first page, last page, current page, and pages around current
              if (
                pageNumber === 1 ||
                pageNumber === totalPages ||
                (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
              ) {
                return (
                  <button
                    key={pageNumber}
                    className={`pagination-number ${currentPage === pageNumber ? 'active' : ''}`}
                    onClick={() => handlePageChange(pageNumber)}
                  >
                    {pageNumber}
                  </button>
                )
              } else if (
                pageNumber === currentPage - 2 ||
                pageNumber === currentPage + 2
              ) {
                return <span key={pageNumber} className="pagination-dots">...</span>
              }
              return null
            })}
          </div>

          <button 
            className="pagination-btn"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Sau
          </button>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{editingProduct ? 'Sửa sản phẩm' : 'Thêm sản phẩm mới'}</h3>
              <button className="modal-close" onClick={() => setShowModal(false)}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="product-form">
              <div className="form-grid">
                <div className="form-group">
                  <label>Tên sản phẩm *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Mã sản phẩm *</label>
                  <input
                    type="text"
                    value={formData.code}
                    onChange={(e) => setFormData({...formData, code: e.target.value})}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Giá *</label>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({...formData, price: e.target.value})}
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
                    {Array.isArray(categories) && categories.map((category, index) => (
                      category && category.name ? (
                        <option key={`${category.id}-${index}`} value={category.name}>
                          {category.name}
                        </option>
                      ) : null
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>Kích thước (phân cách bằng dấu phẩy)</label>
                  <input
                    type="text"
                    value={formData.sizes}
                    onChange={(e) => setFormData({...formData, sizes: e.target.value})}
                    placeholder="S, M, L, XL"
                  />
                </div>

                <div className="form-group">
                  <label>Tồn kho *</label>
                  <input
                    type="number"
                    value={formData.stock}
                    onChange={(e) => setFormData({...formData, stock: e.target.value})}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Mô tả sản phẩm</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  rows="4"
                  placeholder="Nhập mô tả chi tiết về sản phẩm..."
                />
              </div>

              <div className="form-group">
                <label>Hình ảnh (URL)</label>
                <textarea
                  value={formData.images}
                  onChange={(e) => setFormData({...formData, images: e.target.value})}
                  placeholder="Nhập URL hình ảnh, phân cách bằng dấu phẩy. VD: https://example.com/image1.jpg, https://example.com/image2.jpg"
                  rows="3"
                />
                <small>Nhập URL hình ảnh, phân cách bằng dấu phẩy</small>
              </div>

              <div className="form-group checkbox-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={formData.featured}
                    onChange={(e) => setFormData({...formData, featured: e.target.checked})}
                  />
                  <span className="checkmark"></span>
                  Sản phẩm nổi bật
                </label>
              </div>

              <div className="form-actions">
                {editingProduct && (
                  <button 
                    type="button" 
                    className="btn-delete-modal" 
                    onClick={() => handleDelete(editingProduct.id)}
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
                    {editingProduct ? 'Cập nhật' : 'Thêm mới'}
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

export default Products