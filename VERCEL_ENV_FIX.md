# ⚠️ PERBAIKAN URGENT - Environment Variables Vercel

## Masalah
Error: `Can't reach database server at 'aws-1-ap-southeast-1.pooler.supabase.com:5432'`
- Prisma tidak bisa connect ke database di production
- Environment variable `DATABASE_URL` di Vercel masih salah

## Solusi - Update Environment Variables di Vercel

### 1. Buka Vercel Dashboard
- Go to: https://vercel.com/aldyloings-projects/web-imanuel/settings/environment-variables

### 2. Update DATABASE_URL
**HAPUS** value yang lama, ganti dengan:
```
postgresql://postgres.pcfvuqqrewqprprfqoua:uYH9Z1wlPIljgsuJ@aws-1-ap-southeast-1.pooler.supabase.com:5432/postgres
```

### 3. Pastikan Environment Variables Lengkap
Cek semua variable berikut ada dan benar:

#### Database
- `DATABASE_URL` = `postgresql://postgres.pcfvuqqrewqprprfqoua:uYH9Z1wlPIljgsuJ@aws-1-ap-southeast-1.pooler.supabase.com:5432/postgres`

#### Supabase
- `SUPABASE_URL` = `https://pcfvuqqrewqprprfqoua.supabase.co`
- `SUPABASE_ANON_KEY` = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBjZnZ1cXFyZXdxcHJwcmZxb3VhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzA1MzE5MTcsImV4cCI6MjA0NjEwNzkxN30.gIlPVpF1aI4MHbBJpwi2OC6pNlCg4L9VmZ3YB1j6P-Y`

#### NextAuth
- `NEXTAUTH_SECRET` = `NTVPX17fhKMkjJBYwZqEFiU4vAlW2nGd`
- `NEXTAUTH_URL` = `https://web-imanuel.vercel.app`

#### App
- `NEXT_PUBLIC_APP_NAME` = `Web Gereja`
- `NEXT_PUBLIC_APP_URL` = `https://web-imanuel.vercel.app`

### 4. Redeploy
Setelah update environment variables, Vercel akan otomatis redeploy.
Atau manual redeploy di: https://vercel.com/aldyloings-projects/web-imanuel

## ⚠️ PENTING - Kesalahan Umum DATABASE_URL

### ❌ SALAH (Transaction Pooler - Port 6543)
```
postgresql://postgres.pcfvuqqrewqprprfqoua:password@aws-1-ap-southeast-1.pooler.supabase.com:6543/postgres?pgbouncer=true
```
**Kenapa salah:** Transaction pooler tidak support Prisma prepared statements

### ✅ BENAR (Session Pooler - Port 5432)
```
postgresql://postgres.pcfvuqqrewqprprfqoua:uYH9Z1wlPIljgsuJ@aws-1-ap-southeast-1.pooler.supabase.com:5432/postgres
```
**Kenapa benar:** Session pooler support semua fitur Prisma

## Cara Update di Vercel (Step by Step)

1. **Login ke Vercel:** https://vercel.com
2. **Pilih Project:** `web-imanuel`
3. **Settings Tab** → **Environment Variables**
4. **Cari DATABASE_URL** → Click **Edit** (icon pensil)
5. **Paste value baru:** `postgresql://postgres.pcfvuqqrewqprprfqoua:uYH9Z1wlPIljgsuJ@aws-1-ap-southeast-1.pooler.supabase.com:5432/postgres`
6. **Environment:** Pilih semua (Production, Preview, Development)
7. **Save**
8. **Deployments Tab** → Click **Redeploy** (atau tunggu auto redeploy)

## Verifikasi Setelah Deploy

Test halaman ini:
- ✅ Login: https://web-imanuel.vercel.app/login
- ✅ Dashboard: https://web-imanuel.vercel.app/admin/dashboard
- ✅ Tambah Jemaat: https://web-imanuel.vercel.app/admin/members/create
- ✅ Data Jemaat: https://web-imanuel.vercel.app/admin/members

## Troubleshooting

### Jika masih error setelah update:
1. Clear browser cache (Ctrl + Shift + Delete)
2. Tunggu 3-5 menit untuk deployment selesai
3. Cek Vercel deployment logs untuk error lain
4. Pastikan password database tidak ada special characters yang perlu di-encode

### Jika lupa password Supabase:
1. Reset di Supabase Dashboard → Settings → Database → Reset Password
2. Gunakan password sederhana (huruf + angka saja, tanpa special chars)
3. Update DATABASE_URL di Vercel dengan password baru
