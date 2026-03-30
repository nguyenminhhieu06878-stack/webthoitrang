import { useState } from 'react'
import React from 'react'
import BestSellers from '../components/BestSellers'
import Blog from '../components/Blog'
import './NewCollection.css'

const ChanVay = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const productsPerPage = 25

  const products = [
    {
      id: 1,
      code: 'CV401-20',
      name: 'Chân váy xòe đen công sở',
      price: 390000,
      sizes: ['S', 'M', 'L', 'XL'],
      image: '/images/chan-vay-1.jpg'
    },
    {
      id: 2,
      code: 'CV402-10',
      name: 'Chân váy bút chì xám thanh lịch',
      price: 420000,
      image: '/images/chan-vay-2.jpg'
    },
    {
      id: 3,
      code: 'CV403-36',
      name: 'Chân váy xòe trắng dáng A',
      price: 410000,
      image: '/images/chan-vay-3.jpg'
    },
    {
      id: 4,
      code: 'CV404-30',
      name: 'Chân váy midi navy xếp ly',
      price: 430000,
      image: '/images/chan-vay-4.jpg'
    },
    {
      id: 5,
      code: 'CV405-15',
      name: 'Chân váy xòe hồng pastel',
      price: 400000,
      image: '/images/chan-vay-5.jpg'
    },
    {
      id: 6,
      code: 'CV406-18',
      name: 'Chân váy bút chì đen lưng cao',
      price: 420000,
      image: '/images/chan-vay-6.jpg'
    },
    {
      id: 7,
      code: 'CV407-02',
      name: 'Chân váy xòe be nhạt',
      price: 390000,
      image: '/images/chan-vay-7.jpg'
    },
    {
      id: 8,
      code: 'CV408-01',
      name: 'Chân váy midi xám xếp ly',
      price: 440000,
      image: '/images/chan-vay-8.jpg'
    },
    {
      id: 9,
      code: 'CV409-08',
      name: 'Chân váy xòe xanh mint',
      price: 400000,
      image: '/images/chan-vay-9.jpg'
    },
    {
      id: 10,
      code: 'CV410-05',
      name: 'Chân váy bút chì đỏ burgundy',
      price: 430000,
      image: '/images/chan-vay-10.jpg'
    },
    {
      id: 11,
      code: 'CV411-12',
      name: 'Chân váy xòe trắng ren',
      price: 450000,
      image: '/images/chan-vay-11.jpg'
    },
    {
      id: 12,
      code: 'CV412-03',
      name: 'Chân váy midi navy công sở',
      price: 420000,
      image: '/images/chan-vay-12.jpg'
    },
    {
      id: 13,
      code: 'CV413-15',
      name: 'Chân váy xòe xanh dương',
      price: 410000,
      image: '/images/chan-vay-13.jpg'
    },
    {
      id: 14,
      code: 'CV414-08',
      name: 'Chân váy bút chì vàng mustard',
      price: 420000,
      image: '/images/chan-vay-14.jpg'
    },
    {
      id: 15,
      code: 'CV415-20',
      name: 'Chân váy midi đen xếp ly',
      price: 440000,
      image: '/images/chan-vay-15.jpg'
    },
    {
      id: 16,
      code: 'CV416-05',
      name: 'Chân váy xòe hồng phấn',
      price: 400000,
      image: '/images/chan-vay-16.jpg'
    },
    {
      id: 17,
      code: 'CV417-12',
      name: 'Chân váy bút chì xám nhạt',
      price: 420000,
      image: '/images/chan-vay-17.jpg'
    },
    {
      id: 18,
      code: 'CV418-08',
      name: 'Chân váy xòe be công sở',
      price: 390000,
      image: '/images/chan-vay-18.jpg'
    },
    {
      id: 19,
      code: 'CV419-15',
      name: 'Chân váy midi tím lavender',
      price: 430000,
      image: '/images/chan-vay-19.jpg'
    },
    {
      id: 20,
      code: 'CV420-03',
      name: 'Chân váy xòe trắng cao cấp',
      price: 480000,
      image: '/images/chan-vay-20.jpg'
    },
    {
      id: 21,
      code: 'CV421-10',
      name: 'Chân váy bút chì xanh lá',
      price: 420000,
      image: '/images/chan-vay-21.jpg'
    },
    {
      id: 22,
      code: 'CV422-05',
      name: 'Chân váy midi đen thanh lịch',
      price: 440000,
      image: '/images/chan-vay-22.jpg'
    },
    {
      id: 23,
      code: 'CV423-12',
      name: 'Chân váy xòe cam coral',
      price: 410000,
      image: '/images/chan-vay-23.jpg'
    },
    {
      id: 24,
      code: 'CV424-08',
      name: 'Chân váy bút chì xám xếp ly',
      price: 430000,
      image: '/images/chan-vay-24.jpg'
    },
    {
      id: 25,
      code: 'CV425-15',
      name: 'Chân váy xòe be nhạt',
      price: 400000,
      image: '/images/chan-vay-25.jpg'
    },
    {
      id: 26,
      code: 'CV426-03',
      name: 'Chân váy midi hồng công sở',
      price: 420000,
      image: '/images/chan-vay-26.jpg'
    },
    {
      id: 27,
      code: 'CV427-10',
      name: 'Chân váy xòe đen ren sang trọng',
      price: 470000,
      image: '/images/chan-vay-27.jpg'
    },
    {
      id: 28,
      code: 'CV428-05',
      name: 'Chân váy bút chì trắng tinh khôi',
      price: 430000,
      image: '/images/chan-vay-28.jpg'
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
          <span className="current">Chân váy</span>
        </div>
      </div>

      <div className="collection-main">
        <div className="container">
          <h1 className="collection-title">CHÂN VÁY</h1>

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

export default ChanVay
