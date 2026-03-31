import express from 'express'
import jwt from 'jsonwebtoken'
import Order from '../models/Order.js'
import { protect } from '../middleware/auth.js'

const router = express.Router()

// Get my orders (protected route)
router.get('/my-orders', protect, async (req, res) => {
  try {
    const orders = await Order.findAll({
      where: { userId: req.user.id },
      order: [['createdAt', 'DESC']]
    })

    res.json({ orders })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Create order (allow guest checkout)
router.post('/', async (req, res) => {
  try {
    // Try to get user from token if provided
    let userId = null
    const authHeader = req.headers.authorization
    
    console.log('Auth header:', authHeader ? 'Present' : 'Missing')
    
    if (authHeader && authHeader.startsWith('Bearer ')) {
      try {
        const token = authHeader.substring(7)
        console.log('Token:', token.substring(0, 20) + '...')
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_secret_key')
        userId = decoded.userId || decoded.id  // Support both userId and id
        console.log('Decoded userId:', userId)
      } catch (err) {
        // Token invalid, continue as guest
        console.log('Token verification failed:', err.message)
      }
    }

    const { items, totalAmount, shippingAddress, paymentMethod } = req.body

    console.log('Creating order with userId:', userId)

    const order = await Order.create({
      userId,
      items,
      totalAmount,
      shippingAddress,
      paymentMethod,
      status: 'pending',
      paymentStatus: 'pending'
    })

    res.status(201).json({ order, message: 'Đặt hàng thành công' })
  } catch (error) {
    console.error('Create order error:', error)
    res.status(400).json({ message: error.message })
  }
})

// Get all orders (for admin or user's orders)
router.get('/', async (req, res) => {
  try {
    const { userId } = req.query
    let whereClause = {}
    
    if (userId) whereClause.userId = userId

    const orders = await Order.findAll({
      where: whereClause,
      order: [['createdAt', 'DESC']]
    })

    res.json({ orders })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Get single order
router.get('/:id', protect, async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id)

    if (!order) {
      return res.status(404).json({ message: 'Order not found' })
    }

    // Check if order belongs to user
    if (order.userId !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized' })
    }

    res.json({ order })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Update order status
router.patch('/:id/status', protect, async (req, res) => {
  try {
    const { status, paymentStatus } = req.body
    
    const order = await Order.findByPk(req.params.id)
    if (!order) {
      return res.status(404).json({ message: 'Order not found' })
    }

    if (status) order.status = status
    if (paymentStatus) order.paymentStatus = paymentStatus

    await order.save()
    res.json({ order })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// Cancel order
router.patch('/:id/cancel', protect, async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id)
    
    if (!order) {
      return res.status(404).json({ message: 'Order not found' })
    }

    if (order.userId !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' })
    }

    if (order.status !== 'pending') {
      return res.status(400).json({ message: 'Cannot cancel this order' })
    }

    order.status = 'cancelled'
    await order.save()

    res.json({ order, message: 'Order cancelled successfully' })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

export default router
