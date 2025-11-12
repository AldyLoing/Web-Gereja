# Warta Jemaat Gereja 🏛️

Website Gereja modern berbasis **Next.js 15**, **Prisma ORM**, dan **Supabase** dengan fitur administrasi lengkap untuk mengelola jemaat, keluarga, kelompok pelayanan, dan warta jemaat.

## 🎯 Fitur Utama

### 1. Dashboard Admin
- Statistik real-time total jemaat dan keluarga
- Distribusi anggota per kelompok gereja (PELNAP, PELRAP, PELWAP, PELPRIP, PELPAP)
- Jumlah ulang tahun bulan ini
- Jumlah baptisan bulan ini
- Visualisasi data dengan Recharts (bar chart, pie chart, line chart)
- Responsive dan interactive charts

### 2. Modul Warta Jemaat / Posts
- CRUD berita, pengumuman, renungan
- Multiple kategori per post
- Upload cover image ke Supabase Storage
- Status Draft/Publish
- Rich text editor (React Quill)
- Auto-generate slug dari judul

### 3. Modul Jemaat Gereja
- **Kelompok Gereja**: Manajemen kelompok pelayanan dengan statistik anggota
- **Keluarga**: Data keluarga jemaat dengan relasi ke anggota
- **Jemaat**: Data lengkap jemaat (NIK, KK, alamat, kontak, dll)
- **Baptisan**: Record baptisan dengan tempat dan tanggal
- **Ulang Tahun**: Daftar jemaat berulang tahun per bulan dengan filter

### 4. Fitur Tambahan
- Dark mode dengan toggle
- Responsive design (Tailwind CSS)
- Soft delete untuk semua data
- Filter dan search di setiap modul
- Authentication dengan NextAuth.js
- Server-side rendering (SSR)
- API Routes untuk semua operasi CRUD

## 🎨 Color Palette

- **Hijau Daun**: `#009345`
- **Hijau Tua**: `#007A36`
- **Cokelat Pasir**: `#D69A7A`
- **Kuning Emas**: `#F2C84B` → `#B88A2F`
- **Putih**: `#FFFFFF`

## 📋 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Database**: PostgreSQL (via Supabase)
- **ORM**: Prisma 5
- **Authentication**: NextAuth.js v4
- **UI**: Tailwind CSS + Shadcn/ui components
- **Charts**: Recharts
- **Forms**: React Hook Form + Zod validation
- **Storage**: Supabase Storage
- **Deployment**: Vercel

## 📋 Requirements

- Node.js >= 18.x
- NPM atau Yarn
- Supabase Account (free tier available)
- Git

## 🚀 Instalasi

### 1. Clone Repository
```bash
git clone https://github.com/AldyLoing/Web-Gereja.git
cd Web-Gereja
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Setup Supabase

#### a. Buat Project Supabase
1. Kunjungi [supabase.com](https://supabase.com)
2. Buat project baru
3. Tunggu database siap (±2 menit)

#### b. Setup Database
1. Buka SQL Editor di Supabase Dashboard
2. Copy dan jalankan file `database/init.sql`
3. Ini akan membuat semua tabel dan fungsi yang diperlukan

### 4. Setup Environment Variables
```bash
# Windows
copy .env.example .env

# Mac/Linux
cp .env.example .env
```

Edit file `.env` dan isi dengan kredensial Supabase Anda:
```env
# Database (Supabase PostgreSQL)
DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="[generate-random-secret]"

# Supabase
NEXT_PUBLIC_SUPABASE_URL="https://[YOUR-PROJECT-REF].supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="[YOUR-ANON-KEY]"
SUPABASE_SERVICE_ROLE_KEY="[YOUR-SERVICE-ROLE-KEY]"
```

**Generate NEXTAUTH_SECRET:**
```bash
openssl rand -base64 32
```

### 5. Generate Prisma Client
```bash
npm run prisma:generate
```

### 6. Run Database Migrations
```bash
npm run prisma:migrate
```

### 7. Seed Database (Optional)
Jalankan setup script untuk membuat data awal:
```bash
npm run setup:warta-gereja
```

Ini akan membuat:
- User admin default
- Kelompok gereja (PELNAP, PELRAP, PELWAP, PELPRIP, PELPAP)
- Kategori post (15 kategori)
- Sample data jemaat dan keluarga

### 8. Jalankan Development Server
```bash
npm run dev
```

Akses aplikasi di: `http://localhost:3000`

### 9. Build untuk Production
```bash
npm run build
npm start
```

