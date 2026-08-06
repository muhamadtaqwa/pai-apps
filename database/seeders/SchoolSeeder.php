<?php

namespace Database\Seeders;

use App\Models\School;
use App\Models\SchoolClass;
use Illuminate\Database\Seeder;

class SchoolSeeder extends Seeder
{
    public function run(): void
    {
        // SMA Al-Amanah
        $sekolah1 = School::create([
            'nama' => 'SMA Al-Amanah',
            'alamat' => 'Jl. Pendidikan No. 1',
            'kode' => 'ALMNH',
        ]);

        SchoolClass::create(['school_id' => $sekolah1->id, 'nama' => 'X-A']);
        SchoolClass::create(['school_id' => $sekolah1->id, 'nama' => 'X-B']);
        SchoolClass::create(['school_id' => $sekolah1->id, 'nama' => 'XI-A']);

        // SMA Al-Azhar
        $sekolah2 = School::create([
            'nama' => 'SMA Al-Azhar',
            'alamat' => 'Jl. Pesantren No. 2',
            'kode' => 'ALAZH',
        ]);

        SchoolClass::create(['school_id' => $sekolah2->id, 'nama' => 'X-1']);
        SchoolClass::create(['school_id' => $sekolah2->id, 'nama' => 'X-2']);
    }
}
