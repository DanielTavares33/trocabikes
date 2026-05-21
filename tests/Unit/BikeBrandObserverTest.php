<?php

use App\Models\BikeBrand;
use App\Observers\BikeBrandObserver;

test('auto-generates slug from name when slug is empty', function () {
    $observer = new BikeBrandObserver;
    $brand = new BikeBrand(['name' => 'Specialized bikes']);

    $observer->creating($brand);

    expect($brand->slug)->toBe('specialized-bikes');
});

test('preserves existing slug when provided', function () {
    $observer = new BikeBrandObserver;
    $brand = new BikeBrand([
        'name' => 'Giant Bikes',
        'slug' => 'custom-slug',
    ]);

    $observer->creating($brand);

    expect($brand->slug)->toBe('custom-slug');
});

test('handles special characters in name', function () {
    $observer = new BikeBrandObserver;
    $brand = new BikeBrand(['name' => 'Trek & Co.']);

    $observer->creating($brand);

    expect($brand->slug)->toBe('trek-co');
});

test('handles uppercase letters in name', function () {
    $observer = new BikeBrandObserver;
    $brand = new BikeBrand(['name' => 'CANNONDALE']);

    $observer->creating($brand);

    expect($brand->slug)->toBe('cannondale');
});

test('handles whitespace in name', function () {
    $observer = new BikeBrandObserver;
    $brand = new BikeBrand(['name' => '  Santa Cruz  ']);

    $observer->creating($brand);

    expect($brand->slug)->toBe('santa-cruz');
});
