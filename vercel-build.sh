#!/bin/bash

echo "🚀 Starting Vercel build for Laravel..."

# Install Composer dependencies
echo "📦 Installing Composer dependencies..."
composer install --no-dev --optimize-autoloader --no-interaction

# Create necessary directories
echo "📁 Creating storage directories..."
mkdir -p storage/framework/{sessions,views,cache}
mkdir -p storage/logs
mkdir -p bootstrap/cache

# Set permissions
echo "🔐 Setting permissions..."
chmod -R 755 storage bootstrap/cache

# Clear Laravel caches
echo "🧹 Clearing caches..."
php artisan config:clear || true
php artisan route:clear || true
php artisan view:clear || true

# Build frontend assets
echo "🎨 Building frontend assets..."
npm run build

echo "✅ Build completed successfully!"
