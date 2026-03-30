import { useState } from 'react'
import React from 'react'
import './BlogPage.css'

const BlogPage = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const postsPerPage = 9

  const blogPosts = [
    {
      id: 1,
      title: 'D\'Chic Fashion Ra Mắt BST Tháng 3 "Mộc Nguyên" – Vẻ Đẹp Mộc Mạc Cho Mỗi Khởi Đầu Mới!',
      excerpt: 'Ra mắt vào tháng 3 – tháng của yêu thương và tôn vinh phái đẹp – "Mộc Nguyên" như một lời chào dịu dàng gửi đến những người phụ nữ...',
      image: '/images/blog-moc-nguyen.jpg',
      logo: 'D\'CHIC',
      overlayTitle: 'Mộc Nguyên',
      link: '/blog/moc-nguyen'
    },
    {
      id: 2,
      title: '"QUÀ TẾT TRAO TAY - NHẬN NGAY ÁO MỚI" - D\'Chic Fashion tặng áo thun cho hóa đơn từ 1 triệu 2',
      excerpt: 'Với mỗi hóa đơn 1 triệu2 (sau khi đã quy đổi điểm), các nàng sẽ được TẶNG NGAY một chiếc ÁO THUN siêu xinh!',
      image: '/images/blog-qua-tet.jpg',
      logo: 'D\'CHIC',
      overlayTitle: 'QUÀ TẾT TRAO TAY',
      link: '/blog/qua-tet-trao-tay'
    },
    {
      id: 3,
      title: 'D\'Chic Fashion ra mắt bộ sưu tập Xuân "Khúc Xuân Thi" – Sớ thiết kế vay đầm xinh đẹp. Bán hoa cả dịu dàng',
      excerpt: 'Lấy cảm hứng từ chính khoảnh khắc giao mùa đầy thì vị của mùa Xuân, D\'Chic Fashion chính thức ra mắt bộ sưu tập thời trang xuân mang...',
      image: '/images/blog-khuc-xuan-thi.jpg',
      logo: 'D\'CHIC',
      overlayTitle: 'Khúc Xuân Thi',
      link: '/blog/khuc-xuan-thi'
    },
    {
      id: 4,
      title: 'D\'CHIC FASHION RA MẮT BỘ SƯU TẬP "PHỒN HOA" – RỰC RỠ MÙA LỄ HỘI CUỐI NĂM!',
      excerpt: 'D\'Chic Fashion chính thức ra mắt bộ sưu tập mới mang tên "Phồn Hoa" – bừng nức rỡ của thời trang tiệc tùng, nơi vẻ đẹp sang trọng...',
      image: '/images/blog-phon-hoa.jpg',
      logo: 'D\'CHIC',
      overlayTitle: 'Phồn Hoa',
      link: '/blog/phon-hoa'
    },
    {
      id: 5,
      title: 'D\'Chic Fashion cho ra mắt Bộ sưu tập Áo dài Tết 2026 "Dĩ Sắc Lưu Hương"',
      excerpt: '"Dĩ Sắc Lưu Hương" không chỉ là bộ sưu tập thời trang, mà còn là lời tri ân dành cho những giá trị văn hóa vượt thời gian – để mỗi...',
      image: '/images/blog-di-sac-luu-huong.jpg',
      logo: 'D\'CHIC',
      overlayTitle: 'Dĩ Sắc Lưu Hương',
      link: '/blog/di-sac-luu-huong'
    },
    {
      id: 6,
      title: '10+ mẫu váy liền dáng đầu xu hướng khiến nàng nhìn là muốn mua',
      excerpt: 'Khám phá top 10 best seller váy liền dạp, dẫn đầu xu hướng 2025. Thiết kế tôn dáng, trẻ trung, dễ mặc – nàng nhìn là muốn mua ngay.',
      image: '/images/blog-best-seller.jpg',
      logo: 'D\'CHIC',
      overlayTitle: 'BEST SELLER VÁY LIỀN',
      link: '/blog/best-seller-vay-lien'
    },
    {
      id: 7,
      title: 'BST "HƯƠNG THỜI GIAN" – NỐT LẶNG THANH',
      excerpt: 'Bộ sưu tập "Hương Thời Gian" là sự kết hợp tinh tế giữa nét đẹp cổ điển và hiện đại, mang đến vẻ thanh lịch vượt thời gian...',
      image: '/images/blog-huong-thoi-gian.jpg',
      logo: 'D\'CHIC',
      overlayTitle: 'HƯƠNG THỜI GIAN',
      link: '/blog/huong-thoi-gian'
    },
    {
      id: 8,
      title: 'Bộ sưu tập "TINH SẮC" – D\'Chic Fashion x Diễn Viên',
      excerpt: 'Tinh Sắc - Bộ sưu tập hợp tác độc quyền giữa D\'Chic Fashion và các diễn viên nổi tiếng, mang đến phong cách thời trang đẳng cấp...',
      image: '/images/blog-tinh-sac.jpg',
      logo: 'D\'CHIC',
      overlayTitle: 'TINH SẮC',
      link: '/blog/tinh-sac'
    },
    {
      id: 9,
      title: 'Top 7 kiểu áo sơ mi sang chảnh tôn dáng cho cô nàng công sở',
      excerpt: 'Khám phá 7 kiểu áo sơ mi công sở đẹp nhất, giúp bạn tự tin và nổi bật trong môi trường làm việc chuyên nghiệp...',
      image: '/images/blog-ao-so-mi.jpg',
      logo: 'D\'CHIC',
      overlayTitle: 'Áo Sơ Mi',
      link: '/blog/top-7-ao-so-mi'
    },
    {
      id: 10,
      title: 'Xu hướng thời trang công sở 2026 - Thanh lịch và hiện đại',
      excerpt: 'Cập nhật những xu hướng thời trang công sở mới nhất năm 2026, giúp bạn luôn tự tin và chuyên nghiệp trong mọi hoàn cảnh...',
      image: '/images/blog-10.jpg',
      logo: 'D\'CHIC',
      overlayTitle: 'Xu Hướng 2026',
      link: '/blog/xu-huong-2026'
    },
    {
      id: 11,
      title: 'Cách phối đồ công sở đẹp với chân váy bút chì',
      excerpt: 'Hướng dẫn chi tiết cách phối đồ với chân váy bút chì để tạo nên phong cách công sở thanh lịch và quyến rũ...',
      image: '/images/blog-11.jpg',
      logo: 'D\'CHIC',
      overlayTitle: 'Phối Đồ',
      link: '/blog/phoi-do-chan-vay'
    },
    {
      id: 12,
      title: 'Bí quyết chọn áo khoác blazer phù hợp với dáng người',
      excerpt: 'Khám phá bí quyết chọn áo khoác blazer phù hợp với từng dáng người để tôn lên vẻ đẹp tự nhiên của bạn...',
      image: '/images/blog-12.jpg',
      logo: 'D\'CHIC',
      overlayTitle: 'Blazer',
      link: '/blog/chon-blazer'
    },
    {
      id: 13,
      title: 'Thời trang dự tiệc sang trọng - Lựa chọn hoàn hảo cho mùa lễ hội',
      excerpt: 'Gợi ý những mẫu váy đầm dự tiệc sang trọng, giúp bạn tỏa sáng trong mọi buổi tiệc và sự kiện quan trọng...',
      image: '/images/blog-13.jpg',
      logo: 'D\'CHIC',
      overlayTitle: 'Dự Tiệc',
      link: '/blog/thoi-trang-du-tiec'
    },
    {
      id: 14,
      title: 'Màu sắc thời trang hot trend mùa xuân 2026',
      excerpt: 'Cập nhật những màu sắc thời trang hot trend nhất mùa xuân 2026, giúp bạn luôn bắt kịp xu hướng...',
      image: '/images/blog-14.jpg',
      logo: 'D\'CHIC',
      overlayTitle: 'Màu Sắc Xuân',
      link: '/blog/mau-sac-xuan'
    },
    {
      id: 15,
      title: 'Cách bảo quản quần áo để giữ được lâu như mới',
      excerpt: 'Chia sẻ những mẹo bảo quản quần áo hiệu quả, giúp trang phục của bạn luôn đẹp và bền lâu theo thời gian...',
      image: '/images/blog-15.jpg',
      logo: 'D\'CHIC',
      overlayTitle: 'Bảo Quản',
      link: '/blog/bao-quan-quan-ao'
    },
    {
      id: 16,
      title: 'Phong cách minimalist - Đơn giản mà tinh tế',
      excerpt: 'Khám phá phong cách thời trang minimalist với những thiết kế đơn giản nhưng vô cùng tinh tế và sang trọng...',
      image: '/images/blog-16.jpg',
      logo: 'D\'CHIC',
      overlayTitle: 'Minimalist',
      link: '/blog/phong-cach-minimalist'
    },
    {
      id: 17,
      title: 'Váy đầm vintage - Nét đẹp hoài cổ đầy quyến rũ',
      excerpt: 'Tìm hiểu về phong cách váy đầm vintage với những thiết kế mang hơi thở hoài cổ nhưng vẫn rất hiện đại...',
      image: '/images/blog-17.jpg',
      logo: 'D\'CHIC',
      overlayTitle: 'Vintage',
      link: '/blog/vay-dam-vintage'
    },
    {
      id: 18,
      title: 'Thời trang công sở mùa hè - Mát mẻ và thanh lịch',
      excerpt: 'Gợi ý những trang phục công sở mùa hè vừa mát mẻ vừa thanh lịch, giúp bạn tự tin suốt cả ngày dài...',
      image: '/images/blog-18.jpg',
      logo: 'D\'CHIC',
      overlayTitle: 'Mùa Hè',
      link: '/blog/cong-so-mua-he'
    },
    {
      id: 19,
      title: 'Cách mix đồ với quần tây để trông cao ráo hơn',
      excerpt: 'Bí quyết phối đồ với quần tây giúp bạn trông cao ráo và thanh thoát hơn, phù hợp với mọi dáng người...',
      image: '/images/blog-19.jpg',
      logo: 'D\'CHIC',
      overlayTitle: 'Mix Đồ',
      link: '/blog/mix-do-quan-tay'
    },
    {
      id: 20,
      title: 'Đầm dự tiệc ren - Sự lựa chọn của phái đẹp',
      excerpt: 'Khám phá bộ sưu tập đầm dự tiệc ren cao cấp, mang đến vẻ đẹp sang trọng và quyến rũ cho mọi buổi tiệc...',
      image: '/images/blog-20.jpg',
      logo: 'D\'CHIC',
      overlayTitle: 'Đầm Ren',
      link: '/blog/dam-du-tiec-ren'
    },
    {
      id: 21,
      title: 'Thời trang đi làm cho nàng công sở mới vào nghề',
      excerpt: 'Hướng dẫn cách xây dựng tủ đồ công sở cơ bản cho những cô nàng mới bước vào môi trường làm việc...',
      image: '/images/blog-21.jpg',
      logo: 'D\'CHIC',
      overlayTitle: 'Công Sở',
      link: '/blog/cong-so-moi-vao-nghe'
    },
    {
      id: 22,
      title: 'Áo len mùa đông - Ấm áp và thời trang',
      excerpt: 'Gợi ý những mẫu áo len mùa đông vừa ấm áp vừa thời trang, giúp bạn tự tin trong những ngày lạnh giá...',
      image: '/images/blog-22.jpg',
      logo: 'D\'CHIC',
      overlayTitle: 'Áo Len',
      link: '/blog/ao-len-mua-dong'
    },
    {
      id: 23,
      title: 'Phong cách Hàn Quốc - Xu hướng được yêu thích',
      excerpt: 'Cập nhật phong cách thời trang Hàn Quốc mới nhất, từ street style đến công sở, đều rất dễ áp dụng...',
      image: '/images/blog-23.jpg',
      logo: 'D\'CHIC',
      overlayTitle: 'K-Fashion',
      link: '/blog/phong-cach-han-quoc'
    },
    {
      id: 24,
      title: 'Cách chọn size quần áo chuẩn không cần chỉnh sửa',
      excerpt: 'Hướng dẫn chi tiết cách đo và chọn size quần áo phù hợp, giúp bạn mua sắm online dễ dàng hơn...',
      image: '/images/blog-24.jpg',
      logo: 'D\'CHIC',
      overlayTitle: 'Chọn Size',
      link: '/blog/chon-size-quan-ao'
    },
    {
      id: 25,
      title: 'Váy maxi - Nữ tính và thanh lịch cho mùa hè',
      excerpt: 'Khám phá bộ sưu tập váy maxi với nhiều kiểu dáng và màu sắc, phù hợp cho mọi dịp trong mùa hè...',
      image: '/images/blog-25.jpg',
      logo: 'D\'CHIC',
      overlayTitle: 'Váy Maxi',
      link: '/blog/vay-maxi'
    },
    {
      id: 26,
      title: 'Thời trang dạo phố cuối tuần - Thoải mái và cá tính',
      excerpt: 'Gợi ý những set đồ dạo phố cuối tuần vừa thoải mái vừa thời trang, giúp bạn tự tin khám phá thành phố...',
      image: '/images/blog-26.jpg',
      logo: 'D\'CHIC',
      overlayTitle: 'Dạo Phố',
      link: '/blog/thoi-trang-dao-pho'
    },
    {
      id: 27,
      title: 'Đầm babydoll - Trẻ trung và đáng yêu',
      excerpt: 'Tìm hiểu về phong cách đầm babydoll với thiết kế trẻ trung, đáng yêu, phù hợp với nhiều dáng người...',
      image: '/images/blog-27.jpg',
      logo: 'D\'CHIC',
      overlayTitle: 'Babydoll',
      link: '/blog/dam-babydoll'
    },
    {
      id: 28,
      title: 'Cách phối phụ kiện để hoàn thiện outfit công sở',
      excerpt: 'Bí quyết chọn và phối phụ kiện như túi xách, giày dép, trang sức để hoàn thiện trang phục công sở...',
      image: '/images/blog-28.jpg',
      logo: 'D\'CHIC',
      overlayTitle: 'Phụ Kiện',
      link: '/blog/phoi-phu-kien'
    },
    {
      id: 29,
      title: 'Thời trang bầu - Thoải mái và thời trang cho mẹ bầu',
      excerpt: 'Gợi ý những trang phục bầu vừa thoải mái vừa thời trang, giúp các mẹ bầu luôn tự tin và xinh đẹp...',
      image: '/images/blog-29.jpg',
      logo: 'D\'CHIC',
      overlayTitle: 'Thời Trang Bầu',
      link: '/blog/thoi-trang-bau'
    },
    {
      id: 30,
      title: 'Jumpsuit - Trang phục đa năng cho mọi dịp',
      excerpt: 'Khám phá sức hút của jumpsuit - trang phục đa năng có thể mặc đi làm, đi chơi hay dự tiệc đều phù hợp...',
      image: '/images/blog-30.jpg',
      logo: 'D\'CHIC',
      overlayTitle: 'Jumpsuit',
      link: '/blog/jumpsuit'
    }
  ]

  // Pagination logic
  const indexOfLastPost = currentPage * postsPerPage
  const indexOfFirstPost = indexOfLastPost - postsPerPage
  const currentPosts = blogPosts.slice(indexOfFirstPost, indexOfLastPost)
  const totalPages = Math.ceil(blogPosts.length / postsPerPage)

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const renderPageNumbers = () => {
    const pageNumbers = []
    
    // Always show first page
    pageNumbers.push(1)
    
    // Show pages around current page
    for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
      pageNumbers.push(i)
    }
    
    // Always show last page if there are multiple pages
    if (totalPages > 1) {
      pageNumbers.push(totalPages)
    }
    
    return [...new Set(pageNumbers)].sort((a, b) => a - b)
  }

  return (
    <main className="blog-page">
      {/* Breadcrumb */}
      <div className="breadcrumb">
        <div className="container">
          <a href="/">Trang chủ</a>
          <span className="separator">/</span>
          <span className="current">Blog</span>
        </div>
      </div>

      {/* Page Title */}
      <div className="blog-page-header">
        <h1 className="blog-page-title">Blog</h1>
      </div>

      {/* Blog Grid */}
      <div className="blog-page-content">
        <div className="container">
          <div className="blog-grid">
            {currentPosts.map((post) => (
              <div key={post.id} className="blog-post-card">
                <a href={post.link} className="blog-post-link">
                  <div className="blog-post-image">
                    <div className="blog-post-logo">{post.logo}</div>
                    <img 
                      src={post.image} 
                      alt={post.title}
                      onError={(e) => {
                        e.target.style.display = 'none'
                        e.target.parentElement.classList.add('no-image')
                      }}
                    />
                    <div className="blog-post-overlay">
                      <div className="blog-post-overlay-title">{post.overlayTitle}</div>
                    </div>
                  </div>
                  <div className="blog-post-content">
                    <h3 className="blog-post-title">{post.title}</h3>
                    <p className="blog-post-excerpt">{post.excerpt}</p>
                    <span className="blog-post-read-more">Xem thêm</span>
                  </div>
                </a>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="blog-pagination">
              <button
                onClick={() => paginate(currentPage - 1)}
                className="pagination-arrow"
                disabled={currentPage === 1}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
              </button>

              {renderPageNumbers().map((number, index, array) => (
                <React.Fragment key={number}>
                  {index > 0 && array[index - 1] !== number - 1 && (
                    <span className="pagination-dots">...</span>
                  )}
                  <button
                    onClick={() => paginate(number)}
                    className={`pagination-number ${currentPage === number ? 'active' : ''}`}
                  >
                    {number}
                  </button>
                </React.Fragment>
              ))}

              <button
                onClick={() => paginate(currentPage + 1)}
                className="pagination-arrow"
                disabled={currentPage === totalPages}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}

export default BlogPage
