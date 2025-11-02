# 🔧 FIX LOGIN ISSUE - Langkah per Langkah

## ❌ Error yang Terjadi:
"Email atau password salah. Silakan coba lagi."

## ✅ Solusi:

### 📍 LANGKAH 1: Buka Supabase SQL Editor

Klik link ini:
👉 **https://supabase.com/dashboard/project/pcfvuqqrewqprprfqoua/sql/new**

---

### 📍 LANGKAH 2: Copy SQL Script

Buka file: **`database/fix-admin-login.sql`**

Atau copy SQL ini:

```sql
-- Step 1: Check if admin user exists
SELECT id, name, email, role, 
       CASE 
         WHEN password IS NULL THEN 'NO PASSWORD SET'
         WHEN length(password) < 10 THEN 'INVALID HASH'
         ELSE 'HAS PASSWORD'
       END as password_status,
       "createdAt", "updatedAt"
FROM "users" 
WHERE "email" = 'admin@gereja.com';

-- Step 2: Update password
UPDATE "users" 
SET "password" = '$2b$10$saSx9.mS3Q4fKbeLJYJIRe56zmZ.oX21jAtzvb3WliaQ8BDqAFFIC',
    "updatedAt" = CURRENT_TIMESTAMP
WHERE "email" = 'admin@gereja.com';

-- Step 3: Create admin if not exists
INSERT INTO "users" (id, name, email, password, role, "createdAt", "updatedAt")
SELECT 
    gen_random_uuid()::TEXT,
    'Administrator',
    'admin@gereja.com',
    '$2b$10$saSx9.mS3Q4fKbeLJYJIRe56zmZ.oX21jAtzvb3WliaQ8BDqAFFIC',
    'ADMIN',
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
WHERE NOT EXISTS (
    SELECT 1 FROM "users" WHERE "email" = 'admin@gereja.com'
);

-- Step 4: Verify
SELECT id, name, email, role, 
       substring(password, 1, 20) || '...' as password_preview,
       "createdAt", "updatedAt"
FROM "users" 
WHERE "email" = 'admin@gereja.com';
```

---

### 📍 LANGKAH 3: Paste & Run

1. **Paste** SQL di atas ke Supabase SQL Editor
2. **Klik tombol RUN** (atau tekan Ctrl+Enter)
3. **Tunggu** sampai muncul hasil:
   - ✅ "Success" 
   - Akan muncul data admin dengan password yang sudah ter-update

---

### 📍 LANGKAH 4: Test Login

Setelah SQL berhasil dijalankan:

1. Buka: **https://web-imanuel.vercel.app/login**
2. Login dengan:
   - **Email**: `admin@gereja.com`
   - **Password**: `admin123`
3. Klik **Masuk**
4. Seharusnya berhasil masuk ke dashboard! ✅

---

## 🔍 Troubleshooting

### Jika masih error "Email atau password salah":

**Kemungkinan 1**: Environment variables belum diset di Vercel
- Cek: https://vercel.com/aldyloing/web-gereja/settings/environment-variables
- Pastikan **DATABASE_URL** sudah ada
- Pastikan **NEXTAUTH_SECRET** sudah ada

**Kemungkinan 2**: User admin tidak ada di database
- Jalankan SQL Step 3 (INSERT) di atas
- Pastikan muncul "Success" tanpa error

**Kemungkinan 3**: Koneksi database gagal
- Test endpoint: https://web-imanuel.vercel.app/api/test-db
- Jika error, berarti DATABASE_URL salah atau database tidak bisa diakses

---

## 📝 Catatan Penting

**Password Hash yang Benar:**
```
$2b$10$saSx9.mS3Q4fKbeLJYJIRe56zmZ.oX21jAtzvb3WliaQ8BDqAFFIC
```

Ini adalah bcrypt hash untuk password: **`admin123`**

Hash lama yang salah:
```
$2a$10$rZ5YxJ5h5fKL7KLxW5Y8.eX5F8WxYqN9Y8.eX5F8WxYqN9Y8.eX5F8
```

---

## ✅ Setelah Berhasil Login

Anda bisa:
1. ✅ Akses dashboard: `/admin/dashboard`
2. ✅ Lihat data jemaat: `/admin/members`
3. ✅ Tambah jemaat: `/admin/members/create`
4. ✅ Kelola data lainnya (families, baptisms, posts, dll)

---

**Butuh bantuan?** Tanyakan jika masih ada error!
