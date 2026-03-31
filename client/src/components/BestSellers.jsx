import { useRef, useState, useEffect } from 'react'
import './BestSellers.css'

const BestSellers = () => {
  const sliderRef = useRef(null)
  const [bestSellers, setBestSellers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchBestSellers()
  }, [])

  const fetchBestSellers = async () => {
    try {
      const response = await fetch('http://localhost:5001/api/products?featured=true')
      const data = await response.json()
      // Lấy 6 sản phẩm featured
      setBestSellers(data.slice(0, 6))
      setLoading(false)
    } catch (error) {
      console.error('Error fetching best sellers:', error)
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
  }

  if (loading) {
    return (
      <section className="best-sellers">
        <div className="container">
          <h2 className="best-sellers-title">SẢN PHẨM BÁN CHẠY NHẤT</h2>
          <p style={{ textAlign: 'center', padding: '40px' }}>Đang tải...</p>
        </div>
      </section>
    )
  }

  return (
    <section className="best-sellers">
      <div className="container">
        <h2 className="best-sellers-title">SẢN PHẨM BÁN CHẠY NHẤT</h2>

        <div className="best-sellers-slider-wrapper">
          <button className="slider-nav-btn left" onClick={() => scroll('left')}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>

          <div className="best-sellers-slider" ref={sliderRef}>
            {bestSellers.map((product) => (
              <div key={product.id} className="bestseller-card">
                <a href={`/product/${product.code || product.id}`} className="bestseller-link">
                  <div className="bestseller-image">
                    <div className="bestseller-image-placeholder">
                      <img 
                        src={product.images && product.images[0] ? product.images[0] : '/images/placeholder.jpg'} 
                        alt={product.name}
                        onError={(e) => {
                          e.target.style.display = 'none'
                          e.target.parentElement.classList.add('no-image')
                        }}
                      />
                    </div>
                  </div>
                  <div className="bestseller-info">
                    <p className="bestseller-code">{product.code || `P${product.id}`}</p>
                    <h3 className="bestseller-name">{product.name}</h3>
                    <p className="bestseller-price">{formatPrice(product.price)}</p>
                  </div>
                </a>
              </div>
            ))}
          </div>

          <button className="slider-nav-btn right" onClick={() => scroll('right')}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </div>

        {/* Description Text */}
        <div className="best-sellers-description">
          <p>
            Chúng có những nữ tính, nào có thể cường lợi sức hút của những items mới, nức nở và duyên dáng, chính vì vậy <strong>D'Chic Fashion</strong> luôn đầu đơn bổ sung bộ sưu tập mới và danh mục sản phẩm của mình mỗi tháng để mang cả thật nhiều lựa chọn điện đẹp mới ngày.
          </p>
          <p>
            Không chỉ giới hạn ở vấy đầm công sở, các nàng luôn có thể tìm được những items đi chơi, dạo phố, đi học thật hợp chân mỗi lần đến D'Chic Fashion. Từ những thiết kế tối giản đến những trang phục, mang hẳn sẽ bổi ngộ trước các mẫu mã trang phục mà D'Chic Fashion mang đến, "hô biến" từng cô nàng trở nên thật hợp chân và thời trang và vẫn có kiện. Đến với D'Chic Fashion, mang hẳn sẽ bổi ngộ trước các mẫu mã trang phục mà chúng tôi cho về ngoại của mình đây!
          </p>
        </div>
      </div>
    </section>
  )
}

export default BestSellers
