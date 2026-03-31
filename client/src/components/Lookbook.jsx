import { useState, useEffect } from 'react'
import './Lookbook.css'

const Lookbook = () => {
  const [lookbooks, setLookbooks] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchLookbooks = async () => {
      try {
        const response = await fetch('http://localhost:5001/api/lookbook?featured=true')
        const data = await response.json()
        // Get only first 3 featured lookbooks for homepage
        setLookbooks(data.slice(0, 3))
      } catch (error) {
        console.error('Error fetching lookbooks:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchLookbooks()
  }, [])

  return (
    <section className="lookbook">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">LOOKBOOK</h2>
          <div className="title-divider">
            <span className="divider-line"></span>
            <span className="divider-icon">◇</span>
            <span className="divider-line"></span>
          </div>
        </div>

        <div className="lookbook-grid">
          {loading ? (
            <p style={{ textAlign: 'center', gridColumn: '1 / -1' }}>Đang tải...</p>
          ) : (
            lookbooks.map((item) => (
              <div key={item.id} className="lookbook-card">
                <a href="/lookbook" className="lookbook-link">
                  <div className="lookbook-image">
                    <div className="lookbook-image-placeholder">
                      <img 
                        src={item.image} 
                        alt={item.title}
                        onError={(e) => {
                          e.target.style.display = 'none'
                          e.target.parentElement.classList.add('no-image')
                        }}
                      />
                    </div>
                    <div className="lookbook-overlay">
                      <div className="lookbook-content">
                        <h3 className="lookbook-title">{item.title}</h3>
                        <p className="lookbook-hashtag">#lookbook</p>
                      </div>
                    </div>
                  </div>
                </a>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  )
}

export default Lookbook
