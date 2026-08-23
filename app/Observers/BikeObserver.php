<?php

namespace App\Observers;

use App\Models\Bike;
use Illuminate\Support\Str;

class BikeObserver
{
    public function creating(Bike $bike): void
    {
        if (empty($bike->slug)) {
            $bike->slug = $this->uniqueSlug($bike->title);
        }
    }

    public function updating(Bike $bike): void
    {
        if ($bike->isDirty('title') && ! $bike->isDirty('slug')) {
            $bike->slug = $this->uniqueSlug($bike->title, $bike->id);
        }
    }

    private function uniqueSlug(string $title, ?int $ignoreId = null): string
    {
        $baseSlug = Str::slug($title);
        $slug = $baseSlug;
        $counter = 1;

        while (
            Bike::query()
                ->when($ignoreId, fn ($query) => $query->where('id', '!=', $ignoreId))
                ->where('slug', $slug)
                ->exists()
        ) {
            $slug = $baseSlug.'-'.$counter;
            $counter++;
        }

        return $slug;
    }
}
