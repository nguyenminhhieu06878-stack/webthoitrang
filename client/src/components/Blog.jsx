import { useState, useEffect } from 'react'
import './Blog.css'

const Blog = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchBlogs()
  }, [])

  const fetchBlogs = async () => {
    try {
      const response = await fetch('http://localhost:5001/api/blogs?featured=true&limit=3')
      const data = await response.json()
      setBlogs(data.blogs || [])
    } catch (error) {
      console.error('Error fetching blogs:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <section className="blog-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">BLOG</h2>
            <div className="title-divider">
              <span className="divider-line"></span>
              <span className="divider-icon">◇</span>
              <span className="divider-line"></span>
            </div>
          </div>
          <div style={{ textAlign: 'center', padding: '40px' }}>Đang tải...</div>
        </div>
      </section>
    )
  }

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % blogs.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + blogs.length) % blogs.length)
  }

  const goToSlide = (index) => {
    setCurrentSlide(index)
  }

  return (
    <section className="blog-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">BLOG</h2>
          <div className="title-divider">
            <span className="divider-line"></span>
            <span className="divider-icon">◇</span>
            <span className="divider-line"></span>
          </div>
        </div>

        <div className="blog-slider-wrapper">
          <button className="blog-nav-btn prev" onClick={prevSlide}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>

          <div className="blog-slider">
            <div className="blog-slides" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
              {blogs.map((blog) => (
                <div key={blog.id} className="blog-slide">
                  <a href={`/blog/${blog.slug}`} className="blog-card">
                    <div className="blog-image">
                      <div className="blog-logo">{blog.logo || 'D\'CHIC'}</div>
                      <img 
                        src={blog.image} 
                        alt={blog.title}
                        onError={(e) => {
                          e.target.style.display = 'none'
                          e.target.parentElement.classList.add('no-image')
                        }}
                      />
                      <div className="blog-overlay-title">{blog.overlayTitle || blog.title}</div>
                    </div>
                    <div className="blog-content">
                      <h3 className="blog-title">{blog.title}</h3>
                      <p className="blog-excerpt">{blog.excerpt}</p>
                      <span className="blog-read-more">Xem thêm</span>
                    </div>
                  </a>
                </div>
              ))}
            </div>
          </div>

          <button className="blog-nav-btn next" onClick={nextSlide}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </div>

        {/* Dots Navigation */}
        <div className="blog-dots">
          {blogs.map((_, index) => (
            <button
              key={index}
              className={`blog-dot ${index === currentSlide ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Blog
