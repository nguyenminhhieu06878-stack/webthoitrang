import { useState } from 'react'
import './Header.css'

const Header = () => {
  const [cartCount, setCartCount] = useState(0)

  return (
    <>
      {/* Top Banner */}
      <div className="top-banner">
        <p>BST MÙA XUÂN 2026 | BLOOM COLLECTION</p>
      </div>

      {/* Header Top */}
      <div className="header-top">
        <p>Miễn phí vận chuyển đơn hàng từ 500k</p>
        <div className="header-actions">
          <a href="/dang-nhap" className="header-link">
            TÀI KHOẢN 
            <svg className="icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </a>
          <a href="#" className="header-link">
            GIỎ HÀNG 
            <svg className="icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
            {cartCount}
          </a>
        </div>
      </div>

      {/* Main Navigation */}
      <header className="header">
        <nav className="navbar">
          <div className="nav-left">
            <div className="nav-item-wrapper">
              <a href="#" className="nav-link">GIỚI THIỆU</a>
              <div className="dropdown-menu">
                <a href="/ve-chung-toi" className="dropdown-item">Về Chúng Tôi</a>
                <a href="/lien-he" className="dropdown-item">Liên Hệ</a>
                <a href="/chinh-sach-bao-mat" className="dropdown-item">Chính Sách Bảo Mật</a>
              </div>
            </div>
            <div className="nav-item-wrapper">
              <a href="#" className="nav-link">SHOP ONLINE</a>
              <div className="dropdown-menu">
                <a href="/new-collection" className="dropdown-item featured">New Collection</a>
                <a href="/ao" className="dropdown-item">Áo</a>
                <a href="/vay-dam-cong-so" className="dropdown-item">Váy Đầm Công Sở</a>
                <a href="/ao-khoac" className="dropdown-item">Áo Khoác</a>
                <a href="/quan" className="dropdown-item">Quần</a>
                <a href="/chan-vay" className="dropdown-item">Chân Váy</a>
              </div>
            </div>
            <a href="/blog" className="nav-link">BLOG</a>
            <a href="/lookbook" className="nav-link">LOOKBOOK</a>
          </div>

          <a href="/" className="logo">
            <h1 className="logo-text">D'CHIC</h1>
            <p className="logo-subtitle">FASHION</p>
          </a>

          <div className="nav-right">
            <a href="/showroom" className="nav-link">HỆ THỐNG SHOWROOM</a>
            <div className="nav-item-wrapper">
              <a href="#" className="nav-link">HƯỚNG DẪN MUA HÀNG</a>
              <div className="dropdown-menu">
                <a href="/huong-dan-mua-hang" className="dropdown-item">Các Bước Mua Hàng</a>
                <a href="/quy-dinh-doi-hang" className="dropdown-item">Quy Định Đổi Hàng</a>
                <a href="/thong-tin-tai-khoan" className="dropdown-item">Thông Tin Tài Khoản</a>
              </div>
            </div>
            <button className="search-btn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.35-4.35"></path>
              </svg>
            </button>
          </div>
        </nav>
      </header>
    </>
  )
}

export default Header
