import { useEffect, useState, useRef } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import './PaymentSuccess.css'

const PaymentSuccess = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [processing, setProcessing] = useState(true)
  const orderCode = searchParams.get('orderCode')
  const processingRef = useRef(false) // Use ref to prevent duplicate calls

  useEffect(() => {
    // Prevent duplicate processing using ref
    if (processingRef.current) {
      console.log('Already processing, skipping...')
      return
    }

    const processPayment = async () => {
      try {
        // Mark as processing immediately
        processingRef.current = true
        
        // Get pending order from localStorage
        const pendingOrder = localStorage.getItem('pendingOrder')
        
        if (!pendingOrder) {
          toast.error('Không tìm thấy thông tin đơn hàng')
          navigate('/gio-hang')
          return
        }

        const orderData = JSON.parse(pendingOrder)
        
        // Check if order already created
        const existingOrderCheck = localStorage.getItem(`order_created_${orderCode}`)
        if (existingOrderCheck) {
          console.log('Order already created, skipping...')
          localStorage.removeItem('cart')
          localStorage.removeItem('pendingOrder')
          window.dispatchEvent(new Event('cartUpdated'))
          setProcessing(false)
          return
        }
        
        // Verify payment with PayOS
        const paymentInfo = await fetch(`http://localhost:5001/api/payment/payment-info/${orderCode}`)
        const paymentResult = await paymentInfo.json()

        if (paymentResult.success && paymentResult.data.status === 'PAID') {
          // Mark order as being created
          localStorage.setItem(`order_created_${orderCode}`, 'true')
          
          // Create order in database
          const token = localStorage.getItem('token')
          const headers = {
            'Content-Type': 'application/json'
          }
          
          if (token) {
            headers['Authorization'] = `Bearer ${token}`
          }

          const response = await fetch('http://localhost:5001/api/orders', {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({
              ...orderData,
              paymentStatus: 'paid',
              transactionId: orderCode
            })
          })

          if (response.ok) {
            // Clear cart and pending order
            localStorage.removeItem('cart')
            localStorage.removeItem('pendingOrder')
            window.dispatchEvent(new Event('cartUpdated'))
            
            toast.success('Thanh toán thành công!')
            setProcessing(false)
          } else {
            // Remove the flag if order creation failed
            localStorage.removeItem(`order_created_${orderCode}`)
            processingRef.current = false
            throw new Error('Không thể tạo đơn hàng')
          }
        } else {
          processingRef.current = false
          throw new Error('Thanh toán chưa được xác nhận')
        }
      } catch (error) {
        console.error('Payment processing error:', error)
        toast.error('Có lỗi xảy ra khi xử lý thanh toán')
        processingRef.current = false
        navigate('/gio-hang')
      }
    }

    if (orderCode) {
      processPayment()
    }
  }, [orderCode, navigate])

  if (processing) {
    return (
      <div className="payment-result-page">
        <div className="payment-result-container">
          <div className="loading-spinner"></div>
          <h2>Đang xử lý thanh toán...</h2>
          <p>Vui lòng đợi trong giây lát</p>
        </div>
      </div>
    )
  }

  return (
    <div className="payment-result-page">
      <div className="payment-result-container">
        <div className="success-icon">
          <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="#4CAF50" strokeWidth="2">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>
        </div>
        <h1>Thanh toán thành công!</h1>
        <p>Cảm ơn bạn đã đặt hàng tại D'Chic Fashion</p>
        <p className="order-code">Mã đơn hàng: #{orderCode}</p>
        <div className="action-buttons">
          <button onClick={() => navigate('/don-hang')} className="btn-primary">
            Xem đơn hàng
          </button>
          <button onClick={() => navigate('/')} className="btn-secondary">
            Về trang chủ
          </button>
        </div>
      </div>
    </div>
  )
}

export default PaymentSuccess
