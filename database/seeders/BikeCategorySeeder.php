<?php

namespace Database\Seeders;

use App\Models\BikeCategory;
use Illuminate\Database\Seeder;

class BikeCategorySeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            'Mountain Bikes (MTB)',
            'Road Bikes',
            'Hybrid / City Bikes',
            'Gravel Bikes',
            'Electric Bikes (E-Bikes)',
            'Cyclocross',
            'Touring',
            'BMX',
            'Kids',
            'Folding',
        ];

        foreach ($categories as $category) {
            BikeCategory::factory()->create(['name' => $category]);
        }
    }
}
