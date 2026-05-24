<?php

namespace App\Models;

use App\Enums\FrameMaterial;
use App\Enums\ListingCondition;
use App\Enums\ListingStatus;
use Carbon\CarbonImmutable;
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
 * @property int $id
 * @property int $user_id
 * @property int $bike_brand_id
 * @property int $bike_category_id
 * @property string $title
 * @property string $slug
 * @property string $description
 * @property numeric $price
 * @property int $year
 * @property string $size
 * @property string|null $kilometers
 * @property string $district
 * @property string $city
 * @property bool $phone_visible
 * @property int $views
 * @property CarbonImmutable|null $created_at
 * @property CarbonImmutable|null $updated_at
 *
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Listing whereBikeBrandId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Listing whereBikeCategoryId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Listing whereCity($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Listing whereCondition($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Listing whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Listing whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Listing whereDistrict($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Listing whereFrameMaterial($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Listing whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Listing whereKilometers($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Listing wherePhoneVisible($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Listing wherePrice($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Listing whereSize($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Listing whereSlug($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Listing whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Listing whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Listing whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Listing whereUserId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Listing whereViews($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Listing whereYear($value)
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
