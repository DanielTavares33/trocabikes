<?php

use App\Http\Requests\Auth\LoginPostRequest;

test('email validation rules require format and presence', function () {
    $request = new LoginPostRequest;
    $rules = $request->rules();

    expect($rules['email'])->toContain('required');
    expect($rules['email'])->toContain('email');
});

test('password validation rules require presence', function () {
    $request = new LoginPostRequest;
    $rules = $request->rules();

    expect($rules['password'])->toContain('required');
});
