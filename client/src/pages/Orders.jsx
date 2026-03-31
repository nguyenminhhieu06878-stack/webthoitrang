import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'
import './Orders.css'

const Orders = () => {
  const navigate = useNavigate()
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all') // all, pending, processing, shipped, delivered, cancelled

  useEffect(() => {
    fetchOrders()
  }, [])

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
              {filteredOrders.length} đơn hàng
            </p>
          </div>

          <div className="orders-filters">
            <button
              className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
              onClick={() => setFilter('all')}
            >
              Tất cả
            </button>
            <button
              className={`filter-btn ${filter === 'pending' ? 'active' : ''}`}
              onClick={() => setFilter('pending')}
            >
              Chờ xác nhận
            </button>
            <button
              className={`filter-btn ${filter === 'processing' ? 'active' : ''}`}
              onClick={() => setFilter('processing')}
            >
              Đang xử lý
            </button>
            <button
              className={`filter-btn ${filter === 'shipped' ? 'active' : ''}`}
              onClick={() => setFilter('shipped')}
            >
              Đang giao
            </button>
            <button
              className={`filter-btn ${filter === 'delivered' ? 'active' : ''}`}
              onClick={() => setFilter('delivered')}
            >
              Đã giao
            </button>
            <button
              className={`filter-btn ${filter === 'cancelled' ? 'active' : ''}`}
              onClick={() => setFilter('cancelled')}
            >
              Đã hủy
            </button>
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
                    <div className="order-address">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                        <circle cx="12" cy="10" r="3"></circle>
                      </svg>
                      <span>
                        {order.shippingAddress?.street}, {order.shippingAddress?.ward}, {order.shippingAddress?.district}, {order.shippingAddress?.city}
                      </span>
                    </div>
                    <div className="order-total">
                      <span>Tổng cộng:</span>
                      <strong>{formatPrice(order.totalAmount)}</strong>
                    </div>
                  </div>

                  <div className="order-actions">
                    <button className="btn-detail">Xem chi tiết</button>
                    {order.status === 'pending' && (
                      <button className="btn-cancel">Hủy đơn</button>
                    )}
                    {order.status === 'delivered' && (
                      <button className="btn-reorder">Mua lại</button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  )
}

export default Orders
