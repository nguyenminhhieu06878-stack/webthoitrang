import './AccountInfo.css'

const AccountInfo = () => {
  return (
    <main className="account-info-page">
      {/* Breadcrumb */}
      <div className="breadcrumb">
        <div className="container">
          <a href="/">Trang chủ</a>
          <span className="separator">/</span>
          <span className="current">Thông tin tài khoản</span>
        </div>
      </div>

      {/* Content */}
      <div className="account-content">
        <div className="container">
          <h1 className="account-title">Thông tin tài khoản</h1>
          
          <p className="account-intro">Quý khách có thể chuyển khoản vào tài khoản sau:</p>

          <div className="bank-info">
            <div className="bank-logo">
              <svg viewBox="0 0 200 60" xmlns="http://www.w3.org/2000/svg">
                <text x="10" y="35" fontFamily="Arial, sans-serif" fontSize="24" fontWeight="bold" fill="#e31e24">
                  TECHCOM
                </text>
                <text x="130" y="35" fontFamily="Arial, sans-serif" fontSize="24" fontWeight="bold" fill="#1a1a1a">
                  BANK
                </text>
                <rect x="175" y="15" width="15" height="15" fill="#e31e24" transform="rotate(45 182.5 22.5)"/>
                <rect x="185" y="15" width="15" height="15" fill="#e31e24" transform="rotate(45 192.5 22.5)"/>
              </svg>
            </div>

            <div className="bank-details">
              <h2 className="company-name">Công Ty TNHH Thời Trang Khang Khôi</h2>
              <p className="account-number">Số tài khoản: <strong>478888</strong></p>
              <p className="bank-name">Ngân hàng Techcombank - Ngân hàng Thương mại Cổ phần Kỹ thương Việt Nam</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default AccountInfo
