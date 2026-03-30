import express from 'express'
import {
  getAllCustomItems,
  getCustomItemById,
  createCustomItem,
  updateCustomItem,
  deleteCustomItem
} from '../controllers/customItems.js'

const router = express.Router()

// GET all custom items
router.get('/', getAllCustomItems)

// GET one custom item by id
router.get('/:id', getCustomItemById)

// POST create a new custom item
router.post('/', createCustomItem)

// PUT update an existing custom item
router.put('/:id', updateCustomItem)

// DELETE a custom item
router.delete('/:id', deleteCustomItem)

export default router