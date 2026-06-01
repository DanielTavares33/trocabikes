<?php

use App\Mail\VerifyEmailMailable;
use App\Models\User;
use Illuminate\Support\Facades\URL;

test('verificationUrl generates signed URL with correct params', function () {
    $user = new User;
    $user->id = 123;
    $user->email = 'test@example.com';

    $expectedHash = sha1($user->getEmailForVerification());

    URL::shouldReceive('temporarySignedRoute')
        ->withArgs(function ($route, $expiry, $params) use ($expectedHash) {
            return $route === 'verification.verify'
                && $params['id'] === 123
                && $params['hash'] === $expectedHash;
        })
        ->andReturn('https://example.com/verify?signature=abc');

    $mailable = new VerifyEmailMailable($user);

    $method = (new ReflectionClass($mailable))->getMethod('verificationUrl');

    $url = $method->invoke($mailable);

    expect($url)->toBe('https://example.com/verify?signature=abc');
});

test('hash is sha1 of users email', function () {
    $user = new User;
    $user->id = 456;
    $user->email = 'user@example.com';

    $expectedHash = sha1($user->getEmailForVerification());

    URL::shouldReceive('temporarySignedRoute')
        ->withArgs(fn ($route, $expiry, $params) => $route === 'verification.verify'
            && $params['hash'] === $expectedHash
        )
        ->andReturn('https://example.com/verify?signature=xyz');

    $mailable = new VerifyEmailMailable($user);

    $method = (new ReflectionClass($mailable))->getMethod('verificationUrl');

    $url = $method->invoke($mailable);

    expect($url)->toBe('https://example.com/verify?signature=xyz');
});
