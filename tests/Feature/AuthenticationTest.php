<?php

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;

use function Pest\Laravel\actingAs;
use function Pest\Laravel\assertAuthenticated;
use function Pest\Laravel\assertAuthenticatedAs;
use function Pest\Laravel\assertDatabaseHas;
use function Pest\Laravel\assertGuest;
use function Pest\Laravel\get;
use function Pest\Laravel\post;

uses(RefreshDatabase::class);

const AUTH_TEST_EMAIL = 'test@example.com';
const AUTH_TEST_PASSWORD = 'password123';
const AUTH_WRONG_PASSWORD = 'wrongpassword';
const AUTH_REGISTRATION_EMAIL = 'john@example.com';
const AUTH_REGISTRATION_NAME = 'John Doe';
const AUTH_EXISTING_EMAIL = 'existing@example.com';
const AUTH_NONEXISTENT_EMAIL = 'nonexistent@example.com';

/*
|--------------------------------------------------------------------------
| Login Tests
|--------------------------------------------------------------------------
*/

test('user can view sign in page', function () {
    $response = get(route('sign-in'));

    $response->assertOk();
});

test('user can login with valid credentials', function () {
    $user = User::factory()->create([
        'email' => AUTH_TEST_EMAIL,
        'password' => Hash::make(AUTH_TEST_PASSWORD),
    ]);

    $response = post(route('login'), [
        'email' => AUTH_TEST_EMAIL,
        'password' => AUTH_TEST_PASSWORD,
    ]);

    $response->assertRedirect(route('home'));
    assertAuthenticatedAs($user);
});

test('user cannot login with invalid credentials', function () {
    User::factory()->create([
        'email' => AUTH_TEST_EMAIL,
        'password' => Hash::make(AUTH_TEST_PASSWORD),
    ]);

    $response = post(route('login'), [
        'email' => AUTH_TEST_EMAIL,
        'password' => AUTH_WRONG_PASSWORD,
    ]);

    $response->assertRedirect();
    $response->assertInvalid(['email']);
    assertGuest();
});

test('user cannot login with non-existent email', function () {
    $response = post(route('login'), [
        'email' => AUTH_NONEXISTENT_EMAIL,
        'password' => AUTH_TEST_PASSWORD,
    ]);

    $response->assertRedirect();
    $response->assertInvalid(['email']);
    assertGuest();
});

test('login requires email', function () {
    $response = post(route('login'), [
        'email' => '',
        'password' => AUTH_TEST_PASSWORD,
    ]);

    $response->assertRedirect();
    $response->assertInvalid(['email']);
});

test('login requires password', function () {
    $response = post(route('login'), [
        'email' => AUTH_TEST_EMAIL,
        'password' => '',
    ]);

    $response->assertRedirect();
    $response->assertInvalid(['password']);
});

test('user can login with remember me', function () {
    $user = User::factory()->create([
        'email' => AUTH_TEST_EMAIL,
        'password' => Hash::make(AUTH_TEST_PASSWORD),
    ]);

    $response = post(route('login'), [
        'email' => AUTH_TEST_EMAIL,
        'password' => AUTH_TEST_PASSWORD,
        'remember' => 'on',
    ]);

    $response->assertRedirect(route('home'));
    assertAuthenticatedAs($user);
});

/*
|--------------------------------------------------------------------------
| Registration Tests
|--------------------------------------------------------------------------
*/

test('user can view sign up page', function () {
    $response = get(route('sign-up'));

    $response->assertOk();
});

test('user can register with valid data', function () {
    $response = post(route('register'), [
        'name' => AUTH_REGISTRATION_NAME,
        'email' => AUTH_REGISTRATION_EMAIL,
        'password' => AUTH_TEST_PASSWORD,
        'password_confirmation' => AUTH_TEST_PASSWORD,
    ]);

    $response->assertRedirect(route('home'));
    assertDatabaseHas('users', ['email' => AUTH_REGISTRATION_EMAIL]);
    assertAuthenticated();
});

test('registration requires name', function () {
    $response = post(route('register'), [
        'name' => '',
        'email' => AUTH_REGISTRATION_EMAIL,
        'password' => AUTH_TEST_PASSWORD,
        'password_confirmation' => AUTH_TEST_PASSWORD,
    ]);

    $response->assertRedirect();
    $response->assertInvalid(['name']);
    assertGuest();
});

test('registration requires valid email', function () {
    $response = post(route('register'), [
        'name' => AUTH_REGISTRATION_NAME,
        'email' => 'invalid-email',
        'password' => AUTH_TEST_PASSWORD,
        'password_confirmation' => AUTH_TEST_PASSWORD,
    ]);

    $response->assertRedirect();
    $response->assertInvalid(['email']);
    assertGuest();
});

test('registration requires unique email', function () {
    User::factory()->create(['email' => AUTH_EXISTING_EMAIL]);

    $response = post(route('register'), [
        'name' => AUTH_REGISTRATION_NAME,
        'email' => AUTH_EXISTING_EMAIL,
        'password' => AUTH_TEST_PASSWORD,
        'password_confirmation' => AUTH_TEST_PASSWORD,
    ]);

    $response->assertRedirect();
    $response->assertInvalid(['email']);
    assertGuest();
});

test('registration requires password', function () {
    $response = post(route('register'), [
        'name' => AUTH_REGISTRATION_NAME,
        'email' => AUTH_REGISTRATION_EMAIL,
        'password' => '',
        'password_confirmation' => '',
    ]);

    $response->assertRedirect();
    $response->assertInvalid(['password']);
    assertGuest();
});

test('registration requires minimum 8 character password', function () {
    $response = post(route('register'), [
        'name' => AUTH_REGISTRATION_NAME,
        'email' => AUTH_REGISTRATION_EMAIL,
        'password' => 'short',
        'password_confirmation' => 'short',
    ]);

    $response->assertRedirect();
    $response->assertInvalid(['password']);
    assertGuest();
});

test('registration requires password confirmation', function () {
    $response = post(route('register'), [
        'name' => AUTH_REGISTRATION_NAME,
        'email' => AUTH_REGISTRATION_EMAIL,
        'password' => AUTH_TEST_PASSWORD,
        'password_confirmation' => 'different',
    ]);

    $response->assertRedirect();
    $response->assertInvalid(['password']);
    assertGuest();
});

/*
|--------------------------------------------------------------------------
| Logout Tests
|--------------------------------------------------------------------------
*/

test('authenticated user can logout', function () {
    $user = User::factory()->create();

    $response = actingAs($user)->post(route('logout'));

    $response->assertRedirect(route('home'));
    assertGuest();
});

test('unauthenticated user cannot access protected routes', function () {
    $response = get(route('profile'));

    $response->assertRedirect(route('sign-in'));
});

test('logout invalidates session', function () {
    $user = User::factory()->create();

    actingAs($user);
    post(route('logout'));

    $response = get(route('profile'));
    $response->assertRedirect(route('sign-in'));
});
