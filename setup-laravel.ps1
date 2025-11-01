# ============================================
# Setup Laravel 11 + Breeze + Filament Script
# ============================================
# Mengatasi masalah "Could not authenticate against github.com"
# dengan menggunakan --prefer-source
# ============================================

param(
    [Parameter(Mandatory=$true)]
    [string]$ProjectName
)

# Function to print colored output
function Print-Step {
    param([string]$Message)
    Write-Host "🚀 $Message" -ForegroundColor Blue
}

function Print-Success {
    param([string]$Message)
    Write-Host "✅ $Message" -ForegroundColor Green
}

function Print-Error {
    param([string]$Message)
    Write-Host "❌ $Message" -ForegroundColor Red
}

function Print-Warning {
    param([string]$Message)
    Write-Host "⚠️  $Message" -ForegroundColor Yellow
}

# Check if composer is installed
if (!(Get-Command composer -ErrorAction SilentlyContinue)) {
    Print-Error "Composer tidak terinstall. Install Composer terlebih dahulu."
    exit 1
}

# Check if npm is installed
if (!(Get-Command npm -ErrorAction SilentlyContinue)) {
    Print-Error "NPM tidak terinstall. Install Node.js terlebih dahulu."
    exit 1
}

# Increase Composer timeout to avoid process timeout
$env:COMPOSER_PROCESS_TIMEOUT = "600"

Write-Host ""
Write-Host "╔════════════════════════════════════════════════════════════╗"
Write-Host "║        Setup Laravel 11 + Breeze + Filament               ║"
Write-Host "║        Project: $ProjectName                               ║"
Write-Host "╚════════════════════════════════════════════════════════════╝"
Write-Host ""

try {
    # Step 1: Create Laravel project
    Print-Step "Membuat project Laravel: $ProjectName"
    composer create-project --prefer-source laravel/laravel "$ProjectName"
    Print-Success "Laravel berhasil dibuat"
    Write-Host ""

    # Step 2: Enter project directory
    Set-Location $ProjectName

    # Step 3: Copy .env file
    Print-Step "Menyalin file .env dari .env.example"
    if (!(Test-Path .env)) {
        Copy-Item .env.example .env
        Print-Success "File .env berhasil dibuat"
    } else {
        Print-Warning "File .env sudah ada"
    }
    Write-Host ""

    # Step 4: Generate application key
    Print-Step "Generate application key"
    php artisan key:generate
    Print-Success "Application key berhasil dibuat"
    Write-Host ""

    # Step 5: Install Breeze
    Print-Step "Menginstall Laravel Breeze"
    composer require laravel/breeze --prefer-source --no-interaction
    Print-Success "Laravel Breeze berhasil diinstall"
    Write-Host ""

    # Step 6: Install Breeze scaffolding
    Print-Step "Setup Breeze dengan Blade template"
    php artisan breeze:install blade --dark
    Print-Success "Breeze scaffolding berhasil diinstall"
    Write-Host ""

    # Step 7: Install Filament
    Print-Step "Menginstall Filament"
    composer require filament/filament:"^3.0" --prefer-source --no-interaction
    Print-Success "Filament berhasil diinstall"
    Write-Host ""

    # Step 8: Publish Filament assets
    Print-Step "Publish Filament assets"
    php artisan filament:install --panels
    Print-Success "Filament assets berhasil dipublish"
    Write-Host ""

    # Step 9: Install NPM dependencies
    Print-Step "Menginstall dependensi NPM"
    npm install
    Print-Success "NPM dependencies berhasil diinstall"
    Write-Host ""

    # Step 10: Build frontend assets
    Print-Step "Build frontend assets"
    npm run build
    Print-Success "Frontend assets berhasil dibuild"
    Write-Host ""

    # Step 11: Create storage link
    Print-Step "Membuat storage link"
    php artisan storage:link
    Print-Success "Storage link berhasil dibuat"
    Write-Host ""

    # Step 12: Run migrations
    Print-Step "Menjalankan migrasi database"
    php artisan migrate --force
    Print-Success "Migrasi berhasil dijalankan"
    Write-Host ""

    # Step 13: Create Filament admin user
    Print-Step "Membuat user admin untuk Filament"
    Print-Warning "Silakan isi data admin berikut:"
    php artisan make:filament-user
    Print-Success "User admin Filament telah dibuat"
    Write-Host ""

    # Final message
    Write-Host ""
    Write-Host "╔════════════════════════════════════════════════════════════╗"
    Write-Host "║                   🎉 SETUP SELESAI! 🎉                    ║"
    Write-Host "╚════════════════════════════════════════════════════════════╝"
    Write-Host ""
    Print-Success "Project $ProjectName siap digunakan!"
    Write-Host ""
    Write-Host "Untuk menjalankan aplikasi:"
    Write-Host "  1. Masuk ke direktori: cd $ProjectName"
    Write-Host "  2. Jalankan server: php artisan serve"
    Write-Host "  3. Jalankan Vite (terminal terpisah): npm run dev"
    Write-Host ""
    Write-Host "URL Aplikasi:"
    Write-Host "  - Frontend: http://localhost:8000"
    Write-Host "  - Admin Filament: http://localhost:8000/admin"
    Write-Host ""
    Print-Warning "Jangan lupa setup database di file .env sebelum menjalankan migrasi!"
    Write-Host ""

} catch {
    Print-Error "Terjadi error: $_"
    exit 1
}
