<?php

namespace Database\Seeders;

use App\Enums\BikeCondition;
use App\Enums\BikeStatus;
use App\Enums\FrameMaterial;
use App\Models\Bike;
use App\Models\BikeBrand;
use App\Models\BikeCategory;
use App\Models\BikeImage;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use RuntimeException;

class E2eDatabaseSeeder extends Seeder
{
    private const SAMPLE_IMAGE = 'seeders/assets/listing-sample.jpg';

    public const BUYER_EMAIL = 'buyer@trocabikes.test';

    public const SELLER_EMAIL = 'seller@trocabikes.test';

    public const UNVERIFIED_EMAIL = 'unverified@trocabikes.test';

    public const DEFAULT_PASSWORD = 'password';

    public function run(): void
    {
        $buyer = User::factory()->create([
            'name' => 'E2E Buyer',
            'email' => self::BUYER_EMAIL,
            'password' => Hash::make(self::DEFAULT_PASSWORD),
            'email_verified_at' => now(),
            'phone' => '+351900000001',
        ]);

        $seller = User::factory()->create([
            'name' => 'E2E Seller',
            'email' => self::SELLER_EMAIL,
            'password' => Hash::make(self::DEFAULT_PASSWORD),
            'email_verified_at' => now(),
            'phone' => '+351900000002',
        ]);

        User::factory()->unverified()->create([
            'name' => 'E2E Unverified',
            'email' => self::UNVERIFIED_EMAIL,
            'password' => Hash::make(self::DEFAULT_PASSWORD),
        ]);

        $trek = BikeBrand::factory()->create(['name' => 'Trek']);
        $specialized = BikeBrand::factory()->create(['name' => 'Specialized']);
        $canyon = BikeBrand::factory()->create(['name' => 'Canyon']);

        $mountain = BikeCategory::factory()->create(['name' => 'Mountain Bikes (MTB)']);
        $road = BikeCategory::factory()->create(['name' => 'Road Bikes']);

        $this->seedBike($seller, [
            'title' => 'Canyon Spectral CF 7',
            'bike_brand_id' => $canyon->id,
            'bike_category_id' => $mountain->id,
            'description' => 'Full suspension mountain bike in excellent condition.',
            'price' => 2850,
            'condition' => BikeCondition::Excellent,
            'year' => 2022,
            'size' => 'L',
            'frame_material' => FrameMaterial::Carbon,
            'kilometers' => 1200,
            'district' => 'Lisboa',
            'city' => 'Lisboa',
            'status' => BikeStatus::Active,
        ]);

        $this->seedBike($seller, [
            'title' => 'Trek Domane SL 5',
            'bike_brand_id' => $trek->id,
            'bike_category_id' => $road->id,
            'description' => 'Comfortable endurance road bike.',
            'price' => 1200,
            'condition' => BikeCondition::Good,
            'year' => 2020,
            'size' => 'M',
            'frame_material' => FrameMaterial::Aluminum,
            'kilometers' => 3500,
            'district' => 'Porto',
            'city' => 'Porto',
            'status' => BikeStatus::Active,
        ]);

        $this->seedBike($seller, [
            'title' => 'Specialized Allez Sprint',
            'bike_brand_id' => $specialized->id,
            'bike_category_id' => $road->id,
            'description' => 'Lightweight road racing bike.',
            'price' => 1950,
            'condition' => BikeCondition::Excellent,
            'year' => 2021,
            'size' => 'M',
            'frame_material' => FrameMaterial::Carbon,
            'kilometers' => 800,
            'district' => 'Porto',
            'city' => 'Porto',
            'status' => BikeStatus::Active,
        ]);

        unset($buyer);
    }

    /**
     * @param  array<string, mixed>  $attributes
     */
    private function seedBike(User $user, array $attributes): Bike
    {
        $bike = Bike::factory()->create([
            ...$attributes,
            'user_id' => $user->id,
        ]);

        $sampleImagePath = database_path(self::SAMPLE_IMAGE);

        if (! File::isFile($sampleImagePath)) {
            throw new RuntimeException("Sample listing image not found at [{$sampleImagePath}].");
        }

        $path = "bikes/{$bike->id}/seed.jpg";
        Storage::disk('public')->put($path, File::get($sampleImagePath));

        BikeImage::query()->create([
            'bike_id' => $bike->id,
            'path' => $path,
            'sort_order' => 0,
            'is_primary' => true,
        ]);

        return $bike;
    }
}
