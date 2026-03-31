import { Sequelize } from 'sequelize'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.join(__dirname, '../database.sqlite'),
  logging: false
})

export const connectDB = async () => {
  try {
    await sequelize.authenticate()
    console.log('✅ SQLite connected successfully')
    await sequelize.sync({ alter: true })
    console.log('✅ Database synced')
  } catch (error) {
    console.error('❌ Database connection error:', error)
    process.exit(1)
  }
}

export default sequelize
