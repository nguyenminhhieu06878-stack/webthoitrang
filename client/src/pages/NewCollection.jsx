import { useState } from 'react'
import React from 'react'
import BestSellers from '../components/BestSellers'
import Blog from '../components/Blog'
import './NewCollection.css'

const NewCollection = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const productsPerPage = 25 // 1 large + 4 small + 20 regular (5 rows x 4)

  const products = [
    {
      id: 1,
      code: 'KK185-20',
      name: 'Đầm xòe công sở cổ lệch xếp ly',
      price: 590000,
      sizes: ['S', 'M', 'L', 'XL'],
      image: '/images/new-collection-1.jpg'
    },
    {
      id: 2,
      code: 'KK185-10',
      name: 'Đầm xòe burberry cổ V nhấn eo viền đen',
      price: 540000,
      image: '/images/new-collection-2.jpg'
    },
    {
      id: 3,
      code: 'KK181-36',
      name: 'Đầm voan hoa nhí dáng A cổ V thắt nơ',
      price: 590000,
      image: '/images/new-collection-3.jpg'
    },
    {
      id: 4,
      code: 'KK183-30',
      name: 'Đầm hoa đỏ dáng xòe cổ V phối nút',
      price: 580000,
      image: '/images/new-collection-4.jpg'
    },
    {
      id: 5,
      code: 'KK185-15',
      name: 'Đầm lụa ren xanh đính hoa cao cấp',
      price: 690000,
      image: '/images/new-collection-5.jpg'
    },
    {
      id: 6,
      code: 'KK185-18',
      name: 'Đầm đen xòe chữ A phối ren kèm cổ áo nơ',
      price: 620000,
      image: '/images/new-collection-6.jpg'
    },
    {
      id: 7,
      code: 'KK186-02',
      name: 'Đầm chữ A họa tiết hoa cổ thuyền lệch nhún vai',
      price: 590000,
      image: '/images/new-collection-7.jpg'
    },
    {
      id: 8,
      code: 'KK186-01',
      name: 'Đầm ren dự tiệc màu kem dáng xòe',
      price: 630000,
      image: '/images/new-collection-8.jpg'
    },
    {
      id: 9,
      code: 'KK184-08',
      name: 'Đầm đen dự tiệc chữ A cổ đắp lệch tay cape',
      price: 590000,
      image: '/images/new-collection-9.jpg'
    },
    {
      id: 10,
      code: 'KK187-05',
      name: 'Đầm công sở xanh navy cổ sen xếp ly',
      price: 520000,
      image: '/images/new-collection-10.jpg'
    },
    {
      id: 11,
      code: 'KK187-12',
      name: 'Đầm hoa nhí vàng dáng xòe cổ V',
      price: 560000,
      image: '/images/new-collection-11.jpg'
    },
    {
      id: 12,
      code: 'KK188-03',
      name: 'Đầm trắng công sở tay bồng phối nơ',
      price: 580000,
      image: '/images/new-collection-12.jpg'
    },
    {
      id: 13,
      code: 'KK188-15',
      name: 'Đầm xanh mint xòe nhẹ cổ tròn',
      price: 540000,
      image: '/images/new-collection-13.jpg'
    },
    {
      id: 14,
      code: 'KK189-08',
      name: 'Đầm hoa cam vintage dáng A',
      price: 590000,
      image: '/images/new-collection-14.jpg'
    },
    {
      id: 15,
      code: 'KK189-20',
      name: 'Đầm đen midi xòe tay lỡ',
      price: 610000,
      image: '/images/new-collection-15.jpg'
    },
    {
      id: 16,
      code: 'KK190-05',
      name: 'Đầm ren trắng dự tiệc cổ V',
      price: 720000,
      image: '/images/new-collection-16.jpg'
    },
    {
      id: 17,
      code: 'KK190-12',
      name: 'Đầm hoa nhí xanh dương cổ vuông',
      price: 570000,
      image: '/images/new-collection-17.jpg'
    },
    {
      id: 18,
      code: 'KK191-08',
      name: 'Đầm công sở xám xếp ly tay ngắn',
      price: 550000,
      image: '/images/new-collection-18.jpg'
    },
    {
      id: 19,
      code: 'KK191-15',
      name: 'Đầm hoa đỏ burgundy dáng xòe',
      price: 590000,
      image: '/images/new-collection-19.jpg'
    },
    {
      id: 20,
      code: 'KK192-03',
      name: 'Đầm trắng ren cao cấp tay dài',
      price: 780000,
      image: '/images/new-collection-20.jpg'
    },
    {
      id: 21,
      code: 'KK192-10',
      name: 'Đầm xanh lá nhạt xòe nhẹ',
      price: 560000,
      image: '/images/new-collection-21.jpg'
    },
    {
      id: 22,
      code: 'KK193-05',
      name: 'Đầm đen công sở cổ vest',
      price: 620000,
      image: '/images/new-collection-22.jpg'
    },
    {
      id: 23,
      code: 'KK193-12',
      name: 'Đầm hoa tím pastel dáng A',
      price: 580000,
      image: '/images/new-collection-23.jpg'
    },
    {
      id: 24,
      code: 'KK194-08',
      name: 'Đầm vàng mustard xòe tay phồng',
      price: 590000,
      image: '/images/new-collection-24.jpg'
    },
    {
      id: 25,
      code: 'KK194-15',
      name: 'Đầm xanh denim dáng suông',
      price: 640000,
      image: '/images/new-collection-25.jpg'
    },
    {
      id: 26,
      code: 'KK195-03',
      name: 'Đầm hồng phấn công sở tay lỡ',
      price: 570000,
      image: '/images/new-collection-26.jpg'
    },
    {
      id: 27,
      code: 'KK195-10',
      name: 'Đầm đen ren dự tiệc sang trọng',
      price: 750000,
      image: '/images/new-collection-27.jpg'
    },
    {
      id: 28,
      code: 'KK196-05',
      name: 'Đầm trắng tinh khôi cổ sen',
      price: 590000,
      image: '/images/new-collection-28.jpg'
    }
  ]

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN').format(price) + ' đ'
  }

  // Pagination logic
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
    
    // Always show first page
    pageNumbers.push(1)
    
    // Show pages around current page
    for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
      pageNumbers.push(i)
    }
    
    // Always show last page if there are multiple pages
    if (totalPages > 1) {
      pageNumbers.push(totalPages)
    }
    
    return [...new Set(pageNumbers)].sort((a, b) => a - b)
  }

  return (
    <main className="new-collection-content">
      {/* Breadcrumb */}
      <div className="breadcrumb">
        <div className="container">
          <a href="/">Trang chủ</a>
          <span className="separator">/</span>
          <a href="/shop">Thời trang công sở</a>
          <span className="separator">/</span>
          <span className="current">New Collection</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="collection-main">
        <div className="container">
          <h1 className="collection-title">New Collection</h1>

          {/* Products Grid */}
          <div className="products-container">
            {/* First Row - 1 large + 2 small */}
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

            {/* Regular Grid for remaining products */}
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

          {/* Pagination */}
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

      {/* Best Sellers Section */}
      <BestSellers />

      {/* Blog Section */}
      <Blog />
    </main>
  )
}

export default NewCollection
