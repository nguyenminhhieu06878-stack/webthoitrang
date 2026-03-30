import { useState, useEffect } from 'react'
import './FeaturedProducts.css'

const FeaturedProducts = () => {
  const [products, setProducts] = useState([])

  // Dữ liệu sản phẩm mẫu - sau này sẽ lấy từ API
  const sampleProducts = [
    {
      id: 1,
      name: 'Đầm hoa A họa tiết hoa cổ thuyền lệch nhún vai',
      price: 590000,
      salePrice: null,
      image: '/images/product-1.jpg',
      sizes: ['S', 'M', 'L']
    },
    {
      id: 2,
      name: 'Đầm ren kem dự tiệc dáng xòe',
      price: 650000,
      salePrice: null,
      image: '/images/product-2.jpg',
      sizes: ['L', 'XL']
    },
    {
      id: 3,
      name: 'Đầm dài midi xòe cổ trơn phối viền đen',
      price: 590000,
      salePrice: null,
      image: '/images/product-3.jpg',
      sizes: ['S', 'M', 'L']
    },
    {
      id: 4,
      name: 'Đầm xòe công sở họa trừng nền xanh đen',
      price: 510000,
      salePrice: null,
      image: '/images/product-4.jpg',
      sizes: ['S', 'M', 'L', 'XL']
    }
  ]

  useEffect(() => {
    // Sau này sẽ fetch từ API: /api/products?featured=true
    setProducts(sampleProducts)
  }, [])

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price)
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
              <div className="product-image-wrapper">
                <div className="product-image-placeholder">
                  <img 
                    src={product.image} 
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
                  {product.salePrice ? (
                    <>
                      <span className="price-sale">{formatPrice(product.salePrice)}</span>
                      <span className="price-original">{formatPrice(product.price)}</span>
                    </>
                  ) : (
                    <span className="price-current">{formatPrice(product.price)}</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="view-all-wrapper">
          <button className="btn-view-all">XEM TẤT CẢ SẢN PHẨM</button>
        </div>
      </div>
    </section>
  )
}

export default FeaturedProducts
