# 🚀 Vercel Environment Variables Setup

## ✅ Build Berhasil! Tapi perlu Environment Variables

Error `?error=Configuration` di `/login` artinya:
- ✅ **Build SUCCESS**
- ✅ **Deploy SUCCESS**  
- ❌ **Environment Variables belum diset**

## 📝 Langkah-langkah Setup

### 1. Buka Vercel Dashboard

https://vercel.com/aldyloing/web-gereja/settings/environment-variables

Atau:
1. Login ke https://vercel.com
2. Pilih project **web-gereja** (atau web-imanuel)
3. Klik **Settings** (tab)
4. Klik **Environment Variables** (sidebar kiri)

### 2. Tambahkan Environment Variables Berikut

Klik tombol **"Add New"** untuk setiap variable:

#### **A. Supabase Configuration**

| Name | Value | Environments |
|------|-------|--------------|
| `SUPABASE_URL` | `https://pcfvuqqrewqprprfqoua.supabase.co` | Production, Preview, Development |
| `SUPABASE_ANON_KEY` | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBjZnZ1cXFyZXdxcHJwcmZxb3VhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzA1MzE5MTcsImV4cCI6MjA0NjEwNzkxN30.gIlPVpF1aI4MHbBJpwi2OC6pNlCg4L9VmZ3YB1j6P-Y` | Production, Preview, Development |

**⚠️ Perlu dari Supabase Dashboard:**

| Name | Value | Environments |
|------|-------|--------------|
| `SUPABASE_SERVICE_ROLE_KEY` | Get from Supabase Dashboard → Settings → API → service_role | Production, Preview, Development |
| `DATABASE_URL` | Get from Supabase Dashboard → Settings → Database → Connection String (Transaction Mode) | Production, Preview, Development |

#### **B. NextAuth Configuration**

| Name | Value | Environments |
|------|-------|--------------|
| `NEXTAUTH_SECRET` | Generate dengan: `openssl rand -base64 32` | Production, Preview, Development |
| `NEXTAUTH_URL` | `https://web-imanuel.vercel.app` | Production |
| `NEXTAUTH_URL` | (Auto: preview URL) | Preview |
| `NEXTAUTH_URL` | `http://localhost:3000` | Development |

#### **C. App Configuration (Optional)**

| Name | Value | Environments |
|------|-------|--------------|
| `NEXT_PUBLIC_APP_NAME` | `Web Gereja` | All |
| `NEXT_PUBLIC_APP_URL` | `https://web-imanuel.vercel.app` | Production |

### 3. Generate NEXTAUTH_SECRET

**Windows PowerShell:**
```powershell
# Install OpenSSL jika belum ada (via chocolatey)
choco install openssl

# Generate secret
openssl rand -base64 32
```

**Atau gunakan online:**
https://generate-secret.vercel.app/32

**Contoh output:**
```
Xm5K9pL3qR7sT2vW8yB4nD6gH1jM0oP5
```

### 4. Get Supabase Credentials

**Supabase Dashboard:**
https://supabase.com/dashboard/project/pcfvuqqrewqprprfqoua

#### **A. API Keys**
1. Go to **Settings** → **API**
2. Copy:
   - **anon public** → `SUPABASE_ANON_KEY` (sudah ada di atas)
   - **service_role** → `SUPABASE_SERVICE_ROLE_KEY` ⚠️

#### **B. Database URL**
1. Go to **Settings** → **Database**
2. Scroll to **Connection String**
3. Select **Transaction Mode**
4. Copy URL, replace `[YOUR-PASSWORD]` dengan password database Anda
5. Format: `postgresql://postgres.pcfvuqqrewqprprfqoua:[PASSWORD]@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres`

### 5. Save dan Redeploy

Setelah menambahkan semua environment variables:

**Option 1: Auto Redeploy**
- Klik tombol **"Redeploy"** di Vercel dashboard

**Option 2: Git Push**
```bash
git commit --allow-empty -m "trigger: Redeploy with env vars"
git push origin main
```

### 6. Verify

Setelah deployment selesai (1-2 menit):

**Test Login:**
https://web-imanuel.vercel.app/login

**Test Database:**
https://web-imanuel.vercel.app/api/test-db

Expected response:
```json
{
  "success": true,
  "message": "Database connection successful! ✅",
  "tables": {
    "members": { "exists": true, "totalRecords": 0 },
    "families": { "exists": true, "totalRecords": 0 }
  }
}
```

## 🔐 Security Checklist

- ✅ `.env.local` **tidak** di git (sudah di .gitignore)
- ✅ Environment variables hanya di Vercel dashboard
- ✅ `SUPABASE_SERVICE_ROLE_KEY` jangan di-expose ke client
- ✅ `NEXTAUTH_SECRET` harus unique & random

## 📊 Summary

**Required Variables (7):**
1. ✅ `SUPABASE_URL` (sudah ada)
2. ✅ `SUPABASE_ANON_KEY` (sudah ada)
3. ⏳ `SUPABASE_SERVICE_ROLE_KEY` (perlu dari Supabase)
4. ⏳ `DATABASE_URL` (perlu dari Supabase)
5. ⏳ `NEXTAUTH_SECRET` (generate sendiri)
6. ⏳ `NEXTAUTH_URL` (https://web-imanuel.vercel.app)
7. ✅ `NEXT_PUBLIC_APP_NAME` (optional)

**Optional Variables (2):**
- `NEXT_PUBLIC_APP_URL`
- Additional env vars sesuai kebutuhan

## 🆘 Troubleshooting

### Error: "Configuration error"
- Check `NEXTAUTH_SECRET` sudah diset
- Check `NEXTAUTH_URL` sesuai domain
- Redeploy setelah add env vars

### Error: "Database connection failed"
- Check `DATABASE_URL` format benar
- Check password database benar
- Check Supabase project active

### Error: "Unauthorized"
- Check `SUPABASE_SERVICE_ROLE_KEY` benar
- Check API keys valid di Supabase dashboard

## 📚 Related Docs

- [Vercel Environment Variables](https://vercel.com/docs/environment-variables)
- [NextAuth Configuration](https://next-auth.js.org/configuration/options)
- [Supabase Connection](https://supabase.com/docs/guides/database/connecting-to-postgres)
- [SUPABASE_SETUP.md](./SUPABASE_SETUP.md)

---

**Next Step:** Set environment variables di Vercel dashboard, lalu redeploy! 🚀
