import './Contact.css'

const Contact = () => {
  return (
    <main className="contact-content">
      {/* Google Maps */}
      <div className="contact-map">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.0969739862!2d105.85195731476295!3d21.02880938599474!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab953357c995%3A0x2f85e5f8e79a2e6!2zNDEgVHLDoG5nIFRpw6puLCBIw6AgTuG7mWk!5e0!3m2!1svi!2s!4v1234567890123!5m2!1svi!2s"
          width="100%"
          height="400"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="D'Chic Fashion - 41 Tràng Tiền, Hà Nội"
        ></iframe>
      </div>

      {/* Contact Content */}
      <div className="contact-main">
        <div className="container">
          <div className="contact-grid">
            {/* Left Side - Contact Info */}
            <div className="contact-info">
              <h2 className="contact-heading">LIÊN HỆ</h2>
              
              <div className="contact-details">
                <div className="contact-item">
                  <span className="contact-label">Địa chỉ:</span>
                  <span className="contact-value">41 Tràng Tiền, Hà Nội</span>
                </div>
                
                <div className="contact-item">
                  <span className="contact-label">Điện thoại:</span>
                  <a href="tel:02435622626" className="contact-value">024 3562 2626</a>
                </div>
                
                <div className="contact-item">
                  <span className="contact-label">Hotline:</span>
                  <a href="tel:02435622626" className="contact-value">024 3562 2626</a>
                </div>
                
                <div className="contact-item">
                  <span className="contact-label">Email:</span>
                  <a href="mailto:contact@dchicfashion.vn" className="contact-value">contact@dchicfashion.vn</a>
                </div>
                
                <div className="contact-item">
                  <span className="contact-label">Website:</span>
                  <a href="https://www.dchicfashion.vn" className="contact-value" target="_blank" rel="noopener noreferrer">www.dchicfashion.vn</a>
                </div>
                
                <div className="contact-item">
                  <span className="contact-label">Fanpage:</span>
                  <a href="https://facebook.com/dchicfashion.vn" className="contact-value" target="_blank" rel="noopener noreferrer">https://facebook.com/dchicfashion.vn</a>
                </div>
              </div>

              {/* Social Icons */}
              <div className="contact-social">
                <a href="#" className="social-link" aria-label="Facebook">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a href="#" className="social-link" aria-label="Twitter">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </a>
                <a href="#" className="social-link" aria-label="Instagram">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                <a href="#" className="social-link" aria-label="YouTube">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>
                <a href="#" className="social-link" aria-label="Instagram">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Right Side - Contact Form */}
            <div className="contact-form-wrapper">
              <h3 className="form-heading">Liên hệ với chúng tôi</h3>
              
              <form className="contact-form">
                <div className="form-group">
                  <select className="form-control" required>
                    <option value="">Dịch vụ Khách hàng</option>
                    <option value="support">Hỗ trợ kỹ thuật</option>
                    <option value="sales">Tư vấn bán hàng</option>
                    <option value="feedback">Góp ý</option>
                  </select>
                </div>

                <div className="form-group">
                  <input 
                    type="email" 
                    className="form-control" 
                    placeholder="you@email.com"
                    required
                  />
                </div>

                <div className="form-group">
                  <textarea 
                    className="form-control" 
                    rows="5"
                    placeholder="Chúng tôi có thể giúp bạn những gì?"
                    required
                  ></textarea>
                </div>

                <div className="form-group">
                  <div className="recaptcha-placeholder">
                    <input type="checkbox" id="recaptcha" required />
                    <label htmlFor="recaptcha">Tôi không phải là người máy</label>
                  </div>
                </div>

                <button type="submit" className="btn-submit">Gửi</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Contact
