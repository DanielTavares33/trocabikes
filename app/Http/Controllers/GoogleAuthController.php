<?php

namespace App\Http\Controllers;

use App\Models\User;
use Auth;
use Inertia\Inertia;
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
            Inertia::flash('error', 'Failed to authenticate with Google. Please try again.');
            return redirect()->route('sign-in');
        }

        $existingUser = User::where('email', $user->getEmail())->first();

        if ($existingUser) {
            if (is_null($existingUser->google_id)) {
                $existingUser->update([
                    'google_id' => $user->getId(),
                    'avatar' => $user->getAvatar(),
                    'email_verified_at' => now(),
                ]);
            }

            session()->regenerate();
            Auth::login($existingUser);
        } else {
            $newUser = User::updateOrCreate(
                ['email' => $user->getEmail()],
                [
                    'name' => $user->getName(),
                    'password' => bcrypt(str()->random(16)),
                    'google_id' => $user->getId(),
                    'avatar' => $user->getAvatar(),
                    'email_verified_at' => now(),
                ]
            );

            session()->regenerate();
            Auth::login($newUser);
        }

        Inertia::flash('success', 'Successfully signed in!');
        return redirect()->route('home');
    }
}
