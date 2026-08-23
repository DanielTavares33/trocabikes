<?php

namespace App\Http\Controllers;

use App\Enums\ListingStatus;
use App\Http\Requests\Listing\StoreListingRequest;
use App\Http\Requests\Listing\UpdateListingRequest;
use App\Models\BikeBrand;
use App\Models\BikeCategory;
use App\Models\Listing;
use App\Models\ListingImage;
use App\Support\ListingPresenter;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class ListingController extends Controller
{
    use AuthorizesRequests;

    public function index(Request $request): Response
    {
        $this->authorize('viewAny', Listing::class);

        $filters = $this->normalizeFilters($request);

        $listings = Listing::query()
            ->active()
            ->with(['bikeBrand', 'bikeCategory', 'primaryImage'])
            ->filtered($request->merge($filters))
            ->sorted($request->input('sort', 'newest'))
            ->paginate(10)
            ->withQueryString()
            ->through(fn (Listing $listing) => ListingPresenter::card($listing));

        return Inertia::render('browse/Browse', [
            'listings' => $listings,
            'filters' => $filters,
            'filterOptions' => $this->filterOptions(),
        ]);
    }

    public function show(Listing $listing): Response
    {
        $this->authorize('view', $listing);

        $listing->increment('views');

        return Inertia::render('listing/ListingDetail', [
            'listing' => ListingPresenter::detail($listing),
        ]);
    }

    public function create(): Response
    {
        $this->authorize('create', Listing::class);

        return Inertia::render('listings/Create', $this->formOptions());
    }

    public function store(StoreListingRequest $request): RedirectResponse
    {
        $listing = Listing::query()->create([
            ...$request->safe()->except(['photos']),
            'user_id' => $request->user()->id,
            'status' => ListingStatus::Active,
            'views' => 0,
        ]);

        $this->storePhotos($listing, $request->file('photos', []));

        return redirect()
            ->route('listings.show', $listing)
            ->with('success', 'Listing published successfully.');
    }

    public function edit(Listing $listing): Response
    {
        $this->authorize('update', $listing);

        return Inertia::render('listings/Edit', [
            ...$this->formOptions(),
            'listing' => ListingPresenter::form($listing),
        ]);
    }

    public function update(UpdateListingRequest $request, Listing $listing): RedirectResponse
    {
        $listing->update($request->safe()->except(['photos', 'removed_photo_ids']));
        $listing->refresh();

        if ($request->filled('removed_photo_ids')) {
            $this->removePhotos($listing, $request->input('removed_photo_ids', []));
        }

        if ($request->hasFile('photos')) {
            $this->storePhotos($listing, $request->file('photos', []), $listing->images()->count());
        }

        $this->ensurePrimaryImage($listing);

        return redirect()
            ->route('listings.show', $listing)
            ->with('success', 'Listing updated successfully.');
    }

    public function destroy(Listing $listing): RedirectResponse
    {
        $this->authorize('delete', $listing);

        foreach ($listing->images as $image) {
            Storage::disk('public')->delete($image->path);
        }

        $listing->delete();

        return redirect()
            ->route('my-bikes')
            ->with('success', 'Listing deleted successfully.');
    }

    /**
     * @return array<string, mixed>
     */
    private function formOptions(): array
    {
        return [
            'brands' => BikeBrand::query()
                ->where('is_active', true)
                ->orderBy('name')
                ->get(['id', 'name']),
            'categories' => BikeCategory::query()
                ->orderBy('name')
                ->get(['id', 'name']),
            'conditions' => collect(ListingPresenter::conditionLabels())
                ->map(fn (string $label, string $value) => ['value' => $value, 'label' => $label])
                ->values()
                ->all(),
            'frameMaterials' => collect(ListingPresenter::frameMaterialLabels())
                ->map(fn (string $label, string $value) => ['value' => $value, 'label' => $label])
                ->values()
                ->all(),
        ];
    }

    /**
     * @return array<string, mixed>
     */
    private function filterOptions(): array
    {
        return [
            'brands' => BikeBrand::query()
                ->where('is_active', true)
                ->orderBy('name')
                ->get(['id', 'name']),
            'categories' => BikeCategory::query()
                ->orderBy('name')
                ->get(['id', 'name']),
            'conditions' => collect(ListingPresenter::conditionLabels())
                ->map(fn (string $label, string $value) => ['value' => $value, 'label' => $label])
                ->values()
                ->all(),
            'priceRanges' => [
                ['label' => 'Any', 'value' => ''],
                ['label' => 'Under €500', 'value' => '0-500'],
                ['label' => '€500 – €1,000', 'value' => '500-1000'],
                ['label' => '€1,000 – €2,000', 'value' => '1000-2000'],
                ['label' => '€2,000 – €5,000', 'value' => '2000-5000'],
                ['label' => 'Over €5,000', 'value' => '5000-'],
            ],
        ];
    }

    /**
     * @return array<string, mixed>
     */
    private function normalizeFilters(Request $request): array
    {
        $filters = $request->only([
            'bike_brand_id',
            'bike_category_id',
            'price_min',
            'price_max',
            'condition',
            'year_from',
            'year_to',
            'location',
            'sort',
            'page',
        ]);

        if ($request->filled('price') && ! $request->filled('price_min') && ! $request->filled('price_max')) {
            [$priceMin, $priceMax] = $this->parsePriceRange($request->string('price')->toString());

            if ($priceMin !== null) {
                $filters['price_min'] = $priceMin;
            }

            if ($priceMax !== null) {
                $filters['price_max'] = $priceMax;
            }

            $filters['price'] = $request->string('price')->toString();
        }

        if ($request->has('condition') && ! is_array($request->input('condition'))) {
            $filters['condition'] = array_filter([(string) $request->input('condition')]);
        }

        return $filters;
    }

    /**
     * @return array{0: int|null, 1: int|null}
     */
    private function parsePriceRange(string $range): array
    {
        if ($range === '') {
            return [null, null];
        }

        if (str_ends_with($range, '-')) {
            return [(int) rtrim($range, '-'), null];
        }

        [$min, $max] = array_pad(explode('-', $range, 2), 2, null);

        return [
            $min !== null && $min !== '' ? (int) $min : null,
            $max !== null && $max !== '' ? (int) $max : null,
        ];
    }

    /**
     * @param  array<int, UploadedFile>  $photos
     */
    private function storePhotos(Listing $listing, array $photos, int $startingOrder = 0): void
    {
        foreach ($photos as $index => $photo) {
            $path = $photo->store("listings/{$listing->id}", 'public');

            ListingImage::query()->create([
                'listing_id' => $listing->id,
                'path' => $path,
                'sort_order' => $startingOrder + $index,
                'is_primary' => $startingOrder === 0 && $index === 0 && ! $listing->images()->exists(),
            ]);
        }
    }

    /**
     * @param  array<int, int|string>  $photoIds
     */
    private function removePhotos(Listing $listing, array $photoIds): void
    {
        $images = $listing->images()->whereIn('id', $photoIds)->get();

        foreach ($images as $image) {
            Storage::disk('public')->delete($image->path);
            $image->delete();
        }
    }

    private function ensurePrimaryImage(Listing $listing): void
    {
        if ($listing->images()->where('is_primary', true)->exists()) {
            return;
        }

        $firstImage = $listing->images()->orderBy('sort_order')->first();

        if ($firstImage !== null) {
            $firstImage->update(['is_primary' => true]);
        }
    }
}
