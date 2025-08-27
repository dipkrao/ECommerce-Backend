# Ecommerce Backend API

A robust Node.js/Express backend API for ecommerce applications with MongoDB integration.

## Features

- **Authentication & Authorization**: JWT-based auth with role-based access control
- **Product Management**: CRUD operations for products with image uploads
- **Category Management**: Hierarchical category system
- **Order Management**: Complete order lifecycle management
- **User Management**: Admin and user roles
- **File Uploads**: Multer-based image upload system
- **MongoDB Integration**: Mongoose ODM with optimized schemas

## Project Structure

```
ECommerce-Backend/
├── src/
│   ├── config/          # Configuration files
│   ├── controllers/     # Route controllers
│   ├── middleware/      # Custom middleware
│   ├── models/          # MongoDB schemas
│   ├── routes/          # API routes
│   ├── utils/           # Utility functions
│   ├── scripts/         # Utility scripts
│   └── server.js        # Main server file
├── package.json         # Dependencies
├── setup.sh            # Setup script
└── README.md           # This file
```

## Prerequisites

- Node.js (v16 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn

## Installation

### 1. Install dependencies
```bash
npm install
```

### 2. Environment Setup
Create a `.env` file in the root directory:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/ecommerce-admin
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
NODE_ENV=development
```

### 3. Start MongoDB
Make sure MongoDB is running on your system:
```bash
# On macOS with Homebrew
brew services start mongodb-community

# On Ubuntu/Debian
sudo systemctl start mongod

# Or start manually
mongod
```

### 4. Create Admin User
```bash
npm run create-admin
```

### 5. Start the Server
```bash
# Development mode with nodemon
npm run dev

# Or production mode
npm start
```

The backend will be available at `http://localhost:5000`

## API Endpoints

### Authentication
- `POST /api/auth/login` - Admin login
- `POST /api/auth/logout` - Logout
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/profile` - Update profile
- `PUT /api/auth/change-password` - Change password

### Products
- `GET /api/products` - Get all products (with pagination & filters)
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create new product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product
- `PATCH /api/products/:id/toggle-status` - Toggle product status
- `GET /api/products/stats` - Get product statistics

## Database Models

### User
- username, email, password
- role (admin/user)
- isActive, profilePicture, lastLogin

### Product
- name, description, price, comparePrice
- category, images, stock, sku
- tags, isActive, isFeatured
- weight, dimensions, variants
- ratings, averageRating, totalReviews

### Category
- name, description, slug
- parent (for hierarchical categories)
- image, isActive, sortOrder
- metaTitle, metaDescription

### Order
- orderNumber, customer, items
- subtotal, tax, shipping, discount, total
- status, paymentStatus, paymentMethod
- shippingAddress, billingAddress
- trackingNumber, estimatedDelivery

## Development

```bash
# Run in development mode with auto-restart
npm run dev

# Create admin user
npm run create-admin

# Run tests
npm test
```

## File Uploads

The system supports image uploads for products:
- Maximum file size: 5MB
- Supported formats: JPG, PNG, GIF, WebP
- Files are stored in `uploads/products/` directory
- Automatic file naming with unique suffixes

## Security Features

- JWT-based authentication
- Password hashing with bcrypt
- Role-based access control
- Input validation and sanitization
- CORS configuration
- File upload security

## Demo Credentials

**Admin Login:**
- Email: admin@example.com
- Password: admin123

*Note: These are demo credentials. Change them in production.*

## License

This project is licensed under the ISC License.
