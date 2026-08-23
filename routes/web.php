<?php

use App\Http\Controllers\BikeController;
use App\Http\Controllers\EmailVerificationController;
use App\Http\Controllers\GoogleAuthController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\PasswordController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RegisterController;
use App\Http\Middleware\RateLimiterMiddleware;
use Illuminate\Auth\Middleware\Authenticate;
use Illuminate\Auth\Middleware\EnsureEmailIsVerified;
use Illuminate\Routing\Middleware\ThrottleRequests;
use Illuminate\Routing\Middleware\ValidateSignature;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Public Routes
|--------------------------------------------------------------------------
*/

Route::inertia('/', 'Welcome')->name('home');

Route::get('/bikes', [BikeController::class, 'index'])->name('bikes.index');

/*
|--------------------------------------------------------------------------
| Authentication Routes
|--------------------------------------------------------------------------
*/

// Sign In
Route::get('/sign-in', [LoginController::class, 'index'])->name('sign-in');
Route::post('/sign-in', [LoginController::class, 'login'])
    ->middleware(RateLimiterMiddleware::class.':login,5,60')
    ->name('login');

// Sign Up
Route::get('/sign-up', [RegisterController::class, 'index'])->name('sign-up');
Route::post('/sign-up', [RegisterController::class, 'register'])
    ->middleware(RateLimiterMiddleware::class.':register,5,60')
    ->name('register');

// Sign Out
Route::post('/logout', [LoginController::class, 'destroy'])
    ->middleware(Authenticate::class)
    ->name('logout');

// Google OAuth
Route::get('/auth/google/redirect', [GoogleAuthController::class, 'redirect'])->name('google.redirect');
Route::get('/auth/google/callback', [GoogleAuthController::class, 'callback'])->name('google.callback');

/*
|--------------------------------------------------------------------------
| Email Verification Routes
|--------------------------------------------------------------------------
*/

Route::get('/email/verify', [EmailVerificationController::class, 'show'])
    ->middleware([Authenticate::class, ThrottleRequests::class.':6,1'])
    ->name('verification.notice');

Route::get('/email/verify/{id}/{hash}', [EmailVerificationController::class, 'verify'])
    ->middleware([ValidateSignature::class])
    ->name('verification.verify');

Route::post('/email/verification-notification', [EmailVerificationController::class, 'send'])
    ->middleware([Authenticate::class, ThrottleRequests::class.':6,1'])
    ->name('verification.send');

/*
|--------------------------------------------------------------------------
| Reset Password Routes
|--------------------------------------------------------------------------
*/
Route::get('/forgot-password', [PasswordController::class, 'showForgotPassword'])
    ->name('password.request');

Route::post('/forgot-password', [PasswordController::class, 'sendResetLink'])
    ->middleware('guest')
    ->name('password.email');

Route::get('/reset-password/{token}', [PasswordController::class, 'showResetPassword'])
    ->middleware('guest')
    ->name('password.reset');

Route::post('/reset-password', [PasswordController::class, 'reset'])
    ->middleware('guest')
    ->name('password.update');

/*
|--------------------------------------------------------------------------
| Protected Routes (requires auth + verified email)
|--------------------------------------------------------------------------
*/

Route::middleware([Authenticate::class, EnsureEmailIsVerified::class])->group(function () {
    // Profile
    Route::get('/profile', [ProfileController::class, 'show'])->name('profile');
    Route::post('/profile', [ProfileController::class, 'update'])->name('profile.update');

    // User bikes
    Route::inertia('/my-bikes', 'my-bikes/Index')->name('my-bikes');

    // Saved bikes
    Route::inertia('/saved-bikes', 'saved-bikes/Index')->name('saved-bikes');

    // Sell a bike (must be registered before /bikes/{bike:slug})
    Route::get('/bikes/create', [BikeController::class, 'create'])->name('bikes.create');
    Route::post('/bikes', [BikeController::class, 'store'])->name('bikes.store');
    Route::get('/bikes/{bike:slug}/edit', [BikeController::class, 'edit'])->name('bikes.edit');
    Route::put('/bikes/{bike:slug}', [BikeController::class, 'update'])->name('bikes.update');
    Route::delete('/bikes/{bike:slug}', [BikeController::class, 'destroy'])->name('bikes.destroy');
});

Route::get('/bikes/{bike:slug}', [BikeController::class, 'show'])->name('bikes.show');

/*
|--------------------------------------------------------------------------
| Test Routes (Error Page Testing)
|--------------------------------------------------------------------------
*/

Route::get('/test-error/{code}', fn (int $code) => abort($code))->name('test.error');
