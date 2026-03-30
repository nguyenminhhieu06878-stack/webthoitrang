import './CollectionHighlight.css'

const CollectionHighlight = () => {
  return (
    <section className="collection-highlight">
      <div className="container">
        <div className="collection-content">
          {/* Left Side - Image */}
          <div className="collection-image-side">
            <div className="collection-logo">
              <span className="logo-text">D'CHIC</span>
            </div>
            <div className="collection-image-wrapper">
              <img 
                src="/images/collection-moc-nguyen.jpg" 
                alt="Mộc Nguyên Collection"
                className="collection-main-image"
                onError={(e) => {
                  e.target.style.display = 'none'
                  e.target.parentElement.classList.add('no-image')
                }}
              />
              <div className="collection-image-text">
                <p className="collection-season">NEW COLLECTION | FALL 2026</p>
                <h2 className="collection-name-overlay">Mộc Nguyên</h2>
              </div>
            </div>
          </div>

          {/* Right Side - Description */}
          <div className="collection-text-side">
            <h2 className="collection-title">MỘC NGUYÊN</h2>
            <div className="collection-description">
              <p>
                Giữa không gian đồng cỏ xanh mướt, nơi gió hé đưa về nên 
                những đường nét mềm mại nhưng đầy bản lĩnh, D&K Fashion 
                tự hào ra mắt bộ sưu tập mang tên "Mộc Nguyên". "Mộc 
                Nguyên" không chỉ là những thiết kế, mà là luyến ngợi về 
                người phụ nữ hiện đại – mạnh mẽ, độc lập và luôn tự tin theo 
                đuổi riêng của mình. Từ những nét khảng trang giữa thiên 
                nhiên bao la, mỗi thiết kế khắc dấu lên vẻ đẹp nguyên 
                bản và kỳ diệu kiêu hãnh.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CollectionHighlight
