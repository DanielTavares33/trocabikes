<?php

namespace App\Models;

use App\Enums\FrameMaterial;
use App\Enums\ListingCondition;
use App\Enums\ListingStatus;
use Database\Factories\ListingFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * @property ListingCondition $condition
 * @property FrameMaterial $frame_material
 * @property ListingStatus $status
 * @property-read BikeBrand|null $bikeBrand
 * @property-read BikeCategory|null $bikeCategory
 * @property-read User|null $user
 *
 * @method static \Database\Factories\ListingFactory factory($count = null, $state = [])
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Listing newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Listing newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Listing query()
 *
 * @mixin \Eloquent
 */
class Listing extends Model
{
    /** @use HasFactory<ListingFactory> */
    use HasFactory;

    protected $fillable = [
        'user_id',
        'bike_brand_id',
        'bike_category_id',
        'title',
        'slug',
        'description',
        'price',
        'condition',
        'year',
        'size',
        'frame_material',
        'kilometers',
        'district',
        'city',
        'phone_visible',
        'status',
        'views',
    ];

    protected function casts(): array
    {
        return [
            'price' => 'decimal:2',
            'condition' => ListingCondition::class,
            'frame_material' => FrameMaterial::class,
            'status' => ListingStatus::class,
            'phone_visible' => 'boolean',
            'views' => 'integer',
        ];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function bikeBrand(): BelongsTo
    {
        return $this->belongsTo(BikeBrand::class);
    }

    public function bikeCategory(): BelongsTo
    {
        return $this->belongsTo(BikeCategory::class);
    }
}
