<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Str;
use Inertia\Inertia;

class PasswordController extends Controller
{
    public function showForgotPassword()
    {
        return inertia('auth/ForgotPassword');
    }

    public function sendResetLink(Request $request): RedirectResponse
    {
        $request->validate(['email' => 'required|email']);

        $user = User::where('email', $request->email)->first();

        if (! $user) {
            Inertia::flash('error', 'No user found with that email address.');
            return back()->withErrors(['email' => __($this->getInvalidEmailStatus())]);
        }

        $token = Password::createToken($user);
        $user->sendPasswordResetNotification($token);

        Inertia::flash('success', 'Password reset link sent! Please check your inbox.');
        return back()->with(['status' => __($this->getSentStatus())]);
    }

    public function showResetPassword(string $token, Request $request)
    {
        return inertia('auth/ResetPassword', [
            'token' => $token,
            'email' => $request->query('email'),
        ]);
    }

    public function reset(Request $request): RedirectResponse
    {
        $request->validate([
            'token' => 'required',
            'email' => 'required|email',
            'password' => 'required|min:8|confirmed',
        ]);

        $status = Password::reset(
            $request->only('email', 'password', 'password_confirmation', 'token'),
            function ($user, $password) {
                $user->forceFill([
                    'password' => Hash::make($password),
                ])->save();

                $user->setRememberToken(Str::random(60));

                event(new PasswordReset($user));
            },
        );

        if ($status === Password::PASSWORD_RESET) {
            Inertia::flash('success', 'Password reset successfully! You can now sign in with your new password.');
            return redirect()->route('sign-in')->with('status', __($status));
        }

        Inertia::flash('error', 'Failed to reset password. Please try again.');
        return back()->withErrors(['email' => [__($status)]]);
    }

    private function getSentStatus(): string
    {
        return Password::RESET_LINK_SENT;
    }

    private function getInvalidEmailStatus(): string
    {
        return Password::INVALID_USER;
    }
}
