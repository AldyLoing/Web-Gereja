#!/bin/bash

# 🚀 Laravel + Supabase + Vercel Setup Script
# Author: Setup automation for deploying Laravel to Vercel with Supabase PostgreSQL

set -e

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}╔════════════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║   🚀 Laravel + Supabase + Vercel Setup Script            ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════════════════════════╝${NC}"
echo ""

# Step 1: Clone repository
echo -e "${YELLOW}🚀 Step 1: Cloning project from GitHub...${NC}"
if [ -d "Web-Gereja" ]; then
    echo -e "${RED}⚠️  Directory 'Web-Gereja' already exists. Removing...${NC}"
    rm -rf Web-Gereja
fi

git clone https://github.com/AldyLoing/Web-Gereja.git
cd Web-Gereja

echo -e "${GREEN}✅ Repository cloned successfully${NC}"
echo ""

# Step 2: Install Laravel dependencies
echo -e "${YELLOW}📦 Step 2: Installing Laravel dependencies...${NC}"
echo -e "${BLUE}   This may take a few minutes...${NC}"

# Set composer timeout to avoid GitHub API issues
export COMPOSER_PROCESS_TIMEOUT=900

composer install --prefer-source --no-interaction --optimize-autoloader --no-dev

echo -e "${GREEN}✅ Laravel dependencies installed${NC}"
echo ""

# Step 3: Install Node dependencies and build assets
echo -e "${YELLOW}🎨 Step 3: Installing Node.js dependencies and building assets...${NC}"

npm install
npm run build

echo -e "${GREEN}✅ Frontend assets built successfully${NC}"
echo ""

# Step 4: Create Vercel API directory and file
echo -e "${YELLOW}🔧 Step 4: Creating Vercel API structure...${NC}"

mkdir -p api

cat > api/index.php << 'EOF'
<?php

// Vercel PHP Runtime Entry Point
// This file serves as the main entry point for Laravel on Vercel

require __DIR__ . '/../public/index.php';
EOF

echo -e "${GREEN}✅ api/index.php created${NC}"
echo ""

# Step 5: Create vercel.json configuration
echo -e "${YELLOW}⚙️  Step 5: Creating vercel.json configuration...${NC}"

cat > vercel.json << 'EOF'
{
  "version": 2,
  "builds": [
    {
      "src": "api/index.php",
      "use": "@vercel/php"
    },
    {
      "src": "public/**",
      "use": "@vercel/static"
    }
  ],
  "routes": [
    {
      "src": "/(css|js|images|fonts|storage)/(.+)",
      "dest": "public/$1/$2"
    },
    {
      "src": "/build/(.+)",
      "dest": "public/build/$1"
    },
    {
      "src": "/(.*)",
      "dest": "api/index.php"
    }
  ],
  "env": {
    "APP_ENV": "production",
    "APP_DEBUG": "false",
    "LOG_CHANNEL": "stderr",
    "SESSION_DRIVER": "cookie",
    "CACHE_DRIVER": "array",
    "QUEUE_CONNECTION": "sync"
  }
}
EOF

echo -e "${GREEN}✅ vercel.json created${NC}"
echo ""

# Step 6: Setup .env file
echo -e "${YELLOW}🔐 Step 6: Setting up environment configuration...${NC}"

if [ ! -f ".env" ]; then
    cp .env.example .env
    echo -e "${GREEN}✅ .env file created from .env.example${NC}"
else
    echo -e "${BLUE}ℹ️  .env file already exists, skipping...${NC}"
fi

# Generate application key
php artisan key:generate --force

echo -e "${GREEN}✅ Application key generated${NC}"
echo ""

# Step 7: Configure Supabase database
echo -e "${YELLOW}🗄️  Step 7: Configuring Supabase PostgreSQL connection...${NC}"

# Prompt for Supabase password
echo -e "${BLUE}Enter your Supabase PostgreSQL password:${NC}"
read -s SUPABASE_PASSWORD
echo ""

