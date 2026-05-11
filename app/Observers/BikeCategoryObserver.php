<?php

namespace App\Observers;

use App\Models\BikeCategory;
use Illuminate\Support\Str;

class BikeCategoryObserver
{
    public function creating(BikeCategory $bikeCategory): void
    {
        if (empty($bikeCategory->slug)) {
            $bikeCategory->slug = Str::slug($bikeCategory->name);
        }
    }
}
