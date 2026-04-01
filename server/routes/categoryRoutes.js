import express from 'express'
import Category from '../models/Category.js'
import Product from '../models/Product.js'

const router = express.Router()

// Get all categories
router.get('/', async (req, res) => {
  try {
    const categories = await Category.findAll({
      order: [['name', 'ASC']]
    })
    
    // Update product count for each category
    for (let category of categories) {
      const count = await Product.count({ where: { category: category.name } })
      if (count !== category.productCount) {
        await category.update({ productCount: count })
      }
    }
    
    res.json({ categories })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Get single category
router.get('/:id', async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id)
    if (!category) {
      return res.status(404).json({ message: 'Category not found' })
    }
    res.json(category)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Create category
router.post('/', async (req, res) => {
  try {
    const { name, slug, description } = req.body
    
    const category = await Category.create({
      name,
      slug,
      description,
      productCount: 0
    })
    
    res.status(201).json(category)
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      res.status(400).json({ message: 'Category name or slug already exists' })
    } else {
      res.status(500).json({ message: error.message })
    }
  }
})

// Update category
router.put('/:id', async (req, res) => {
  try {
    const { name, slug, description } = req.body
    const category = await Category.findByPk(req.params.id)
    
    if (!category) {
      return res.status(404).json({ message: 'Category not found' })
    }
    
    await category.update({ name, slug, description })
    res.json(category)
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      res.status(400).json({ message: 'Category name or slug already exists' })
    } else {
      res.status(500).json({ message: error.message })
    }
  }
})

// Delete category
router.delete('/:id', async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id)
    
    if (!category) {
      return res.status(404).json({ message: 'Category not found' })
    }
    
    // Check if category has products
    const productCount = await Product.count({ where: { category: category.name } })
    if (productCount > 0) {
      return res.status(400).json({ 
        message: `Cannot delete category with ${productCount} products. Please reassign or delete products first.` 
      })
    }
    
    await category.destroy()
    res.json({ message: 'Category deleted successfully' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

export default router
