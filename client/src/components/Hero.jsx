import { useState, useEffect } from 'react'
import './Hero.css'
import pannerImage1 from '/panner 1.png'
import pannerImage2 from '/hero-2.jpg'
import pannerImage3 from '/hero-3.png'
import pannerImage4 from '/hero-4.jpeg'

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  
  const slides = [
    {
      id: 1,
      image: pannerImage1,
      alt: 'D\'Chic Collection 1',
      hasImage: true
    },
    {
      id: 2,
      image: pannerImage2,
      alt: 'D\'Chic Collection 2',
      hasImage: true
    },
    {
      id: 3,
      image: pannerImage3,
      alt: 'D\'Chic Collection 3',
      hasImage: true
    },
    {
      id: 4,
      image: pannerImage4,
      alt: 'D\'Chic Collection 4',
      hasImage: true
    }
  ]

  const goToSlide = (index) => {
    setCurrentSlide(index)
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [])

  return (
    <section className="hero">
      <div className="hero-slider">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`hero-slide ${index === currentSlide ? 'active' : ''}`}
          >
            {slide.hasImage ? (
              <>
                <div 
                  className="hero-background"
                  style={{ backgroundImage: `url(${slide.image})` }}
                ></div>
                <img 
                  src={slide.image} 
                  alt={slide.alt}
                  className="hero-image"
                />
              </>
            ) : (
              <div className="hero-placeholder">
                <p>Slide {slide.id}</p>
                <p className="placeholder-text">Thêm ảnh của bạn vào đây</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="hero-pagination">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`page-number ${index === currentSlide ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
          >
            {String(index + 1).padStart(2, '0')}
          </button>
        ))}
      </div>
    </section>
  )
}

export default Hero
