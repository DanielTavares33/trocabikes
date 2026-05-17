<?php

namespace App\Http\Controllers;

use App\Http\Requests\Auth\RegisterPostRequest;
use App\Models\User;
use Auth;
use Hash;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class RegisterController extends Controller
{
    public function index()
    {
        return inertia('auth/SignUp');
    }

    public function register(RegisterPostRequest $request): RedirectResponse
    {
        // Validate the request data
        $validated = $request->validated();

        // Create the user
        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
        ]);

        // Log the user in
        Auth::login($user);

        // Redirect to the home page
        return redirect()->route('home');
    }
}
