import express from 'express';
import { Pool } from 'pg';

const router = express.Router();
const pool = new Pool();

// Create order from cart
router.post('/', async (req, res) => {
  const { items, total_amount, delivery_address, city, notes } = req.body;
  try {
    // Create order
    const { rows: orderRows } = await pool.query(
      'INSERT INTO orders (user_id, total_amount, status) VALUES ($1, $2, $3) RETURNING *',
      [req.userId, total_amount, 'Pending']
    );
    
    const orderId = orderRows[0].id;
    
    // Create order items
    for (const item of items) {
      await pool.query(
        'INSERT INTO order_items (order_id, product_id, quantity, price) VALUES ($1, $2, $3, $4)',
        [orderId, item.product_id, item.quantity, item.price]
      );
    }
    
    // Clear cart
    await pool.query('DELETE FROM cart WHERE user_id = $1', [req.userId]);
    
    res.status(201).json({ message: 'Order placed successfully', orderId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get user's orders
router.get('/', async (req, res) => {
  try {
    const { rows } = await pool.query(
      `SELECT o.*, 
              (SELECT COUNT(*) FROM order_items WHERE order_id = o.id) as item_count
       FROM orders o
       WHERE o.user_id = $1
       ORDER BY o.created_at DESC`,
      [req.userId]
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get order details
router.get('/:id', async (req, res) => {
  try {
    const { rows } = await pool.query(
      `SELECT o.*, p.name, p.image_url
       FROM orders o
       JOIN order_items oi ON o.id = oi.order_id
       JOIN products p ON oi.product_id = p.id
       WHERE o.id = $1`,
      [req.params.id]
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
