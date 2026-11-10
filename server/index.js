import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { Pool } from 'pg';
import jwt from 'jsonwebtoken';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Database configuration
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT || '5432'),
});

// Middleware
app.use(cors());
app.use(express.json());

// Authentication middleware
const authenticate = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Access denied' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (err) {
    res.status(400).json({ error: 'Invalid token' });
  }
};

// Admin middleware
const isAdmin = (req, res, next) => {
  // Implement admin check logic
  // Placeholder: Assume user with ID 1 is admin
  if (req.userId !== 1) return res.status(403).json({ error: 'Admin access required' });
  next();
};

// Routes
import productRoutes from './routes/products.js';
import authRoutes from './routes/auth.js';
import cartRoutes from './routes/cart.js';
import orderRoutes from './routes/orders.js';
import adminRoutes from './routes/admin.js';

app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/cart', authenticate, cartRoutes);
app.use('/api/orders', authenticate, orderRoutes);
app.use('/api/admin', authenticate, isAdmin, adminRoutes);

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
