import { useRef } from 'react'
import './BestSellers.css'

const BestSellers = () => {
  const sliderRef = useRef(null)

  const bestSellers = [
    { id: 1, code: 'KK186-02', name: 'Đầm chữ A họa tiết hoa cổ thuyền lệch nhún vai', price: 590000, image: '/images/bestseller-1.jpg' },
    { id: 2, code: 'KK184-23', name: 'Đầm ren kem dự tiệc dáng xòe', price: 600000, image: '/images/bestseller-2.jpg' },
    { id: 3, code: 'HL34-08', name: 'Đầm công sở dáng xòe lửa sọc xanh cổ V', price: 550000, image: '/images/bestseller-3.jpg' },
    { id: 4, code: 'ASM30-08', name: 'Áo ren cotton kiểu peplum màu kem', price: 300000, image: '/images/bestseller-4.jpg' },
    { id: 5, code: 'KK182-25', name: 'Đầm xanh hoa xanh dáng xòe chữ A tay lỡng', price: 530000, image: '/images/bestseller-5.jpg' },
    { id: 6, code: 'KK184-29', name: 'Đầm xòe tơ thuần cổ trơn chữ A lơ lửng sáng', price: 600000, image: '/images/bestseller-6.jpg' }
  ]

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN').format(price) + ' đ'
  }

  const scroll = (direction) => {
    const container = sliderRef.current
    const scrollAmount = 300
    if (direction === 'left') {
      container.scrollLeft -= scrollAmount
    } else {
      container.scrollLeft += scrollAmount
    }
  }

  return (
    <section className="best-sellers">
      <div className="container">
        <h2 className="best-sellers-title">SẢN PHẨM BÁN CHẠY NHẤT</h2>

        <div className="best-sellers-slider-wrapper">
          <button className="slider-nav-btn left" onClick={() => scroll('left')}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>

          <div className="best-sellers-slider" ref={sliderRef}>
            {bestSellers.map((product) => (
              <div key={product.id} className="bestseller-card">
                <a href={`/product/${product.code}`} className="bestseller-link">
                  <div className="bestseller-image">
                    <div className="bestseller-image-placeholder">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        onError={(e) => {
                          e.target.style.display = 'none'
                          e.target.parentElement.classList.add('no-image')
                        }}
                      />
                    </div>
                  </div>
                  <div className="bestseller-info">
                    <p className="bestseller-code">{product.code}</p>
                    <h3 className="bestseller-name">{product.name}</h3>
                    <p className="bestseller-price">{formatPrice(product.price)}</p>
                  </div>
                </a>
              </div>
            ))}
          </div>

          <button className="slider-nav-btn right" onClick={() => scroll('right')}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </div>

        {/* Description Text */}
        <div className="best-sellers-description">
          <p>
            Chúng có những nữ tính, nào có thể cường lợi sức hút của những items mới, nức nở và duyên dáng, chính vì vậy <strong>D'Chic Fashion</strong> luôn đầu đơn bổ sung bộ sưu tập mới và danh mục sản phẩm của mình mỗi tháng để mang cả thật nhiều lựa chọn điện đẹp mới ngày.
          </p>
          <p>
            Không chỉ giới hạn ở vấy đầm công sở, các nàng luôn có thể tìm được những items đi chơi, dạo phố, đi học thật hợp chân mỗi lần đến D'Chic Fashion. Từ những thiết kế tối giản đến những trang phục, mang hẳn sẽ bổi ngộ trước các mẫu mã trang phục mà D'Chic Fashion mang đến, "hô biến" từng cô nàng trở nên thật hợp chân và thời trang và vẫn có kiện. Đến với D'Chic Fashion, mang hẳn sẽ bổi ngộ trước các mẫu mã trang phục mà chúng tôi cho về ngoại của mình đây!
          </p>
        </div>
      </div>
    </section>
  )
}

export default BestSellers
