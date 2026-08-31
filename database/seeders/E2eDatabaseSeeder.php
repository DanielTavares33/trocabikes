<?php

namespace Database\Seeders;

use App\Enums\BikeCondition;
use App\Enums\FrameMaterial;
use App\Models\Bike;
use App\Models\BikeBrand;
use App\Models\BikeCategory;
use App\Models\BikeImage;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;
use RuntimeException;

class E2eDatabaseSeeder extends Seeder
{
    private const SAMPLE_IMAGE = 'seeders/assets/listing-sample.jpg';

    private const FILLER_COUNT = 40;

    public function run(): void
    {
        $this->call([
            BikeBrandSeeder::class,
            BikeCategorySeeder::class,
        ]);

        $seller = User::factory()->create([
            'name' => 'E2E Seller',
            'email' => 'seller@trocabikes.test',
        ]);

        $sampleImage = $this->sampleImage();
        $brandIds = BikeBrand::query()->pluck('id', 'name');
        $categoryIds = BikeCategory::query()->pluck('id', 'name');

        if ($brandIds->isEmpty() || $categoryIds->isEmpty()) {
            throw new RuntimeException('E2E seed requires bike brands and categories.');
        }

        $fillers = Bike::factory()
            ->count(self::FILLER_COUNT)
            ->recycle($seller)
            ->state(fn () => [
                'bike_brand_id' => $brandIds->random(),
                'bike_category_id' => $categoryIds->random(),
                'created_at' => now()->subHour(),
            ])
            ->create();

        $named = $this->namedListings($seller, $brandIds, $categoryIds);

        foreach ($fillers->concat($named) as $bike) {
            $this->attachSampleImage($bike, $sampleImage);
        }
    }

    /**
     * Named listings are created after fillers so they appear on home (6 newest)
     * and catalog page 1 (10 newest). Keep Trek Fuel EX 8 last.
     *
     * @param  Collection<string, mixed>  $brandIds
     * @param  Collection<string, mixed>  $categoryIds
     * @return list<Bike>
     */
    private function namedListings(User $seller, Collection $brandIds, Collection $categoryIds): array
    {
        $bikes = [];

        foreach ($this->namedListingAttributes() as $index => $listing) {
            $bikes[] = Bike::factory()
                ->recycle($seller)
                ->create([
                    'title' => $listing['title'],
                    'bike_brand_id' => $this->requiredId($brandIds, $listing['brand'], 'brand'),
                    'bike_category_id' => $this->requiredId($categoryIds, $listing['category'], 'category'),
                    'price' => $listing['price'],
                    'city' => $listing['city'],
                    'district' => $listing['city'],
                    'year' => $listing['year'],
                    'condition' => $listing['condition'],
                    'description' => $listing['title'].' listed for e2e browsing.',
                    'size' => 'M',
                    'frame_material' => FrameMaterial::Aluminum,
                    'created_at' => now()->addSeconds($index + 1),
                ]);
        }

        return $bikes;
    }

    /**
     * @return list<array{title: string, brand: string, category: string, price: int, city: string, year: int, condition: BikeCondition}>
     */
    private function namedListingAttributes(): array
    {
        return [
            [
                'title' => 'Giant Escape 3',
                'brand' => 'Giant',
                'category' => 'Hybrid / City Bikes',
                'price' => 420,
                'city' => 'Braga',
                'year' => 2021,
                'condition' => BikeCondition::Good,
            ],
            [
                'title' => 'Canyon Grail 7',
                'brand' => 'Canyon',
                'category' => 'Gravel Bikes',
                'price' => 1800,
                'city' => 'Coimbra',
                'year' => 2023,
                'condition' => BikeCondition::Excellent,
            ],
            [
                'title' => 'Cannondale Topstone',
                'brand' => 'Cannondale',
                'category' => 'Gravel Bikes',
                'price' => 1650,
                'city' => 'Lisboa',
                'year' => 2022,
                'condition' => BikeCondition::Excellent,
            ],
            [
                'title' => 'Orbea Gain D30',
                'brand' => 'Orbea',
                'category' => 'Electric Bikes (E-Bikes)',
                'price' => 4200,
                'city' => 'Porto',
                'year' => 2024,
                'condition' => BikeCondition::New,
            ],
            [
                'title' => 'Santa Cruz Chameleon',
                'brand' => 'Santa Cruz',
                'category' => 'Mountain Bikes (MTB)',
                'price' => 2750,
                'city' => 'Lisboa',
                'year' => 2023,
                'condition' => BikeCondition::Excellent,
            ],
            [
                'title' => 'BH Core City',
                'brand' => 'BH',
                'category' => 'Hybrid / City Bikes',
                'price' => 1100,
                'city' => 'Braga',
                'year' => 2022,
                'condition' => BikeCondition::Good,
            ],
            [
                'title' => 'Cube Cubie 160',
                'brand' => 'Cube',
                'category' => 'Kids',
                'price' => 280,
                'city' => 'Coimbra',
                'year' => 2024,
                'condition' => BikeCondition::Used,
            ],
            [
                'title' => 'Focus Fold 3',
                'brand' => 'Focus',
                'category' => 'Folding',
                'price' => 1050,
                'city' => 'Lisboa',
                'year' => 2021,
                'condition' => BikeCondition::Good,
            ],
            [
                'title' => 'Specialized Turbo Vado',
                'brand' => 'Specialized',
                'category' => 'Electric Bikes (E-Bikes)',
                'price' => 3400,
                'city' => 'Porto',
                'year' => 2023,
                'condition' => BikeCondition::Excellent,
            ],
            [
                'title' => 'Specialized Allez',
                'brand' => 'Specialized',
                'category' => 'Road Bikes',
                'price' => 890,
                'city' => 'Porto',
                'year' => 2020,
                'condition' => BikeCondition::Good,
            ],
            [
                'title' => 'Trek Domane SL 5',
                'brand' => 'Trek',
                'category' => 'Road Bikes',
                'price' => 2200,
                'city' => 'Lisboa',
                'year' => 2022,
                'condition' => BikeCondition::Excellent,
            ],
            [
                'title' => 'Trek Fuel EX 8',
                'brand' => 'Trek',
                'category' => 'Mountain Bikes (MTB)',
                'price' => 1450,
                'city' => 'Lisboa',
                'year' => 2021,
                'condition' => BikeCondition::Excellent,
            ],
        ];
    }

    /**
     * @param  Collection<string, mixed>  $idsByName
     */
    private function requiredId(Collection $idsByName, string $name, string $kind): int
    {
        $id = $idsByName->get($name);

        if ($id === null) {
            throw new RuntimeException("Bike {$kind} [{$name}] was not seeded.");
        }

        return (int) $id;
    }

    private function sampleImage(): string
    {
        $sampleImagePath = database_path(self::SAMPLE_IMAGE);

        if (! File::isFile($sampleImagePath)) {
            throw new RuntimeException("Sample listing image not found at [{$sampleImagePath}].");
        }

        return File::get($sampleImagePath);
    }

    private function attachSampleImage(Bike $bike, string $sampleImage): void
    {
        $path = "e2e/bikes/{$bike->id}/seed.jpg";

        Storage::disk('public')->put($path, $sampleImage);

        BikeImage::query()->create([
            'bike_id' => $bike->id,
            'path' => $path,
            'sort_order' => 0,
            'is_primary' => true,
        ]);
    }
}
