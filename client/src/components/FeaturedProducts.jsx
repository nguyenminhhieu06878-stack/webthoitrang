import { useState, useEffect } from 'react'
import './FeaturedProducts.css'

const FeaturedProducts = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchFeaturedProducts()
  }, [])

  const fetchFeaturedProducts = async () => {
    try {
      const response = await fetch('http://localhost:5001/api/products?featured=true')
      const data = await response.json()
      // Lấy 4 sản phẩm đầu tiên
      setProducts(data.slice(0, 4))
      setLoading(false)
    } catch (error) {
      console.error('Error fetching featured products:', error)
      setLoading(false)
    }
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price)
  }

  if (loading) {
    return (
      <section className="featured-products">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">SẢN PHẨM NỔI BẬT</h2>
          </div>
          <p style={{ textAlign: 'center', padding: '40px' }}>Đang tải...</p>
        </div>
      </section>
    )
  }

  return (
    <section className="featured-products">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">SẢN PHẨM NỔI BẬT</h2>
          <div className="title-divider">
            <span className="divider-line"></span>
            <span className="divider-icon">◇</span>
            <span className="divider-line"></span>
          </div>
        </div>

        <div className="products-grid">
          {products.map((product) => (
            <div key={product.id} className="product-card">
              <a href={`/product/${product.id}`} className="product-link">
                <div className="product-image-wrapper">
                  <div className="product-image-placeholder">
                    <img 
                      src={product.images && product.images[0] ? product.images[0] : '/images/placeholder.jpg'} 
                      alt={product.name}
                      onError={(e) => {
                        e.target.style.display = 'none'
                        e.target.parentElement.classList.add('no-image')
                      }}
                    />
                  </div>
                  <div className="product-overlay">
                    <button className="btn-quick-view">XEM NHANH</button>
                  </div>
                </div>

                <div className="product-info">
                  <h3 className="product-name">{product.name}</h3>
                  
                  {product.sizes && product.sizes.length > 0 && (
                    <div className="product-sizes">
                      <span className="size-label">SIZE</span>
                      {product.sizes.map((size) => (
                        <span key={size} className="size-item">{size}</span>
                      ))}
                    </div>
                  )}

                  <div className="product-price">
                    <span className="price-current">{formatPrice(product.price)}</span>
                  </div>
                </div>
              </a>
            </div>
          ))}
        </div>

        <div className="view-all-wrapper">
          <a href="/new-collection">
            <button className="btn-view-all">XEM TẤT CẢ SẢN PHẨM</button>
          </a>
        </div>
      </div>
    </section>
  )
}

export default FeaturedProducts
