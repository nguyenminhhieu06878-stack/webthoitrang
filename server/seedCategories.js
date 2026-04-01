import sequelize from './config/database.js'
import Category from './models/Category.js'

const categories = [
  { name: 'New Collection', slug: 'new-collection', description: 'Bộ sưu tập mới nhất' },
  { name: 'Áo', slug: 'ao', description: 'Các loại áo thời trang' },
  { name: 'Váy Đầm Công Sở', slug: 'vay-dam-cong-so', description: 'Váy đầm công sở thanh lịch' },
  { name: 'Áo Khoác', slug: 'ao-khoac', description: 'Áo khoác thời trang' },
  { name: 'Quần', slug: 'quan', description: 'Quần công sở và thời trang' },
  { name: 'Chân Váy', slug: 'chan-vay', description: 'Chân váy đa dạng kiểu dáng' }
]

const seedCategories = async () => {
  try {
    await sequelize.sync()
    console.log('✅ Database synced')
    
    // Clear existing categories
    await Category.destroy({ where: {} })
    
    // Insert categories
    await Category.bulkCreate(categories)
    
    console.log(`✅ Inserted ${categories.length} categories`)
    console.log('🎉 Seed completed successfully!')
    
    process.exit(0)
  } catch (error) {
    console.error('❌ Error seeding categories:', error)
    process.exit(1)
  }
}

seedCategories()
