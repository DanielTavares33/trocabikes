<?php

namespace App\Policies;

use App\Enums\BikeStatus;
use App\Models\Bike;
use App\Models\User;

class BikePolicy
{
    public function viewAny(?User $user): bool
    {
        return true;
    }

    public function view(?User $user, Bike $bike): bool
    {
        if ($bike->status === BikeStatus::Active) {
            return true;
        }

        return $user !== null && $user->id === $bike->user_id;
    }

    public function create(User $user): bool
    {
        return $user->hasVerifiedEmail();
    }

    public function update(User $user, Bike $bike): bool
    {
        return $user->id === $bike->user_id;
    }

    public function delete(User $user, Bike $bike): bool
    {
        return $user->id === $bike->user_id;
    }
}
