<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\EmailVerificationRequest;
use Illuminate\Http\RedirectResponse;

class EmailVerificationController extends Controller
{
    public function show()
    {
        return inertia('auth/VerifyEmail', [
            'email' => auth()->user()->email,
        ]);
    }

    public function verify(EmailVerificationRequest $request): RedirectResponse
    {
        $request->fulfill();

        return redirect()->route('home')->with('message', 'Email verified successfully!');
    }

    public function send(): RedirectResponse
    {
        auth()->user()->sendEmailVerificationNotification();

        return back()->with('message', 'Verification link sent!');
    }
}
