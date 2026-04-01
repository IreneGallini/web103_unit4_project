import { pool } from './database.js'

const createTables = async () => {
  try {
    await pool.query(`
      DROP TABLE IF EXISTS custom_items;

      CREATE TABLE custom_items (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        color TEXT NOT NULL,
        wheels TEXT NOT NULL,
        interior TEXT NOT NULL,
        spoiler BOOLEAN DEFAULT false,
        price INTEGER NOT NULL,
        image_url TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `)

    console.log("custom_items table created successfully")
  } catch (error) {
    console.error("Error creating tables:", error)
  } finally {
    await pool.end()
  }
}

createTables()

