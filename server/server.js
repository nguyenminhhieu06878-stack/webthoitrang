import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

// Load environment variables first
dotenv.config()

import { connectDB } from './config/database.js'

// Import models to sync with database
import Lookbook from './models/Lookbook.js'
import Blog from './models/Blog.js'
import Order from './models/Order.js'

// Import routes
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import lookbookRoutes from './routes/lookbookRoutes.js'
import blogRoutes from './routes/blogRoutes.js'
import categoryRoutes from './routes/categoryRoutes.js'
import paymentRoutes from './routes/paymentRoutes.js'
import chatbotRoutes from './routes/chatbotRoutes.js'

const app = express()

// CORS Middleware - must be before routes
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Database connection
connectDB()

// Routes
app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/lookbook', lookbookRoutes)
app.use('/api/blogs', blogRoutes)
app.use('/api/categories', categoryRoutes)
app.use('/api/payment', paymentRoutes)
app.use('/api/chatbot', chatbotRoutes)

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'D\'Chic Fashion API is running' })
})

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ 
    message: 'Something went wrong!', 
    error: process.env.NODE_ENV === 'development' ? err.message : {} 
  })
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`)
})
