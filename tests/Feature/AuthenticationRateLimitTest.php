<?php

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\RateLimiter;

use function Pest\Laravel\assertAuthenticated;
use function Pest\Laravel\assertAuthenticatedAs;
use function Pest\Laravel\assertGuest;
use function Pest\Laravel\post;
use function Pest\Laravel\withHeaders;

uses(RefreshDatabase::class);

const TEST_EMAIL = 'test@example.com';
const TEST_PASSWORD = 'password123';
const USER_NAME = 'User 6';
const USER_EMAIL = 'user6@example.com';

/*
|--------------------------------------------------------------------------
| Login Rate Limiting Tests
|--------------------------------------------------------------------------
*/

test('login is rate limited after 5 failed attempts', function () {
    User::factory()->create([
        'email' => TEST_EMAIL,
        'password' => Hash::make(TEST_PASSWORD),
    ]);

    // Make 5 failed attempts
    for ($i = 0; $i < 5; $i++) {
        post(route('login'), [
            'email' => TEST_EMAIL,
            'password' => 'wrongpassword',
        ]);
    }

    // 6th attempt should be rate limited
    $response = post(route('login'), [
        'email' => TEST_EMAIL,
        'password' => 'wrongpassword',
    ]);

    $response->assertRedirect();
    $response->assertInvalid(['email']);
    assertGuest();
});

test('login rate limit returns retry-after header', function () {
    User::factory()->create([
        'email' => TEST_EMAIL,
        'password' => Hash::make(TEST_PASSWORD),
    ]);

    // Make 5 failed attempts
    for ($i = 0; $i < 5; $i++) {
        post(route('login'), [
            'email' => TEST_EMAIL,
            'password' => 'wrongpassword',
        ]);
    }

    // 6th attempt should be rate limited
    $response = post(route('login'), [
        'email' => TEST_EMAIL,
        'password' => 'wrongpassword',
    ]);

    $response->assertRedirect();
    $response->assertInvalid(['email']);
    $response->assertHeader('Retry-After');
});

test('successful login does not count towards rate limit', function () {
    $user = User::factory()->create([
        'email' => TEST_EMAIL,
        'password' => Hash::make(TEST_PASSWORD),
    ]);

    // Make 5 successful logins
    for ($i = 0; $i < 5; $i++) {
        $response = post(route('login'), [
            'email' => TEST_EMAIL,
            'password' => TEST_PASSWORD,
        ]);

        $response->assertRedirect(route('home'));
        assertAuthenticatedAs($user);

        // Logout for next iteration
        post(route('logout'));
    }

    // 6th login should still work
    $response = post(route('login'), [
        'email' => TEST_EMAIL,
        'password' => TEST_PASSWORD,
    ]);

    $response->assertRedirect(route('home'));
    assertAuthenticatedAs($user);
});

test('login rate limit is IP based', function () {
    User::factory()->create([
        'email' => TEST_EMAIL,
        'password' => Hash::make(TEST_PASSWORD),
    ]);

    // Make 5 failed attempts from one IP
    for ($i = 0; $i < 5; $i++) {
        withHeaders(['X-Forwarded-For' => '192.168.1.1'])->post(route('login'), [
            'email' => TEST_EMAIL,
            'password' => 'wrongpassword',
        ]);
    }

    // Different IP should still be able to login
    $response = withHeaders(['X-Forwarded-For' => '192.168.1.2'])->post(route('login'), [
        'email' => TEST_EMAIL,
        'password' => TEST_PASSWORD,
    ]);

    $response->assertRedirect(route('verification.notice'));
});

test('registration rate limit is IP based', function () {
    // Make 5 failed registrations from one IP
    for ($i = 0; $i < 5; $i++) {
        withHeaders(['X-Forwarded-For' => '192.168.1.1'])->post(route('register'), [
            'name' => '',
            'email' => "user{$i}@example.com",
            'password' => 'password123',
            'password_confirmation' => 'password123',
        ]);
    }

    // Different IP should still be able to register
    $response = withHeaders(['X-Forwarded-For' => '192.168.1.2'])->post(route('register'), [
        'name' => USER_NAME,
        'email' => USER_EMAIL,
        'password' => 'password123',
        'password_confirmation' => 'password123',
    ]);

    $response->assertRedirect(route('verification.notice'));
});
