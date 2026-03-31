import express from 'express'
import Lookbook from '../models/Lookbook.js'

const router = express.Router()

// Get all lookbook images
router.get('/', async (req, res) => {
  try {
    const { featured } = req.query
    
    let whereClause = {}
    if (featured === 'true') {
      whereClause.featured = true
    }

    const lookbooks = await Lookbook.findAll({
      where: whereClause,
      order: [['order', 'ASC'], ['createdAt', 'DESC']]
    })

    res.json(lookbooks)
  } catch (error) {
    console.error('Error fetching lookbooks:', error)
    res.status(500).json({ message: 'Error fetching lookbooks', error: error.message })
  }
})

// Get single lookbook by ID
router.get('/:id', async (req, res) => {
  try {
    const lookbook = await Lookbook.findByPk(req.params.id)
    
    if (!lookbook) {
      return res.status(404).json({ message: 'Lookbook not found' })
    }

    res.json(lookbook)
  } catch (error) {
    console.error('Error fetching lookbook:', error)
    res.status(500).json({ message: 'Error fetching lookbook', error: error.message })
  }
})

// Create new lookbook (admin only - add auth middleware later)
router.post('/', async (req, res) => {
  try {
    const lookbook = await Lookbook.create(req.body)
    res.status(201).json(lookbook)
  } catch (error) {
    console.error('Error creating lookbook:', error)
    res.status(500).json({ message: 'Error creating lookbook', error: error.message })
  }
})

// Update lookbook (admin only - add auth middleware later)
router.put('/:id', async (req, res) => {
  try {
    const lookbook = await Lookbook.findByPk(req.params.id)
    
    if (!lookbook) {
      return res.status(404).json({ message: 'Lookbook not found' })
    }

    await lookbook.update(req.body)
    res.json(lookbook)
  } catch (error) {
    console.error('Error updating lookbook:', error)
    res.status(500).json({ message: 'Error updating lookbook', error: error.message })
  }
})

// Delete lookbook (admin only - add auth middleware later)
router.delete('/:id', async (req, res) => {
  try {
    const lookbook = await Lookbook.findByPk(req.params.id)
    
    if (!lookbook) {
      return res.status(404).json({ message: 'Lookbook not found' })
    }

    await lookbook.destroy()
    res.json({ message: 'Lookbook deleted successfully' })
  } catch (error) {
    console.error('Error deleting lookbook:', error)
    res.status(500).json({ message: 'Error deleting lookbook', error: error.message })
  }
})

export default router
