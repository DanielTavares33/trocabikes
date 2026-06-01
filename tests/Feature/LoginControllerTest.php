<?php

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Auth;

use function Pest\Laravel\post;

uses(RefreshDatabase::class);

const LC_TEST_EMAIL = 'lc@example.com';
const LC_TEST_PASSWORD = 'password123';

test('unverified email triggers logout and session invalidation', function () {
    $user = User::factory()->create([
        'email' => LC_TEST_EMAIL,
        'password' => bcrypt(LC_TEST_PASSWORD),
        'email_verified_at' => null,
    ]);

    $response = post(route('login'), [
        'email' => LC_TEST_EMAIL,
        'password' => LC_TEST_PASSWORD,
    ]);

    $response->assertRedirect();
    $response->assertSessionHasErrors('email');
    expect(Auth::check())->toBeFalse();
});

test('verified email proceeds normally', function () {
    $user = User::factory()->create([
        'email' => LC_TEST_EMAIL,
        'password' => bcrypt(LC_TEST_PASSWORD),
        'email_verified_at' => now(),
    ]);

    $response = post(route('login'), [
        'email' => LC_TEST_EMAIL,
        'password' => LC_TEST_PASSWORD,
    ]);

    $response->assertRedirect(route('home'));
    expect(Auth::check())->toBeTrue();
});
