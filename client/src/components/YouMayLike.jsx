import { useState, useRef } from 'react'
import './YouMayLike.css'

const YouMayLike = () => {
  const [scrollPosition, setScrollPosition] = useState(0)
  const sliderRef = useRef(null)

  const products = [
    { id: 1, name: 'Đầm hoa nhí chữ A màu xanh sát nách', price: 540000, image: '/images/may-like-1.jpg' },
    { id: 2, name: 'Chân váy xòe xếp ly màu xám', price: 490000, image: '/images/may-like-2.jpg' },
    { id: 3, name: 'Đầm trắng chữ A cổ sơ mi phối nút', price: 700000, image: '/images/may-like-3.jpg' },
    { id: 4, name: 'Đầm công sở hoa tiết dáng xòe cổ V phối nút', price: 590000, image: '/images/may-like-4.jpg' },
    { id: 5, name: 'Đầm công sở chữ A nhẹ eo cổ sơ mi', price: 590000, image: '/images/may-like-5.jpg' },
    { id: 6, name: 'Đầm ren kem dự tiệc dáng xòe', price: 600000, image: '/images/may-like-6.jpg' },
    { id: 7, name: 'Chân váy tơ màu xanh dáng xòe dài', price: 380000, image: '/images/may-like-7.jpg' },
    { id: 8, name: 'Đầm xanh công sở họa trừng viền chữ nổi', price: 590000, image: '/images/may-like-8.jpg' }
  ]

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
            {products.map((product) => (
              <div key={product.id} className="slider-product-card">
                <div className="slider-product-image">
                  <div className="slider-image-placeholder">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      onError={(e) => {
                        e.target.style.display = 'none'
                        e.target.parentElement.classList.add('no-image')
                      }}
                    />
                  </div>
                </div>
                <div className="slider-product-info">
                  <h3 className="slider-product-name">{product.name}</h3>
                  <p className="slider-product-price">{formatPrice(product.price)}</p>
                </div>
              </div>
            ))}
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
