<?php

use App\Models\BikeCategory;

test('can create a bike category via factory', function () {
    $category = BikeCategory::factory()->create();

    expect($category)->toBeInstanceOf(BikeCategory::class)
        ->and($category->name)->not->toBeEmpty()
        ->and($category->slug)->not->toBeEmpty();
});

test('auto-generates slug from name', function () {
    $category = BikeCategory::factory()->create(['name' => 'Mountain Bikes']);

    expect($category->slug)->toBe('mountain-bikes');
});
