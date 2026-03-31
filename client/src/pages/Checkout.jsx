import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import './Checkout.css'

const Checkout = () => {
  const navigate = useNavigate()
  const [cartItems, setCartItems] = useState([])
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    city: '',
    district: '',
    ward: '',
    address: '',
    paymentMethod: 'COD'
  })

  useEffect(() => {
    const savedCart = localStorage.getItem('cart')
    if (savedCart) {
      setCartItems(JSON.parse(savedCart))
    } else {
      toast.info('Giỏ hàng trống')
      navigate('/gio-hang')
    }
  }, [navigate])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0)
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN').format(price) + ' ₫'
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Validate form
    if (!formData.fullName || !formData.phone || !formData.address) {
      toast.error('Vui lòng điền đầy đủ thông tin')
      return
    }

    try {
      const user = JSON.parse(localStorage.getItem('user'))
      const token = localStorage.getItem('token')
      
      console.log('User from localStorage:', user)
      console.log('Token from localStorage:', token ? 'Present' : 'Missing')
      
      // Prepare order data
      const orderData = {
        items: cartItems,
        totalAmount: calculateTotal(),
        shippingAddress: {
          fullName: formData.fullName,
          phone: formData.phone,
          address: formData.address,
          ward: formData.ward,
          district: formData.district,
          city: formData.city,
          email: formData.email
        },
        paymentMethod: formData.paymentMethod
      }

      // Set headers
      const headers = {
        'Content-Type': 'application/json'
      }
      
      // Add auth token if available
      if (token) {
        headers['Authorization'] = `Bearer ${token}`
        console.log('Token added to headers')
      } else {
        console.log('No token found, ordering as guest')
      }

      const response = await fetch('http://localhost:5001/api/orders', {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(orderData)
      })

      if (response.ok) {
        localStorage.removeItem('cart')
        window.dispatchEvent(new Event('cartUpdated'))
        toast.success('Đặt hàng thành công!')
        navigate('/don-hang')
      } else {
        const errorData = await response.json()
        console.error('Order error:', errorData)
        toast.error(errorData.message || 'Đặt hàng thất bại')
      }
    } catch (error) {
      console.error('Error:', error)
      toast.error('Có lỗi xảy ra: ' + error.message)
    }
  }

  const total = calculateTotal()
  const shipping = 0 // Miễn phí

  return (
    <div className="checkout-page">
      <div className="checkout-container">
        <div className="checkout-left">
          <h2 className="section-title">GIỎ HÀNG CỦA BẠN</h2>
          
          <div className="cart-items-summary">
            <div className="items-count">{cartItems.length} sản phẩm</div>
            
            {cartItems.map((item, index) => (
              <div key={index} className="checkout-item">
                <img 
                  src={item.image || '/placeholder.jpg'} 
                  alt={item.name}
                  className="checkout-item-img"
                />
                <div className="checkout-item-info">
                  <div className="checkout-item-name">{item.name}</div>
                  <div className="checkout-item-meta">{item.code || 'H32-14'}</div>
                  <div className="checkout-item-meta">Size: {item.size || 'M'} x {item.quantity}</div>
                  <div className="checkout-item-price">{formatPrice(item.price)}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="checkout-summary">
            <div className="summary-row">
              <span>Thành tiền</span>
              <span>{formatPrice(total)}</span>
            </div>
            <div className="summary-row">
              <span>Vận chuyển</span>
              <span>Miễn phí</span>
            </div>
            <div className="summary-row total-row">
              <span>Tổng cộng:</span>
              <strong>{formatPrice(total)}</strong>
            </div>
          </div>

          <div className="promo-code-section">
            <input 
              type="text" 
              placeholder="Nhập Mã Giảm Giá"
              className="promo-input"
            />
          </div>
        </div>

        <div className="checkout-right">
          <h2 className="section-title">THÔNG TIN MUA HÀNG</h2>
          
          <form onSubmit={handleSubmit} className="checkout-form">
            <div className="form-note">
              Bạn đã có tài khoản? <a href="/dang-nhap">Click đăng nhập để tích điểm thành viên</a>
            </div>

            <div className="form-group">
              <label>Họ Tên</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Điện thoại</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Tỉnh / Thành phố</label>
                <select
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                >
                  <option value="">Chọn Tỉnh / Thành phố</option>
                  <option value="hanoi">Hà Nội</option>
                  <option value="hcm">TP. Hồ Chí Minh</option>
                  <option value="danang">Đà Nẵng</option>
                </select>
              </div>

              <div className="form-group">
                <label>Quận / Huyện</label>
                <select
                  name="district"
                  value={formData.district}
                  onChange={handleInputChange}
                >
                  <option value="">Chọn Quận / Huyện</option>
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Phường / Xã</label>
                <select
                  name="ward"
                  value={formData.ward}
                  onChange={handleInputChange}
                >
                  <option value="">Chọn Phường / Xã</option>
                </select>
              </div>

              <div className="form-group">
                <label>Địa chỉ</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label>Nhập Email để khẳng bộ lọ ra hội nhận Voucher</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>

            <div className="payment-methods">
              <div className="payment-option">
                <input
                  type="radio"
                  id="cod"
                  name="paymentMethod"
                  value="COD"
                  checked={formData.paymentMethod === 'COD'}
                  onChange={handleInputChange}
                />
                <label htmlFor="cod">
                  <strong>Thanh toán bằng tiền mặt khi nhận hàng (COD)</strong>
                  <p>Nhân viên K&K Fashion sẽ liên hệ với bạn để xác nhận đơn hàng.</p>
                </label>
              </div>

              <div className="payment-option">
                <input
                  type="radio"
                  id="card"
                  name="paymentMethod"
                  value="CARD"
                  checked={formData.paymentMethod === 'CARD'}
                  onChange={handleInputChange}
                />
                <label htmlFor="card">Thanh toán qua thẻ quốc tế (Visa, Master)</label>
              </div>

              <div className="payment-option">
                <input
                  type="radio"
                  id="atm"
                  name="paymentMethod"
                  value="ATM"
                  checked={formData.paymentMethod === 'ATM'}
                  onChange={handleInputChange}
                />
                <label htmlFor="atm">Thanh toán qua thẻ nội địa (ATM)</label>
              </div>
            </div>

            <button type="submit" className="btn-submit-order">
              Hoàn tất đặt hàng
            </button>

            <div className="order-note">
              Bạn sẽ có được <strong>44 điểm</strong> với đơn hàng này. Ưu đãi thể không áp dụng với các chương trình khuyến mãi khác!
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Checkout
