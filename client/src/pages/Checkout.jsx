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

  // Dữ liệu địa chỉ
  const addressData = {
    hanoi: {
      name: 'Hà Nội',
      districts: {
        hoankiem: { name: 'Hoàn Kiếm', wards: ['Hàng Bạc', 'Hàng Bồ', 'Hàng Buồm', 'Hàng Đào', 'Hàng Gai', 'Tràng Tiền', 'Cửa Đông', 'Lý Thái Tổ', 'Phan Chu Trinh'] },
        dongda: { name: 'Đống Đa', wards: ['Cát Linh', 'Văn Miếu', 'Quốc Tử Giám', 'Láng Thượng', 'Ô Chợ Dừa', 'Văn Chương', 'Quang Trung', 'Nguyễn Trãi', 'Khâm Thiên'] },
        badinh: { name: 'Ba Đình', wards: ['Phúc Xá', 'Trúc Bạch', 'Vĩnh Phúc', 'Cống Vị', 'Liễu Giai', 'Nguyễn Trung Trực', 'Quán Thánh', 'Ngọc Hà', 'Điện Biên'] },
        cagiay: { name: 'Cầu Giấy', wards: ['Nghĩa Đô', 'Nghĩa Tân', 'Mai Dịch', 'Dịch Vọng', 'Quan Hoa', 'Yên Hòa', 'Trung Hòa', 'Dịch Vọng Hậu'] },
        haibatrung: { name: 'Hai Bà Trưng', wards: ['Bạch Đằng', 'Đồng Nhân', 'Phố Huế', 'Đống Mác', 'Thanh Lương', 'Thanh Nhàn', 'Cầu Dền', 'Bách Khoa', 'Đồng Tâm'] },
        thanxuan: { name: 'Thanh Xuân', wards: ['Nhân Chính', 'Thượng Đình', 'Khương Trung', 'Khương Mai', 'Thanh Xuân Bắc', 'Thanh Xuân Nam', 'Kim Giang', 'Hạ Đình'] },
        tayho: { name: 'Tây Hồ', wards: ['Phú Thượng', 'Nhật Tân', 'Tứ Liên', 'Quảng An', 'Xuân La', 'Yên Phụ', 'Bưởi', 'Thụy Khuê'] },
        longbien: { name: 'Long Biên', wards: ['Thượng Thanh', 'Ngọc Thụy', 'Giang Biên', 'Đức Giang', 'Việt Hưng', 'Gia Thụy', 'Ngọc Lâm', 'Phúc Lợi'] },
        namtuLiem: { name: 'Nam Từ Liêm', wards: ['Cầu Diễn', 'Xuân Phương', 'Phương Canh', 'Mỹ Đình 1', 'Mỹ Đình 2', 'Tây Mỗ', 'Mễ Trì', 'Phú Đô'] },
        bactuLiem: { name: 'Bắc Từ Liêm', wards: ['Thượng Cát', 'Liên Mạc', 'Đông Ngạc', 'Đức Thắng', 'Thụy Phương', 'Tây Tựu', 'Xuân Đỉnh', 'Cổ Nhuế 1'] },
        hadong: { name: 'Hà Đông', wards: ['Nguyễn Trãi', 'Mộ Lao', 'Văn Quán', 'Vũ Phạm Hàm', 'Yết Kiêu', 'Quang Trung', 'La Khê', 'Phú La'] },
        hoangmai: { name: 'Hoàng Mai', wards: ['Hoàng Văn Thụ', 'Giáp Bát', 'Lĩnh Nam', 'Thịnh Liệt', 'Trần Phú', 'Hoàng Liệt', 'Yên Sở', 'Tân Mai'] }
      }
    },
    hcm: {
      name: 'TP. Hồ Chí Minh',
      districts: {
        quan1: { name: 'Quận 1', wards: ['Bến Nghé', 'Bến Thành', 'Cầu Kho', 'Cầu Ông Lãnh', 'Đa Kao', 'Nguyễn Thái Bình', 'Phạm Ngũ Lão', 'Cô Giang', 'Nguyễn Cư Trinh', 'Tân Định'] },
        quan3: { name: 'Quận 3', wards: ['Võ Thị Sáu', 'Phường 1', 'Phường 2', 'Phường 3', 'Phường 4', 'Phường 5', 'Phường 6', 'Phường 7', 'Phường 8', 'Phường 9'] },
        quan5: { name: 'Quận 5', wards: ['Phường 1', 'Phường 2', 'Phường 3', 'Phường 4', 'Phường 5', 'Phường 6', 'Phường 7', 'Phường 8', 'Phường 9', 'Phường 10'] },
        quan7: { name: 'Quận 7', wards: ['Tân Thuận Đông', 'Tân Thuận Tây', 'Tân Kiểng', 'Tân Hưng', 'Bình Thuận', 'Tân Quy', 'Phú Thuận', 'Tân Phú', 'Tân Phong', 'Phú Mỹ'] },
        quan10: { name: 'Quận 10', wards: ['Phường 1', 'Phường 2', 'Phường 3', 'Phường 4', 'Phường 5', 'Phường 6', 'Phường 7', 'Phường 8', 'Phường 9', 'Phường 10'] },
        tanbinh: { name: 'Tân Bình', wards: ['Phường 1', 'Phường 2', 'Phường 3', 'Phường 4', 'Phường 5', 'Phường 6', 'Phường 7', 'Phường 8', 'Phường 9', 'Phường 10'] },
        binhThanh: { name: 'Bình Thạnh', wards: ['Phường 1', 'Phường 2', 'Phường 3', 'Phường 5', 'Phường 6', 'Phường 7', 'Phường 11', 'Phường 12', 'Phường 13', 'Phường 14'] },
        phuNhuan: { name: 'Phú Nhuận', wards: ['Phường 1', 'Phường 2', 'Phường 3', 'Phường 4', 'Phường 5', 'Phường 7', 'Phường 8', 'Phường 9', 'Phường 10', 'Phường 11'] },
        govap: { name: 'Gò Vấp', wards: ['Phường 1', 'Phường 3', 'Phường 4', 'Phường 5', 'Phường 6', 'Phường 7', 'Phường 8', 'Phường 9', 'Phường 10', 'Phường 11'] },
        thuduc: { name: 'Thủ Đức', wards: ['Linh Xuân', 'Bình Chiểu', 'Linh Trung', 'Tam Bình', 'Tam Phú', 'Hiệp Bình Phước', 'Hiệp Bình Chánh', 'Linh Chiểu', 'Linh Tây', 'Linh Đông'] },
        quan2: { name: 'Quận 2', wards: ['Thảo Điền', 'An Phú', 'Bình An', 'Bình Trưng Đông', 'Bình Trưng Tây', 'Bình Khánh', 'An Khánh', 'Cát Lái', 'Thạnh Mỹ Lợi', 'An Lợi Đông'] },
        quan4: { name: 'Quận 4', wards: ['Phường 1', 'Phường 2', 'Phường 3', 'Phường 4', 'Phường 5', 'Phường 6', 'Phường 8', 'Phường 9', 'Phường 10', 'Phường 13'] }
      }
    },
    danang: {
      name: 'Đà Nẵng',
      districts: {
        haichau: { name: 'Hải Châu', wards: ['Thanh Bình', 'Thạch Thang', 'Hải Châu 1', 'Hải Châu 2', 'Phước Ninh', 'Hòa Thuận Tây', 'Hòa Thuận Đông', 'Nam Dương', 'Bình Hiên', 'Hòa Cường Bắc'] },
        thankhue: { name: 'Thanh Khê', wards: ['Tam Thuận', 'Thanh Khê Tây', 'Thanh Khê Đông', 'Xuân Hà', 'Tân Chính', 'Chính Gián', 'Vĩnh Trung', 'Thạc Gián', 'An Khê', 'Hòa Khê'] },
        sontra: { name: 'Sơn Trà', wards: ['Thọ Quang', 'Nại Hiên Đông', 'Mân Thái', 'An Hải Bắc', 'Phước Mỹ', 'An Hải Đông', 'An Hải Tây', 'Phước Ninh'] },
        nguhanh: { name: 'Ngũ Hành Sơn', wards: ['Mỹ An', 'Khuê Mỹ', 'Hòa Quý', 'Hòa Hải'] },
        camle: { name: 'Cẩm Lệ', wards: ['Khuê Trung', 'Hòa Phát', 'Hòa An', 'Hòa Thọ Tây', 'Hòa Thọ Đông'] },
        lienChieu: { name: 'Liên Chiểu', wards: ['Hòa Hiệp Bắc', 'Hòa Hiệp Nam', 'Hòa Khánh Bắc', 'Hòa Khánh Nam', 'Hòa Minh'] }
      }
    },
    haiphong: {
      name: 'Hải Phòng',
      districts: {
        honggai: { name: 'Hồng Bàng', wards: ['Quán Toan', 'Hùng Vương', 'Sở Dầu', 'Thượng Lý', 'Hạ Lý', 'Minh Khai', 'Trại Chuối', 'Hoàng Văn Thụ', 'Phan Bội Châu'] },
        ngoQuyen: { name: 'Ngô Quyền', wards: ['Máy Chai', 'Máy Tơ', 'Vạn Mỹ', 'Cầu Tre', 'Lạc Viên', 'Gia Viên', 'Đông Khê', 'Cầu Đất', 'Lê Lợi'] },
        leChau: { name: 'Lê Chân', wards: ['Cát Dài', 'An Biên', 'Lam Sơn', 'An Dương', 'Trần Nguyên Hãn', 'Hồ Nam', 'Trại Cau', 'Dư Hàng', 'Hàng Kênh'] },
        haian: { name: 'Hải An', wards: ['Đông Hải 1', 'Đông Hải 2', 'Đằng Lâm', 'Thành Tô', 'Đằng Hải', 'Nam Hải', 'Cát Bi', 'Tràng Cát'] },
        kienAn: { name: 'Kiến An', wards: ['Quán Trữ', 'Lãm Hà', 'Đồng Hoà', 'Bắc Sơn', 'Nam Sơn', 'Ngọc Sơn', 'Trần Thành Ngọ', 'Văn Đẩu'] },
        duongKinh: { name: 'Dương Kinh', wards: ['Hòa Nghĩa', 'Đa Phúc', 'Hưng Đạo', 'Anh Dũng', 'Hải Thành', 'Tân Thành'] }
      }
    },
    cantho: {
      name: 'Cần Thơ',
      districts: {
        ninhKieu: { name: 'Ninh Kiều', wards: ['Cái Khế', 'An Hòa', 'Thới Bình', 'An Nghiệp', 'An Cư', 'An Phú', 'Xuân Khánh', 'Hưng Lợi', 'An Khánh', 'An Bình'] },
        caiRang: { name: 'Cái Răng', wards: ['Lê Bình', 'Hưng Phú', 'Hưng Thạnh', 'Ba Láng', 'Thường Thạnh', 'Phú Thứ', 'Tân Phú'] },
        binhThuy: { name: 'Bình Thuỷ', wards: ['Bình Thủy', 'Trà An', 'Trà Nóc', 'Thới An Đông', 'An Thới', 'Bùi Hữu Nghĩa', 'Long Hòa', 'Long Tuyền'] },
        oMon: { name: 'Ô Môn', wards: ['Châu Văn Liêm', 'Thới Hòa', 'Thới Long', 'Long Hưng', 'Thới An', 'Phước Thới', 'Trường Lạc'] },
        thotNot: { name: 'Thốt Nốt', wards: ['Thốt Nốt', 'Thới Thuận', 'Thuận An', 'Tân Lộc', 'Trung Nhứt', 'Thạnh Hoà', 'Trung Kiên', 'Thuận Hưng', 'Tân Hưng'] }
      }
    },
    binhduong: {
      name: 'Bình Dương',
      districts: {
        thuDauMot: { name: 'Thủ Dầu Một', wards: ['Hiệp Thành', 'Phú Lợi', 'Phú Cường', 'Phú Hòa', 'Phú Thọ', 'Chánh Nghĩa', 'Định Hoà', 'Hoà Phú', 'Phú Mỹ', 'Phú Tân'] },
        diAn: { name: 'Dĩ An', wards: ['Dĩ An', 'Tân Bình', 'Tân Đông Hiệp', 'Bình An', 'Bình Thắng', 'Đông Hòa', 'An Bình'] },
        thuanAn: { name: 'Thuận An', wards: ['An Thạnh', 'Lái Thiêu', 'Bình Chuẩn', 'Thuận Giao', 'An Phú', 'Hưng Định', 'Bình Nhâm', 'Bình Hòa'] },
        benCat: { name: 'Bến Cát', wards: ['Mỹ Phước', 'Chánh Phú Hòa', 'An Điền', 'An Tây', 'Thới Hòa', 'Hòa Lợi', 'Tân Định'] },
        tanUyen: { name: 'Tân Uyên', wards: ['Uyên Hưng', 'Tân Phước Khánh', 'Vĩnh Tân', 'Hội Nghĩa', 'Tân Hiệp', 'Khánh Bình', 'Phú Chánh', 'Bạch Đằng', 'Tân Vĩnh Hiệp', 'Thạnh Phước'] }
      }
    },
    dongnai: {
      name: 'Đồng Nai',
      districts: {
        bienHoa: { name: 'Biên Hòa', wards: ['Trảng Dài', 'Tân Phong', 'Tân Biên', 'Hố Nai', 'Tân Hòa', 'Tân Hiệp', 'Bửu Long', 'Tân Tiến', 'Thống Nhất', 'Trung Dũng'] },
        longKhanh: { name: 'Long Khánh', wards: ['Xuân An', 'Xuân Hoà', 'Xuân Thanh', 'Xuân Bình', 'Xuân Trung', 'Xuân Tân', 'Bảo Vinh', 'Bình Lộc', 'Hàng Gòn'] },
        longThanh: { name: 'Long Thành', wards: ['Long Thành', 'An Phước', 'Bình An', 'Bình Sơn', 'Cẩm Đường', 'Long Đức', 'Long Phước', 'Phước Bình', 'Phước Thái', 'Tam An'] },
        nhoTrang: { name: 'Nhơn Trạch', wards: ['Phước An', 'Long Tân', 'Đại Phước', 'Hiệp Phước', 'Long Thọ', 'Phú Hội', 'Phú Hữu', 'Phú Đông', 'Vĩnh Thanh'] },
        tranhBom: { name: 'Trảng Bom', wards: ['Trảng Bom', 'Thanh Bình', 'Cây Gáo', 'Bàu Hàm', 'Sông Thao', 'Đồi 61', 'Hố Nai 3', 'Quảng Tiến', 'Bình Minh'] }
      }
    }
  }

  const [availableDistricts, setAvailableDistricts] = useState([])
  const [availableWards, setAvailableWards] = useState([])

  // Cập nhật quận/huyện khi chọn tỉnh/thành phố
  useEffect(() => {
    if (formData.city && addressData[formData.city]) {
      const districts = Object.entries(addressData[formData.city].districts).map(([key, value]) => ({
        value: key,
        label: value.name
      }))
      setAvailableDistricts(districts)
      setFormData(prev => ({ ...prev, district: '', ward: '' }))
      setAvailableWards([])
    } else {
      setAvailableDistricts([])
      setAvailableWards([])
    }
  }, [formData.city])

  // Cập nhật phường/xã khi chọn quận/huyện
  useEffect(() => {
    if (formData.city && formData.district && addressData[formData.city]?.districts[formData.district]) {
      const wards = addressData[formData.city].districts[formData.district].wards
      setAvailableWards(wards)
      setFormData(prev => ({ ...prev, ward: '' }))
    } else {
      setAvailableWards([])
    }
  }, [formData.district])

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
      }

      // If payment method is PAYOS, create payment link first
      if (formData.paymentMethod === 'PAYOS') {
        const orderCode = Date.now(); // Generate unique order code
        
        const paymentData = {
          orderCode: orderCode,
          amount: calculateTotal(),
          description: `DH #${orderCode}`,
          items: cartItems.map(item => ({
            name: item.name,
            quantity: item.quantity,
            price: item.price
          })),
          buyerName: formData.fullName,
          buyerEmail: formData.email || 'customer@dchicfashion.vn',
          buyerPhone: formData.phone,
          returnUrl: `http://localhost:3000/payment-success?orderCode=${orderCode}`,
          cancelUrl: `http://localhost:3000/payment-cancel`
        };

        const paymentResponse = await fetch('http://localhost:5001/api/payment/create-payment-link', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(paymentData)
        });

        const paymentResult = await paymentResponse.json();

        if (paymentResult.success) {
          // Save order data to localStorage for later
          localStorage.setItem('pendingOrder', JSON.stringify({
            ...orderData,
            orderCode: orderCode
          }));
          
          // Redirect to PayOS payment page
          window.location.href = paymentResult.checkoutUrl;
          return;
        } else {
          toast.error('Không thể tạo link thanh toán');
          return;
        }
      }

      // For COD and other payment methods, create order directly
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
              Bạn đã có tài khoản? <a href="/dang-nhap">Đăng nhập</a>
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
                  {Object.entries(addressData).map(([key, value]) => (
                    <option key={key} value={key}>
                      {value.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Quận / Huyện</label>
                <select
                  name="district"
                  value={formData.district}
                  onChange={handleInputChange}
                  disabled={!formData.city}
                >
                  <option value="">Chọn Quận / Huyện</option>
                  {availableDistricts.map(district => (
                    <option key={district.value} value={district.value}>
                      {district.label}
                    </option>
                  ))}
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
                  disabled={!formData.district}
                >
                  <option value="">Chọn Phường / Xã</option>
                  {availableWards.map((ward, index) => (
                    <option key={index} value={ward}>
                      {ward}
                    </option>
                  ))}
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
              <label>Email (tùy chọn)</label>
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
                  <p>Nhân viên D'Chic Fashion sẽ liên hệ với bạn để xác nhận đơn hàng.</p>
                </label>
              </div>

              <div className="payment-option">
                <input
                  type="radio"
                  id="payos"
                  name="paymentMethod"
                  value="PAYOS"
                  checked={formData.paymentMethod === 'PAYOS'}
                  onChange={handleInputChange}
                />
                <label htmlFor="payos">
                  <strong>Thanh toán online qua PayOS</strong>
                  <p>Thanh toán qua QR Code, Ví điện tử, Thẻ ATM/Visa/Master</p>
                </label>
              </div>
            </div>

            <button type="submit" className="btn-submit-order">
              Hoàn tất đặt hàng
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Checkout
