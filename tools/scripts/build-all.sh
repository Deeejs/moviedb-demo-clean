#!/bin/bash

# Build All Applications
# This script builds all applications for production deployment

set -e

echo "🏗️  Building all applications for Movie Database..."

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

# Install dependencies
print_status "📦 Installing dependencies..."
npm ci

# Build using Turbo
print_status "🚀 Building all applications with Turbo..."
npx turbo build

print_success "✅ All applications built successfully!"

# Check build outputs
print_status "📁 Checking build outputs..."

# Check backend build
if [ -d "apps/backend/dist" ]; then
    print_success "✅ Backend build found at apps/backend/dist"
else
    print_error "❌ Backend build not found!"
    exit 1
fi

# Check frontend build
if [ -d "apps/frontend/.next" ]; then
    print_success "✅ Frontend build found at apps/frontend/.next"
else
    print_error "❌ Frontend build not found!"
    exit 1
fi

# Generate build summary
print_status "📊 Build Summary:"
echo "✅ Backend: Built successfully"
echo "✅ Frontend: Built successfully"
echo "✅ Shared types: Compiled"
echo "✅ UI components: Compiled"

echo ""
print_success "🎉 All builds completed successfully!"
echo "📦 Artifacts ready for deployment:"
echo "   - Backend: apps/backend/dist/"
echo "   - Frontend: apps/frontend/.next/"