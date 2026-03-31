import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './Header.css'

const Header = () => {
  const [cartCount, setCartCount] = useState(0)
  const [user, setUser] = useState(null)
  const [showSearch, setShowSearch] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [searching, setSearching] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem('user')
    if (userData) {
      setUser(JSON.parse(userData))
    }

    // Update cart count
    const updateCartCount = () => {
      const cart = localStorage.getItem('cart')
      if (cart) {
        const cartItems = JSON.parse(cart)
        const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0)
        setCartCount(totalItems)
      } else {
        setCartCount(0)
      }
    }

    // Initial load
    updateCartCount()

    // Listen for storage changes
    window.addEventListener('storage', updateCartCount)
    
    // Listen for custom cart update event
    window.addEventListener('cartUpdated', updateCartCount)

    return () => {
      window.removeEventListener('storage', updateCartCount)
      window.removeEventListener('cartUpdated', updateCartCount)
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setUser(null)
    navigate('/')
  }

  const handleSearch = async (query) => {
    setSearchQuery(query)
    if (query.trim().length < 2) {
      setSearchResults([])
      return
    }

    setSearching(true)
    try {
      const response = await fetch(`http://localhost:5001/api/products?search=${query}`)
      const data = await response.json()
      setSearchResults(data.slice(0, 6)) // Hiển thị tối đa 6 kết quả
    } catch (error) {
      console.error('Error searching products:', error)
    } finally {
      setSearching(false)
    }
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN').format(price) + ' đ'
  }

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
          {user ? (
            <div className="user-dropdown">
              <button className="header-link user-trigger">
                {user.name}
                <svg className="icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
                <svg className="icon-chevron" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </button>
              <div className="dropdown-content">
                <a href="/profile" className="dropdown-item">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                  Thông tin tài khoản
                </a>
                <a href="/orders" className="dropdown-item">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
                    <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
                  </svg>
                  Đơn hàng của tôi
                </a>
                <div className="dropdown-divider"></div>
                <button onClick={handleLogout} className="dropdown-item logout">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                    <polyline points="16 17 21 12 16 7"></polyline>
                    <line x1="21" y1="12" x2="9" y2="12"></line>
                  </svg>
                  Đăng xuất
                </button>
              </div>
            </div>
          ) : (
            <a href="/dang-nhap" className="header-link">
              TÀI KHOẢN 
              <svg className="icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </a>
          )}
          <a href="/cart" className="header-link">
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
            <button className="search-btn" onClick={() => setShowSearch(true)}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.35-4.35"></path>
              </svg>
            </button>
          </div>
        </nav>
      </header>

      {/* Search Overlay */}
      {showSearch && (
        <div className="search-overlay" onClick={() => setShowSearch(false)}>
          <div className="search-container" onClick={(e) => e.stopPropagation()}>
            <button className="search-close" onClick={() => setShowSearch(false)}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
            
            <div className="search-input-wrapper">
              <input
                type="text"
                className="search-input"
                placeholder="Tìm sản phẩm ..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                autoFocus
              />
              <svg className="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.35-4.35"></path>
              </svg>
            </div>

            <div className="search-results">
              {searching ? (
                <p className="search-message">Đang tìm kiếm...</p>
              ) : searchQuery.trim().length < 2 ? (
                <p className="search-message">Nhập ít nhất 2 ký tự để tìm kiếm</p>
              ) : searchResults.length === 0 ? (
                <p className="search-message">Không tìm thấy sản phẩm nào</p>
              ) : (
                <div className="search-products">
                  {searchResults.map((product) => (
                    <a
                      key={product.id}
                      href={`/product/${product.id}`}
                      className="search-product-item"
                      onClick={() => setShowSearch(false)}
                    >
                      <div className="search-product-image">
                        <img
                          src={product.images?.[0] || 'https://via.placeholder.com/80x100/f0f0f0/666?text=No+Image'}
                          alt={product.name}
                          onError={(e) => e.target.src = 'https://via.placeholder.com/80x100/f0f0f0/666?text=No+Image'}
                        />
                      </div>
                      <div className="search-product-info">
                        <p className="search-product-code">{product.code}</p>
                        <h4 className="search-product-name">{product.name}</h4>
                        <p className="search-product-price">{formatPrice(product.price)}</p>
                      </div>
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Header
