<?php

namespace App\Http\Controllers;

use App\Models\Bike;
use App\Models\BikeCategory;
use App\Support\BikePresenter;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    public function __invoke(): Response
    {
        $recentBikes = Bike::query()
            ->active()
            ->with(['bikeBrand', 'bikeCategory', 'primaryImage'])
            ->orderByDesc('created_at')
            ->limit(6)
            ->get();

        return Inertia::render('Welcome', [
            'recentBikes' => BikePresenter::cardCollection($recentBikes),
            'categories' => BikeCategory::query()
                ->orderBy('name')
                ->get(['id', 'name', 'slug']),
        ]);
    }
}
