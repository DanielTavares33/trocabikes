<?php

use App\Models\User;

test('can soft delete a user', function () {
    $user = User::factory()->create();

    $user->delete();

    expect(User::find($user->id))->toBeNull()
        ->and(User::withTrashed()->find($user->id))->not->toBeNull()
        ->and($user->fresh()->deleted_at)->not->toBeNull();
});

test('soft deleted users are excluded from queries', function () {
    $user = User::factory()->create();

    $user->delete();

    expect(User::count())->toBe(0)
        ->and(User::withTrashed()->count())->toBe(1);
});
