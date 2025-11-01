# 📖 Panduan Instalasi Lengkap - Warta Jemaat Gereja

## Persiapan Sistem

### 1. Install XAMPP atau Laragon
Download dan install salah satu:
- **XAMPP**: https://www.apachefriends.org/
- **Laragon**: https://laragon.org/ (Recommended untuk Windows)

### 2. Install Composer
Download dari: https://getcomposer.org/download/

Verifikasi instalasi:
```bash
composer --version
```

### 3. Install Node.js & NPM
Download dari: https://nodejs.org/ (LTS Version)

Verifikasi instalasi:
```bash
node --version
npm --version
```

## Langkah Instalasi

### Step 1: Ekstrak Project
Ekstrak file project ke folder:
```
e:\Orders\Project\Web Gereja
```

### Step 2: Buka Terminal/PowerShell
Buka PowerShell sebagai Administrator, lalu navigasi ke folder project:
```powershell
cd "e:\Orders\Project\Web Gereja"
```

### Step 3: Install Dependencies PHP
```powershell
composer install
```

Tunggu hingga selesai (5-10 menit tergantung koneksi internet).

### Step 4: Install Dependencies JavaScript
```powershell
npm install
```

### Step 5: Setup Environment
Copy file environment:
```powershell
copy .env.example .env
```

Generate application key:
```powershell
php artisan key:generate
```

### Step 6: Konfigurasi Database

#### A. Buat Database MySQL
1. Buka phpMyAdmin (http://localhost/phpmyadmin)
2. Klik "New" atau "Baru"
3. Nama database: `warta_jemaat`
4. Collation: `utf8mb4_unicode_ci`
5. Klik "Create"

#### B. Edit File .env
Buka file `.env` dengan text editor, ubah bagian database:
```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=warta_jemaat
DB_USERNAME=root
DB_PASSWORD=
```

**Catatan**: 
- Jika menggunakan password MySQL, isi `DB_PASSWORD`
- Jika port MySQL berbeda, ubah `DB_PORT`

### Step 7: Migrasi Database & Seeding
```powershell
php artisan migrate --seed
```

Perintah ini akan:
- Membuat semua tabel database
- Mengisi data awal (user admin, kelompok gereja, kategori)

### Step 8: Create Storage Link
```powershell
php artisan storage:link
```

### Step 9: Compile Assets (Development Mode)
Buka terminal baru (jangan tutup yang lama), jalankan:
```powershell
npm run dev
```

Biarkan terminal ini tetap berjalan.

### Step 10: Jalankan Server Laravel
Di terminal pertama, jalankan:
```powershell
php artisan serve
```

## Akses Website

Buka browser dan akses:
```
http://localhost:8000
```

### Login Credentials
- **Email**: admin@gereja.com
- **Password**: password

⚠️ **PENTING**: Ganti password setelah login pertama!

## Troubleshooting

### Error: "could not find driver"
Install PHP MySQL extension:
1. Buka `php.ini` (cari di folder PHP XAMPP/Laragon)
2. Uncomment line: `;extension=pdo_mysql` menjadi `extension=pdo_mysql`
3. Restart Apache/Web Server

### Error: "Class not found"
```powershell
composer dump-autoload
php artisan config:clear
php artisan cache:clear
```

### Error: "Permission denied" (Linux/Mac)
```bash
chmod -R 775 storage bootstrap/cache
```

### Error: "npm run dev" tidak jalan
```powershell
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### Error: "Port 8000 already in use"
Gunakan port lain:
```powershell
php artisan serve --port=8080
```

Akses di: http://localhost:8080

### Database Connection Error
1. Pastikan MySQL/MariaDB berjalan
2. Cek username & password di `.env`
3. Cek database `warta_jemaat` sudah dibuat
4. Test koneksi:
```powershell
php artisan migrate:status
```

## Build untuk Production

Setelah development selesai, compile assets untuk production:

```powershell
npm run build
```

Optimasi Laravel:
```powershell
php artisan config:cache
php artisan route:cache
php artisan view:cache
```

## Import Data dari SQL Dump (Opsional)

Jika Anda memiliki data backup SQL:

### Via phpMyAdmin:
1. Buka phpMyAdmin
2. Pilih database `warta_jemaat`
3. Klik tab "Import"
4. Choose file: `dump-warta_jemaat-202510291708.sql`
5. Klik "Go"

### Via Command Line:
```powershell
mysql -u root -p warta_jemaat < dump-warta_jemaat-202510291708.sql
```

## Struktur Folder Penting

```
Web Gereja/
├── app/
│   ├── Http/Controllers/Admin/  # Controllers untuk admin
│   └── Models/                   # Models database
├── database/
│   ├── migrations/               # Schema database
│   └── seeders/                  # Data awal
├── resources/
│   ├── views/admin/              # View admin panel
│   ├── css/app.css               # Tailwind CSS
│   └── js/app.js                 # JavaScript
├── routes/
│   └── web.php                   # Route definitions
├── public/                       # Public assets
├── storage/
│   └── app/public/               # Upload files
├── .env                          # Environment config
└── composer.json                 # PHP dependencies
```

## Tips Penggunaan

### 1. Menambah User Admin Baru
```powershell
php artisan tinker
```

Lalu jalankan:
```php
User::create([
    'name' => 'Admin Baru',
    'email' => 'admin2@gereja.com',
    'password' => Hash::make('password123'),
    'email_verified_at' => now()
]);
```

### 2. Backup Database
```powershell
php artisan db:backup
```

Atau manual via phpMyAdmin: Export → SQL

### 3. Reset Database (⚠️ Hapus semua data)
```powershell
php artisan migrate:fresh --seed
```

### 4. Clear All Cache
```powershell
php artisan optimize:clear
```

## Update & Maintenance

### Update Dependencies
```powershell
composer update
npm update
```

### Check for Security Issues
```powershell
composer audit
npm audit
```

## Support

Untuk bantuan lebih lanjut:
1. Baca file `README.md`
2. Cek Laravel Documentation: https://laravel.com/docs/11.x
3. Hubungi developer/administrator

---

**Selamat! Website Warta Jemaat Gereja siap digunakan! 🎉**
