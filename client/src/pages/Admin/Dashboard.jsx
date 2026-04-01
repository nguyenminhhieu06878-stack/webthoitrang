import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import './Dashboard.css'

const Dashboard = () => {
  const navigate = useNavigate()
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    totalProducts: 0,
    totalUsers: 0
  })
  const [recentOrders, setRecentOrders] = useState([])
  const [revenueData, setRevenueData] = useState([])
  const [orderStatusData, setOrderStatusData] = useState([])
  const [topProductsData, setTopProductsData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    checkAdmin()
    fetchDashboardData()
  }, [])

  const checkAdmin = () => {
    const user = JSON.parse(localStorage.getItem('user'))
    if (!user || user.role !== 'admin') {
      navigate('/dang-nhap')
    }
  }

  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem('token')
      
      // Fetch orders
      const ordersRes = await fetch('http://localhost:5001/api/orders', {
        headers: { Authorization: `Bearer ${token}` }
      })
      const ordersData = await ordersRes.json()
      const orders = ordersData.orders || []
      
      // Fetch products
      const productsRes = await fetch('http://localhost:5001/api/products')
      const productsData = await productsRes.json()
      const products = productsData.products || []
      
      // Fetch users
      const usersRes = await fetch('http://localhost:5001/api/users', {
        headers: { Authorization: `Bearer ${token}` }
      })
      const usersData = await usersRes.json()
      const users = usersData.users || []
      
      // Calculate total revenue
      const totalRevenue = orders.reduce((sum, order) => sum + parseFloat(order.totalAmount), 0)
      
      // Calculate revenue by month (last 6 months)
      const monthlyRevenue = {}
      const now = new Date()
      for (let i = 5; i >= 0; i--) {
        const date = new Date(now.getFullYear(), now.getMonth() - i, 1)
        const monthKey = `T${date.getMonth() + 1}`
        monthlyRevenue[monthKey] = 0
      }
      
      orders.forEach(order => {
        const orderDate = new Date(order.createdAt)
        const monthKey = `T${orderDate.getMonth() + 1}`
        if (monthlyRevenue.hasOwnProperty(monthKey)) {
          monthlyRevenue[monthKey] += parseFloat(order.totalAmount)
        }
      })
      
      const revenueChartData = Object.keys(monthlyRevenue).map(month => ({
        month,
        revenue: monthlyRevenue[month]
      }))
      
      // Calculate order status distribution
      const statusCount = {
        pending: 0,
        processing: 0,
        shipped: 0,
        delivered: 0,
        cancelled: 0
      }
      
      orders.forEach(order => {
        if (statusCount.hasOwnProperty(order.status)) {
          statusCount[order.status]++
        }
      })
      
      const statusChartData = [
        { name: 'Chờ xác nhận', value: statusCount.pending, color: '#FFA500' },
        { name: 'Đang xử lý', value: statusCount.processing, color: '#4169E1' },
        { name: 'Đang giao', value: statusCount.shipped, color: '#9370DB' },
        { name: 'Đã giao', value: statusCount.delivered, color: '#32CD32' },
        { name: 'Đã hủy', value: statusCount.cancelled, color: '#DC143C' }
      ].filter(item => item.value > 0)
      
      // Calculate top selling products
      const productSales = {}
      orders.forEach(order => {
        if (order.items && Array.isArray(order.items)) {
          order.items.forEach(item => {
            const productName = item.productName || item.name || 'Unknown'
            if (!productSales[productName]) {
              productSales[productName] = 0
            }
            productSales[productName] += item.quantity || 1
          })
        }
      })
      
      const topProducts = Object.entries(productSales)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([name, sales]) => ({ name, sales }))
      
      // Update state
      setStats({
        totalOrders: orders.length,
        totalRevenue,
        totalProducts: products.length,
        totalUsers: users.length
      })
      
      setRevenueData(revenueChartData)
      setOrderStatusData(statusChartData)
      setTopProductsData(topProducts)
      setRecentOrders(orders.slice(0, 5))
    } catch (error) {
      console.error('Error fetching dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  // Sample data for charts
  // Removed - now using real data from state

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price)
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

  if (loading) {
    return <div className="admin-loading">Đang tải...</div>
  }

  return (
    <div className="admin-dashboard">
      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon revenue">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="12" y1="1" x2="12" y2="23"></line>
              <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
            </svg>
          </div>
          <div className="stat-content">
            <h3>Doanh thu</h3>
            <p className="stat-value">{formatPrice(stats.totalRevenue)}</p>
            <span className="stat-change positive">+12.5%</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon orders">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <path d="M16 10a4 4 0 0 1-8 0"></path>
            </svg>
          </div>
          <div className="stat-content">
            <h3>Đơn hàng</h3>
            <p className="stat-value">{stats.totalOrders}</p>
            <span className="stat-change positive">+8.2%</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon products">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
              <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
              <line x1="12" y1="22.08" x2="12" y2="12"></line>
            </svg>
          </div>
          <div className="stat-content">
            <h3>Sản phẩm</h3>
            <p className="stat-value">{stats.totalProducts}</p>
            <span className="stat-change">Tổng số</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon users">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            </svg>
          </div>
          <div className="stat-content">
            <h3>Khách hàng</h3>
            <p className="stat-value">{stats.totalUsers}</p>
            <span className="stat-change positive">+5.1%</span>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="charts-grid">
        {/* Revenue Chart */}
        <div className="chart-card">
          <h3>Doanh thu 6 tháng gần đây</h3>
          {revenueData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis dataKey="month" stroke="#666" />
                <YAxis stroke="#666" />
                <Tooltip 
                  formatter={(value) => formatPrice(value)}
                  contentStyle={{ background: '#fff', border: '1px solid #ddd' }}
                />
                <Legend />
                <Line type="monotone" dataKey="revenue" stroke="#000" strokeWidth={2} name="Doanh thu" />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div style={{ height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <p>Chưa có dữ liệu doanh thu</p>
            </div>
          )}
        </div>

        {/* Order Status Pie Chart */}
        <div className="chart-card">
          <h3>Trạng thái đơn hàng</h3>
          {orderStatusData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={orderStatusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {orderStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div style={{ height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <p>Chưa có đơn hàng</p>
            </div>
          )}
        </div>

        {/* Top Products Bar Chart */}
        <div className="chart-card full-width">
          <h3>Top 5 sản phẩm bán chạy</h3>
          {topProductsData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={topProductsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis dataKey="name" stroke="#666" />
                <YAxis stroke="#666" />
                <Tooltip contentStyle={{ background: '#fff', border: '1px solid #ddd' }} />
                <Legend />
                <Bar dataKey="sales" fill="#000" name="Số lượng bán" />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div style={{ height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <p>Chưa có dữ liệu bán hàng</p>
            </div>
          )}
        </div>
      </div>

      {/* Recent Orders Table */}
      <div className="recent-orders">
        <h3>Đơn hàng gần đây</h3>
        {recentOrders.length > 0 ? (
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Mã đơn</th>
                  <th>Khách hàng</th>
                  <th>Tổng tiền</th>
                  <th>Trạng thái</th>
                  <th>Ngày đặt</th>
                  <th>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => {
                  const status = getStatusBadge(order.status)
                  return (
                    <tr key={order.id}>
                      <td>#{order.id}</td>
                      <td>{order.shippingAddress?.fullName || 'Khách'}</td>
                      <td>{formatPrice(order.totalAmount)}</td>
                      <td>
                        <span className={`status-badge ${status.class}`}>
                          {status.text}
                        </span>
                      </td>
                      <td>{new Date(order.createdAt).toLocaleDateString('vi-VN')}</td>
                      <td>
                        <button className="btn-view" onClick={() => navigate('/admin/orders')}>Xem</button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <p style={{ textAlign: 'center', padding: '2rem' }}>Chưa có đơn hàng nào</p>
        )}
      </div>
    </div>
  )
}

export default Dashboard
