<?php

namespace App\Support;

use App\Enums\BikeCondition;
use App\Enums\FrameMaterial;
use App\Models\Bike;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Storage;

class BikePresenter
{
    /**
     * @return array<string, string>
     */
    public static function conditionLabels(): array
    {
        return [
            BikeCondition::New->value => 'Nova',
            BikeCondition::Used->value => 'Usada',
            BikeCondition::Excellent->value => 'Excelente',
            BikeCondition::Good->value => 'Boa',
            BikeCondition::Fair->value => 'Regular',
            BikeCondition::Poor->value => 'Mau',
        ];
    }

    /**
     * @return array<string, string>
     */
    public static function frameMaterialLabels(): array
    {
        return [
            FrameMaterial::Aluminum->value => 'Aluminum',
            FrameMaterial::Carbon->value => 'Carbon',
            FrameMaterial::Steel->value => 'Steel',
            FrameMaterial::Titanium->value => 'Titanium',
            FrameMaterial::Other->value => 'Other',
        ];
    }

    public static function conditionLabel(BikeCondition $condition): string
    {
        return self::conditionLabels()[$condition->value] ?? $condition->value;
    }

    public static function frameMaterialLabel(FrameMaterial $material): string
    {
        return self::frameMaterialLabels()[$material->value] ?? $material->value;
    }

    /**
     * @return array<string, mixed>
     */
    public static function card(Bike $bike): array
    {
        $bike->loadMissing(['bikeBrand', 'bikeCategory', 'primaryImage']);

        $image = $bike->primaryImage;

        return [
            'id' => $bike->id,
            'title' => $bike->title,
            'slug' => $bike->slug,
            'brand' => $bike->bikeBrand?->name ?? '',
            'category' => $bike->bikeCategory?->name ?? '',
            'price' => (float) $bike->price,
            'year' => $bike->year,
            'condition' => self::conditionLabel($bike->condition),
            'kilometers' => $bike->kilometers !== null ? (int) $bike->kilometers : null,
            'location' => self::location($bike),
            'imageUrl' => $image?->url() ?? '',
            'imageAlt' => $bike->title,
        ];
    }

    /**
     * @param  Collection<int, Bike>|array<int, Bike>  $bikes
     * @return array<int, array<string, mixed>>
     */
    public static function cardCollection(Collection|array $bikes): array
    {
        return collect($bikes)->map(fn (Bike $bike) => self::card($bike))->all();
    }

    /**
     * @return array<string, mixed>
     */
    public static function myBike(Bike $bike): array
    {
        $bike->loadMissing(['bikeBrand', 'primaryImage']);

        $image = $bike->primaryImage;

        return [
            'id' => $bike->id,
            'title' => $bike->title,
            'slug' => $bike->slug,
            'brand' => $bike->bikeBrand?->name ?? '',
            'price' => (float) $bike->price,
            'year' => $bike->year,
            'condition' => self::conditionLabel($bike->condition),
            'status' => $bike->status->value,
            'views' => $bike->views,
            'createdAt' => $bike->created_at?->toDateString() ?? '',
            'imageUrl' => $image?->url() ?? '',
            'imageAlt' => $bike->title,
        ];
    }

    /**
     * @return array<string, mixed>
     */
    public static function detail(Bike $bike): array
    {
        $bike->loadMissing(['bikeBrand', 'bikeCategory', 'images', 'user']);

        $primaryImage = $bike->images->firstWhere('is_primary', true) ?? $bike->images->first();

        return [
            'id' => $bike->id,
            'title' => $bike->title,
            'slug' => $bike->slug,
            'brand' => $bike->bikeBrand?->name ?? '',
            'category' => $bike->bikeCategory?->name ?? '',
            'price' => (float) $bike->price,
            'year' => $bike->year,
            'condition' => self::conditionLabel($bike->condition),
            'size' => $bike->size,
            'frameMaterial' => self::frameMaterialLabel($bike->frame_material),
            'kilometers' => $bike->kilometers !== null ? (int) $bike->kilometers : null,
            'location' => self::location($bike),
            'description' => $bike->description,
            'imageUrl' => $primaryImage?->url() ?? '',
            'imageAlt' => $bike->title,
            'images' => $bike->images->map(fn ($image) => [
                'id' => $image->id,
                'url' => $image->url(),
                'alt' => $bike->title,
            ])->values()->all(),
            'createdAt' => $bike->created_at?->toDateString() ?? '',
            'views' => $bike->views,
            'seller' => [
                'name' => $bike->user?->name ?? '',
                'phone' => $bike->phone_visible ? ($bike->user?->phone ?? '') : '',
                'whatsapp' => $bike->phone_visible ? ($bike->user?->whatsapp ?? '') : '',
                'email' => $bike->email_visible ? ($bike->user?->email ?? '') : '',
                'type' => $bike->user?->type === 'professional' ? 'professional' : 'particular',
                'isVerified' => (bool) ($bike->user?->is_verified ?? false),
                'memberSince' => $bike->user?->created_at?->format('Y') ?? '',
                'location' => trim(($bike->user?->city ?? '').', '.($bike->user?->district ?? ''), ', '),
                'avatarUrl' => $bike->user?->avatar
                    ? Storage::disk('public')->url($bike->user->avatar)
                    : null,
            ],
        ];
    }

    /**
     * @return array<string, mixed>
     */
    public static function form(Bike $bike): array
    {
        $bike->loadMissing(['images']);

        return [
            'id' => $bike->id,
            'title' => $bike->title,
            'slug' => $bike->slug,
            'bike_brand_id' => $bike->bike_brand_id,
            'bike_category_id' => $bike->bike_category_id,
            'description' => $bike->description,
            'price' => (float) $bike->price,
            'condition' => $bike->condition->value,
            'year' => $bike->year,
            'size' => $bike->size,
            'frame_material' => $bike->frame_material->value,
            'kilometers' => $bike->kilometers,
            'district' => $bike->district,
            'city' => $bike->city,
            'phone_visible' => $bike->phone_visible,
            'email_visible' => $bike->email_visible,
            'images' => $bike->images->map(fn ($image) => [
                'id' => $image->id,
                'url' => $image->url(),
            ])->values()->all(),
        ];
    }

    private static function location(Bike $bike): string
    {
        if ($bike->city && $bike->district) {
            return $bike->city.', '.$bike->district;
        }

        return $bike->city ?: $bike->district;
    }
}
