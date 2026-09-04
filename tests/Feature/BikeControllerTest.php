<?php

use App\Enums\BikeStatus;
use App\Models\Bike;
use App\Models\BikeBrand;
use App\Models\BikeCategory;
use App\Models\User;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Inertia\Testing\AssertableInertia as Assert;

/**
 * @return array<string, mixed>
 */
function validBikeUpdatePayload(Bike $bike, array $overrides = []): array
{
    return array_merge([
        'title' => $bike->title,
        'bike_brand_id' => $bike->bike_brand_id,
        'bike_category_id' => $bike->bike_category_id,
        'description' => $bike->description,
        'price' => $bike->price,
        'condition' => $bike->condition->value,
        'year' => $bike->year,
        'size' => $bike->size,
        'frame_material' => $bike->frame_material->value,
        'district' => $bike->district,
        'city' => $bike->city,
    ], $overrides);
}

function fakeBikeUpload(string $name = 'bike.jpg'): UploadedFile
{
    return new UploadedFile(
        database_path('seeders/assets/listing-sample.jpg'),
        $name,
        'image/jpeg',
        null,
        true,
    );
}

function seedBikePhoto(Bike $bike): void
{
    $path = fakeBikeUpload('bike.jpg')->store("bikes/{$bike->id}", 'public');

    $bike->images()->create([
        'path' => $path,
        'sort_order' => 0,
        'is_primary' => true,
    ]);
}

test('browse returns paginated active listings', function () {
    $active = Bike::factory()->create(['status' => BikeStatus::Active]);
    Bike::factory()->sold()->create();

    $response = $this->get(route('bikes.index'));

    $response->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('bikes/Index')
            ->has('bikes.data', 1)
            ->where('bikes.data.0.id', $active->id)
            ->where('filters.sort', 'newest')
            ->has('filterOptions.brands.0.slug')
            ->has('filterOptions.categories.0.slug')
        );
});

test('browse filters by brand category price condition and location', function () {
    $brand = BikeBrand::factory()->create();
    $otherBrand = BikeBrand::factory()->create();
    $category = BikeCategory::factory()->create();

    $match = Bike::factory()->create([
        'bike_brand_id' => $brand->id,
        'bike_category_id' => $category->id,
        'price' => 750,
        'condition' => 'excellent',
        'district' => 'Lisboa',
        'city' => 'Oeiras',
        'year' => 2022,
    ]);

    Bike::factory()->create([
        'bike_brand_id' => $otherBrand->id,
        'bike_category_id' => $category->id,
        'price' => 3000,
        'condition' => 'good',
        'district' => 'Porto',
        'city' => 'Porto',
        'year' => 2018,
    ]);

    $response = $this->get(route('bikes.index', [
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
            ->has('bikes.data', 1)
            ->where('bikes.data.0.id', $match->id)
            ->where('filters.bike_brand_id', (string) $brand->id)
            ->where('filters.bike_category_id', (string) $category->id)
        );
});

test('browse filters listings by keyword in title description and brand', function () {
    $trek = BikeBrand::factory()->create(['name' => 'Trek']);
    $specialized = BikeBrand::factory()->create(['name' => 'Specialized']);

    $titleMatch = Bike::factory()->create([
        'title' => 'Trek Fuel EX 8',
        'description' => 'Trail bike',
        'bike_brand_id' => $specialized->id,
    ]);
    $descriptionMatch = Bike::factory()->create([
        'title' => 'Canyon Grail',
        'description' => 'A trek across gravel roads',
        'bike_brand_id' => $specialized->id,
    ]);
    $brandMatch = Bike::factory()->create([
        'title' => 'Domane SL 5',
        'description' => 'Endurance road bike',
        'bike_brand_id' => $trek->id,
    ]);
    $miss = Bike::factory()->create([
        'title' => 'Specialized Allez',
        'description' => 'Aluminum road bike',
        'bike_brand_id' => $specialized->id,
    ]);

    $this->get(route('bikes.index', ['q' => 'trek']))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->has('bikes.data', 3)
            ->where('filters.q', 'trek')
            ->where('bikes.data', function ($bikes) use ($titleMatch, $descriptionMatch, $brandMatch, $miss) {
                $ids = collect($bikes)->pluck('id');

                return $ids->contains($titleMatch->id)
                    && $ids->contains($descriptionMatch->id)
                    && $ids->contains($brandMatch->id)
                    && $ids->doesntContain($miss->id);
            })
        );
});

test('browse treats like wildcards in keywords as literals', function (string $q, string $matchTitle, string $missTitle) {
    $match = Bike::factory()->create([
        'title' => $matchTitle,
        'description' => 'Keyword fixture',
    ]);
    Bike::factory()->create([
        'title' => $missTitle,
        'description' => 'Keyword fixture',
    ]);

    $this->get(route('bikes.index', ['q' => $q]))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->has('bikes.data', 1)
            ->where('bikes.data.0.id', $match->id)
            ->where('filters.q', $q)
        );
})->with([
    'percent' => ['100%', '100% carbon trail bike', '1000 carbon trail bike'],
    'underscore' => ['size_m', 'size_m frame', 'sizeXm frame'],
]);

