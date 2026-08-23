<?php

use App\Enums\BikeCondition;
use App\Enums\BikeStatus;
use App\Enums\FrameMaterial;
use App\Models\Bike;
use App\Models\BikeBrand;
use App\Models\BikeCategory;
use App\Models\User;

test('can create a bike via factory', function () {
    $bike = Bike::factory()->create();

    expect($bike)->toBeInstanceOf(Bike::class)
        ->and($bike->title)->not->toBeEmpty()
        ->and($bike->slug)->not->toBeEmpty()
        ->and($bike->price)->toBeNumeric()
        ->and($bike->condition)->toBeInstanceOf(BikeCondition::class)
        ->and($bike->frame_material)->toBeInstanceOf(FrameMaterial::class)
        ->and($bike->status)->toBeInstanceOf(BikeStatus::class)
        ->and($bike->status)->toBe(BikeStatus::Active);
});

test('belongs to user, bike brand, and bike category', function () {
    $bike = Bike::factory()->create();

    expect($bike->user)->toBeInstanceOf(User::class)
        ->and($bike->bikeBrand)->toBeInstanceOf(BikeBrand::class)
        ->and($bike->bikeCategory)->toBeInstanceOf(BikeCategory::class);
});

test('sold state sets status correctly', function () {
    $bike = Bike::factory()->sold()->create();

    expect($bike->status)->toBe(BikeStatus::Sold);
});

test('archived state sets status correctly', function () {
    $bike = Bike::factory()->archived()->create();

    expect($bike->status)->toBe(BikeStatus::Archived);
});
