import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import './AdminSettings.css'

const AdminSettings = () => {
  const [settings, setSettings] = useState({
    siteName: 'D\'Chic Fashion',
    siteDescription: 'Thời trang công sở cao cấp',
    contactEmail: 'info@dchic.com',
    contactPhone: '0123456789',
    address: '123 Đường ABC, Quận 1, TP.HCM',
    facebookUrl: 'https://facebook.com/dchic',
    instagramUrl: 'https://instagram.com/dchic',
    shippingFee: 30000,
    freeShippingThreshold: 500000,
    returnDays: 7,
    exchangeDays: 7
  })
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState('general')

  const handleChange = (field, value) => {
    setSettings(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSave = async () => {
    setLoading(true)
    try {
      // Simulate API call - in real app, save to database
      await new Promise(resolve => setTimeout(resolve, 1000))
      toast.success('Cài đặt đã được lưu thành công!')
    } catch (error) {
      toast.error('Có lỗi xảy ra khi lưu cài đặt')
    } finally {
      setLoading(false)
    }
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price)
  }

  const tabs = [
    { id: 'general', label: 'Thông tin chung' },
    { id: 'contact', label: 'Liên hệ' },
    { id: 'social', label: 'Mạng xã hội' },
    { id: 'shipping', label: 'Vận chuyển' },
    { id: 'policy', label: 'Chính sách' }
  ]

  return (
    <div className="admin-settings">
      <div className="page-header">
        <h2>Cài đặt hệ thống</h2>
        <button 
          className="btn-primary" 
          onClick={handleSave}
          disabled={loading}
        >
          {loading ? 'Đang lưu...' : 'Lưu cài đặt'}
        </button>
      </div>

      <div className="settings-container">
        {/* Tabs */}
        <div className="settings-tabs">
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <span className="tab-label">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="settings-content">
          {/* General Settings */}
          {activeTab === 'general' && (
            <div className="settings-section">
              <h3>Thông tin chung</h3>
              <div className="form-grid">
                <div className="form-group">
                  <label>Tên website</label>
                  <input
                    type="text"
                    value={settings.siteName}
                    onChange={(e) => handleChange('siteName', e.target.value)}
                  />
                </div>
                <div className="form-group full-width">
                  <label>Mô tả website</label>
                  <textarea
                    value={settings.siteDescription}
                    onChange={(e) => handleChange('siteDescription', e.target.value)}
                    rows="3"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Contact Settings */}
          {activeTab === 'contact' && (
            <div className="settings-section">
              <h3>Thông tin liên hệ</h3>
              <div className="form-grid">
                <div className="form-group">
                  <label>Email liên hệ</label>
                  <input
                    type="email"
                    value={settings.contactEmail}
                    onChange={(e) => handleChange('contactEmail', e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Số điện thoại</label>
                  <input
                    type="tel"
                    value={settings.contactPhone}
                    onChange={(e) => handleChange('contactPhone', e.target.value)}
                  />
                </div>
                <div className="form-group full-width">
                  <label>Địa chỉ</label>
                  <textarea
                    value={settings.address}
                    onChange={(e) => handleChange('address', e.target.value)}
                    rows="3"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Social Media Settings */}
          {activeTab === 'social' && (
            <div className="settings-section">
              <h3>Mạng xã hội</h3>
              <div className="form-grid">
                <div className="form-group">
                  <label>Facebook URL</label>
                  <input
                    type="url"
                    value={settings.facebookUrl}
                    onChange={(e) => handleChange('facebookUrl', e.target.value)}
                    placeholder="https://facebook.com/yourpage"
                  />
                </div>
                <div className="form-group">
                  <label>Instagram URL</label>
                  <input
                    type="url"
                    value={settings.instagramUrl}
                    onChange={(e) => handleChange('instagramUrl', e.target.value)}
                    placeholder="https://instagram.com/yourpage"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Shipping Settings */}
          {activeTab === 'shipping' && (
            <div className="settings-section">
              <h3>Cài đặt vận chuyển</h3>
              <div className="form-grid">
                <div className="form-group">
                  <label>Phí vận chuyển</label>
                  <input
                    type="number"
                    value={settings.shippingFee}
                    onChange={(e) => handleChange('shippingFee', parseInt(e.target.value))}
                  />
                  <small>Hiện tại: {formatPrice(settings.shippingFee)}</small>
                </div>
                <div className="form-group">
                  <label>Miễn phí vận chuyển từ</label>
                  <input
                    type="number"
                    value={settings.freeShippingThreshold}
                    onChange={(e) => handleChange('freeShippingThreshold', parseInt(e.target.value))}
                  />
                  <small>Hiện tại: {formatPrice(settings.freeShippingThreshold)}</small>
                </div>
              </div>
            </div>
          )}

          {/* Policy Settings */}
          {activeTab === 'policy' && (
            <div className="settings-section">
              <h3>Chính sách</h3>
              <div className="form-grid">
                <div className="form-group">
                  <label>Thời gian đổi trả (ngày)</label>
                  <input
                    type="number"
                    value={settings.returnDays}
                    onChange={(e) => handleChange('returnDays', parseInt(e.target.value))}
                    min="1"
                    max="30"
                  />
                </div>
                <div className="form-group">
                  <label>Thời gian đổi hàng (ngày)</label>
                  <input
                    type="number"
                    value={settings.exchangeDays}
                    onChange={(e) => handleChange('exchangeDays', parseInt(e.target.value))}
                    min="1"
                    max="30"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* System Info */}
      <div className="system-info">
        <h3>Thông tin hệ thống</h3>
        <div className="info-grid">
          <div className="info-item">
            <span className="info-label">Phiên bản:</span>
            <span className="info-value">1.0.0</span>
          </div>
          <div className="info-item">
            <span className="info-label">Cơ sở dữ liệu:</span>
            <span className="info-value">SQLite</span>
          </div>
          <div className="info-item">
            <span className="info-label">Máy chủ:</span>
            <span className="info-value">Node.js + Express</span>
          </div>
          <div className="info-item">
            <span className="info-label">Frontend:</span>
            <span className="info-value">React + Vite</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminSettings