#!/usr/bin/env ts-node

/**
 * 🎯 SETUP WARTA GEREJA AUTOMATION SCRIPT
 * 
 * Auto-generates:
 * - Prisma schema with all models & relations
 * - API routes for all CRUD operations
 * - Admin CRUD pages with DataTables
 * - Dashboard with statistics & charts
 * - Authentication setup
 * - Church-themed UI components
 */

import { execSync } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';
import chalk from 'chalk';

// Import generators
import { generatePrismaSchema } from './generators/prisma-generator';
import { generateApiRoutes } from './generators/api-generator';
import { generateAdminPages } from './generators/admin-generator';
import { generateDashboard } from './generators/dashboard-generator';
import { generateAuthSetup } from './generators/auth-generator';
import { generateComponents } from './generators/component-generator';
import { updateTailwindConfig } from './generators/theme-generator';

const PROJECT_ROOT = path.resolve(__dirname, '..');

interface SetupConfig {
  models: string[];
  skipMigration?: boolean;
  skipInstall?: boolean;
}

class WartaGerejaSetup {
  private config: SetupConfig;

  constructor(config: SetupConfig = { models: [] }) {
    this.config = {
      models: config.models.length > 0 ? config.models : [
        'Member',
        'Family',
        'ChurchGroup',
        'Baptism',
        'Post',
        'Category',
        'User'
      ],
      skipMigration: config.skipMigration || false,
      skipInstall: config.skipInstall || false
    };
  }

  async run() {
    console.log(chalk.bold.green('\n🎯 WARTA GEREJA AUTO SETUP'));
    console.log(chalk.gray('━'.repeat(50)));

    try {
      // Step 1: Install dependencies
      if (!this.config.skipInstall) {
        await this.installDependencies();
      }

      // Step 2: Generate Prisma Schema
      await this.generateSchema();

      // Step 3: Generate API Routes
      await this.generateAPIs();

      // Step 4: Generate Admin Pages
      await this.generateAdminCRUD();

      // Step 5: Generate Dashboard
      await this.generateDashboardPage();

      // Step 6: Setup Authentication
      await this.setupAuth();

      // Step 7: Generate UI Components
      await this.generateUIComponents();

      // Step 8: Update Theme
      await this.updateTheme();

      // Step 9: Run Prisma Migration
      if (!this.config.skipMigration) {
        await this.runMigration();
      }

      // Success
      this.printSuccess();
    } catch (error) {
      console.error(chalk.red('\n❌ Setup failed:'), error);
      process.exit(1);
    }
  }

  private async installDependencies() {
    console.log(chalk.blue('\n📦 Installing dependencies...'));
    
    const dependencies = [
      'next-auth',
      '@auth/prisma-adapter',
      '@supabase/supabase-js',
      'recharts',
      'react-quill',
      'zod',
      'date-fns',
      'lucide-react',
      '@tanstack/react-table',
      'react-hook-form',
      '@hookform/resolvers',
      'sonner'
    ];

    const devDependencies = [
      'ts-node',
      'chalk'
    ];

    try {
      execSync(`npm install ${dependencies.join(' ')} --legacy-peer-deps`, { 
        cwd: PROJECT_ROOT,
        stdio: 'inherit'
      });

      execSync(`npm install -D ${devDependencies.join(' ')} --legacy-peer-deps`, {
        cwd: PROJECT_ROOT,
        stdio: 'inherit'
      });

      console.log(chalk.green('✅ Dependencies installed'));
    } catch (error) {
      throw new Error('Failed to install dependencies');
    }
  }

  private async generateSchema() {
    console.log(chalk.blue('\n🗄️  Generating Prisma schema...'));
    
    const schema = generatePrismaSchema(this.config.models);
    const schemaPath = path.join(PROJECT_ROOT, 'prisma', 'schema.prisma');
    
    fs.mkdirSync(path.dirname(schemaPath), { recursive: true });
    fs.writeFileSync(schemaPath, schema);
    
    console.log(chalk.green('✅ Prisma schema generated'));
  }

