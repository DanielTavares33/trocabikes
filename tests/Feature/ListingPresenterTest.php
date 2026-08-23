<?php

use App\Models\Listing;
use App\Models\User;
use App\Support\ListingPresenter;

test('detail hides phone contact when phone is not visible', function () {
    $user = User::factory()->create([
        'phone' => '+351912345678',
        'whatsapp' => '351912345678',
        'email' => 'seller@example.com',
    ]);

    $listing = Listing::factory()->for($user)->create([
        'phone_visible' => false,
        'email_visible' => true,
    ]);

    $detail = ListingPresenter::detail($listing);

    expect($detail['seller']['phone'])->toBe('')
        ->and($detail['seller']['whatsapp'])->toBe('')
        ->and($detail['seller']['email'])->toBe('seller@example.com');
});

test('detail hides email when email is not visible', function () {
    $user = User::factory()->create([
        'phone' => '+351912345678',
        'whatsapp' => '351912345678',
        'email' => 'seller@example.com',
    ]);

    $listing = Listing::factory()->for($user)->create([
        'phone_visible' => true,
        'email_visible' => false,
    ]);

    $detail = ListingPresenter::detail($listing);

    expect($detail['seller']['phone'])->toBe('+351912345678')
        ->and($detail['seller']['whatsapp'])->toBe('351912345678')
        ->and($detail['seller']['email'])->toBe('');
});

test('detail exposes all seller contact when both visibility flags are enabled', function () {
    $user = User::factory()->create([
        'phone' => '+351912345678',
        'whatsapp' => '351912345678',
        'email' => 'seller@example.com',
    ]);

    $listing = Listing::factory()->for($user)->create([
        'phone_visible' => true,
        'email_visible' => true,
    ]);

    $detail = ListingPresenter::detail($listing);

    expect($detail['seller']['phone'])->toBe('+351912345678')
        ->and($detail['seller']['whatsapp'])->toBe('351912345678')
        ->and($detail['seller']['email'])->toBe('seller@example.com');
});
