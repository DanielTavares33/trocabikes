<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\EmailVerificationRequest;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;

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

        Inertia::flash('success', 'Email verified successfully!');
        return redirect()->route('home');
    }

    public function send(): RedirectResponse
    {
        auth()->user()->sendEmailVerificationNotification();

        Inertia::flash('success', 'Verification email sent! Please check your inbox.');
        return back();
    }
}
