<?php

use App\Http\Controllers\LoginController;
use App\Http\Controllers\RegisterController;
use Illuminate\Support\Facades\Route;

Route::inertia('/', 'Welcome')->name('home');

Route::get('/sign-in', [LoginController::class, 'index'])->name('sign-in');
Route::get('/sign-up', [RegisterController::class, 'index'])->name('sign-up');
Route::post('/sign-up', [RegisterController::class, 'register'])->name('register');

Route::inertia('/browse', 'browse/Browse')->name('browse');
Route::inertia('/browse/{listing:slug}', 'listing/ListingDetail')->name('listings.show');

Route::middleware('auth')->group(function () {
    Route::post('/logout', [LoginController::class, 'destroy'])->name('logout');
    Route::inertia('/profile', 'profile/Index')->name('profile');
    Route::inertia('/my-bikes', 'my-bikes/Index')->name('my-bikes');
    Route::inertia('/saved-bikes', 'saved-bikes/Index')->name('saved-bikes');
    Route::inertia('/listings/create', 'listings/Create')->name('listings.create');
});