test('browse respects sort and pagination', function () {
    Bike::factory()->create(['price' => 100, 'created_at' => now()->subDay()]);
    Bike::factory()->create(['price' => 900, 'created_at' => now()]);

    $this->get(route('bikes.index', ['sort' => 'price_desc']))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->where('bikes.data.0.price', 900)
            ->where('filters.sort', 'price_desc')
        );

    Bike::factory()->count(10)->create();

    $this->get(route('bikes.index'))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->where('bikes.per_page', 10)
            ->where('bikes.current_page', 1)
        );
});

test('show displays listing and increments views', function () {
    $bike = Bike::factory()->create(['views' => 5]);

    $response = $this->get(route('bikes.show', $bike));

    $response->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('bikes/Show')
            ->where('bike.id', $bike->id)
            ->where('bike.views', 6)
        );

    expect($bike->fresh()->views)->toBe(6);
});

test('verified user can store listing with photos', function () {
    Storage::fake('public');

    $user = User::factory()->create(['email_verified_at' => now()]);
    $brand = BikeBrand::factory()->create();
    $category = BikeCategory::factory()->create();

    $response = $this->actingAs($user)->post(route('bikes.store'), [
        'title' => 'Test Bike',
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
            fakeBikeUpload('bike.jpg'),
        ],
    ]);

    $bike = Bike::query()->where('title', 'Test Bike')->first();

    $response->assertRedirect(route('bikes.show', $bike));
    $response->assertInertiaFlash('success', 'Your bike is live.');

    expect($bike)->not->toBeNull()
        ->and($bike->user_id)->toBe($user->id)
        ->and($bike->images)->toHaveCount(1);

    Storage::disk('public')->assertExists($bike->images->first()->path);
});

test('store validates required fields and photo rules', function () {
    $user = User::factory()->create(['email_verified_at' => now()]);

    $this->actingAs($user)
        ->post(route('bikes.store'), [])
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
    $bike = Bike::factory()->for($owner)->create(['title' => 'Original Title']);
    seedBikePhoto($bike);

    $this->actingAs($other)
        ->put(route('bikes.update', $bike), validBikeUpdatePayload($bike, [
            'title' => 'Hacked Title',
        ]))
        ->assertForbidden();

    $updateResponse = $this->actingAs($owner)
        ->put(route('bikes.update', $bike), validBikeUpdatePayload($bike, [
            'title' => 'Updated Title',
        ]));

    $updateResponse->assertRedirect(route('bikes.show', $bike->fresh()));
    $updateResponse->assertInertiaFlash('success', 'Bike updated successfully.');

    expect($bike->fresh()->title)->toBe('Updated Title');

    $path = fakeBikeUpload('bike.jpg')->store("bikes/{$bike->id}", 'public');
    $image = $bike->images()->create([
        'path' => $path,
        'sort_order' => 0,
        'is_primary' => true,
    ]);

    $destroyResponse = $this->actingAs($owner)
        ->delete(route('bikes.destroy', $bike->fresh()));

    $destroyResponse->assertRedirect(route('my-bikes'));
    $destroyResponse->assertInertiaFlash('success', 'Bike removed successfully.');

    Storage::disk('public')->assertMissing($path);
    expect(Bike::query()->find($bike->id))->toBeNull()
        ->and($bike->images()->find($image->id))->toBeNull();
});

