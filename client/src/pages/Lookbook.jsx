import './Lookbook.css'

const LookbookPage = () => {
  const lookbookImages = [
    { id: 1, image: '/images/lookbook-1.jpg', alt: 'D\'Chic Fashion Lookbook 1', height: 'tall' },
    { id: 2, image: '/images/lookbook-2.jpg', alt: 'D\'Chic Fashion Lookbook 2', height: 'medium' },
    { id: 3, image: '/images/lookbook-3.jpg', alt: 'D\'Chic Fashion Lookbook 3', height: 'tall' },
    { id: 4, image: '/images/lookbook-4.jpg', alt: 'D\'Chic Fashion Lookbook 4', height: 'short' },
    { id: 5, image: '/images/lookbook-5.jpg', alt: 'D\'Chic Fashion Lookbook 5', height: 'tall' },
    { id: 6, image: '/images/lookbook-6.jpg', alt: 'D\'Chic Fashion Lookbook 6', height: 'medium' },
    { id: 7, image: '/images/lookbook-7.jpg', alt: 'D\'Chic Fashion Lookbook 7', height: 'tall' },
    { id: 8, image: '/images/lookbook-8.jpg', alt: 'D\'Chic Fashion Lookbook 8', height: 'medium' },
    { id: 9, image: '/images/lookbook-9.jpg', alt: 'D\'Chic Fashion Lookbook 9', height: 'short' },
    { id: 10, image: '/images/lookbook-10.jpg', alt: 'D\'Chic Fashion Lookbook 10', height: 'tall' },
    { id: 11, image: '/images/lookbook-11.jpg', alt: 'D\'Chic Fashion Lookbook 11', height: 'medium' },
    { id: 12, image: '/images/lookbook-12.jpg', alt: 'D\'Chic Fashion Lookbook 12', height: 'tall' }
  ]

  return (
    <main className="lookbook-page">
      {/* Page Title */}
      <div className="lookbook-header">
        <h1 className="lookbook-title">Lookbook</h1>
      </div>

      {/* Lookbook Gallery */}
      <div className="lookbook-content">
        <div className="lookbook-gallery">
          {lookbookImages.map((item) => (
            <div key={item.id} className={`lookbook-item ${item.height}`}>
              <div className="lookbook-image-wrapper">
                <img 
                  src={item.image} 
                  alt={item.alt}
                  onError={(e) => {
                    e.target.style.display = 'none'
                  }}
                />
                <div className="lookbook-overlay">
                  <div className="lookbook-overlay-content">
                    <span className="lookbook-view-icon">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                        <circle cx="12" cy="12" r="3"></circle>
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}

export default LookbookPage
