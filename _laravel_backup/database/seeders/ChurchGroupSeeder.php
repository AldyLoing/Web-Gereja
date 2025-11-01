<?php

namespace Database\Seeders;

use App\Models\ChurchGroup;
use Illuminate\Database\Seeder;

class ChurchGroupSeeder extends Seeder
{
    public function run(): void
    {
        $groups = [
            [
                'name' => 'PELNAP',
                'description' => 'Pelayanan Pemuda (Youth Ministry)',
                'total_member' => 0,
            ],
            [
                'name' => 'PELRAP',
                'description' => 'Pelayanan Remaja (Teenager Ministry)',
                'total_member' => 0,
            ],
            [
                'name' => 'PELWAP',
                'description' => 'Pelayanan Wanita (Women Ministry)',
                'total_member' => 0,
            ],
            [
                'name' => 'PELPRIP',
                'description' => 'Pelayanan Pria (Men Ministry)',
                'total_member' => 0,
            ],
            [
                'name' => 'PELPAP',
                'description' => 'Pelayanan Anak (Children Ministry)',
                'total_member' => 0,
            ],
        ];

        foreach ($groups as $group) {
            ChurchGroup::create($group);
        }
    }
}
