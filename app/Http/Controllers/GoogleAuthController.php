<?php

namespace App\Http\Controllers;

use App\Models\User;
use Auth;
use Illuminate\Http\Request;
use Laravel\Socialite\Socialite;
use Throwable;

class GoogleAuthController extends Controller
{
    public function redirect()
    {
        return Socialite::driver('google')->redirect();
    }

    public function callback()
    {
        try {
            // Get the user information from Google
            $user = Socialite::driver('google')->user();
        } catch (Throwable $e) {
            return redirect()->route('sign-in')->with('error', 'Failed to authenticate with Google. Please try again.');
        }

        $existingUser = User::where('email', $user->getEmail())->first();

        if ($existingUser) {
            // Log in the existing user
            Auth::login($existingUser);
        } else {
            // Create a new user and log them in
            $newUser = User::updateOrCreate(
                ['email' => $user->getEmail()],
                [
                    'name' => $user->getName(),
                    'google_id' => $user->getId(),
                    'avatar' => $user->getAvatar(),
                ]
            );

            Auth::login($newUser);
        }

        return redirect()->route('home');
    }
}
