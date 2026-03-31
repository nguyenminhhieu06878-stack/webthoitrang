import { connectDB } from './config/database.js'
import Blog from './models/Blog.js'

const blogData = [
  {
    title: 'D\'Chic Fashion Ra Mắt BST Tháng 3 "Mộc Nguyên" – Vẻ Đẹp Mộc Mạc Cho Mỗi Khởi Đầu Mới!',
    excerpt: 'Ra mắt vào tháng 3 – tháng của yêu thương và tôn vinh phái đẹp – "Mộc Nguyên" như một lời chào dịu dàng gửi đến những người phụ nữ...',
    content: `<p>Ra mắt vào tháng 3 – tháng của yêu thương và tôn vinh phái đẹp – "Mộc Nguyên" như một lời chào dịu dàng gửi đến những người phụ nữ Việt Nam.</p>

<p>Bộ sưu tập "Mộc Nguyên" lấy cảm hứng từ vẻ đẹp thuần khiết, mộc mạc của thiên nhiên và con người. Mỗi thiết kế trong bộ sưu tập đều mang trong mình sự tinh tế, thanh lịch nhưng không kém phần hiện đại.</p>

<p>Với tông màu chủ đạo là các gam màu trung tính như be, trắng kem, xanh nhạt, "Mộc Nguyên" tôn vinh vẻ đẹp tự nhiên của người phụ nữ. Các chất liệu được lựa chọn kỹ lưỡng, mang lại cảm giác thoải mái và sang trọng.</p>

<p>Đặc biệt, bộ sưu tập này phù hợp cho cả môi trường công sở lẫn các buổi gặp gỡ bạn bè, giúp các nàng tự tin tỏa sáng trong mọi hoàn cảnh.</p>`,
    image: '/images/blog1.png',
    logo: 'D\'CHIC',
    overlayTitle: 'Mộc Nguyên',
    slug: 'moc-nguyen',
    featured: true,
    category: 'Bộ sưu tập'
  },
  {
    title: '"QUÀ TẾT TRAO TAY - NHẬN NGAY ÁO MỚI" - D\'Chic Fashion tặng áo thun cho hóa đơn từ 1 triệu 2',
    excerpt: 'Với mỗi hóa đơn 1 triệu2 (sau khi đã quy đổi điểm), các nàng sẽ được TẶNG NGAY một chiếc ÁO THUN siêu xinh!',
    content: `<p>Chương trình khuyến mãi đặc biệt dành cho khách hàng thân thiết của D'Chic Fashion!</p>

<p>Với mỗi hóa đơn từ 1.200.000đ (sau khi đã quy đổi điểm tích lũy), các nàng sẽ được TẶNG NGAY một chiếc áo thun cao cấp với thiết kế độc quyền từ D'Chic Fashion.</p>

<p><strong>Thời gian áp dụng:</strong> Từ ngày 15/01/2026 đến hết ngày 28/02/2026</p>

<p><strong>Điều kiện:</strong></p>
<ul>
<li>Áp dụng cho tất cả các sản phẩm tại D'Chic Fashion</li>
<li>Hóa đơn được tính sau khi quy đổi điểm thành viên</li>
<li>Mỗi hóa đơn chỉ được tặng 1 áo thun</li>
<li>Số lượng có hạn, tặng đến hết quà</li>
</ul>

<p>Đây là cơ hội tuyệt vời để các nàng sắm Tết và nhận quà xinh xắn từ D'Chic Fashion!</p>`,
    image: '/images/blog2.png',
    logo: 'D\'CHIC',
    overlayTitle: 'QUÀ TẾT TRAO TAY',
    slug: 'qua-tet-trao-tay',
    featured: true,
    category: 'Khuyến mãi'
  },
  {
    title: 'D\'Chic Fashion ra mắt bộ sưu tập Xuân "Khúc Xuân Thi" – Sớ thiết kế vay đầm xinh đẹp. Bán hoa cả dịu dàng',
    excerpt: 'Lấy cảm hứng từ chính khoảnh khắc giao mùa đầy thì vị của mùa Xuân, D\'Chic Fashion chính thức ra mắt bộ sưu tập thời trang xuân mang...',
    content: `<p>Lấy cảm hứng từ chính khoảnh khắc giao mùa đầy thì vị của mùa Xuân, D'Chic Fashion chính thức ra mắt bộ sưu tập thời trang xuân mang tên "Khúc Xuân Thi".</p>

<p>Bộ sưu tập "Khúc Xuân Thi" là sự kết hợp hoàn hảo giữa nét đẹp truyền thống và phong cách hiện đại. Các thiết kế váy đầm với họa tiết hoa xuân rực rỡ, tông màu pastel nhẹ nhàng mang đến vẻ đẹp dịu dàng, nữ tính.</p>

<p>Điểm nhấn của bộ sưu tập là các chi tiết thêu tay tinh xảo, đường cắt may tôn dáng và chất liệu vải cao cấp, thoáng mát. Mỗi thiết kế đều được chăm chút kỹ lưỡng để mang đến sự hoàn hảo cho người mặc.</p>

<p>"Khúc Xuân Thi" phù hợp cho các dịp đi chơi xuân, du xuân, hay các buổi tiệc nhẹ nhàng. Hãy để D'Chic Fashion đồng hành cùng bạn trong mùa xuân này!</p>`,
    image: '/images/blog3.png',
    logo: 'D\'CHIC',
    overlayTitle: 'Khúc Xuân Thi',
    slug: 'khuc-xuan-thi',
    featured: true,
    category: 'Bộ sưu tập'
  },
  {
    title: 'D\'CHIC FASHION RA MẮT BỘ SƯU TẬP "PHỒN HOA" – RỰC RỠ MÙA LỄ HỘI CUỐI NĂM!',
    excerpt: 'D\'Chic Fashion chính thức ra mắt bộ sưu tập mới mang tên "Phồn Hoa" – bừng nức rỡ của thời trang tiệc tùng, nơi vẻ đẹp sang trọng...',
    content: `<p>D'Chic Fashion chính thức ra mắt bộ sưu tập mới mang tên "Phồn Hoa" – bừng nức rỡ của thời trang tiệc tùng, nơi vẻ đẹp sang trọng và quyến rũ được tôn vinh trọn vẹn.</p>

<p>Lấy cảm hứng từ sự rực rỡ của mùa lễ hội cuối năm, "Phồn Hoa" mang đến những thiết kế váy đầm dự tiệc với chất liệu cao cấp, họa tiết tinh xảo và màu sắc lộng lẫy.</p>

<p>Mỗi thiết kế trong bộ sưu tập đều được chăm chút tỉ mỉ từ đường cắt may, chi tiết trang trí đến cách phối màu, tạo nên vẻ đẹp sang trọng và cuốn hút cho người mặc.</p>

<p>"Phồn Hoa" là lựa chọn hoàn hảo cho các buổi tiệc cuối năm, giúp các nàng tự tin tỏa sáng và thu hút mọi ánh nhìn.</p>`,
    image: '/images/blog4.png',
    logo: 'D\'CHIC',
    overlayTitle: 'Phồn Hoa',
    slug: 'phon-hoa',
    featured: false,
    category: 'Bộ sưu tập'
  },
  {
    title: 'D\'Chic Fashion cho ra mắt Bộ sưu tập Áo dài Tết 2026 "Dĩ Sắc Lưu Hương"',
    excerpt: '"Dĩ Sắc Lưu Hương" không chỉ là bộ sưu tập thời trang, mà còn là lời tri ân dành cho những giá trị văn hóa vượt thời gian – để mỗi...',
    content: `<p>"Dĩ Sắc Lưu Hương" không chỉ là bộ sưu tập thời trang, mà còn là lời tri ân dành cho những giá trị văn hóa vượt thời gian – để mỗi người phụ nữ Việt tự hào khoe sắc trong dịp Tết Nguyên Đán 2026.</p>

<p>Bộ sưu tập áo dài Tết năm nay của D'Chic Fashion mang đến sự kết hợp hoàn hảo giữa nét đẹp truyền thống và phong cách hiện đại. Các thiết kế áo dài với họa tiết hoa sen, hoa đào, mai vàng được thêu tay tinh xảo trên nền vải lụa cao cấp.</p>

<p>Màu sắc chủ đạo của bộ sưu tập là đỏ may mắn, vàng thịnh vượng, xanh thanh lịch và trắng tinh khôi, mang đến nhiều lựa chọn cho các nàng trong dịp Tết.</p>

<p>Hãy để "Dĩ Sắc Lưu Hương" đồng hành cùng bạn trong mùa Tết này, tỏa sáng với vẻ đẹp truyền thống Việt Nam!</p>`,
    image: '/images/blog5.png',
    logo: 'D\'CHIC',
    overlayTitle: 'Dĩ Sắc Lưu Hương',
    slug: 'di-sac-luu-huong',
    featured: true,
    category: 'Bộ sưu tập'
  },
  {
    title: '10+ mẫu váy liền dáng đầu xu hướng khiến nàng nhìn là muốn mua',
    excerpt: 'Khám phá top 10 best seller váy liền dạp, dẫn đầu xu hướng 2025. Thiết kế tôn dáng, trẻ trung, dễ mặc – nàng nhìn là muốn mua ngay.',
    content: `<p>Khám phá top 10+ mẫu váy liền best seller tại D'Chic Fashion, dẫn đầu xu hướng 2026 với thiết kế tôn dáng, trẻ trung và dễ mặc.</p>

<p>Váy liền luôn là item không thể thiếu trong tủ đồ của mọi cô nàng. Với ưu điểm dễ mặc, dễ phối đồ và phù hợp với nhiều dịp khác nhau, váy liền trở thành lựa chọn hàng đầu cho cả công sở lẫn dạo phố.</p>

<p>Bộ sưu tập váy liền của D'Chic Fashion năm nay mang đến đa dạng kiểu dáng từ váy suông thanh lịch, váy ôm body quyến rũ đến váy xòe nữ tính. Các thiết kế đều được may từ chất liệu cao cấp, form dáng chuẩn và màu sắc thời thượng.</p>

<p>Đặc biệt, các mẫu váy liền best seller của D'Chic đều có giá thành hợp lý, phù hợp với túi tiền của đa số khách hàng. Hãy ghé thăm showroom để trải nghiệm và chọn cho mình những mẫu váy ưng ý nhất!</p>`,
    image: '/images/blog6.png',
    logo: 'D\'CHIC',
    overlayTitle: 'BEST SELLER VÁY LIỀN',
    slug: 'best-seller-vay-lien',
    featured: true,
    category: 'Xu hướng'
  },
  {
    title: 'BST "HƯƠNG THỜI GIAN" – NỐT LẶNG THANH',
    excerpt: 'Bộ sưu tập "Hương Thời Gian" là sự kết hợp tinh tế giữa nét đẹp cổ điển và hiện đại, mang đến vẻ thanh lịch vượt thời gian...',
    content: `<p>Bộ sưu tập "Hương Thời Gian" là sự kết hợp tinh tế giữa nét đẹp cổ điển và hiện đại, mang đến vẻ thanh lịch vượt thời gian cho người phụ nữ Việt.</p>

<p>Lấy cảm hứng từ những giá trị trường tồn của thời gian, "Hương Thời Gian" tôn vinh vẻ đẹp thanh lịch, sang trọng nhưng không kém phần hiện đại. Các thiết kế trong bộ sưu tập đều mang phong cách tối giản nhưng tinh tế.</p>

<p>Màu sắc chủ đạo là các tông trung tính như đen, trắng, be, xám, dễ dàng phối hợp và phù hợp với nhiều hoàn cảnh. Chất liệu vải được lựa chọn kỹ lưỡng, mang lại cảm giác thoải mái và sang trọng.</p>

<p>"Hương Thời Gian" là lựa chọn hoàn hảo cho những cô nàng yêu thích phong cách thanh lịch, tối giản nhưng vẫn muốn nổi bật và cuốn hút.</p>`,
    image: '/images/blog7.png',
    logo: 'D\'CHIC',
    overlayTitle: 'HƯƠNG THỜI GIAN',
    slug: 'huong-thoi-gian',
    featured: false,
    category: 'Bộ sưu tập'
  },
  {
    title: 'Bộ sưu tập "TINH SẮC" – D\'Chic Fashion x Diễn Viên',
    excerpt: 'Tinh Sắc - Bộ sưu tập hợp tác độc quyền giữa D\'Chic Fashion và các diễn viên nổi tiếng, mang đến phong cách thời trang đẳng cấp...',
    image: '/images/blog8.png',
    logo: 'D\'CHIC',
    overlayTitle: 'TINH SẮC',
    slug: 'tinh-sac',
    featured: false,
    category: 'Bộ sưu tập'
  },
  {
    title: 'Top 7 kiểu áo sơ mi sang chảnh tôn dáng cho cô nàng công sở',
    excerpt: 'Khám phá 7 kiểu áo sơ mi công sở đẹp nhất, giúp bạn tự tin và nổi bật trong môi trường làm việc chuyên nghiệp...',
    image: '/images/blog9.png',
    logo: 'D\'CHIC',
    overlayTitle: 'Áo Sơ Mi',
    slug: 'top-7-ao-so-mi',
    featured: false,
    category: 'Hướng dẫn'
  },
  {
    title: 'Xu hướng thời trang công sở 2026 - Thanh lịch và hiện đại',
    excerpt: 'Cập nhật những xu hướng thời trang công sở mới nhất năm 2026, giúp bạn luôn tự tin và chuyên nghiệp trong mọi hoàn cảnh...',
    image: '/images/blog10.png',
    logo: 'D\'CHIC',
    overlayTitle: 'Xu Hướng 2026',
    slug: 'xu-huong-2026',
    featured: false,
    category: 'Xu hướng'
  },
  {
    title: 'Cách phối đồ công sở đẹp với chân váy bút chì',
    excerpt: 'Hướng dẫn chi tiết cách phối đồ với chân váy bút chì để tạo nên phong cách công sở thanh lịch và quyến rũ...',
    image: '/images/blog11.png',
    logo: 'D\'CHIC',
    overlayTitle: 'Phối Đồ',
    slug: 'phoi-do-chan-vay',
    featured: false,
    category: 'Hướng dẫn'
  },
  {
    title: 'Bí quyết chọn áo khoác blazer phù hợp với dáng người',
    excerpt: 'Khám phá bí quyết chọn áo khoác blazer phù hợp với từng dáng người để tôn lên vẻ đẹp tự nhiên của bạn...',
    image: '/images/blog12.png',
    logo: 'D\'CHIC',
    overlayTitle: 'Blazer',
    slug: 'chon-blazer',
    featured: false,
    category: 'Hướng dẫn'
  },
  {
    title: 'Thời trang dự tiệc sang trọng - Lựa chọn hoàn hảo cho mùa lễ hội',
    excerpt: 'Gợi ý những mẫu váy đầm dự tiệc sang trọng, giúp bạn tỏa sáng trong mọi buổi tiệc và sự kiện quan trọng...',
    image: '/images/blog13.png',
    logo: 'D\'CHIC',
    overlayTitle: 'Dự Tiệc',
    slug: 'thoi-trang-du-tiec',
    featured: false,
    category: 'Xu hướng'
  },
  {
    title: 'Màu sắc thời trang hot trend mùa xuân 2026',
    excerpt: 'Cập nhật những màu sắc thời trang hot trend nhất mùa xuân 2026, giúp bạn luôn bắt kịp xu hướng...',
    image: '/images/blog14.png',
    logo: 'D\'CHIC',
    overlayTitle: 'Màu Sắc Xuân',
    slug: 'mau-sac-xuan',
    featured: false,
    category: 'Xu hướng'
  },
  {
    title: 'Cách bảo quản quần áo để giữ được lâu như mới',
    excerpt: 'Chia sẻ những mẹo bảo quản quần áo hiệu quả, giúp trang phục của bạn luôn đẹp và bền lâu theo thời gian...',
    image: '/images/blog15.png',
    logo: 'D\'CHIC',
    overlayTitle: 'Bảo Quản',
    slug: 'bao-quan-quan-ao',
    featured: false,
    category: 'Hướng dẫn'
  },
  {
    title: 'Phong cách minimalist - Đơn giản mà tinh tế',
    excerpt: 'Khám phá phong cách thời trang minimalist với những thiết kế đơn giản nhưng vô cùng tinh tế và sang trọng...',
    image: '/images/blog1.png',
    logo: 'D\'CHIC',
    overlayTitle: 'Minimalist',
    slug: 'phong-cach-minimalist',
    featured: false,
    category: 'Xu hướng'
  },
  {
    title: 'Váy đầm vintage - Nét đẹp hoài cổ đầy quyến rũ',
    excerpt: 'Tìm hiểu về phong cách váy đầm vintage với những thiết kế mang hơi thở hoài cổ nhưng vẫn rất hiện đại...',
    image: '/images/blog2.png',
    logo: 'D\'CHIC',
    overlayTitle: 'Vintage',
    slug: 'vay-dam-vintage',
    featured: false,
    category: 'Xu hướng'
  },
  {
    title: 'Thời trang công sở mùa hè - Mát mẻ và thanh lịch',
    excerpt: 'Gợi ý những trang phục công sở mùa hè vừa mát mẻ vừa thanh lịch, giúp bạn tự tin suốt cả ngày dài...',
    image: '/images/blog3.png',
    logo: 'D\'CHIC',
    overlayTitle: 'Mùa Hè',
    slug: 'cong-so-mua-he',
    featured: false,
    category: 'Xu hướng'
  },
  {
    title: 'Cách mix đồ với quần tây để trông cao ráo hơn',
    excerpt: 'Bí quyết phối đồ với quần tây giúp bạn trông cao ráo và thanh thoát hơn, phù hợp với mọi dáng người...',
    image: '/images/blog4.png',
    logo: 'D\'CHIC',
    overlayTitle: 'Mix Đồ',
    slug: 'mix-do-quan-tay',
    featured: false,
    category: 'Hướng dẫn'
  },
  {
    title: 'Đầm dự tiệc ren - Sự lựa chọn của phái đẹp',
    excerpt: 'Khám phá bộ sưu tập đầm dự tiệc ren cao cấp, mang đến vẻ đẹp sang trọng và quyến rũ cho mọi buổi tiệc...',
    image: '/images/blog5.png',
    logo: 'D\'CHIC',
    overlayTitle: 'Đầm Ren',
    slug: 'dam-du-tiec-ren',
    featured: false,
    category: 'Xu hướng'
  },
  {
    title: 'Thời trang đi làm cho nàng công sở mới vào nghề',
    excerpt: 'Hướng dẫn cách xây dựng tủ đồ công sở cơ bản cho những cô nàng mới bước vào môi trường làm việc...',
    image: '/images/blog6.png',
    logo: 'D\'CHIC',
    overlayTitle: 'Công Sở',
    slug: 'cong-so-moi-vao-nghe',
    featured: false,
    category: 'Hướng dẫn'
  },
  {
    title: 'Áo len mùa đông - Ấm áp và thời trang',
    excerpt: 'Gợi ý những mẫu áo len mùa đông vừa ấm áp vừa thời trang, giúp bạn tự tin trong những ngày lạnh giá...',
    image: '/images/blog7.png',
    logo: 'D\'CHIC',
    overlayTitle: 'Áo Len',
    slug: 'ao-len-mua-dong',
    featured: false,
    category: 'Xu hướng'
  },
  {
    title: 'Phong cách Hàn Quốc - Xu hướng được yêu thích',
    excerpt: 'Cập nhật phong cách thời trang Hàn Quốc mới nhất, từ street style đến công sở, đều rất dễ áp dụng...',
    image: '/images/blog8.png',
    logo: 'D\'CHIC',
    overlayTitle: 'K-Fashion',
    slug: 'phong-cach-han-quoc',
    featured: false,
    category: 'Xu hướng'
  },
  {
    title: 'Cách chọn size quần áo chuẩn không cần chỉnh sửa',
    excerpt: 'Hướng dẫn chi tiết cách đo và chọn size quần áo phù hợp, giúp bạn mua sắm online dễ dàng hơn...',
    image: '/images/blog9.png',
    logo: 'D\'CHIC',
    overlayTitle: 'Chọn Size',
    slug: 'chon-size-quan-ao',
    featured: false,
    category: 'Hướng dẫn'
  },
  {
    title: 'Váy maxi - Nữ tính và thanh lịch cho mùa hè',
    excerpt: 'Khám phá bộ sưu tập váy maxi với nhiều kiểu dáng và màu sắc, phù hợp cho mọi dịp trong mùa hè...',
    image: '/images/blog10.png',
    logo: 'D\'CHIC',
    overlayTitle: 'Váy Maxi',
    slug: 'vay-maxi',
    featured: false,
    category: 'Xu hướng'
  },
  {
    title: 'Thời trang dạo phố cuối tuần - Thoải mái và cá tính',
    excerpt: 'Gợi ý những set đồ dạo phố cuối tuần vừa thoải mái vừa thời trang, giúp bạn tự tin khám phá thành phố...',
    image: '/images/blog11.png',
    logo: 'D\'CHIC',
    overlayTitle: 'Dạo Phố',
    slug: 'thoi-trang-dao-pho',
    featured: false,
    category: 'Xu hướng'
  },
  {
    title: 'Đầm babydoll - Trẻ trung và đáng yêu',
    excerpt: 'Tìm hiểu về phong cách đầm babydoll với thiết kế trẻ trung, đáng yêu, phù hợp với nhiều dáng người...',
    image: '/images/blog12.png',
    logo: 'D\'CHIC',
    overlayTitle: 'Babydoll',
    slug: 'dam-babydoll',
    featured: false,
    category: 'Xu hướng'
  },
  {
    title: 'Cách phối phụ kiện để hoàn thiện outfit công sở',
    excerpt: 'Bí quyết chọn và phối phụ kiện như túi xách, giày dép, trang sức để hoàn thiện trang phục công sở...',
    image: '/images/blog13.png',
    logo: 'D\'CHIC',
    overlayTitle: 'Phụ Kiện',
    slug: 'phoi-phu-kien',
    featured: false,
    category: 'Hướng dẫn'
  },
  {
    title: 'Thời trang bầu - Thoải mái và thời trang cho mẹ bầu',
    excerpt: 'Gợi ý những trang phục bầu vừa thoải mái vừa thời trang, giúp các mẹ bầu luôn tự tin và xinh đẹp...',
    image: '/images/blog14.png',
    logo: 'D\'CHIC',
    overlayTitle: 'Thời Trang Bầu',
    slug: 'thoi-trang-bau',
    featured: false,
    category: 'Xu hướng'
  },
  {
    title: 'Jumpsuit - Trang phục đa năng cho mọi dịp',
    excerpt: 'Khám phá sức hút của jumpsuit - trang phục đa năng có thể mặc đi làm, đi chơi hay dự tiệc đều phù hợp...',
    image: '/images/blog15.png',
    logo: 'D\'CHIC',
    overlayTitle: 'Jumpsuit',
    slug: 'jumpsuit',
    featured: false,
    category: 'Xu hướng'
  }
]

