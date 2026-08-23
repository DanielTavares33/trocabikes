<?php

use App\Enums\ListingStatus;
use App\Models\BikeBrand;
use App\Models\BikeCategory;
use App\Models\Listing;
use App\Models\User;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Inertia\Testing\AssertableInertia as Assert;

test('browse returns paginated active listings', function () {
    $active = Listing::factory()->create(['status' => ListingStatus::Active]);
    Listing::factory()->sold()->create();

    $response = $this->get(route('browse'));

    $response->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('browse/Browse')
            ->has('listings.data', 1)
            ->where('listings.data.0.id', $active->id)
            ->has('filterOptions.brands')
            ->has('filterOptions.categories')
        );
});

test('browse filters by brand category price condition and location', function () {
    $brand = BikeBrand::factory()->create();
    $otherBrand = BikeBrand::factory()->create();
    $category = BikeCategory::factory()->create();

    $match = Listing::factory()->create([
        'bike_brand_id' => $brand->id,
        'bike_category_id' => $category->id,
        'price' => 750,
        'condition' => 'excellent',
        'district' => 'Lisboa',
        'city' => 'Oeiras',
        'year' => 2022,
    ]);

    Listing::factory()->create([
        'bike_brand_id' => $otherBrand->id,
        'bike_category_id' => $category->id,
        'price' => 3000,
        'condition' => 'good',
        'district' => 'Porto',
        'city' => 'Porto',
        'year' => 2018,
    ]);

    $response = $this->get(route('browse', [
        'bike_brand_id' => $brand->id,
        'bike_category_id' => $category->id,
        'price' => '500-1000',
        'condition' => ['excellent'],
        'location' => 'Oeiras',
        'year_from' => 2020,
        'year_to' => 2024,
    ]));

    $response->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->has('listings.data', 1)
            ->where('listings.data.0.id', $match->id)
        );
});

test('browse respects sort and pagination', function () {
    Listing::factory()->create(['price' => 100, 'created_at' => now()->subDay()]);
    Listing::factory()->create(['price' => 900, 'created_at' => now()]);

    $this->get(route('browse', ['sort' => 'price_desc']))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->where('listings.data.0.price', 900)
        );

    Listing::factory()->count(10)->create();

    $this->get(route('browse'))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->where('listings.per_page', 10)
            ->where('listings.current_page', 1)
        );
});

test('show displays listing and increments views', function () {
    $listing = Listing::factory()->create(['views' => 5]);

    $response = $this->get(route('listings.show', $listing));

    $response->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('listing/ListingDetail')
            ->where('listing.id', $listing->id)
            ->where('listing.views', 6)
        );

    expect($listing->fresh()->views)->toBe(6);
});

test('verified user can store listing with photos', function () {
    Storage::fake('public');

    $user = User::factory()->create(['email_verified_at' => now()]);
    $brand = BikeBrand::factory()->create();
    $category = BikeCategory::factory()->create();

    $response = $this->actingAs($user)->post(route('listings.store'), [
        'title' => 'Test Bike Listing',
        'bike_brand_id' => $brand->id,
        'bike_category_id' => $category->id,
        'description' => 'A great bike for sale.',
        'price' => 1200,
        'condition' => 'excellent',
        'year' => 2023,
        'size' => 'M',
        'frame_material' => 'carbon',
        'kilometers' => 100,
        'district' => 'Lisboa',
        'city' => 'Lisboa',
        'phone_visible' => true,
        'photos' => [
            UploadedFile::fake()->image('bike.jpg'),
        ],
    ]);

    $listing = Listing::query()->where('title', 'Test Bike Listing')->first();

    $response->assertRedirect(route('listings.show', $listing));

    expect($listing)->not->toBeNull()
        ->and($listing->user_id)->toBe($user->id)
        ->and($listing->images)->toHaveCount(1);

    Storage::disk('public')->assertExists($listing->images->first()->path);
});

test('store validates required fields and photo rules', function () {
    $user = User::factory()->create(['email_verified_at' => now()]);

    $this->actingAs($user)
        ->post(route('listings.store'), [])
        ->assertSessionHasErrors([
            'title',
            'bike_brand_id',
            'bike_category_id',
            'description',
            'price',
            'condition',
            'year',
            'size',
            'frame_material',
            'district',
            'city',
            'photos',
        ]);
});

test('owner can update and delete listing but others cannot', function () {
    Storage::fake('public');

    $owner = User::factory()->create(['email_verified_at' => now()]);
    $other = User::factory()->create(['email_verified_at' => now()]);
    $listing = Listing::factory()->for($owner)->create(['title' => 'Original Title']);

    $this->actingAs($other)
        ->put(route('listings.update', $listing), [
            'title' => 'Hacked Title',
            'bike_brand_id' => $listing->bike_brand_id,
            'bike_category_id' => $listing->bike_category_id,
            'description' => $listing->description,
            'price' => $listing->price,
            'condition' => $listing->condition->value,
            'year' => $listing->year,
            'size' => $listing->size,
            'frame_material' => $listing->frame_material->value,
            'district' => $listing->district,
            'city' => $listing->city,
        ])
        ->assertForbidden();

    $this->actingAs($owner)
        ->put(route('listings.update', $listing), [
            'title' => 'Updated Title',
            'bike_brand_id' => $listing->bike_brand_id,
            'bike_category_id' => $listing->bike_category_id,
            'description' => $listing->description,
            'price' => $listing->price,
            'condition' => $listing->condition->value,
            'year' => $listing->year,
            'size' => $listing->size,
            'frame_material' => $listing->frame_material->value,
            'district' => $listing->district,
            'city' => $listing->city,
        ])
        ->assertRedirect(route('listings.show', $listing->fresh()));

    expect($listing->fresh()->title)->toBe('Updated Title');

    $path = UploadedFile::fake()->image('bike.jpg')->store("listings/{$listing->id}", 'public');
    $image = $listing->images()->create([
        'path' => $path,
        'sort_order' => 0,
        'is_primary' => true,
    ]);

    $this->actingAs($owner)
        ->delete(route('listings.destroy', $listing->fresh()))
        ->assertRedirect(route('my-bikes'));

    Storage::disk('public')->assertMissing($path);
    expect(Listing::query()->find($listing->id))->toBeNull()
        ->and($listing->images()->find($image->id))->toBeNull();
});
