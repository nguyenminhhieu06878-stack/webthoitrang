import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import './ProductDetail.css'

const ProductDetail = () => {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedSize, setSelectedSize] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [activeAccordion, setActiveAccordion] = useState('')
  const [hotProducts, setHotProducts] = useState([])
  const [relatedProducts, setRelatedProducts] = useState([])

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:5001/api/products/${id}`)
        if (!response.ok) {
          throw new Error('Product not found')
        }
        const data = await response.json()
        setProduct(data)
        // Set default size if available
        if (data.sizes && data.sizes.length > 0) {
          setSelectedSize(data.sizes[0])
        }

        // Fetch hot products (featured products)
        const hotResponse = await fetch('http://localhost:5001/api/products?featured=true')
        const hotData = await hotResponse.json()
        setHotProducts(hotData.slice(0, 6))

        // Fetch related products (same category)
        if (data.category) {
          const relatedResponse = await fetch(`http://localhost:5001/api/products?category=${data.category}`)
          const relatedData = await relatedResponse.json()
          // Filter out current product and take 4 products
          setRelatedProducts(relatedData.filter(p => p.id !== data.id).slice(0, 4))
        }
      } catch (error) {
        console.error('Error fetching product:', error)
        toast.error('Không tìm thấy sản phẩm')
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [id])

  if (loading) {
    return (
      <main className="product-detail-page">
        <div className="product-container">
          <div className="container">
            <p style={{ textAlign: 'center', padding: '2rem' }}>Đang tải...</p>
          </div>
        </div>
      </main>
    )
  }

  if (!product) {
    return (
      <main className="product-detail-page">
        <div className="product-container">
          <div className="container">
            <p style={{ textAlign: 'center', padding: '2rem' }}>Không tìm thấy sản phẩm</p>
          </div>
        </div>
      </main>
    )
  }

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.warning('Vui lòng chọn size')
      return
    }
    const cartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      size: selectedSize,
      quantity: quantity
    }
    const existingCart = JSON.parse(localStorage.getItem('cart') || '[]')
    existingCart.push(cartItem)
    localStorage.setItem('cart', JSON.stringify(existingCart))
    // Dispatch custom event to update header
    window.dispatchEvent(new Event('cartUpdated'))
    toast.success('Đã thêm vào giỏ hàng!')
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN').format(price) + ' ₫'
  }

  const toggleAccordion = (section) => {
    setActiveAccordion(activeAccordion === section ? '' : section)
  }

  return (
    <main className="product-detail-page">
      <div className="product-container">
        <div className="container">
          <div className="product-layout">
            {/* Left: Image Gallery */}
            <div className="product-gallery">
              <div className="thumbnail-column">
                {product.images && product.images.length > 0 ? (
                  product.images.map((img, index) => (
                    <div 
                      key={index} 
                      className={`thumbnail ${selectedImage === index ? 'active' : ''}`} 
                      onClick={() => setSelectedImage(index)}
                    >
                      <img src={img} alt="" onError={(e) => e.target.src = 'https://via.placeholder.com/100x120/f0f0f0/666?text=No+Image'} />
                    </div>
                  ))
                ) : (
                  <div className="thumbnail active">
                    <img src="https://via.placeholder.com/100x120/f0f0f0/666?text=No+Image" alt="" />
                  </div>
                )}
              </div>
              <div className="main-image-wrapper">
                <button className="zoom-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/>
                  </svg>
                </button>
                <img 
                  src={product.images && product.images.length > 0 ? product.images[selectedImage] : 'https://via.placeholder.com/500x600/f0f0f0/666?text=No+Image'} 
                  alt={product.name}
                  onError={(e) => e.target.src = 'https://via.placeholder.com/500x600/f0f0f0/666?text=No+Image'}
                />
              </div>
            </div>

            {/* Right: Product Info */}
            <div className="product-details">
              <h1 className="product-name">{product.name}</h1>
              <p className="product-sku">Mã SP: <span>{product.code}</span></p>
              
              <div className="product-price-section">
                <span className="price">{formatPrice(product.price)}</span>
              </div>

              {/* Size Selection */}
              <div className="size-selection">
                <label>Size</label>
                <div className="size-buttons">
                  {product.sizes && product.sizes.map(size => (
                    <button 
                      key={size} 
                      className={`size-btn ${selectedSize === size ? 'selected' : ''}`} 
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div className="quantity-wrapper">
                <div className="quantity-control">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
                  <input type="number" value={quantity} readOnly />
                  <button onClick={() => setQuantity(quantity + 1)}>+</button>
                </div>
                <a href="#" className="size-guide-link">Bảng size</a>
              </div>

              {/* Add to Cart Button */}
              <button className="add-to-cart-btn" onClick={handleAddToCart}>
                Thêm vào giỏ hàng
              </button>
              
              {/* Points Info */}
              <p className="points-info">
                Tích lũy <strong>{Math.floor(product.price / 20000)} điểm</strong> khi mua sản phẩm này! Tương đương <strong>{formatPrice(Math.floor(product.price / 20000) * 1000)}</strong>
              </p>

              {/* Accordion Sections */}
              <div className="info-accordion">
                <div className="accordion-item">
                  <button 
                    className={`accordion-header ${activeAccordion === 'description' ? 'active' : ''}`}
                    onClick={() => toggleAccordion('description')}
                  >
                    <div className="accordion-title">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                        <polyline points="14 2 14 8 20 8"></polyline>
                      </svg>
                      <span>MÔ TẢ SẢN PHẨM</span>
                    </div>
                    <span className="accordion-icon">{activeAccordion === 'description' ? '-' : '+'}</span>
                  </button>
                  {activeAccordion === 'description' && (
                    <div className="accordion-content">
                      <p>Đầm xòe công sở cổ lệch xếp ly với thiết kế thanh lịch, sang trọng. Phù hợp cho môi trường công sở và các sự kiện quan trọng. Chất liệu vải cao cấp, thoáng mát, dễ chịu khi mặc cả ngày dài.</p>
                    </div>
                  )}
                </div>

                <div className="accordion-item">
                  <button 
                    className={`accordion-header ${activeAccordion === 'return' ? 'active' : ''}`}
                    onClick={() => toggleAccordion('return')}
                  >
                    <div className="accordion-title">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                        <polyline points="23 4 23 10 17 10"></polyline>
                        <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path>
                      </svg>
                      <span>QUY ĐỊNH ĐỔI HÀNG</span>
                    </div>
                    <span className="accordion-icon">{activeAccordion === 'return' ? '-' : '+'}</span>
                  </button>
                  {activeAccordion === 'return' && (
                    <div className="accordion-content">
                      <ul>
                        <li>Đổi hàng trong vòng 7 ngày kể từ ngày nhận hàng</li>
                        <li>Sản phẩm còn nguyên tem mác, chưa qua sử dụng</li>
                        <li>Miễn phí đổi size trong vòng 3 ngày đầu tiên</li>
                      </ul>
                    </div>
                  )}
                </div>

                <div className="accordion-item">
                  <button 
                    className={`accordion-header ${activeAccordion === 'shipping' ? 'active' : ''}`}
                    onClick={() => toggleAccordion('shipping')}
                  >
                    <div className="accordion-title">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                        <rect x="1" y="3" width="15" height="13"></rect>
                        <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
                        <circle cx="5.5" cy="18.5" r="2.5"></circle>
                        <circle cx="18.5" cy="18.5" r="2.5"></circle>
                      </svg>
                      <span>PHÍ VẬN CHUYỂN</span>
                    </div>
                    <span className="accordion-icon">{activeAccordion === 'shipping' ? '-' : '+'}</span>
                  </button>
                  {activeAccordion === 'shipping' && (
                    <div className="accordion-content">
                      <ul>
                        <li>Miễn phí vận chuyển cho đơn hàng từ 500.000đ</li>
                        <li>Phí ship 30.000đ cho đơn hàng dưới 500.000đ</li>
                        <li>Giao hàng toàn quốc trong 2-5 ngày</li>
                      </ul>
                    </div>
                  )}
                </div>
              </div>

              {/* Categories */}
              <div className="product-tags">
                <p className="tags-title">Có thể bạn sẽ thích:</p>
                <div className="tags-list">
                  <a href={`/category/${product.category}`} className="tag-item">{product.category}</a>
                </div>
              </div>
            </div>
          </div>

          {/* Related Products Sections */}
          <section className="related-section">
            <h2 className="section-title">SẢN PHẨM HOT</h2>
            <div className="products-grid-6">
              {hotProducts.map(product => (
                <div key={product.id} className="product-card-large">
                  <a href={`/product/${product.id}`}>
                    <div className="product-image-large">
                      <img 
                        src={product.images?.[0] || `https://via.placeholder.com/300x400/f0f0f0/666?text=${product.code}`} 
                        alt={product.name}
                        onError={(e) => e.target.src = `https://via.placeholder.com/300x400/f0f0f0/666?text=${product.code}`}
                      />
                    </div>
                    <div className="product-info-large">
                      <p className="product-code-large">{product.code}</p>
                      <p className="product-price-large">{formatPrice(product.price)}</p>
                      <h3 className="product-name-large">{product.name}</h3>
                    </div>
                  </a>
                </div>
              ))}
            </div>
          </section>

          <section className="related-section">
            <h2 className="section-title">
              SẢN PHẨM CÙNG DANH MỤC
              <span className="title-divider"></span>
            </h2>
            <div className="products-slider-wrapper">
              <button className="slider-arrow prev-arrow">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
              </button>
              <div className="products-grid-4">
                {relatedProducts.map(product => (
                  <div key={product.id} className="product-card-large">
                    <a href={`/product/${product.id}`}>
                      <div className="product-image-large">
                        <img 
                          src={product.images?.[0] || `https://via.placeholder.com/300x400/f0f0f0/666?text=${product.code}`} 
                          alt={product.name}
                          onError={(e) => e.target.src = `https://via.placeholder.com/300x400/f0f0f0/666?text=${product.code}`}
                        />
                      </div>
                      <div className="product-info-large">
                        <p className="product-code-large">{product.code}</p>
                        <p className="product-price-large">{formatPrice(product.price)}</p>
                        <h3 className="product-name-large">{product.name}</h3>
                      </div>
                    </a>
                  </div>
                ))}
              </div>
              <button className="slider-arrow next-arrow">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </button>
            </div>
          </section>

        </div>
      </div>
    </main>
  )
}

export default ProductDetail
