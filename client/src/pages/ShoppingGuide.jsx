import './ShoppingGuide.css'

const ShoppingGuide = () => {
  const steps = [
    {
      number: '01',
      title: 'Chọn sản phẩm',
      description: 'Duyệt qua các danh mục sản phẩm và chọn những món đồ bạn yêu thích. Click vào sản phẩm để xem chi tiết về size, màu sắc và giá cả.',
      icon: (
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/>
        </svg>
      )
    },
    {
      number: '02',
      title: 'Thêm vào giỏ hàng',
      description: 'Chọn size phù hợp và số lượng mong muốn, sau đó nhấn "Thêm vào giỏ hàng". Bạn có thể tiếp tục mua sắm hoặc thanh toán ngay.',
      icon: (
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="9" cy="21" r="1"/>
          <circle cx="20" cy="21" r="1"/>
          <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"/>
          <path d="M12 9v6m-3-3h6"/>
        </svg>
      )
    },
    {
      number: '03',
      title: 'Kiểm tra giỏ hàng',
      description: 'Xem lại các sản phẩm trong giỏ hàng, điều chỉnh số lượng hoặc xóa sản phẩm nếu cần. Kiểm tra tổng tiền trước khi thanh toán.',
      icon: (
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M9 11l3 3L22 4"/>
          <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/>
        </svg>
      )
    },
    {
      number: '04',
      title: 'Điền thông tin',
      description: 'Nhập đầy đủ thông tin giao hàng bao gồm họ tên, số điện thoại, địa chỉ nhận hàng. Đảm bảo thông tin chính xác để nhận hàng nhanh chóng.',
      icon: (
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/>
          <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/>
        </svg>
      )
    },
    {
      number: '05',
      title: 'Chọn thanh toán',
      description: 'Lựa chọn phương thức thanh toán phù hợp: COD (thanh toán khi nhận hàng), chuyển khoản ngân hàng, hoặc thanh toán online.',
      icon: (
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/>
          <line x1="1" y1="10" x2="23" y2="10"/>
        </svg>
      )
    },
    {
      number: '06',
      title: 'Xác nhận đơn hàng',
      description: 'Kiểm tra lại toàn bộ thông tin đơn hàng và xác nhận. Bạn sẽ nhận được email/SMS xác nhận đơn hàng từ D\'Chic Fashion.',
      icon: (
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/>
          <polyline points="22 4 12 14.01 9 11.01"/>
        </svg>
      )
    }
  ]

  const policies = [
    {
      title: 'Miễn phí vận chuyển',
      description: 'Đơn hàng từ 500.000đ',
      icon: (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="1" y="3" width="15" height="13"/>
          <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/>
          <circle cx="5.5" cy="18.5" r="2.5"/>
          <circle cx="18.5" cy="18.5" r="2.5"/>
        </svg>
      )
    },
    {
      title: 'Đổi trả dễ dàng',
      description: 'Trong vòng 7 ngày',
      icon: (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <polyline points="23 4 23 10 17 10"/>
          <path d="M20.49 15a9 9 0 11-2.12-9.36L23 10"/>
        </svg>
      )
    },
    {
      title: 'Hỗ trợ 24/7',
      description: 'Tư vấn nhiệt tình',
      icon: (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/>
        </svg>
      )
    },
    {
      title: 'Thanh toán an toàn',
      description: 'Bảo mật thông tin',
      icon: (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
          <path d="M7 11V7a5 5 0 0110 0v4"/>
        </svg>
      )
    }
  ]

  return (
    <main className="shopping-guide-page">
      {/* Breadcrumb */}
      <div className="breadcrumb">
        <div className="container">
          <a href="/">Trang chủ</a>
          <span className="separator">/</span>
          <span className="current">Hướng dẫn mua hàng</span>
        </div>
      </div>

      {/* Hero Section */}
      <div className="guide-hero">
        <div className="container">
          <h1 className="guide-title">HƯỚNG DẪN MUA HÀNG</h1>
          <p className="guide-subtitle">
            Mua sắm tại D'Chic Fashion thật đơn giản với 6 bước dễ dàng
          </p>
        </div>
      </div>

      {/* Steps Section */}
      <div className="guide-steps">
        <div className="container">
          <div className="steps-grid">
            {steps.map((step, index) => (
              <div key={index} className="step-card">
                <div className="step-icon">{step.icon}</div>
                <div className="step-number">{step.number}</div>
                <h3 className="step-title">{step.title}</h3>
                <p className="step-description">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Policies Section */}
      <div className="guide-policies">
        <div className="container">
          <h2 className="policies-title">Chính sách mua hàng</h2>
          <div className="policies-grid">
            {policies.map((policy, index) => (
              <div key={index} className="policy-card">
                <div className="policy-icon">{policy.icon}</div>
                <h3 className="policy-title">{policy.title}</h3>
                <p className="policy-description">{policy.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="guide-contact">
        <div className="container">
          <div className="contact-box">
            <h2 className="contact-title">Cần hỗ trợ thêm?</h2>
            <p className="contact-description">
              Đội ngũ tư vấn của D'Chic Fashion luôn sẵn sàng hỗ trợ bạn
            </p>
            <div className="contact-social">
              <a href="tel:028.36222.999" className="social-icon" aria-label="Hotline">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/>
                </svg>
              </a>
              <a href="mailto:support@dchicfashion.com" className="social-icon" aria-label="Email">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Facebook">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
                </svg>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Instagram">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
              </a>
              <a href="https://zalo.me" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Zalo">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"/>
                </svg>
              </a>
            </div>
            <a href="/lien-he" className="contact-button">LIÊN HỆ NGAY</a>
          </div>
        </div>
      </div>
    </main>
  )
}

export default ShoppingGuide
