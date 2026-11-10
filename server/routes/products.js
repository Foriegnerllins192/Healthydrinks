import express from 'express';
import { Pool } from 'pg';

const router = express.Router();
const pool = new Pool();

// Get all products
router.get('/', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM products');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get single product
router.get('/:id', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM products WHERE id = $1', [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Product not found' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create product (Admin only)
router.post('/', async (req, res) => {
  const { name, description, price, category, image_url, stock_quantity } = req.body;
  try {
    const { rows } = await pool.query(
      'INSERT INTO products (name, description, price, category, image_url, stock_quantity) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [name, description, price, category, image_url, stock_quantity]
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update product (Admin only)
router.patch('/:id', async (req, res) => {
  const { name, description, price, category, image_url, stock_quantity } = req.body;
  try {
    const { rows } = await pool.query(
      'UPDATE products SET name = $1, description = $2, price = $3, category = $4, image_url = $5, stock_quantity = $6 WHERE id = $7 RETURNING *',
      [name, description, price, category, image_url, stock_quantity, req.params.id]
    );
    if (rows.length === 0) return res.status(404).json({ error: 'Product not found' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete product (Admin only)
router.delete('/:id', async (req, res) => {
  try {
    const { rowCount } = await pool.query('DELETE FROM products WHERE id = $1', [req.params.id]);
    if (rowCount === 0) return res.status(404).json({ error: 'Product not found' });
    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
