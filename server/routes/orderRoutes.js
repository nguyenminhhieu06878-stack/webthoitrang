import express from 'express'
import Order from '../models/Order.js'

const router = express.Router()

// Create order
router.post('/', async (req, res) => {
  try {
    const order = new Order(req.body)
    const savedOrder = await order.save()
    res.status(201).json(savedOrder)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// Get all orders (for admin or user's orders)
router.get('/', async (req, res) => {
  try {
    const { userId } = req.query
    let query = {}
    
    if (userId) query.user = userId

    const orders = await Order.find(query)
      .populate('user', 'name email')
      .populate('orderItems.product', 'name')
      .sort({ createdAt: -1 })

    res.json(orders)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Get single order
router.get('/:id', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('user', 'name email phone')
      .populate('orderItems.product')

    if (!order) {
      return res.status(404).json({ message: 'Order not found' })
    }

    res.json(order)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Update order status
router.patch('/:id/status', async (req, res) => {
  try {
    const { orderStatus, paymentStatus } = req.body
    
    const order = await Order.findById(req.params.id)
    if (!order) {
      return res.status(404).json({ message: 'Order not found' })
    }

    if (orderStatus) order.orderStatus = orderStatus
    if (paymentStatus) order.paymentStatus = paymentStatus
    
    if (orderStatus === 'Delivered') {
      order.deliveredAt = Date.now()
    }

    await order.save()
    res.json(order)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

export default router