## 👤 Login Default

- **Email**: admin@gereja.com
- **Password**: password

⚠️ **PENTING**: Ganti password default setelah login pertama!

## 📁 Struktur Project

```
Web-Gereja/
├── app/                      # Next.js App Router
│   ├── (auth)/              # Auth pages (login, register, forgot-password)
│   ├── admin/               # Admin dashboard & modules
│   │   ├── baptisms/       # Modul baptisan
│   │   ├── categories/     # Modul kategori
│   │   ├── church-groups/  # Modul kelompok gereja
│   │   ├── dashboard/      # Dashboard admin
│   │   ├── families/       # Modul keluarga
│   │   ├── members/        # Modul jemaat
│   │   ├── posts/          # Modul warta/postingan
│   │   └── settings/       # Pengaturan
│   ├── api/                # API Routes
│   └── posts/              # Public posts page
├── components/             # React components
│   ├── dashboard/         # Dashboard components
│   └── layout/            # Layout components
├── lib/                   # Utilities & configs
│   ├── auth.ts           # NextAuth configuration
│   ├── prisma.ts         # Prisma client
│   └── supabaseClient.ts # Supabase client
├── prisma/               # Prisma schema
│   └── schema.prisma
├── database/             # SQL files & migrations
│   └── init.sql         # Initial database setup
├── public/              # Static files
└── types/               # TypeScript types
```

## 📁 Struktur Database

### User
- Email, password (hashed with bcrypt)
- Name, role (admin/user)
- Authentication dengan NextAuth.js

### Member (Jemaat)
- Data pribadi lengkap (NIK, KK, nama, gender, tanggal lahir)
- Alamat lengkap, kontak (telp, email)
- Relasi ke Family (many-to-one)
- Relasi ke Church Groups (many-to-many via MemberChurchGroup)
- Relasi ke Baptisms (one-to-many)
- Status aktif/tidak aktif
- Soft delete support

### Family (Keluarga)
- Nama keluarga, nama kepala keluarga
- Nomor telepon keluarga
- Total anggota (auto-calculated)
- Relasi ke Members (one-to-many)

### ChurchGroup (Kelompok Gereja)
- Nama kelompok (PELNAP, PELRAP, PELWAP, PELPRIP, PELPAP)
- Deskripsi
- Total anggota (auto-calculated)
- Relasi ke Members (many-to-many)

### Baptism
- Tanggal baptis, tempat baptis
- Relasi ke Member (many-to-one)
- Pelayan baptis

### Post (Warta Jemaat)
- Judul, slug (auto-generated)
- Konten (rich text)
- Cover image URL (stored in Supabase Storage)
- Status (draft/published)
- Published date
- Relasi ke Categories (many-to-many via PostCategory)

### Category
- Nama kategori (Pengumuman, Renungan, Berita, dll)
- Slug
- Relasi ke Posts (many-to-many)

## 🔧 Konfigurasi

### Supabase Storage
Upload gambar cover post disimpan di Supabase Storage bucket `post-covers`:
- Max file size: 5MB
- Supported formats: JPG, PNG, WebP
- Public access untuk display

### Timezone
Default timezone `Asia/Jakarta` dikonfigurasi di:
- Prisma schema
- Next.js config
- Database functions

### Environment Variables
Semua konfigurasi environment ada di `.env`:
```env
# Database
DATABASE_URL=

# NextAuth
NEXTAUTH_URL=
NEXTAUTH_SECRET=

# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
```

## 📊 Cara Penggunaan

### 1. Dashboard Admin
1. Login dengan kredensial admin
2. Lihat statistik real-time:
   - Total jemaat, keluarga, kelompok
   - Ulang tahun dan baptisan bulan ini
3. Analisa charts:
   - Distribusi kelompok gereja
   - Gender distribution
   - Age groups
   - Baptisan per bulan

### 2. Manajemen Jemaat
1. **Tambah Jemaat**
   - Klik **Jemaat** → **+ Tambah Jemaat**
   - Isi data lengkap (NIK, nama, gender, tanggal lahir, dll)
   - Pilih keluarga dan kelompok gereja
   - Simpan

2. **Edit/Hapus Jemaat**
   - Klik tombol edit/hapus di tabel
   - Edit data atau soft delete

3. **Filter & Search**
   - Gunakan search box untuk cari nama
   - Filter by status, gender, kelompok

