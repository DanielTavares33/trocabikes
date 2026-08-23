<?php

namespace Database\Seeders;

use App\Models\BikeBrand;
use App\Models\BikeCategory;
use App\Models\Listing;
use App\Models\User;
use Illuminate\Database\Seeder;

class ListingSeeder extends Seeder
{
    public function run(): void
    {
        $user = User::query()->first() ?? User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]);

        $brandIds = BikeBrand::query()->pluck('id');
        $categoryIds = BikeCategory::query()->pluck('id');

        if ($brandIds->isEmpty() || $categoryIds->isEmpty()) {
            return;
        }

        Listing::factory()
            ->count(30)
            ->recycle($user)
            ->state(fn () => [
                'bike_brand_id' => $brandIds->random(),
                'bike_category_id' => $categoryIds->random(),
            ])
            ->create();
    }
}
