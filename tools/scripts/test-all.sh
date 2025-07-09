#!/bin/bash

# Test All Applications
# This script runs all tests for the movie database application

set -e

echo "🧪 Running all tests for Movie Database application..."

# Function to print colored output
print_status() {
    echo -e "\033[1;34m$1\033[0m"
}

print_success() {
    echo -e "\033[1;32m$1\033[0m"
}

print_error() {
    echo -e "\033[1;31m$1\033[0m"
}

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    print_error "❌ Error: package.json not found. Please run this script from the project root."
    exit 1
fi

# Install dependencies if needed
print_status "📦 Installing dependencies..."
npm ci

# Test Backend
print_status "🔧 Testing Backend..."
cd apps/backend

# Generate Prisma client
print_status "🔄 Generating Prisma client..."
npx prisma generate

# Run backend tests
print_status "🧪 Running backend unit tests..."
npm run test:cov

print_success "✅ Backend tests completed!"
cd ../..

# Test Frontend
print_status "⚛️  Testing Frontend..."
cd apps/frontend

# Run frontend tests
print_status "🧪 Running frontend tests..."
npm run test:coverage

print_success "✅ Frontend tests completed!"
cd ../..

# Lint all applications
print_status "🔍 Running linting checks..."

# Lint backend
print_status "🔧 Linting backend..."
cd apps/backend
npm run lint
cd ../..

# Lint frontend
print_status "⚛️  Linting frontend..."
cd apps/frontend
npm run lint
cd ../..

# Type checking
print_status "📝 Running type checks..."
cd apps/frontend
npm run check-types
cd ../..

print_success "🎉 All tests and checks completed successfully!"

# Generate test summary
print_status "📊 Test Summary:"
echo "✅ Backend unit tests: PASSED"
echo "✅ Frontend tests: PASSED"
echo "✅ Backend linting: PASSED"
echo "✅ Frontend linting: PASSED"
echo "✅ Type checking: PASSED"

echo ""
print_success "🚀 Ready for deployment!"