import { useState } from 'react'
import './Lookbook.css'

const Lookbook = () => {
  const lookbooks = [
    {
      id: 1,
      title: 'MỘC NGUYÊN',
      hashtag: '#lookbook',
      image: '/images/lookbook-1.jpg',
      link: '/lookbook/moc-nguyen'
    },
    {
      id: 2,
      title: 'BẠCH HOA',
      hashtag: '#lookbook',
      image: '/images/lookbook-2.jpg',
      link: '/lookbook/bach-hoa'
    },
    {
      id: 3,
      title: 'KHÚC XUÂN THI',
      hashtag: '#lookbook',
      image: '/images/lookbook-3.jpg',
      link: '/lookbook/khuc-xuan-thi'
    }
  ]

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
          {lookbooks.map((item) => (
            <div key={item.id} className="lookbook-card">
              <a href={item.link} className="lookbook-link">
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
                      <p className="lookbook-hashtag">{item.hashtag}</p>
                    </div>
                  </div>
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Lookbook
