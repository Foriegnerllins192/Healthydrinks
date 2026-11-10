# Healthy Drinks E-Commerce Platform

## Overview
A premium online store for natural healthy beverages with admin management capabilities.

## Features
- Responsive design for all devices
- Product catalog with categories
- Secure shopping cart & checkout (prepared)
- User account UI
- Admin dashboard UI
- Newsletter subscription UI

## Tech Stack
- **Frontend:** React, Vite, Tailwind CSS v4
- **Backend:** Node.js, Express
- **Database:** PostgreSQL (schema in `database_schema.sql`)
- **Auth:** JWT (prepared)

## Setup
1. Install dependencies: `npm install`
2. (Optional, for backend) Create `server/.env` with DB/JWT values (see `server/.env`)
3. (Optional) Create DB and run `database_schema.sql` in PostgreSQL

## Run
- **Frontend (Vite):** `npm run dev` → open the Local URL shown (e.g. http://localhost:5173/)
- **Backend API:** `npm run server` (or `npm run dev:server` for watch) → http://localhost:5000
- Run frontend and backend in **separate terminals**. Vite proxies `/api` to `http://localhost:5000`.

## Notes
- Frontend works standalone with sample products and localStorage cart; `/api/products` is used when the backend is running.
- Mobile Money/payment processing is not integrated (no simulated successful payments).

## License
MIT
