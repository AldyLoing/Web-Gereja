# Panduan Deploy Laravel ke Vercel

## ⚠️ Catatan Penting

**Vercel memiliki keterbatasan untuk aplikasi Laravel full-stack:**

### Keterbatasan Vercel untuk Laravel:
1. ❌ **Tidak ada persistent storage** - file upload akan hilang setelah deployment
2. ❌ **Tidak ada database built-in** - harus menggunakan external database (Supabase, PlanetScale, dll)
3. ❌ **Cold start yang lambat** - response pertama bisa memakan waktu 10-30 detik
4. ❌ **Timeout 10 detik** untuk serverless function (versi gratis)
5. ❌ **Session storage terbatas** - harus menggunakan cookie atau database session
6. ❌ **Tidak cocok untuk aplikasi dengan background jobs** atau scheduled tasks

### ✅ Alternatif yang Lebih Baik untuk Laravel:

#### 1. **Railway.app** (SANGAT DIREKOMENDASIKAN)
- ✅ Persistent storage
- ✅ Built-in PostgreSQL/MySQL
- ✅ Support penuh untuk Laravel
- ✅ Free tier: $5 kredit/bulan
- 🔗 https://railway.app

**Deploy ke Railway:**
```bash
# Install Railway CLI
npm i -g @railway/cli

# Login dan deploy
railway login
railway init
railway up
```

#### 2. **Fly.io** (DIREKOMENDASIKAN)
- ✅ Persistent volumes
- ✅ Built-in database options
- ✅ Docker-based deployment
- ✅ Free tier tersedia
- 🔗 https://fly.io

**Deploy ke Fly.io:**
```bash
# Install Fly CLI
curl -L https://fly.io/install.sh | sh

# Deploy
fly launch
fly deploy
```

#### 3. **Heroku**
- ✅ Mature platform untuk Laravel
- ✅ Banyak add-ons tersedia
- ✅ Dokumentasi lengkap
- ⚠️ Tidak ada free tier lagi
- 🔗 https://heroku.com

#### 4. **DigitalOcean App Platform**
- ✅ Persistent storage
- ✅ Managed databases
- ✅ $5/bulan untuk basic tier
- 🔗 https://www.digitalocean.com/products/app-platform

#### 5. **Render.com**
- ✅ Free tier dengan PostgreSQL
- ✅ Auto-deploy dari Git
- ✅ Background workers support
- 🔗 https://render.com

---

## Jika Tetap Ingin Menggunakan Vercel

### Prasyarat:
1. Database eksternal (Supabase, PlanetScale, atau AWS RDS)
2. File storage eksternal (AWS S3, Cloudinary)
3. Session driver: `cookie` atau database
4. Cache driver: `array` atau Redis eksternal

### Struktur yang Diperlukan:

```
Web-Gereja/
├── api/
│   └── index.php          # Entry point PHP
├── public/
│   ├── build/             # Vite assets
│   └── index.php          # Laravel public index
├── vercel.json            # Konfigurasi Vercel
└── .vercelignore          # File yang diabaikan
```

### Langkah Deploy:

#### 1. Setup Database Eksternal (Supabase)

```bash
# Buat project di https://supabase.com
# Dapatkan connection string
# Format: postgresql://postgres:[PASSWORD]@[HOST]:5432/postgres
```

#### 2. Set Environment Variables di Vercel Dashboard

Buka Project Settings > Environment Variables, tambahkan:

```
APP_NAME=Web Gereja
APP_ENV=production
APP_KEY=base64:... (generate dengan php artisan key:generate)
APP_DEBUG=false
APP_URL=https://your-project.vercel.app

DB_CONNECTION=pgsql
DB_HOST=db.your-project.supabase.co
DB_PORT=5432
DB_DATABASE=postgres
DB_USERNAME=postgres
DB_PASSWORD=your-password

SESSION_DRIVER=cookie
CACHE_DRIVER=array
QUEUE_CONNECTION=sync

VIEW_COMPILED_PATH=/tmp/storage/framework/views
```

#### 3. Deploy

```bash
# Commit dan push
git add .
git commit -m "Configure for Vercel"
git push origin main
```

### Troubleshooting:

**Error: "No Output Directory"**
- Hapus `outputDirectory` dari vercel.json
- Gunakan hanya `vercel-php` runtime

**Error: "Function Timeout"**
- Kurangi kompleksitas query
- Gunakan eager loading
- Upgrade ke Vercel Pro ($20/bulan) untuk 60s timeout

**Error: "Storage Not Found"**
- Pastikan `VIEW_COMPILED_PATH=/tmp/storage/framework/views`
- Jangan upload file ke Vercel, gunakan S3

**Error: "Session Not Working"**
- Gunakan `SESSION_DRIVER=cookie`
- Atau gunakan `SESSION_DRIVER=database` dengan external DB

---

## 🎯 Rekomendasi Akhir

**Untuk proyek Laravel seperti ini, saya SANGAT MEREKOMENDASIKAN menggunakan Railway.app atau Fly.io daripada Vercel.**

Vercel didesain untuk:
- Next.js
- Static sites
- Serverless APIs yang ringan

Laravel membutuhkan:
- Persistent file system
- Database connection
- Background jobs
- Scheduled tasks
- Session management

**Railway.app adalah pilihan terbaik karena:**
- ✅ Setup otomatis untuk Laravel
- ✅ Gratis $5 kredit/bulan (cukup untuk testing)
- ✅ Persistent storage
- ✅ Built-in PostgreSQL
- ✅ Deployment dalam 5 menit

### Quick Deploy ke Railway:

```bash
# Install Railway CLI
npm i -g @railway/cli

# Login
railway login

# Inisialisasi project
railway init

# Add PostgreSQL
railway add --database postgres

# Deploy
railway up

# Generate APP_KEY
railway run php artisan key:generate

# Run migrations
railway run php artisan migrate --force

# Buka di browser
railway open
```

**Total waktu: ~5 menit** ✨
