import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import './Cart.css'

const Cart = () => {
  const navigate = useNavigate()
  const [cartItems, setCartItems] = useState([])
  const [promoCode, setPromoCode] = useState('')

  useEffect(() => {
    const savedCart = localStorage.getItem('cart')
    if (savedCart) {
      setCartItems(JSON.parse(savedCart))
    }
  }, [])

  const updateCart = (newCart) => {
    setCartItems(newCart)
    localStorage.setItem('cart', JSON.stringify(newCart))
    // Dispatch custom event to update header
    window.dispatchEvent(new Event('cartUpdated'))
  }

  const handleQuantityChange = (index, change) => {
    const newCart = [...cartItems]
    const newQuantity = newCart[index].quantity + change
    
    if (newQuantity > 0) {
      newCart[index].quantity = newQuantity
      updateCart(newCart)
    }
  }

  const handleRemoveItem = (index) => {
    const newCart = cartItems.filter((_, i) => i !== index)
    updateCart(newCart)
    toast.success('Đã xóa sản phẩm khỏi giỏ hàng')
  }

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0)
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN').format(price) + ' ₫'
  }

  const handleCheckout = () => {
    const user = localStorage.getItem('user')
    if (!user) {
      toast.info('Vui lòng đăng nhập để thanh toán')
      navigate('/dang-nhap')
      return
    }
    navigate('/thanh-toan')
  }

  const total = calculateTotal()
  const shipping = total >= 500000 ? 0 : 30000
  const finalTotal = total + shipping

  return (
    <div className="cart-page">
      <div className="cart-container">
        {cartItems.length === 0 ? (
          <div className="empty-cart">
            <p>Giỏ hàng trống</p>
            <button onClick={() => navigate('/')} className="btn-continue">Tiếp tục mua sắm</button>
          </div>
        ) : (
          <>
            <div className="cart-table">
              <div className="cart-header">
                <div className="header-col product-col">Sản phẩm</div>
                <div className="header-col price-col">Giá</div>
                <div className="header-col quantity-col">Số lượng</div>
                <div className="header-col total-col">Tổng cộng</div>
              </div>

              {cartItems.map((item, index) => (
                <div key={index} className="cart-row">
                  <div className="cart-cell product-cell">
                    <button 
                      className="remove-btn"
                      onClick={() => handleRemoveItem(index)}
                    >
                      ×
                    </button>
                    <img 
                      src={item.image || '/placeholder.jpg'} 
                      alt={item.name}
                      className="product-img"
                    />
                    <div className="product-info">
                      <div className="product-name">{item.name}</div>
                      {item.size && <div className="product-size">Size: {item.size}</div>}
                    </div>
                  </div>

                  <div className="cart-cell price-cell">
                    {formatPrice(item.price)}
                  </div>

                  <div className="cart-cell quantity-cell">
                    <div className="quantity-control">
                      <button 
                        className="qty-btn"
                        onClick={() => handleQuantityChange(index, -1)}
                      >
                        -
                      </button>
                      <span className="qty-value">{item.quantity}</span>
                      <button 
                        className="qty-btn"
                        onClick={() => handleQuantityChange(index, 1)}
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="cart-cell total-cell">
                    {formatPrice(item.price * item.quantity)}
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-footer">
              <div className="footer-note">
                Bạn sẽ có được <strong>44 điểm</strong> với đơn hàng này. Ưu đãi thể không áp dụng với các chương trình khuyến mãi khác!
              </div>
              
              <div className="cart-bottom">
                <div className="promo-section">
                  <input 
                    type="text"
                    placeholder="Nhập Mã Giảm Giá"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="promo-input"
                  />
                  <div className="shipping-info">
                    · Phí vận chuyển: <strong className="free-shipping">MIỄN PHÍ</strong>
                  </div>
                </div>

                <div className="cart-summary">
                  <div className="summary-row">
                    <span>{cartItems.length} sản phẩm</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                  <div className="summary-row total-row">
                    <span>Tổng cộng:</span>
                    <span className="summary-total">{formatPrice(finalTotal)}</span>
                  </div>
                  <button className="btn-checkout" onClick={handleCheckout}>
                    THANH TOÁN →
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default Cart
