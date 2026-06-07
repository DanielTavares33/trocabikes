<?php

use function Pest\Laravel\get;

test('404 renders error page with correct status', function () {
    $response = get(route('test.error', ['code' => 404]));

    $response->assertStatus(404);
    $response->assertInertia(fn ($page) => $page
        ->component('Error')
    );
});

test('403 renders error page with correct status', function () {
    $response = get(route('test.error', ['code' => 403]));

    $response->assertStatus(403);
    $response->assertInertia(fn ($page) => $page
        ->component('Error')
    );
});

test('500 renders error page with correct status', function () {
    $response = get(route('test.error', ['code' => 500]));

    $response->assertStatus(500);
    $response->assertInertia(fn ($page) => $page
        ->component('Error')
    );
});

test('503 renders error page with correct status', function () {
    $response = get(route('test.error', ['code' => 503]));

    $response->assertStatus(503);
    $response->assertInertia(fn ($page) => $page
        ->component('Error')
    );
});

test('419 renders error page with correct status', function () {
    $response = get(route('test.error', ['code' => 419]));

    $response->assertStatus(419);
    $response->assertInertia(fn ($page) => $page
        ->component('Error')
    );
});

test('429 renders error page with correct status', function () {
    $response = get(route('test.error', ['code' => 429]));

    $response->assertStatus(429);
    $response->assertInertia(fn ($page) => $page
        ->component('Error')
    );
});

test('401 renders error page with correct status', function () {
    $response = get(route('test.error', ['code' => 401]));

    $response->assertStatus(401);
    $response->assertInertia(fn ($page) => $page
        ->component('Error')
    );
});

test('non-existent route returns 404 error page', function () {
    get('/this-route-definitely-does-not-exist-12345')
        ->assertStatus(404)
        ->assertInertia(fn ($page) => $page
            ->component('Error')
        );
});
