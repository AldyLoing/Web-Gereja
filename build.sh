#!/usr/bin/env bash
# Build script untuk Vercel deployment

set -e

echo "🚀 Starting Laravel build for Vercel..."

# Install composer dependencies
if [ -f "composer.json" ]; then
    echo "📦 Installing Composer dependencies..."
    composer install --no-dev --no-interaction --prefer-dist --optimize-autoloader
fi

# Create storage directories
echo "📁 Creating storage directories..."
mkdir -p storage/framework/{sessions,views,cache,testing}
mkdir -p storage/logs
mkdir -p bootstrap/cache

# Clear caches
echo "🧹 Clearing Laravel caches..."
php artisan config:clear || true
php artisan route:clear || true
php artisan view:clear || true
php artisan cache:clear || true

# Build assets with Vite
if [ -f "package.json" ]; then
    echo "🎨 Building frontend assets..."
    npm ci
    npm run build
fi

echo "✅ Build completed successfully!"
