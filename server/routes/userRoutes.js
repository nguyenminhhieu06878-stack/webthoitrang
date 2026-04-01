import express from 'express'
import jwt from 'jsonwebtoken'
import User from '../models/User.js'
import { protect, adminOnly } from '../middleware/auth.js'

const router = express.Router()

// Register
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body

    // Validation
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Please provide all required fields' })
    }

    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters' })
    }

    const existingUser = await User.findOne({ where: { email } })
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' })
    }

    const user = await User.create({ name, email, password })

    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET || 'your_secret_key',
      { expiresIn: '7d' }
    )

    res.status(201).json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body

    // Validation
    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide email and password' })
    }

    const user = await User.findOne({ where: { email } })
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' })
    }

    const isMatch = await user.comparePassword(password)
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' })
    }

    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET || 'your_secret_key',
      { expiresIn: '7d' }
    )

    res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Get current user profile (protected route)
router.get('/profile', protect, async (req, res) => {
  try {
    res.json({
      user: {
        id: req.user.id,
        name: req.user.name,
        email: req.user.email,
        phone: req.user.phone,
        address: req.user.address,
        role: req.user.role
      }
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Update user profile (protected route)
router.put('/profile', protect, async (req, res) => {
  try {
    const { name, phone, address } = req.body

    const user = await User.findByPk(req.user.id)

    if (name) user.name = name
    if (phone) user.phone = phone
    if (address) user.address = address

    await user.save()

    res.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role
      }
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Admin routes

// Create user (admin only) - Must come before GET '/' route
router.post('/', protect, adminOnly, async (req, res) => {
  try {
    const { name, email, password, phone, role } = req.body

    // Validation
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Please provide all required fields' })
    }

    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters' })
    }

    const existingUser = await User.findOne({ where: { email } })
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' })
    }

    const user = await User.create({ 
      name, 
      email, 
      password,
      phone: phone || null,
      role: role || 'user'
    })

    res.status(201).json({
      message: 'User created successfully',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role
      }
    })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// Get all users (admin only)
router.get('/', protect, adminOnly, async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'name', 'email', 'phone', 'role', 'createdAt'],
      order: [['createdAt', 'DESC']]
    })

    res.json({ users })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Update user (admin only)
router.put('/:id', protect, adminOnly, async (req, res) => {
  try {
    const { name, email, phone, password, role } = req.body
    const userId = req.params.id

    const user = await User.findByPk(userId)
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    // Check if email is being changed and if it already exists
    if (email && email !== user.email) {
      const existingUser = await User.findOne({ where: { email } })
      if (existingUser) {
        return res.status(400).json({ message: 'Email already exists' })
      }
      user.email = email
    }

    if (name) user.name = name
    if (phone !== undefined) user.phone = phone || null
    if (role && ['user', 'admin'].includes(role)) user.role = role
    
    // Only update password if provided
    if (password && password.trim().length > 0) {
      if (password.length < 6) {
        return res.status(400).json({ message: 'Password must be at least 6 characters' })
      }
      user.password = password
    }

    await user.save()

    res.json({
      message: 'User updated successfully',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role
      }
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Update user role (admin only)
router.patch('/:id/role', protect, adminOnly, async (req, res) => {
  try {
    const { role } = req.body
    const userId = req.params.id

    if (!['user', 'admin'].includes(role)) {
      return res.status(400).json({ message: 'Invalid role' })
    }

    const user = await User.findByPk(userId)
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    user.role = role
    await user.save()

    res.json({ message: 'User role updated successfully' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Delete user (admin only)
router.delete('/:id', protect, adminOnly, async (req, res) => {
  try {
    const userId = req.params.id

    // Prevent admin from deleting themselves
    if (userId == req.user.id) {
      return res.status(400).json({ message: 'Cannot delete your own account' })
    }

    const user = await User.findByPk(userId)
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    // Prevent deleting other admins
    if (user.role === 'admin') {
      return res.status(400).json({ message: 'Cannot delete admin users' })
    }

    await user.destroy()

    res.json({ message: 'User deleted successfully' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

export default router