#!/bin/bash
# Vercel Build Script for Laravel

echo "Installing Composer dependencies..."
composer install --no-dev --optimize-autoloader

echo "Setting up Laravel..."
php artisan config:clear
php artisan route:clear
php artisan view:clear

echo "Creating required directories..."
mkdir -p /tmp/storage/framework/{sessions,views,cache}
mkdir -p /tmp/storage/logs

echo "Setting permissions..."
chmod -R 777 /tmp/storage

echo "Build completed successfully!"
