import { useState } from 'react'
import './Recommendations.css'

const Recommendations = () => {
  const products = [
    {
      id: 1,
      name: 'Đầm midi xòe công sở họa tiết hoa',
      price: 590000,
      image: '/images/rec-1.jpg'
    },
    {
      id: 2,
      name: 'Áo sơ mi trắng cổ vest tay dài',
      price: 380000,
      image: '/images/rec-2.jpg'
    },
    {
      id: 3,
      name: 'Chân váy bút chì đen công sở',
      price: 420000,
      image: '/images/rec-3.jpg'
    },
    {
      id: 4,
      name: 'Đầm xòe dự tiệc phối ren cao cấp',
      price: 750000,
      image: '/images/rec-4.jpg'
    }
  ]

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

        <div className="recommendations-grid">
          {products.map((product) => (
            <div key={product.id} className="recommendation-card">
              <div className="recommendation-image">
                <div className="recommendation-image-placeholder">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    onError={(e) => {
                      e.target.style.display = 'none'
                      e.target.parentElement.classList.add('no-image')
                    }}
                  />
                </div>
                <div className="recommendation-overlay">
                  <button className="btn-add-to-cart">THÊM VÀO GIỎ</button>
                </div>
              </div>
              <div className="recommendation-info">
                <h3 className="recommendation-name">{product.name}</h3>
                <p className="recommendation-price">{formatPrice(product.price)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Recommendations
