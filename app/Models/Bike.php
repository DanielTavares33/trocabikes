<?php

namespace App\Models;

use App\Enums\BikeCondition;
use App\Enums\BikeStatus;
use App\Enums\FrameMaterial;
use Carbon\CarbonImmutable;
use Database\Factories\BikeFactory;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Http\Request;

/**
 * @property BikeCondition $condition
 * @property FrameMaterial $frame_material
 * @property BikeStatus $status
 * @property-read BikeBrand|null $bikeBrand
 * @property-read BikeCategory|null $bikeCategory
 * @property-read User|null $user
 *
 * @method static \Database\Factories\BikeFactory factory($count = null, $state = [])
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Bike newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Bike newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Bike query()
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
 * @property bool $email_visible
 * @property int $views
 * @property CarbonImmutable|null $created_at
 * @property CarbonImmutable|null $updated_at
 *
 * @mixin \Eloquent
 */
class Bike extends Model
{
    /** @use HasFactory<BikeFactory> */
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
        'email_visible',
        'status',
        'views',
    ];

    protected function casts(): array
    {
        return [
            'price' => 'decimal:2',
            'condition' => BikeCondition::class,
            'frame_material' => FrameMaterial::class,
            'status' => BikeStatus::class,
            'phone_visible' => 'boolean',
            'email_visible' => 'boolean',
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

    public function images(): HasMany
    {
        return $this->hasMany(BikeImage::class)->orderBy('sort_order');
    }

    public function primaryImage(): HasOne
    {
        return $this->hasOne(BikeImage::class)
            ->where('is_primary', true)
            ->orderBy('sort_order');
    }

    /**
     * @param  Builder<Bike>  $query
     */
    public function scopeActive(Builder $query): void
    {
        $query->where('status', BikeStatus::Active);
    }

    /**
     * @param  Builder<Bike>  $query
     */
    public function scopeFiltered(Builder $query, Request $request): void
    {
        if ($request->filled('bike_brand_id')) {
            $query->where('bike_brand_id', $request->integer('bike_brand_id'));
        }

        if ($request->filled('bike_category_id')) {
            $query->where('bike_category_id', $request->integer('bike_category_id'));
        }

        if ($request->filled('price_min')) {
            $query->where('price', '>=', $request->input('price_min'));
        }

        if ($request->filled('price_max')) {
            $query->where('price', '<=', $request->input('price_max'));
        }

        $conditions = $request->input('condition', []);

        if (is_array($conditions) && $conditions !== []) {
            $query->whereIn('condition', $conditions);
        }

        if ($request->filled('year_from')) {
            $query->where('year', '>=', $request->integer('year_from'));
        }

        if ($request->filled('year_to')) {
            $query->where('year', '<=', $request->integer('year_to'));
        }

        if ($request->filled('location')) {
            $location = $request->string('location')->toString();

            $query->where(function (Builder $builder) use ($location): void {
                $builder->where('city', 'like', "%{$location}%")
                    ->orWhere('district', 'like', "%{$location}%");
            });
        }

        if ($request->filled('district')) {
            $query->where('district', 'like', '%'.$request->string('district')->toString().'%');
        }

        if ($request->filled('city')) {
            $query->where('city', 'like', '%'.$request->string('city')->toString().'%');
        }
    }

    /**
     * @param  Builder<Bike>  $query
     */
    public function scopeSorted(Builder $query, ?string $sort = 'newest'): void
    {
        match ($sort) {
            'price_asc' => $query->orderBy('price'),
            'price_desc' => $query->orderByDesc('price'),
            default => $query->orderByDesc('created_at'),
        };
    }
}
