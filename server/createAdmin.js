import { connectDB } from './config/database.js'
import User from './models/User.js'

const createAdmin = async () => {
  try {
    await connectDB()

    // Check if admin exists
    const existingAdmin = await User.findOne({ where: { email: 'admin@dchic.com' } })
    
    if (existingAdmin) {
      console.log('❌ Admin already exists')
      console.log('Email: admin@dchic.com')
      process.exit(0)
    }

    // Create admin user
    const admin = await User.create({
      name: 'Admin D\'Chic',
      email: 'admin@dchic.com',
      password: 'admin123',
      role: 'admin',
      phone: '0123456789'
    })

    console.log('✅ Admin user created successfully!')
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
    console.log('📧 Email: admin@dchic.com')
    console.log('🔑 Password: admin123')
    console.log('👤 Role: admin')
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
    console.log('⚠️  Please change the password after first login!')

    process.exit(0)
  } catch (error) {
    console.error('❌ Error creating admin:', error)
    process.exit(1)
  }
}

createAdmin()
