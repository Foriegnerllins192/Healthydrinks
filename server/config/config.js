import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Database configuration
export const DB_CONFIG = {
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT || '5432'),
};

// JWT configuration
export const JWT_CONFIG = {
  secret: process.env.JWT_SECRET || 'your-secret-key',
  expiresIn: '1d',
};

// Payment configuration
export const PAYMENT_CONFIG = {
  mobileMoneyProvider: process.env.MOBILE_MONEY_PROVIDER,
  mobileMoneyAPIKey: process.env.MOBILE_MONEY_API_KEY,
};

// Email configuration
export const EMAIL_CONFIG = {
  service: process.env.EMAIL_SERVICE,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
};

// Admin credentials
export const ADMIN_CREDENTIALS = {
  email: process.env.ADMIN_EMAIL,
  password: process.env.ADMIN_PASSWORD,
};

// Image storage configuration
export const IMAGE_STORAGE = {
  provider: process.env.IMAGE_STORAGE_PROVIDER,
  accessKeyId: process.env.IMAGE_STORAGE_ACCESS_KEY,
  secretAccessKey: process.env.IMAGE_STORAGE_SECRET_KEY,
  bucketName: process.env.IMAGE_STORAGE_BUCKET,
};

// Delivery configuration
export const DELIVERY_CONFIG = {
  deliveryFee: 10.00,
  deliveryZones: {
    'Accra': 10.00,
    'Tema': 15.00,
    'Kumasi': 20.00,
  },
};

// Product categories
export const PRODUCT_CATEGORIES = [
  'Fresh Juices',
  'Smoothies',
  'Detox Drinks',
  'Fruit Blends',
  'Wellness Drinks',
];

// Order statuses
export const ORDER_STATUSES = [
  'Pending',
  'Confirmed',
  'Processing',
  'Out for Delivery',
  'Delivered',
  'Cancelled',
];

// Brand colors
export const BRAND_COLORS = {
  deepGreen: '#174D32',
  freshGreen: '#38A852',
  orange: '#FF8C24',
  lightOrange: '#FFF0DF',
  cream: '#FFFDF6',
  darkText: '#202820',
  white: '#FFFFFF',
};

// Default product sizes
export const PRODUCT_SIZES = [
  '250ml',
  '500ml',
  '1L',
  '2L',
];
