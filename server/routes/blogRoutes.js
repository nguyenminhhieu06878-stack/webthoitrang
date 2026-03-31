import express from 'express'
import Blog from '../models/Blog.js'
import { Op } from 'sequelize'

const router = express.Router()

// Get all blogs with pagination and filtering
router.get('/', async (req, res) => {
  try {
    const { featured, category, page = 1, limit = 9 } = req.query
    
    let whereClause = {}
    if (featured === 'true') {
      whereClause.featured = true
    }
    if (category) {
      whereClause.category = category
    }

    const offset = (page - 1) * limit

    const { count, rows } = await Blog.findAndCountAll({
      where: whereClause,
      order: [['createdAt', 'DESC']],
      limit: parseInt(limit),
      offset: parseInt(offset)
    })

    res.json({
      blogs: rows,
      totalPages: Math.ceil(count / limit),
      currentPage: parseInt(page),
      totalBlogs: count
    })
  } catch (error) {
    console.error('Error fetching blogs:', error)
    res.status(500).json({ message: 'Error fetching blogs', error: error.message })
  }
})

// Get single blog by slug
router.get('/:slug', async (req, res) => {
  try {
    const blog = await Blog.findOne({ where: { slug: req.params.slug } })
    
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' })
    }

    // Increment views
    await blog.increment('views')

    res.json(blog)
  } catch (error) {
    console.error('Error fetching blog:', error)
    res.status(500).json({ message: 'Error fetching blog', error: error.message })
  }
})

// Search blogs
router.get('/search/:query', async (req, res) => {
  try {
    const { query } = req.params
    
    const blogs = await Blog.findAll({
      where: {
        [Op.or]: [
          { title: { [Op.like]: `%${query}%` } },
          { excerpt: { [Op.like]: `%${query}%` } },
          { category: { [Op.like]: `%${query}%` } }
        ]
      },
      order: [['createdAt', 'DESC']]
    })

    res.json(blogs)
  } catch (error) {
    console.error('Error searching blogs:', error)
    res.status(500).json({ message: 'Error searching blogs', error: error.message })
  }
})

// Create new blog (admin only - add auth middleware later)
router.post('/', async (req, res) => {
  try {
    const blog = await Blog.create(req.body)
    res.status(201).json(blog)
  } catch (error) {
    console.error('Error creating blog:', error)
    res.status(500).json({ message: 'Error creating blog', error: error.message })
  }
})

// Update blog (admin only - add auth middleware later)
router.put('/:id', async (req, res) => {
  try {
    const blog = await Blog.findByPk(req.params.id)
    
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' })
    }

    await blog.update(req.body)
    res.json(blog)
  } catch (error) {
    console.error('Error updating blog:', error)
    res.status(500).json({ message: 'Error updating blog', error: error.message })
  }
})

// Delete blog (admin only - add auth middleware later)
router.delete('/:id', async (req, res) => {
  try {
    const blog = await Blog.findByPk(req.params.id)
    
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' })
    }

    await blog.destroy()
    res.json({ message: 'Blog deleted successfully' })
  } catch (error) {
    console.error('Error deleting blog:', error)
    res.status(500).json({ message: 'Error deleting blog', error: error.message })
  }
})

export default router
