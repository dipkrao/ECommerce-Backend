#!/bin/bash

echo "🚀 Setting up Ecommerce Backend API..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if MongoDB is running
if ! pgrep -x "mongod" > /dev/null; then
    echo "⚠️  MongoDB is not running. Please start MongoDB first."
    echo "   On macOS: brew services start mongodb-community"
    echo "   On Ubuntu: sudo systemctl start mongod"
    echo "   Or run: mongod"
    exit 1
fi

echo "✅ Prerequisites check passed"

# Install backend dependencies
echo "📦 Installing backend dependencies..."
npm install



# Create uploads directory
echo "📁 Creating uploads directory..."
mkdir -p uploads/products

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    echo "🔧 Creating .env file..."
    cat > .env << EOF
PORT=5000
MONGODB_URI=mongodb://localhost:27017/ecommerce-admin
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
NODE_ENV=development
EOF
    echo "⚠️  Please update the JWT_SECRET in .env file for production use"
fi

# Create admin user
echo "👤 Creating admin user..."
npm run create-admin

echo ""
echo "🎉 Backend setup completed successfully!"
echo ""
echo "📋 Next steps:"
echo "1. Start the backend server: npm run dev"
echo "2. The API will be available at: http://localhost:5000"
echo "3. Create admin user: npm run create-admin"
echo "4. Login credentials: admin@example.com / admin123"
echo ""
echo "🔒 Remember to change the default admin credentials in production!"
echo ""
echo "💡 To use the admin panel, see the ECommerce-Admin-Panel project!"
