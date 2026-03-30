import { useState } from 'react'
import './CategoryProducts.css'

const CategoryProducts = () => {
  const [activeCategory, setActiveCategory] = useState('di-lam')

  const categories = [
    { id: 'di-lam', label: 'ĐỒ ĐI LÀM' },
    { id: 'di-choi', label: 'ĐỒ ĐI CHƠI' },
    { id: 'di-tiec', label: 'ĐỒ ĐI TIỆC' }
  ]

  const products = {
    'di-lam': [
      { id: 1, name: 'Quần âm công sở ống suông ống lưng cao', price: 400000, image: '/images/cat-1.jpg' },
      { id: 2, name: 'Áo sơ mi nữ kẻ sọc xanh trắng', price: 360000, image: '/images/cat-2.jpg' },
      { id: 3, name: 'Chân váy midi công sở màu đen dáng xòe', price: 380000, image: '/images/cat-3.jpg' },
      { id: 4, name: 'Đầm chữ A họa tiết hoa cổ thuyền lệch nhún vai', price: 480000, image: '/images/cat-4.jpg' },
      { id: 5, name: 'Đầm đen xòe chữ A phối ren kèm cổ áo nơ', price: 620000, image: '/images/cat-5.jpg' },
      { id: 6, name: 'Đầm xòe màu xanh đen cổ xếp ly', price: 650000, image: '/images/cat-6.jpg' }
    ],
    'di-choi': [
      { id: 7, name: 'Áo thun basic trắng', price: 250000, image: '/images/cat-7.jpg' },
      { id: 8, name: 'Quần jean ống rộng', price: 450000, image: '/images/cat-8.jpg' }
    ],
    'di-tiec': [
      { id: 9, name: 'Đầm dạ hội sang trọng', price: 890000, image: '/images/cat-9.jpg' },
      { id: 10, name: 'Váy xòe dự tiệc', price: 750000, image: '/images/cat-10.jpg' }
    ]
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
        <div className="category-products-grid">
          {products[activeCategory].map((product) => (
            <div key={product.id} className="category-product-card">
              <div className="category-product-image">
                <div className="category-image-placeholder">
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
              <div className="category-product-info">
                <h3 className="category-product-name">{product.name}</h3>
                <p className="category-product-price">{formatPrice(product.price)}</p>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="view-all-wrapper">
          <button className="btn-view-all-category">XEM TẤT CẢ ĐỒ {categories.find(c => c.id === activeCategory)?.label}</button>
        </div>
      </div>
    </section>
  )
}

export default CategoryProducts
