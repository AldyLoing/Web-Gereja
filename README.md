<div align="center">
  <h1>🏛️ Warta Jemaat Gereja</h1>
  <p><strong>Modern Church Management System</strong></p>
  <p>A comprehensive church administration platform built with Next.js 15, Prisma ORM, and Supabase</p>

  ![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)
  ![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
  ![Prisma](https://img.shields.io/badge/Prisma-5-2D3748?style=flat-square&logo=prisma)
  ![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-3ECF8E?style=flat-square&logo=supabase)
  ![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

  [Live Demo](https://web-imanuel.vercel.app/) • [Documentation](#installation--setup) • [Report Bug](https://github.com/AldyLoing/Web-Gereja/issues) • [Request Feature](https://github.com/AldyLoing/Web-Gereja/issues)
</div>

---

## 📖 Project Overview

**Warta Jemaat Gereja** is an enterprise-grade church management system designed to streamline administrative operations, member engagement, and communication within religious congregations. Built on modern web technologies, it provides a scalable, secure, and user-friendly platform for managing church members, families, ministries, baptisms, and bulletins.

This system empowers church administrators with real-time insights, automated workflows, and comprehensive data management capabilities—all within a beautifully designed, responsive interface.

---

## 🎯 The Problem

Churches face significant challenges in managing their communities effectively:

- **Manual record-keeping** leads to data inconsistencies and time waste
- **Scattered information** across spreadsheets, notebooks, and multiple systems
- **Limited insights** into congregation demographics and engagement patterns
- **Communication gaps** between church leadership and members
- **Security risks** from improper data handling and credential exposure
- **Difficult coordination** of ministries, events, and member milestones
- **Lack of accessibility** for administrators working remotely or on mobile devices

Traditional church management approaches are outdated, inefficient, and fail to leverage modern technology to serve communities effectively.

---

## ✨ The Solution

**Warta Jemaat Gereja** transforms church administration through:

### Centralized Data Management
All member information, family records, baptism history, and ministry assignments in one secure location with robust relational data modeling.

### Real-Time Insights
Interactive dashboards provide instant visibility into congregation statistics, birthday celebrations, baptism milestones, and ministry distribution.

### Secure Authentication
Enterprise-grade authentication with NextAuth.js ensures only authorized personnel access sensitive church data.

### Content Management
Publish bulletins, announcements, and devotionals with a rich text editor, multiple categories, and media management.

### Mobile-First Design
Responsive interface works seamlessly across desktops, tablets, and smartphones, enabling administrators to work from anywhere.

### Automated Workflows
Calculate family member counts, track baptism records, manage soft deletes, and auto-generate URL slugs without manual intervention.

---

## 🔄 How It Works

### System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     Client (Browser)                         │
│                Next.js 15 App Router + React                 │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│                  API Layer (Next.js API Routes)              │
│           Authentication • Business Logic • Validation        │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│                     Prisma ORM                               │
│            Type-safe Database Queries • Migrations           │
└──────────────────────┬──────────────────────────────────────┘
                       │
         ┌─────────────┴─────────────┐
         ▼                           ▼
┌──────────────────┐        ┌──────────────────┐
│ Supabase PostgreSQL │      │ Supabase Storage │
│  Relational Data    │      │   Media Files    │
└──────────────────┘        └──────────────────┘
```

### Data Flow

1. **User Authentication**: NextAuth.js validates credentials against encrypted user records
2. **Data Request**: Client sends request to Next.js API route
3. **Validation**: Zod schemas validate input data
4. **Business Logic**: API route processes request with proper authorization checks
5. **Database Query**: Prisma ORM executes type-safe queries against PostgreSQL
6. **Response**: Data returned to client with proper error handling
7. **UI Update**: React components render updated state with optimistic updates

---

## 🚀 Key Features

<table>
<tr>
<td width="50%">

### 📊 Real-Time Dashboard
- Congregation statistics at a glance
- Interactive charts (bar, pie, line)
- Birthday and baptism tracking
- Ministry distribution analysis
- Gender and age group insights

</td>
<td width="50%">

### 👥 Member Management
- Comprehensive member profiles (NIK, KK, contact info)
- Family relationship mapping
- Ministry assignment (many-to-many)
- Advanced search and filtering
- Soft delete with restore capability

</td>
</tr>
<tr>
<td width="50%">

### 📝 Bulletin Publishing
- Rich text editor with formatting
- Image uploads to Supabase Storage
- Multiple category tagging
- Draft/Published workflow
- Auto-generated SEO-friendly slugs

</td>
<td width="50%">

### 🛡️ Security & Access Control
- Encrypted password storage (bcrypt)
- Session-based authentication
- Role-based permissions (admin/user)
- Environment-based configuration
- Secure API key management

</td>
</tr>
<tr>
<td width="50%">

### 🎨 Modern UI/UX
- Dark mode support
- Responsive design (mobile-first)
- Accessible components (WCAG 2.1)
- Smooth animations
- Intuitive navigation

</td>
<td width="50%">

### ⚡ Performance
- Server-side rendering (SSR)
- Optimistic UI updates
- Image optimization
- Database query optimization
- Edge-ready deployment

</td>
</tr>
</table>

---

## 🛠️ Technology Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Frontend** | Next.js 15 (App Router) | React framework with SSR and routing |
| **Language** | TypeScript | Type-safe development |
| **UI Framework** | Tailwind CSS | Utility-first styling |
| **Component Library** | Shadcn/ui | Accessible, customizable components |
| **Forms** | React Hook Form + Zod | Form management and validation |
| **Charts** | Recharts | Data visualization |
| **Database** | PostgreSQL (Supabase) | Relational data storage |
| **ORM** | Prisma 5 | Type-safe database client |
| **Authentication** | NextAuth.js v4 | Session management |
| **Storage** | Supabase Storage | Media file hosting |
| **Deployment** | Vercel | Serverless hosting platform |

---

## 📦 Installation & Setup

### Prerequisites

- **Node.js** >= 18.x
- **npm** or **yarn**
- **Git**
- **Supabase Account** (free tier available)

### Step 1: Clone Repository

```bash
git clone https://github.com/AldyLoing/Web-Gereja.git
cd Web-Gereja
```

### Step 2: Install Dependencies

```bash
npm install
```

### Step 3: Configure Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Wait for database initialization (~2 minutes)
3. Navigate to **SQL Editor** in your Supabase dashboard
4. Copy and execute the contents of `database/init.sql`

This will create all required tables, relationships, and database functions.

### Step 4: Environment Configuration

Create environment file from template:

```bash
# Windows
copy .env.example .env

# macOS/Linux
cp .env.example .env
```

**Edit `.env` with your credentials:**

```env
# Database Connection (Supabase PostgreSQL)
DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres"

# NextAuth Configuration
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="[GENERATE-RANDOM-SECRET-HERE]"

# Supabase API Keys
NEXT_PUBLIC_SUPABASE_URL="https://[YOUR-PROJECT-REF].supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="[YOUR-ANON-KEY]"
SUPABASE_SERVICE_ROLE_KEY="[YOUR-SERVICE-ROLE-KEY]"
```

**Generate a secure `NEXTAUTH_SECRET`:**

```bash
openssl rand -base64 32
```

### Step 5: Initialize Prisma

```bash
# Generate Prisma Client
npm run prisma:generate

# Run database migrations
npm run prisma:migrate
```

### Step 6: Seed Database (Optional)

Populate your database with initial data:

```bash
npm run setup:warta-gereja
```

This creates:
- Default admin user
- Ministry groups (PELNAP, PELRAP, PELWAP, PELPRIP, PELPAP)
- Bulletin categories (15 types)
- Sample member and family data

### Step 7: Start Development Server

```bash
npm run dev
```

Access the application at: **http://localhost:3000**

### Step 8: Production Build

```bash
npm run build
npm start
```

### Default Login Credentials

```
Email: admin@gereja.com
Password: password
```

⚠️ **CRITICAL**: Change the default password immediately after first login!

---

## 🔐 Security & API Key Management

### Environment Variables Best Practices

**NEVER commit sensitive credentials to version control.** This project previously experienced an API key leak. Follow these security guidelines:

#### 1. Use `.env` Files Locally

All sensitive configuration must be stored in `.env` files, which are excluded from Git via `.gitignore`:

```env
DATABASE_URL="postgresql://postgres:secure_password@host:5432/db"
NEXTAUTH_SECRET="your-ultra-secure-random-string"
SUPABASE_SERVICE_ROLE_KEY="your-service-role-key"
```

#### 2. Reference `.env.example`

The repository includes `.env.example` as a template with placeholder values:

```env
DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres"
NEXTAUTH_SECRET="[GENERATE-WITH-openssl-rand-base64-32]"
NEXT_PUBLIC_SUPABASE_URL="https://[PROJECT-REF].supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="[YOUR-ANON-KEY]"
SUPABASE_SERVICE_ROLE_KEY="[YOUR-SERVICE-ROLE-KEY]"
```

#### 3. Verify `.gitignore`

Ensure `.gitignore` includes:

```
.env
.env.local
.env.production
.env.development
```

#### 4. Rotate Compromised Keys

If credentials are exposed:

1. **Immediately regenerate** all API keys in Supabase dashboard
2. **Update** `.env` files with new keys
3. **Redeploy** your application with updated environment variables
4. **Revoke** old keys to prevent unauthorized access
5. **Audit** access logs for suspicious activity

#### 5. Production Deployment

For Vercel deployment:

1. Go to **Project Settings** → **Environment Variables**
2. Add each variable from `.env` individually
3. Set appropriate environments (Production, Preview, Development)
4. **Never** hardcode credentials in source code

#### 6. Code Review Checklist

Before committing:

- ✅ No hardcoded passwords, API keys, or secrets
- ✅ `.env` files listed in `.gitignore`
- ✅ Only `.env.example` committed (with placeholders)
- ✅ No console.log statements exposing sensitive data

---

## 💡 Usage & Examples

### Managing Church Members

#### Add New Member

```typescript
// Navigate to: /admin/members → "Add Member"

// Example Member Data:
{
  nik: "1234567890123456",
  kk: "1234567890123456",
  name: "John Doe",
  gender: "male",
  birth_date: "1990-01-15",
  address: "123 Church Street",
  phone: "081234567890",
  email: "john@example.com",
  family_id: 1,
  church_groups: [1, 3] // PELNAP and PELWAP
}
```

#### Search and Filter

- **Search by name**: Real-time search in member list
- **Filter by ministry**: View members by church group
- **Filter by status**: Active/Inactive members
- **Sort**: By name, join date, or birthday

### Publishing Church Bulletins

#### Create Bulletin Post

```typescript
// Navigate to: /admin/posts → "Create Post"

// Example Post Data:
{
  title: "Sunday Service Announcement",
  content: "<p>Service starts at 10 AM...</p>", // Rich HTML
  cover_image: File, // Upload JPG/PNG (max 5MB)
  categories: [1, 2], // Multiple categories
  status: "published", // or "draft"
  published_at: new Date()
}
```

#### Rich Text Editor Features

- Bold, italic, underline formatting
- Headings (H1-H6)
- Bullet and numbered lists
- Links and images
- Blockquotes

### Dashboard Analytics

Access real-time statistics at `/admin/dashboard`:

- **Total Members**: Active congregation count
- **Total Families**: Registered families
- **Birthdays This Month**: Upcoming celebrations
- **Baptisms This Month**: Recent baptisms
- **Ministry Distribution**: Bar chart showing member distribution across ministries
- **Gender Breakdown**: Pie chart of male/female ratio
- **Age Groups**: Demographics visualization

---

## 🎯 Use Cases

### Small to Medium Churches (50-500 members)
- Digitize paper-based member records
- Track ministry participation
- Publish weekly bulletins online
- Monitor congregation growth trends

### Large Churches (500+ members)
- Manage multiple ministry groups
- Generate comprehensive reports
- Coordinate family events
- Track baptism and milestone records

### Multi-Campus Churches
- Centralized member database
- Unified bulletin publishing
- Cross-campus analytics
- Consistent data standards

### Church Administrators
- Reduce administrative overhead
- Access data remotely (mobile)
- Generate reports for leadership
- Maintain GDPR/data privacy compliance

---

## 🗺️ Roadmap

### Q1 2026
- [ ] SMS/Email notifications for birthdays and events
- [ ] Attendance tracking system
- [ ] Financial contribution management
- [ ] Mobile app (React Native)

### Q2 2026
- [ ] Event calendar with RSVP
- [ ] Volunteer scheduling
- [ ] Prayer request management
- [ ] Multi-language support (English, Indonesian)

### Q3 2026
- [ ] Advanced reporting and exports (PDF, Excel)
- [ ] Integration with church accounting software
- [ ] Video streaming integration
- [ ] Member self-service portal

### Q4 2026
- [ ] AI-powered member engagement insights
- [ ] Automated follow-up workflows
- [ ] Multi-tenant support (multiple churches)
- [ ] Advanced security features (2FA, SSO)

---

## 🌍 Impact

### Social Impact
- **Strengthens community bonds** through better communication
- **Preserves family histories** and church heritage
- **Reduces administrative burden**, allowing more time for pastoral care
- **Increases accessibility** for elderly members and those with disabilities

### Digital Transformation
- **Modernizes church operations** with 21st-century technology
- **Reduces paper waste** through digital record-keeping
- **Enables data-driven decisions** for church leadership
- **Improves transparency** in member management

### Governance
- **Ensures data accuracy** with validated inputs
- **Maintains privacy compliance** (GDPR-ready architecture)
- **Provides audit trails** for all data changes
- **Secures sensitive information** with industry-standard encryption

---

## 🎯 Target Market

### Primary Users
- **Church Administrators**: Manage daily operations and member records
- **Pastors & Ministry Leaders**: Access member information and engagement metrics
- **Church Secretaries**: Handle data entry and bulletin publishing

### Organization Size
- Small churches (50-200 members)
- Medium churches (200-500 members)
- Large churches (500+ members)

### Geographic Focus
- Indonesia (primary)
- Southeast Asia
- Global Indonesian diaspora communities

---

## 💭 Why This Matters

Churches are the backbone of many communities, yet most lack modern tools to serve their congregations effectively. Warta Jemaat Gereja bridges this gap by providing:

1. **Accessible Technology**: No technical expertise required—intuitive interface for all skill levels
2. **Cost-Effective Solution**: Built on free-tier infrastructure (Supabase, Vercel) with no licensing fees
3. **Open Source**: Transparent, auditable, and community-driven development
4. **Scalable Architecture**: Grows with your church from 50 to 5,000+ members
5. **Privacy-First Design**: Your data stays under your control with self-hosting options

By empowering churches with modern technology, we enable them to focus on their core mission: serving their communities with compassion and excellence.

---

## 🌟 Vision & Mission

### Vision
To become the leading open-source church management platform, empowering religious organizations worldwide with accessible, secure, and innovative technology.

### Mission
- **Democratize** church technology by providing enterprise-grade tools at zero cost
- **Simplify** church administration through intuitive design and automation
- **Protect** member privacy with best-in-class security practices
- **Foster** community collaboration through open-source development
- **Enable** data-driven ministry through actionable insights

---

## 🤝 Contributing

We welcome contributions from developers, designers, translators, and church technology enthusiasts!

### How to Contribute

1. **Fork** the repository
2. **Create** a feature branch: `git checkout -b feature/amazing-feature`
3. **Commit** your changes: `git commit -m 'Add amazing feature'`
4. **Push** to branch: `git push origin feature/amazing-feature`
5. **Open** a Pull Request

### Contribution Guidelines

- Follow existing code style (Prettier + ESLint configured)
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed
- Keep PRs focused on single features/fixes

### Development Setup

```bash
# Fork and clone your fork
git clone https://github.com/YOUR-USERNAME/Web-Gereja.git

# Install dependencies
npm install

# Create feature branch
git checkout -b feature/my-feature

# Make changes and test
npm run dev

# Run linting
npm run lint

# Commit and push
git add .
git commit -m "Description of changes"
git push origin feature/my-feature
```

### Areas for Contribution

- 🐛 Bug fixes
- ✨ New features from roadmap
- 📝 Documentation improvements
- 🌍 Translations (internationalization)
- 🎨 UI/UX enhancements
- ⚡ Performance optimizations
- 🧪 Test coverage expansion

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

### What This Means

✅ You can use this project commercially  
✅ You can modify and distribute it  
✅ You can use it privately  
✅ No warranty or liability from the author

---

## 👨‍💻 Developer

**Aldy Loing**

- Email: [loingaldy@gmail.com](mailto:loingaldy@gmail.com)
- GitHub: [@AldyLoing](https://github.com/AldyLoing)
- Repository: [github.com/AldyLoing/Web-Gereja](https://github.com/AldyLoing/Web-Gereja)

---

## 🙏 Acknowledgments

Built with exceptional open-source tools:

- **[Next.js](https://nextjs.org)** - The React framework for production
- **[Vercel](https://vercel.com)** - Deployment and hosting platform
- **[Supabase](https://supabase.com)** - Open-source Firebase alternative
- **[Prisma](https://prisma.io)** - Next-generation ORM
- **[Tailwind CSS](https://tailwindcss.com)** - Utility-first CSS framework
- **[Shadcn/ui](https://ui.shadcn.com)** - Beautifully designed components
- **[Recharts](https://recharts.org)** - Composable charting library

---

## 📞 Support

Need help? We're here for you:

- 📧 Email: [loingaldy@gmail.com](mailto:loingaldy@gmail.com)
- 🐛 Issues: [GitHub Issues](https://github.com/AldyLoing/Web-Gereja/issues)
- 💬 Discussions: [GitHub Discussions](https://github.com/AldyLoing/Web-Gereja/discussions)

---

<div align="center">
  <strong>Warta Jemaat Gereja</strong> - Empowering Churches Through Technology
  
  Built with ❤️ using Next.js 15, TypeScript, Prisma & Supabase
  
  **Version 1.0.0** • Last Updated: January 2026

  [⭐ Star this repo](https://github.com/AldyLoing/Web-Gereja) if you find it useful!
</div>
