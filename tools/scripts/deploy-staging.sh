#!/bin/bash

# Deploy to Staging Environment
# This script deploys the application to a staging environment

set -e

echo "🚀 Deploying Movie Database to Staging..."

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

print_warning() {
    echo -e "\033[1;33m$1\033[0m"
}

# Environment variables (should be set in CI/CD)
STAGING_HOST=${STAGING_HOST:-"staging.movie-app.com"}
STAGING_USER=${STAGING_USER:-"deploy"}
DEPLOY_PATH=${DEPLOY_PATH:-"/var/www/movie-app"}

print_status "🔧 Deployment Configuration:"
echo "   Host: $STAGING_HOST"
echo "   User: $STAGING_USER"
echo "   Path: $DEPLOY_PATH"

# Pre-deployment checks
print_status "🔍 Running pre-deployment checks..."

# Check if builds exist
if [ ! -d "apps/backend/dist" ]; then
    print_error "❌ Backend build not found! Run 'npm run build' first."
    exit 1
fi

if [ ! -d "apps/frontend/.next" ]; then
    print_error "❌ Frontend build not found! Run 'npm run build' first."
    exit 1
fi

print_success "✅ Build artifacts found"

# Create deployment package
print_status "📦 Creating deployment package..."
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
PACKAGE_NAME="movie-app-staging-${TIMESTAMP}.tar.gz"

tar -czf $PACKAGE_NAME \
    apps/backend/dist/ \
    apps/frontend/.next/ \
    apps/backend/package.json \
    apps/backend/prisma/ \
    docker-compose.yml \
    --exclude="node_modules" \
    --exclude=".git"

print_success "✅ Package created: $PACKAGE_NAME"

# Deploy using Docker Compose (simulated)
print_status "🐳 Deploying with Docker Compose..."

# This would typically involve:
# 1. SCP the package to staging server
# 2. Extract and update application files
# 3. Update environment variables
# 4. Run database migrations
# 5. Restart services

echo "📋 Deployment steps (simulated):"
echo "   1. 📤 Upload package to staging server"
echo "   2. 📂 Extract application files"
echo "   3. 🔄 Update environment configuration"
echo "   4. 🗄️  Run database migrations"
echo "   5. 🔄 Restart application services"
echo "   6. 🧪 Run health checks"

# Simulate deployment steps
for i in {1..6}; do
    echo -n "   Step $i: "
    sleep 1
    print_success "✅ Completed"
done

# Health checks
print_status "🏥 Running health checks..."
echo "   ✅ Backend API: Healthy"
echo "   ✅ Frontend: Responsive"
echo "   ✅ Database: Connected"

# Cleanup
print_status "🧹 Cleaning up..."
rm -f $PACKAGE_NAME
print_success "✅ Cleanup completed"

print_success "🎉 Staging deployment completed successfully!"
echo ""
print_status "📍 Staging Environment:"
echo "   🌐 Frontend: https://staging.movie-app.com"
echo "   🔧 Backend API: https://api-staging.movie-app.com"
echo "   📊 Admin: https://admin-staging.movie-app.com"

print_warning "⚠️  Note: This is a simulated deployment for demonstration."
print_warning "   In a real environment, configure actual deployment targets."