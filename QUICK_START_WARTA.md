# ⚡ Quick Start - Warta Gereja

## 🎯 Setup Cepat (5 Menit)

### 1. Clone & Install

```bash
git clone https://github.com/AldyLoing/Web-Gereja.git
cd Web-Gereja
npm install --legacy-peer-deps
```

### 2. Environment Variables

```bash
# Buat file .env
cp .env.example .env
```

Edit `.env`:
```env
DATABASE_URL="postgresql://user:password@host:5432/database"
NEXTAUTH_SECRET="generate-dengan-openssl-rand-base64-32"
NEXTAUTH_URL="http://localhost:3000"
SUPABASE_URL="https://xxx.supabase.co"
SUPABASE_ANON_KEY="your-key"
```

### 3. Database Setup

```bash
# Generate Prisma Client
npx prisma generate

# Run migrations
npx prisma migrate dev --name init

# Open Prisma Studio (optional)
npx prisma studio
```

### 4. Seed Admin User

Create `prisma/seed.ts`:

```typescript
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash('admin123', 10);
  
  await prisma.user.upsert({
    where: { email: 'admin@gereja.com' },
    update: {},
    create: {
      email: 'admin@gereja.com',
      name: 'Administrator',
      password: hashedPassword,
      role: 'ADMIN'
    }
  });

  console.log('✅ Admin user created!');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
```

Add to `package.json`:
```json
"prisma": {
  "seed": "ts-node prisma/seed.ts"
}
```

Run seed:
```bash
npm install -D ts-node
npx prisma db seed
```

### 5. Start Development

```bash
npm run dev
```

Buka: http://localhost:3000

## 🔐 Login

- **URL**: http://localhost:3000/login
- **Email**: admin@gereja.com
- **Password**: admin123

## 📱 Pages

### Public
- `/` - Homepage
- `/posts` - Warta Jemaat
- `/login` - Login Page
- `/register` - Register Page
- `/forgot-password` - Reset Password

### Admin (hanya ADMIN role)
- `/admin/dashboard` - Dashboard Statistik
- `/admin/members` - Data Jemaat
- `/admin/families` - Data Keluarga
- `/admin/church-groups` - Kelompok Gereja
- `/admin/baptisms` - Data Baptisan
- `/admin/posts` - Kelola Warta
- `/admin/categories` - Kategori Warta
- `/admin/settings` - Pengaturan

## 🔧 Commands Penting

```bash
# Development
npm run dev                    # Start dev server

# Build
npm run build                  # Build for production
npm start                      # Start production server

# Prisma
npx prisma generate            # Generate Prisma Client
npx prisma migrate dev         # Run migrations
npx prisma studio              # Open Prisma Studio
npx prisma db push             # Push schema to DB (tanpa migration)
npx prisma db seed             # Seed database

# Setup Script
npm run setup:warta-gereja     # Re-generate semua files

# Linting
npm run lint                   # Run ESLint
```

## 📊 Database Models

```
User (auth)
  ↓
Member (jemaat)
  ├── Family (1:N)
  ├── ChurchGroup (N:M via pivot)
  └── Baptism (1:1)

Post (warta)
  └── Category (N:M via pivot)
```

## 🎨 Church Colors

```javascript
// Tailwind classes
bg-church-green         // #009345
bg-church-green-light   // #00B857
bg-church-green-dark    // #007A36
bg-church-gold          // #B88A2F
bg-church-brown         // #D69A7A
```

## 🚀 Deploy ke Vercel

```bash
# Push ke GitHub
git push origin main

# Di Vercel Dashboard:
# 1. Import dari GitHub
# 2. Add environment variables (DATABASE_URL, NEXTAUTH_SECRET, dll)
# 3. Deploy!
```

Environment variables di Vercel:
- `DATABASE_URL`
- `NEXTAUTH_SECRET`
- `NEXTAUTH_URL` (https://your-domain.vercel.app)
- `SUPABASE_URL`
- `SUPABASE_ANON_KEY`

Build command: `prisma generate && next build`

## 🐛 Troubleshooting

### Migration Error
```bash
npx prisma migrate reset  # ⚠️ HAPUS semua data!
npx prisma migrate dev
```

### Auth Not Working
Check:
1. `NEXTAUTH_SECRET` di .env
2. `NEXTAUTH_URL` sesuai domain
3. Admin user sudah di-seed

### Build Error
```bash
rm -rf .next node_modules
npm install --legacy-peer-deps
npm run build
```

### Type Errors
```bash
npx prisma generate  # Regenerate Prisma types
```

## 📝 Next Steps

1. ✅ Login ke /admin
2. ⏳ Tambah data dummy (jemaat, keluarga, kelompok)
3. ⏳ Test CRUD operations
4. ⏳ Implement form CREATE/EDIT
5. ⏳ Add image upload
6. ⏳ Deploy to Vercel

## 💡 Tips

- Gunakan **Prisma Studio** untuk edit database dengan GUI
- Install **Prisma VS Code extension** untuk autocomplete
- Gunakan **React DevTools** untuk debug components
- Check **Network tab** untuk debug API calls
- Gunakan **Console** untuk debug client-side

## 📚 Documentation

- Full guide: `SETUP_WARTA_README.md`
- Completion summary: `SETUP_COMPLETION_SUMMARY.md`
- Project overview: `PROJECT_SUMMARY.md`

---

**Happy Coding! 🎉**