# Update .env with Supabase credentials
sed -i.bak "s/DB_CONNECTION=mysql/DB_CONNECTION=pgsql/" .env
sed -i.bak "s/DB_HOST=.*/DB_HOST=db.pcfvuqqrewqprprfqoua.supabase.co/" .env
sed -i.bak "s/DB_PORT=.*/DB_PORT=5432/" .env
sed -i.bak "s/DB_DATABASE=.*/DB_DATABASE=postgres/" .env
sed -i.bak "s/DB_USERNAME=.*/DB_USERNAME=postgres/" .env
sed -i.bak "s/DB_PASSWORD=.*/DB_PASSWORD=${SUPABASE_PASSWORD}/" .env

# Add additional Vercel-friendly configurations
cat >> .env << EOF

# Vercel-specific configurations
APP_URL=https://your-app.vercel.app
SESSION_DRIVER=cookie
CACHE_DRIVER=array
QUEUE_CONNECTION=sync
FILESYSTEM_DISK=public

# Disable features that don't work on serverless
BROADCAST_DRIVER=log
EOF

echo -e "${GREEN}✅ Supabase connection configured in .env${NC}"
echo ""

# Step 8: Run database migrations
echo -e "${YELLOW}🔄 Step 8: Running database migrations...${NC}"

php artisan migrate --force

echo -e "${GREEN}✅ Database migrations completed${NC}"
echo ""

# Step 9: Create deployment README
echo -e "${YELLOW}📝 Step 9: Creating deployment documentation...${NC}"

cat > DEPLOYMENT.md << 'EOF'
# 🚀 Laravel + Supabase + Vercel Deployment Guide

## 📋 Prerequisites
- GitHub account
- Vercel account (free tier available)
- Supabase account with PostgreSQL database

## 🔗 Repository
This project is hosted at: **https://github.com/AldyLoing/Web-Gereja.git**

---

## 🚀 Deploy to Vercel

### Step 1️⃣: Push to GitHub
```bash
git add .
git commit -m "Ready for Vercel deployment"
git push origin main
```

