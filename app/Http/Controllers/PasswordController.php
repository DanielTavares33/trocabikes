<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Str;

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
            return back()->withErrors(['email' => __($this->getInvalidEmailStatus())]);
        }

        $token = Password::createToken($user);
        $user->sendPasswordResetNotification($token);

        return back()->with(['status' => __($this->getSentStatus())]);
    }

    public function showResetPassword(string $token)
    {
        return inertia('auth/ResetPassword', ['token' => $token]);
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
            return redirect()->route('sign-in')->with('status', __($status));
        }

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
