import { useState } from 'react'
import './Showroom.css'

const Showroom = () => {
  const [currentSlide, setCurrentSlide] = useState(0)

  const showroomImages = [
    '/images/showroom-1.jpg',
    '/images/showroom-2.jpg',
    '/images/showroom-3.jpg',
    '/images/showroom-4.jpg',
    '/images/showroom-5.jpg'
  ]

  const showrooms = [
    {
      id: 1,
      address: '268 Tô Hiến Thành, P.15, Q.10, TP. Hồ Chí Minh',
      phone: '028 38 62 57 91'
    },
    {
      id: 2,
      address: '40 Lê Văn Sỹ, P.1.1, Q.Phú Nhuận, TP. Hồ Chí Minh',
      phone: '028 62 53 73 93'
    },
    {
      id: 3,
      address: '248B Phan Đình Phùng, P.1, Q.Phú Nhuận, TP. Hồ Chí Minh',
      phone: '028 62 53 87 87'
    },
    {
      id: 4,
      address: '259 Nguyễn Trãi, P.Nguyễn Cư Trinh, Q.1 TP. Hồ Chí Minh',
      phone: '028 62 913 241'
    },
    {
      id: 5,
      address: '664 Quang Trung, P.11, Q. Gò Vấp, TP. Hồ Chí Minh',
      phone: '028 62 99 22 33'
    },
    {
      id: 6,
      address: '132A Cách Mạng Tháng 8, P.10, Q.3, TP. Hồ Chí Minh',
      phone: '028 62 66 77 33'
    },
    {
      id: 7,
      address: '119 Lê Văn Duyệt (đường Đinh Tiên Hoàng cũ), P.3, Q.Bình Thạnh, TP. Hồ Chí Minh',
      phone: '028 35 14 97 81'
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
              <h2 className="showroom-list-title">TP. HỒ CHÍ MINH</h2>
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
