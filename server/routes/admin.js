import express from 'express';
import { Pool } from 'pg';

const router = express.Router();
const pool = new Pool();

// Admin dashboard overview
router.get('/dashboard', async (req, res) => {
  try {
    // Get total orders
    const { rows: orderRows } = await pool.query(
      'SELECT COUNT(*) as total FROM orders'
    );
    
    // Get total sales
    const { rows: salesRows } = await pool.query(
      'SELECT SUM(total_amount) as total_sales FROM orders WHERE status != \'Cancelled\''
    );
    
    // Get recent orders
    const { rows: recentOrders } = await pool.query(
      `SELECT o.*, u.name as customer_name
       FROM orders o
       JOIN users u ON o.user_id = u.id
       ORDER BY o.created_at DESC
       LIMIT 10`
    );
    
    res.json({
      total_orders: orderRows[0].total,
      total_sales: salesRows[0].total_sales || 0,
      recent_orders: recentOrders
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all orders (Admin)
router.get('/orders', async (req, res) => {
  try {
    const { rows } = await pool.query(
      `SELECT o.*, u.name as customer_name, u.email, u.phone
       FROM orders o
       JOIN users u ON o.user_id = u.id
       ORDER BY o.created_at DESC`
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update order status (Admin)
router.patch('/orders/:id/status', async (req, res) => {
  const { status } = req.body;
  try {
    const { rows } = await pool.query(
      'UPDATE orders SET status = $1 WHERE id = $2 RETURNING *',
      [status, req.params.id]
    );
    if (rows.length === 0) return res.status(404).json({ error: 'Order not found' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all users (Admin)
router.get('/users', async (req, res) => {
  try {
    const { rows } = await pool.query(
      'SELECT id, name, email, phone, created_at FROM users ORDER BY created_at DESC'
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