test('guests cannot view sold or archived listings', function () {
    $sold = Bike::factory()->sold()->create();
    $archived = Bike::factory()->archived()->create();

    $this->get(route('bikes.show', $sold))->assertNotFound();
    $this->get(route('bikes.show', $archived))->assertNotFound();
});

test('owner can view their sold listing', function () {
    $user = User::factory()->create(['email_verified_at' => now()]);
    $bike = Bike::factory()->for($user)->sold()->create();

    $this->actingAs($user)
        ->get(route('bikes.show', $bike))
        ->assertOk();
});

test('show increments views only once per session', function () {
    $bike = Bike::factory()->create(['views' => 5]);

    $this->get(route('bikes.show', $bike))->assertOk();
    $this->get(route('bikes.show', $bike))->assertOk();

    expect($bike->fresh()->views)->toBe(6);
});

test('unverified user cannot create a bike', function () {
    $user = User::factory()->unverified()->create();

    $this->actingAs($user)
        ->get(route('bikes.create'))
        ->assertRedirect(route('verification.notice'));
});

test('update rejects removing all photos', function () {
    Storage::fake('public');

    $owner = User::factory()->create(['email_verified_at' => now()]);
    $bike = Bike::factory()->for($owner)->create();
    $path = fakeBikeUpload('bike.jpg')->store("bikes/{$bike->id}", 'public');
    $image = $bike->images()->create([
        'path' => $path,
        'sort_order' => 0,
        'is_primary' => true,
    ]);

    $this->actingAs($owner)
        ->put(route('bikes.update', $bike), validBikeUpdatePayload($bike, [
            'removed_photo_ids' => [$image->id],
        ]))
        ->assertSessionHasErrors('photos');

    expect($bike->fresh()->images)->toHaveCount(1);
});

test('update rejects more than ten photos total', function () {
    Storage::fake('public');

    $owner = User::factory()->create(['email_verified_at' => now()]);
    $bike = Bike::factory()->for($owner)->create();

    foreach (range(1, 8) as $index) {
        $path = fakeBikeUpload("bike-{$index}.jpg")->store("bikes/{$bike->id}", 'public');
        $bike->images()->create([
            'path' => $path,
            'sort_order' => $index - 1,
            'is_primary' => $index === 1,
        ]);
    }

    $this->actingAs($owner)
        ->put(route('bikes.update', $bike), validBikeUpdatePayload($bike, [
            'photos' => [
                fakeBikeUpload('new-1.jpg'),
                fakeBikeUpload('new-2.jpg'),
                fakeBikeUpload('new-3.jpg'),
            ],
        ]))
        ->assertSessionHasErrors('photos');

    expect($bike->fresh()->images)->toHaveCount(8);
});

test('owner can update listing photos', function () {
    Storage::fake('public');

    $owner = User::factory()->create(['email_verified_at' => now()]);
    $bike = Bike::factory()->for($owner)->create();

    $keepPath = fakeBikeUpload('keep.jpg')->store("bikes/{$bike->id}", 'public');
    $removePath = fakeBikeUpload('remove.jpg')->store("bikes/{$bike->id}", 'public');

    $keepImage = $bike->images()->create([
        'path' => $keepPath,
        'sort_order' => 0,
        'is_primary' => true,
    ]);
    $removeImage = $bike->images()->create([
        'path' => $removePath,
        'sort_order' => 1,
        'is_primary' => false,
    ]);

    $this->actingAs($owner)
        ->put(route('bikes.update', $bike), validBikeUpdatePayload($bike, [
            'removed_photo_ids' => [$removeImage->id],
            'photos' => [
                fakeBikeUpload('added.jpg'),
            ],
        ]))
        ->assertRedirect(route('bikes.show', $bike));

    $bike->refresh();

    expect($bike->images)->toHaveCount(2)
        ->and($bike->images->pluck('id')->all())->toContain($keepImage->id)
        ->and($bike->images->pluck('id')->all())->not->toContain($removeImage->id);

    Storage::disk('public')->assertMissing($removePath);
    Storage::disk('public')->assertExists($bike->images->last()->path);
});

