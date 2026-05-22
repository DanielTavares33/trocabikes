<?php

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\URL;
use function Pest\Laravel\actingAs;
use function Pest\Laravel\assertAuthenticated;
use function Pest\Laravel\assertGuest;
use function Pest\Laravel\get;
use function Pest\Laravel\post;

uses(RefreshDatabase::class);

const VERIFY_EMAIL = 'verify@example.com';
const VERIFY_NAME = 'Verify Test';
const VERIFY_PASSWORD = 'password123';

/*
|--------------------------------------------------------------------------
| Registration - Email Verification Flow
|--------------------------------------------------------------------------
*/

test('user is redirected to verification notice after registration', function () {
    post(route('register'), [
        'name' => VERIFY_NAME,
        'email' => VERIFY_EMAIL,
        'password' => VERIFY_PASSWORD,
        'password_confirmation' => VERIFY_PASSWORD,
    ]);

    $response = post(route('register'), [
        'name' => 'Another User',
        'email' => 'another@example.com',
        'password' => VERIFY_PASSWORD,
        'password_confirmation' => VERIFY_PASSWORD,
    ]);

    $response->assertRedirect(route('verification.notice'));
    assertAuthenticated();
});

test('newly registered user has unverified email', function () {
    post(route('register'), [
        'name' => 'New User',
        'email' => 'new@example.com',
        'password' => VERIFY_PASSWORD,
        'password_confirmation' => VERIFY_PASSWORD,
    ]);

    $user = User::where('email', 'new@example.com')->first();

    expect($user->email_verified_at)->toBeNull();
});

test('registered user receives verification email', function () {
    post(route('register'), [
        'name' => 'Email User',
        'email' => 'email-test@example.com',
        'password' => VERIFY_PASSWORD,
        'password_confirmation' => VERIFY_PASSWORD,
    ]);

    $user = User::where('email', 'email-test@example.com')->first();

    expect($user)->not->toBeNull();
    expect($user->email_verified_at)->toBeNull();
});

/*
|--------------------------------------------------------------------------
| Login - Block Unverified Users
|--------------------------------------------------------------------------
*/



test('verified user can login', function () {
    User::factory()->create([
        'email' => 'verified@example.com',
        'password' => Hash::make(VERIFY_PASSWORD),
        'email_verified_at' => now(),
    ]);

    $response = post(route('login'), [
        'email' => 'verified@example.com',
        'password' => VERIFY_PASSWORD,
    ]);

    $response->assertRedirect(route('home'));
    assertAuthenticated();
});

/*
|--------------------------------------------------------------------------
| Email Verification Page
|--------------------------------------------------------------------------
*/

test('unauthenticated user cannot access verification notice page', function () {
    $response = get(route('verification.notice'));

    $response->assertRedirect(route('sign-in'));
});

test('authenticated user can access verification notice page', function () {
    $user = User::factory()->create();

    $response = actingAs($user)->get(route('verification.notice'));

    $response->assertOk();
    $response->assertSee($user->email);
});

/*
|--------------------------------------------------------------------------
| Verification Link
|--------------------------------------------------------------------------
*/

test('user can verify email with valid link', function () {
    $user = User::factory()->create([
        'email_verified_at' => null,
    ]);

    $url = URL::signedRoute('verification.verify', [
        'id' => $user->id,
        'hash' => sha1($user->email),
    ]);

    $response = actingAs($user)->get($url);

    $response->assertRedirect(route('home'));
    $user->refresh();
    expect($user->email_verified_at)->not->toBeNull();
});

test('invalid verification link returns 403', function () {
    $user = User::factory()->create([
        'email_verified_at' => null,
    ]);

    $url = URL::temporarySignedRoute(
        'verification.verify',
        now()->addMinutes(60),
        [
            'id' => $user->id,
            'hash' => 'invalid-hash',
        ]
    );

    $response = actingAs($user)->get($url);

    $response->assertStatus(403);
});

test('expired verification link returns 403', function () {
    $user = User::factory()->create([
        'email_verified_at' => null,
    ]);

    $url = URL::temporarySignedRoute(
        'verification.verify',
        now()->subMinutes(10),
        [
            'id' => $user->id,
            'hash' => sha1($user->email),
        ]
    );

    $response = actingAs($user)->get($url);

    $response->assertStatus(403);
});

/*
|--------------------------------------------------------------------------
| Resend Verification Email
|--------------------------------------------------------------------------
*/

test('authenticated user can resend verification email', function () {
    $user = User::factory()->create([
        'email_verified_at' => null,
    ]);

    $response = actingAs($user)->post(route('verification.send'));

    $response->assertRedirect();
    $response->assertSessionHas('message', 'Verification link sent!');
});

test('unauthenticated user cannot resend verification email', function () {
    $response = post(route('verification.send'));

    $response->assertRedirect(route('sign-in'));
});

/*
|--------------------------------------------------------------------------
| Protected Routes - Require Verified Email
|--------------------------------------------------------------------------
*/

test('unverified user cannot access profile', function () {
    $user = User::factory()->create([
        'email_verified_at' => null,
    ]);

    $response = actingAs($user)->get(route('profile'));

    $response->assertRedirect(route('verification.notice'));
});

test('verified user can access profile', function () {
    $user = User::factory()->create([
        'email_verified_at' => now(),
    ]);

    $response = actingAs($user)->get(route('profile'));

    $response->assertOk();
});

test('unverified user cannot access my-bikes', function () {
    $user = User::factory()->create([
        'email_verified_at' => null,
    ]);

    $response = actingAs($user)->get(route('my-bikes'));

    $response->assertRedirect(route('verification.notice'));
});

test('unverified user cannot access saved-bikes', function () {
    $user = User::factory()->create([
        'email_verified_at' => null,
    ]);

    $response = actingAs($user)->get(route('saved-bikes'));

    $response->assertRedirect(route('verification.notice'));
});

test('unverified user cannot access listings create', function () {
    $user = User::factory()->create([
        'email_verified_at' => null,
    ]);

    $response = actingAs($user)->get(route('listings.create'));

    $response->assertRedirect(route('verification.notice'));
});