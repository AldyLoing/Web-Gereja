#!/bin/bash

# ============================================
# Setup Laravel 11 + Breeze + Filament Script
# ============================================
# Mengatasi masalah "Could not authenticate against github.com"
# dengan menggunakan --prefer-source
# ============================================

set -e  # Exit on error

# Colors for terminal output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
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

# Check if project name is provided
if [ -z "$1" ]; then
    print_error "Nama project tidak disediakan!"
    echo "Usage: bash setup-laravel.sh project-name"
    exit 1
fi

PROJECT_NAME=$1

# Check if composer is installed
if ! command -v composer &> /dev/null; then
    print_error "Composer tidak terinstall. Install Composer terlebih dahulu."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    print_error "NPM tidak terinstall. Install Node.js terlebih dahulu."
    exit 1
fi

# Increase Composer timeout to avoid process timeout
export COMPOSER_PROCESS_TIMEOUT=600

echo ""
echo "╔════════════════════════════════════════════════════════════╗"
echo "║        Setup Laravel 11 + Breeze + Filament               ║"
echo "║        Project: ${PROJECT_NAME}                           ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""

# Step 1: Create Laravel project
print_step "Membuat project Laravel: ${PROJECT_NAME}"
composer create-project --prefer-source laravel/laravel "$PROJECT_NAME"
print_success "Laravel berhasil dibuat"
echo ""

# Step 2: Enter project directory
cd "$PROJECT_NAME" || exit

# Step 3: Copy .env file
print_step "Menyalin file .env dari .env.example"
if [ ! -f .env ]; then
    cp .env.example .env
    print_success "File .env berhasil dibuat"
else
    print_warning "File .env sudah ada"
fi
echo ""

# Step 4: Generate application key
print_step "Generate application key"
php artisan key:generate
print_success "Application key berhasil dibuat"
echo ""

# Step 5: Install Breeze
print_step "Menginstall Laravel Breeze"
composer require laravel/breeze --prefer-source --no-interaction
print_success "Laravel Breeze berhasil diinstall"
echo ""

# Step 6: Install Breeze scaffolding
print_step "Setup Breeze dengan Blade template"
php artisan breeze:install blade --dark
print_success "Breeze scaffolding berhasil diinstall"
echo ""

# Step 7: Install Filament
print_step "Menginstall Filament"
composer require filament/filament:"^3.0" --prefer-source --no-interaction
print_success "Filament berhasil diinstall"
echo ""

# Step 8: Publish Filament assets
print_step "Publish Filament assets"
php artisan filament:install --panels
print_success "Filament assets berhasil dipublish"
echo ""

# Step 9: Install NPM dependencies
print_step "Menginstall dependensi NPM"
npm install
print_success "NPM dependencies berhasil diinstall"
echo ""

# Step 10: Build frontend assets
print_step "Build frontend assets"
npm run build
print_success "Frontend assets berhasil dibuild"
echo ""

# Step 11: Create storage link
print_step "Membuat storage link"
php artisan storage:link
print_success "Storage link berhasil dibuat"
echo ""

# Step 12: Run migrations
print_step "Menjalankan migrasi database"
php artisan migrate --force
print_success "Migrasi berhasil dijalankan"
echo ""

# Step 13: Create Filament admin user
print_step "Membuat user admin untuk Filament"
print_warning "Silakan isi data admin berikut:"
php artisan make:filament-user
print_success "User admin Filament telah dibuat"
echo ""

# Final message
echo ""
echo "╔════════════════════════════════════════════════════════════╗"
echo "║                   🎉 SETUP SELESAI! 🎉                    ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""
print_success "Project ${PROJECT_NAME} siap digunakan!"
echo ""
echo "Untuk menjalankan aplikasi:"
echo "  1. Masuk ke direktori: cd ${PROJECT_NAME}"
echo "  2. Jalankan server: php artisan serve"
echo "  3. Jalankan Vite (terminal terpisah): npm run dev"
echo ""
echo "URL Aplikasi:"
echo "  - Frontend: http://localhost:8000"
echo "  - Admin Filament: http://localhost:8000/admin"
echo ""
print_warning "Jangan lupa setup database di file .env sebelum menjalankan migrasi!"
echo ""
