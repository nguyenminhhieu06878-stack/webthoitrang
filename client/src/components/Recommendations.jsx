import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import './Recommendations.css'

const Recommendations = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:5001/api/products?featured=true')
      const data = await response.json()
      // Lấy 4 sản phẩm ngẫu nhiên
      const productsData = data.products || data || []
      const shuffled = productsData.sort(() => 0.5 - Math.random())
      setProducts(shuffled.slice(0, 4))
    } catch (error) {
      console.error('Error fetching products:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleAddToCart = (product, e) => {
    e.preventDefault()
    e.stopPropagation()
    
    const cartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images?.[0] || '/images/placeholder.jpg',
      size: product.sizes?.[0] || 'M',
      quantity: 1
    }
    
    const existingCart = JSON.parse(localStorage.getItem('cart') || '[]')
    existingCart.push(cartItem)
    localStorage.setItem('cart', JSON.stringify(existingCart))
    
    // Dispatch custom event to update header
    window.dispatchEvent(new Event('cartUpdated'))
    toast.success('Đã thêm vào giỏ hàng!')
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price)
  }

  return (
    <section className="recommendations">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">GỢI Ý DÀNH RIÊNG CHO BẠN</h2>
          <div className="title-divider">
            <span className="divider-line"></span>
            <span className="divider-icon">◇</span>
            <span className="divider-line"></span>
          </div>
        </div>

        {loading ? (
          <p style={{ textAlign: 'center', padding: '40px' }}>Đang tải...</p>
        ) : (
          <div className="recommendations-grid">
            {products.map((product) => (
              <div key={product.id} className="recommendation-card">
                <a href={`/product/${product.id}`} className="recommendation-link">
                  <div className="recommendation-image">
                    <div className="recommendation-image-placeholder">
                      <img 
                        src={product.images?.[0] || 'https://via.placeholder.com/300x400/f0f0f0/666?text=No+Image'} 
                        alt={product.name}
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/300x400/f0f0f0/666?text=No+Image'
                        }}
                      />
                    </div>
                    <div className="recommendation-overlay">
                      <button 
                        className="btn-add-to-cart"
                        onClick={(e) => handleAddToCart(product, e)}
                      >
                        THÊM VÀO GIỎ
                      </button>
                    </div>
                  </div>
                  <div className="recommendation-info">
                    <h3 className="recommendation-name">{product.name}</h3>
                    <p className="recommendation-price">{formatPrice(product.price)}</p>
                  </div>
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default Recommendations
