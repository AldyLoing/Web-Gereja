# 🚀 QUICK SETUP: Copy-Paste ke Vercel

Buka: https://vercel.com/aldyloing/web-gereja/settings/environment-variables

---

## Variable 1: SUPABASE_URL
```
Name: SUPABASE_URL
Value: https://pcfvuqqrewqprprfqoua.supabase.co
Environments: ✅ Production ✅ Preview ✅ Development
```

---

## Variable 2: SUPABASE_ANON_KEY
```
Name: SUPABASE_ANON_KEY
Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBjZnZ1cXFyZXdxcHJwcmZxb3VhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzA1MzE5MTcsImV4cCI6MjA0NjEwNzkxN30.gIlPVpF1aI4MHbBJpwi2OC6pNlCg4L9VmZ3YB1j6P-Y
Environments: ✅ Production ✅ Preview ✅ Development
```

---

## Variable 3: DATABASE_URL
```
Name: DATABASE_URL
Value: postgresql://postgres.pcfvuqqrewqprprfqoua:%4041DYl01ngg@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres
Environments: ✅ Production ✅ Preview ✅ Development
```

---

## Variable 4: NEXTAUTH_SECRET
```
Name: NEXTAUTH_SECRET
Value: NTVPX17fhKMkjJBYwZqEFiU4vAlW2nGd
Environments: ✅ Production ✅ Preview ✅ Development
```

---

## Variable 5: NEXTAUTH_URL (Production)
```
Name: NEXTAUTH_URL
Value: https://web-imanuel.vercel.app
Environments: ✅ Production ONLY
```

---

## Variable 6: NEXTAUTH_URL (Preview)
```
Name: NEXTAUTH_URL
Value: $VERCEL_URL
Environments: ✅ Preview ONLY
```

---

## Variable 7: NEXTAUTH_URL (Development)
```
Name: NEXTAUTH_URL
Value: http://localhost:3000
Environments: ✅ Development ONLY
```

---

## ⚠️ MASIH PERLU: SUPABASE_SERVICE_ROLE_KEY

1. Buka: https://supabase.com/dashboard/project/pcfvuqqrewqprprfqoua
2. Go to: **Settings** → **API**
3. Scroll ke **Project API keys**
4. Copy key **service_role** (secret key)
5. Add variable di Vercel:

```
Name: SUPABASE_SERVICE_ROLE_KEY
Value: (paste key dari Supabase)
Environments: ✅ Production ✅ Preview ✅ Development
```

---

## 🎯 Setelah Semua Variable Ditambahkan:

1. Klik tombol **"Redeploy"** di Vercel dashboard
2. Tunggu 2-3 menit
3. Test: https://web-imanuel.vercel.app/login
4. Test: https://web-imanuel.vercel.app/api/test-db

---

## ✅ Checklist

- [ ] SUPABASE_URL
- [ ] SUPABASE_ANON_KEY
- [ ] SUPABASE_SERVICE_ROLE_KEY (ambil dari Supabase)
- [ ] DATABASE_URL
- [ ] NEXTAUTH_SECRET
- [ ] NEXTAUTH_URL (3 values untuk 3 environments)
- [ ] Redeploy
- [ ] Test login
- [ ] Test database connection
