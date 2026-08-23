<?php

namespace App\Support;

use App\Enums\FrameMaterial;
use App\Enums\ListingCondition;
use App\Models\Listing;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Storage;

class ListingPresenter
{
    /**
     * @return array<string, string>
     */
    public static function conditionLabels(): array
    {
        return [
            ListingCondition::New->value => 'Nova',
            ListingCondition::Used->value => 'Usada',
            ListingCondition::Excellent->value => 'Excelente',
            ListingCondition::Good->value => 'Boa',
            ListingCondition::Fair->value => 'Regular',
            ListingCondition::Poor->value => 'Mau',
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

    public static function conditionLabel(ListingCondition $condition): string
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
    public static function card(Listing $listing): array
    {
        $listing->loadMissing(['bikeBrand', 'bikeCategory', 'primaryImage']);

        $image = $listing->primaryImage;

        return [
            'id' => $listing->id,
            'title' => $listing->title,
            'slug' => $listing->slug,
            'brand' => $listing->bikeBrand?->name ?? '',
            'category' => $listing->bikeCategory?->name ?? '',
            'price' => (float) $listing->price,
            'year' => $listing->year,
            'condition' => self::conditionLabel($listing->condition),
            'kilometers' => $listing->kilometers !== null ? (int) $listing->kilometers : null,
            'location' => self::location($listing),
            'imageUrl' => $image?->url() ?? '',
            'imageAlt' => $listing->title,
        ];
    }

    /**
     * @param  Collection<int, Listing>|array<int, Listing>  $listings
     * @return array<int, array<string, mixed>>
     */
    public static function cardCollection(Collection|array $listings): array
    {
        return collect($listings)->map(fn (Listing $listing) => self::card($listing))->all();
    }

    /**
     * @return array<string, mixed>
     */
    public static function detail(Listing $listing): array
    {
        $listing->loadMissing(['bikeBrand', 'bikeCategory', 'images', 'user']);

        $primaryImage = $listing->primaryImage ?? $listing->images->first();

        return [
            'id' => $listing->id,
            'title' => $listing->title,
            'slug' => $listing->slug,
            'brand' => $listing->bikeBrand?->name ?? '',
            'category' => $listing->bikeCategory?->name ?? '',
            'price' => (float) $listing->price,
            'year' => $listing->year,
            'condition' => self::conditionLabel($listing->condition),
            'size' => $listing->size,
            'frameMaterial' => self::frameMaterialLabel($listing->frame_material),
            'kilometers' => $listing->kilometers !== null ? (int) $listing->kilometers : 0,
            'location' => self::location($listing),
            'description' => $listing->description,
            'imageUrl' => $primaryImage?->url() ?? '',
            'imageAlt' => $listing->title,
            'images' => $listing->images->map(fn ($image) => [
                'id' => $image->id,
                'url' => $image->url(),
                'alt' => $listing->title,
            ])->values()->all(),
            'createdAt' => $listing->created_at?->toDateString() ?? '',
            'views' => $listing->views,
            'seller' => [
                'name' => $listing->user?->name ?? '',
                'phone' => $listing->phone_visible ? ($listing->user?->phone ?? '') : '',
                'whatsapp' => $listing->phone_visible ? ($listing->user?->whatsapp ?? '') : '',
                'email' => $listing->user?->email ?? '',
                'type' => $listing->user?->type === 'professional' ? 'professional' : 'particular',
                'isVerified' => (bool) ($listing->user?->is_verified ?? false),
                'memberSince' => $listing->user?->created_at?->format('Y') ?? '',
                'location' => trim(($listing->user?->city ?? '').', '.($listing->user?->district ?? ''), ', '),
                'avatarUrl' => $listing->user?->avatar
                    ? Storage::disk('public')->url($listing->user->avatar)
                    : '',
            ],
        ];
    }

    /**
     * @return array<string, mixed>
     */
    public static function form(Listing $listing): array
    {
        $listing->loadMissing(['images']);

        return [
            'id' => $listing->id,
            'title' => $listing->title,
            'slug' => $listing->slug,
            'bike_brand_id' => $listing->bike_brand_id,
            'bike_category_id' => $listing->bike_category_id,
            'description' => $listing->description,
            'price' => (float) $listing->price,
            'condition' => $listing->condition->value,
            'year' => $listing->year,
            'size' => $listing->size,
            'frame_material' => $listing->frame_material->value,
            'kilometers' => $listing->kilometers,
            'district' => $listing->district,
            'city' => $listing->city,
            'phone_visible' => $listing->phone_visible,
            'images' => $listing->images->map(fn ($image) => [
                'id' => $image->id,
                'url' => $image->url(),
            ])->values()->all(),
        ];
    }

    private static function location(Listing $listing): string
    {
        if ($listing->city && $listing->district) {
            return $listing->city.', '.$listing->district;
        }

        return $listing->city ?: $listing->district;
    }
}
