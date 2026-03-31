import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import './BlogDetail.css'

const BlogDetail = () => {
  const { slug } = useParams()
  const [blog, setBlog] = useState(null)
  const [relatedBlogs, setRelatedBlogs] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchBlog()
  }, [slug])

  const fetchBlog = async () => {
    try {
      const response = await fetch(`http://localhost:5001/api/blogs/${slug}`)
      if (!response.ok) {
        throw new Error('Blog not found')
      }
      const data = await response.json()
      setBlog(data)

      // Fetch related blogs (same category)
      if (data.category) {
        const relatedResponse = await fetch(`http://localhost:5001/api/blogs?category=${data.category}`)
        const relatedData = await relatedResponse.json()
        setRelatedBlogs(relatedData.blogs.filter(b => b.id !== data.id).slice(0, 3))
      }
    } catch (error) {
      console.error('Error fetching blog:', error)
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  if (loading) {
    return (
      <main className="blog-detail-page">
        <div className="container">
          <p style={{ textAlign: 'center', padding: '100px 20px' }}>Đang tải...</p>
        </div>
      </main>
    )
  }

  if (!blog) {
    return (
      <main className="blog-detail-page">
        <div className="container">
          <p style={{ textAlign: 'center', padding: '100px 20px' }}>Không tìm thấy bài viết</p>
        </div>
      </main>
    )
  }

  return (
    <main className="blog-detail-page">
      {/* Breadcrumb */}
      <div className="breadcrumb">
        <div className="container">
          <a href="/">Trang chủ</a>
          <span className="separator">/</span>
          <a href="/blog">Blog</a>
          <span className="separator">/</span>
          <span className="current">{blog.title}</span>
        </div>
      </div>

      <div className="container">
        <div className="blog-detail-layout">
          {/* Main Content */}
          <article className="blog-detail-content">
            {/* Featured Image */}
            <div className="blog-featured-image">
              <img
                src={blog.image}
                alt={blog.title}
                onError={(e) => e.target.src = 'https://via.placeholder.com/1200x600/f0f0f0/666?text=Blog+Image'}
              />
              <div className="blog-overlay-badge">{blog.overlayTitle || blog.logo}</div>
            </div>

            {/* Blog Header */}
            <header className="blog-header">
              <h1 className="blog-title">{blog.title}</h1>
              <div className="blog-meta">
                <span className="blog-date">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                  </svg>
                  {formatDate(blog.createdAt)}
                </span>
                {blog.category && (
                  <span className="blog-category">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path>
                      <line x1="7" y1="7" x2="7.01" y2="7"></line>
                    </svg>
                    {blog.category}
                  </span>
                )}
                <span className="blog-views">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                  </svg>
                  {blog.views} lượt xem
                </span>
              </div>
            </header>

            {/* Blog Content */}
            <div className="blog-body">
              <div className="blog-excerpt">
                <p>{blog.excerpt}</p>
              </div>

              {blog.content ? (
                <div className="blog-content" dangerouslySetInnerHTML={{ __html: blog.content }} />
              ) : (
                <div className="blog-content">
                  <p>{blog.excerpt}</p>
                  <p>Nội dung chi tiết đang được cập nhật...</p>
                </div>
              )}
            </div>

            {/* Share Buttons */}
            <div className="blog-share">
              <h3>Chia sẻ bài viết</h3>
              <div className="share-buttons">
                <button className="share-btn facebook">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  Facebook
                </button>
                <button className="share-btn twitter">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                  Twitter
                </button>
                <button className="share-btn pinterest">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.39 18.592.026 11.985.026L12.017 0z"/>
                  </svg>
                  Pinterest
                </button>
              </div>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="blog-sidebar">
            {/* Related Posts */}
            {relatedBlogs.length > 0 && (
              <div className="sidebar-widget">
                <h3 className="widget-title">Bài viết liên quan</h3>
                <div className="related-posts">
                  {relatedBlogs.map((relatedBlog) => (
                    <a key={relatedBlog.id} href={`/blog/${relatedBlog.slug}`} className="related-post-item">
                      <div className="related-post-image">
                        <img
                          src={relatedBlog.image}
                          alt={relatedBlog.title}
                          onError={(e) => e.target.src = 'https://via.placeholder.com/100x80/f0f0f0/666?text=Blog'}
                        />
                      </div>
                      <div className="related-post-info">
                        <h4>{relatedBlog.title}</h4>
                        <span className="related-post-date">{formatDate(relatedBlog.createdAt)}</span>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Categories */}
            <div className="sidebar-widget">
              <h3 className="widget-title">Danh mục</h3>
              <ul className="category-list">
                <li><a href="/blog?category=Bộ sưu tập">Bộ sưu tập</a></li>
                <li><a href="/blog?category=Xu hướng">Xu hướng</a></li>
                <li><a href="/blog?category=Hướng dẫn">Hướng dẫn</a></li>
                <li><a href="/blog?category=Khuyến mãi">Khuyến mãi</a></li>
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </main>
  )
}

export default BlogDetail