### Step 2️⃣: Import to Vercel
1. Go to [https://vercel.com/new](https://vercel.com/new)
2. Click **"Import Project"**
3. Select your GitHub repository: `AldyLoing/Web-Gereja`
4. Click **"Import"**

### Step 3️⃣: Configure Environment Variables
In Vercel dashboard, add these environment variables:

```env
APP_NAME="Warta Jemaat Gereja"
APP_ENV=production
APP_KEY=base64:YOUR_APP_KEY_HERE
APP_DEBUG=false
APP_URL=https://your-app.vercel.app

DB_CONNECTION=pgsql
DB_HOST=db.pcfvuqqrewqprprfqoua.supabase.co
DB_PORT=5432
DB_DATABASE=postgres
DB_USERNAME=postgres
DB_PASSWORD=YOUR_SUPABASE_PASSWORD

SESSION_DRIVER=cookie
CACHE_DRIVER=array
QUEUE_CONNECTION=sync
FILESYSTEM_DISK=public

LOG_CHANNEL=stderr
LOG_LEVEL=error
```

> 💡 **Tip:** Get your `APP_KEY` from local `.env` file after running `php artisan key:generate`

### Step 4️⃣: Deploy
1. Click **"Deploy"**
2. Wait for build to complete (~2-3 minutes)
3. Access your app at: `https://your-app.vercel.app`

---

## 🗄️ Supabase Database Setup

### Connection String
```
postgresql://postgres:YOUR_PASSWORD@db.pcfvuqqrewqprprfqoua.supabase.co:5432/postgres
```

### Get Supabase Credentials
1. Go to [https://supabase.com/dashboard](https://supabase.com/dashboard)
2. Select your project
3. Go to **Settings** → **Database**
4. Copy connection string and update password

---

## 📦 Important Notes

### ⚠️ Limitations of Vercel + Laravel

1. **No Persistent File Storage**
   - Vercel is serverless and ephemeral
   - Files uploaded to `storage/app/public` will be deleted after each deployment
   - **Solution:** Use Supabase Storage for file uploads

2. **No Background Jobs**
   - Laravel Queue workers don't work on Vercel
   - **Solution:** Use external cron services or Railway for queue workers

3. **No Scheduled Tasks**
   - `php artisan schedule:run` won't work
   - **Solution:** Use Vercel Cron or external cron services

### ✅ What Works Well
- ✅ HTTP requests and routing
- ✅ Database operations (via Supabase PostgreSQL)
- ✅ Blade templating
- ✅ API endpoints
- ✅ Authentication (session-based)
- ✅ Static assets serving

---

## 🔄 Updating Deployment

### Push changes to GitHub:
```bash
git add .
git commit -m "Update feature"
git push origin main
```

Vercel will automatically redeploy! 🎉

---

## 🐛 Troubleshooting

### Error: "Application key not set"
- Add `APP_KEY` to Vercel environment variables
- Get key from `.env` file or run `php artisan key:generate`

### Error: "Database connection failed"
- Verify Supabase credentials
- Check if IP is whitelisted in Supabase (usually auto-allowed)
- Test connection string manually

### Error: "Class not found"
- Run `composer dump-autoload` locally
- Commit `composer.lock` and push again

### 404 on all routes
- Check `vercel.json` routing configuration
- Ensure `api/index.php` exists and is committed

---

## 🆘 Alternative: Railway (Recommended for Laravel)

If you encounter issues with Vercel's serverless limitations, consider **Railway.app**:

1. Better Laravel support
2. Persistent storage
3. Background jobs work
4. Scheduled tasks work
5. Free tier: $5 credit/month

Deploy to Railway:
```bash
# Install Railway CLI
npm install -g railway

# Login and deploy
railway login
railway init
railway up
```

---

## 📞 Support
For issues with this deployment, check:
- Vercel Docs: https://vercel.com/docs
- Supabase Docs: https://supabase.com/docs
- Laravel Docs: https://laravel.com/docs

---

🎉 **Happy Deploying!**
EOF

echo -e "${GREEN}✅ DEPLOYMENT.md created${NC}"
echo ""

# Step 10: Create .vercelignore
echo -e "${YELLOW}🚫 Step 10: Creating .vercelignore...${NC}"

cat > .vercelignore << 'EOF'
/vendor
/node_modules
/storage/*.key
/storage/logs
/storage/framework/cache
/storage/framework/sessions
/storage/framework/testing
/storage/framework/views
/.env.backup
/.phpunit.result.cache
/npm-debug.log
/yarn-error.log
EOF

echo -e "${GREEN}✅ .vercelignore created${NC}"
echo ""

# Final summary
echo -e "${BLUE}╔════════════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║              🎉 Setup Complete!                           ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════════════════════════╝${NC}"
echo ""
echo -e "${GREEN}✅ Project cloned and configured for Vercel + Supabase${NC}"
echo ""
echo -e "${YELLOW}📁 Project structure:${NC}"
echo -e "   Web-Gereja/"
echo -e "   ├── api/"
echo -e "   │   └── index.php          ${GREEN}[Vercel entry point]${NC}"
echo -e "   ├── public/"
echo -e "   ├── vercel.json             ${GREEN}[Vercel configuration]${NC}"
echo -e "   ├── .env                    ${GREEN}[Environment config]${NC}"
echo -e "   ├── DEPLOYMENT.md           ${GREEN}[Deployment guide]${NC}"
echo -e "   └── composer.json"
echo ""
echo -e "${YELLOW}🚀 Next Steps:${NC}"
echo -e "   1️⃣  Review and update ${BLUE}.env${NC} file if needed"
echo -e "   2️⃣  Test locally: ${BLUE}php artisan serve${NC}"
echo -e "   3️⃣  Commit and push to GitHub:"
echo -e "       ${BLUE}git add .${NC}"
echo -e "       ${BLUE}git commit -m \"Ready for Vercel deployment\"${NC}"
echo -e "       ${BLUE}git push origin main${NC}"
echo -e "   4️⃣  Go to ${BLUE}https://vercel.com/new${NC} and import your repo"
echo -e "   5️⃣  Add environment variables (see ${BLUE}DEPLOYMENT.md${NC})"
echo -e "   6️⃣  Click ${GREEN}Deploy${NC}!"
echo ""
echo -e "${YELLOW}📖 Full deployment guide: ${BLUE}DEPLOYMENT.md${NC}"
echo ""
echo -e "${GREEN}Happy deploying! 🎉${NC}"
