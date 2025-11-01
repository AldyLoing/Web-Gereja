# 🚀 Quick Start Guide - Warta Jemaat Gereja

Panduan singkat untuk segera menjalankan aplikasi.

## ⚡ Instalasi Cepat (5 Menit)

### 1. Persiapan
Pastikan sudah terinstall:
- ✅ XAMPP/Laragon (PHP & MySQL)
- ✅ Composer
- ✅ Node.js & NPM

### 2. Install Dependencies
```powershell
composer install
npm install
```

### 3. Setup Environment
```powershell
copy .env.example .env
```

Edit `.env` - sesuaikan database:
```env
DB_DATABASE=warta_jemaat
DB_USERNAME=root
DB_PASSWORD=
```

### 4. Buat Database
Buat database MySQL bernama: `warta_jemaat`

### 5. Setup Aplikasi (Otomatis)
```powershell
php artisan app:setup
```

Atau manual:
```powershell
php artisan key:generate
php artisan migrate --seed
php artisan storage:link
```

### 6. Jalankan Aplikasi
Terminal 1 - Compile assets:
```powershell
npm run dev
```

Terminal 2 - Run server:
```powershell
php artisan serve
```

### 7. Akses Website
```
http://localhost:8000
```

**Login:**
- Email: `admin@gereja.com`
- Password: `password`

---

## 📌 Fitur Utama

### Dashboard
- Statistik jemaat & keluarga
- Ulang tahun bulan ini
- Baptisan bulan ini
- Chart distribusi kelompok

### Data Jemaat
- ➕ Tambah/Edit/Hapus Jemaat
- 🔍 Filter & Search
- 👨‍👩‍👧‍👦 Relasi keluarga
- 👥 Kelompok gereja

### Warta Jemaat
- 📝 CRUD Postingan
- 🖼️ Upload cover
- 📂 Multiple kategori
- ✍️ Rich text editor

### Kelompok
- PELNAP (Pemuda)
- PELRAP (Remaja)
- PELWAP (Wanita)
- PELPRIP (Pria)
- PELPAP (Anak)

---

## 🛠️ Command Berguna

### Reset Database
```powershell
php artisan migrate:fresh --seed
```

### Clear Cache
```powershell
php artisan optimize:clear
```

### Build untuk Production
```powershell
npm run build
php artisan config:cache
php artisan route:cache
```

---

## 🎯 Workflow Penggunaan

### 1. Setup Data Awal
1. Login ke admin panel
2. Tambah Keluarga
3. Tambah Jemaat (assign ke keluarga & kelompok)
4. Tambah data baptisan

### 2. Posting Warta
1. Menu **Postingan** → **+ Tambah**
2. Isi judul, konten, upload cover
3. Pilih kategori
4. Centang "Publish" untuk langsung publish

### 3. Monitoring
1. Cek dashboard untuk statistik
2. Menu **Ulang Tahun** untuk lihat yang berulang tahun
3. Menu **Baptisan** untuk data baptisan

---

## ❗ Troubleshooting Cepat

### Port 8000 sudah dipakai
```powershell
php artisan serve --port=8080
```

### Error "Class not found"
```powershell
composer dump-autoload
```

### Assets tidak muncul
```powershell
npm run build
php artisan optimize:clear
```

### Database error
1. Cek MySQL running
2. Cek `.env` DB settings
3. Pastikan database `warta_jemaat` ada

---

## 📞 Butuh Bantuan?

Lihat dokumentasi lengkap:
- **README.md** - Overview & fitur
- **INSTALLATION_GUIDE.md** - Panduan instalasi detail

---

**Happy Coding! 🎉**
