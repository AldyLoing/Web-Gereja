# Warta Jemaat Gereja

Website Gereja berbasis Laravel 11 dengan fitur administrasi lengkap untuk mengelola jemaat, keluarga, kelompok pelayanan, dan warta jemaat.

## 🎯 Fitur Utama

### 1. Dashboard Admin
- Statistik total jemaat dan keluarga
- Distribusi anggota per kelompok gereja (PELNAP, PELRAP, PELWAP, PELPRIP, PELPAP)
- Jumlah ulang tahun bulan ini
- Jumlah baptisan bulan ini
- Visualisasi data dengan Chart.js (bar chart, pie chart, line chart)

### 2. Modul Warta Jemaat / Posts
- CRUD berita, pengumuman, renungan
- Multiple kategori per post
- Upload cover image
- Status Draft/Publish
- Rich text editor (TinyMCE)

### 3. Modul Jemaat Gereja
- **Kelompok Gereja**: Manajemen kelompok pelayanan
- **Keluarga**: Data keluarga jemaat dengan relasi ke anggota
- **Jemaat**: Data lengkap jemaat (NIK, KK, alamat, kontak, dll)
- **Baptisan**: Record baptisan dengan statistik
- **Ulang Tahun**: Daftar jemaat berulang tahun per bulan

### 4. Fitur Tambahan
- Dark mode dengan toggle
- Responsive design (Tailwind CSS)
- Soft delete untuk semua data
- Filter dan search di setiap modul
- Authentication dengan Laravel Breeze

## 🎨 Color Palette

- **Hijau Daun**: `#009345`
- **Hijau Tua**: `#007A36`
- **Cokelat Pasir**: `#D69A7A`
- **Kuning Emas**: `#F2C84B` → `#B88A2F`
- **Putih**: `#FFFFFF`

## 📋 Requirements

- PHP >= 8.2
- Composer
- Node.js & NPM
- MySQL >= 8.0

## 🚀 Instalasi

### 1. Clone atau Extract Project
```bash
cd "e:\Orders\Project\Web Gereja"
```

### 2. Install Dependencies
```bash
composer install
npm install
```

### 3. Setup Environment
```bash
copy .env.example .env
php artisan key:generate
```

### 4. Konfigurasi Database
Edit file `.env` dan sesuaikan kredensial database:
```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=warta_jemaat
DB_USERNAME=root
DB_PASSWORD=
```

### 5. Buat Database
Buat database MySQL dengan nama `warta_jemaat`

### 6. Migrasi & Seed Database
```bash
php artisan migrate --seed
```

Ini akan membuat:
- Semua tabel yang diperlukan
- User admin default
- Kelompok gereja (PELNAP, PELRAP, PELWAP, PELPRIP, PELPAP)
- Kategori post

### 7. Create Storage Link
```bash
php artisan storage:link
```

### 8. Compile Assets
```bash
npm run dev
```

Untuk production:
```bash
npm run build
```

### 9. Jalankan Server
```bash
php artisan serve
```

Akses aplikasi di: `http://localhost:8000`

## 👤 Login Default

- **Email**: admin@gereja.com
- **Password**: password

⚠️ **PENTING**: Ganti password default setelah login pertama!

## 📁 Struktur Database

### Members (Jemaat)
- Data pribadi lengkap
- Relasi ke Family
- Many-to-many ke Church Groups
- Relasi ke Baptisms

### Families (Keluarga)
- Nama keluarga
- Total anggota (auto-update)
- Has many Members

### Church Groups (Kelompok Gereja)
- PELNAP (Pemuda)
- PELRAP (Remaja)
- PELWAP (Wanita)
- PELPRIP (Pria)
- PELPAP (Anak)
- Many-to-many ke Members

### Baptisms
- Data baptisan
- Relasi ke Member
- Tanggal dan tempat baptis

### Posts
- Judul, slug, konten
- Cover image
- Status publish
- Many-to-many ke Categories

## 🔧 Konfigurasi Tambahan

### Upload Limit
Edit `php.ini` jika perlu upload file lebih besar:
```ini
upload_max_filesize = 10M
post_max_size = 10M
```

### Timezone
Sudah diset ke `Asia/Jakarta` di `.env`:
```env
APP_TIMEZONE=Asia/Jakarta
```

### Locale
Default locale bahasa Indonesia:
```env
APP_LOCALE=id
APP_FAKER_LOCALE=id_ID
```

## 📊 Cara Penggunaan

### 1. Dashboard
- Lihat statistik umum jemaat
- Monitor ulang tahun dan baptisan bulan ini
- Analisa distribusi kelompok dan usia

### 2. Tambah Jemaat
1. Menu **Jemaat** → **+ Tambah Jemaat**
2. Isi data lengkap (minimal: Nama, Gender, Status)
3. Pilih Keluarga (opsional)
4. Pilih Kelompok Gereja
5. Simpan

### 3. Tambah Postingan
1. Menu **Postingan** → **+ Tambah Postingan**
2. Isi judul dan konten
3. Upload cover (opsional)
4. Pilih kategori
5. Centang "Publish sekarang" untuk langsung publish

### 4. Lihat Ulang Tahun
- Menu **Ulang Tahun**
- Filter berdasarkan bulan
- Lihat daftar lengkap dengan kontak

## 🛠️ Development

### Menambah Kelompok Gereja Baru
Edit `database/seeders/ChurchGroupSeeder.php`

### Menambah Kategori Post
Edit `database/seeders/CategorySeeder.php`

### Custom Color Palette
Edit `tailwind.config.js` di bagian `colors`

## 📝 Notes

- Semua data menggunakan soft delete
- Auto-update total member di Family dan Church Group
- Support dark mode
- Responsive untuk mobile dan desktop
- Chart otomatis update berdasarkan data real-time

## 🐛 Troubleshooting

### Error "Class not found"
```bash
composer dump-autoload
```

### Error Asset tidak muncul
```bash
npm run build
php artisan optimize:clear
```

### Error Database
```bash
php artisan migrate:fresh --seed
```

## 📞 Support

Untuk bantuan lebih lanjut, hubungi administrator gereja.

---

**Warta Jemaat Gereja** - Sistem Manajemen Gereja Modern
Dibangun dengan ❤️ menggunakan Laravel 11
