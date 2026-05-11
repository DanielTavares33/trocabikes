<?php

namespace App\Observers;

use App\Models\BikeBrand;
use Illuminate\Support\Str;

class BikeBrandObserver
{
    public function creating(BikeBrand $bikeBrand): void
    {
        if (empty($bikeBrand->slug)) {
            $bikeBrand->slug = Str::slug($bikeBrand->name);
        }
    }
}
