import { useState, useEffect } from 'react'
import React from 'react'
import './BlogPage.css'

const BlogPage = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [blogPosts, setBlogPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [totalPages, setTotalPages] = useState(1)
  const postsPerPage = 9

  useEffect(() => {
    fetchBlogs()
  }, [currentPage])

  const fetchBlogs = async () => {
    setLoading(true)
    try {
      const response = await fetch(`http://localhost:5001/api/blogs?page=${currentPage}&limit=${postsPerPage}`)
      const data = await response.json()
      setBlogPosts(data.blogs || [])
      setTotalPages(data.totalPages || 1)
    } catch (error) {
      console.error('Error fetching blogs:', error)
    } finally {
      setLoading(false)
    }
  }

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

  if (loading) {
    return (
      <main className="blog-page">
        <div className="breadcrumb">
          <div className="container">
            <a href="/">Trang chủ</a>
            <span className="separator">/</span>
            <span className="current">Blog</span>
          </div>
        </div>
        <div className="blog-page-header">
          <h1 className="blog-page-title">Blog</h1>
        </div>
        <div className="blog-page-content">
          <div className="container">
            <div style={{ textAlign: 'center', padding: '40px' }}>Đang tải...</div>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="blog-page">
      {/* Breadcrumb */}
      <div className="breadcrumb">
        <div className="container">
          <a href="/">Trang chủ</a>
          <span className="separator">/</span>
          <span className="current">Blog</span>
        </div>
      </div>

      {/* Page Title */}
      <div className="blog-page-header">
        <h1 className="blog-page-title">Blog</h1>
      </div>

      {/* Blog Grid */}
      <div className="blog-page-content">
        <div className="container">
          <div className="blog-grid">
            {blogPosts.map((post) => (
              <div key={post.id} className="blog-post-card">
                <a href={`/blog/${post.slug}`} className="blog-post-link">
                  <div className="blog-post-image">
                    <div className="blog-post-logo">{post.logo || 'D\'CHIC'}</div>
                    <img 
                      src={post.image} 
                      alt={post.title}
                      onError={(e) => {
                        e.target.style.display = 'none'
                        e.target.parentElement.classList.add('no-image')
                      }}
                    />
                    <div className="blog-post-overlay">
                      <div className="blog-post-overlay-title">{post.overlayTitle || post.title}</div>
                    </div>
                  </div>
                  <div className="blog-post-content">
                    <h3 className="blog-post-title">{post.title}</h3>
                    <p className="blog-post-excerpt">{post.excerpt}</p>
                    <span className="blog-post-read-more">Xem thêm</span>
                  </div>
                </a>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="blog-pagination">
              <button
                onClick={() => paginate(currentPage - 1)}
                className="pagination-arrow"
                disabled={currentPage === 1}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
              </button>

              {renderPageNumbers().map((number, index, array) => (
                <React.Fragment key={number}>
                  {index > 0 && array[index - 1] !== number - 1 && (
                    <span className="pagination-dots">...</span>
                  )}
                  <button
                    onClick={() => paginate(number)}
                    className={`pagination-number ${currentPage === number ? 'active' : ''}`}
                  >
                    {number}
                  </button>
                </React.Fragment>
              ))}

              <button
                onClick={() => paginate(currentPage + 1)}
                className="pagination-arrow"
                disabled={currentPage === totalPages}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}

export default BlogPage
