# 🔴 URGENT FIX: Database Connection Issue

## ❌ Problem
- Login gagal: "Email atau password salah"
- Registrasi tidak masuk database
- Data tidak tersimpan

## ✅ Root Cause
DATABASE_URL di Vercel kemungkinan salah format atau password encoding bermasalah.

---

## 🔧 SOLUSI STEP-BY-STEP

### STEP 1: Cek Database Connection

Buka di browser: https://web-imanuel.vercel.app/api/test-db

**Jika muncul error atau success: false** → DATABASE_URL salah!

---

### STEP 2: Update DATABASE_URL di Vercel

**Password Supabase Anda:** `@41DYl01ngg`  
**URL-encoded password:** `%4041DYl01ngg`

**DATABASE_URL yang BENAR 100%:**

```
postgresql://postgres.pcfvuqqrewqprprfqoua:%4041DYl01ngg@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres
```

#### Cara Update di Vercel:

1. Buka: https://vercel.com/aldyloing/web-gereja/settings/environment-variables

2. Cari variable **DATABASE_URL**

3. Klik tombol **Edit** (titik tiga di kanan)

4. **HAPUS value yang lama**

5. **Paste value yang baru** (copy dari atas ☝️)

6. Pastikan centang: ✅ Production ✅ Preview ✅ Development

7. Klik **Save**

---

### STEP 3: Redeploy

**PENTING:** Setelah update environment variable, **HARUS redeploy!**

1. Buka: https://vercel.com/aldyloing/web-gereja

2. Klik tab **Deployments**

3. Klik titik tiga (...) di deployment paling atas

4. Klik **Redeploy**

5. Tunggu 2-3 menit sampai status jadi **Ready**

---

### STEP 4: Update Password Admin di Database

Setelah DATABASE_URL fix dan redeploy selesai:

1. Buka: https://supabase.com/dashboard/project/pcfvuqqrewqprprfqoua/sql/new

2. Jalankan SQL ini:

```sql
-- Update password admin dengan hash yang benar untuk 'admin123'
UPDATE "users" 
SET "password" = '$2b$10$saSx9.mS3Q4fKbeLJYJIRe56zmZ.oX21jAtzvb3WliaQ8BDqAFFIC',
    "updatedAt" = CURRENT_TIMESTAMP
WHERE "email" = 'admin@gereja.com';

-- Jika belum ada, create admin baru
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

-- Verify
SELECT id, name, email, role, 
       substring(password, 1, 25) || '...' as password_check
FROM "users" 
WHERE "email" = 'admin@gereja.com';
```

3. Klik **RUN**

4. Pastikan muncul data admin dengan password_check: `$2b$10$saSx9.mS3Q4fKbeL...`

---

### STEP 5: Test Login

1. Buka: https://web-imanuel.vercel.app/login

2. Login:
   - Email: `admin@gereja.com`
   - Password: `admin123`

3. Klik **Masuk**

4. **Seharusnya berhasil masuk ke dashboard!** ✅

---

### STEP 6: Test Database Connection

Buka: https://web-imanuel.vercel.app/api/test-db

**Harus muncul:**
```json
{
  "success": true,
  "message": "Database connection successful",
  "tables": {
    "users": 1,
    "members": 0,
    "families": 0,
    ...
  }
}
```

---

### STEP 7: Test Registrasi

1. Buka: https://web-imanuel.vercel.app/register

2. Daftar dengan email baru (contoh: test@example.com)

3. Setelah berhasil, cek di Supabase:
   - Buka: https://supabase.com/dashboard/project/pcfvuqqrewqprprfqoua/editor
   - Klik table **users**
   - Cari email yang baru didaftarkan
   - **Harus ada!** ✅

---

## 📝 Checklist

- [ ] Test /api/test-db (harus success: true)
- [ ] Update DATABASE_URL di Vercel jika ada error
- [ ] Redeploy Vercel
- [ ] Jalankan SQL update password admin
- [ ] Test login dengan admin@gereja.com / admin123
- [ ] Test registrasi user baru
- [ ] Verify data masuk ke database

---

## 🆘 Jika Masih Error

Screenshot hasil dari:
1. https://web-imanuel.vercel.app/api/test-db
2. Error message yang muncul di login page
3. Vercel deployment logs (jika ada error)

Dan tanyakan ke saya!
