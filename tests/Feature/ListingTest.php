<?php

use App\Enums\FrameMaterial;
use App\Enums\ListingCondition;
use App\Enums\ListingStatus;
use App\Models\BikeBrand;
use App\Models\BikeCategory;
use App\Models\Listing;
use App\Models\User;

test('can create a listing via factory', function () {
    $listing = Listing::factory()->create();

    expect($listing)->toBeInstanceOf(Listing::class)
        ->and($listing->title)->not->toBeEmpty()
        ->and($listing->slug)->not->toBeEmpty()
        ->and($listing->price)->toBeNumeric()
        ->and($listing->condition)->toBeInstanceOf(ListingCondition::class)
        ->and($listing->frame_material)->toBeInstanceOf(FrameMaterial::class)
        ->and($listing->status)->toBeInstanceOf(ListingStatus::class)
        ->and($listing->status)->toBe(ListingStatus::Active);
});

test('belongs to user, bike brand, and bike category', function () {
    $listing = Listing::factory()->create();

    expect($listing->user)->toBeInstanceOf(User::class)
        ->and($listing->bikeBrand)->toBeInstanceOf(BikeBrand::class)
        ->and($listing->bikeCategory)->toBeInstanceOf(BikeCategory::class);
});

test('sold state sets status correctly', function () {
    $listing = Listing::factory()->sold()->create();

    expect($listing->status)->toBe(ListingStatus::Sold);
});

test('archived state sets status correctly', function () {
    $listing = Listing::factory()->archived()->create();

    expect($listing->status)->toBe(ListingStatus::Archived);
});
