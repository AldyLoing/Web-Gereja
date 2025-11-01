<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            'Berita',
            'Pengumuman',
            'Renungan',
            'Kegiatan',
            'Duka Cita',
            'Baptisan',
            'Pernikahan',
            'Syukuran',
            'Pelayanan',
            'Sosial',
            'Pemuda',
            'Remaja',
            'Wanita',
            'Pria',
            'Anak',
        ];

        foreach ($categories as $category) {
            Category::create([
                'title' => $category,
                'slug' => Str::slug($category),
            ]);
        }
    }
}
