<?php

use Illuminate\Support\Facades\Route;

Route::inertia('/', 'Welcome')->name('home');
Route::inertia('/sign-in', 'auth/SignIn')->name('sign-in');
Route::inertia('/sign-up', 'auth/SignUp')->name('sign-up');
Route::inertia('/browse', 'browse/Browse')->name('browse');
Route::inertia('/browse/{listing:slug}', 'listing/ListingDetail')->name('listings.show');
