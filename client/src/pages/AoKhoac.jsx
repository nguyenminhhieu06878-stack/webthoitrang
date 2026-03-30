import { useState } from 'react'
import React from 'react'
import BestSellers from '../components/BestSellers'
import Blog from '../components/Blog'
import './NewCollection.css'

const AoKhoac = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const productsPerPage = 25

  const products = [
    {
      id: 1,
      code: 'AK201-20',
      name: 'Áo khoác blazer đen công sở',
      price: 690000,
      sizes: ['S', 'M', 'L', 'XL'],
      image: '/images/ao-khoac-1.jpg'
    },
    {
      id: 2,
      code: 'AK202-10',
      name: 'Áo khoác dạ xám thanh lịch',
      price: 840000,
      image: '/images/ao-khoac-2.jpg'
    },
    {
      id: 3,
      code: 'AK203-36',
      name: 'Áo khoác cardigan be dáng dài',
      price: 590000,
      image: '/images/ao-khoac-3.jpg'
    },
    {
      id: 4,
      code: 'AK204-30',
      name: 'Áo khoác blazer trắng cổ vest',
      price: 720000,
      image: '/images/ao-khoac-4.jpg'
    },
    {
      id: 5,
      code: 'AK205-15',
      name: 'Áo khoác denim xanh nhạt',
      price: 650000,
      image: '/images/ao-khoac-5.jpg'
    },
    {
      id: 6,
      code: 'AK206-18',
      name: 'Áo khoác len hồng pastel',
      price: 580000,
      image: '/images/ao-khoac-6.jpg'
    },
    {
      id: 7,
      code: 'AK207-02',
      name: 'Áo khoác blazer navy phối nút',
      price: 710000,
      image: '/images/ao-khoac-7.jpg'
    },
    {
      id: 8,
      code: 'AK208-01',
      name: 'Áo khoác dạ camel cao cấp',
      price: 920000,
      image: '/images/ao-khoac-8.jpg'
    },
    {
      id: 9,
      code: 'AK209-08',
      name: 'Áo khoác cardigan xanh mint',
      price: 560000,
      image: '/images/ao-khoac-9.jpg'
    },
    {
      id: 10,
      code: 'AK210-05',
      name: 'Áo khoác blazer đỏ burgundy',
      price: 730000,
      image: '/images/ao-khoac-10.jpg'
    },
    {
      id: 11,
      code: 'AK211-12',
      name: 'Áo khoác len trắng dáng ngắn',
      price: 590000,
      image: '/images/ao-khoac-11.jpg'
    },
    {
      id: 12,
      code: 'AK212-03',
      name: 'Áo khoác blazer kẻ sọc',
      price: 750000,
      image: '/images/ao-khoac-12.jpg'
    },
    {
      id: 13,
      code: 'AK213-15',
      name: 'Áo khoác denim đen rách nhẹ',
      price: 680000,
      image: '/images/ao-khoac-13.jpg'
    },
    {
      id: 14,
      code: 'AK214-08',
      name: 'Áo khoác cardigan vàng mustard',
      price: 570000,
      image: '/images/ao-khoac-14.jpg'
    },
    {
      id: 15,
      code: 'AK215-20',
      name: 'Áo khoác blazer xám xếp tay',
      price: 740000,
      image: '/images/ao-khoac-15.jpg'
    },
    {
      id: 16,
      code: 'AK216-05',
      name: 'Áo khoác dạ hồng phấn',
      price: 860000,
      image: '/images/ao-khoac-16.jpg'
    },
    {
      id: 17,
      code: 'AK217-12',
      name: 'Áo khoác len xanh dương',
      price: 600000,
      image: '/images/ao-khoac-17.jpg'
    },
    {
      id: 18,
      code: 'AK218-08',
      name: 'Áo khoác blazer be nhạt',
      price: 720000,
      image: '/images/ao-khoac-18.jpg'
    },
    {
      id: 19,
      code: 'AK219-15',
      name: 'Áo khoác cardigan tím lavender',
      price: 580000,
      image: '/images/ao-khoac-19.jpg'
    },
    {
      id: 20,
      code: 'AK220-03',
      name: 'Áo khoác dạ trắng sang trọng',
      price: 950000,
      image: '/images/ao-khoac-20.jpg'
    },
    {
      id: 21,
      code: 'AK221-10',
      name: 'Áo khoác blazer xanh lá',
      price: 710000,
      image: '/images/ao-khoac-21.jpg'
    },
    {
      id: 22,
      code: 'AK222-05',
      name: 'Áo khoác len đen dáng dài',
      price: 620000,
      image: '/images/ao-khoac-22.jpg'
    },
    {
      id: 23,
      code: 'AK223-12',
      name: 'Áo khoác denim xanh đậm',
      price: 670000,
      image: '/images/ao-khoac-23.jpg'
    },
    {
      id: 24,
      code: 'AK224-08',
      name: 'Áo khoác blazer cam coral',
      price: 730000,
      image: '/images/ao-khoac-24.jpg'
    },
    {
      id: 25,
      code: 'AK225-15',
      name: 'Áo khoác cardigan kem cao cấp',
      price: 640000,
      image: '/images/ao-khoac-25.jpg'
    },
    {
      id: 26,
      code: 'AK226-03',
      name: 'Áo khoác dạ xanh navy',
      price: 880000,
      image: '/images/ao-khoac-26.jpg'
    },
    {
      id: 27,
      code: 'AK227-10',
      name: 'Áo khoác blazer nâu chocolate',
      price: 750000,
      image: '/images/ao-khoac-27.jpg'
    },
    {
      id: 28,
      code: 'AK228-05',
      name: 'Áo khoác len trắng kem',
      price: 610000,
      image: '/images/ao-khoac-28.jpg'
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
          <span className="current">Áo khoác</span>
        </div>
      </div>

      <div className="collection-main">
        <div className="container">
          <h1 className="collection-title">ÁO KHOÁC</h1>

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

export default AoKhoac
