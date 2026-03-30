import { useState } from 'react'
import React from 'react'
import BestSellers from '../components/BestSellers'
import Blog from '../components/Blog'
import './NewCollection.css'

const Ao = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const productsPerPage = 25

  const products = [
    {
      id: 1,
      code: 'ASM30-08',
      name: 'Áo ren cotton kiểu peplum màu kem',
      price: 300000,
      sizes: ['S', 'M', 'L', 'XL'],
      image: '/images/ao-1.jpg'
    },
    {
      id: 2,
      code: 'ASM31-12',
      name: 'Áo sơ mi trắng cổ vest tay dài',
      price: 320000,
      image: '/images/ao-2.jpg'
    },
    {
      id: 3,
      code: 'ASM32-05',
      name: 'Áo kiểu hoa nhí tay bồng',
      price: 280000,
      image: '/images/ao-3.jpg'
    },
    {
      id: 4,
      code: 'ASM33-18',
      name: 'Áo sơ mi xanh navy cổ tròn',
      price: 310000,
      image: '/images/ao-4.jpg'
    },
    {
      id: 5,
      code: 'ASM34-22',
      name: 'Áo kiểu đen phối nơ cổ',
      price: 340000,
      image: '/images/ao-5.jpg'
    },
    {
      id: 6,
      code: 'ASM35-09',
      name: 'Áo sơ mi hồng pastel tay lỡ',
      price: 290000,
      image: '/images/ao-6.jpg'
    },
    {
      id: 7,
      code: 'ASM36-14',
      name: 'Áo kiểu trắng cổ sen xếp ly',
      price: 330000,
      image: '/images/ao-7.jpg'
    },
    {
      id: 8,
      code: 'ASM37-20',
      name: 'Áo sơ mi kẻ sọc xanh trắng',
      price: 300000,
      image: '/images/ao-8.jpg'
    },
    {
      id: 9,
      code: 'ASM38-11',
      name: 'Áo kiểu vàng mustard tay phồng',
      price: 320000,
      image: '/images/ao-9.jpg'
    },
    {
      id: 10,
      code: 'ASM39-16',
      name: 'Áo sơ mi đen cổ V thanh lịch',
      price: 340000,
      image: '/images/ao-10.jpg'
    },
    {
      id: 11,
      code: 'ASM40-07',
      name: 'Áo kiểu xanh mint tay lửng',
      price: 310000,
      image: '/images/ao-11.jpg'
    },
    {
      id: 12,
      code: 'ASM41-13',
      name: 'Áo sơ mi trắng phối ren',
      price: 350000,
      image: '/images/ao-12.jpg'
    },
    {
      id: 13,
      code: 'ASM42-19',
      name: 'Áo kiểu hồng phấn cổ vuông',
      price: 290000,
      image: '/images/ao-13.jpg'
    },
    {
      id: 14,
      code: 'ASM43-08',
      name: 'Áo sơ mi xám tay dài basic',
      price: 300000,
      image: '/images/ao-14.jpg'
    },
    {
      id: 15,
      code: 'ASM44-15',
      name: 'Áo kiểu đỏ burgundy tay bồng',
      price: 330000,
      image: '/images/ao-15.jpg'
    },
    {
      id: 16,
      code: 'ASM45-21',
      name: 'Áo sơ mi trắng cổ thuyền',
      price: 320000,
      image: '/images/ao-16.jpg'
    },
    {
      id: 17,
      code: 'ASM46-10',
      name: 'Áo kiểu xanh dương hoa nhí',
      price: 310000,
      image: '/images/ao-17.jpg'
    },
    {
      id: 18,
      code: 'ASM47-17',
      name: 'Áo sơ mi be tay ngắn',
      price: 290000,
      image: '/images/ao-18.jpg'
    },
    {
      id: 19,
      code: 'ASM48-23',
      name: 'Áo kiểu tím pastel phối nơ',
      price: 340000,
      image: '/images/ao-19.jpg'
    },
    {
      id: 20,
      code: 'ASM49-12',
      name: 'Áo sơ mi trắng tay phồng',
      price: 330000,
      image: '/images/ao-20.jpg'
    },
    {
      id: 21,
      code: 'ASM50-18',
      name: 'Áo kiểu xanh lá nhạt cổ V',
      price: 300000,
      image: '/images/ao-21.jpg'
    },
    {
      id: 22,
      code: 'ASM51-09',
      name: 'Áo sơ mi đen tay lỡ',
      price: 320000,
      image: '/images/ao-22.jpg'
    },
    {
      id: 23,
      code: 'ASM52-14',
      name: 'Áo kiểu cam coral tay bồng',
      price: 310000,
      image: '/images/ao-23.jpg'
    },
    {
      id: 24,
      code: 'ASM53-20',
      name: 'Áo sơ mi xanh navy cổ sen',
      price: 340000,
      image: '/images/ao-24.jpg'
    },
    {
      id: 25,
      code: 'ASM54-11',
      name: 'Áo kiểu trắng ren cao cấp',
      price: 380000,
      image: '/images/ao-25.jpg'
    },
    {
      id: 26,
      code: 'ASM55-16',
      name: 'Áo sơ mi hồng phấn tay dài',
      price: 300000,
      image: '/images/ao-26.jpg'
    },
    {
      id: 27,
      code: 'ASM56-22',
      name: 'Áo kiểu đen phối ren sang trọng',
      price: 360000,
      image: '/images/ao-27.jpg'
    },
    {
      id: 28,
      code: 'ASM57-13',
      name: 'Áo sơ mi trắng cổ bèo xinh xắn',
      price: 330000,
      image: '/images/ao-28.jpg'
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
          <span className="current">Áo</span>
        </div>
      </div>

      <div className="collection-main">
        <div className="container">
          <h1 className="collection-title">ÁO</h1>

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

export default Ao
