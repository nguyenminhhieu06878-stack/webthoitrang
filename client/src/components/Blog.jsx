import { useState } from 'react'
import './Blog.css'

const Blog = () => {
  const [currentSlide, setCurrentSlide] = useState(0)

  const blogs = [
    {
      id: 1,
      title: 'D\'Chic Fashion cho ra mắt Bộ sưu tập Áo dài Tết 2026 "Dĩ Sắc Lưu Hương"',
      excerpt: '"Dĩ Sắc Lưu Hương" Không chỉ là bộ sưu tập thời trang, mà còn là lời tri ân dành cho những người phụ nữ Việt thời gian – đề mỗi...',
      image: '/images/blog-1.jpg',
      logo: 'D\'CHIC',
      overlayTitle: 'Dĩ Sắc Lưu Hương',
      link: '/blog/di-sac-luu-huong'
    },
    {
      id: 2,
      title: '10+ mẫu váy liền dáng đầu xu hướng thiền nàng nhìn là muốn mua',
      excerpt: 'Khám phá top 10 best seller váy liền dạp, dẫn đầu xu hướng 2025. Thiết kế tôn dáng, trẻ trung, dễ mặc – nàng nhìn là muốn mua ngay.',
      image: '/images/blog-2.jpg',
      logo: 'D\'CHIC',
      overlayTitle: 'BEST SELLER VÁY LIỀN',
      link: '/blog/best-seller-vay-lien'
    },
    {
      id: 3,
      title: 'D\'Chic Fashion Ra Mắt BST Tháng 3 "Mộc Nguyên" – Vẻ Đẹp Mộc Mạc Cho Mỗi Khởi Đầu Mới!',
      excerpt: 'Ra mắt vào tháng 3 – tháng của yêu thương và tôn vinh phái đẹp – "Mộc Nguyên" như một lời chào dịu dàng gửi đến những người phụ nữ...',
      image: '/images/blog-3.jpg',
      logo: 'D\'CHIC',
      overlayTitle: 'Mộc Nguyên',
      link: '/blog/moc-nguyen'
    }
  ]

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
                  <a href={blog.link} className="blog-card">
                    <div className="blog-image">
                      <div className="blog-logo">{blog.logo}</div>
                      <img 
                        src={blog.image} 
                        alt={blog.title}
                        onError={(e) => {
                          e.target.style.display = 'none'
                          e.target.parentElement.classList.add('no-image')
                        }}
                      />
                      <div className="blog-overlay-title">{blog.overlayTitle}</div>
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
