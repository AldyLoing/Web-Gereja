# 🚀 Deployment Guide: Laravel + Supabase + Vercel

> **Panduan Lengkap Deploy Sistem Informasi Warta Jemaat Gereja**

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Prasyarat](#-prasyarat)
- [Setup Lokal](#-setup-lokal)
- [Konfigurasi Supabase](#-konfigurasi-supabase)
- [Deployment ke Vercel](#️-deployment-ke-vercel)
- [Supabase Storage untuk File Upload](#-supabase-storage-untuk-file-upload)
- [Catatan Teknis](#-catatan-teknis)
- [Troubleshooting](#-troubleshooting)
- [Struktur Project](#-struktur-project)
- [Kesimpulan](#-kesimpulan)

---

## 🧭 Overview

Proyek ini menggunakan arsitektur modern untuk deployment aplikasi Laravel:

```
┌─────────────────────────────────────────────┐
│  👤 User Browser                             │
└──────────────┬──────────────────────────────┘
               │
               ↓ HTTPS Request
┌──────────────────────────────────────────────┐
│  ☁️  Vercel (Serverless PHP Runtime)         │
│                                              │
│  • Laravel 11 Application                   │
│  • @vercel/php Runtime                      │
│  • Static Assets (CSS, JS)                  │
│  • Session: Cookie-based                    │
└──────────────┬───────────────────────────────┘
               │
               ↓ PostgreSQL Connection
┌──────────────────────────────────────────────┐
│  🗄️  Supabase PostgreSQL Database            │
│                                              │
│  • User Data                                │
│  • Posts & Categories                       │
│  • Church Members                           │
│  • File Metadata                            │
└──────────────────────────────────────────────┘
```

### 🎯 Teknologi Stack

| Component | Technology | Purpose |
|-----------|-----------|---------|
| **Framework** | Laravel 11 | Backend PHP Framework |
| **Database** | Supabase PostgreSQL | Cloud Database |
| **Hosting** | Vercel | Serverless PHP Runtime |
| **Frontend** | TailwindCSS + Alpine.js | Modern UI Framework |
| **Storage** | Supabase Storage | File Upload (Images, Documents) |

### ⚡ Keunggulan Arsitektur

- ✅ **Fully Serverless** - Auto-scaling tanpa perlu manage server
- ✅ **Global CDN** - Static assets disajikan dari edge network
- ✅ **SSL Otomatis** - HTTPS included out of the box
- ✅ **Zero Downtime** - Setiap deploy tidak mempengaruhi user
- ✅ **Cost Effective** - Free tier tersedia untuk project kecil

---

## 🧱 Prasyarat

Sebelum memulai, pastikan Anda memiliki:

### 1️⃣ Akun & Repository

- ✅ **GitHub Account** dengan repository: [`https://github.com/AldyLoing/Web-Gereja.git`](https://github.com/AldyLoing/Web-Gereja.git)
- ✅ **Vercel Account** - Daftar gratis di [vercel.com](https://vercel.com)
- ✅ **Supabase Account** - Daftar gratis di [supabase.com](https://supabase.com)

### 2️⃣ Development Tools (untuk testing lokal)

| Tool | Minimum Version | Check Command |
|------|----------------|---------------|
| **PHP** | 8.2 atau lebih tinggi | `php -v` |
| **Composer** | 2.x | `composer --version` |
| **Node.js** | 18.x atau lebih tinggi | `node -v` |
| **npm** | 9.x atau lebih tinggi | `npm -v` |
| **Git** | 2.x | `git --version` |

### 3️⃣ Supabase Database

Anda harus sudah memiliki:
- Project Supabase yang aktif
- Connection string PostgreSQL
- Database password

---

## ⚡ Setup Lokal

### Step 1: Clone Repository

```bash
# Clone dari GitHub
git clone https://github.com/AldyLoing/Web-Gereja.git

# Masuk ke direktori project
cd Web-Gereja
```

### Step 2: Install Dependencies

```bash
# Install PHP dependencies
composer install --prefer-source

# Install Node.js dependencies
npm install

# Build frontend assets
npm run build
```

> **💡 Tips:** Jika `composer install` gagal karena timeout GitHub, gunakan flag `--prefer-source` untuk clone source langsung.

### Step 3: Setup Environment

```bash
# Copy file environment
cp .env.example .env

# Generate application key
php artisan key:generate
```

### Step 4: Konfigurasi Database

Edit file `.env` dan tambahkan konfigurasi Supabase:

```env
APP_NAME="Warta Jemaat Gereja"
APP_ENV=local
APP_KEY=base64:GENERATED_KEY_HERE
APP_DEBUG=true
APP_URL=http://localhost:8000

# Supabase PostgreSQL Configuration
DB_CONNECTION=pgsql
DB_HOST=db.pcfvuqqrewqprprfqoua.supabase.co
DB_PORT=5432
DB_DATABASE=postgres
DB_USERNAME=postgres
DB_PASSWORD=YOUR_SUPABASE_PASSWORD_HERE

# Cache & Session (local development)
CACHE_DRIVER=file
SESSION_DRIVER=file
QUEUE_CONNECTION=sync

# Filesystem
FILESYSTEM_DISK=public
```

> **⚠️ Penting:** Ganti `YOUR_SUPABASE_PASSWORD_HERE` dengan password Supabase Anda yang sebenarnya.

### Step 5: Run Migrations

```bash
# Jalankan database migrations
php artisan migrate

# (Opsional) Jalankan seeders untuk data dummy
php artisan db:seed
```

### Step 6: Create Storage Link

```bash
# Buat symbolic link untuk storage
php artisan storage:link
```

### Step 7: Test Lokal

```bash
# Jalankan development server
php artisan serve
```

Buka browser dan akses:
- **Frontend:** http://localhost:8000
- **Admin Login:** http://localhost:8000/login
  - Email: `admin@gereja.com`
  - Password: `password`

---

## 🗄️ Konfigurasi Supabase

### 1️⃣ Dapatkan Connection String

1. Login ke [Supabase Dashboard](https://supabase.com/dashboard)
2. Pilih project Anda
3. Navigasi ke **Settings** → **Database**
4. Copy **Connection String** dengan format:

```
postgresql://postgres:[YOUR-PASSWORD]@db.pcfvuqqrewqprprfqoua.supabase.co:5432/postgres
```

### 2️⃣ Parse Connection Details

Dari connection string di atas, ekstrak informasi berikut:

| Field | Value |
|-------|-------|
| `DB_HOST` | `db.pcfvuqqrewqprprfqoua.supabase.co` |
| `DB_PORT` | `5432` |
| `DB_DATABASE` | `postgres` |
| `DB_USERNAME` | `postgres` |
| `DB_PASSWORD` | Password yang Anda set saat membuat project |

### 3️⃣ Test Koneksi

```bash
# Test koneksi database dari Laravel
php artisan tinker

# Di Tinker console, jalankan:
DB::connection()->getPdo();
# Jika berhasil, akan muncul object PDO
```

---

## ☁️ Deployment ke Vercel

### 📦 Persiapan Files

Sebelum deploy, pastikan project Anda memiliki file-file berikut:

#### 1. `api/index.php`

```php
<?php

// Vercel PHP Runtime Entry Point
require __DIR__ . '/../public/index.php';
```

#### 2. `vercel.json`

```json
{
  "version": 2,
  "builds": [
    {
      "src": "api/index.php",
      "use": "@vercel/php"
    },
    {
      "src": "public/**",
      "use": "@vercel/static"
    }
  ],
  "routes": [
    {
      "src": "/(css|js|images|fonts|storage)/(.+)",
      "dest": "public/$1/$2"
    },
    {
      "src": "/build/(.+)",
      "dest": "public/build/$1"
    },
    {
      "src": "/(.*)",
      "dest": "api/index.php"
    }
  ],
  "env": {
    "APP_ENV": "production",
    "APP_DEBUG": "false",
    "LOG_CHANNEL": "stderr",
    "SESSION_DRIVER": "cookie",
    "CACHE_DRIVER": "array",
    "QUEUE_CONNECTION": "sync"
  }
}
```

#### 3. `.vercelignore`

```
/vendor
/node_modules
/storage/*.key
/storage/logs
/storage/framework/cache
/storage/framework/sessions
/storage/framework/testing
/storage/framework/views
/.env.backup
/.phpunit.result.cache
/npm-debug.log
/yarn-error.log
```

> **💡 Tips:** File-file ini sudah dibuat otomatis jika Anda menjalankan `setup-vercel-supabase.sh`

---

### 🚀 Deploy ke Vercel

#### Step 1: Push ke GitHub

```bash
# Add semua perubahan
git add .

# Commit dengan pesan yang jelas
git commit -m "Ready for Vercel deployment"

# Push ke GitHub (pastikan remote sudah di-set ke Web-Gereja repo)
git push origin main
```

#### Step 2: Import Project di Vercel

1. Buka [https://vercel.com/new](https://vercel.com/new)
2. Klik **"Import Project"**
3. Pilih **"Import Git Repository"**
4. Cari dan pilih repository: `AldyLoing/Web-Gereja`
5. Klik **"Import"**

#### Step 3: Configure Build Settings

Vercel akan otomatis detect Laravel project. Pastikan settings berikut:

| Setting | Value |
|---------|-------|
| **Framework Preset** | Other |
| **Build Command** | `composer install && npm install && npm run build` |
| **Output Directory** | `public` |
| **Install Command** | (biarkan kosong) |

#### Step 4: Add Environment Variables

Di halaman deployment, klik **"Environment Variables"** dan tambahkan:

```env
# Application
APP_NAME=Warta Jemaat Gereja
APP_ENV=production
APP_KEY=base64:YOUR_BASE64_KEY_FROM_LOCAL_ENV
APP_DEBUG=false
APP_URL=https://your-app-name.vercel.app

# Database (Supabase)
DB_CONNECTION=pgsql
DB_HOST=db.pcfvuqqrewqprprfqoua.supabase.co
DB_PORT=5432
DB_DATABASE=postgres
DB_USERNAME=postgres
DB_PASSWORD=YOUR_SUPABASE_PASSWORD

# Cache & Session (Vercel Serverless)
CACHE_DRIVER=array
SESSION_DRIVER=cookie
QUEUE_CONNECTION=sync
FILESYSTEM_DISK=public

# Logging
LOG_CHANNEL=stderr
LOG_LEVEL=error

# Broadcasting & Mail (if needed later)
BROADCAST_DRIVER=log
MAIL_MAILER=log
```

> **🔑 Cara mendapatkan APP_KEY:**
> - Buka file `.env` lokal Anda
> - Copy value dari `APP_KEY=base64:...`
> - Paste ke Vercel environment variables

#### Step 5: Deploy

1. Klik **"Deploy"**
2. Tunggu proses build (~2-3 menit)
3. Setelah selesai, klik **"Visit"** untuk mengakses aplikasi

#### Step 6: Run Migrations (PENTING!)

Setelah deploy pertama kali, Anda perlu menjalankan migrations:

**Opsi A: Via Local dengan DB Production**

```bash
# Sementara ubah .env lokal ke DB production
DB_HOST=db.pcfvuqqrewqprprfqoua.supabase.co
# ... (gunakan credentials production)

# Run migrations
php artisan migrate --force

# Jalankan seeders jika diperlukan
php artisan db:seed --force
```

**Opsi B: Via Supabase SQL Editor**

1. Buka Supabase Dashboard
2. Pilih project → SQL Editor
3. Run migration SQL secara manual

---

## 🪣 Supabase Storage untuk File Upload

### ⚠️ Penting: File Storage di Vercel

Vercel menggunakan **serverless runtime** yang bersifat **ephemeral** (sementara). Artinya:

- ❌ File yang diupload ke `storage/app/public` akan **hilang** setelah deployment baru
- ❌ `php artisan storage:link` tidak persisten
- ✅ **Solusi:** Gunakan **Supabase Storage** untuk menyimpan gambar & dokumen

---

### 🔧 Setup Supabase Storage

#### Step 1: Create Storage Bucket

1. Login ke [Supabase Dashboard](https://supabase.com/dashboard)
2. Pilih project Anda
3. Navigasi ke **Storage**
4. Klik **"Create Bucket"**
5. Beri nama: `warta-images` (atau nama lain)
6. Set **Public bucket** = `Yes` (jika ingin file bisa diakses publik)
7. Klik **"Create"**

#### Step 2: Install Supabase PHP Client

```bash
composer require supabase/supabase-php
```

#### Step 3: Setup Configuration

Tambahkan di `.env`:

```env
SUPABASE_URL=https://pcfvuqqrewqprprfqoua.supabase.co
SUPABASE_KEY=your_anon_public_key_here
SUPABASE_BUCKET=warta-images
```

> **🔑 Dapatkan Supabase Key:**
> - Supabase Dashboard → Settings → API
> - Copy **anon/public** key

#### Step 4: Create Custom Storage Driver

**File: `config/filesystems.php`**

Tambahkan di array `disks`:

```php
'supabase' => [
    'driver' => 'supabase',
    'url' => env('SUPABASE_URL'),
    'key' => env('SUPABASE_KEY'),
    'bucket' => env('SUPABASE_BUCKET'),
],
```

#### Step 5: Update Controller Upload

**Contoh: `app/Http/Controllers/Admin/PostController.php`**

```php
use Illuminate\Support\Facades\Storage;

public function store(Request $request)
{
    // ... validasi ...

    if ($request->hasFile('cover')) {
        // Upload ke Supabase Storage
        $file = $request->file('cover');
        $filename = time() . '_' . $file->getClientOriginalName();
        
        // Upload ke Supabase (gunakan custom implementation atau SDK)
        $path = Storage::disk('supabase')->put('posts', $file);
        
        // Dapatkan public URL
        $coverUrl = Storage::disk('supabase')->url($path);
        
        $post->cover = $coverUrl; // Simpan URL lengkap ke database
    }

    $post->save();
}
```

#### Step 6: Display Image

Di Blade template:

```blade
@if($post->cover)
    <img src="{{ $post->cover }}" alt="{{ $post->title }}">
@endif
```

---

## 🧩 Catatan Teknis

### ⚠️ Limitasi Vercel Serverless

| Feature | Status | Explanation |
|---------|--------|-------------|
| **HTTP Requests** | ✅ Works | Routing, Controllers, Middleware berfungsi normal |
| **Database Query** | ✅ Works | Koneksi ke Supabase PostgreSQL lancar |
| **File Upload** | ⚠️ Limited | Harus gunakan Supabase Storage (bukan local disk) |
| **Queue Jobs** | ❌ Not Work | Tidak ada persistent worker process |
| **Scheduled Tasks** | ❌ Not Work | `php artisan schedule:run` tidak bisa dijalankan otomatis |
| **WebSockets** | ❌ Not Work | Broadcasting via Pusher/Echo tidak support |

---

### ✅ Solusi Alternative

#### 1️⃣ Background Jobs (Queue)

**Problem:** Laravel Queue workers tidak bisa run di Vercel.

**Solution:** Gunakan **Railway.app** untuk queue worker:

```bash
# Deploy queue worker terpisah di Railway
railway init
railway up

# Set Procfile:
worker: php artisan queue:work --tries=3
```

#### 2️⃣ Scheduled Tasks (Cron)

**Problem:** Laravel Scheduler tidak jalan otomatis.

**Solution:** Gunakan external cron service:

- **Cron-job.org** (gratis)
- **EasyCron** (gratis untuk 1 task)

Setup:
1. Buat endpoint khusus untuk trigger scheduler:

```php
// routes/web.php
Route::get('/cron/schedule', function () {
    Artisan::call('schedule:run');
    return 'Scheduler executed';
})->middleware('verify-cron-token'); // Buat middleware untuk security
```

2. Di cron-job.org, set URL:
   - URL: `https://your-app.vercel.app/cron/schedule`
   - Schedule: `* * * * *` (every minute)

#### 3️⃣ Session Storage

**Best Practice:** Gunakan cookie-based session (sudah di-set di `vercel.json`):

```env
SESSION_DRIVER=cookie
```

Jangan gunakan `file` atau `database` session driver di Vercel.

---

### 🔒 Security Best Practices

1. **Environment Variables**
   - ✅ Simpan semua secret di Vercel Environment Variables
   - ❌ Jangan commit `.env` ke Git

2. **Database Password**
   - ✅ Gunakan password yang kuat (min 16 karakter)
   - ✅ Rotate password secara berkala

3. **APP_DEBUG**
   - ✅ Set `APP_DEBUG=false` di production
   - ❌ Jangan expose error message ke user

4. **CSRF Protection**
   - ✅ Laravel CSRF token sudah aktif by default
   - ✅ Pastikan semua form menggunakan `@csrf`

---

## 🐛 Troubleshooting

### 1. Error: "Application key not set"

**Penyebab:** `APP_KEY` tidak di-set di Vercel environment variables.

**Solusi:**
```bash
# Generate key di lokal
php artisan key:generate

# Copy key dari .env (misalnya: base64:abc123...)
# Tambahkan ke Vercel Environment Variables
```

---

### 2. Error: "Database connection failed"

**Penyebab:** Credentials Supabase salah atau typo.

**Solusi:**
1. Verifikasi credentials di Supabase Dashboard
2. Test koneksi manual:
   ```bash
   psql "postgresql://postgres:PASSWORD@db.pcfvuqqrewqprprfqoua.supabase.co:5432/postgres"
   ```
3. Pastikan tidak ada spasi extra di environment variables

---

### 3. Error: "Class 'xxx' not found"

**Penyebab:** Composer autoload tidak ter-update.

**Solusi:**
```bash
composer dump-autoload
git add composer.lock
git commit -m "Update autoload"
git push origin main
```

---

### 4. 404 Error pada semua routes

**Penyebab:** `vercel.json` routing tidak benar.

**Solusi:**
1. Pastikan file `api/index.php` exist dan berisi:
   ```php
   <?php
   require __DIR__ . '/../public/index.php';
   ```
2. Verifikasi `vercel.json` routing:
   ```json
   "routes": [
     { "src": "/(.*)", "dest": "api/index.php" }
   ]
   ```

---

### 5. CSS/JS tidak load

**Penyebab:** Static assets tidak ter-build atau routing salah.

**Solusi:**
```bash
# Rebuild assets
npm run build

# Commit build output
git add public/build
git commit -m "Add build assets"
git push origin main
```

---

### 6. Image upload tidak muncul setelah redeploy

**Penyebab:** File disimpan di local storage Vercel (ephemeral).

**Solusi:** Migrate ke **Supabase Storage** (lihat bagian [Supabase Storage](#-supabase-storage-untuk-file-upload))

---

## 📁 Struktur Project

Struktur direktori akhir project setelah setup lengkap:

```
Web-Gereja/
├── 📁 api/
│   └── index.php                    # Vercel PHP entry point
│
├── 📁 app/
│   ├── Http/
│   │   ├── Controllers/
│   │   │   ├── Admin/              # Admin CRUD controllers
│   │   │   └── PostController.php  # Frontend controller
│   │   └── Middleware/
│   └── Models/
│       ├── Post.php
│       ├── Category.php
│       ├── Member.php
│       └── ...
│
├── 📁 bootstrap/
├── 📁 config/
│   ├── database.php                # PostgreSQL configuration
│   └── filesystems.php             # Supabase storage driver
│
├── 📁 database/
│   ├── migrations/                 # Database schema
│   └── seeders/                    # Initial data
│
├── 📁 public/
│   ├── build/                      # Compiled assets (Vite)
│   ├── storage/                    # Symbolic link (local only)
│   └── index.php                   # Laravel entry point
│
├── 📁 resources/
│   ├── css/
│   │   └── app.css                 # TailwindCSS
│   ├── js/
│   │   └── app.js                  # Alpine.js
│   └── views/
│       ├── admin/                  # Admin dashboard views
│       ├── posts/
│       │   ├── index.blade.php     # Public posts listing
│       │   └── show.blade.php      # Post detail
│       ├── components/
│       │   ├── navbar.blade.php
│       │   ├── footer.blade.php
│       │   └── post-card.blade.php
│       └── layouts/
│           ├── app.blade.php       # Admin layout
│           └── frontend.blade.php  # Public layout
│
├── 📁 routes/
│   ├── web.php                     # Application routes
│   └── api.php
│
├── 📁 storage/
│   ├── app/
│   ├── framework/
│   └── logs/
│
├── 📄 .env                          # Environment config (local only)
├── 📄 .env.example                  # Environment template
├── 📄 .vercelignore                 # Files ignored by Vercel
├── 📄 vercel.json                   # Vercel deployment config
├── 📄 composer.json                 # PHP dependencies
├── 📄 package.json                  # Node.js dependencies
├── 📄 tailwind.config.js            # TailwindCSS configuration
├── 📄 vite.config.js                # Vite bundler config
├── 📄 DEPLOYMENT.md                 # This file! 📖
└── 📄 README.md                     # Project overview
```

---

## 🎉 Kesimpulan

Selamat! Anda telah berhasil men-deploy **Sistem Informasi Warta Jemaat Gereja** menggunakan stack teknologi modern:

### ✨ Yang Telah Dicapai

- ✅ **Laravel 11** sebagai backend framework dengan routing & Blade templating
- ✅ **Supabase PostgreSQL** sebagai cloud database yang scalable
- ✅ **Vercel** sebagai hosting serverless dengan global CDN
- ✅ **TailwindCSS** untuk UI modern dan responsive
- ✅ **Alpine.js** untuk interaktivitas frontend yang ringan

### 🎯 Fitur Aplikasi

Proyek ini menyediakan fitur lengkap untuk manajemen warta gereja:

#### 👤 **Admin Dashboard**
- Manajemen postingan warta (CRUD)
- Manajemen kategori
- Manajemen data jemaat
- Manajemen keluarga
- Manajemen kelompok gereja
- Manajemen data baptisan
- Dashboard statistik

#### 🌐 **Public Frontend**
- Homepage dengan hero section modern
- Listing postingan warta dengan filter kategori
- Detail postingan dengan typography yang rapi
- Search functionality
- Responsive design (mobile-first)
- Dark mode support

### 🚀 Next Steps

Untuk pengembangan lebih lanjut, pertimbangkan:

1. **Migrasi File Upload ke Supabase Storage**
   - Implementasi upload gambar ke Supabase
   - Update tampilan untuk load image dari CDN

2. **Implementasi Queue Worker (opsional)**
   - Deploy worker terpisah di Railway
   - Setup job untuk email notification

3. **Add More Features**
   - Newsletter subscription
   - Event calendar
   - Online giving/donation
   - Member area dengan login

4. **Performance Optimization**
   - Enable Laravel cache (Redis via Upstash)
   - Optimize database queries
   - Image optimization & lazy loading

5. **SEO Enhancement**
   - Add meta tags
   - Create sitemap.xml
   - Submit to Google Search Console

---

### 📚 Referensi & Dokumentasi

- **Laravel:** [https://laravel.com/docs](https://laravel.com/docs)
- **Vercel:** [https://vercel.com/docs](https://vercel.com/docs)
- **Supabase:** [https://supabase.com/docs](https://supabase.com/docs)
- **TailwindCSS:** [https://tailwindcss.com/docs](https://tailwindcss.com/docs)

---

### 💬 Support

Jika Anda mengalami kendala atau butuh bantuan:

1. **Check Logs:**
   - Vercel: Dashboard → Deployments → Runtime Logs
   - Supabase: Dashboard → Logs

2. **GitHub Issues:**
   - Buat issue di repository: [https://github.com/AldyLoing/Web-Gereja/issues](https://github.com/AldyLoing/Web-Gereja/issues)

3. **Community:**
   - Laravel Discord: [https://discord.gg/laravel](https://discord.gg/laravel)
   - Supabase Discord: [https://discord.supabase.com](https://discord.supabase.com)

---

### 🙏 Credits

Proyek ini dibangun dengan ❤️ menggunakan:
- Laravel Framework
- Supabase PostgreSQL
- Vercel Serverless Platform
- TailwindCSS & Alpine.js

---

**🌟 Happy Deploying!**

> Sistem Informasi Warta Jemaat Gereja - Menghubungkan jemaat melalui teknologi digital modern.

---

**Last Updated:** November 1, 2025  
**Version:** 1.0.0  
**Repository:** [https://github.com/AldyLoing/Web-Gereja](https://github.com/AldyLoing/Web-Gereja)
