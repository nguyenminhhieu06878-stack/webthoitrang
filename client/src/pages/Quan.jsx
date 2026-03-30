import { useState } from 'react'
import React from 'react'
import BestSellers from '../components/BestSellers'
import Blog from '../components/Blog'
import './NewCollection.css'

const Quan = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const productsPerPage = 25

  const products = [
    {
      id: 1,
      code: 'Q301-20',
      name: 'Quần tây đen ống đứng công sở',
      price: 450000,
      sizes: ['S', 'M', 'L', 'XL'],
      image: '/images/quan-1.jpg'
    },
    {
      id: 2,
      code: 'Q302-10',
      name: 'Quần âu xám xếp ly thanh lịch',
      price: 480000,
      image: '/images/quan-2.jpg'
    },
    {
      id: 3,
      code: 'Q303-36',
      name: 'Quần tây navy ống suông',
      price: 460000,
      image: '/images/quan-3.jpg'
    },
    {
      id: 4,
      code: 'Q304-30',
      name: 'Quần âu be nhạt lưng cao',
      price: 470000,
      image: '/images/quan-4.jpg'
    },
    {
      id: 5,
      code: 'Q305-15',
      name: 'Quần tây trắng ống rộng',
      price: 490000,
      image: '/images/quan-5.jpg'
    },
    {
      id: 6,
      code: 'Q306-18',
      name: 'Quần âu xanh mint ống đứng',
      price: 450000,
      image: '/images/quan-6.jpg'
    },
    {
      id: 7,
      code: 'Q307-02',
      name: 'Quần tây nâu chocolate công sở',
      price: 480000,
      image: '/images/quan-7.jpg'
    },
    {
      id: 8,
      code: 'Q308-01',
      name: 'Quần âu đen lưng cao xếp ly',
      price: 500000,
      image: '/images/quan-8.jpg'
    },
    {
      id: 9,
      code: 'Q309-08',
      name: 'Quần tây xám nhạt ống suông',
      price: 460000,
      image: '/images/quan-9.jpg'
    },
    {
      id: 10,
      code: 'Q310-05',
      name: 'Quần âu hồng pastel thanh lịch',
      price: 470000,
      image: '/images/quan-10.jpg'
    },
    {
      id: 11,
      code: 'Q311-12',
      name: 'Quần tây xanh navy ống rộng',
      price: 490000,
      image: '/images/quan-11.jpg'
    },
    {
      id: 12,
      code: 'Q312-03',
      name: 'Quần âu trắng kem lưng cao',
      price: 480000,
      image: '/images/quan-12.jpg'
    },
    {
      id: 13,
      code: 'Q313-15',
      name: 'Quần tây đen ống đứng basic',
      price: 450000,
      image: '/images/quan-13.jpg'
    },
    {
      id: 14,
      code: 'Q314-08',
      name: 'Quần âu vàng mustard công sở',
      price: 470000,
      image: '/images/quan-14.jpg'
    },
    {
      id: 15,
      code: 'Q315-20',
      name: 'Quần tây xám xếp ly sang trọng',
      price: 500000,
      image: '/images/quan-15.jpg'
    },
    {
      id: 16,
      code: 'Q316-05',
      name: 'Quần âu be ống suông',
      price: 460000,
      image: '/images/quan-16.jpg'
    },
    {
      id: 17,
      code: 'Q317-12',
      name: 'Quần tây xanh lá nhạt',
      price: 470000,
      image: '/images/quan-17.jpg'
    },
    {
      id: 18,
      code: 'Q318-08',
      name: 'Quần âu đen lưng thun',
      price: 440000,
      image: '/images/quan-18.jpg'
    },
    {
      id: 19,
      code: 'Q319-15',
      name: 'Quần tây tím lavender ống rộng',
      price: 480000,
      image: '/images/quan-19.jpg'
    },
    {
      id: 20,
      code: 'Q320-03',
      name: 'Quần âu trắng cao cấp',
      price: 520000,
      image: '/images/quan-20.jpg'
    },
    {
      id: 21,
      code: 'Q321-10',
      name: 'Quần tây xanh dương ống đứng',
      price: 460000,
      image: '/images/quan-21.jpg'
    },
    {
      id: 22,
      code: 'Q322-05',
      name: 'Quần âu đen xếp ly',
      price: 490000,
      image: '/images/quan-22.jpg'
    },
    {
      id: 23,
      code: 'Q323-12',
      name: 'Quần tây cam coral công sở',
      price: 470000,
      image: '/images/quan-23.jpg'
    },
    {
      id: 24,
      code: 'Q324-08',
      name: 'Quần âu xám ống suông',
      price: 480000,
      image: '/images/quan-24.jpg'
    },
    {
      id: 25,
      code: 'Q325-15',
      name: 'Quần tây be nhạt lưng cao',
      price: 490000,
      image: '/images/quan-25.jpg'
    },
    {
      id: 26,
      code: 'Q326-03',
      name: 'Quần âu hồng phấn thanh lịch',
      price: 470000,
      image: '/images/quan-26.jpg'
    },
    {
      id: 27,
      code: 'Q327-10',
      name: 'Quần tây đen ống rộng sang trọng',
      price: 510000,
      image: '/images/quan-27.jpg'
    },
    {
      id: 28,
      code: 'Q328-05',
      name: 'Quần âu trắng ống đứng',
      price: 480000,
      image: '/images/quan-28.jpg'
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
          <span className="current">Quần</span>
        </div>
      </div>

      <div className="collection-main">
        <div className="container">
          <h1 className="collection-title">QUẦN</h1>

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

export default Quan
