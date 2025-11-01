#!/bin/bash

# ================================================
# Fix Composer Install - Existing Laravel Project
# ================================================
# Script ini untuk project Laravel yang sudah ada
# dan mengalami masalah GitHub authentication
# ================================================

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

print_step() {
    echo -e "${BLUE}🚀 $1${NC}"
}

print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

# Parse arguments
WITH_BREEZE=false
WITH_FILAMENT=false

while [[ "$#" -gt 0 ]]; do
    case $1 in
        --with-breeze) WITH_BREEZE=true ;;
        --with-filament) WITH_FILAMENT=true ;;
        *) echo "Unknown parameter: $1"; exit 1 ;;
    esac
    shift
done

# Increase Composer timeout
export COMPOSER_PROCESS_TIMEOUT=900

echo ""
echo "╔════════════════════════════════════════════════════════════╗"
echo "║     Fix Composer Install - Existing Laravel Project       ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""

# Check if composer.json exists
if [ ! -f composer.json ]; then
    print_error "File composer.json tidak ditemukan. Pastikan Anda berada di root project Laravel."
    exit 1
fi

# Step 1: Clear Composer cache
print_step "Membersihkan Composer cache"
composer clear-cache
print_success "Cache berhasil dibersihkan"
echo ""

# Step 2: Remove vendor directory
print_step "Menghapus direktori vendor lama"
if [ -d vendor ]; then
    rm -rf vendor
    print_success "Direktori vendor berhasil dihapus"
else
    print_warning "Direktori vendor tidak ditemukan"
fi
echo ""

# Step 3: Remove composer.lock
print_step "Menghapus composer.lock"
if [ -f composer.lock ]; then
    rm -f composer.lock
    print_success "composer.lock berhasil dihapus"
fi
echo ""

# Step 4: Install dependencies with --prefer-source
print_step "Menginstall dependencies dengan --prefer-source"
print_warning "Proses ini mungkin memakan waktu 10-15 menit..."
composer install --prefer-source --no-interaction
print_success "Dependencies berhasil diinstall"
echo ""

# Step 5: Generate key if needed
if ! grep -q "APP_KEY=base64:" .env 2>/dev/null; then
    print_step "Generate application key"
    php artisan key:generate
    print_success "Application key berhasil dibuat"
    echo ""
fi

# Step 6: Install Breeze (optional)
if [ "$WITH_BREEZE" = true ]; then
    print_step "Menginstall Laravel Breeze"
    composer require laravel/breeze --prefer-source --no-interaction
    php artisan breeze:install blade --dark
    print_success "Laravel Breeze berhasil diinstall"
    echo ""
fi

# Step 7: Install Filament (optional)
if [ "$WITH_FILAMENT" = true ]; then
    print_step "Menginstall Filament"
    composer require filament/filament:"^3.0" --prefer-source --no-interaction
    php artisan filament:install --panels
    print_success "Filament berhasil diinstall"
    echo ""
fi

# Step 8: Install NPM dependencies
if [ -f package.json ]; then
    print_step "Menginstall NPM dependencies"
    npm install
    print_success "NPM dependencies berhasil diinstall"
    echo ""
    
    # Step 9: Build assets
    print_step "Build frontend assets"
    npm run build
    print_success "Assets berhasil dibuild"
    echo ""
fi

# Step 10: Run migrations
read -p "Jalankan migrasi database? (y/n): " run_migration
if [ "$run_migration" = "y" ]; then
    print_step "Menjalankan migrasi database"
    php artisan migrate --seed
    print_success "Migrasi berhasil dijalankan"
    echo ""
fi

# Final message
echo ""
echo "╔════════════════════════════════════════════════════════════╗"
echo "║              🎉 INSTALASI BERHASIL! 🎉                    ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""
print_success "Semua dependencies berhasil diinstall!"
echo ""
echo "Untuk menjalankan aplikasi:"
echo "  php artisan serve"
echo ""
if [ -f package.json ]; then
    echo "Untuk menjalankan Vite dev server (terminal terpisah):"
    echo "  npm run dev"
    echo ""
fi
