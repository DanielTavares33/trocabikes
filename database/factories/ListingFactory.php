<?php

namespace Database\Factories;

use App\Enums\FrameMaterial;
use App\Enums\ListingCondition;
use App\Enums\ListingStatus;
use App\Models\BikeBrand;
use App\Models\BikeCategory;
use App\Models\Listing;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends Factory<Listing>
 */
class ListingFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $title = fake()->words(3, true);

        return [
            'user_id' => User::factory(),
            'bike_brand_id' => BikeBrand::factory(),
            'bike_category_id' => BikeCategory::factory(),
            'title' => ucfirst($title),
            'slug' => fn (array $attributes) => Str::slug($attributes['title']),
            'description' => fake()->paragraph(),
            'price' => fake()->randomFloat(2, 50, 5000),
            'condition' => fake()->randomElement(ListingCondition::cases()),
            'year' => fake()->numberBetween(2000, 2026),
            'size' => fake()->randomElement(['XS', 'S', 'M', 'L', 'XL']),
            'frame_material' => fake()->randomElement(FrameMaterial::cases()),
            'kilometers' => fake()->optional()->numberBetween(0, 20000),
            'district' => fake()->city(),
            'city' => fake()->city(),
            'phone_visible' => fake()->boolean(),
            'email_visible' => fake()->boolean(),
            'status' => ListingStatus::Active,
            'views' => fake()->numberBetween(0, 500),
        ];
    }

    public function sold(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => ListingStatus::Sold,
        ]);
    }

    public function archived(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => ListingStatus::Archived,
        ]);
    }
}
