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
                <text x="10" y="35" fontFamily="Arial, sans-serif" fontSize="28" fontWeight="bold" fill="#1e88e5">
                  MB
                </text>
                <text x="60" y="35" fontFamily="Arial, sans-serif" fontSize="20" fontWeight="bold" fill="#1a1a1a">
                  BANK
                </text>
                <circle cx="150" cy="22" r="8" fill="#1e88e5"/>
                <circle cx="170" cy="22" r="8" fill="#42a5f5"/>
                <circle cx="190" cy="22" r="8" fill="#64b5f6"/>
              </svg>
            </div>

            <div className="bank-details">
              <h2 className="company-name">D'Chic Fashion</h2>
              <p className="account-number">Số tài khoản: <strong>228824012004</strong></p>
              <p className="bank-name">Ngân hàng TMCP Quân đội (MB Bank) - Chi nhánh Hà Nội</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default AccountInfo
