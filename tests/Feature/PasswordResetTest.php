<?php

use App\Mail\ResetPasswordMailable;
use App\Models\User;
use App\Notifications\ResetPasswordNotification;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Notification;
use Illuminate\Support\Facades\Password;

use function Pest\Laravel\get;
use function Pest\Laravel\post;

uses(RefreshDatabase::class);

const RESET_EMAIL = 'reset@example.com';
const RESET_NAME = 'Reset User';
const RESET_PASSWORD = 'password123';
const NEW_PASSWORD = 'newpassword456';

/*
|--------------------------------------------------------------------------
| Forgot Password Page
|--------------------------------------------------------------------------
*/

test('guest can view forgot password page', function () {
    get(route('password.request'))
        ->assertOk()
        ->assertInertia(fn ($page) => $page
            ->component('auth/ForgotPassword')
        );
});

/*
|--------------------------------------------------------------------------
| Forgot Password Submission
|--------------------------------------------------------------------------
*/

test('user can request password reset with valid email', function () {
    Notification::fake();

    $user = User::factory()->create([
        'email' => RESET_EMAIL,
        'password' => Hash::make(RESET_PASSWORD),
    ]);

    post(route('password.email'), ['email' => RESET_EMAIL])
        ->assertRedirect()
        ->assertSessionHas('status');

    Notification::assertSentTo($user, ResetPasswordNotification::class);
});

test('forgot password shows error for non-existent email', function () {
    post(route('password.email'), ['email' => 'nonexistent@example.com'])
        ->assertRedirect()
        ->assertSessionHasErrors('email');
});

test('forgot password validates required email', function () {
    post(route('password.email'), [])
        ->assertSessionHasErrors('email');
});

test('forgot password validates email format', function () {
    post(route('password.email'), ['email' => 'not-an-email'])
        ->assertSessionHasErrors('email');
});

/*
|--------------------------------------------------------------------------
| Reset Password Page
|--------------------------------------------------------------------------
*/

test('guest can view reset password page with valid token', function () {
    $user = User::factory()->create([
        'email' => RESET_EMAIL,
    ]);

    $token = Password::createToken($user);

    get(route('password.reset', ['token' => $token, 'email' => RESET_EMAIL]))
        ->assertOk()
        ->assertInertia(fn ($page) => $page
            ->component('auth/ResetPassword')
        );
});

test('reset password page contains email input with user email', function () {
    $user = User::factory()->create([
        'email' => RESET_EMAIL,
    ]);

    $token = Password::createToken($user);

    get(route('password.reset', [
        'token' => $token,
        'email' => RESET_EMAIL,
    ]))
        ->assertOk()
        ->assertInertia(fn ($page) => $page
            ->component('auth/ResetPassword')
        );
});

/*
|--------------------------------------------------------------------------
| Password Reset
|--------------------------------------------------------------------------
*/

test('user can reset password with valid token', function () {
    $user = User::factory()->create([
        'email' => RESET_EMAIL,
        'password' => Hash::make(RESET_PASSWORD),
    ]);

    $token = Password::createToken($user);

    post(route('password.update'), [
        'token' => $token,
        'email' => RESET_EMAIL,
        'password' => NEW_PASSWORD,
        'password_confirmation' => NEW_PASSWORD,
    ])
        ->assertRedirect(route('sign-in'))
        ->assertSessionHas('status');

    $user->refresh();
    expect(Hash::check(NEW_PASSWORD, $user->password))->toBeTrue();
});

test('user can login with new password after reset', function () {
    $user = User::factory()->create([
        'email' => RESET_EMAIL,
        'password' => Hash::make(RESET_PASSWORD),
        'email_verified_at' => now(),
    ]);

    $token = Password::createToken($user);

    post(route('password.update'), [
        'token' => $token,
        'email' => RESET_EMAIL,
        'password' => NEW_PASSWORD,
        'password_confirmation' => NEW_PASSWORD,
    ]);

    post(route('login'), [
        'email' => RESET_EMAIL,
        'password' => NEW_PASSWORD,
    ])
        ->assertRedirect(route('home'));
});

test('password reset requires valid token', function () {
    $user = User::factory()->create([
        'email' => RESET_EMAIL,
        'password' => Hash::make(RESET_PASSWORD),
    ]);

    post(route('password.update'), [
        'token' => 'invalid-token',
        'email' => RESET_EMAIL,
        'password' => NEW_PASSWORD,
        'password_confirmation' => NEW_PASSWORD,
    ])
        ->assertSessionHasErrors('email');
});

test('password reset requires matching confirmation', function () {
    $user = User::factory()->create([
        'email' => RESET_EMAIL,
        'password' => Hash::make(RESET_PASSWORD),
    ]);

    $token = Password::createToken($user);

    post(route('password.update'), [
        'token' => $token,
        'email' => RESET_EMAIL,
        'password' => NEW_PASSWORD,
        'password_confirmation' => 'different-password',
    ])
        ->assertSessionHasErrors('password');
});

test('password reset requires minimum 8 characters', function () {
    $user = User::factory()->create([
        'email' => RESET_EMAIL,
        'password' => Hash::make(RESET_PASSWORD),
    ]);

    $token = Password::createToken($user);

    post(route('password.update'), [
        'token' => $token,
        'email' => RESET_EMAIL,
        'password' => 'short',
        'password_confirmation' => 'short',
    ])
        ->assertSessionHasErrors('password');
});

test('password reset requires all required fields', function () {
    post(route('password.update'), [])
        ->assertSessionHasErrors(['token', 'email', 'password']);
});

/*
|--------------------------------------------------------------------------
| Custom Email Notification
|--------------------------------------------------------------------------
*/

test('password reset notification uses custom mailable', function () {
    Notification::fake();

    $user = User::factory()->create([
        'email' => RESET_EMAIL,
    ]);

    $user->sendPasswordResetNotification('test-token');

    Notification::assertSentTo($user, ResetPasswordNotification::class, function ($notification) use ($user) {
        $mail = $notification->toMail($user);

        expect($mail)->toBeInstanceOf(ResetPasswordMailable::class);

        return true;
    });
});

test('password reset email contains reset URL', function () {
    Notification::fake();

    $user = User::factory()->create([
        'email' => RESET_EMAIL,
    ]);

    $user->sendPasswordResetNotification('test-token');

    Notification::assertSentTo($user, ResetPasswordNotification::class, function ($notification) use ($user) {
        $mail = $notification->toMail($user);

        expect($mail->resetUrl)->toContain(route('password.reset', ['token' => 'test-token', 'email' => RESET_EMAIL], false));
        expect($mail->envelope()->subject)->toBe('Reset your password');

        return true;
    });
});
