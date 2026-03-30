import { pool } from '../config/database.js'

/*
  GET /api/custom-items
  Get all custom items
*/
const getAllCustomItems = async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM custom_items ORDER BY id ASC'
    )
    res.status(200).json(result.rows)
  } catch (error) {
    console.error('Error getting custom items:', error)
    res.status(500).json({ error: 'Server error while fetching items' })
  }
}

/*
  GET /api/custom-items/:id
  Get one custom item by ID
*/
const getCustomItemById = async (req, res) => {
  const { id } = req.params

  try {
    const result = await pool.query(
      'SELECT * FROM custom_items WHERE id = $1',
      [id]
    )

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Custom item not found' })
    }

    res.status(200).json(result.rows[0])
  } catch (error) {
    console.error('Error getting custom item:', error)
    res.status(500).json({ error: 'Server error while fetching item' })
  }
}

/*
  POST /api/custom-items
  Create a new custom item
*/
const createCustomItem = async (req, res) => {
  const { name, color, wheels, interior, spoiler, price, image_url } = req.body

  try {
    // Basic validation
    if (!name || !color || !wheels || !interior || price == null) {
      return res.status(400).json({
        error: 'Missing required fields'
      })
    }

    // Example impossible combo rule
    // (you can customize this for your project)
    if (color === 'pink' && wheels === 'monster-truck') {
      return res.status(400).json({
        error: 'That feature combination is not possible.'
      })
    }

    const result = await pool.query(
      `
      INSERT INTO custom_items 
      (name, color, wheels, interior, spoiler, price, image_url)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *
      `,
      [name, color, wheels, interior, spoiler, price, image_url]
    )

    res.status(201).json(result.rows[0])
  } catch (error) {
    console.error('Error creating custom item:', error)
    res.status(500).json({ error: 'Server error while creating item' })
  }
}

/*
  PUT /api/custom-items/:id
  Update an existing custom item
*/
const updateCustomItem = async (req, res) => {
  const { id } = req.params
  const { name, color, wheels, interior, spoiler, price, image_url } = req.body

  try {
    // Validation
    if (!name || !color || !wheels || !interior || price == null) {
      return res.status(400).json({
        error: 'Missing required fields'
      })
    }

    // Example impossible combo rule
    if (color === 'pink' && wheels === 'monster-truck') {
      return res.status(400).json({
        error: 'That feature combination is not possible.'
      })
    }

    const result = await pool.query(
      `
      UPDATE custom_items
      SET name = $1,
          color = $2,
          wheels = $3,
          interior = $4,
          spoiler = $5,
          price = $6,
          image_url = $7
      WHERE id = $8
      RETURNING *
      `,
      [name, color, wheels, interior, spoiler, price, image_url, id]
    )

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Custom item not found' })
    }

    res.status(200).json(result.rows[0])
  } catch (error) {
    console.error('Error updating custom item:', error)
    res.status(500).json({ error: 'Server error while updating item' })
  }
}

/*
  DELETE /api/custom-items/:id
  Delete a custom item
*/
const deleteCustomItem = async (req, res) => {
  const { id } = req.params

  try {
    const result = await pool.query(
      'DELETE FROM custom_items WHERE id = $1 RETURNING *',
      [id]
    )

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Custom item not found' })
    }

    res.status(200).json({ message: 'Custom item deleted successfully' })
  } catch (error) {
    console.error('Error deleting custom item:', error)
    res.status(500).json({ error: 'Server error while deleting item' })
  }
}

export {
  getAllCustomItems,
  getCustomItemById,
  createCustomItem,
  updateCustomItem,
  deleteCustomItem
}