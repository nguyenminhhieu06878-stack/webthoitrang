import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import './AdminOrders.css'

const AdminOrders = () => {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [statusFilter, setStatusFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    fetchOrders()
  }, [])

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch('http://localhost:5001/api/orders', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      const data = await response.json()
      setOrders(data.orders || [])
    } catch (error) {
      console.error('Error fetching orders:', error)
      toast.error('Không thể tải danh sách đơn hàng')
    } finally {
      setLoading(false)
    }
  }

  const updateOrderStatus = async (orderId, status, paymentStatus = null) => {
    try {
      const token = localStorage.getItem('token')
      const updateData = { status }
      if (paymentStatus) updateData.paymentStatus = paymentStatus

      const response = await fetch(`http://localhost:5001/api/orders/${orderId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(updateData)
      })

      if (response.ok) {
        toast.success('Cập nhật trạng thái thành công!')
        fetchOrders()
        setShowModal(false)
      } else {
        toast.error('Có lỗi xảy ra')
      }
    } catch (error) {
      console.error('Error updating order:', error)
      toast.error('Có lỗi xảy ra')
    }
  }

  const getStatusBadge = (status) => {
    const statusMap = {
      pending: { text: 'Chờ xác nhận', class: 'status-pending' },
      processing: { text: 'Đang xử lý', class: 'status-processing' },
      shipped: { text: 'Đang giao', class: 'status-shipped' },
      delivered: { text: 'Đã giao', class: 'status-delivered' },
      cancelled: { text: 'Đã hủy', class: 'status-cancelled' }
    }
    return statusMap[status] || { text: status, class: '' }
  }

  const getPaymentStatusBadge = (status) => {
    const statusMap = {
      pending: { text: 'Chưa thanh toán', class: 'payment-pending' },
      paid: { text: 'Đã thanh toán', class: 'payment-paid' },
      failed: { text: 'Thất bại', class: 'payment-failed' }
    }
    return statusMap[status] || { text: status, class: '' }
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price)
  }

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const filteredOrders = orders.filter(order => {
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter
    const matchesSearch = order.id.toString().includes(searchTerm) ||
                         (order.shippingAddress?.fullName || '').toLowerCase().includes(searchTerm.toLowerCase())
    return matchesStatus && matchesSearch
  })

  const orderStats = {
    total: orders.length,
    pending: orders.filter(o => o.status === 'pending').length,
    processing: orders.filter(o => o.status === 'processing').length,
    shipped: orders.filter(o => o.status === 'shipped').length,
    delivered: orders.filter(o => o.status === 'delivered').length,
    cancelled: orders.filter(o => o.status === 'cancelled').length
  }

  if (loading) {
    return <div className="admin-loading">Đang tải...</div>
  }

  return (
    <div className="admin-orders">
      <div className="page-header">
        <h2>Quản lý đơn hàng</h2>
      </div>

      {/* Stats */}
      <div className="order-stats">
        <div className="stat-card">
          <div className="stat-number">{orderStats.total}</div>
          <div className="stat-label">Tổng đơn hàng</div>
        </div>
        <div className="stat-card pending">
          <div className="stat-number">{orderStats.pending}</div>
          <div className="stat-label">Chờ xác nhận</div>
        </div>
        <div className="stat-card processing">
          <div className="stat-number">{orderStats.processing}</div>
          <div className="stat-label">Đang xử lý</div>
        </div>
        <div className="stat-card shipped">
          <div className="stat-number">{orderStats.shipped}</div>
          <div className="stat-label">Đang giao</div>
        </div>
        <div className="stat-card delivered">
          <div className="stat-number">{orderStats.delivered}</div>
          <div className="stat-label">Đã giao</div>
        </div>
      </div>

      {/* Filters */}
      <div className="filters">
        <div className="search-box">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.35-4.35"></path>
          </svg>
          <input
            type="text"
            placeholder="Tìm kiếm theo mã đơn hàng hoặc tên khách hàng..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="status-filter"
        >
          <option value="all">Tất cả trạng thái</option>
          <option value="pending">Chờ xác nhận</option>
          <option value="processing">Đang xử lý</option>
          <option value="shipped">Đang giao</option>
          <option value="delivered">Đã giao</option>
          <option value="cancelled">Đã hủy</option>
        </select>
      </div>

      {/* Orders Table */}
      <div className="orders-table">
        <table>
          <thead>
            <tr>
              <th>Đơn hàng</th>
              <th>Khách hàng</th>
              <th>Tổng tiền</th>
              <th>Trạng thái</th>
              <th>Thanh toán</th>
              <th>Ngày đặt</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order) => {
              const status = getStatusBadge(order.status)
              const paymentStatus = getPaymentStatusBadge(order.paymentStatus)
              return (
                <tr key={order.id} className="order-row">
                  <td>
                    <div className="order-id">#{order.id}</div>
                  </td>
                  <td>
                    <div className="customer-info">
                      <div className="customer-name">
                        {order.shippingAddress?.fullName || 'Khách hàng'}
                      </div>
                      <div className="customer-phone">
                        {order.shippingAddress?.phone}
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="order-total">{formatPrice(order.totalAmount)}</div>
                  </td>
                  <td>
                    <span className={`status-badge ${status.class}`}>
                      {status.text}
                    </span>
                  </td>
                  <td>
                    <span className={`payment-badge ${paymentStatus.class}`}>
                      {paymentStatus.text}
                    </span>
                  </td>
                  <td>
                    <div className="order-date">{formatDate(order.createdAt)}</div>
                  </td>
                  <td>
                    <button 
                      className="btn-view"
                      onClick={() => {
                        setSelectedOrder(order)
                        setShowModal(true)
                      }}
                    >
                      Xem
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>

        {filteredOrders.length === 0 && (
          <div className="empty-state">
            <div className="empty-content">
              <div className="empty-icon">📦</div>
              <div className="empty-title">Không có đơn hàng nào</div>
              <div className="empty-description">
                {searchTerm || statusFilter !== 'all' 
                  ? 'Không tìm thấy đơn hàng phù hợp với bộ lọc'
                  : 'Chưa có đơn hàng nào được tạo'
                }
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Order Detail Modal */}
      {showModal && selectedOrder && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content large" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Chi tiết đơn hàng #{selectedOrder.id}</h3>
              <button className="modal-close" onClick={() => setShowModal(false)}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>

            <div className="modal-body">
              <div className="order-detail-grid">
                {/* Customer Info */}
                <div className="detail-section">
                  <h4>Thông tin khách hàng</h4>
                  <div className="info-grid">
                    <div>
                      <strong>Họ tên:</strong> {selectedOrder.shippingAddress?.fullName}
                    </div>
                    <div>
                      <strong>Điện thoại:</strong> {selectedOrder.shippingAddress?.phone}
                    </div>
                    <div>
                      <strong>Email:</strong> {selectedOrder.shippingAddress?.email}
                    </div>
                    <div>
                      <strong>Địa chỉ:</strong> {selectedOrder.shippingAddress?.address}, {selectedOrder.shippingAddress?.ward}, {selectedOrder.shippingAddress?.district}, {selectedOrder.shippingAddress?.city}
                    </div>
                  </div>
                </div>

                {/* Order Info */}
                <div className="detail-section">
                  <h4>Thông tin đơn hàng</h4>
                  <div className="info-grid">
                    <div>
                      <strong>Ngày đặt:</strong> {formatDate(selectedOrder.createdAt)}
                    </div>
                    <div>
                      <strong>Phương thức thanh toán:</strong> {selectedOrder.paymentMethod}
                    </div>
                    <div>
                      <strong>Trạng thái:</strong> 
                      <span className={`status-badge ${getStatusBadge(selectedOrder.status).class}`}>
                        {getStatusBadge(selectedOrder.status).text}
                      </span>
                    </div>
                    <div>
                      <strong>Thanh toán:</strong>
                      <span className={`payment-badge ${getPaymentStatusBadge(selectedOrder.paymentStatus).class}`}>
                        {getPaymentStatusBadge(selectedOrder.paymentStatus).text}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div className="detail-section">
                <h4>Sản phẩm đặt hàng</h4>
                <div className="order-items-detail">
                  {selectedOrder.items?.map((item, index) => (
                    <div key={index} className="item-row">
                      <div className="item-info">
                        <div className="item-name">{item.name}</div>
                        <div className="item-details">
                          Mã: {item.code} | Size: {item.size}
                        </div>
                      </div>
                      <div className="item-quantity">x{item.quantity}</div>
                      <div className="item-price">{formatPrice(item.price)}</div>
                      <div className="item-total">{formatPrice(item.price * item.quantity)}</div>
                    </div>
                  ))}
                  <div className="order-total-row">
                    <strong>Tổng cộng: {formatPrice(selectedOrder.totalAmount)}</strong>
                  </div>
                </div>
              </div>

              {/* Status Update */}
              <div className="detail-section">
                <h4>Cập nhật trạng thái</h4>
                <div className="status-actions">
                  {selectedOrder.status === 'pending' && (
                    <>
                      <button 
                        className="btn-status confirm"
                        onClick={() => updateOrderStatus(selectedOrder.id, 'processing')}
                      >
                        Xác nhận đơn hàng
                      </button>
                      <button 
                        className="btn-status cancel"
                        onClick={() => updateOrderStatus(selectedOrder.id, 'cancelled')}
                      >
                        Hủy đơn hàng
                      </button>
                    </>
                  )}
                  {selectedOrder.status === 'processing' && (
                    <button 
                      className="btn-status ship"
                      onClick={() => updateOrderStatus(selectedOrder.id, 'shipped')}
                    >
                      Giao hàng
                    </button>
                  )}
                  {selectedOrder.status === 'shipped' && (
                    <button 
                      className="btn-status deliver"
                      onClick={() => updateOrderStatus(selectedOrder.id, 'delivered', 'paid')}
                    >
                      Hoàn thành
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminOrders