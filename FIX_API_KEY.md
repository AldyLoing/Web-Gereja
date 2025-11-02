# 🔴 URGENT: API Key Invalid - Fix Guide

## ❌ Error
```
"Invalid API key" 
"Double check your Supabase anon or service_role API key"
```

## ✅ Root Cause
SUPABASE_ANON_KEY di Vercel tidak valid atau salah.

---

## 🔧 SOLUSI: Ambil API Key yang Benar dari Supabase

### STEP 1: Buka Supabase Settings

Klik link ini: 👉 **https://supabase.com/dashboard/project/pcfvuqqrewqprprfqoua/settings/api**

---

### STEP 2: Copy API Keys yang Benar

Di halaman **Settings → API**, akan ada section **Project API keys**:

#### 1. Copy **Project URL**
```
https://pcfvuqqrewqprprfqoua.supabase.co
```
Simpan ini untuk SUPABASE_URL

#### 2. Copy **anon public** key
Ini adalah JWT token yang panjang, biasanya dimulai dengan `eyJ...`

Contoh format:
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBjZnZ1cXFyZXdxcHJwcmZxb3VhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzA1MzE5MTcsImV4cCI6MjA0NjEwNzkxN30.gIlPVpF1aI4MHbBJpwi2OC6pNlCg4L9VmZ3YB1j6P-Y
```
Simpan ini untuk SUPABASE_ANON_KEY

#### 3. Copy **service_role secret** key
Ini juga JWT token panjang, tapi berbeda dengan anon key.

**PENTING:** Klik tombol **Reveal** atau **Show** untuk melihat key-nya.

Simpan ini untuk SUPABASE_SERVICE_ROLE_KEY

---

### STEP 3: Update di Vercel

Buka: https://vercel.com/aldyloing/web-gereja/settings/environment-variables

#### Update SUPABASE_ANON_KEY:
1. Cari variable **SUPABASE_ANON_KEY**
2. Klik tombol **Edit** (titik tiga)
3. **Hapus value lama**
4. **Paste anon key yang baru** (dari Supabase dashboard)
5. Centang: ✅ Production ✅ Preview ✅ Development
6. Klik **Save**

#### Add SUPABASE_SERVICE_ROLE_KEY (jika belum ada):
1. Klik **Add New**
2. Name: `SUPABASE_SERVICE_ROLE_KEY`
3. Value: (paste service_role key dari Supabase)
4. Centang: ✅ Production ✅ Preview ✅ Development
5. Klik **Save**

---

### STEP 4: Redeploy

**WAJIB!** Environment variables tidak otomatis ter-apply.

1. Buka: https://vercel.com/aldyloing/web-gereja
2. Tab **Deployments**
3. Klik titik tiga (...) di deployment teratas
4. Klik **Redeploy**
5. Tunggu 2-3 menit

---

### STEP 5: Test Lagi

Setelah deployment selesai:

**Test database connection:**
https://web-imanuel.vercel.app/api/test-db

**Harus muncul:**
```json
{
  "success": true,
  "message": "Database connection successful"
}
```

---

## 📝 Checklist

- [ ] Buka Supabase Settings → API
- [ ] Copy SUPABASE_ANON_KEY yang benar
- [ ] Copy SUPABASE_SERVICE_ROLE_KEY yang benar
- [ ] Update di Vercel
- [ ] Redeploy
- [ ] Test /api/test-db (harus success: true)

---

## 🎯 Setelah API Key Fix

Lanjut ke step berikutnya:

1. ✅ Database connection berhasil
2. ⏭️ Update password admin di database
3. ⏭️ Test login

---

**Kalau masih ada error, screenshot error-nya!**
