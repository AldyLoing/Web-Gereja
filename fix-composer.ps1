# ================================================
# Fix Composer Install - Existing Laravel Project
# ================================================
# Script ini untuk project Laravel yang sudah ada
# dan mengalami masalah GitHub authentication
# ================================================

param(
    [switch]$WithBreeze,
    [switch]$WithFilament
)

# Colors
function Show-Step {
    param([string]$Message)
    Write-Host "🚀 $Message" -ForegroundColor Blue
}

function Show-Success {
    param([string]$Message)
    Write-Host "✅ $Message" -ForegroundColor Green
}

function Show-Error {
    param([string]$Message)
    Write-Host "❌ $Message" -ForegroundColor Red
}

function Show-Warning {
    param([string]$Message)
    Write-Host "⚠️  $Message" -ForegroundColor Yellow
}

# Increase Composer timeout
$env:COMPOSER_PROCESS_TIMEOUT = "900"

Write-Host ""
Write-Host "╔════════════════════════════════════════════════════════════╗"
Write-Host "║     Fix Composer Install - Existing Laravel Project       ║"
Write-Host "╚════════════════════════════════════════════════════════════╝"
Write-Host ""

try {
    # Check if composer.json exists
    if (!(Test-Path composer.json)) {
        Show-Error "File composer.json tidak ditemukan. Pastikan Anda berada di root project Laravel."
        exit 1
    }

    # Step 1: Clear Composer cache
    Show-Step "Membersihkan Composer cache"
    composer clear-cache
    Show-Success "Cache berhasil dibersihkan"
    Write-Host ""

    # Step 2: Remove vendor directory
    Show-Step "Menghapus direktori vendor lama"
    if (Test-Path vendor) {
        Remove-Item -Path vendor -Recurse -Force
        Show-Success "Direktori vendor berhasil dihapus"
    } else {
        Show-Warning "Direktori vendor tidak ditemukan"
    }
    Write-Host ""

    # Step 3: Remove composer.lock
    Show-Step "Menghapus composer.lock"
    if (Test-Path composer.lock) {
        Remove-Item -Path composer.lock -Force
        Show-Success "composer.lock berhasil dihapus"
    }
    Write-Host ""

    # Step 4: Install dependencies with --prefer-source
    Show-Step "Menginstall dependencies dengan --prefer-source"
    Show-Warning "Proses ini mungkin memakan waktu 10-15 menit..."
    composer install --prefer-source --no-interaction
    Show-Success "Dependencies berhasil diinstall"
    Write-Host ""

    # Step 5: Generate key if needed
    if (!(Select-String -Path .env -Pattern "APP_KEY=base64:" -Quiet)) {
        Show-Step "Generate application key"
        php artisan key:generate
        Show-Success "Application key berhasil dibuat"
        Write-Host ""
    }

    # Step 6: Install Breeze (optional)
    if ($WithBreeze) {
        Show-Step "Menginstall Laravel Breeze"
        composer require laravel/breeze --prefer-source --no-interaction
        php artisan breeze:install blade --dark
        Show-Success "Laravel Breeze berhasil diinstall"
        Write-Host ""
    }

    # Step 7: Install Filament (optional)
    if ($WithFilament) {
        Show-Step "Menginstall Filament"
        composer require filament/filament:"^3.0" --prefer-source --no-interaction
        php artisan filament:install --panels
        Show-Success "Filament berhasil diinstall"
        Write-Host ""
    }

    # Step 8: Install NPM dependencies
    Show-Step "Menginstall NPM dependencies"
    if (Test-Path package.json) {
        npm install
        Show-Success "NPM dependencies berhasil diinstall"
        Write-Host ""
        
        # Step 9: Build assets
        Show-Step "Build frontend assets"
        npm run build
        Show-Success "Assets berhasil dibuild"
        Write-Host ""
    }

    # Step 10: Run migrations
    $runMigration = Read-Host "Jalankan migrasi database? (y/n)"
    if ($runMigration -eq "y") {
        Show-Step "Menjalankan migrasi database"
        php artisan migrate --seed
        Show-Success "Migrasi berhasil dijalankan"
        Write-Host ""
    }

    # Final message
    Write-Host ""
    Write-Host "╔════════════════════════════════════════════════════════════╗"
    Write-Host "║              🎉 INSTALASI BERHASIL! 🎉                    ║"
    Write-Host "╚════════════════════════════════════════════════════════════╝"
    Write-Host ""
    Show-Success "Semua dependencies berhasil diinstall!"
    Write-Host ""
    Write-Host "Untuk menjalankan aplikasi:"
    Write-Host "  php artisan serve"
    Write-Host ""
    if (Test-Path package.json) {
        Write-Host "Untuk menjalankan Vite dev server (terminal terpisah):"
        Write-Host "  npm run dev"
        Write-Host ""
    }

} catch {
    Show-Error "Terjadi error: $_"
    exit 1
}