const seedBlogs = async () => {
  try {
    await connectDB()
    
    // Clear existing blog data
    await Blog.destroy({ where: {} })
    console.log('Cleared existing blog data')

    // Add default content for blogs without content
    const blogsWithContent = blogData.map(blog => {
      if (!blog.content) {
        return {
          ...blog,
          content: `<p>${blog.excerpt}</p>

<p>D'Chic Fashion luôn mang đến những sản phẩm thời trang chất lượng cao với thiết kế tinh tế, phù hợp với phong cách hiện đại của phụ nữ Việt.</p>

<p>Mỗi sản phẩm đều được chăm chút kỹ lưỡng từ khâu thiết kế, lựa chọn chất liệu đến quy trình sản xuất, đảm bảo mang đến sự hài lòng tối đa cho khách hàng.</p>

<p>Hãy ghé thăm showroom D'Chic Fashion để trải nghiệm và lựa chọn những sản phẩm phù hợp nhất với phong cách của bạn!</p>`
        }
      }
      return blog
    })

    // Insert new blog data
    await Blog.bulkCreate(blogsWithContent)
    console.log(`✅ Successfully seeded ${blogsWithContent.length} blog posts`)

    process.exit(0)
  } catch (error) {
    console.error('❌ Error seeding blogs:', error)
    process.exit(1)
  }
}

seedBlogs()
