# API Architecture

## Base URL
`https://api.healthydrinks.com`

## Authentication
- POST `/auth/register` - User registration
- POST `/auth/login` - User login
- GET `/auth/me` - Get current user (Protected)

## Products
- GET `/products` - List all products
- GET `/products/:id` - Get single product
- POST `/products` - Create product (Admin)
- PATCH `/products/:id` - Update product (Admin)
- DELETE `/products/:id` - Delete product (Admin)

## Cart
- GET `/cart` - Get user's cart
- POST `/cart` - Add item to cart
- PATCH `/cart/:itemId` - Update cart item quantity
- DELETE `/cart/:itemId` - Remove cart item

## Orders
- POST `/orders` - Create order from cart
- GET `/orders` - List user's orders
- GET `/orders/:id` - Get order details
- PATCH `/orders/:id/status` - Update order status (Admin)

## Admin
- GET `/admin/dashboard` - Admin overview
- GET `/admin/users` - List users
- GET `/admin/orders` - List all orders

## Subscribers
- POST `/subscribers` - Subscribe to newsletter

## Error Handling
Standard HTTP status codes with JSON error objects.
