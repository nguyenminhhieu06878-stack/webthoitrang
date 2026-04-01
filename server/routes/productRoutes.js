import express from 'express'
import { Op } from 'sequelize'
import Product from '../models/Product.js'

const router = express.Router()

// Get all products
router.get('/', async (req, res) => {
  try {
    const { category, featured, search, sort } = req.query
    let where = {}

    if (category) where.category = category
    if (featured) where.featured = true
    if (search) {
      where[Op.or] = [
        { name: { [Op.like]: `%${search}%` } },
        { description: { [Op.like]: `%${search}%` } }
      ]
    }

    let order = []
    if (sort === 'price-asc') order = [['price', 'ASC']]
    if (sort === 'price-desc') order = [['price', 'DESC']]
    if (sort === 'newest') order = [['createdAt', 'DESC']]

    const products = await Product.findAll({ where, order })

    res.json({ products })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Get single product
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params
    let product
    
    // Check if id is a number or a code
    if (isNaN(id)) {
      // Search by code
      product = await Product.findOne({ where: { code: id } })
    } else {
      // Search by ID
      product = await Product.findByPk(id)
    }
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' })
    }
    res.json(product)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Create product (Admin only - add auth middleware later)
router.post('/', async (req, res) => {
  try {
    const product = await Product.create(req.body)
    res.status(201).json(product)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// Update product
router.put('/:id', async (req, res) => {
  try {
    const [updated] = await Product.update(req.body, {
      where: { id: req.params.id }
    })
    if (!updated) {
      return res.status(404).json({ message: 'Product not found' })
    }
    const product = await Product.findByPk(req.params.id)
    res.json(product)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// Delete product
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Product.destroy({
      where: { id: req.params.id }
    })
    if (!deleted) {
      return res.status(404).json({ message: 'Product not found' })
    }
    res.json({ message: 'Product deleted successfully' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

export default router
