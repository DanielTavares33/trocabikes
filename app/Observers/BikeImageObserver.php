<?php

namespace App\Observers;

use App\Models\BikeImage;
use Illuminate\Support\Facades\Storage;

class BikeImageObserver
{
    public function deleting(BikeImage $image): void
    {
        Storage::disk('public')->delete($image->path);
    }
}
