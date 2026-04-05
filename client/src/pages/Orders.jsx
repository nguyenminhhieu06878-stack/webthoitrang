import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'
import './Orders.css'

const Orders = () => {
  const navigate = useNavigate()
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')
  const [showDropdown, setShowDropdown] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [showDetailModal, setShowDetailModal] = useState(false)

  useEffect(() => {
    fetchOrders()
  }, [])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showDropdown && !event.target.closest('.filter-dropdown')) {
        setShowDropdown(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [showDropdown])

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem('token')
      
      if (token) {
        // Fetch orders for logged in user
        const response = await axios.get('http://localhost:5001/api/orders/my-orders', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        setOrders(response.data.orders || [])
      } else {
        // No logged in user - show empty state
        setOrders([])
      }
    } catch (error) {
      if (error.response?.status === 401) {
        toast.error('Phiên đăng nhập hết hạn')
        localStorage.removeItem('user')
        localStorage.removeItem('token')
        setOrders([])
      } else {
        console.error('Error fetching orders:', error)
        toast.error('Không thể tải đơn hàng')
      }
    } finally {
      setLoading(false)
    }
  }

  const getStatusText = (status) => {
    const statusMap = {
      all: 'Tất cả trạng thái',
      pending: 'Chờ xác nhận',
      processing: 'Đang xử lý',
      shipped: 'Đang giao',
      delivered: 'Đã giao',
      cancelled: 'Đã hủy'
    }
    return statusMap[status] || status
  }

  const getStatusClass = (status) => {
    return `status-badge status-${status}`
  }

  const filteredOrders = filter === 'all' 
    ? orders 
    : orders.filter(order => order.status === filter)

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price)
  }

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const handleViewDetail = (order) => {
    setSelectedOrder(order)
    setShowDetailModal(true)
  }

  const handleCloseModal = () => {
    setShowDetailModal(false)
    setSelectedOrder(null)
  }

  const handleReorder = (order) => {
    try {
      // Get current cart
      const existingCart = JSON.parse(localStorage.getItem('cart') || '[]')
      
      // Add all items from the order to cart
      order.items.forEach(item => {
        existingCart.push({
          id: item.productId || item.id,
          name: item.name,
          price: item.price,
          image: item.image,
          size: item.size,
          color: item.color,
          quantity: item.quantity
        })
      })
      
      // Save to localStorage
      localStorage.setItem('cart', JSON.stringify(existingCart))
      
      // Update cart count
      window.dispatchEvent(new Event('cartUpdated'))
      
      toast.success(`Đã thêm ${order.items.length} sản phẩm vào giỏ hàng!`)
      
      // Navigate to cart
      setTimeout(() => {
        navigate('/cart')
      }, 1000)
    } catch (error) {
      console.error('Error reordering:', error)
      toast.error('Không thể thêm sản phẩm vào giỏ hàng')
    }
  }

  if (loading) {
    return (
      <main className="orders-page">
        <div className="container">
          <div className="loading">Đang tải...</div>
        </div>
      </main>
    )
  }

  return (
    <main className="orders-page">
      <div className="breadcrumb">
        <div className="container">
          <a href="/">Trang chủ</a>
          <span className="separator">/</span>
          <span className="current">Đơn hàng của tôi</span>
        </div>
      </div>

      <div className="orders-content">
        <div className="container">
          <div className="orders-header">
            <h1>Đơn hàng của tôi</h1>
            <p className="orders-count">
              {filteredOrders.length} đơn hàng {showDropdown && '(Dropdown đang mở)'}
            </p>
          </div>

          <div className="orders-filters">
            <div className="filter-dropdown">
              <button 
                className="dropdown-toggle"
                onClick={() => {
                  console.log('Toggle clicked, current state:', showDropdown)
                  setShowDropdown(!showDropdown)
                }}
              >
                <span>{getStatusText(filter)}</span>
                <svg 
                  width="20" 
                  height="20" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2"
                  style={{ transform: showDropdown ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}
                >
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </button>
              
              {showDropdown && (
                <div 
                  className="dropdown-menu" 
                  onClick={(e) => e.stopPropagation()}
                  style={{
                    display: 'block',
                    visibility: 'visible',
                    opacity: 1,
                    position: 'absolute',
                    zIndex: 9999
                  }}
                >
                  <button
                    className={`dropdown-item ${filter === 'all' ? 'active' : ''}`}
                    onClick={() => {
                      console.log('Setting filter to: all')
                      setFilter('all')
                      setShowDropdown(false)
                    }}
                  >
                    Tất cả trạng thái
                  </button>
                  <button
                    className={`dropdown-item ${filter === 'pending' ? 'active' : ''}`}
                    onClick={() => {
                      console.log('Setting filter to: pending')
                      setFilter('pending')
                      setShowDropdown(false)
                    }}
                  >
                    Chờ xác nhận
                  </button>
                  <button
                    className={`dropdown-item ${filter === 'processing' ? 'active' : ''}`}
                    onClick={() => {
                      console.log('Setting filter to: processing')
                      setFilter('processing')
                      setShowDropdown(false)
                    }}
                  >
                    Đang xử lý
                  </button>
                  <button
                    className={`dropdown-item ${filter === 'shipped' ? 'active' : ''}`}
                    onClick={() => {
                      console.log('Setting filter to: shipped')
                      setFilter('shipped')
                      setShowDropdown(false)
                    }}
                  >
                    Đang giao
                  </button>
                  <button
                    className={`dropdown-item ${filter === 'delivered' ? 'active' : ''}`}
                    onClick={() => {
                      console.log('Setting filter to: delivered')
                      setFilter('delivered')
                      setShowDropdown(false)
                    }}
                  >
                    Đã giao
                  </button>
                  <button
                    className={`dropdown-item ${filter === 'cancelled' ? 'active' : ''}`}
                    onClick={() => {
                      console.log('Setting filter to: cancelled')
                      setFilter('cancelled')
                      setShowDropdown(false)
                    }}
                  >
                    Đã hủy
                  </button>
                </div>
              )}
            </div>
          </div>

          {filteredOrders.length === 0 ? (
            <div className="empty-orders">
              <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
                <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
              </svg>
              <h3>Chưa có đơn hàng nào</h3>
              <p>
                {!localStorage.getItem('user') 
                  ? 'Vui lòng đăng nhập để xem đơn hàng của bạn. Đơn hàng đặt khi chưa đăng nhập sẽ được gửi qua email.'
                  : 'Bạn chưa có đơn hàng nào trong danh mục này'}
              </p>
              {!localStorage.getItem('user') ? (
                <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
                  <a href="/dang-nhap" className="btn-shop">Đăng nhập</a>
                  <a href="/" className="btn-shop">Mua sắm ngay</a>
                </div>
              ) : (
                <a href="/" className="btn-shop">Mua sắm ngay</a>
              )}
            </div>
          ) : (
            <div className="orders-list">
              {filteredOrders.map((order) => (
                <div key={order.id} className="order-card">
                  <div className="order-header">
                    <div className="order-info">
                      <span className="order-id">Đơn hàng #{order.id}</span>
                      <span className="order-date">{formatDate(order.createdAt)}</span>
                    </div>
                    <span className={getStatusClass(order.status)}>
                      {getStatusText(order.status)}
                    </span>
                  </div>

                  <div className="order-items">
                    {order.items && order.items.map((item, index) => (
                      <div key={index} className="order-item">
                        <div className="item-image">
                          {item.image ? (
                            <img src={item.image} alt={item.name} />
                          ) : (
                            <div className="placeholder-image">
                              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                                <circle cx="8.5" cy="8.5" r="1.5"></circle>
                                <polyline points="21 15 16 10 5 21"></polyline>
                              </svg>
                            </div>
                          )}
                        </div>
                        <div className="item-details">
                          <h4>{item.name || 'Sản phẩm'}</h4>
                          <p className="item-meta">
                            {item.size && <span>Size: {item.size}</span>}
                            {item.color && <span>Màu: {item.color}</span>}
                            <span>x{item.quantity}</span>
                          </p>
                        </div>
                        <div className="item-price">
                          {formatPrice(item.price * item.quantity)}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="order-footer">
                    <div className="order-shipping-info">
                      <div className="order-address">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                          <circle cx="12" cy="10" r="3"></circle>
                        </svg>
                        <span>
                          {order.shippingAddress?.address && `${order.shippingAddress.address}, `}
                          {order.shippingAddress?.ward}, {order.shippingAddress?.district}, {order.shippingAddress?.city}
                        </span>
                      </div>
                      <div className="order-payment-info">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
                          <line x1="1" y1="10" x2="23" y2="10"></line>
                        </svg>
                        <span>
                          {order.paymentMethod === 'COD' ? 'Thanh toán khi nhận hàng' : 
                           order.paymentMethod === 'PAYOS' ? 'Thanh toán online' : 
                           order.paymentMethod}
                        </span>
                        {order.paymentStatus === 'paid' && (
                          <span className="payment-status-badge paid">Đã thanh toán</span>
                        )}
                        {order.paymentStatus === 'pending' && (
                          <span className="payment-status-badge pending">Chưa thanh toán</span>
                        )}
                      </div>
                    </div>
                    <div className="order-total">
                      <span>Tổng cộng:</span>
                      <strong>{formatPrice(order.totalAmount)}</strong>
                    </div>
                  </div>

                  <div className="order-actions">
                    <button className="btn-detail" onClick={() => handleViewDetail(order)}>Xem chi tiết</button>
                    {order.status === 'pending' && (
                      <button className="btn-cancel">Hủy đơn</button>
                    )}
                    {order.status === 'delivered' && (
                      <button className="btn-reorder" onClick={() => handleReorder(order)}>Mua lại</button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Order Detail Modal */}
      {showDetailModal && selectedOrder && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Chi tiết đơn hàng #{selectedOrder.id}</h2>
              <button className="modal-close" onClick={handleCloseModal}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>

            <div className="modal-body">
              <div className="detail-section">
                <h3>Thông tin đơn hàng</h3>
                <div className="detail-row">
                  <span className="detail-label">Mã đơn hàng:</span>
                  <span className="detail-value">#{selectedOrder.id}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Ngày đặt:</span>
                  <span className="detail-value">{formatDate(selectedOrder.createdAt)}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Trạng thái:</span>
                  <span className={getStatusClass(selectedOrder.status)}>
                    {getStatusText(selectedOrder.status)}
                  </span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Thanh toán:</span>
                  <span className="detail-value">
                    {selectedOrder.paymentMethod === 'cod' ? 'Thanh toán khi nhận hàng' : 'Chuyển khoản'}
                  </span>
                </div>
              </div>

              <div className="detail-section">
                <h3>Thông tin người nhận</h3>
                <div className="detail-row">
                  <span className="detail-label">Họ tên:</span>
                  <span className="detail-value">{selectedOrder.shippingAddress?.fullName}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Số điện thoại:</span>
                  <span className="detail-value">{selectedOrder.shippingAddress?.phone}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Email:</span>
                  <span className="detail-value">{selectedOrder.shippingAddress?.email || 'Không có'}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Địa chỉ:</span>
                  <span className="detail-value">
                    {selectedOrder.shippingAddress?.street}, {selectedOrder.shippingAddress?.ward}, {selectedOrder.shippingAddress?.district}, {selectedOrder.shippingAddress?.city}
                  </span>
                </div>
              </div>

              <div className="detail-section">
                <h3>Sản phẩm</h3>
                <div className="detail-products">
                  {selectedOrder.items && selectedOrder.items.map((item, index) => (
                    <div key={index} className="detail-product-item">
                      <div className="detail-product-image">
                        {item.image ? (
                          <img src={item.image} alt={item.name} />
                        ) : (
                          <div className="placeholder-image">
                            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                              <circle cx="8.5" cy="8.5" r="1.5"></circle>
                              <polyline points="21 15 16 10 5 21"></polyline>
                            </svg>
                          </div>
                        )}
                      </div>
                      <div className="detail-product-info">
                        <h4>{item.name}</h4>
                        <p className="detail-product-meta">
                          {item.size && <span>Size: {item.size}</span>}
                          {item.color && <span>Màu: {item.color}</span>}
                        </p>
                        <p className="detail-product-quantity">Số lượng: {item.quantity}</p>
                      </div>
                      <div className="detail-product-price">
                        {formatPrice(item.price * item.quantity)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="detail-section detail-total">
                <div className="detail-row">
                  <span className="detail-label">Tạm tính:</span>
                  <span className="detail-value">{formatPrice(selectedOrder.totalAmount)}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Phí vận chuyển:</span>
                  <span className="detail-value">Miễn phí</span>
                </div>
                <div className="detail-row detail-row-total">
                  <span className="detail-label">Tổng cộng:</span>
                  <span className="detail-value">{formatPrice(selectedOrder.totalAmount)}</span>
                </div>
              </div>
            </div>

            <div className="modal-footer">
              {selectedOrder.status === 'pending' && (
                <button className="btn-cancel-order">Hủy đơn hàng</button>
              )}
              <button className="btn-close-modal" onClick={handleCloseModal}>Đóng</button>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}

export default Orders
