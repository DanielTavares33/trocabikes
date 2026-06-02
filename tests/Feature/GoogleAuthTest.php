<?php

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Socialite\Contracts\User as SocialiteUser;
use Laravel\Socialite\Facades\Socialite;

use function Pest\Laravel\get;

uses(RefreshDatabase::class);

const GOOGLE_NAME = 'Google User';
const GOOGLE_EMAIL = 'google.user@example.com';
const GOOGLE_ID = 'google-123456';
const GOOGLE_AVATAR = 'https://lh3.googleusercontent.com/avatar.jpg';

test('redirect returns google oauth redirect', function () {
    $response = get(route('google.redirect'));

    $response->assertStatus(302);
    $response->assertRedirectContains('accounts.google.com');
});

test('callback creates new user with google when user does not exist', function () {
    $mockSocialiteUser = mock(SocialiteUser::class);
    $mockSocialiteUser->shouldReceive('getEmail')->andReturn(GOOGLE_EMAIL);
    $mockSocialiteUser->shouldReceive('getName')->andReturn(GOOGLE_NAME);
    $mockSocialiteUser->shouldReceive('getId')->andReturn(GOOGLE_ID);
    $mockSocialiteUser->shouldReceive('getAvatar')->andReturn(GOOGLE_AVATAR);

    Socialite::shouldReceive('driver->user')
        ->once()
        ->andReturn($mockSocialiteUser);

    get(route('google.callback'));

    $user = User::where('email', GOOGLE_EMAIL)->first();

    expect($user)->not->toBeNull()
        ->and($user->name)->toBe(GOOGLE_NAME)
        ->and($user->google_id)->toBe(GOOGLE_ID)
        ->and($user->avatar)->toBe(GOOGLE_AVATAR)
        ->and($user->email_verified_at)->not->toBeNull();
});

test('callback logs in existing user without google_id and updates fields', function () {
    $existingUser = User::factory()->create([
        'email' => GOOGLE_EMAIL,
        'email_verified_at' => null,
        'google_id' => null,
        'avatar' => null,
    ]);

    $mockSocialiteUser = mock(SocialiteUser::class);
    $mockSocialiteUser->shouldReceive('getEmail')->andReturn(GOOGLE_EMAIL);
    $mockSocialiteUser->shouldReceive('getName')->andReturn(GOOGLE_NAME);
    $mockSocialiteUser->shouldReceive('getId')->andReturn(GOOGLE_ID);
    $mockSocialiteUser->shouldReceive('getAvatar')->andReturn(GOOGLE_AVATAR);

    Socialite::shouldReceive('driver->user')
        ->once()
        ->andReturn($mockSocialiteUser);

    get(route('google.callback'));

    $existingUser->refresh();

    expect($existingUser->google_id)->toBe(GOOGLE_ID)
        ->and($existingUser->avatar)->toBe(GOOGLE_AVATAR)
        ->and($existingUser->email_verified_at)->not->toBeNull();
});

test('callback authenticates existing user with google_id and redirects to home', function () {
    $existingUser = User::factory()->create([
        'email' => GOOGLE_EMAIL,
        'google_id' => GOOGLE_ID,
        'avatar' => 'https://old-avatar.com/old.jpg',
        'email_verified_at' => now(),
    ]);

    $mockSocialiteUser = mock(SocialiteUser::class);
    $mockSocialiteUser->shouldReceive('getEmail')->andReturn(GOOGLE_EMAIL);
    $mockSocialiteUser->shouldReceive('getName')->andReturn(GOOGLE_NAME);
    $mockSocialiteUser->shouldReceive('getAvatar')->andReturn(GOOGLE_AVATAR);

    Socialite::shouldReceive('driver->user')
        ->once()
        ->andReturn($mockSocialiteUser);

    $response = get(route('google.callback'));

    $response->assertRedirect(route('home'));
    expect(auth()->check())->toBeTrue();
});

test('callback authenticates new user and redirects to home', function () {
    $mockSocialiteUser = mock(SocialiteUser::class);
    $mockSocialiteUser->shouldReceive('getEmail')->andReturn(GOOGLE_EMAIL);
    $mockSocialiteUser->shouldReceive('getName')->andReturn(GOOGLE_NAME);
    $mockSocialiteUser->shouldReceive('getId')->andReturn(GOOGLE_ID);
    $mockSocialiteUser->shouldReceive('getAvatar')->andReturn(GOOGLE_AVATAR);

    Socialite::shouldReceive('driver->user')
        ->once()
        ->andReturn($mockSocialiteUser);

    get(route('google.callback'))
        ->assertRedirect(route('home'));
});