test('updating title regenerates slug', function () {
    Storage::fake('public');

    $owner = User::factory()->create(['email_verified_at' => now()]);
    $bike = Bike::factory()->for($owner)->create(['title' => 'Original Title']);
    seedBikePhoto($bike);

    $this->actingAs($owner)
        ->put(route('bikes.update', $bike), validBikeUpdatePayload($bike, [
            'title' => 'Brand New Title',
        ]))
        ->assertRedirect(route('bikes.show', ['bike' => 'brand-new-title']));

    expect($bike->fresh())
        ->title->toBe('Brand New Title')
        ->slug->toBe('brand-new-title');
});

test('edit includes inactive brand assigned to listing', function () {
    $owner = User::factory()->create(['email_verified_at' => now()]);
    $brand = BikeBrand::factory()->inactive()->create(['name' => 'Legacy Brand']);
    $bike = Bike::factory()->for($owner)->create(['bike_brand_id' => $brand->id]);

    $this->actingAs($owner)
        ->get(route('bikes.edit', $bike))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('bikes/Edit')
            ->where('brands', fn ($brands) => collect($brands)->contains(
                fn (array $item) => $item['id'] === $brand->id && $item['name'] === 'Legacy Brand',
            ))
        );
});

test('home page shows recent active bikes', function () {
    $recent = Bike::factory()->create(['created_at' => now()]);
    Bike::factory()->sold()->create();

    $this->get(route('home'))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('Welcome')
            ->has('recentBikes', 1)
            ->where('recentBikes.0.id', $recent->id)
        );
});

test('home page passes categories for shortcuts', function () {
    $category = BikeCategory::factory()->create(['name' => 'Mountain Bikes (MTB)']);

    $this->get(route('home'))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('Welcome')
            ->has('categories', 1)
            ->where('categories.0.id', $category->id)
            ->where('categories.0.name', 'Mountain Bikes (MTB)')
            ->where('categories.0.slug', 'mountain-bikes-mtb')
        );
});

test('my bikes lists authenticated user listings', function () {
    $user = User::factory()->create(['email_verified_at' => now()]);
    $mine = Bike::factory()->for($user)->create();
    Bike::factory()->create();

    $this->actingAs($user)
        ->get(route('my-bikes'))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('my-bikes/Index')
            ->has('bikes', 1)
            ->where('bikes.0.id', $mine->id)
        );
});

test('show exposes can manage for owner', function () {
    $owner = User::factory()->create(['email_verified_at' => now()]);
    $bike = Bike::factory()->for($owner)->create();

    $this->actingAs($owner)
        ->get(route('bikes.show', $bike))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->where('canManage', true)
        );
});

test('show hides manage actions for guests', function () {
    $bike = Bike::factory()->create();

    $this->get(route('bikes.show', $bike))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->where('canManage', false)
        );
});

test('store rejects inactive brand', function () {
    Storage::fake('public');

    $user = User::factory()->create(['email_verified_at' => now()]);
    $brand = BikeBrand::factory()->inactive()->create();
    $category = BikeCategory::factory()->create();

    $this->actingAs($user)
        ->post(route('bikes.store'), [
            'title' => 'Test Bike',
            'bike_brand_id' => $brand->id,
            'bike_category_id' => $category->id,
            'description' => 'A great bike for sale.',
            'price' => 1200,
            'condition' => 'excellent',
            'year' => 2023,
            'size' => 'M',
            'frame_material' => 'carbon',
            'district' => 'Lisboa',
            'city' => 'Lisboa',
            'photos' => [
                fakeBikeUpload('bike.jpg'),
            ],
        ])
        ->assertSessionHasErrors('bike_brand_id');
});

test('non owner cannot delete listing', function () {
    $owner = User::factory()->create(['email_verified_at' => now()]);
    $other = User::factory()->create(['email_verified_at' => now()]);
    $bike = Bike::factory()->for($owner)->create();

    $this->actingAs($other)
        ->delete(route('bikes.destroy', $bike))
        ->assertForbidden();

    expect(Bike::query()->find($bike->id))->not->toBeNull();
});

test('duplicate titles receive unique slugs', function () {
    $first = Bike::factory()->create(['title' => 'Same Title']);
    $second = Bike::factory()->create(['title' => 'Same Title']);

    expect($first->slug)->toBe('same-title')
        ->and($second->slug)->toBe('same-title-1');
});