  private async generateAPIs() {
    console.log(chalk.blue('\n🔌 Generating API routes...'));
    
    await generateApiRoutes(this.config.models, PROJECT_ROOT);
    
    console.log(chalk.green('✅ API routes generated'));
  }

  private async generateAdminCRUD() {
    console.log(chalk.blue('\n📝 Generating admin CRUD pages...'));
    
    await generateAdminPages(this.config.models, PROJECT_ROOT);
    
    console.log(chalk.green('✅ Admin pages generated'));
  }

  private async generateDashboardPage() {
    console.log(chalk.blue('\n📊 Generating dashboard...'));
    
    await generateDashboard(PROJECT_ROOT);
    
    console.log(chalk.green('✅ Dashboard generated'));
  }

  private async setupAuth() {
    console.log(chalk.blue('\n🔐 Setting up authentication...'));
    
    await generateAuthSetup(PROJECT_ROOT);
    
    console.log(chalk.green('✅ Authentication configured'));
  }

  private async generateUIComponents() {
    console.log(chalk.blue('\n🎨 Generating UI components...'));
    
    await generateComponents(PROJECT_ROOT);
    
    console.log(chalk.green('✅ Components generated'));
  }

  private async updateTheme() {
    console.log(chalk.blue('\n🌈 Applying church theme...'));
    
    await updateTailwindConfig(PROJECT_ROOT);
    
    console.log(chalk.green('✅ Theme applied'));
  }

  private async runMigration() {
    console.log(chalk.blue('\n🚀 Running Prisma migration...'));
    
    try {
      execSync('npx prisma generate', { 
        cwd: PROJECT_ROOT,
        stdio: 'inherit'
      });

      execSync('npx prisma migrate dev --name init_warta_gereja', {
        cwd: PROJECT_ROOT,
        stdio: 'inherit'
      });

      console.log(chalk.green('✅ Migration completed'));
    } catch (error) {
      console.log(chalk.yellow('⚠️  Migration skipped (run manually with: npx prisma migrate dev)'));
    }
  }

  private printSuccess() {
    console.log(chalk.bold.green('\n✨ SETUP COMPLETED SUCCESSFULLY! ✨'));
    console.log(chalk.gray('━'.repeat(50)));
    console.log(chalk.white('\n📁 Generated files:'));
    console.log(chalk.gray('   • prisma/schema.prisma'));
    console.log(chalk.gray('   • app/api/members/**'));
    console.log(chalk.gray('   • app/api/families/**'));
    console.log(chalk.gray('   • app/api/church-groups/**'));
    console.log(chalk.gray('   • app/api/baptisms/**'));
    console.log(chalk.gray('   • app/api/posts/**'));
    console.log(chalk.gray('   • app/api/categories/**'));
    console.log(chalk.gray('   • app/admin/dashboard/**'));
    console.log(chalk.gray('   • app/admin/[all CRUD pages]'));
    console.log(chalk.gray('   • components/dashboard/**'));
    console.log(chalk.gray('   • components/layout/**'));
    console.log(chalk.gray('   • lib/auth.ts'));
    
    console.log(chalk.white('\n🔗 Next steps:'));
    console.log(chalk.cyan('   1. Set DATABASE_URL in .env'));
    console.log(chalk.cyan('   2. Set NEXTAUTH_SECRET in .env'));
    console.log(chalk.cyan('   3. Set NEXTAUTH_URL in .env'));
    console.log(chalk.cyan('   4. Set SUPABASE_URL & SUPABASE_KEY in .env'));
    console.log(chalk.cyan('   5. Run: npm run dev'));
    
    console.log(chalk.white('\n🌐 Access:'));
    console.log(chalk.green('   • Admin: http://localhost:3000/admin'));
    console.log(chalk.green('   • Login: http://localhost:3000/login'));
    console.log(chalk.green('   • Posts: http://localhost:3000/posts'));
    
    console.log(chalk.gray('\n' + '━'.repeat(50)));
  }
}

// Run setup
const setup = new WartaGerejaSetup({ 
  models: [], 
  skipInstall: true, // Set to false on first run
  skipMigration: true // Set to false after setting DATABASE_URL
});
setup.run().catch(console.error);
