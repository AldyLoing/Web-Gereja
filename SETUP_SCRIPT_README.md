# 🚀 Setup Laravel Otomatis

Script otomatis untuk menyiapkan proyek Laravel 11 + Breeze + Filament tanpa memerlukan token GitHub.

## 📋 Prasyarat

Pastikan sudah terinstall:
- **PHP** >= 8.2
- **Composer**
- **Node.js** & NPM
- **MySQL** atau database lainnya

## 🎯 Fitur

✅ Membuat project Laravel 11 baru  
✅ Install Laravel Breeze (Blade + Dark Mode)  
✅ Install Filament v3 (Admin Panel)  
✅ Setup .env otomatis  
✅ Generate application key  
✅ Build frontend assets  
✅ Migrasi database  
✅ Membuat user admin Filament  
✅ Mengatasi error "Could not authenticate against github.com"

## 🖥️ Cara Menggunakan

### Windows (PowerShell)

```powershell
# Jalankan script dengan nama project
.\setup-laravel.ps1 nama-project

# Contoh:
.\setup-laravel.ps1 warta-gereja
```

**Catatan untuk Windows:**  
Jika ada error "cannot be loaded because running scripts is disabled", jalankan dulu:
```powershell
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
```

### macOS / Linux / WSL

```bash
# Berikan permission execute
chmod +x setup-laravel.sh

# Jalankan script dengan nama project
./setup-laravel.sh nama-project

# Contoh:
./setup-laravel.sh warta-gereja
```

## 📦 Apa yang Dilakukan Script?

1. ✅ Membuat project Laravel 11 dengan `--prefer-source`
2. ✅ Copy `.env.example` ke `.env`
3. ✅ Generate application key (`php artisan key:generate`)
4. ✅ Install Laravel Breeze dengan Blade template
5. ✅ Install Filament v3
6. ✅ Install dan build NPM dependencies
7. ✅ Membuat storage symlink
8. ✅ Menjalankan database migration
9. ✅ Membuat user admin untuk Filament panel

## ⚙️ Konfigurasi Database

Setelah script selesai, edit file `.env` di project Anda:

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=nama_database_anda
DB_USERNAME=root
DB_PASSWORD=
```

**Penting:** Pastikan database sudah dibuat sebelum menjalankan migrasi!

## 🔧 Troubleshooting

### Error: "Could not authenticate against github.com"
✅ Script ini sudah mengatasi masalah ini dengan menggunakan `--prefer-source`

### Error: "Process timeout"
Script sudah mengatur `COMPOSER_PROCESS_TIMEOUT=600` (10 menit)

Jika masih timeout, tambahkan di command line:
```bash
export COMPOSER_PROCESS_TIMEOUT=1200  # 20 menit
```

### Error: "Class not found"
Jalankan:
```bash
composer dump-autoload
```

### NPM Build Error
Pastikan Node.js versi 18+ terinstall:
```bash
node -v
npm -v
```

## 🌐 Menjalankan Aplikasi

Setelah setup selesai:

**Terminal 1 - PHP Server:**
```bash
cd nama-project
php artisan serve
```

**Terminal 2 - Vite Dev Server:**
```bash
cd nama-project
npm run dev
```

Akses aplikasi di:
- **Frontend:** http://localhost:8000
- **Admin Panel (Filament):** http://localhost:8000/admin

## 📝 Customisasi Script

Script ini bisa dimodifikasi sesuai kebutuhan:

### Mengganti Database Default
Edit bagian migrasi di script:
```bash
# Ubah dari:
php artisan migrate --force

# Menjadi:
php artisan migrate --seed --force
```

### Menambahkan Package Lain
Tambahkan sebelum step build NPM:
```bash
composer require package/name --prefer-source --no-interaction
```

### Skip Pembuatan User Admin
Hapus atau comment bagian:
```bash
php artisan make:filament-user
```

## 🎉 Output Script

Ketika dijalankan, script akan menampilkan:

```
╔════════════════════════════════════════════════════════════╗
║        Setup Laravel 11 + Breeze + Filament               ║
║        Project: warta-gereja                               ║
╚════════════════════════════════════════════════════════════╝

🚀 Membuat project Laravel: warta-gereja
✅ Laravel berhasil dibuat
✅ File .env berhasil dibuat
✅ Application key berhasil dibuat
✅ Laravel Breeze berhasil diinstall
✅ Breeze scaffolding berhasil diinstall
✅ Filament berhasil diinstall
✅ Filament assets berhasil dipublish
✅ NPM dependencies berhasil diinstall
✅ Frontend assets berhasil dibuild
✅ Storage link berhasil dibuat
✅ Migrasi berhasil dijalankan
✅ User admin Filament telah dibuat

╔════════════════════════════════════════════════════════════╗
║                   🎉 SETUP SELESAI! 🎉                    ║
╚════════════════════════════════════════════════════════════╝
```

## 📚 Resources

- [Laravel 11 Documentation](https://laravel.com/docs/11.x)
- [Laravel Breeze](https://laravel.com/docs/11.x/starter-kits#laravel-breeze)
- [Filament v3](https://filamentphp.com/docs/3.x)

## 📄 License

MIT License - Silakan gunakan dan modifikasi sesuai kebutuhan.

---

**Dibuat untuk mengatasi masalah GitHub authentication saat install Laravel dependencies** 🚀
