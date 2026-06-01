<?php

use App\Http\Requests\Auth\RegisterPostRequest;

test('name validation rules require string with max length', function () {
    $request = new RegisterPostRequest;
    $rules = $request->rules();

    expect($rules['name'])->toContain('required');
    expect($rules['name'])->toContain('string');
    expect($rules['name'])->toContain('max:255');
});

test('email validation rules require format, max length, and uniqueness', function () {
    $request = new RegisterPostRequest;
    $rules = $request->rules();

    expect($rules['email'])->toContain('required');
    expect($rules['email'])->toContain('string');
    expect($rules['email'])->toContain('email');
    expect($rules['email'])->toContain('max:255');
    expect($rules['email'])->toContain('unique:users');
});

test('password validation rules require min length and confirmation', function () {
    $request = new RegisterPostRequest;
    $rules = $request->rules();

    expect($rules['password'])->toContain('required');
    expect($rules['password'])->toContain('string');
    expect($rules['password'])->toContain('min:8');
    expect($rules['password'])->toContain('confirmed');
});

test('authorize returns true', function () {
    $request = new RegisterPostRequest;
    expect($request->authorize())->toBeTrue();
});
