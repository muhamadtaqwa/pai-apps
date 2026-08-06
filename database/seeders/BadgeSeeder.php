<?php

namespace Database\Seeders;

use App\Models\Badge;
use Illuminate\Database\Seeder;

class BadgeSeeder extends Seeder
{
    public function run(): void
    {
        $badges = [
            ['nama' => 'Pemula', 'deskripsi' => 'Menyelesaikan 1 kuis', 'icon' => '🌟', 'syarat' => '1 kuis'],
            ['nama' => 'Rajin', 'deskripsi' => 'Menyelesaikan 5 kuis', 'icon' => '🔥', 'syarat' => '5 kuis'],
            ['nama' => 'Sempurna', 'deskripsi' => 'Mendapat skor sempurna', 'icon' => '💎', 'syarat' => 'Skor 100'],
            ['nama' => 'Master', 'deskripsi' => 'Mengumpulkan 1000 poin', 'icon' => '👑', 'syarat' => '1000 poin'],
            ['nama' => 'Mahir', 'deskripsi' => 'Menyelesaikan 10 kuis', 'icon' => '📖', 'syarat' => '10 kuis'],
        ];

        foreach ($badges as $badge) {
            Badge::create($badge);
        }
    }
}
