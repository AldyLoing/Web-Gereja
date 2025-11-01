# 🎯 Quick Reference - Setup Laravel Scripts

## 📁 File yang Tersedia

1. **setup-laravel.ps1** / **setup-laravel.sh**  
   → Script untuk membuat project Laravel BARU dengan Breeze + Filament

2. **fix-composer.ps1** / **fix-composer.sh**  
   → Script untuk memperbaiki instalasi project Laravel yang SUDAH ADA

3. **SETUP_SCRIPT_README.md**  
   → Dokumentasi lengkap

---

## 🚀 Penggunaan Cepat

### Windows PowerShell

#### Project Baru:
```powershell
# Buat project baru
.\setup-laravel.ps1 nama-project

# Contoh:
.\setup-laravel.ps1 warta-gereja
```

#### Fix Project Yang Ada:
```powershell
# Tanpa Breeze/Filament
.\fix-composer.ps1

# Dengan Breeze
.\fix-composer.ps1 -WithBreeze

# Dengan Filament
.\fix-composer.ps1 -WithFilament

# Dengan Breeze + Filament
.\fix-composer.ps1 -WithBreeze -WithFilament
```

### macOS / Linux / WSL

#### Project Baru:
```bash
# Berikan permission dulu
chmod +x setup-laravel.sh

# Buat project baru
./setup-laravel.sh nama-project

# Contoh:
./setup-laravel.sh warta-gereja
```

#### Fix Project Yang Ada:
```bash
# Berikan permission dulu
chmod +x fix-composer.sh

# Tanpa Breeze/Filament
./fix-composer.sh

# Dengan Breeze
./fix-composer.sh --with-breeze

# Dengan Filament
./fix-composer.sh --with-filament

# Dengan Breeze + Filament
./fix-composer.sh --with-breeze --with-filament
```

---

## 🔧 Untuk Project Warta Jemaat Gereja Ini

Karena project ini sudah ada, gunakan **fix-composer**:

### Windows:
```powershell
.\fix-composer.ps1
```

### Linux/WSL:
```bash
chmod +x fix-composer.sh
./fix-composer.sh
```

Script akan:
1. ✅ Clear composer cache
2. ✅ Hapus vendor/ dan composer.lock
3. ✅ Install ulang dengan `--prefer-source`
4. ✅ Generate APP_KEY (jika belum ada)
5. ✅ Install NPM dependencies
6. ✅ Build assets
7. ✅ Tanya apakah mau migrate database

---

## ⚡ One-Liner Manual (Alternatif)

Jika tidak mau pakai script, bisa jalankan manual:

### Windows PowerShell:
```powershell
$env:COMPOSER_PROCESS_TIMEOUT="900"; composer clear-cache; Remove-Item -Path vendor, composer.lock -Recurse -Force -ErrorAction SilentlyContinue; composer install --prefer-source --no-interaction; npm install; npm run build
```

### Linux/macOS/WSL:
```bash
export COMPOSER_PROCESS_TIMEOUT=900 && composer clear-cache && rm -rf vendor composer.lock && composer install --prefer-source --no-interaction && npm install && npm run build
```

---

## 🐛 Troubleshooting

### Error: "running scripts is disabled"
```powershell
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
```

### Masih Timeout?
Tingkatkan timeout:
```powershell
$env:COMPOSER_PROCESS_TIMEOUT="1800"  # 30 menit
```

### NPM Error?
Gunakan Node.js 18+:
```bash
node -v  # Cek versi
```

### Database Error?
1. Cek `.env` → DB_DATABASE harus sesuai
2. Pastikan database sudah dibuat di phpMyAdmin
3. Cek username/password MySQL

---

## 📊 Estimasi Waktu

| Tahap | Waktu |
|-------|-------|
| Clear cache | 10 detik |
| Hapus vendor | 5 detik |
| composer install | 10-15 menit |
| npm install | 2-5 menit |
| npm build | 30-60 detik |
| **TOTAL** | **~15-20 menit** |

---

## 🎯 Setelah Setup Berhasil

### Jalankan Development Server:

**Terminal 1:**
```bash
php artisan serve
```

**Terminal 2:**
```bash
npm run dev
```

### Akses Aplikasi:
- Frontend: http://localhost:8000
- Admin Login: http://localhost:8000/login
- Filament Admin: http://localhost:8000/admin

---

## 📝 Catatan Penting

1. ✅ Script ini mengatasi error "Could not authenticate against github.com"
2. ✅ Menggunakan `--prefer-source` untuk clone dari GitHub
3. ✅ Timeout diperpanjang jadi 15 menit
4. ⚠️ Koneksi internet harus stabil
5. ⚠️ Proses download bisa lama (tergantung koneksi)

---

## 🔗 Resources

- Laravel Docs: https://laravel.com/docs/11.x
- Breeze: https://laravel.com/docs/11.x/starter-kits#laravel-breeze
- Filament: https://filamentphp.com/docs/3.x

---

**💡 Tips:** Untuk project production, pertimbangkan setup GitHub token untuk akses API yang lebih cepat.
