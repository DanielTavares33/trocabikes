<?php

namespace App\Http\Controllers;

use App\Http\Requests\Auth\RegisterPostRequest;
use App\Models\User;
use Auth;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;

class RegisterController extends Controller
{
    public function index()
    {
        return inertia('auth/SignUp');
    }

    public function register(RegisterPostRequest $request): RedirectResponse
    {
        $validated = $request->validated();

        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => $validated['password'],
        ]);

        Auth::login($user);

        event(new Registered($user));

        Inertia::flash('success', 'Registration successful! Please verify your email address.');
        return redirect()->route('verification.notice');
    }
}
