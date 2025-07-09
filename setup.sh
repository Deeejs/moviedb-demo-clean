#!/bin/bash

# Movie Database Setup Script
# This script sets up the entire application from scratch

echo "🎬 Movie Database Setup Script"
echo "=============================="

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install Node.js and npm first."
    exit 1
fi

# Check if PostgreSQL is running (basic check)
if ! command -v psql &> /dev/null; then
    echo "⚠️  PostgreSQL command-line tools not found. Make sure PostgreSQL is installed."
    echo "   You can still continue if you have a remote database configured."
fi

# Install dependencies
echo ""
echo "📦 Installing dependencies..."
npm install

# Check for root .env file
if [ ! -f ".env" ]; then
    echo ""
    echo "📝 Creating root .env file from example..."
    cp .env.example .env
    echo "✅ Created .env file"
fi

# Check for backend .env file
if [ ! -f "apps/backend/.env" ]; then
    echo ""
    echo "📝 Creating backend .env file from example..."
    cp apps/backend/.env.example apps/backend/.env
    echo "✅ Created apps/backend/.env"
fi

# Check for frontend .env.local file
if [ ! -f "apps/frontend/.env.local" ]; then
    echo ""
    echo "📝 Creating frontend .env.local file from example..."
    cp apps/frontend/.env.local.example apps/frontend/.env.local
    echo "✅ Created apps/frontend/.env.local"
fi

# Run database migrations
echo ""
echo "🗄️  Setting up database..."
echo "   Running migrations..."
cd apps/backend
npx prisma migrate dev --name init --skip-seed

# Run database seed
echo ""
echo "🌱 Seeding database with sample data..."
npx prisma db seed

# Return to root directory
cd ../..

echo ""
echo "✅ Setup complete!"
echo ""
echo "🚀 To start the application, run:"
echo "   Local development: npm run dev"
echo "   Docker (v2): docker compose up"
echo "   Docker (v1): docker-compose up"
echo ""
echo "📍 The application will be available at:"
echo "   - Frontend: http://localhost:3000"
echo "   - Backend API: http://localhost:4000"
echo ""