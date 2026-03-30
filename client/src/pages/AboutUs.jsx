import './AboutUs.css'

const AboutUs = () => {
  return (
    <main className="about-content">
      {/* Breadcrumb */}
      <div className="breadcrumb">
        <div className="container">
          <a href="/">Trang chủ</a>
          <span className="separator">/</span>
          <a href="/gioi-thieu">Giới thiệu</a>
          <span className="separator">/</span>
          <span className="current">Thời trang D'Chic Fashion</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="about-main">
        <div className="container">
          <div className="about-grid">
            {/* Left Sidebar */}
            <aside className="about-sidebar">
              <h3 className="sidebar-title">GIỚI THIỆU</h3>
              <nav className="sidebar-nav">
                <a href="#" className="sidebar-link active">Giới thiệu | Thời trang D'Chic Fashion</a>
                <a href="#" className="sidebar-link">Về chúng tôi</a>
              </nav>
              
              <div className="lookbook-sidebar">
                <h4>LOOKBOOK</h4>
              </div>
            </aside>

            {/* Main Content Area */}
            <div className="about-body">
              <div className="about-header">
                <h1 className="about-title">ĐÔI NÉT</h1>
                <p className="about-subtitle">Giới thiệu | Thời trang D'Chic Fashion — Về chúng tôi</p>
              </div>

              {/* Store Image */}
              <div className="store-image">
                <img 
                  src="/images/about-store.jpg" 
                  alt="D'Chic Fashion Store"
                  onError={(e) => {
                    e.target.style.display = 'none'
                    e.target.parentElement.classList.add('no-image')
                  }}
                />
              </div>

              {/* About Text */}
              <div className="about-text">
                <p>
                  Được thành lập từ năm 2016, với lý tưởng mang theo tinh thần D'Chic Fashion đã trở thành một thương hiệu thời trang công sở được 
                  các cô gái văn phòng trên toàn quốc ưa chuộng, lựa chọng thật kỹ mang tính ứng dụng cao, vừa lịch sự nơi công sở vừa năng động yêu đời 
                  của phụ nữ.
                </p>
              </div>

              {/* About Product Section */}
              <div className="about-section">
                <h2 className="section-heading">VỀ SẢN PHẨM</h2>
                <p>
                  D'Chic Fashion mang đến tuyệt hàng sản sản phẩm cao cấp với chất liệu phối hợp đặc sắc, xử dụng chất liệu cao cấp, công ty thành đặt 
                  may cẩn kỹ, xử lý phom dáng công phu giúp tôn dáng người dùng tuyệt vời nhất của khách hàng nữ nữ.
                </p>
                <p>
                  Việc thường xuyên cập nhật sản phẩm mới hàng tuần giúp cho khách hàng có nhiều sự lựa chọn những bộ trang phục đẹp tôn lên phụ 
                  hợp nhất mà không lo mạnh chán.
                </p>
              </div>

              {/* About Customer Section */}
              <div className="about-section">
                <h2 className="section-heading">VỀ KHÁCH HÀNG</h2>
                <p>
                  Chủ trương đặt khách hàng làm trung tâm, dịch vụ chăm sóc khách hàng, chất độ bảo hành, D'Chic Fashion luôn ưu tiên để trở thành người 
                  bạn thân thiết của khách hàng, lắng nghe mọi chia sẻ, vấn phản để lấy làm cho những sản phẩm tốt hơn khiến người mua hài 
                  lòng nhất.
                </p>
              </div>
            </div>

            {/* Right Sidebar - Showroom */}
            <aside className="lookbook-sidebar-right">
              <h4>SHOWROOM</h4>
            </aside>
          </div>
        </div>
      </div>
    </main>
  )
}

export default AboutUs
