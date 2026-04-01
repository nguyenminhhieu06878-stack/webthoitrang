import { useState, useEffect } from 'react'
import './CategoryProducts.css'

const CategoryProducts = () => {
  const [activeCategory, setActiveCategory] = useState('di-lam')
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  const categories = [
    { id: 'di-lam', label: 'ĐỒ ĐI LÀM', dbCategory: 'Váy Đầm Công Sở' },
    { id: 'di-choi', label: 'ĐỒ ĐI CHƠI', dbCategory: 'New Collection' },
    { id: 'di-tiec', label: 'ĐỒ ĐI TIỆC', dbCategory: 'Áo Khoác' }
  ]

  useEffect(() => {
    const category = categories.find(c => c.id === activeCategory)
    if (category) {
      fetchProducts(category.dbCategory)
    }
  }, [activeCategory])

  const fetchProducts = async (dbCategory) => {
    setLoading(true)
    try {
      const response = await fetch(`http://localhost:5001/api/products?category=${dbCategory}`)
      const data = await response.json()
      const productsData = data.products || data || []
      setProducts(productsData.slice(0, 6)) // Lấy 6 sản phẩm đầu tiên
    } catch (error) {
      console.error('Error fetching products:', error)
    } finally {
      setLoading(false)
    }
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price)
  }

  return (
    <section className="category-products">
      <div className="container">
        {/* Category Tabs */}
        <div className="category-tabs">
          {categories.map((category) => (
            <button
              key={category.id}
              className={`category-tab ${activeCategory === category.id ? 'active' : ''}`}
              onClick={() => setActiveCategory(category.id)}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        {loading ? (
          <p style={{ textAlign: 'center', padding: '40px' }}>Đang tải...</p>
        ) : (
          <div className="category-products-grid">
            {products.map((product) => (
              <div key={product.id} className="category-product-card">
                <a href={`/product/${product.id}`} className="category-product-link">
                  <div className="category-product-image">
                    <div className="category-image-placeholder">
                      <img 
                        src={product.images?.[0] || 'https://via.placeholder.com/300x400/f0f0f0/666?text=No+Image'} 
                        alt={product.name}
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/300x400/f0f0f0/666?text=No+Image'
                        }}
                      />
                    </div>
                  </div>
                  <div className="category-product-info">
                    <h3 className="category-product-name">{product.name}</h3>
                    <p className="category-product-price">{formatPrice(product.price)}</p>
                  </div>
                </a>
              </div>
            ))}
          </div>
        )}

        {/* View All Button */}
        <div className="view-all-wrapper">
          <a href={activeCategory === 'di-lam' ? '/category/vay-dam-cong-so' : activeCategory === 'di-choi' ? '/new-collection' : '/category/ao-khoac'}>
            <button className="btn-view-all-category">
              XEM TẤT CẢ {categories.find(c => c.id === activeCategory)?.label}
            </button>
          </a>
        </div>
      </div>
    </section>
  )
}

export default CategoryProducts
