import { useState } from 'react'
import React from 'react'
import BestSellers from '../components/BestSellers'
import Blog from '../components/Blog'
import './NewCollection.css'

const VayDamCongSo = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const productsPerPage = 25

  const products = [
    {
      id: 1,
      code: 'VD101-20',
      name: 'Váy đầm công sở xanh navy cổ vest',
      price: 590000,
      sizes: ['S', 'M', 'L', 'XL'],
      image: '/images/vay-dam-1.jpg'
    },
    {
      id: 2,
      code: 'VD102-10',
      name: 'Đầm công sở đen dáng chữ A',
      price: 540000,
      image: '/images/vay-dam-2.jpg'
    },
    {
      id: 3,
      code: 'VD103-36',
      name: 'Váy đầm trắng công sở tay lỡ',
      price: 590000,
      image: '/images/vay-dam-3.jpg'
    },
    {
      id: 4,
      code: 'VD104-30',
      name: 'Đầm công sở xám cổ tròn thanh lịch',
      price: 580000,
      image: '/images/vay-dam-4.jpg'
    },
    {
      id: 5,
      code: 'VD105-15',
      name: 'Váy đầm hồng pastel dáng xòe nhẹ',
      price: 560000,
      image: '/images/vay-dam-5.jpg'
    },
    {
      id: 6,
      code: 'VD106-18',
      name: 'Đầm công sở xanh mint cổ sen',
      price: 570000,
      image: '/images/vay-dam-6.jpg'
    },
    {
      id: 7,
      code: 'VD107-02',
      name: 'Váy đầm be công sở tay ngắn',
      price: 550000,
      image: '/images/vay-dam-7.jpg'
    },
    {
      id: 8,
      code: 'VD108-01',
      name: 'Đầm công sở đỏ burgundy thanh lịch',
      price: 600000,
      image: '/images/vay-dam-8.jpg'
    },
    {
      id: 9,
      code: 'VD109-08',
      name: 'Váy đầm xanh lá dáng suông',
      price: 580000,
      image: '/images/vay-dam-9.jpg'
    },
    {
      id: 10,
      code: 'VD110-05',
      name: 'Đầm công sở tím pastel cổ V',
      price: 590000,
      image: '/images/vay-dam-10.jpg'
    },
    {
      id: 11,
      code: 'VD111-12',
      name: 'Váy đầm cam coral dáng xòe',
      price: 560000,
      image: '/images/vay-dam-11.jpg'
    },
    {
      id: 12,
      code: 'VD112-03',
      name: 'Đầm công sở trắng phối đen',
      price: 610000,
      image: '/images/vay-dam-12.jpg'
    },
    {
      id: 13,
      code: 'VD113-15',
      name: 'Váy đầm xanh dương cổ vuông',
      price: 580000,
      image: '/images/vay-dam-13.jpg'
    },
    {
      id: 14,
      code: 'VD114-08',
      name: 'Đầm công sở vàng mustard tay lỡ',
      price: 570000,
      image: '/images/vay-dam-14.jpg'
    },
    {
      id: 15,
      code: 'VD115-20',
      name: 'Váy đầm đen midi thanh lịch',
      price: 620000,
      image: '/images/vay-dam-15.jpg'
    },
    {
      id: 16,
      code: 'VD116-05',
      name: 'Đầm công sở hồng phấn cổ tròn',
      price: 590000,
      image: '/images/vay-dam-16.jpg'
    },
    {
      id: 17,
      code: 'VD117-12',
      name: 'Váy đầm xám xếp ly sang trọng',
      price: 630000,
      image: '/images/vay-dam-17.jpg'
    },
    {
      id: 18,
      code: 'VD118-08',
      name: 'Đầm công sở xanh navy phối trắng',
      price: 600000,
      image: '/images/vay-dam-18.jpg'
    },
    {
      id: 19,
      code: 'VD119-15',
      name: 'Váy đầm be nhạt dáng A',
      price: 580000,
      image: '/images/vay-dam-19.jpg'
    },
    {
      id: 20,
      code: 'VD120-03',
      name: 'Đầm công sở trắng ren cao cấp',
      price: 720000,
      image: '/images/vay-dam-20.jpg'
    },
    {
      id: 21,
      code: 'VD121-10',
      name: 'Váy đầm xanh lá nhạt tay ngắn',
      price: 560000,
      image: '/images/vay-dam-21.jpg'
    },
    {
      id: 22,
      code: 'VD122-05',
      name: 'Đầm công sở đen cổ vest',
      price: 620000,
      image: '/images/vay-dam-22.jpg'
    },
    {
      id: 23,
      code: 'VD123-12',
      name: 'Váy đầm tím lavender dáng xòe',
      price: 580000,
      image: '/images/vay-dam-23.jpg'
    },
    {
      id: 24,
      code: 'VD124-08',
      name: 'Đầm công sở vàng chanh tay phồng',
      price: 590000,
      image: '/images/vay-dam-24.jpg'
    },
    {
      id: 25,
      code: 'VD125-15',
      name: 'Váy đầm xanh denim dáng suông',
      price: 640000,
      image: '/images/vay-dam-25.jpg'
    },
    {
      id: 26,
      code: 'VD126-03',
      name: 'Đầm công sở hồng công chúa',
      price: 570000,
      image: '/images/vay-dam-26.jpg'
    },
    {
      id: 27,
      code: 'VD127-10',
      name: 'Váy đầm đen ren sang trọng',
      price: 750000,
      image: '/images/vay-dam-27.jpg'
    },
    {
      id: 28,
      code: 'VD128-05',
      name: 'Đầm công sở trắng tinh khôi',
      price: 590000,
      image: '/images/vay-dam-28.jpg'
    }
  ]

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN').format(price) + ' đ'
  }

  const indexOfLastProduct = currentPage * productsPerPage
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct)
  const totalPages = Math.ceil(products.length / productsPerPage)

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const renderPageNumbers = () => {
    const pageNumbers = []
    pageNumbers.push(1)
    for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
      pageNumbers.push(i)
    }
    if (totalPages > 1) {
      pageNumbers.push(totalPages)
    }
    return [...new Set(pageNumbers)].sort((a, b) => a - b)
  }

  return (
    <main className="new-collection-content">
      <div className="breadcrumb">
        <div className="container">
          <a href="/">Trang chủ</a>
          <span className="separator">/</span>
          <a href="/shop">Thời trang công sở</a>
          <span className="separator">/</span>
          <span className="current">Váy đầm công sở</span>
        </div>
      </div>

      <div className="collection-main">
        <div className="container">
          <h1 className="collection-title">VÁY ĐẦM CÔNG SỞ</h1>

          <div className="products-container">
            <div className="products-row">
              <div className="product-card large">
                <a href={`/product/${currentProducts[0]?.code}`} className="product-link">
                  <div className="product-image">
                    <div className="product-image-placeholder">
                      <img 
                        src={currentProducts[0]?.image} 
                        alt={currentProducts[0]?.name}
                        onError={(e) => {
                          e.target.style.display = 'none'
                          e.target.parentElement.classList.add('no-image')
                        }}
                      />
                    </div>
                  </div>
                  
                  {currentProducts[0]?.sizes && (
                    <div className="product-sizes">
                      <span className="size-label">SIZE</span>
                      {currentProducts[0].sizes.map((size) => (
                        <span key={size} className="size-item">{size}</span>
                      ))}
                    </div>
                  )}

                  <div className="product-info">
                    <p className="product-code">{currentProducts[0]?.code}</p>
                    <h3 className="product-name">{currentProducts[0]?.name}</h3>
                    <p className="product-price">{formatPrice(currentProducts[0]?.price)}</p>
                  </div>
                </a>
              </div>

              <div className="products-small-grid">
                {currentProducts.slice(1, 5).map((product) => (
                  <div key={product.id} className="product-card small">
                    <a href={`/product/${product.code}`} className="product-link">
                      <div className="product-image">
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
                      </div>

                      <div className="product-info">
                        <p className="product-code">{product.code}</p>
                        <h3 className="product-name">{product.name}</h3>
                        <p className="product-price">{formatPrice(product.price)}</p>
                      </div>
                    </a>
                  </div>
                ))}
              </div>
            </div>

            <div className="products-grid-regular">
              {currentProducts.slice(5).map((product) => (
                <div key={product.id} className="product-card">
                  <a href={`/product/${product.code}`} className="product-link">
                    <div className="product-image">
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
                    </div>

                    <div className="product-info">
                      <p className="product-code">{product.code}</p>
                      <h3 className="product-name">{product.name}</h3>
                      <p className="product-price">{formatPrice(product.price)}</p>
                    </div>
                  </a>
                </div>
              ))}
            </div>
          </div>

          {totalPages > 1 && (
            <div className="pagination">
              {renderPageNumbers().map((number, index, array) => (
                <React.Fragment key={number}>
                  {index > 0 && array[index - 1] !== number - 1 && (
                    <span className="pagination-dots">...</span>
                  )}
                  <button
                    onClick={() => paginate(number)}
                    className={`pagination-btn ${currentPage === number ? 'active' : ''}`}
                  >
                    {number}
                  </button>
                </React.Fragment>
              ))}
              {currentPage < totalPages && (
                <button
                  onClick={() => paginate(currentPage + 1)}
                  className="pagination-btn pagination-next"
                >
                  →
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      <BestSellers />
      <Blog />
    </main>
  )
}

export default VayDamCongSo
