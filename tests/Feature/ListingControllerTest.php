<?php

use App\Enums\ListingStatus;
use App\Models\BikeBrand;
use App\Models\BikeCategory;
use App\Models\Listing;
use App\Models\User;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Inertia\Testing\AssertableInertia as Assert;

/**
 * @return array<string, mixed>
 */
function validListingUpdatePayload(Listing $listing, array $overrides = []): array
{
    return array_merge([
        'title' => $listing->title,
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
    ], $overrides);
}

function seedListingPhoto(Listing $listing): void
{
    $path = UploadedFile::fake()->image('bike.jpg')->store("listings/{$listing->id}", 'public');

    $listing->images()->create([
        'path' => $path,
        'sort_order' => 0,
        'is_primary' => true,
    ]);
}

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
    seedListingPhoto($listing);

    $this->actingAs($other)
        ->put(route('listings.update', $listing), validListingUpdatePayload($listing, [
            'title' => 'Hacked Title',
        ]))
        ->assertForbidden();

    $this->actingAs($owner)
        ->put(route('listings.update', $listing), validListingUpdatePayload($listing, [
            'title' => 'Updated Title',
        ]))
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

test('guests cannot view sold or archived listings', function () {
    $sold = Listing::factory()->sold()->create();
    $archived = Listing::factory()->archived()->create();

    $this->get(route('listings.show', $sold))->assertForbidden();
    $this->get(route('listings.show', $archived))->assertForbidden();
});

test('owner can view their sold listing', function () {
    $user = User::factory()->create(['email_verified_at' => now()]);
    $listing = Listing::factory()->for($user)->sold()->create();

    $this->actingAs($user)
        ->get(route('listings.show', $listing))
        ->assertOk();
});

test('show increments views only once per session', function () {
    $listing = Listing::factory()->create(['views' => 5]);

    $this->get(route('listings.show', $listing))->assertOk();
    $this->get(route('listings.show', $listing))->assertOk();

    expect($listing->fresh()->views)->toBe(6);
});

test('unverified user cannot create a listing', function () {
    $user = User::factory()->unverified()->create();

    $this->actingAs($user)
        ->get(route('listings.create'))
        ->assertRedirect(route('verification.notice'));
});

test('update rejects removing all photos', function () {
    Storage::fake('public');

    $owner = User::factory()->create(['email_verified_at' => now()]);
    $listing = Listing::factory()->for($owner)->create();
    $path = UploadedFile::fake()->image('bike.jpg')->store("listings/{$listing->id}", 'public');
    $image = $listing->images()->create([
        'path' => $path,
        'sort_order' => 0,
        'is_primary' => true,
    ]);

    $this->actingAs($owner)
        ->put(route('listings.update', $listing), validListingUpdatePayload($listing, [
            'removed_photo_ids' => [$image->id],
        ]))
        ->assertSessionHasErrors('photos');

    expect($listing->fresh()->images)->toHaveCount(1);
});

test('update rejects more than ten photos total', function () {
    Storage::fake('public');

    $owner = User::factory()->create(['email_verified_at' => now()]);
    $listing = Listing::factory()->for($owner)->create();

    foreach (range(1, 8) as $index) {
        $path = UploadedFile::fake()->image("bike-{$index}.jpg")->store("listings/{$listing->id}", 'public');
        $listing->images()->create([
            'path' => $path,
            'sort_order' => $index - 1,
            'is_primary' => $index === 1,
        ]);
    }

    $this->actingAs($owner)
        ->put(route('listings.update', $listing), validListingUpdatePayload($listing, [
            'photos' => [
                UploadedFile::fake()->image('new-1.jpg'),
                UploadedFile::fake()->image('new-2.jpg'),
                UploadedFile::fake()->image('new-3.jpg'),
            ],
        ]))
        ->assertSessionHasErrors('photos');

    expect($listing->fresh()->images)->toHaveCount(8);
});

test('owner can update listing photos', function () {
    Storage::fake('public');

    $owner = User::factory()->create(['email_verified_at' => now()]);
    $listing = Listing::factory()->for($owner)->create();

    $keepPath = UploadedFile::fake()->image('keep.jpg')->store("listings/{$listing->id}", 'public');
    $removePath = UploadedFile::fake()->image('remove.jpg')->store("listings/{$listing->id}", 'public');

    $keepImage = $listing->images()->create([
        'path' => $keepPath,
        'sort_order' => 0,
        'is_primary' => true,
    ]);
    $removeImage = $listing->images()->create([
        'path' => $removePath,
        'sort_order' => 1,
        'is_primary' => false,
    ]);

    $this->actingAs($owner)
        ->put(route('listings.update', $listing), validListingUpdatePayload($listing, [
            'removed_photo_ids' => [$removeImage->id],
            'photos' => [
                UploadedFile::fake()->image('added.jpg'),
            ],
        ]))
        ->assertRedirect(route('listings.show', $listing));

    $listing->refresh();

    expect($listing->images)->toHaveCount(2)
        ->and($listing->images->pluck('id')->all())->toContain($keepImage->id)
        ->and($listing->images->pluck('id')->all())->not->toContain($removeImage->id);

    Storage::disk('public')->assertMissing($removePath);
    Storage::disk('public')->assertExists($listing->images->last()->path);
});

test('updating title regenerates slug', function () {
    Storage::fake('public');

    $owner = User::factory()->create(['email_verified_at' => now()]);
    $listing = Listing::factory()->for($owner)->create(['title' => 'Original Title']);
    seedListingPhoto($listing);

    $this->actingAs($owner)
        ->put(route('listings.update', $listing), validListingUpdatePayload($listing, [
            'title' => 'Brand New Title',
        ]))
        ->assertRedirect(route('listings.show', ['listing' => 'brand-new-title']));

    expect($listing->fresh())
        ->title->toBe('Brand New Title')
        ->slug->toBe('brand-new-title');
});

test('edit includes inactive brand assigned to listing', function () {
    $owner = User::factory()->create(['email_verified_at' => now()]);
    $brand = BikeBrand::factory()->inactive()->create(['name' => 'Legacy Brand']);
    $listing = Listing::factory()->for($owner)->create(['bike_brand_id' => $brand->id]);

    $this->actingAs($owner)
        ->get(route('listings.edit', $listing))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('listings/Edit')
            ->where('brands', fn ($brands) => collect($brands)->contains(
                fn (array $item) => $item['id'] === $brand->id && $item['name'] === 'Legacy Brand',
            ))
        );
});
