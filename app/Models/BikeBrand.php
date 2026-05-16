<?php

namespace App\Models;

use Database\Factories\BikeBrandFactory;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * @property-read Collection<int, Listing> $listings
 * @property-read int|null $listings_count
 *
 * @method static \Database\Factories\BikeBrandFactory factory($count = null, $state = [])
 * @method static \Illuminate\Database\Eloquent\Builder<static>|BikeBrand newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|BikeBrand newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|BikeBrand query()
 *
 * @mixin \Eloquent
 */
class BikeBrand extends Model
{
    /** @use HasFactory<BikeBrandFactory> */
    use HasFactory;

    protected $fillable = [
        'name',
        'slug',
        'logo',
        'is_active',
    ];

    protected function casts(): array
    {
        return [
            'is_active' => 'boolean',
        ];
    }

    public function listings(): HasMany
    {
        return $this->hasMany(Listing::class);
    }
}
