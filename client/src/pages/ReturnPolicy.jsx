import './ReturnPolicy.css'

const ReturnPolicy = () => {
  return (
    <main className="return-policy-page">
      {/* Breadcrumb */}
      <div className="breadcrumb">
        <div className="container">
          <a href="/">Trang chủ</a>
          <span className="separator">/</span>
          <span className="current">Quy định đổi hàng</span>
        </div>
      </div>

      {/* Content */}
      <div className="policy-content">
        <div className="container">
          <h1 className="policy-title">Quy định đổi hàng</h1>
          
          <div className="policy-text">
            <p>- Hàng hóa còn nguyên tem, mác, hóa đơn, không bị dơ bẩn, hư hỏng, chưa qua sử dụng hoặc giặt tẩy</p>
            
            <p>- Khách hàng có thể đến bất kì cửa hàng nào của D'Chic Fashion để đổi hàng</p>
            
            <p>- Khách hàng đổi online vui lòng gửi sản phẩm cần đổi kèm hóa đơn mua hàng về địa chỉ sau:</p>
            
            <div className="contact-info">
              <p>+ Người nhận: D'Chic Fashion – 024 3562 2626</p>
              <p>+ Địa chỉ: 41 Tràng Tiền, Hà Nội</p>
            </div>
            
            <p>- Chính sách phí vận chuyển khi đổi hàng:</p>
            
            <div className="shipping-policy">
              <p>+ Quý khách chịu phí vận chuyển chiều gửi hàng về cho D'Chic Fashion.</p>
              <p>+ Phí vận chuyển chiều gửi hàng đổi lại là D'Chic Fashion là 20.000đ. (Lưu ý: Phí này sẽ được miễn phí nếu quý khách có mua thêm sản phẩm mới trong đơn hàng đổi.)</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default ReturnPolicy
