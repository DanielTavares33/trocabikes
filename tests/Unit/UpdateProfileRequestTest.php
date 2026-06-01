<?php

use App\Http\Requests\Profile\UpdateProfileRequest;
use App\Models\User;
use Illuminate\Validation\Rules\Unique;

test('email unique rule ignores current user', function () {
    $user = new User(['id' => 1, 'email' => 'current@example.com']);
    $user->id = 1;

    $request = new UpdateProfileRequest;
    $request->setUserResolver(fn () => $user);

    $rules = $request->rules();
    $emailRules = $rules['email'];

    $uniqueRule = null;
    foreach ($emailRules as $rule) {
        if ($rule instanceof Unique) {
            $uniqueRule = $rule;
            break;
        }
    }

    expect($uniqueRule)->not->toBeNull();

    expect((new ReflectionClass($uniqueRule))
        ->getProperty('ignore')
        ->getValue($uniqueRule))->toBe($user->id);
});
