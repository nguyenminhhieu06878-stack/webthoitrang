import { useState, useEffect } from 'react'
import React from 'react'
import BestSellers from '../components/BestSellers'
import Blog from '../components/Blog'
import './NewCollection.css'

const NewCollection = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const productsPerPage = 25

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5001/api/products?category=New Collection')
        const data = await response.json()
        setProducts(data)
      } catch (error) {
        console.error('Error fetching products:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

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
          <span className="current">New Collection</span>
        </div>
      </div>

      <div className="collection-main">
        <div className="container">
          <h1 className="collection-title">NEW COLLECTION</h1>

          {loading ? (
            <p style={{ textAlign: 'center', padding: '2rem' }}>Đang tải...</p>
          ) : products.length === 0 ? (
            <p style={{ textAlign: 'center', padding: '2rem' }}>Không có sản phẩm</p>
          ) : (
            <>
              <div className="products-container">
                <div className="products-row">
                  {currentProducts[0] && (
                    <div className="product-card large">
                      <a href={`/product/${currentProducts[0].id}`} className="product-link">
                        <div className="product-image">
                          <div className="product-image-placeholder">
                            <img 
                              src={currentProducts[0].images?.[0] || 'https://via.placeholder.com/400x500/f0f0f0/666?text=No+Image'} 
                              alt={currentProducts[0].name}
                              onError={(e) => e.target.src = 'https://via.placeholder.com/400x500/f0f0f0/666?text=No+Image'}
                            />
                          </div>
                        </div>
                        
                        {currentProducts[0].sizes && currentProducts[0].sizes.length > 0 && (
                          <div className="product-sizes">
                            <span className="size-label">SIZE</span>
                            {currentProducts[0].sizes.map((size) => (
                              <span key={size} className="size-item">{size}</span>
                            ))}
                          </div>
                        )}

                        <div className="product-info">
                          <p className="product-code">{currentProducts[0].code}</p>
                          <h3 className="product-name">{currentProducts[0].name}</h3>
                          <p className="product-price">{formatPrice(currentProducts[0].price)}</p>
                        </div>
                      </a>
                    </div>
                  )}

                  <div className="products-small-grid">
                    {currentProducts.slice(1, 5).map((product) => (
                      <div key={product.id} className="product-card small">
                        <a href={`/product/${product.id}`} className="product-link">
                          <div className="product-image">
                            <div className="product-image-placeholder">
                              <img 
                                src={product.images?.[0] || 'https://via.placeholder.com/300x400/f0f0f0/666?text=No+Image'} 
                                alt={product.name}
                                onError={(e) => e.target.src = 'https://via.placeholder.com/300x400/f0f0f0/666?text=No+Image'}
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
                      <a href={`/product/${product.id}`} className="product-link">
                        <div className="product-image">
                          <div className="product-image-placeholder">
                            <img 
                              src={product.images?.[0] || 'https://via.placeholder.com/300x400/f0f0f0/666?text=No+Image'} 
                              alt={product.name}
                              onError={(e) => e.target.src = 'https://via.placeholder.com/300x400/f0f0f0/666?text=No+Image'}
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
            </>
          )}
        </div>
      </div>

      <BestSellers />
      <Blog />
    </main>
  )
}

export default NewCollection
