<?php

namespace Database\Seeders;

use App\Models\BikeBrand;
use Illuminate\Database\Seeder;

class BikeBrandSeeder extends Seeder
{
    public function run(): void
    {
        $brands = [
            'Trek', 'Specialized', 'Giant', 'Cannondale', 'Scott',
            'Santa Cruz', 'Canyon', 'Orbea', 'BH', 'Focus',
            'Merida', 'Cube', 'BMC', 'Cervélo', 'Pinarello',
            'Colnago', 'Bianchi', 'Lapierre', 'KTM', 'Norco',
        ];

        foreach ($brands as $brand) {
            BikeBrand::factory()->create(['name' => $brand]);
        }
    }
}
