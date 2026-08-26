<?php

namespace App\Http\Controllers;

use App\Http\Requests\Profile\UpdateProfileRequest;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProfileController extends Controller
{
    public function show(Request $request)
    {
        return Inertia::render('profile/Index', [
            'user' => $request->user(),
        ]);
    }

    public function update(UpdateProfileRequest $request)
    {
        $user = $request->user();

        $data = $request->validated();

        if ($request->hasFile('avatar')) {
            $path = $request->file('avatar')->store('avatars', 'public');
            $data['avatar'] = $path;
        }

        $user->update($data);

        Inertia::flash('success', 'Profile updated successfully.');

        return back();
    }
}
