<?php

namespace App\Http\Controllers;

use App\Enums\BikeStatus;
use App\Http\Requests\Bike\StoreBikeRequest;
use App\Http\Requests\Bike\UpdateBikeRequest;
use App\Models\Bike;
use App\Models\BikeBrand;
use App\Models\BikeCategory;
use App\Models\BikeImage;
use App\Support\BikePresenter;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class BikeController extends Controller
{
    use AuthorizesRequests;

    public function index(Request $request): Response
    {
        $this->authorize('viewAny', Bike::class);

        $filters = $this->normalizeFilters($request);

        $bikes = Bike::query()
            ->active()
            ->with(['bikeBrand', 'bikeCategory', 'primaryImage'])
            ->filtered($request->merge($filters))
            ->sorted($request->input('sort', 'newest'))
            ->paginate(10)
            ->withQueryString()
            ->through(fn (Bike $bike) => BikePresenter::card($bike));

        return Inertia::render('bikes/Index', [
            'bikes' => $bikes,
            'filters' => $filters,
            'filterOptions' => $this->filterOptions(),
        ]);
    }

    public function show(Request $request, Bike $bike): Response
    {
        if ($bike->status !== BikeStatus::Active) {
            $user = $request->user();

            if ($user === null || $user->id !== $bike->user_id) {
                abort(404);
            }
        }

        $this->recordView($bike);

        return Inertia::render('bikes/Show', [
            'bike' => BikePresenter::detail($bike),
            'canManage' => $request->user()?->id === $bike->user_id,
        ]);
    }

    public function myBikes(Request $request): Response
    {
        $bikes = Bike::query()
            ->where('user_id', $request->user()->id)
            ->with(['bikeBrand', 'primaryImage'])
            ->orderByDesc('created_at')
            ->get()
            ->map(fn (Bike $bike) => BikePresenter::myBike($bike));

        return Inertia::render('my-bikes/Index', [
            'bikes' => $bikes,
        ]);
    }

    public function create(): Response
    {
        $this->authorize('create', Bike::class);

        return Inertia::render('bikes/Create', $this->formOptions());
    }

    public function store(StoreBikeRequest $request): RedirectResponse
    {
        $bike = DB::transaction(function () use ($request) {
            $bike = Bike::query()->create([
                ...$request->safe()->except(['photos']),
                'user_id' => $request->user()->id,
                'status' => BikeStatus::Active,
                'views' => 0,
            ]);

            $this->storePhotos($bike, $request->file('photos', []));

            return $bike;
        });

        Inertia::flash('success', 'Your bike is live.');

        return redirect()->route('bikes.show', $bike);
    }

    public function edit(Bike $bike): Response
    {
        $this->authorize('update', $bike);

        return Inertia::render('bikes/Edit', [
            ...$this->formOptions($bike),
            'bike' => BikePresenter::form($bike),
        ]);
    }

    public function update(UpdateBikeRequest $request, Bike $bike): RedirectResponse
    {
        DB::transaction(function () use ($request, $bike): void {
            $bike->update($request->safe()->except(['photos', 'removed_photo_ids']));

            if ($request->filled('removed_photo_ids')) {
                $this->removePhotos($bike, $request->input('removed_photo_ids', []));
            }

            if ($request->hasFile('photos')) {
                $this->storePhotos($bike, $request->file('photos', []), $bike->images()->count());
            }

            $this->ensurePrimaryImage($bike);
        });

        Inertia::flash('success', 'Bike updated successfully.');

        return redirect()->route('bikes.show', $bike->fresh());
    }

    public function destroy(Bike $bike): RedirectResponse
    {
        $this->authorize('delete', $bike);

        $bike->delete();

        Inertia::flash('success', 'Bike removed successfully.');

        return redirect()->route('my-bikes');
    }

    /**
     * @return array<string, mixed>
     */
    private function formOptions(?Bike $bike = null): array
    {
        $brandsQuery = BikeBrand::query()->orderBy('name');

        if ($bike !== null) {
            $brandsQuery->where(function ($query) use ($bike): void {
                $query->where('is_active', true)
                    ->orWhere('id', $bike->bike_brand_id);
            });
        } else {
            $brandsQuery->where('is_active', true);
        }

        return [
            'brands' => $brandsQuery->get(['id', 'name']),
            'categories' => BikeCategory::query()
                ->orderBy('name')
                ->get(['id', 'name']),
            'conditions' => collect(BikePresenter::conditionLabels())
                ->map(fn (string $label, string $value) => ['value' => $value, 'label' => $label])
                ->values()
                ->all(),
            'frameMaterials' => collect(BikePresenter::frameMaterialLabels())
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
            'conditions' => collect(BikePresenter::conditionLabels())
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

        foreach (['bike_brand_id', 'bike_category_id', 'year_from', 'year_to', 'location'] as $key) {
            if (! isset($filters[$key])) {
                continue;
            }

            if (! is_scalar($filters[$key])) {
                unset($filters[$key]);

                continue;
            }

            $filters[$key] = (string) $filters[$key];
        }

        $sort = $request->string('sort')->toString();

        $filters['sort'] = in_array($sort, ['newest', 'price_asc', 'price_desc'], true)
            ? $sort
            : 'newest';

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
    private function storePhotos(Bike $bike, array $photos, int $startingOrder = 0): void
    {
        foreach ($photos as $index => $photo) {
            $path = $photo->store("bikes/{$bike->id}", 'public');

            BikeImage::query()->create([
                'bike_id' => $bike->id,
                'path' => $path,
                'sort_order' => $startingOrder + $index,
                'is_primary' => $startingOrder === 0 && $index === 0 && ! $bike->images()->exists(),
            ]);
        }
    }

    /**
     * @param  array<int, int|string>  $photoIds
     */
    private function removePhotos(Bike $bike, array $photoIds): void
    {
        $bike->images()->whereIn('id', $photoIds)->each(function (BikeImage $image): void {
            $image->delete();
        });
    }

    private function ensurePrimaryImage(Bike $bike): void
    {
        if ($bike->images()->where('is_primary', true)->exists()) {
            return;
        }

        $firstImage = $bike->images()->orderBy('sort_order')->first();

        if ($firstImage !== null) {
            $firstImage->update(['is_primary' => true]);
        }
    }

    private function recordView(Bike $bike): void
    {
        $viewedBikes = session('viewed_bikes', []);

        if (in_array($bike->id, $viewedBikes, true)) {
            return;
        }

        $bike->increment('views');
        session()->push('viewed_bikes', $bike->id);
    }
}
