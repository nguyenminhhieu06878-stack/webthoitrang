import { useNavigate } from 'react-router-dom'
import './PaymentSuccess.css'

const PaymentCancel = () => {
  const navigate = useNavigate()

  return (
    <div className="payment-result-page">
      <div className="payment-result-container">
        <div className="error-icon">
          <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="#f44336" strokeWidth="2">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="15" y1="9" x2="9" y2="15"></line>
            <line x1="9" y1="9" x2="15" y2="15"></line>
          </svg>
        </div>
        <h1>Thanh toán đã bị hủy</h1>
        <p>Bạn đã hủy giao dịch thanh toán</p>
        <p>Giỏ hàng của bạn vẫn được giữ nguyên</p>
        <div className="action-buttons">
          <button onClick={() => navigate('/thanh-toan')} className="btn-primary">
            Thử lại
          </button>
          <button onClick={() => navigate('/gio-hang')} className="btn-secondary">
            Về giỏ hàng
          </button>
        </div>
      </div>
    </div>
  )
}

export default PaymentCancel
