<?php

use App\Models\BikeBrand;

test('can create a bike brand via factory', function () {
    $brand = BikeBrand::factory()->create();

    expect($brand)->toBeInstanceOf(BikeBrand::class)
        ->and($brand->name)->not->toBeEmpty()
        ->and($brand->slug)->not->toBeEmpty()
        ->and($brand->is_active)->toBeTrue();
});

test('auto-generates slug from name', function () {
    $brand = BikeBrand::factory()->create(['name' => 'Trek Bikes']);

    expect($brand->slug)->toBe('trek-bikes');
});

test('uses provided slug when explicitly set', function () {
    $brand = BikeBrand::factory()->create([
        'name' => 'Trek Bikes',
        'slug' => 'custom-slug',
    ]);

    expect($brand->slug)->toBe('custom-slug');
});

test('inactive state works', function () {
    $brand = BikeBrand::factory()->inactive()->create();

    expect($brand->is_active)->toBeFalse();
});
