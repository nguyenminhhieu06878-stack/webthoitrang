import { useState } from 'react'
import './Showroom.css'

const Showroom = () => {
  const [currentSlide, setCurrentSlide] = useState(0)

  const showroomImages = [
    '/room1.png',
    '/room2.png',
    '/room3.png',
    '/room4.png',
    '/room5.png'
  ]

  const showrooms = [
    {
      id: 1,
      address: '41 Tràng Tiền, Hoàn Kiếm, Hà Nội',
      phone: '024 3562 2626'
    }
  ]

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % showroomImages.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + showroomImages.length) % showroomImages.length)
  }

  const goToSlide = (index) => {
    setCurrentSlide(index)
  }

  return (
    <main className="showroom-page">
      {/* Breadcrumb */}
      <div className="breadcrumb">
        <div className="container">
          <a href="/">Trang chủ</a>
          <span className="separator">/</span>
          <span className="current">HỆ THỐNG SHOWROOM</span>
        </div>
      </div>

      {/* Page Content */}
      <div className="showroom-content">
        <div className="container">
          <h1 className="showroom-title">HỆ THỐNG SHOWROOM</h1>

          <div className="showroom-layout">
            {/* Left: Image Slider */}
            <div className="showroom-slider-section">
              <div className="showroom-slider">
                <div className="showroom-slides">
                  {showroomImages.map((image, index) => (
                    <div
                      key={index}
                      className={`showroom-slide ${index === currentSlide ? 'active' : ''}`}
                    >
                      <img
                        src={image}
                        alt={`Showroom ${index + 1}`}
                        onError={(e) => {
                          e.target.style.display = 'none'
                          e.target.parentElement.classList.add('no-image')
                        }}
                      />
                    </div>
                  ))}
                </div>

                {/* Navigation Arrows */}
                <button className="showroom-nav-btn prev" onClick={prevSlide}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="15 18 9 12 15 6"></polyline>
                  </svg>
                </button>
                <button className="showroom-nav-btn next" onClick={nextSlide}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                </button>

                {/* Dots */}
                <div className="showroom-dots">
                  {showroomImages.map((_, index) => (
                    <button
                      key={index}
                      className={`showroom-dot ${index === currentSlide ? 'active' : ''}`}
                      onClick={() => goToSlide(index)}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Showroom List */}
            <div className="showroom-list-section">
              <h2 className="showroom-list-title">HÀ NỘI</h2>
              <div className="showroom-list">
                {showrooms.map((showroom) => (
                  <div key={showroom.id} className="showroom-item">
                    <p className="showroom-address">{showroom.address}</p>
                    <p className="showroom-phone">ĐT: {showroom.phone}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Showroom
