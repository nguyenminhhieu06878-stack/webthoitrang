import { useState, useEffect } from 'react'
import './Lookbook.css'

const LookbookPage = () => {
  const [lookbookImages, setLookbookImages] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchLookbook = async () => {
      try {
        const response = await fetch('http://localhost:5001/api/lookbook')
        const data = await response.json()
        
        // Add height variation for masonry layout
        const heightVariations = ['tall', 'medium', 'short']
        const imagesWithHeight = data.map((item, index) => ({
          ...item,
          height: heightVariations[index % 3]
        }))
        
        setLookbookImages(imagesWithHeight)
      } catch (error) {
        console.error('Error fetching lookbook:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchLookbook()
  }, [])

  if (loading) {
    return (
      <main className="lookbook-page">
        <div className="lookbook-header">
          <h1 className="lookbook-title">Lookbook</h1>
        </div>
        <div className="lookbook-content">
          <p style={{ textAlign: 'center', padding: '2rem' }}>Đang tải...</p>
        </div>
      </main>
    )
  }

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
                  alt={item.title || 'D\'Chic Fashion Lookbook'}
                  onError={(e) => {
                    e.target.style.display = 'none'
                  }}
                />
                <div className="lookbook-overlay">
                  <div className="lookbook-overlay-content">
                    {item.title && <h3>{item.title}</h3>}
                    {item.description && <p>{item.description}</p>}
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
