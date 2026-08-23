<?php

namespace App\Observers;

use App\Models\Listing;
use Illuminate\Support\Str;

class ListingObserver
{
    public function creating(Listing $listing): void
    {
        if (empty($listing->slug)) {
            $listing->slug = $this->uniqueSlug($listing->title);
        }
    }

    public function updating(Listing $listing): void
    {
        if ($listing->isDirty('title') && ! $listing->isDirty('slug')) {
            $listing->slug = $this->uniqueSlug($listing->title, $listing->id);
        }
    }

    private function uniqueSlug(string $title, ?int $ignoreId = null): string
    {
        $baseSlug = Str::slug($title);
        $slug = $baseSlug;
        $counter = 1;

        while (
            Listing::query()
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
