<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Artisan;

class SetupCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:setup';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Setup aplikasi Warta Jemaat Gereja';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->info('🚀 Memulai setup Warta Jemaat Gereja...');
        $this->newLine();

        // Generate key
        $this->info('🔑 Generate application key...');
        Artisan::call('key:generate');
        $this->info('✅ Application key generated!');
        $this->newLine();

        // Run migrations
        $this->info('📊 Menjalankan database migrations...');
        if ($this->confirm('Apakah Anda ingin menjalankan migrations?', true)) {
            Artisan::call('migrate', ['--force' => true]);
            $this->info('✅ Migrations berhasil!');
        }
        $this->newLine();

        // Run seeders
        $this->info('🌱 Mengisi data awal...');
        if ($this->confirm('Apakah Anda ingin mengisi data awal (seeders)?', true)) {
            Artisan::call('db:seed', ['--force' => true]);
            $this->info('✅ Seeder berhasil!');
            $this->warn('   User admin: admin@gereja.com / password');
        }
        $this->newLine();

        // Storage link
        $this->info('🔗 Membuat storage link...');
        Artisan::call('storage:link');
        $this->info('✅ Storage link berhasil!');
        $this->newLine();

        // Clear cache
        $this->info('🧹 Membersihkan cache...');
        Artisan::call('optimize:clear');
        $this->info('✅ Cache cleared!');
        $this->newLine();

        $this->info('🎉 Setup selesai!');
        $this->newLine();
        $this->info('Jalankan: php artisan serve');
        $this->info('Akses: http://localhost:8000');
        $this->info('Login: admin@gereja.com / password');

        return Command::SUCCESS;
    }
}
