<?php

use App\Http\Controllers\LoginController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RegisterController;
use App\Http\Middleware\RateLimiterMiddleware;
use Illuminate\Auth\Middleware\Authenticate;
use Illuminate\Auth\Middleware\EnsureEmailIsVerified;
use Illuminate\Foundation\Auth\EmailVerificationRequest;
use Illuminate\Http\Request;
use Illuminate\Routing\Middleware\ThrottleRequests;
use Illuminate\Routing\Middleware\ValidateSignature;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Public Routes
|--------------------------------------------------------------------------
*/

Route::inertia('/', 'Welcome')->name('home');

Route::inertia('/browse', 'browse/Browse')->name('browse');
Route::inertia('/browse/{listing:slug}', 'listing/ListingDetail')->name('listings.show');

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

/*
|--------------------------------------------------------------------------
| Email Verification Routes
|--------------------------------------------------------------------------
*/

// Show verification notice page (requires auth)
Route::get('/email/verify', function () {
    return Inertia::render('auth/VerifyEmail', [
        'email' => auth()->user()->email,
    ]);
})->middleware([Authenticate::class, ThrottleRequests::class.':6,1'])
    ->name('verification.notice');

// Handle verification link click
Route::get('/email/verify/{id}/{hash}', function (EmailVerificationRequest $request) {
    $request->fulfill();

    return redirect()->route('home')->with('message', 'Email verified successfully!');
})->middleware([ValidateSignature::class])
    ->name('verification.verify');

// Resend verification email
Route::post('/email/verification-notification', function (Request $request) {
    $request->user()->sendEmailVerificationNotification();

    return back()->with('message', 'Verification link sent!');
})->middleware([Authenticate::class, ThrottleRequests::class.':6,1'])
    ->name('verification.send');

/*
|--------------------------------------------------------------------------
| Protected Routes (requires auth + verified email)
|--------------------------------------------------------------------------
*/

Route::middleware([Authenticate::class, EnsureEmailIsVerified::class])->group(function () {
    // Profile
    Route::get('/profile', [ProfileController::class, 'show'])->name('profile');
    Route::post('/profile', [ProfileController::class, 'update'])->name('profile.update');

    // User Listings
    Route::inertia('/my-bikes', 'my-bikes/Index')->name('my-bikes');

    // Saved Bikes
    Route::inertia('/saved-bikes', 'saved-bikes/Index')->name('saved-bikes');

    // Create Listing
    Route::inertia('/listings/create', 'listings/Create')->name('listings.create');
});
