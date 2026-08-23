<?php

namespace App\Models;

use Carbon\CarbonImmutable;
use Database\Factories\BikeCategoryFactory;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * @property-read Collection<int, Bike> $bikes
 * @property-read int|null $bikes_count
 *
 * @method static \Database\Factories\BikeCategoryFactory factory($count = null, $state = [])
 * @method static \Illuminate\Database\Eloquent\Builder<static>|BikeCategory newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|BikeCategory newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|BikeCategory query()
 *
 * @property int $id
 * @property string $name
 * @property string $slug
 * @property CarbonImmutable|null $created_at
 * @property CarbonImmutable|null $updated_at
 *
 * @method static \Illuminate\Database\Eloquent\Builder<static>|BikeCategory whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|BikeCategory whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|BikeCategory whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|BikeCategory whereSlug($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|BikeCategory whereUpdatedAt($value)
 *
 * @mixin \Eloquent
 */
class BikeCategory extends Model
{
    /** @use HasFactory<BikeCategoryFactory> */
    use HasFactory;

    protected $fillable = [
        'name',
        'slug',
    ];

    public function bikes(): HasMany
    {
        return $this->hasMany(Bike::class);
    }
}
