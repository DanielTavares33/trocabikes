<?php

namespace App\Observers;

use App\Models\Bike;
use App\Models\BikeImage;
use Illuminate\Support\Str;

class BikeObserver
{
    public function creating(Bike $bike): void
    {
        $bike->slug = $this->uniqueSlug($bike->title);
    }

    public function updating(Bike $bike): void
    {
        if ($bike->isDirty('title') && ! $bike->isDirty('slug')) {
            $bike->slug = $this->uniqueSlug($bike->title, $bike->id);
        }
    }

    public function deleting(Bike $bike): void
    {
        $bike->images()->each(function (BikeImage $image): void {
            $image->delete();
        });
    }

    private function uniqueSlug(string $title, ?int $ignoreId = null): string
    {
        $baseSlug = Str::slug($title);

        if ($baseSlug === '') {
            $baseSlug = 'bike';
        }

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
