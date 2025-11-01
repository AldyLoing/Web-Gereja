# Deploy Laravel ke Vercel - Panduan Lengkap

## ⚠️ PENTING: Setup Environment Variables

Sebelum deploy, Anda **HARUS** menambahkan environment variables berikut di Vercel Dashboard:

### Cara Set Environment Variables:

1. Buka **Vercel Dashboard** → Pilih Project Anda
2. Klik **Settings** → **Environment Variables**
3. Tambahkan variable berikut:

### Required Environment Variables:

```bash
# Application
APP_NAME=Web Gereja
APP_ENV=production
APP_DEBUG=false
APP_URL=https://your-project.vercel.app

# Generate APP_KEY dengan command: php artisan key:generate --show
APP_KEY=base64:your-generated-key-here

# Database (Supabase/PlanetScale)
DB_CONNECTION=pgsql
DB_HOST=db.your-project.supabase.co
DB_PORT=5432
DB_DATABASE=postgres
DB_USERNAME=postgres
DB_PASSWORD=your-database-password

# Session & Cache
SESSION_DRIVER=cookie
CACHE_DRIVER=array
QUEUE_CONNECTION=sync

# Storage Path (WAJIB untuk Vercel)
VIEW_COMPILED_PATH=/tmp/storage/framework/views
```

---

## 🔧 Setup Database (Supabase)

### 1. Buat Database di Supabase

```bash
# 1. Daftar di https://supabase.com (gratis)
# 2. Create new project
# 3. Tunggu setup selesai (~2 menit)
# 4. Copy connection string
```

### 2. Dapatkan Connection String

Di Supabase Dashboard:
- Klik **Project Settings** → **Database**
- Copy **Connection string** dengan format:
  ```
  postgresql://postgres:[YOUR-PASSWORD]@db.xxx.supabase.co:5432/postgres
  ```

### 3. Update Environment Variables di Vercel

Tambahkan connection info ke Vercel environment variables.

---

## 🚀 Deploy ke Vercel

### Method 1: Via Git (Otomatis)

```bash
# Commit dan push
git add .
git commit -m "Deploy to Vercel"
git push origin main
```

Vercel akan otomatis build dan deploy.

### Method 2: Via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel --prod
```

---

## 🎯 Generate APP_KEY

**PENTING:** Generate APP_KEY sebelum deploy!

```bash
# Di local, jalankan:
php artisan key:generate --show

# Output contoh:
# base64:abcd1234567890...

# Copy output ini ke Vercel Environment Variables
```

---

## 📝 Checklist Deploy

- [ ] Setup database di Supabase
- [ ] Generate APP_KEY
- [ ] Set semua environment variables di Vercel
- [ ] Commit dan push ke GitHub
- [ ] Tunggu Vercel build selesai
- [ ] Run migration via Vercel CLI: `vercel env pull && php artisan migrate --force`

---

## 🐛 Troubleshooting

### Error: "No application encryption key has been specified"
**Solusi:** Generate APP_KEY dan tambahkan ke Vercel environment variables

### Error: "SQLSTATE[08006] connection failure"
**Solusi:** Cek database credentials di environment variables

### Error: "View not found"
**Solusi:** Pastikan `VIEW_COMPILED_PATH=/tmp/storage/framework/views` ada di environment variables

### Error: "500 Internal Server Error"
**Solusi:** 
1. Check Vercel logs: `vercel logs`
2. Pastikan semua environment variables sudah di-set
3. Cek database connection

---

## 📊 Post-Deploy Setup

### Run Migrations

```bash
# Install Vercel CLI
npm i -g vercel

# Pull environment variables
vercel env pull

# Run migrations
php artisan migrate --force

# Atau via Vercel function (jika sudah setup)
vercel env exec -- php artisan migrate --force
```

### Seed Database (Opsional)

```bash
php artisan db:seed --force
```

---

## 🔍 Monitoring

### View Logs
```bash
vercel logs
```

### View Production URL
```bash
vercel ls
```

---

## ⚡ Limitasi Vercel untuk Laravel

1. **No persistent storage** - File uploads tidak disimpan permanent
2. **Cold start** - Request pertama bisa lambat (10-30 detik)
3. **10 second timeout** - Free plan (60s untuk Pro)
4. **No background jobs** - Tidak bisa run queue workers
5. **No scheduled tasks** - Tidak bisa run cron/scheduler

### Solusi:
- Upload files → Gunakan AWS S3 atau Cloudinary
- Background jobs → Gunakan external service (Trigger.dev, Inngest)
- Scheduled tasks → Gunakan Vercel Cron atau external scheduler

---

## 🎓 Alternative Platforms (Lebih Mudah untuk Laravel)

Jika Vercel terlalu ribet atau tidak sesuai kebutuhan:

### Railway.app (Rekomendasi #1) ⭐⭐⭐⭐⭐
```bash
npm i -g @railway/cli
railway login
railway init
railway add --database postgres
railway up
```
**Keunggulan:** 
- Setup otomatis
- Persistent storage
- Built-in database
- $5 free credit/month

### Fly.io (Rekomendasi #2) ⭐⭐⭐⭐⭐
```bash
fly launch
fly deploy
```
**Keunggulan:**
- Persistent volumes
- Global edge
- Docker-based
- Free tier generous

---

## 📞 Support

Jika masih error setelah mengikuti guide ini:

1. Cek Vercel logs: `vercel logs`
2. Pastikan semua environment variables sudah benar
3. Test database connection
4. Cek Laravel logs di Vercel Functions

---

**Good luck! 🚀**
