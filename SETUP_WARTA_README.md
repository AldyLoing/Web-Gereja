# 🎯 Setup Script Warta Gereja

Automated setup script for Next.js church management system with complete CRUD functionality.

## ✨ Features

This script automatically generates:

- ✅ Complete Prisma schema with all models & relations
- ✅ API routes for all CRUD operations
- ✅ Admin pages with DataTables
- ✅ Dashboard with statistics & charts
- ✅ Authentication setup with role-based access
- ✅ Church-themed UI components

## 🚀 Usage

### 1. Install Dependencies

First, install the required packages:

\`\`\`bash
npm install
\`\`\`

### 2. Configure Environment

Copy `.env.example` to `.env` and fill in your credentials:

\`\`\`bash
cp .env.example .env
\`\`\`

Required environment variables:
- `DATABASE_URL` - PostgreSQL connection string (Supabase or local)
- `NEXTAUTH_SECRET` - Generate with: `openssl rand -base64 32`
- `NEXTAUTH_URL` - Your app URL (http://localhost:3000 for development)
- `SUPABASE_URL` & `SUPABASE_ANON_KEY` - From Supabase dashboard

### 3. Run Setup Script

Execute the automated setup:

\`\`\`bash
npm run setup:warta-gereja
\`\`\`

This will:
1. Install all required dependencies
2. Generate Prisma schema
3. Create API routes
4. Generate admin CRUD pages
5. Setup dashboard with statistics
6. Configure authentication
7. Generate UI components
8. Apply church theme
9. Run database migrations

## 📁 Generated Files

After running the setup, you'll have:

\`\`\`
prisma/
  ├── schema.prisma              # Complete database schema

app/
  ├── api/
  │   ├── auth/[...nextauth]/    # NextAuth API
  │   ├── members/               # Members CRUD API
  │   ├── families/              # Families CRUD API
  │   ├── church-groups/         # Church groups CRUD API
  │   ├── baptisms/              # Baptisms CRUD API
  │   ├── posts/                 # Posts CRUD API
  │   └── categories/            # Categories CRUD API
  ├── admin/
  │   ├── dashboard/             # Main admin dashboard
  │   ├── members/               # Members management
  │   ├── families/              # Families management
  │   ├── church-groups/         # Church groups management
  │   ├── baptisms/              # Baptisms management
  │   ├── posts/                 # Posts management
  │   ├── categories/            # Categories management
  │   └── settings/              # Settings
  └── actions/
      └── dashboard.ts           # Server actions for dashboard

components/
  ├── dashboard/
  │   ├── StatCard.tsx           # Statistics card component
  │   └── ChartGroup.tsx         # Chart component
  └── layout/
      ├── AdminLayout.tsx        # Admin layout wrapper
      ├── PublicLayout.tsx       # Public layout wrapper
      └── AdminSidebar.tsx       # Admin sidebar navigation

lib/
  ├── auth.ts                    # NextAuth configuration
  └── prisma.ts                  # Prisma client singleton

middleware.ts                    # Route protection middleware
\`\`\`

## 📊 Database Models

The script generates these models:

1. **User** - Authentication & user accounts (role: ADMIN | JEMAAT)
2. **Family** - Family records
3. **Member** - Church members (jemaat) with personal info
4. **ChurchGroup** - Church groups (PELNAP, PELRAP, etc.)
5. **MemberChurchGroup** - Many-to-many pivot table
6. **Baptism** - Baptism records linked to members
7. **Post** - Church bulletin/news posts
8. **Category** - Post categories
9. **PostCategory** - Many-to-many pivot table

## 🔐 Authentication

### Admin Access
- URL: `/admin/*`
- Role required: `ADMIN`
- Access: Dashboard, all CRUD operations

### Member Access
- URL: `/member/*`
- Role required: `JEMAAT` or `ADMIN`
- Access: View personal data, posts

### Default Admin Account

After setup, seed an admin user:

\`\`\`typescript
// prisma/seed.ts
import { prisma } from '../lib/prisma';
import bcrypt from 'bcrypt';

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
}

main();
\`\`\`

Run: `npx prisma db seed`

## 🎨 Church Theme Colors

The setup applies these church-specific colors:

| Color | Hex | Usage |
|-------|-----|-------|
| Church Green | #009345 | Primary actions, buttons |
| Church Green Light | #00B857 | Hover states |
| Church Green Dark | #007A36 | Active states |
| Church Gold | #B88A2F | Accents, highlights |
| Church Gold Light | #F2C84B | Gradient start |
| Church Brown | #D69A7A | Secondary elements |

## 📱 Admin Dashboard Features

The generated dashboard includes:

- **Statistics Cards**
  - Total Jemaat
  - Total Keluarga
  - Baptisms this month
  - Birthdays this month

- **Charts**
  - Group distribution (bar chart)
  - Membership trends
  - Recent activity log

- **Quick Links**
  - Direct access to all CRUD pages

## 🛠️ Development

### Start Development Server

\`\`\`bash
npm run dev
\`\`\`

Visit:
- Admin: http://localhost:3000/admin
- Login: http://localhost:3000/login
- Public: http://localhost:3000

### Database Commands

\`\`\`bash
# Generate Prisma Client
npm run prisma:generate

# Run migrations
npm run prisma:migrate

# Open Prisma Studio
npm run prisma:studio
\`\`\`

## 🚢 Deployment

### Vercel Deployment

1. Push to GitHub
2. Connect repository to Vercel
3. Add environment variables:
   - `DATABASE_URL`
   - `NEXTAUTH_SECRET`
   - `NEXTAUTH_URL`
   - Supabase credentials

4. Deploy!

### Build Command
\`\`\`bash
npm run build
\`\`\`

## 📝 Customization

### Adding New Models

1. Edit `scripts/generators/prisma-generator.ts`
2. Add model configuration to `scripts/generators/api-generator.ts`
3. Add page configuration to `scripts/generators/admin-generator.ts`
4. Re-run: `npm run setup:warta-gereja`

### Modifying Theme

Edit `scripts/generators/theme-generator.ts` to change colors, fonts, or animations.

## ⚡ Performance

- All API routes use pagination (default: 10 items/page)
- Soft deletes for data safety
- Optimized queries with Prisma
- Static page generation where possible
- Automatic code splitting

## 🐛 Troubleshooting

### Migration Errors

\`\`\`bash
# Reset database (CAUTION: deletes all data)
npx prisma migrate reset

# Re-run setup
npm run setup:warta-gereja
\`\`\`

### Authentication Issues

Check:
1. `NEXTAUTH_SECRET` is set
2. `NEXTAUTH_URL` matches your domain
3. Database has `users` table

### Build Errors

\`\`\`bash
# Clear cache
rm -rf .next
npm run build
\`\`\`

## 📞 Support

For issues or questions, please check the generated code documentation or refer to:
- [Next.js Docs](https://nextjs.org/docs)
- [Prisma Docs](https://www.prisma.io/docs)
- [NextAuth.js Docs](https://next-auth.js.org)

## 📄 License

MIT License - feel free to use and modify for your church!

---

Made with ❤️ for Gereja Imanuel
