import { connectDB } from './config/database.js'
import Lookbook from './models/Lookbook.js'

const lookbookData = [
  {
    title: 'Spring Collection 2026',
    description: 'Bộ sưu tập xuân hè với những thiết kế nhẹ nhàng, thanh lịch',
    image: '/lookbook/lookbook1.png',
    season: 'Spring 2026',
    featured: true,
    order: 1
  },
  {
    title: 'Office Elegance',
    description: 'Phong cách công sở sang trọng và chuyên nghiệp',
    image: '/lookbook/lookbook2.png',
    season: 'Spring 2026',
    featured: true,
    order: 2
  },
  {
    title: 'Modern Minimalist',
    description: 'Thiết kế tối giản hiện đại cho phụ nữ năng động',
    image: '/lookbook/lookbook3.png',
    season: 'Spring 2026',
    featured: true,
    order: 3
  },
  {
    title: 'Casual Chic',
    description: 'Phong cách casual nhưng vẫn giữ được sự thanh lịch',
    image: '/lookbook/lookbook4.png',
    season: 'Spring 2026',
    featured: false,
    order: 4
  },
  {
    title: 'Summer Breeze',
    description: 'Bộ sưu tập mùa hè tươi mát và năng động',
    image: '/lookbook/lookbook6.png',
    season: 'Summer 2026',
    featured: true,
    order: 5
  },
  {
    title: 'Professional Style',
    description: 'Phong cách chuyên nghiệp cho môi trường công sở',
    image: '/lookbook/lookbook7.png',
    season: 'Spring 2026',
    featured: false,
    order: 6
  },
  {
    title: 'Feminine Touch',
    description: 'Nét nữ tính dịu dàng trong từng thiết kế',
    image: '/lookbook/lookbook8.png',
    season: 'Spring 2026',
    featured: true,
    order: 7
  },
  {
    title: 'Urban Sophistication',
    description: 'Phong cách đô thị hiện đại và tinh tế',
    image: '/lookbook/lookbook9.png',
    season: 'Spring 2026',
    featured: false,
    order: 8
  },
  {
    title: 'Classic Beauty',
    description: 'Vẻ đẹp cổ điển vượt thời gian',
    image: '/lookbook/lookbook10.png',
    season: 'Spring 2026',
    featured: true,
    order: 9
  },
  {
    title: 'Contemporary Fashion',
    description: 'Thời trang đương đại cho phụ nữ hiện đại',
    image: '/lookbook/lookbook11.png',
    season: 'Summer 2026',
    featured: false,
    order: 10
  },
  {
    title: 'Timeless Elegance',
    description: 'Sự thanh lịch bất biến qua năm tháng',
    image: '/lookbook/lookbook12.png',
    season: 'Spring 2026',
    featured: true,
    order: 11
  },
  {
    title: 'Elegant Simplicity',
    description: 'Sự đơn giản nhưng đầy tinh tế',
    image: '/lookbook/lookbook13.png',
    season: 'Spring 2026',
    featured: true,
    order: 12
  },
  {
    title: 'Sophisticated Style',
    description: 'Phong cách sang trọng và tinh tế',
    image: '/lookbook/lookbook14.png',
    season: 'Spring 2026',
    featured: false,
    order: 13
  },
  {
    title: 'Modern Grace',
    description: 'Vẻ đẹp hiện đại và duyên dáng',
    image: '/lookbook/lookbook15.png',
    season: 'Spring 2026',
    featured: true,
    order: 14
  }
]

const seedLookbook = async () => {
  try {
    await connectDB()
    
    // Clear existing lookbook data
    await Lookbook.destroy({ where: {} })
    console.log('Cleared existing lookbook data')

    // Insert new lookbook data
    await Lookbook.bulkCreate(lookbookData)
    console.log(`✅ Successfully seeded ${lookbookData.length} lookbook images`)

    process.exit(0)
  } catch (error) {
    console.error('❌ Error seeding lookbook:', error)
    process.exit(1)
  }
}

seedLookbook()
