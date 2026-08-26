<?php

use App\Models\Bike;
use App\Models\User;
use App\Support\BikePresenter;

test('detail hides phone contact when phone is not visible', function () {
    $user = User::factory()->create([
        'phone' => '+351912345678',
        'whatsapp' => '351912345678',
        'email' => 'seller@example.com',
    ]);

    $bike = Bike::factory()->for($user)->create([
        'phone_visible' => false,
        'email_visible' => true,
    ]);

    $detail = BikePresenter::detail($bike);

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

    $bike = Bike::factory()->for($user)->create([
        'phone_visible' => true,
        'email_visible' => false,
    ]);

    $detail = BikePresenter::detail($bike);

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

    $bike = Bike::factory()->for($user)->create([
        'phone_visible' => true,
        'email_visible' => true,
    ]);

    $detail = BikePresenter::detail($bike);

    expect($detail['seller']['phone'])->toBe('+351912345678')
        ->and($detail['seller']['whatsapp'])->toBe('351912345678')
        ->and($detail['seller']['email'])->toBe('seller@example.com');
});

test('detail keeps kilometers null when not provided', function () {
    $bike = Bike::factory()->create(['kilometers' => null]);

    $detail = BikePresenter::detail($bike);

    expect($detail['kilometers'])->toBeNull();
});
