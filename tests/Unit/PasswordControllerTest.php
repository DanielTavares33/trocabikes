<?php

use App\Http\Controllers\PasswordController;
use Illuminate\Support\Facades\Password;

test('getSentStatus returns Password::RESET_LINK_SENT', function () {
    $controller = new PasswordController;

    $result = (new ReflectionClass($controller))
        ->getMethod('getSentStatus')
        ->invoke($controller);

    expect($result)->toBe(Password::RESET_LINK_SENT);
});

test('getInvalidEmailStatus returns Password::INVALID_USER', function () {
    $controller = new PasswordController;

    $result = (new ReflectionClass($controller))
        ->getMethod('getInvalidEmailStatus')
        ->invoke($controller);

    expect($result)->toBe(Password::INVALID_USER);
});
