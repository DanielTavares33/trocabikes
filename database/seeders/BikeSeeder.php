<?php

namespace Database\Seeders;

use App\Models\Bike;
use App\Models\BikeBrand;
use App\Models\BikeCategory;
use App\Models\BikeImage;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;
use RuntimeException;

class BikeSeeder extends Seeder
{
    private const SAMPLE_IMAGE = 'seeders/assets/listing-sample.jpg';

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

        $sampleImagePath = database_path(self::SAMPLE_IMAGE);

        if (! File::isFile($sampleImagePath)) {
            throw new RuntimeException("Sample listing image not found at [{$sampleImagePath}].");
        }

        $sampleImage = File::get($sampleImagePath);

        $bikes = Bike::factory()
            ->count(30)
            ->recycle($user)
            ->state(fn () => [
                'bike_brand_id' => $brandIds->random(),
                'bike_category_id' => $categoryIds->random(),
            ])
            ->create();

        foreach ($bikes as $bike) {
            $path = "bikes/{$bike->id}/seed.jpg";

            Storage::disk('public')->put($path, $sampleImage);

            BikeImage::query()->create([
                'bike_id' => $bike->id,
                'path' => $path,
                'sort_order' => 0,
                'is_primary' => true,
            ]);
        }
    }
}
