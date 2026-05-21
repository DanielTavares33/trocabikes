<?php

use App\Models\BikeCategory;
use App\Observers\BikeCategoryObserver;

test('auto-generates slug from name when slug is empty', function () {
    $observer = new BikeCategoryObserver;
    $category = new BikeCategory(['name' => 'Road Bikes']);

    $observer->creating($category);

    expect($category->slug)->toBe('road-bikes');
});

test('preserves existing slug when provided', function () {
    $observer = new BikeCategoryObserver;
    $category = new BikeCategory([
        'name' => 'Mountain Bikes',
        'slug' => 'mtb-custom',
    ]);

    $observer->creating($category);

    expect($category->slug)->toBe('mtb-custom');
});

test('handles special characters in name', function () {
    $observer = new BikeCategoryObserver;
    $category = new BikeCategory(['name' => 'Kids & Youth']);

    $observer->creating($category);

    expect($category->slug)->toBe('kids-youth');
});

test('handles uppercase letters in name', function () {
    $observer = new BikeCategoryObserver;
    $category = new BikeCategory(['name' => 'HYBRID BIKES']);

    $observer->creating($category);

    expect($category->slug)->toBe('hybrid-bikes');
});

test('handles whitespace in name', function () {
    $observer = new BikeCategoryObserver;
    $category = new BikeCategory(['name' => '  Electric Bikes  ']);

    $observer->creating($category);

    expect($category->slug)->toBe('electric-bikes');
});
