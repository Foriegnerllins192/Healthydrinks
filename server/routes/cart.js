import express from 'express';
import { Pool } from 'pg';

const router = express.Router();
const pool = new Pool();

// Get user's cart
router.get('/', async (req, res) => {
  try {
    const { rows } = await pool.query(
      `SELECT c.*, p.name, p.price, p.image_url
       FROM cart c
       JOIN products p ON c.product_id = p.id
       WHERE c.user_id = $1`,
      [req.userId]
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add item to cart
router.post('/', async (req, res) => {
  const { product_id, quantity } = req.body;
  try {
    // Check if product exists
    const productCheck = await pool.query('SELECT * FROM products WHERE id = $1', [product_id]);
    if (productCheck.rows.length === 0) return res.status(404).json({ error: 'Product not found' });
    
    // Check if item already in cart
    const existingItem = await pool.query(
      'SELECT * FROM cart WHERE user_id = $1 AND product_id = $2',
      [req.userId, product_id]
    );
    
    if (existingItem.rows.length > 0) {
      // Update quantity if item exists
      const { rows } = await pool.query(
        'UPDATE cart SET quantity = quantity + $1 WHERE user_id = $2 AND product_id = $3 RETURNING *',
        [quantity, req.userId, product_id]
      );
      res.json(rows[0]);
    } else {
      // Add new item to cart
      const { rows } = await pool.query(
        'INSERT INTO cart (user_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING *',
        [req.userId, product_id, quantity]
      );
      res.status(201).json(rows[0]);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update cart item quantity
router.patch('/:itemId', async (req, res) => {
  const { quantity } = req.body;
  try {
    const { rows } = await pool.query(
      'UPDATE cart SET quantity = $1 WHERE id = $2 AND user_id = $3 RETURNING *',
      [quantity, req.params.itemId, req.userId]
    );
    if (rows.length === 0) return res.status(404).json({ error: 'Cart item not found' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Remove cart item
router.delete('/:itemId', async (req, res) => {
  try {
    const { rowCount } = await pool.query(
      'DELETE FROM cart WHERE id = $1 AND user_id = $2',
      [req.params.itemId, req.userId]
    );
    if (rowCount === 0) return res.status(404).json({ error: 'Cart item not found' });
    res.json({ message: 'Item removed from cart' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
