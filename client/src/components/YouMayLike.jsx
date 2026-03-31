import { useState, useRef, useEffect } from 'react'
import './YouMayLike.css'

const YouMayLike = () => {
  const [scrollPosition, setScrollPosition] = useState(0)
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const sliderRef = useRef(null)

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:5001/api/products')
      const data = await response.json()
      // Lấy 8 sản phẩm ngẫu nhiên
      const shuffled = data.sort(() => 0.5 - Math.random())
      setProducts(shuffled.slice(0, 8))
    } catch (error) {
      console.error('Error fetching products:', error)
    } finally {
      setLoading(false)
    }
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN').format(price) + ' đ'
  }

  const scroll = (direction) => {
    const container = sliderRef.current
    const scrollAmount = 300
    if (direction === 'left') {
      container.scrollLeft -= scrollAmount
    } else {
      container.scrollLeft += scrollAmount
    }
    setScrollPosition(container.scrollLeft)
  }

  return (
    <section className="you-may-like">
      <div className="container-full">
        <div className="section-header">
          <h2 className="section-title-red">CÓ THỂ NĂNG SẺ THÍCH - KHÁM PHÁ NGAY!</h2>
        </div>

        <div className="slider-container">
          <button className="slider-nav-btn left" onClick={() => scroll('left')}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>

          <div className="products-slider" ref={sliderRef}>
            {loading ? (
              <p style={{ padding: '40px', textAlign: 'center', width: '100%' }}>Đang tải...</p>
            ) : (
              products.map((product) => (
                <div key={product.id} className="slider-product-card">
                  <a href={`/product/${product.id}`} className="slider-product-link">
                    <div className="slider-product-image">
                      <div className="slider-image-placeholder">
                        <img 
                          src={product.images?.[0] || 'https://via.placeholder.com/250x350/f0f0f0/666?text=No+Image'} 
                          alt={product.name}
                          onError={(e) => {
                            e.target.src = 'https://via.placeholder.com/250x350/f0f0f0/666?text=No+Image'
                          }}
                        />
                      </div>
                    </div>
                    <div className="slider-product-info">
                      <h3 className="slider-product-name">{product.name}</h3>
                      <p className="slider-product-price">{formatPrice(product.price)}</p>
                    </div>
                  </a>
                </div>
              ))
            )}
          </div>

          <button className="slider-nav-btn right" onClick={() => scroll('right')}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </div>
      </div>
    </section>
  )
}

export default YouMayLike