### 3. Manajemen Warta Jemaat
1. **Tambah Postingan**
   - Menu **Postingan** → **+ Tambah Postingan**
   - Isi judul dan konten dengan rich editor
   - Upload cover image (maks 5MB)
   - Pilih kategori (bisa multiple)
   - Set status: Draft atau Published
   - Simpan

2. **Publish/Unpublish**
   - Toggle status di halaman edit
   - Draft tidak muncul di halaman publik

### 4. Ulang Tahun & Baptisan
- **Ulang Tahun**: Filter per bulan, lihat nama dan kontak
- **Baptisan**: Record baptisan dengan tempat dan pelayan

## 🛠️ Development

### Prisma Commands
```bash
# Generate Prisma Client
npm run prisma:generate

# Run migrations
npm run prisma:migrate

# Open Prisma Studio (GUI database)
npm run prisma:studio

# Reset database
npx prisma migrate reset
```

### Menambah Fitur Baru
1. Tambah model di `prisma/schema.prisma`
2. Generate migration: `npx prisma migrate dev --name nama_fitur`
3. Buat API route di `app/api/`
4. Buat UI di `app/admin/`

### Custom Tailwind Theme
Edit `tailwind.config.ts` untuk customize:
- Colors
- Fonts
- Spacing
- Breakpoints

### Environment Variables
Jangan commit file `.env` ke repository!
Gunakan `.env.example` sebagai template.

## � Deployment ke Vercel

### 1. Push ke GitHub
```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

### 2. Deploy di Vercel
1. Login ke [vercel.com](https://vercel.com)
2. Import repository dari GitHub
3. Configure project:
   - Framework Preset: Next.js
   - Root Directory: ./
   - Build Command: `npm run build`
   - Output Directory: .next
4. Add Environment Variables (copy dari `.env`)
5. Deploy!

### 3. Update Vercel Environment
Setiap kali deploy, pastikan update:
- `NEXTAUTH_URL` → https://your-domain.vercel.app
- Supabase sudah production-ready

## 📝 Best Practices

- ✅ Gunakan TypeScript untuk type safety
- ✅ Validasi input dengan Zod
- ✅ Handle error dengan try-catch di API routes
- ✅ Gunakan Server Components untuk SEO
- ✅ Client Components hanya untuk interactivity
- ✅ Optimize images dengan Next.js Image
- ✅ Soft delete untuk data penting
- ✅ Auto-update calculated fields (total members)

## 🐛 Troubleshooting

### Error: Prisma Client not generated
```bash
npm run prisma:generate
```

### Error: Database connection failed
- Check `DATABASE_URL` di `.env`
- Pastikan Supabase project aktif
- Cek firewall/network

### Error: NextAuth session undefined
- Check `NEXTAUTH_URL` dan `NEXTAUTH_SECRET`
- Restart development server
- Clear browser cookies

### Error: Build failed on Vercel
- Check environment variables di Vercel
- Pastikan `DATABASE_URL` accessible dari Vercel
- Review build logs

### Images not loading
- Check Supabase Storage bucket `post-covers` exists
- Verify `SUPABASE_SERVICE_ROLE_KEY`
- Check image URL format

## � Screenshots

### Dashboard Admin
![Dashboard](docs/screenshots/dashboard.png)
*Real-time statistics dan interactive charts*

### Manajemen Jemaat
![Members](docs/screenshots/members.png)
*CRUD lengkap dengan filter dan search*

### Warta Jemaat
![Posts](docs/screenshots/posts.png)
*Rich text editor dengan upload gambar*

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork repository
2. Create feature branch: `git checkout -b feature/AmazingFeature`
3. Commit changes: `git commit -m 'Add some AmazingFeature'`
4. Push to branch: `git push origin feature/AmazingFeature`
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👨‍💻 Developer

**Aldy Loing**
- GitHub: [@AldyLoing](https://github.com/AldyLoing)
- Repository: [Web-Gereja](https://github.com/AldyLoing/Web-Gereja)

## 🙏 Acknowledgments

- Next.js Team untuk amazing framework
- Vercel untuk hosting platform
- Supabase untuk database dan storage
- Tailwind CSS untuk styling
- Shadcn/ui untuk beautiful components
- Recharts untuk data visualization

## �📞 Support

Untuk bantuan lebih lanjut, silakan:
- Buka issue di GitHub
- Hubungi administrator gereja
- Email: support@example.com

---

**Warta Jemaat Gereja** - Sistem Manajemen Gereja Modern  
Dibangun dengan ❤️ menggunakan Next.js 15, TypeScript, Prisma, dan Supabase

*Version 1.0.0 - Last Updated: November 2025*
